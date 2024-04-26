import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useStoreState } from 'state';
import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useIntl } from 'react-intl';
import type {
  AnswerType,
  IncidentPriority,
  WorkflowDataQuery,
} from 'graphql/generated';
import {
  Model,
  QuestionModel,
  useCreateOneWorkflowMutation,
  useListGoodsTypesQuery,
  useUpdateOneWorkflowMutation,
  useViewWorkflowQuery,
  useWorkflowDataQuery,
  WorkflowActionType,
  WorkflowDataDocument,
  WorkflowTrigger,
} from 'graphql/generated';
import type { ListData } from '../../adminTodo/useActivities';
import useActivityTemplates from '../../adminTodo/useActivities';

interface WorkflowData {
  autoApprove?: boolean;
  sendEmail?: {
    message: string;
    users: string[];
    title: string;
  };
  sendNotification?: {
    message: string;
    users: string[];
    title: string;
  };
  setPriority?: string;
  task?: {
    name: string;
    assignTo: string[];
    assignToGroups: string[];
    dueDays: number;
    questions: string[];
  };
}

type AnyAll = 'any' | 'all';
export type OverUnder = 'over' | 'under';

interface WorkflowConditions {
  anyAll: AnyAll;
  descriptionWords?: {
    anyAll: AnyAll;
    words: string[] | undefined;
  };
  goodsType?: {
    anyAll: AnyAll;
    goods: string[] | undefined;
  };
  incidentTimeCount?: {
    noDays: string;
    noIncidents: string;
  };
  incidentWhileBan?: string | boolean;
  lessThanValue?: string;
  questions?: {
    anyAll: AnyAll;
    questions: {
      id: string;
      answer: string | string[];
      type: AnswerType;
      overUnder?: OverUnder;
    }[];
  };
  tags?: {
    anyAll: AnyAll;
    tags: string[] | undefined;
  };
  totalValue?: string | boolean;
}

export type QuestionGroupData = ListData;
export interface Question {
  id: string;
  type: AnswerType;
  question: string;
  options: { value: string; label: string }[];
  answer?: string | string[];
  overUnder?: OverUnder;
}

export interface FormData {
  assigneeGroups: string[];
  autoApprove: boolean;
  autoApproveCheck: boolean;
  descriptionCheck: boolean;
  descriptionCondition: AnyAll;
  descriptionWords: string[];
  goodsType: string[];
  goodsTypeCheck: boolean;
  goodsTypeCondition: AnyAll;
  incidentTimeCountCheck: boolean;
  incidentTimeCountDays: number;
  incidentTimeCountIncidents: number;
  incidentWhileBanCheck: boolean;
  lessThanCheck: boolean;
  lessThanPrice: number;
  name: string;
  option: AnyAll;
  questionChecked: boolean;
  questionMethod: AnyAll;
  selectedGroup: string;
  sendEmailCheck: boolean;
  sendEmailMessage: string;
  sendEmailTitle: string;
  sendEmailUsers: string[];
  sendNotificationCheck: boolean;
  sendNotificationMessage: string;
  sendNotificationTitle: string;
  sendNotificationUsers: string[];
  setPrioCheck: boolean;
  setPriority: IncidentPriority;
  tagMethod: AnyAll;
  tagOptions: string[];
  tags: boolean;
  taskAssignee: string[];
  taskDescription: string;
  taskDueDays: number;
  taskName: string;
  taskOutcome: boolean;
  taskQuestions: string[];
  valueCheck: boolean;
  valuePrice: number;
  workflowType?: Model | null;
}

export type LabelValue = { label: string; value: string };
interface Return {
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  createNewQuestion: (id: string, question: string) => void;
  descriptionCheck: boolean;
  form: FormInstance<FormData>;
  goods: { label: string; value: string }[];
  goodsTypeCheck: boolean;
  groups: LabelValue[];
  incidentTimeCountCheck: boolean;
  lessThanSelected: boolean;
  loading: boolean;
  modelSelected: Model | null | undefined;
  newQuestion: boolean;
  onClose: () => void;
  onFinish: (formData: FormData) => void;
  questionGroups: QuestionGroupData[];
  questions: Question[];
  questionsSelected: boolean;
  saving: boolean;
  selectedQuestions: Question[];
  sendEmailCheck: boolean;
  sendNotificationCheck: boolean;
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedActivity: (q: QuestionGroupData) => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  tags: LabelValue[];
  tagsSelected: boolean;
  taskOutcome: boolean;
  taskQuestions: Question[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
  users: LabelValue[];
  valueSelected: boolean;
}

const useWorkflowForm = (): Return => {
  const [form] = Form.useForm<FormData>();

  const currentScheme = useStoreState((state) => state.scheme.id);
  const { id: EditId } = useParams();

  const [saving, setSaving] = useState(false);
  const [activityTemplateForm, setActivityTemplateForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_selectedActivity, setSelectedActivity] =
    useState<QuestionGroupData | null>(null);
  const [initiated, setInitiated] = useState(false);
  const [newQuestion, setNewQuestion] = useState<boolean>(false);
  const [availableQuestions, setAvailableQuestions] = React.useState<
    Question[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = React.useState<Question[]>(
    []
  );

  const client = useApolloClient();

  const { data, loading } = useWorkflowDataQuery({
    variables: {
      where: {
        id: currentScheme,
      },
      questionsWhere: {
        deleted: {
          equals: false,
        },
      },
    },
  });

  const intl = useIntl();

  const [createWorkflow] = useCreateOneWorkflowMutation({
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error!',
          id: 'DIDBlF',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors.',
          id: 'B7tmCj',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
    onCompleted: () => {
      setSaving(false);
      window.history.back();
    },
  });
  const {
    templateData,
    loading: templatesLoading,
    updateTemplates,
  } = useActivityTemplates();

  const tagsSelected = Form.useWatch('tags', form);
  const valueSelected = Form.useWatch('valueCheck', form);
  const questionsSelected = Form.useWatch('questionChecked', form);
  const modelSelected = Form.useWatch('workflowType', form);
  const lessThanSelected = Form.useWatch('lessThanCheck', form);
  const goodsTypeCheck = Form.useWatch('goodsTypeCheck', form);
  const descriptionCheck = Form.useWatch('descriptionCheck', form);
  const incidentTimeCountCheck = Form.useWatch('incidentTimeCountCheck', form);
  const taskOutcome = Form.useWatch('taskOutcome', form);
  const sendEmailCheck = Form.useWatch('sendEmailCheck', form);
  const sendNotificationCheck = Form.useWatch('sendNotificationCheck', form);

  const { data: editWorkflowData, loading: editWorkflowLoading } =
    useViewWorkflowQuery({
      skip: !EditId,
      variables: {
        where: {
          id: EditId || '',
        },
      },
      onCompleted: ({ workflow }) => {
        if (workflow) {
          const action = workflow.actions[0]?.data as WorkflowData;
          const conditions = workflow.conditions as WorkflowConditions;
          form.setFieldsValue({
            name: workflow.name,
            taskName: action?.task?.name,
            taskAssignee: action?.task?.assignTo,
            assigneeGroups: action?.task?.assignToGroups,
            taskDueDays: action?.task?.dueDays,
            taskQuestions: action?.task?.questions,
            taskOutcome: !!action?.task?.name,

            option: conditions?.anyAll,
            tags: !!conditions?.tags?.tags,
            tagMethod: conditions?.tags?.anyAll,
            tagOptions: conditions?.tags?.tags,
            valueCheck: !!conditions?.totalValue,
            valuePrice: conditions?.totalValue
              ? typeof conditions.totalValue === 'string'
                ? Number.parseInt(conditions.totalValue, 10)
                : 0
              : 0,
            questionChecked: !!conditions?.questions,
            questionMethod: conditions?.questions?.anyAll,
            workflowType: workflow.triggerModels,
            autoApprove: action?.autoApprove,
            autoApproveCheck: action?.autoApprove !== undefined,
            descriptionCheck:
              conditions?.descriptionWords !== undefined &&
              conditions.descriptionWords.words &&
              conditions.descriptionWords.words?.length > 0,
            descriptionCondition: conditions?.descriptionWords?.anyAll,
            descriptionWords: conditions?.descriptionWords?.words || [],
            goodsTypeCheck:
              conditions?.goodsType !== undefined &&
              conditions.goodsType.goods &&
              conditions.goodsType.goods?.length > 0,
            goodsTypeCondition: conditions?.goodsType?.anyAll,
            goodsType: conditions?.goodsType?.goods || [],
            incidentTimeCountCheck:
              conditions?.incidentTimeCount !== undefined &&
              !!conditions.incidentTimeCount.noDays &&
              !!conditions.incidentTimeCount.noIncidents,
            incidentTimeCountDays: conditions?.incidentTimeCount?.noDays
              ? Number.parseInt(conditions.incidentTimeCount.noDays, 10)
              : 0,
            incidentTimeCountIncidents: conditions?.incidentTimeCount
              ?.noIncidents
              ? Number.parseInt(conditions.incidentTimeCount.noIncidents, 10)
              : 0,
            incidentWhileBanCheck:
              conditions?.incidentWhileBan !== undefined &&
              !!conditions?.incidentWhileBan,
            lessThanCheck:
              conditions?.lessThanValue !== undefined &&
              !!conditions?.lessThanValue,
            lessThanPrice: conditions?.lessThanValue
              ? Number.parseInt(conditions.lessThanValue, 10)
              : 0,
            sendEmailCheck:
              action?.sendEmail !== undefined && !!action?.sendEmail,
            sendEmailMessage: action?.sendEmail?.message || '',
            sendEmailTitle: action?.sendEmail?.title || '',
            sendEmailUsers: action?.sendEmail?.users || [],
            sendNotificationCheck:
              action?.sendNotification !== undefined &&
              !!action?.sendNotification,
            sendNotificationMessage: action?.sendNotification?.message || '',
            sendNotificationTitle: action?.sendNotification?.title || '',
            sendNotificationUsers: action?.sendNotification?.users || [],
            setPrioCheck:
              action?.setPriority !== undefined && !!action?.setPriority,
            setPriority: action?.setPriority as IncidentPriority,
          });
        }
      },
    });

  const groups = useMemo(() => {
    if (data && data.scheme && data.scheme.groups) {
      return data.scheme.groups.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
    }
    return [];
  }, [data]);
  const tags = useMemo(() => {
    if (data && data.scheme && data.scheme.schemeTags) {
      return data.scheme.schemeTags.map(({ name, id }) => ({
        label: name,
        value: id,
      }));
    }
    return [];
  }, [data]);
  const questions: Question[] = useMemo(() => {
    if (data && data.scheme && data.scheme.questions) {
      return data.scheme.questions
        .filter(({ questionOn }) => questionOn === QuestionModel.Tag)
        .map(({ id, questionFormatted, type, optionsFormFormatted }) => ({
          id,
          question: questionFormatted || '',
          type,
          options:
            optionsFormFormatted?.map(({ value, label }) => ({
              value: value.toLowerCase(),
              label,
            })) || [],
        }));
    }
    return [];
  }, [data]);
  const taskQuestions: Question[] = useMemo(() => {
    if (data && data.scheme && data.scheme.questions) {
      return data.scheme.questions
        .filter(({ questionOn }) => questionOn === QuestionModel.Task)
        .map(({ id, questionFormatted, type, optionsFormFormatted }) => ({
          id,
          question: questionFormatted || '',
          type,
          options:
            optionsFormFormatted?.map(({ value, label }) => ({
              value: value.toLowerCase(),
              label,
            })) || [],
        }));
    }
    return [];
  }, [data]);
  const questionGroups: QuestionGroupData[] = useMemo(() => {
    if (templateData) {
      return templateData.map(
        ({ id, name, questions: qs, description, defaultDueDays }) => ({
          id,
          name,
          description,
          defaultDueDays,
          questions: qs,
        })
      );
    }
    return [];
  }, [templateData]);
  const users: { label: string; value: string }[] = useMemo(() => {
    if (data && data.scheme && data.scheme.members) {
      return data.scheme.members.map(
        ({ userId, role, user: { fullName } }) => ({
          label: `${fullName} (${role === 'USER' ? 'User' : 'Admin'})`,
          value: userId,
        })
      );
    }
    return [];
  }, [data]);

  useEffect(() => {
    setAvailableQuestions(questions);
  }, [questions]);

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
        where: {
          id: currentScheme,
        },
        questionsWhere: {
          deleted: {
            equals: false,
          },
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
      query: WorkflowDataDocument,
      variables: {
        where: {
          id: currentScheme,
        },
        questionsWhere: {
          deleted: {
            equals: false,
          },
        },
      },
      data: {
        scheme: {
          ...existingData.scheme,
          questions: [
            ...existingData.scheme.questions,
            {
              id,
              type: 'TEXT' as AnswerType,
              optionsFormFormatted: [],
              questionFormatted: q,
              questionOn: QuestionModel.Task,
            },
          ],
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
      editWorkflowData &&
      questions.length > 0 &&
      availableQuestions.length > 0 &&
      !initiated
    ) {
      const action = editWorkflowData?.workflow?.actions[0]
        ?.data as WorkflowData;
      const conditions = editWorkflowData?.workflow
        ?.conditions as WorkflowConditions;
      const questionOnWorkflow = conditions?.questions?.questions as {
        id: string;
        answer: string[] | string;
        overUnder?: OverUnder;
      }[];
      const taskQuestionsWorkflow = action?.task?.questions;
      if (taskQuestions) {
        form.setFieldsValue({
          taskQuestions: taskQuestionsWorkflow,
        });
      }
      if (questionOnWorkflow) {
        setSelectedQuestions(
          questionOnWorkflow
            .map((q) => {
              const question = availableQuestions.find((aq) => aq.id === q.id);
              if (question) {
                setAvailableQuestions(
                  availableQuestions.filter((aq) => aq.id !== q.id)
                );
                return {
                  ...question,
                  answer: q.answer,
                  overUnder: q.overUnder,
                };
              }
              return null;
            })
            .filter(Boolean) as Question[]
        );
        setInitiated(true);
      }
    }
  }, [
    editWorkflowData,
    questions,
    availableQuestions,
    selectedQuestions,
    initiated,
  ]);

  const [updateWorkflow] = useUpdateOneWorkflowMutation({
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error!',
          id: 'DIDBlF',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there was an error.',
          id: 'gfkeSL',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
    onCompleted: () => {
      setSaving(false);
      window.history.back();
    },
  });
  const onFinish = (values: FormData) => {
    setSaving(true);
    const actionData: WorkflowData = {
      task: values.taskName
        ? {
            name: values.taskName,
            assignTo: values.taskAssignee,
            assignToGroups: values.assigneeGroups,
            dueDays: values.taskDueDays,
            questions: values.taskQuestions,
          }
        : undefined,
      autoApprove: values.autoApprove ?? undefined,
      setPriority: values.setPriority ?? undefined,
      sendEmail:
        values.sendEmailCheck && values.sendEmailTitle
          ? {
              message: values.sendEmailMessage,
              title: values.sendEmailTitle,
              users: values.sendEmailUsers,
            }
          : undefined,
      sendNotification:
        values.sendNotificationCheck && values.sendNotificationTitle
          ? {
              message: values.sendNotificationMessage,
              title: values.sendNotificationTitle,
              users: values.sendNotificationUsers,
            }
          : undefined,
    };

    const conditionsData: WorkflowConditions = {
      anyAll: values.option,
      descriptionWords: values.descriptionCheck
        ? {
            words: values.descriptionWords,
            anyAll: values.descriptionCondition,
          }
        : undefined,
      incidentTimeCount: values.incidentTimeCountCheck
        ? {
            noDays: values.incidentTimeCountDays.toFixed(0),
            noIncidents: values.incidentTimeCountIncidents.toFixed(0),
          }
        : undefined,
      tags: values.tags
        ? {
            anyAll: values.tagMethod,
            tags: values.tagOptions,
          }
        : undefined,
      totalValue: valueSelected ? values.valuePrice.toString() : false,
      questions: values.questionChecked
        ? {
            anyAll: values.questionMethod,
            questions: selectedQuestions.map((q) => ({
              id: q.id,
              answer: q.answer || '',
              type: q.type,
              overUnder: q.overUnder,
            })),
          }
        : undefined,
      lessThanValue: lessThanSelected
        ? values.lessThanPrice.toString()
        : undefined,
      incidentWhileBan: values.incidentWhileBanCheck ? 'true' : undefined,
      goodsType: goodsTypeCheck
        ? {
            anyAll: values.goodsTypeCondition,
            goods: values.goodsType,
          }
        : undefined,
    };
    if (!modelSelected) {
      setSaving(false);

      return;
    }
    if (EditId) {
      void updateWorkflow({
        variables: {
          where: {
            id: EditId,
          },
          data: {
            name: {
              set: values.name,
            },
            actions: {
              update: [
                {
                  where: {
                    id: editWorkflowData?.workflow?.actions[0]?.id || '',
                  },
                  data: {
                    data: actionData,
                  },
                },
              ],
            },
            conditions: conditionsData,
          },
        },
      });
    } else {
      void createWorkflow({
        variables: {
          data: {
            name: values.name,
            trigger: WorkflowTrigger.Created,
            triggerModels: modelSelected || Model.Incident,
            actions: {
              create: [
                {
                  type: WorkflowActionType.Create,
                  data: actionData,
                },
              ],
            },
            conditions: conditionsData,
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
          },
        },
      });
    }
  };

  const { data: goodsData, loading: goodsLoading } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: currentScheme },
        },
      },
    },
  });

  return {
    groups,
    onFinish,
    form,
    tagsSelected,
    questionGroups,
    taskQuestions,
    questionsSelected,
    questions,
    setSelectedActivity,
    tags,
    valueSelected,
    users,
    setSelectedQuestions,
    selectedQuestions,
    availableQuestions,
    setAvailableQuestions,
    setActivityTemplateForm,
    activityTemplateForm,
    updateTemplates,
    onClose,
    newQuestion,
    createNewQuestion,
    loading: loading || templatesLoading || editWorkflowLoading || goodsLoading,
    setNewQuestion,
    saving,
    modelSelected,
    lessThanSelected,
    goodsTypeCheck,
    descriptionCheck,
    goods:
      goodsData?.listGoodsTypes?.goodsTypes?.map(({ name, id }) => ({
        label: name,
        value: id,
      })) || [],
    incidentTimeCountCheck,
    taskOutcome,
    sendEmailCheck,
    sendNotificationCheck,
  };
};

export default useWorkflowForm;
