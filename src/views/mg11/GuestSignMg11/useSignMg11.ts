import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import {
  Mg11Status,
  useFetchMg11Query,
  useUpdateOneMg11Mutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import errorNotification from 'types/error_notification';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { useStoreState } from '../../../state';

const { useForm } = Form;

export interface FormData {
  statement?: string;
  detailsExplained?: string;
  leafletReceived?: string;
  medicalReleasedPolice?: string;
  medicalReleasedDefence?: string;
  civilProceedingsRelease?: string;
  witnessServiceDisclose?: string;
  signature?: string;
  witnessSignatureDate?: string;
  name?: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  name: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  data: FormData;
  status: Mg11Status;
  sign: string;
}

const useSignMg11 = (): Return => {
  const scheme = useStoreState((state) => state.scheme.id);
  const [form] = useForm<FormData>();
  const [data, setdata] = useState<FormData>({
    statement: '',
    detailsExplained: '',
    leafletReceived: '',
    medicalReleasedPolice: '',
    medicalReleasedDefence: '',
    civilProceedingsRelease: '',
    witnessServiceDisclose: '',
    signature: '',
    witnessSignatureDate: new Date().toLocaleDateString('en-GB'),
    name: '',
  });
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [sign, setSign] = useState('');
  const [tab, setTab] = useState('generate');
  const [file, setFile] = useState<{
    file: string;
    name: string;
  } | null>(null);
  const navigate = useNavigate();

  const [updateMg11] = useUpdateOneMg11Mutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Signed!',
        description: 'The statement has been successfully signed, thank you!',
        placement: 'bottomRight',
      });
      navigate(scheme ? '/app/' : `/ext/thank-you`);
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const { data: InitData, loading } = useFetchMg11Query({
    variables: {
      where: {
        id: id || '',
      },
    },
    onCompleted: (Initdata) => {
      setdata({
        ...data,
        name: Initdata?.mg11?.name || '',
        statement: Initdata?.mg11?.statement || '',
      });
      setSign(
        `<svg xmlns="http://www.w3.org/2000/svg" style="background:#ffffff00" height="100" width="300" viewBox="0 0 300 100" class="signature-svg" data-reactroot=""><text x="20" y="60" font-family="Caveat" font-size="30" fill="black">
      ${data.name || ''}
</text></svg>`
      );
    },
  });

  const onSubmit = (formData: FormData) => {
    setSaving(true);
    updateMg11({
      variables: {
        where: {
          id: id || '',
        },
        data: {
          status: { set: Mg11Status.Completed },
          detailsExplained: { set: formData.detailsExplained === 'true' },
          leafletReceived: { set: formData.leafletReceived === 'true' },
          medicalReleasedPolice: { set: formData.medicalReleasedPolice },
          medicalReleasedDefence: { set: formData.medicalReleasedDefence },
          civilProceedingsRelease: { set: formData.civilProceedingsRelease },
          witnessServiceDisclose: {
            set: formData.witnessServiceDisclose === 'true',
          },
          witnessSignatureDate: { set: new Date() },
          witnessSignature: { set: sign },
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };

  const update = (value: string) => {
    setSign(value);
  };

  return {
    onSubmit,
    saving: saving || loading,
    form,
    setSign,
    update,
    selectedFont,
    name: data.name || '',
    file,
    setTab,
    tab,
    setSelectedFont,
    setFile,
    data,
    status: InitData?.mg11?.status || Mg11Status.Draft,
    sign,
  };
};

export default useSignMg11;
