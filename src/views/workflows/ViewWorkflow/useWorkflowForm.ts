/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useStoreState } from 'state';
import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useIntl } from 'react-intl';
import type { AnswerType, WorkflowDataQuery } from '../../../graphql/generated';
import {
  Model,
  QuestionModel,
  useCreateOneWorkflowMutation,
  useUpdateOneWorkflowMutation,
  useViewWorkflowQuery,
  useWorkflowDataQuery,
  WorkflowActionType,
  WorkflowDataDocument,
  WorkflowTrigger,
} from '../../../graphql/generated';
import type { ListData } from '../../adminTodo/useActivities';
import useActivityTemplates from '../../adminTodo/useActivities';

export type AnyAll = 'any' | 'all';
export type OverUnder = 'over' | 'under';

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
  name: string;
  option: AnyAll;
  tags: boolean;
  tagOptions: string[];
  tagMethod: AnyAll;
  valueCheck: boolean;
  valuePrice: number;
  questionChecked: boolean;
  questionMethod: AnyAll;
  taskName: string;
  taskDescription: string;
  taskAssignee: string[];
  taskDueDays: number;
  taskQuestions: string[];
  selectedGroup: string;
  assigneeGroups: string[];
}
export type LabelValue = { label: string; value: string };
interface Return {
  form: FormInstance<FormData>;
  onFinish: (formData: FormData) => void;
  tagsSelected: boolean;
  tags: LabelValue[];
  questions: Question[];
  taskQuestions: Question[];
  setSelectedActivity: (q: QuestionGroupData) => void;
  questionGroups: QuestionGroupData[];
  users: LabelValue[];
  valueSelected: boolean;
  questionsSelected: boolean;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  activityTemplateForm: boolean;
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  selectedQuestions: Question[];
  availableQuestions: Question[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
  groups: LabelValue[];
  newQuestion: boolean;
  createNewQuestion: (id: string, question: string) => void;
  loading: boolean;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  saving: boolean;
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
          form.setFieldsValue({
            name: workflow.name,
            taskName: workflow.actions[0]?.data?.task?.name,
            taskAssignee: workflow.actions[0]?.data?.task?.assignTo,
            assigneeGroups: workflow.actions[0]?.data?.task?.assignToGroups,
            taskDueDays: workflow.actions[0]?.data?.task?.dueDays,
            taskQuestions: workflow.actions[0]?.data?.task?.questions,
            option: workflow.conditions?.anyAll,
            tags: !!workflow.conditions?.tags?.tags,
            tagMethod: workflow.conditions?.tags.anyAll,
            tagOptions: workflow.conditions?.tags?.tags,
            valueCheck: !!workflow.conditions?.totalValue,
            valuePrice: workflow.conditions?.totalValue,
            questionChecked: !!workflow.conditions?.questions,
            questionMethod: workflow.conditions?.questions.anyAll,
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
      const questionOnWorkflow = editWorkflowData?.workflow?.conditions
        ?.questions?.questions as {
        id: string;
        answer: string[] | string;
        overUnder?: OverUnder;
      }[];
      const taskQuestionsWorkflow = editWorkflowData?.workflow?.actions[0]?.data
        ?.task.questions as string[];
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
                    data: {
                      task: {
                        name: values.taskName,
                        assignTo: values.taskAssignee,
                        assignToGroups: values.assigneeGroups,
                        dueDays: values.taskDueDays,
                        questions: values.taskQuestions,
                      },
                    },
                  },
                },
              ],
            },
            conditions: {
              anyAll: values.option,
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
                    questions: selectedQuestions,
                  }
                : undefined,
            },
          },
        },
      });
    } else {
      void createWorkflow({
        variables: {
          data: {
            name: values.name,
            trigger: WorkflowTrigger.Created,
            triggerModels: Model.Incident,
            actions: {
              create: [
                {
                  type: WorkflowActionType.Create,
                  outputModel: Model.Todo,
                  data: {
                    task: {
                      name: values.taskName,
                      assignTo: values.taskAssignee,
                      assignToGroups: values.assigneeGroups,
                      dueDays: values.taskDueDays,
                      questions: values.taskQuestions,
                    },
                  },
                },
              ],
            },
            conditions: {
              anyAll: values.option,
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
                    questions: selectedQuestions,
                  }
                : undefined,
            },
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
    loading: loading || templatesLoading || editWorkflowLoading,
    setNewQuestion,
    saving,
  };
};

export default useWorkflowForm;
