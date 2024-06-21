/* eslint-disable @typescript-eslint/naming-convention */
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';

import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import type { ListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/list-templates.generated';
import { useListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/list-templates.generated';
import { useCreateMg11Mutation } from 'graphql/mg11/mutations/create-mg11.generated';
import { Mg11Status } from 'graphql/types';

const { useForm } = Form;

export interface FormData {
  address?: string;
  age?: string;
  availability?: string;
  businessStatement?: string;
  careNeeds?: string;
  careNeedsDetails?: string;
  civilProceedingsRelease?: string;
  completeNow?: string;
  detailsExplained?: string;
  dobPlace?: string;
  email?: string;
  ethnicity?: string;
  ethnicityOther?: string;
  formerName?: string;
  gender?: string;
  height?: string;
  homeTel?: string;
  leafletReceived?: string;
  likelyToAttend?: string;
  likelyToAttendReason?: string;
  medicalReleasedDefence?: string;
  medicalReleasedPolice?: string;
  mobileTel?: string;
  name?: string;
  occupation?: string;
  over18?: string;
  postcode?: string;
  prefContact?: string;
  signature?: string;
  specialMeasures?: string;
  statement?: string;
  statementWhereWhen?: string;
  station?: string;
  termsSignature?: string;
  urn?: string;
  visualRecording?: string;
  witnessServiceDisclose?: string;
  witnessSignatureDate?: string;
  workTel?: string;
}

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
  interviewerSign: string;
  setInterviewerSign: (value: string) => void;
  interviewerName: string;
  updateInterviewer: (value: string) => void;
  interviewerSelectedFont: string;
  interviewerFile: { file: string; name: string } | null;
  interviewerSetSelectedFont: (value: string) => void;
  interviewerSetFile: (value: { file: string; name: string } | null) => void;
  interviewerTab: string;
  interviewerSetTab: (value: string) => void;
  statementTemplates: ListStatementTemplatesQuery | undefined;
}

const useCreateMg11 = (): Return => {
  const intl = useIntl();
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const { id: incidentId } = useParams();
  const { fullName: interviewerName } = useStoreState((state) => state.user);
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [sign, setSign] = useState('');
  const [tab, setTab] = useState('generate');
  const [file, setFile] = useState<{
    file: string;
    name: string;
  } | null>(null);

  const [interviewerSelectedFont, interviewerSetSelectedFont] = useState(
    FONT_FAMILIES[0]
  );
  const [interviewerSign, setInterviewerSign] = useState('');
  const [interviewerTab, interviewerSetTab] = useState('generate');
  const [interviewerFile, interviewerSetFile] = useState<{
    file: string;
    name: string;
  } | null>(null);

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const businessStatement = Form.useWatch('businessStatement', form) === 'true';

  const [createMg11] = useCreateMg11Mutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Created!',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The Mg11 has been created and sent to the witness to sign!',
        }),
        placement: 'bottomRight',
      });
      if (businessStatement) {
        navigate(`/app/mg11/create-bis/${incidentId || ''}`);
      } else if (incidentId) {
        navigate(`/app/incidents/view/${incidentId || ''}`);
      } else {
        window.history.back();
      }
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const { data: statementTemplates } = useListStatementTemplatesQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  const completeNow = Form.useWatch('completeNow', form) === 'true';

  const onSubmit = (formData: FormData) => {
    setSaving(true);

    const {
      over18,
      businessStatement: _,
      completeNow: __,
      termsSignature: ___,
      ...data
    } = formData;

    void createMg11({
      variables: {
        schemeId,
        data: {
          ...data,
          age: over18 && over18 === 'true' ? 'Over 18' : data.age,
          careNeeds: data.careNeeds === 'true',
          civilProceedingsRelease: data.civilProceedingsRelease,
          createdBy: {
            connect: {
              id: userId,
            },
          },
          detailsExplained: data.detailsExplained === 'true',
          ethnicity:
            data.ethnicity === 'other' ? data.ethnicityOther : data.ethnicity,
          incident: incidentId
            ? {
                connect: {
                  id: incidentId,
                },
              }
            : undefined,
          interviewerSignature: interviewerSign,
          leafletReceived: data.leafletReceived === 'true',
          likelyToAttend: data.likelyToAttend === 'true',
          medicalReleasedDefence: data.medicalReleasedDefence,
          medicalReleasedPolice: data.medicalReleasedPolice,
          specialMeasures: data.specialMeasures === 'true',
          status: completeNow ? Mg11Status.Completed : Mg11Status.Sent,
          visualRecording: data.visualRecording === 'true',
          witnessServiceDisclose: data.witnessServiceDisclose === 'true',
          witnessSignature: sign,
          witnessSignatureDate: new Date(),
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };

  const update = (value: string) => {
    setSign(value);
  };

  const updateInterviewer = (value: string) => {
    setInterviewerSign(value);
  };

  const name = Form.useWatch('name', form) || '';

  return {
    onSubmit,
    saving,
    form,
    setSign,
    sign,
    setInterviewerSign,
    interviewerName,
    interviewerFile,
    interviewerSetFile,
    interviewerSetSelectedFont,
    interviewerSelectedFont,
    interviewerSign,
    file,
    selectedFont,
    name,
    setFile,
    setSelectedFont,
    updateInterviewer,
    update,
    tab,
    setTab,
    interviewerSetTab,
    interviewerTab,
    statementTemplates,
  };
};

export default useCreateMg11;
