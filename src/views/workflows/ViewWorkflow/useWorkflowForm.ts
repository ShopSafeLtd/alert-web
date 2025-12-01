import type { WorkflowDataQuery } from '#/views/workflows/graphql/queries/__generated__/workflow-data.generated';
import type { FormInstance } from 'antd';
import type { AnswerType, CronSchedule, IncidentPriority } from 'graphql/types';

import {
  currencySymbolAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import useActivityTemplates from '#/views/adminTodo/ActivityTemplates/useActivityTemplates';
import { useChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-checklists.generated';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { useDivisionsOnSchemeQuery } from '#/views/workflows/ViewWorkflow/graphql/queries/__generated__/divisions.generated';
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

const countriesOptions = [];

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
    questionGroupId?: string;
    questions: string[];
  };
  usersToGetFrom?: {
    adminGroups?: string[];
    businessUsers?: boolean;
    createdBy?: boolean;
    groups?: string[];
    parentGroups?: boolean;
    parentGroupsAdmin?: boolean;
    roles?: string[];
    users?: string[];
  };
}
type AnyAll = 'all' | 'any';
export type OverUnder = 'over' | 'under';

interface WorkflowConditions {
  anyAll: AnyAll;
  // new
  brands?: {
    anyAll: AnyAll;
    brands: string[] | undefined;
  };
  checkListScore?: {
    greaterThan: boolean;
    score: number;
  };
  checklistTemplate?: string[];
  // new
  countries?: {
    anyAll: AnyAll;
    countries: string[] | undefined;
  };
  descriptionWords?: {
    anyAll: AnyAll;
    words: string[] | undefined;
  };
  // new
  division?: string[];
  goodsType?: {
    anyAll: AnyAll;
    goods: string[] | undefined;
  };
  groups?: {
    anyAll: AnyAll;
    groups: string[] | undefined;
  };
  incidentTimeCount?: {
    noDays: string;
    noIncidents: string;
  };
  incidentWhileBan?: boolean | string;
  lessThanValue?: string;
  // new
  lossValue?: boolean | string;
  // new
  priority?: {
    anyAll: AnyAll;
    priority: string[] | undefined;
  };
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
  // new
  brands?: string[];
  brandsCheck: boolean;
  brandsCondition?: AnyAll;
  checklistScore?: null | number;
  checklistScoreGreaterThan?: boolean | null;
  checklistTemplate?: null | string[];
  // new
  countries?: string[];
  countriesCheck: boolean;
  countriesCondition?: AnyAll;
  cronDate?: Date;
  cronStart?: Date;
  descriptionCheck: boolean;
  descriptionCondition: AnyAll;
  descriptionWords: string[];
  // new
  division?: string[];
  divisionsCheck: boolean;
  frequency?: CronSchedule;
  goodsType: string[];
  goodsTypeCheck: boolean;
  goodsTypeCondition: AnyAll;
  groupIds: string[];
  groupMethod: AnyAll;
  groups: boolean;
  incidentTimeCountCheck: boolean;
  incidentTimeCountDays: number;
  incidentTimeCountIncidents: number;
  incidentWhileBanCheck: boolean;
  lessThanCheck: boolean;
  lessThanPrice: number;
  // new
  lossValue?: number;
  lossValueCheck: boolean;
  name: string;
  option: AnyAll;
  // new
  priority?: string[];
  priorityCheck: boolean;
  priorityCondition?: AnyAll;
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
  updateIncident: boolean;
  useBusinessUsers?: boolean;
  useChecklistScore?: boolean;
  useCreatedBy?: boolean;
  useDynamicAdminGroups?: boolean;
  useDynamicGroups?: boolean;
  userManagementAdminGroups: string[];
  userManagementGroups: string[];
  userManagementRoles: string[];
  userManagementUsers: string[];
  valueCheck: boolean;
  valuePrice: number;
  workflowMode: 'scheduled' | 'trigger';
  workflowTrigger?: WorkflowTrigger;
  workflowType?: Model | null;
}

export type LabelValue = { label: string; value: string };
interface Return {
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  brands: LabelValue[];
  brandsLoading: boolean;
  brandsSelected: boolean;
  checklistOption: { label: string; value: string }[];
  countries: LabelValue[];
  countriesSelected: boolean;
  createNewQuestion: (id: string, question: string) => void;
  descriptionCheck: boolean;
  divisions: LabelValue[];
  divisionsLoading: boolean;
  divisionsSelected: boolean;
  editId?: string;
  form: FormInstance<FormData>;
  goods: { label: string; value: string }[];
  goodsTypeCheck: boolean;
  groups: LabelValue[];
  groupsSelected: boolean;
  incidentTimeCountCheck: boolean;
  lessThanSelected: boolean;
  loading: boolean;
  lossValueSelected: boolean;
  modelSelected: Model | null | undefined;
  newQuestion: boolean;
  onClose: () => void;
  onFinish: (formData: FormData) => void;
  prefix: string;
  prioritySelected: boolean;
  questionGroups: QuestionGroupData[];
  questions: Question[];
  questionsSelected: boolean;
  saving: boolean;
  schemeId: string;
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
  typeWatch: string;
  updateIncidentCheck: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
  valueSelected: boolean;
  workflowTypeWatch: Model | null | undefined;
}

const useWorkflowForm = (): Return => {
  const [form] = Form.useForm<FormData>();

  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const { id: EditId } = useParams();

  const [saving, setSaving] = useState(false);
  const [activityTemplateForm, setActivityTemplateForm] = useState(false);

  const [selectedActivity, setSelectedActivity] =
    useState<QuestionGroupData | null>(null);
  const [initiated, setInitiated] = useState(false);
  const [newQuestion, setNewQuestion] = useState<boolean>(false);
  const [availableQuestions, setAvailableQuestions] = React.useState<
    Question[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = React.useState<Question[]>(
    []
  );
  const typeWatch = Form.useWatch('workflowMode', form);
  const workflowTypeWatch = Form.useWatch('workflowType', form);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const { prefix } = useAtomValue(currencySymbolAtom);

  const client = useApolloClient();

  const { data: BrandsInitData, loading: brandsLoading } = useBrandsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemeId: {
          equals: currentScheme,
        },
      },
    },
  });
  const { data: DivisionsInitData, loading: divisionsLoading } =
    useDivisionsOnSchemeQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        id: currentScheme,
      },
    });

  const divisionsData = useMemo(() => {
    if (DivisionsInitData?.scheme?.divisions) {
      return DivisionsInitData?.scheme?.divisions.map((division) => ({
        label: division,
        value: division,
      }));
    }
    return [];
  }, [DivisionsInitData]);

  const brandsData = useMemo(() => {
    if (BrandsInitData?.brands?.edges) {
      return BrandsInitData.brands.edges.map(({ node }) => ({
        label: node.name,
        value: node.id,
      }));
    }
    return [];
  }, [BrandsInitData]);
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
    tableData,
    updateTemplates,
  } = useActivityTemplates();

  const navigate = useNavigate();
  const tagsSelected = Form.useWatch('tags', form);
  const groupsSelected = Form.useWatch('groups', form);
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
  const updateIncidentCheck = Form.useWatch('updateIncident', form);
  // new condition field watches
  const brandsSelected = Form.useWatch('brandsCheck', form);
  const countriesSelected = Form.useWatch('countriesCheck', form);
  const divisionsSelected = Form.useWatch('divisionsCheck', form);
  const prioritySelected = Form.useWatch('priorityCheck', form);
  const lossValueSelected = Form.useWatch('lossValueCheck', form);

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
            // New brands fields
            brands: conditions?.brands?.brands,
            brandsCheck: !!conditions?.brands?.brands?.length,
            brandsCondition: conditions?.brands?.anyAll,
            checklistScore: conditions?.checkListScore?.score || null,
            checklistScoreGreaterThan:
              conditions?.checkListScore?.greaterThan ?? null,
            checklistTemplate: conditions?.checklistTemplate || null,
            // New countries fields
            countries: conditions?.countries?.countries,
            countriesCheck: !!conditions?.countries?.countries?.length,
            countriesCondition: conditions?.countries?.anyAll,
            cronDate: workflow.cronDate
              ? new Date(workflow.cronDate)
              : undefined,
            descriptionCheck:
              conditions?.descriptionWords?.words &&
              conditions.descriptionWords.words?.length > 0,
            descriptionCondition: conditions?.descriptionWords?.anyAll,
            descriptionWords: conditions?.descriptionWords?.words || [],
            // New division fields
            division: conditions?.division || [],
            divisionsCheck: !!conditions?.division?.length,
            frequency: workflow.cronSchedule || undefined,
            goodsType: conditions?.goodsType?.goods || [],
            goodsTypeCheck:
              conditions?.goodsType?.goods &&
              conditions.goodsType.goods?.length > 0,
            goodsTypeCondition: conditions?.goodsType?.anyAll,
            groupIds: conditions?.groups?.groups,
            groupMethod: conditions?.groups?.anyAll,
            groups:
              conditions?.groups?.groups &&
              conditions?.groups.groups.length > 0,
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
            // New loss value fields
            lossValue: conditions?.lossValue
              ? Number(conditions.lossValue)
              : undefined,
            lossValueCheck:
              conditions?.lossValue !== undefined && !!conditions?.lossValue,
            name: workflow.name,
            option: conditions?.anyAll,
            // New priority fields
            priority: conditions?.priority?.priority,
            priorityCheck: !!conditions?.priority?.priority?.length,
            priorityCondition: conditions?.priority?.anyAll,
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
            useBusinessUsers: !!action?.usersToGetFrom?.businessUsers,
            useChecklistScore: !!conditions?.checkListScore,
            useCreatedBy: !!action?.usersToGetFrom?.createdBy,
            useDynamicAdminGroups: !!action?.usersToGetFrom?.parentGroupsAdmin,
            useDynamicGroups: !!action?.usersToGetFrom?.parentGroups,
            userManagementAdminGroups:
              action?.usersToGetFrom?.adminGroups || [],
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
            workflowTrigger: workflow.trigger,
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
  useEffect(() => {
    if (!editWorkflowData || !editWorkflowData.workflow?.actions) return;
    const action = editWorkflowData?.workflow?.actions[0]?.data as WorkflowData;

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
  }, [tableData, editWorkflowData]);
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
    if (modelSelected === Model.Todo) {
      setAvailableQuestions(taskQuestions);
    } else if (modelSelected === Model.Incident) {
      setAvailableQuestions(questions);
    }
  }, [questions, modelSelected]);

  // Set default workflowTrigger when selecting Incident model for new workflows
  useEffect(() => {
    if (
      modelSelected === Model.Incident &&
      !EditId &&
      !form.getFieldValue('workflowTrigger')
    ) {
      form.setFieldsValue({
        workflowTrigger: WorkflowTrigger.Created,
      });
    }
  }, [modelSelected, EditId, form]);

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
      (questions.length > 0 || taskQuestions.length > 0) &&
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
    taskQuestions,
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
        adminGroups: values.userManagementAdminGroups,
        businessUsers: values.useBusinessUsers,
        createdBy: values.useCreatedBy,
        groups: values.userManagementGroups,
        parentGroups: values.useDynamicGroups,
        parentGroupsAdmin: values.useDynamicAdminGroups,
        roles: values.userManagementRoles,
        users: values.userManagementUsers,
      },
    };

    console.log(values.checklistScoreGreaterThan, values.checklistScore);
    const conditionsData: WorkflowConditions = {
      anyAll: values.option,
      // New brands condition
      brands: values.brandsCheck
        ? {
            anyAll: values.brandsCondition || 'any',
            brands: values.brands,
          }
        : undefined,
      checkListScore:
        values.checklistScore !== null && values.checklistScore !== undefined
          ? {
              greaterThan: values.checklistScoreGreaterThan || false,
              score: values.checklistScore,
            }
          : undefined,
      checklistTemplate:
        values.checklistTemplate && values.checklistTemplate.length > 0
          ? values.checklistTemplate
          : undefined,
      // New countries condition
      countries: values.countriesCheck
        ? {
            anyAll: values.countriesCondition || 'any',
            countries: values.countries,
          }
        : undefined,
      descriptionWords: values.descriptionCheck
        ? {
            anyAll: values.descriptionCondition,
            words: values.descriptionWords,
          }
        : undefined,
      // New division condition
      division:
        values.divisionsCheck && values.division?.length
          ? values.division
          : undefined,
      goodsType: goodsTypeCheck
        ? {
            anyAll: values.goodsTypeCondition,
            goods: values.goodsType,
          }
        : undefined,
      groups: values.groups
        ? {
            anyAll: values.groupMethod,
            groups: values.groupIds,
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
      // New loss value condition
      lossValue:
        lossValueSelected && values.lossValue
          ? values.lossValue.toString()
          : undefined,
      // New priority condition
      priority: values.priorityCheck
        ? {
            anyAll: values.priorityCondition || 'any',
            priority: values.priority,
          }
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

    const trigger =
      modelSelected && modelSelected === Model.Checklist
        ? WorkflowTrigger.Completed
        : modelSelected && modelSelected === Model.Incident
          ? values.workflowTrigger ?? WorkflowTrigger.Created
          : WorkflowTrigger.Created;
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
            trigger,
            triggerModels:
              modelSelected === undefined
                ? values.frequency
                  ? Model.Cron
                  : Model.Incident
                : modelSelected ?? Model.Incident,
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

  const { data: checklistData, loading: checklistLoading } = useChecklistsQuery(
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        order: {
          title: SortOrder.Asc,
        },
        where: {
          deleted: { equals: false },
          schemes: {
            some: { id: { equals: schemeId } },
          },
        },
      },
    }
  );

  const checklistOption =
    checklistData?.checklists.map((checklist) => ({
      label: checklist.titleLocaled,
      value: checklist.id,
    })) || [];

  return {
    activityTemplateForm,
    availableQuestions,
    brands: brandsData,
    brandsLoading,
    brandsSelected,
    checklistOption,
    countries: countriesOptions,
    countriesSelected,
    createNewQuestion,
    descriptionCheck,
    divisions: divisionsData,
    divisionsLoading,
    divisionsSelected,
    editId: EditId,
    form,
    goods:
      goodsData?.listGoodsTypes?.goodsTypes?.map(({ id, name }) => ({
        label: name,
        value: id,
      })) || [],
    goodsTypeCheck,
    groups,
    groupsSelected,
    incidentTimeCountCheck,
    lessThanSelected,
    loading:
      loading ||
      templatesLoading ||
      editWorkflowLoading ||
      goodsLoading ||
      checklistLoading,
    lossValueSelected,
    modelSelected,
    newQuestion,
    onClose,
    onFinish,
    prefix,
    prioritySelected,
    questionGroups,
    questions,
    questionsSelected,
    saving,
    schemeId,
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
    typeWatch,
    updateIncidentCheck,
    updateTemplates,
    valueSelected,
    workflowTypeWatch,
  };
};

export default useWorkflowForm;
