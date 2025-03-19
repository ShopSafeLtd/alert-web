import type { WorkflowDataQuery } from '#/views/workflows/graphql/queries/__generated__/workflow-data.generated';
import type { FormInstance } from 'antd';
import type { AnswerType, CronSchedule, IncidentPriority } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateOneWorkflowMutation } from '#/views/workflows/graphql/mutations/__generated__/create-workflow.generated';
import { useUpdateOneWorkflowMutation } from '#/views/workflows/graphql/mutations/__generated__/update-workflow.generated';
import { useViewWorkflowQuery } from '#/views/workflows/graphql/queries/__generated__/view-workflow.generated';
import {
  WorkflowDataDocument,
  useWorkflowDataQuery,
} from '#/views/workflows/graphql/queries/__generated__/workflow-data.generated';
import { useApolloClient } from '@apollo/client';
import { Form, notification } from 'antd';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import {
  Model,
  QuestionModel,
  SortOrder,
  WorkflowActionType,
  WorkflowTrigger,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import type { ListData } from '../../adminTodo/useActivities';

import useActivityTemplates from '../../adminTodo/useActivities';

interface WorkflowData {
  autoApprove?: boolean;
  businesses?: string[];
  sendEmail?: {
    message: string;
    title: string;
    users?: string[];
  };
  sendNotification?: {
    message: string;
    title: string;
    users?: string[];
  };
  setPriority?: string;
  task?: {
    assignTo?: string[]; // deprecated
    assignToGroups?: string[]; // deprecated
    businesses?: string[]; // new
    dueDays: number;
    name: string;
    questions: string[];
  };
  usersToGetFrom?: {
    groups?: string[];
    parentGroups?: boolean;
    roles?: string[];
    users?: string[];
  };
}

type AnyAll = 'all' | 'any';
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
  incidentWhileBan?: boolean | string;
  lessThanValue?: string;
  questions?: {
    anyAll: AnyAll;
    questions: {
      answer: string | string[];
      id: string;
      overUnder?: OverUnder;
      type: AnswerType;
    }[];
  };
  tags?: {
    anyAll: AnyAll;
    tags: string[] | undefined;
  };
  totalValue?: boolean | string;
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
  autoApprove: boolean;
  autoApproveCheck: boolean;
  cronDate?: Date;
  cronStart?: Date;
  descriptionCheck: boolean;
  descriptionCondition: AnyAll;
  descriptionWords: string[];
  frequency?: CronSchedule;
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
  taskBusiness: string[];
  taskDescription: string;
  taskDueDays: number;
  taskName: string;
  taskOutcome: boolean;
  taskQuestions: string[];
  useDynamicGroups?: boolean;
  userManagementGroups: string[];
  userManagementRoles: string[];
  userManagementUsers: string[];
  valueCheck: boolean;
  valuePrice: number;
  workflowMode: 'scheduled' | 'trigger';
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
    type: 'create' | 'delete' | 'update'
  ) => void;
  valueSelected: boolean;
}

const useWorkflowForm = (): Return => {
  const [form] = Form.useForm<FormData>();

  const currentScheme = useAtomValue(currentSchemeIdAtom);
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

  const [createWorkflow] = useCreateOneWorkflowMutation({
    onCompleted: () => {
      setSaving(false);
      navigate('/app/scheme-settings/workflow');
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
    templateData,
    updateTemplates,
  } = useActivityTemplates();
  const navigate = useNavigate();
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
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ workflow }) => {
        if (workflow) {
          const action = workflow.actions[0]?.data as WorkflowData;
          const conditions = workflow.conditions as WorkflowConditions;

          const oldCompatability = {
            emailUsers: action?.sendEmail?.users || [],
            groups: action?.task?.assignToGroups || [],
            notificationUsers: action?.sendNotification?.users || [],
            users: action?.task?.assignTo || [],
          };

          const newCombined = {
            groups: [
              ...oldCompatability.groups,
              ...(action?.usersToGetFrom?.groups || []),
            ],
            users: [
              ...oldCompatability.users,
              ...oldCompatability.emailUsers,
              ...oldCompatability.notificationUsers,
              ...(action?.usersToGetFrom?.users || []),
            ],
          };

          form.setFieldsValue({
            autoApprove: action?.autoApprove,
            autoApproveCheck: action?.autoApprove !== undefined,
            cronDate: workflow.cronDate
              ? new Date(workflow.cronDate)
              : undefined,
            descriptionCheck:
              conditions?.descriptionWords?.words &&
              conditions.descriptionWords.words?.length > 0,
            descriptionCondition: conditions?.descriptionWords?.anyAll,
            descriptionWords: conditions?.descriptionWords?.words || [],
            frequency: workflow.cronSchedule || undefined,
            goodsType: conditions?.goodsType?.goods || [],
            goodsTypeCheck:
              conditions?.goodsType?.goods &&
              conditions.goodsType.goods?.length > 0,
            goodsTypeCondition: conditions?.goodsType?.anyAll,
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
            name: workflow.name,
            option: conditions?.anyAll,
            questionChecked: !!conditions?.questions,
            questionMethod: conditions?.questions?.anyAll,
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
            tagMethod: conditions?.tags?.anyAll,
            tagOptions: conditions?.tags?.tags,
            tags: !!conditions?.tags?.tags,
            taskBusiness: action?.task?.businesses || [],
            taskDueDays: action?.task?.dueDays,
            taskName: action?.task?.name,
            taskOutcome: !!action?.task?.name,
            taskQuestions: action?.task?.questions,
            useDynamicGroups: !!action?.usersToGetFrom?.parentGroups,
            userManagementGroups: newCombined.groups,
            userManagementRoles: action?.usersToGetFrom?.roles || [],
            userManagementUsers: newCombined.users,
            valueCheck: !!conditions?.totalValue,
            valuePrice: conditions?.totalValue
              ? typeof conditions.totalValue === 'string'
                ? Number.parseInt(conditions.totalValue, 10)
                : 0
              : 0,
            workflowMode:
              workflow.triggerModels === Model.Cron ? 'scheduled' : 'trigger',
            workflowType: workflow.triggerModels,
          });
        }
      },
      skip: !EditId,
      variables: {
        where: {
          id: EditId || '',
        },
      },
    });

  const groups = useMemo(() => {
    if (data?.scheme?.groups) {
      return data.scheme.groups.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
    }
    return [];
  }, [data]);
  const tags = useMemo(() => {
    if (data?.scheme?.schemeTags) {
      return data.scheme.schemeTags.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
    }
    return [];
  }, [data]);
  const questions: Question[] = useMemo(() => {
    if (data?.scheme?.questions) {
      return data.scheme.questions
        .filter(({ questionOn }) => questionOn === QuestionModel.Tag)
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
    if (templateData) {
      return templateData.map(
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
  }, [templateData]);

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
        answer: string | string[];
        id: string;
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
    onCompleted: () => {
      setSaving(false);
      navigate('/app/scheme-settings/workflow');
    },
    onError: () => {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there was an error.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error!',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
  });
  const onFinish = (values: FormData) => {
    setSaving(true);
    const actionData: WorkflowData = {
      autoApprove: values.autoApprove ?? undefined,
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
      setPriority: values.setPriority ?? undefined,
      task: values.taskName
        ? {
            businesses: values.taskBusiness,
            dueDays: values.taskDueDays,
            name: values.taskName,
            questions: values.taskQuestions,
          }
        : undefined,
      usersToGetFrom: {
        groups: values.userManagementGroups,
        parentGroups: values.useDynamicGroups,
        roles: values.userManagementRoles,
        users: values.userManagementUsers,
      },
    };

    const conditionsData: WorkflowConditions = {
      anyAll: values.option,
      descriptionWords: values.descriptionCheck
        ? {
            anyAll: values.descriptionCondition,
            words: values.descriptionWords,
          }
        : undefined,
      goodsType: goodsTypeCheck
        ? {
            anyAll: values.goodsTypeCondition,
            goods: values.goodsType,
          }
        : undefined,
      incidentTimeCount: values.incidentTimeCountCheck
        ? {
            noDays: values.incidentTimeCountDays.toFixed(0),
            noIncidents: values.incidentTimeCountIncidents.toFixed(0),
          }
        : undefined,
      incidentWhileBan: values.incidentWhileBanCheck ? 'true' : undefined,
      lessThanValue: lessThanSelected
        ? values.lessThanPrice.toString()
        : undefined,
      questions: values.questionChecked
        ? {
            anyAll: values.questionMethod,
            questions: selectedQuestions.map((q) => ({
              answer: q.answer || '',
              id: q.id,
              overUnder: q.overUnder,
              type: q.type,
            })),
          }
        : undefined,
      tags: values.tags
        ? {
            anyAll: values.tagMethod,
            tags: values.tagOptions,
          }
        : undefined,
      totalValue: valueSelected ? values.valuePrice.toString() : false,
    };
    if (!modelSelected && !values.frequency) {
      setSaving(false);

      return;
    }
    if (EditId) {
      void updateWorkflow({
        variables: {
          data: {
            actions: {
              update: [
                {
                  data: {
                    data: actionData,
                  },
                  where: {
                    id: editWorkflowData?.workflow?.actions[0]?.id || '',
                  },
                },
              ],
            },
            conditions: conditionsData,
            cronDate: values.cronDate
              ? {
                  set: values.cronDate,
                }
              : undefined,
            cronSchedule: values.frequency
              ? {
                  set: values.frequency,
                }
              : undefined,
            name: {
              set: values.name,
            },
          },
          where: {
            id: EditId,
          },
        },
      });
    } else {
      void createWorkflow({
        variables: {
          data: {
            actions: {
              create: [
                {
                  data: actionData,
                  type: WorkflowActionType.Create,
                },
              ],
            },
            conditions: conditionsData,
            cronDate: values.cronDate,
            cronSchedule: values.frequency,
            name: values.name,
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            trigger: WorkflowTrigger.Created,
            triggerModels:
              modelSelected || values.frequency ? Model.Cron : Model.Incident,
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
    activityTemplateForm,
    availableQuestions,
    createNewQuestion,
    descriptionCheck,
    form,
    goods:
      goodsData?.listGoodsTypes?.goodsTypes?.map(({ id, name }) => ({
        label: name,
        value: id,
      })) || [],
    goodsTypeCheck,
    groups,
    incidentTimeCountCheck,
    lessThanSelected,
    loading: loading || templatesLoading || editWorkflowLoading || goodsLoading,
    modelSelected,
    newQuestion,
    onClose,
    onFinish,
    questionGroups,
    questions,
    questionsSelected,
    saving,
    selectedQuestions,
    sendEmailCheck,
    sendNotificationCheck,
    setActivityTemplateForm,
    setAvailableQuestions,
    setNewQuestion,
    setSelectedActivity,
    setSelectedQuestions,
    tags,
    tagsSelected,
    taskOutcome,
    taskQuestions,
    updateTemplates,
    valueSelected,
  };
};

export default useWorkflowForm;
