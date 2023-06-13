import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import {
  Mg11Status,
  useFetchMg11Query,
  useUpdateOneMg11Mutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import type { Mg11Data } from './FinalSignMg11.view';
import { useStoreState } from '../../../state';

const { useForm } = Form;

interface Return {
  onSubmit: () => void;
  saving: boolean;
  form: FormInstance;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  name: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  data: Mg11Data;
  status: Mg11Status;
  sign: string;
}

const useFinalSignMg11 = (): Return => {
  const [form] = useForm();
  const { fullName: userName } = useStoreState((state) => state.user);
  const [data, setdata] = useState<Mg11Data>({
    name: '',
    urn: '',
    age: '',
    witnessSignature: '',
    witnessSignatureDate: '',
    visualRecording: false,
    statement: '',
    address: '',
    postcode: '',
    homeTel: '',
    workTel: '',
    mobileTel: '',
    email: '',
    occupation: '',
    prefContact: '',
    gender: '',
    dobPlace: '',
    formerName: '',
    height: '',
    ethnicity: '',
    availability: '',
    likelyToAttend: false,
    likelyToAttendReason: '',
    specialMeasures: false,
    careNeeds: false,
    careNeedsDetails: '',
    station: '',
    statementWhereWhen: '',
    detailsExplained: false,
    leafletReceived: false,
    medicalReleasedPolice: '',
    medicalReleasedDefence: '',
    civilProceedingsRelease: '',
    witnessServiceDisclose: false,
    statementTakerName: '',
    interviewerSignature: '',
    incidentId: '',
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
      navigate(`/app/incidents/view/${data.incidentId}`);
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const { data: InitData, loading } = useFetchMg11Query({
    variables: {
      where: {
        id: id || '',
      },
    },
    onCompleted: (Initdata) => {
      const { mg11 } = Initdata;
      setdata({
        name: mg11?.name || '',
        urn: mg11?.urn || '',
        age: mg11?.age || '',
        witnessSignature: mg11?.witnessSignature || '',
        witnessSignatureDate: data.witnessSignatureDate
          ? new Date(data.witnessSignatureDate).toLocaleDateString('en-GB')
          : new Date().toLocaleDateString('en-GB'),
        visualRecording: mg11?.visualRecording || false,
        statement: mg11?.statement || '',
        address: mg11?.address || '',
        postcode: mg11?.postcode || '',
        homeTel: mg11?.homeTel || '',
        workTel: mg11?.workTel || '',
        mobileTel: mg11?.mobileTel || '',
        email: mg11?.email || '',
        occupation: mg11?.occupation || '',
        prefContact: mg11?.prefContact || '',
        gender: mg11?.gender || '',
        dobPlace: mg11?.dobPlace || '',
        formerName: mg11?.formerName || '',
        height: mg11?.height || '',
        ethnicity: mg11?.ethnicity || '',
        availability: mg11?.availability || '',
        likelyToAttend: mg11?.likelyToAttend || false,
        likelyToAttendReason: mg11?.likelyToAttendReason || '',
        specialMeasures: mg11?.specialMeasures || false,
        careNeeds: mg11?.careNeeds || false,
        careNeedsDetails: mg11?.careNeedsDetails || '',
        station: mg11?.station || '',
        statementWhereWhen: mg11?.statementWhereWhen || '',
        detailsExplained: mg11?.detailsExplained || false,
        leafletReceived: mg11?.leafletReceived || false,
        medicalReleasedPolice: mg11?.medicalReleasedPolice || '',
        medicalReleasedDefence: mg11?.medicalReleasedDefence || '',
        civilProceedingsRelease: mg11?.civilProceedingsRelease || '',
        witnessServiceDisclose: mg11?.witnessServiceDisclose || false,
        statementTakerName: userName || '',
        interviewerSignature: mg11?.interviewerSignature || '',
        incidentId: mg11?.incidentId || '',
      });
    },
  });

  const onSubmit = () => {
    setSaving(true);
    updateMg11({
      variables: {
        where: {
          id: id || '',
        },
        data: {
          interviewerSignature: { set: sign },
          status: { set: Mg11Status.Completed },
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

export default useFinalSignMg11;
