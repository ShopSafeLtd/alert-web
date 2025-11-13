import type { WorkflowDataQuery } from '#/views/workflows/graphql/queries/__generated__/workflow-data.generated';
import type { OverUnder } from '#/views/workflows/ViewWorkflow/useWorkflowForm';
import type { FormInstance } from 'antd';
import type {
  AiVisionMatchConfidence,
  AiVisionMatchPriority,
  AnswerType,
} from 'graphql/types';

import { useApolloClient } from '@apollo/client';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import useActivityTemplates from '#/views/adminTodo/ActivityTemplates/useActivityTemplates';
import {
  useWorkflowDataQuery,
  WorkflowDataDocument,
} from '#/views/workflows/graphql/queries/__generated__/workflow-data.generated';
import { Form, notification } from 'antd';
import { DetectActionType, QuestionModel, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import { useUpsertConfigMutation } from '../graphql/mutations/__generated__/upsert-config.generated';
import { useViewDetectionConfigQuery } from '../graphql/queries/__generated__/view-detection-config.generated';

interface ListData {
  defaultDueDays: number;
  description: string;
  id: string;
  name: string;
  questions: {
    id: string;
    question: string;
  }[];
}

interface DetectionConfigData {
  sendEmail?: {
    message: string;
    title: string;
    users?: string[];
  };
  sendSMS?: {
    message: string;
  };
  sendNotification?: {
    message: string;
    title: string;
    users?: string[];
  };
  task?: {
    businesses?: string[];
    dueDays: number;
    name: string;
    questionGroupId?: string;
    questions: string[];
  };
  usersToGetFrom?: {
    adminGroups?: string[];
    createdBy?: boolean;
    groups?: string[];
    parentGroups?: boolean;
    parentGroupsAdmin?: boolean;
    roles?: string[];
    users?: string[];
  };
}

export type QuestionGroupData = ListData;
export interface Question {
  answer?: string | string[];
  id: string;
  options: { label: string; value: string }[];
  overUnder?: OverUnder;
  question: string;
  type: AnswerType;
}

export interface FormData {
  name: string;
  outcomeType?: 'activity' | 'notification' | 'email' | 'sms';
  sendEmailMessage: string;
  sendEmailTitle: string;
  sendEmailUsers: string[];
  sendNotificationMessage: string;
  sendNotificationTitle: string;
  sendNotificationUsers: string[];
  taskDescription: string;
  taskDueDays: number;
  taskName: string;
  taskQuestions: string[];
  useDynamicAdminGroups?: boolean;
  useDynamicGroups?: boolean;
  userManagementAdminGroups: string[];
  userManagementGroups: string[];
  userManagementRoles: string[];
  userManagementUsers: string[];
  minimumConfidenceTrigger: AiVisionMatchConfidence;
  minimumPriorityTrigger: AiVisionMatchPriority;
  sendSMSMessage: string;
  selectedCameras: string[];
  taskBusiness?: string[];
}

export type LabelValue = { label: string; value: string };
interface Return {
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  createNewQuestion: (id: string, question: string) => void;
  editId?: string;
  form: FormInstance<FormData>;
  loading: boolean;
  newQuestion: boolean;
  onClose: () => void;
  onFinish: (formData: FormData) => void;
  questionGroups: QuestionGroupData[];
  saving: boolean;
  schemeId: string;
  selectedQuestions: Question[];
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedActivity: (q: QuestionGroupData) => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  taskQuestions: Question[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
}

const useDetectionConfigForm = (): Return => {
  const [form] = Form.useForm<FormData>();

  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const { id: EditId } = useParams();

  const [saving, setSaving] = useState(false);
  const [activityTemplateForm, setActivityTemplateForm] = useState(false);

  const [selectedActivity, setSelectedActivity] =
    useState<QuestionGroupData | null>(null);
  const [newQuestion, setNewQuestion] = useState<boolean>(false);
  const [availableQuestions, setAvailableQuestions] = React.useState<
    Question[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = React.useState<Question[]>(
    []
  );
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const client = useApolloClient();

  const { data, loading } = useWorkflowDataQuery({
    variables: {
      orderBy: {
        question: SortOrder.Asc,
      },
      questionsWhere: {
        deleted: {
          equals: false,
        },
      },
      schemeTagsOrderBy: {
        name: SortOrder.Asc,
      },
      where: {
        id: currentScheme,
      },
    },
  });

  const intl = useIntl();

  const [upsertDetection] = useUpsertConfigMutation({
    onCompleted: () => {
      setSaving(false);
      navigate('/app/vision/detection-configs');
    },
    onError: () => {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error!',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
  });
  const {
    loading: templatesLoading,
    tableData,
    updateTemplates,
  } = useActivityTemplates();

  const navigate = useNavigate();

  const { data: editDetectionData, loading: editDetectionLoading } =
    useViewDetectionConfigQuery({
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ detectionConfig }) => {
        if (detectionConfig) {
          const action = detectionConfig.eventData as DetectionConfigData;

          const newCombined = {
            groups: [...(detectionConfig?.usersToGet?.groups || [])],
            users: [...(detectionConfig?.usersToGet?.users || [])],
          };

          // Determine the outcome type based on what's defined
          let outcomeType:
            | 'activity'
            | 'notification'
            | 'email'
            | 'sms'
            | undefined;
          if (action?.task?.name) {
            outcomeType = 'activity';
          } else if (action?.sendNotification) {
            outcomeType = 'notification';
          } else if (action?.sendEmail) {
            outcomeType = 'email';
          } else if (action?.sendSMS) {
            outcomeType = 'sms';
          }

          form.setFieldsValue({
            name: detectionConfig.name,
            outcomeType,
            sendEmailMessage: action?.sendEmail?.message || '',
            sendEmailTitle: action?.sendEmail?.title || '',
            sendEmailUsers: action?.sendEmail?.users || [],
            sendNotificationMessage: action?.sendNotification?.message || '',
            sendNotificationTitle: action?.sendNotification?.title || '',
            sendNotificationUsers: action?.sendNotification?.users || [],
            taskDueDays: action?.task?.dueDays,
            taskName: action?.task?.name,
            taskQuestions: action?.task?.questions,
            taskBusiness: action?.task?.businesses,
            useDynamicAdminGroups: !!action?.usersToGetFrom?.parentGroupsAdmin,
            useDynamicGroups: !!action?.usersToGetFrom?.parentGroups,
            userManagementAdminGroups:
              action?.usersToGetFrom?.adminGroups || [],
            userManagementGroups: newCombined.groups,
            userManagementRoles: action?.usersToGetFrom?.roles || [],
            userManagementUsers: newCombined.users,
            minimumPriorityTrigger: detectionConfig.minimumPriorityTrigger,
            minimumConfidenceTrigger: detectionConfig.minimumConfidenceTrigger,
            sendSMSMessage: action?.sendSMS?.message || '',
            selectedCameras:
              detectionConfig.camera.length > 0
                ? detectionConfig.camera.map((cam) => cam.id)
                : [],
          });
        }
      },
      skip: !EditId,
      variables: {
        id: EditId || '',
      },
    });

  useEffect(() => {
    if (!editDetectionData || !editDetectionData.detectionConfig.eventData)
      return;
    const action = editDetectionData.detectionConfig
      .eventData as DetectionConfigData;

    if (
      !action ||
      !action.task?.questions ||
      !tableData ||
      tableData.length === 0
    )
      return;

    if (selectedActivity) return;

    const foundActivity = tableData.find(
      (activity) => activity.id === action.task?.questionGroupId
    );

    if (foundActivity) setSelectedActivity(foundActivity);
  }, [tableData, editDetectionData]);

  const taskQuestions: Question[] = useMemo(() => {
    if (data?.scheme?.questions) {
      return data.scheme.questions
        .filter(({ questionOn }) => questionOn === QuestionModel.Task)
        .map(({ id, optionsFormFormatted, questionFormatted, type }) => ({
          id,
          options:
            optionsFormFormatted?.map(({ label, value }) => ({
              label,
              value: value.toLowerCase(),
            })) || [],
          question: questionFormatted || '',
          type,
        }));
    }
    return [];
  }, [data]);

  const questionGroups: QuestionGroupData[] = useMemo(() => {
    if (tableData) {
      return tableData.map(
        ({ defaultDueDays, description, id, name, questions: qs }) => ({
          defaultDueDays,
          description,
          id,
          name,
          questions: qs,
        })
      );
    }
    return [];
  }, [tableData]);

  useEffect(() => {
    setAvailableQuestions(taskQuestions);
  }, [taskQuestions]);

  const createNewQuestion = (id: string, q: string) => {
    setNewQuestion(false);
    form.setFieldValue('taskQuestions', [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...form.getFieldValue('taskQuestions'),
      id,
    ]);

    const existingData = client.readQuery<WorkflowDataQuery>({
      query: WorkflowDataDocument,
      variables: {
        questionsWhere: {
          deleted: {
            equals: false,
          },
        },
        where: {
          id: currentScheme,
        },
      },
    });

    if (existingData?.scheme === null || existingData?.scheme === undefined)
      return;

    if (
      existingData?.scheme?.questions === null ||
      existingData?.scheme?.questions === undefined
    )
      return;

    client.writeQuery<WorkflowDataQuery>({
      data: {
        scheme: {
          ...existingData.scheme,
          questions: [
            ...existingData.scheme.questions,
            {
              id,
              optionsFormFormatted: [],
              questionFormatted: q,
              questionOn: QuestionModel.Task,
              type: 'TEXT' as AnswerType,
            },
          ],
        },
      },
      query: WorkflowDataDocument,
      variables: {
        questionsWhere: {
          deleted: {
            equals: false,
          },
        },
        where: {
          id: currentScheme,
        },
      },
    });
  };
  const onClose = () => {
    setActivityTemplateForm(false);
    setNewQuestion(false);
  };

  useEffect(() => {
    if (
      editDetectionData &&
      taskQuestions.length > 0 &&
      availableQuestions.length > 0
    ) {
      const action = editDetectionData.detectionConfig
        .eventData as DetectionConfigData;

      const taskQuestionsWorkflow = action?.task?.questions;
      if (taskQuestions) {
        form.setFieldsValue({
          taskQuestions: taskQuestionsWorkflow,
        });
      }
    }
  }, [editDetectionData, taskQuestions, availableQuestions, selectedQuestions]);

  const onFinish = (values: FormData) => {
    setSaving(true);

    // Map outcomeType to DetectActionType enum
    const typeMap: Record<
      'activity' | 'notification' | 'email' | 'sms',
      DetectActionType
    > = {
      activity: DetectActionType.Activity,
      email: DetectActionType.Email,
      notification: DetectActionType.PushNotification,
      sms: DetectActionType.Sms,
    };

    if (!values.outcomeType) {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Please select an outcome type.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Missing Outcome Type',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
      return;
    }

    const actionData: DetectionConfigData = {
      sendEmail:
        values.outcomeType === 'email' && values.sendEmailTitle
          ? {
              message: values.sendEmailMessage,
              title: values.sendEmailTitle,
              users: values.sendEmailUsers,
            }
          : undefined,
      sendNotification:
        values.outcomeType === 'notification' && values.sendNotificationTitle
          ? {
              message: values.sendNotificationMessage,
              title: values.sendNotificationTitle,
              users: values.sendNotificationUsers,
            }
          : undefined,
      sendSMS:
        values.outcomeType === 'sms' && values.sendSMSMessage
          ? {
              message: values.sendSMSMessage,
            }
          : undefined,

      task:
        values.outcomeType === 'activity' && values.taskName
          ? {
              businesses: values.taskBusiness,
              dueDays: values.taskDueDays,
              name: values.taskName,
              questions: values.taskQuestions,
            }
          : undefined,
    };

    const initCameras =
      editDetectionData?.detectionConfig.camera.map((cam) => cam.id) || [];
    const camerasToAdd = values.selectedCameras.filter(
      (id) => !initCameras.includes(id)
    );
    const camerasToRemove = initCameras.filter(
      (id) => !values.selectedCameras.includes(id)
    );

    void upsertDetection({
      variables: {
        data: {
          camerasToAdd,
          camerasToRemove,
          eventData: actionData,
          id: EditId,
          minimumConfidenceTrigger: values.minimumConfidenceTrigger,
          minimumPriorityTrigger: values.minimumPriorityTrigger,
          name: values.name,
          scheme: currentScheme,
          type: typeMap[values.outcomeType],
          usersToGet: {
            adminGroups: values.userManagementAdminGroups,
            groups: values.userManagementGroups,
            parentGroups: values.useDynamicGroups,
            parentGroupsAdmin: values.useDynamicAdminGroups,
            roles: values.userManagementRoles,
            users: values.userManagementUsers,
          },
        },
      },
    });
  };

  return {
    activityTemplateForm,
    availableQuestions,
    createNewQuestion,
    editId: EditId,
    form,
    loading: loading || templatesLoading || editDetectionLoading,
    newQuestion,
    onClose,
    onFinish,
    questionGroups,
    saving,
    schemeId,
    selectedQuestions,
    setActivityTemplateForm,
    setAvailableQuestions,
    setNewQuestion,
    setSelectedActivity,
    setSelectedQuestions,
    taskQuestions,
    updateTemplates,
  };
};

export default useDetectionConfigForm;
