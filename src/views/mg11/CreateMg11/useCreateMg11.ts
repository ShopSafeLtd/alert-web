import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import type { ListStatementTemplatesQuery } from 'graphql/generated';
import {
  Mg11Status,
  useCreateMg11Mutation,
  useListStatementTemplatesQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';

const { useForm } = Form;

export interface FormData {
  statement?: string;
  address?: string;
  postcode?: string;
  homeTel?: string;
  workTel?: string;
  mobileTel?: string;
  email?: string;
  name?: string;
  over18?: string;
  age?: string;
  urn?: string;
  occupation?: string;
  visualRecording?: string;
  prefContact?: string;
  gender?: string;
  dobPlace?: string;
  formerName?: string;
  height?: string;
  ethnicity?: string;
  ethnicityOther?: string;
  availability?: string;
  likelyToAttend?: string;
  likelyToAttendReason?: string;
  specialMeasures?: string;
  careNeeds?: string;
  careNeedsDetails?: string;
  station?: string;
  statementWhereWhen?: string;
  businessStatement?: string;
  completeNow?: string;
  detailsExplained?: string;
  leafletReceived?: string;
  medicalReleasedPolice?: string;
  medicalReleasedDefence?: string;
  civilProceedingsRelease?: string;
  witnessServiceDisclose?: string;
  signature?: string;
  witnessSignatureDate?: string;
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
          id: 'ocw1NP',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The Mg11 has been created and sent to the witness to sign!',
          id: 'kAfpt1',
        }),
        placement: 'bottomRight',
      });
      if (businessStatement) {
        navigate(`/app/mg11/create-bis/${incidentId || ''}`);
      } else {
        navigate(`/app/incidents/view/${incidentId || ''}`);
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
    // // eslint-disable-next-line no-param-reassign
    // delete data.over18;
    // // eslint-disable-next-line no-param-reassign
    // delete data.businessStatement;
    // // eslint-disable-next-line no-param-reassign
    // delete data.completeNow;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      over18,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      businessStatement: bStatement,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      completeNow: completeN,
      ...data
    } = formData;

    createMg11({
      variables: {
        schemeId,
        data: {
          ...data,
          age: over18 && over18 === 'true' ? 'Over 18' : data.age,
          likelyToAttend: data.likelyToAttend === 'true',
          specialMeasures: data.specialMeasures === 'true',
          careNeeds: data.careNeeds === 'true',
          visualRecording: data.visualRecording === 'true',
          witnessSignatureDate: new Date(),
          detailsExplained: data.detailsExplained === 'true',
          leafletReceived: data.leafletReceived === 'true',
          medicalReleasedPolice: data.medicalReleasedPolice,
          medicalReleasedDefence: data.medicalReleasedDefence,
          civilProceedingsRelease: data.civilProceedingsRelease,
          witnessServiceDisclose: data.witnessServiceDisclose === 'true',
          witnessSignature: sign,
          interviewerSignature: interviewerSign,
          ethnicity:
            data.ethnicity === 'other' ? data.ethnicityOther : data.ethnicity,
          status: completeNow ? Mg11Status.Completed : Mg11Status.Sent,
          incident: {
            connect: {
              id: incidentId,
            },
          },
          createdBy: {
            connect: {
              id: userId,
            },
          },
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
  const { fullName: interviewerName } = useStoreState((state) => state.user);
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
