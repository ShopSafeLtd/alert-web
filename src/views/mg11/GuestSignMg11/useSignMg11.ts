import type { FormInstance } from 'antd';

import { Form, notification } from 'antd';
import { useUpdateOneMg11Mutation } from 'graphql/mg11/mutations/__generated__/update-mg11.generated';
import { useFetchMg11Query } from 'graphql/mg11/queries/__generated__/get-mg11.generated';
import { Mg11Status } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import errorNotification from 'types/mutation_notifications/error_notification';

import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { useStoreState } from '../../../state';

const { useForm } = Form;

export interface FormData {
  civilProceedingsRelease?: string;
  detailsExplained?: string;
  leafletReceived?: string;
  medicalReleasedDefence?: string;
  medicalReleasedPolice?: string;
  name?: string;
  signature?: string;
  statement?: string;
  witnessServiceDisclose?: string;
  witnessSignatureDate?: string;
}

interface Return {
  data: FormData;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  name: string;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  status: Mg11Status;
  tab: string;
  update: (value: string) => void;
}

const useSignMg11 = (): Return => {
  const intl = useIntl();
  const scheme = useStoreState((state) => state.scheme.id);
  const [form] = useForm<FormData>();
  const [data, setdata] = useState<FormData>({
    civilProceedingsRelease: '',
    detailsExplained: '',
    leafletReceived: '',
    medicalReleasedDefence: '',
    medicalReleasedPolice: '',
    name: '',
    signature: '',
    statement: '',
    witnessServiceDisclose: '',
    witnessSignatureDate: new Date().toLocaleDateString('en-GB'),
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
        description: intl.formatMessage({
          defaultMessage:
            'The statement has been successfully signed, thank you!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Signed!',
        }),
        placement: 'bottomRight',
      });
      navigate(scheme ? '/app/' : '/ext/thank-you');
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const { data: InitData, loading } = useFetchMg11Query({
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
    variables: {
      where: {
        id: id || '',
      },
    },
  });

  const onSubmit = (formData: FormData) => {
    setSaving(true);
    void updateMg11({
      variables: {
        data: {
          civilProceedingsRelease: { set: formData.civilProceedingsRelease },
          detailsExplained: { set: formData.detailsExplained === 'true' },
          leafletReceived: { set: formData.leafletReceived === 'true' },
          medicalReleasedDefence: { set: formData.medicalReleasedDefence },
          medicalReleasedPolice: { set: formData.medicalReleasedPolice },
          status: { set: Mg11Status.Completed },
          witnessServiceDisclose: {
            set: formData.witnessServiceDisclose === 'true',
          },
          witnessSignature: { set: sign },
          witnessSignatureDate: { set: new Date() },
        },
        where: {
          id: id || '',
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
    data,
    file,
    form,
    name: data.name || '',
    onSubmit,
    saving: saving || loading,
    selectedFont,
    setFile,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    status: InitData?.mg11?.status || Mg11Status.Draft,
    tab,
    update,
  };
};

export default useSignMg11;
