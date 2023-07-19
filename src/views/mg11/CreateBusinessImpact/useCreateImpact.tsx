import { useNavigate, useParams } from 'react-router-dom';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  useBusinessImpactQuery,
  useCreateOneBusinessImpactMutation,
} from '../../../graphql/generated';
import type { FormData, IncidentData } from './CreateImpact.view';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { useStoreState } from '../../../state';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';

const { useForm } = Form;

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
  sign: string;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  name: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  incidentData: IncidentData;
  data: FormData;
}
const useCreateImpact = (): Return => {
  const name = useStoreState((state) => state.user.fullName);
  const { id: incidentId } = useParams();
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [data, setData] = useState<FormData>({} as FormData);
  const { data: InitData, loading } = useBusinessImpactQuery({
    variables: {
      where: {
        id: incidentId || '',
      },
    },
    onCompleted: (d) => {
      form.setFieldsValue({
        businessName: d.businessImpact?.businessName || '',
        businessAddress: d.businessImpact?.businessAddress || '',
        contactName: d.businessImpact?.contactName || '',
        telephone: d.businessImpact?.telephone || '',
        contactAddress: d.businessImpact?.contactAddress || '',
        crimeNumber: d.businessImpact?.crimeNumber || '',
        policeOfficerAttending: d.businessImpact?.policeOfficerAttending || '',
        financialImpact: '',
        directLossStatement: '',
        otherLossStatement: '',
        nonFinancialImpact: '',
        otherComments: '',
        compensation: '',
        signature: '',
        date: new Date().toDateString(),
      });
      setData({
        businessName: d.businessImpact?.businessName || '',
        businessAddress: d.businessImpact?.businessAddress || '',
        contactName: d.businessImpact?.contactName || '',
        telephone: d.businessImpact?.telephone || '',
        contactAddress: d.businessImpact?.contactAddress || '',
        crimeNumber: d.businessImpact?.crimeNumber || '',
        policeOfficerAttending: d.businessImpact?.policeOfficerAttending || '',
        financialImpact: '',
        directLossStatement: '',
        otherLossStatement: '',
        nonFinancialImpact: '',
        otherComments: '',
        compensation: '',
        signature: '',
        date: new Date().toDateString(),
      });
    },
  });

  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [sign, setSign] = useState(
    ReactDOMServer.renderToString(
      <SigSeal
        key={selectedFont}
        name={name}
        font={selectedFont}
        height={100}
        width={300}
      />
    )
  );
  const [tab, setTab] = useState('generate');
  const [file, setFile] = useState<{
    file: string;
    name: string;
  } | null>(null);
  const navigate = useNavigate();

  const [createImpact] = useCreateOneBusinessImpactMutation({
    onCompleted: () => {
      navigate(`/app/incidents/view/${incidentId || ''}`);
    },
  });

  const onSubmit = (value: FormData) => {
    setSaving(true);
    createImpact({
      variables: {
        data: {
          ...value,
          date: new Date().toDateString(),

          signature: sign,
          incidentID: incidentId || '',
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };

  const update = (value: string) => {
    setSign(value);
  };

  const incidentData: IncidentData = {
    userName: InitData?.businessImpact?.userName || '',
    userAddress: InitData?.businessImpact?.userAddress || '',
    userContact: InitData?.businessImpact?.userContact || '',
    businessName: InitData?.businessImpact?.businessName || '',
    businessAddress: InitData?.businessImpact?.businessAddress || '',
    referenceNumber: InitData?.businessImpact?.referenceNumber || '',
    incidentDate: InitData?.businessImpact?.incidentDate || '',
    incidentLoss: InitData?.businessImpact?.incidentLoss || '',
    incidentRecovered: InitData?.businessImpact?.incidentRecovered || '',
    description: InitData?.businessImpact?.description || '',
    lostItems: InitData?.businessImpact?.lostItems || [],
  };
  return {
    onSubmit,
    saving: saving || loading,
    form,
    setSign,
    sign,
    file,
    incidentData,
    name,
    setFile,
    setSelectedFont,
    selectedFont,
    setTab,
    tab,
    update,
    data,
  };
};

export default useCreateImpact;
