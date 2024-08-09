import type { FormInstance } from 'antd';

import { Form, notification } from 'antd';
import { useUpdateOneMg11Mutation } from 'graphql/mg11/mutations/__generated__/update-mg11.generated';
import { useFetchMg11Query } from 'graphql/mg11/queries/__generated__/get-mg11.generated';
import { Mg11Status } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { Mg11Data } from './FinalSignMg11.view';

import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { useStoreState } from '../../../state';

const { useForm } = Form;

interface Return {
  data: Mg11Data;
  file: { file: string; name: string } | null;
  form: FormInstance;
  name: string;
  onSubmit: () => void;
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

const useFinalSignMg11 = (): Return => {
  const intl = useIntl();
  const [form] = useForm();
  const { fullName: userName } = useStoreState((state) => state.user);
  const [data, setdata] = useState<Mg11Data>({
    address: '',
    age: '',
    availability: '',
    careNeeds: false,
    careNeedsDetails: '',
    civilProceedingsRelease: '',
    detailsExplained: false,
    dobPlace: '',
    email: '',
    ethnicity: '',
    formerName: '',
    gender: '',
    height: '',
    homeTel: '',
    incidentId: '',
    interviewerSignature: '',
    leafletReceived: false,
    likelyToAttend: false,
    likelyToAttendReason: '',
    medicalReleasedDefence: '',
    medicalReleasedPolice: '',
    mobileTel: '',
    name: '',
    occupation: '',
    postcode: '',
    prefContact: '',
    specialMeasures: false,
    statement: '',
    statementTakerName: '',
    statementWhereWhen: '',
    station: '',
    urn: '',
    visualRecording: false,
    witnessServiceDisclose: false,
    witnessSignature: '',
    witnessSignatureDate: '',
    workTel: '',
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
      navigate(`/app/incidents/view/${data.incidentId}`);
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const { data: InitData, loading } = useFetchMg11Query({
    onCompleted: (Initdata) => {
      const { mg11 } = Initdata;
      setdata({
        address: mg11?.address || '',
        age: mg11?.age || '',
        availability: mg11?.availability || '',
        careNeeds: mg11?.careNeeds || false,
        careNeedsDetails: mg11?.careNeedsDetails || '',
        civilProceedingsRelease: mg11?.civilProceedingsRelease || '',
        detailsExplained: mg11?.detailsExplained || false,
        dobPlace: mg11?.dobPlace || '',
        email: mg11?.email || '',
        ethnicity: mg11?.ethnicity || '',
        formerName: mg11?.formerName || '',
        gender: mg11?.gender || '',
        height: mg11?.height || '',
        homeTel: mg11?.homeTel || '',
        incidentId: mg11?.incidentId || '',
        interviewerSignature: mg11?.interviewerSignature || '',
        leafletReceived: mg11?.leafletReceived || false,
        likelyToAttend: mg11?.likelyToAttend || false,
        likelyToAttendReason: mg11?.likelyToAttendReason || '',
        medicalReleasedDefence: mg11?.medicalReleasedDefence || '',
        medicalReleasedPolice: mg11?.medicalReleasedPolice || '',
        mobileTel: mg11?.mobileTel || '',
        name: mg11?.name || '',
        occupation: mg11?.occupation || '',
        postcode: mg11?.postcode || '',
        prefContact: mg11?.prefContact || '',
        specialMeasures: mg11?.specialMeasures || false,
        statement: mg11?.statement || '',
        statementTakerName: userName || '',
        statementWhereWhen: mg11?.statementWhereWhen || '',
        station: mg11?.station || '',
        urn: mg11?.urn || '',
        visualRecording: mg11?.visualRecording || false,
        witnessServiceDisclose: mg11?.witnessServiceDisclose || false,
        witnessSignature: mg11?.witnessSignature || '',
        witnessSignatureDate: data.witnessSignatureDate
          ? new Date(data.witnessSignatureDate).toLocaleDateString('en-GB')
          : new Date().toLocaleDateString('en-GB'),
        workTel: mg11?.workTel || '',
      });
    },
    variables: {
      where: {
        id: id || '',
      },
    },
  });

  const onSubmit = () => {
    setSaving(true);
    void updateMg11({
      variables: {
        data: {
          interviewerSignature: { set: sign },
          status: { set: Mg11Status.Completed },
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

export default useFinalSignMg11;
