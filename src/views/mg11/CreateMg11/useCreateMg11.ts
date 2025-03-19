/* eslint-disable @typescript-eslint/naming-convention */
import type { FormInstance } from 'antd';
import type { ListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { Form, notification } from 'antd';
import { useCreateMg11Mutation } from 'graphql/mg11/mutations/__generated__/create-mg11.generated';
import { useListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';
import { Mg11Status } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';

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
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  interviewerFile: { file: string; name: string } | null;
  interviewerName: string;
  interviewerSelectedFont: string;
  interviewerSetFile: (value: { file: string; name: string } | null) => void;
  interviewerSetSelectedFont: (value: string) => void;
  interviewerSetTab: (value: string) => void;
  interviewerSign: string;
  interviewerTab: string;
  name: string;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setInterviewerSign: (value: string) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  statementTemplates: ListStatementTemplatesQuery | undefined;
  tab: string;
  update: (value: string) => void;
  updateInterviewer: (value: string) => void;
}

const useCreateMg11 = (): Return => {
  const intl = useIntl();
  const [form] = useForm<FormData>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);
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
        description: intl.formatMessage({
          defaultMessage:
            'The Mg11 has been created and sent to the witness to sign!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Created!',
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
      businessStatement: _,
      completeNow: __,
      over18,
      termsSignature: ___,
      ...data
    } = formData;

    void createMg11({
      variables: {
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
        schemeId,
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
    file,
    form,
    interviewerFile,
    interviewerName,
    interviewerSelectedFont,
    interviewerSetFile,
    interviewerSetSelectedFont,
    interviewerSetTab,
    interviewerSign,
    interviewerTab,
    name,
    onSubmit,
    saving,
    selectedFont,
    setFile,
    setInterviewerSign,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    statementTemplates,
    tab,
    update,
    updateInterviewer,
  };
};

export default useCreateMg11;
