import type { FormInstance } from 'antd';

import { Form } from 'antd';
import { useCreateOneBusinessImpactMutation } from 'graphql/reports/mutations/__generated__/create-business-impact.generated';
import { useBusinessImpactQuery } from 'graphql/reports/queries/__generated__/business-impact-statement.generated';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useNavigate, useParams } from 'react-router-dom';

import type { FormData, IncidentData } from './CreateImpact.view';

import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { useStoreState } from '../../../state';

const { useForm } = Form;

interface Return {
  data: FormData;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  incidentData: IncidentData;
  name: string;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  tab: string;
  update: (value: string) => void;
}
const useCreateImpact = (): Return => {
  const name = useStoreState((state) => state.user.fullName);
  const { id: incidentId } = useParams();
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [data, setData] = useState<FormData>({} as FormData);
  const { data: InitData, loading } = useBusinessImpactQuery({
    onCompleted: (d) => {
      form.setFieldsValue({
        businessAddress: d.businessImpact?.businessAddress || '',
        businessName: d.businessImpact?.businessName || '',
        compensation: '',
        contactAddress: d.businessImpact?.contactAddress || '',
        contactName: d.businessImpact?.contactName || '',
        crimeNumber: d.businessImpact?.crimeNumber || '',
        date: new Date().toDateString(),
        directLossStatement: '',
        financialImpact: '',
        nonFinancialImpact: '',
        otherComments: '',
        otherLossStatement: '',
        policeOfficerAttending: d.businessImpact?.policeOfficerAttending || '',
        signature: '',
        telephone: d.businessImpact?.telephone || '',
      });
      setData({
        businessAddress: d.businessImpact?.businessAddress || '',
        businessName: d.businessImpact?.businessName || '',
        compensation: '',
        contactAddress: d.businessImpact?.contactAddress || '',
        contactName: d.businessImpact?.contactName || '',
        crimeNumber: d.businessImpact?.crimeNumber || '',
        date: new Date().toDateString(),
        directLossStatement: '',
        financialImpact: '',
        nonFinancialImpact: '',
        otherComments: '',
        otherLossStatement: '',
        policeOfficerAttending: d.businessImpact?.policeOfficerAttending || '',
        signature: '',
        telephone: d.businessImpact?.telephone || '',
      });
    },
    variables: {
      where: {
        id: incidentId || '',
      },
    },
  });

  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [sign, setSign] = useState(
    ReactDOMServer.renderToString(
      <SigSeal
        font={selectedFont}
        height={100}
        key={selectedFont}
        name={name}
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
    void createImpact({
      variables: {
        data: {
          ...value,
          date: new Date().toDateString(),

          incidentID: incidentId || '',
          signature: sign,
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
    businessAddress: InitData?.businessImpact?.businessAddress || '',
    businessName: InitData?.businessImpact?.businessName || '',
    description: InitData?.businessImpact?.description || '',
    incidentDate: InitData?.businessImpact?.incidentDate || '',
    incidentLoss: InitData?.businessImpact?.incidentLoss || '',
    incidentRecovered: InitData?.businessImpact?.incidentRecovered || '',
    lostItems: InitData?.businessImpact?.lostItems || [],
    referenceNumber: InitData?.businessImpact?.referenceNumber || '',
    userAddress: InitData?.businessImpact?.userAddress || '',
    userContact: InitData?.businessImpact?.userContact || '',
    userName: InitData?.businessImpact?.userName || '',
  };
  return {
    data,
    file,
    form,
    incidentData,
    name,
    onSubmit,
    saving: saving || loading,
    selectedFont,
    setFile,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    tab,
    update,
  };
};

export default useCreateImpact;
