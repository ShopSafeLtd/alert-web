/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { EditTodoQuery } from '#/components/form-components/Todos/EditTodo/graphql/__generated__/edit_todo.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { FormInstance, UploadFile } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import type {
  ChecklistData,
  CrimeGroupData,
  CustomQuestion,
  IncidentCardData,
  InvestigationData,
  OffenderData,
  SelectOptions,
} from 'types/DataType';

import { useAddTodoUsersQuery } from '#/components/form-components/Todos/AddTodo/graphql/__generated__/AddTodoUsers.generated';
import { useEditTodoQuery } from '#/components/form-components/Todos/EditTodo/graphql/__generated__/edit_todo.generated';
import { useUpdateTodoDetailsMutation } from '#/components/form-components/Todos/EditTodo/graphql/__generated__/update-todo-details.generated';
import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { Form, notification } from 'antd';
import {
  AnswerType,
  PermissionMethod,
  PermissionModel,
  SortOrder,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import customRequest from '../../../../utils/custom-request';

const { useForm } = Form;

export interface FormData {
  [answer: string]: Date | boolean | number | string | string[] | undefined;
  assignedUsers: string[];
  business: string[];
  completed: boolean;
  description: string;
  dueDate: Date;
  groups: string[];
  name: string;

  questionGroup?: string;
}

interface Props {
  initData?: {
    id: string;
  };
  onClose: () => void;
  todoId: string;
}

interface Return {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance<FormData>;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  offendersData: OffenderData | undefined;
  onSubmit: (value: FormData) => void;
  questions: CustomQuestion[];
  saving: boolean;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string; type: AnswerType }[];
  setAddQuestion: (value: boolean) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setSelectedIds: (value: string[]) => void;
  setSelectedQuestions: (
    value: { id: string; question: string; type: AnswerType }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  taskTimeTracking: boolean | undefined;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  todoData: EditTodoQuery | undefined;
  todoLoading: boolean;
  update: (id: string, question: string) => void;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
  usersLoading: boolean;
}

const useEditTodo = ({ initData, onClose, todoId }: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const currentScheme = useAtomValue(currentSchemeAtom);
  const activityAssignToUser = currentScheme?.activityAssignToUser;
  const activityAllowAllGroups = currentScheme?.activityAllowAllGroups;
  const taskTimeTracking = currentScheme?.taskTimeTracking;
  const userId = useAtomValue(userIdAtom);
  const [saving, setSaving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [crimeGroupsData, setCrimeGroupsData] = useState<
    CrimeGroupData | undefined
  >(undefined);
  const [offendersData, setOffendersData] = useState<OffenderData | undefined>(
    undefined
  );
  const [checklistsData, setChecklistsData] = useState<
    ChecklistData | undefined
  >(undefined);
  const [incidentsData, setIncidentsData] = useState<
    IncidentCardData | undefined
  >(undefined);
  const [investigationsData, setInvestigationsData] = useState<
    InvestigationData | undefined
  >(undefined);
  const [users, setUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const [availableUsers, setAvailableUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: string; question: string; type: AnswerType }[]
  >([]);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);
  const { data: todoData, loading: todoLoading } = useEditTodoQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ todo }) => {
      console.log(todo.dueDate);
      form.setFieldsValue({
        assignedUsers: todo.assignedUsers.map(({ id }) => id),
        business: todo.business?.id ? [todo.business?.id] : [],
        completed: todo.completed || false,
        description: todo?.description || '',
        dueDate: todo.dueDate ? new Date(todo.dueDate) : new Date(),
        groups: todo.groups.map(({ id }) => id),
        name: todo.name || '',
      });
      setOffendersData(todo.offender ?? undefined);
      setCrimeGroupsData(todo.crimeGroup ?? undefined);
      setChecklistsData(todo.checklist ?? undefined);
      setIncidentsData(todo.incident ?? undefined);
      setInvestigationsData(todo.investigation ?? undefined);

      const newQuestions = todo.questions.map(({ id, question }) => {
        form.setFieldValue(
          question.id,
          todo?.answers?.find((answer) => answer?.taskQuestion?.id === id)
            ?.answer
        );

        return {
          answerType: question?.type,
          label: question.questionFormatted,
          options: question.optionsFormFormatted || [],
          questionId: question.id,
          required: false,
          tagQuestionId: id,
          value: todo?.answers?.find(
            (answer) => answer?.taskQuestion?.id === id
          )?.answer,
        };
      }) as CustomQuestion[];
      setQuestions(newQuestions);
      if (todo?.evidence && todo?.evidence.length > 0)
        setDocumentList(
          todo.evidence.map((document) => ({
            name: document.name,
            status: 'done',
            uid: document.id,
            url: document.url,
          }))
        );

      // Initialize time tracking form fields
      if (todo?.timeTaken && todo.timeTaken.length > 0) {
        for (const timeEntry of todo.timeTaken) {
          form.setFieldValue(timeEntry.user.id, timeEntry.timeTaken);
        }
      }
    },
    variables: {
      where: {
        id: todoId,
        // id: 'cll3jomfy00013rybbduufubj',
      },
    },
  });
  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        where: {
          id: schemeId,
        },
      },
    });

  const update = (id: string, question: string) => {
    setSelectedQuestions([
      ...selectedQuestions,
      { id, question, type: AnswerType.String },
    ]);
    setSelectedIds([...selectedIds, id]);
  };
  useEffect(() => {
    if (initData) {
      form.setFieldsValue({
        questionGroup: initData.id,
      });
    }
  }, [initData]);

  // const questionGroup = Form.useWatch('questionGroup', form);

  const { data: usersData, loading: usersLoading } = useAddTodoUsersQuery({
    fetchPolicy: 'cache-and-network',
    skip: !todoData,
    variables: {
      orderBy: {
        fullName: SortOrder.Asc,
      },
      where: {
        OR: activityAllowAllGroups
          ? undefined
          : [
              {
                businesses: todoData?.todo?.business?.id
                  ? {
                      some: {
                        id: {
                          equals: todoData?.todo?.business?.id,
                        },
                      },
                    }
                  : undefined,
              },
              {
                groups: {
                  some: {
                    users: {
                      some: {
                        id: {
                          equals: userId,
                        },
                      },
                    },
                  },
                },
              },
            ],
        schemes: {
          some: {
            AND: [
              {
                scheme: {
                  id: {
                    equals: schemeId,
                  },
                },
              },

              {
                permissions: activityAssignToUser
                  ? undefined
                  : {
                      permissions: {
                        some: {
                          allowedMethods: {
                            hasSome: [
                              PermissionMethod.Write,
                              PermissionMethod.Read,
                              PermissionMethod.Edit,
                              PermissionMethod.ReadAll,
                            ],
                          },
                          model: {
                            equals: PermissionModel.Tasks,
                          },
                        },
                      },
                    },
              },
            ],
          },
        },
      },
    },
  });
  const assignedUsers = Form.useWatch('assignedUsers', form);
  useEffect(() => {
    if (usersData?.users && assignedUsers) {
      const u = usersData?.users
        .map((user) => ({
          id: user?.id || '',
          name: user?.fullName || '',
          timeTaken: 0,
        }))
        .filter((user) => !assignedUsers.includes(user.id));
      setAvailableUsers(u || []);

      setUsers([
        ...users,
        ...assignedUsers
          .filter((id) => !users.some((user) => user.id === id))
          .map((id) => {
            const fullUser = usersData.users.find((user) => user.id === id);
            // Find existing time data for this user
            const existingTimeData = todoData?.todo?.timeTaken?.find(
              (timeEntry) => timeEntry.user.id === id
            );
            return {
              id,
              name: fullUser?.fullName || '',
              timeTaken: existingTimeData?.timeTaken || 0,
            };
          }),
      ]);
    }
  }, [assignedUsers, usersData, todoData]);

  const [updateTodo] = useUpdateTodoDetailsMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The activity has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    const userTime = users.map((user) => ({
      id: user.id,
      timeTaken: data[user.id],
    }));
    const timeTaken = userTime
      .map((time) => ({
        timeTaken: time.timeTaken as number,
        userId: time.id,
      }))
      ?.filter((time) => time.timeTaken && time.timeTaken > 0);
    const existingDocumentIds = todoData?.todo?.evidence.map((el) => el.id);
    const newDocuments = documentList.filter(
      (el) => !existingDocumentIds?.includes(el.uid)
    );
    const deletedDocuments = existingDocumentIds?.filter((documentId) =>
      documentList.map((el) => el.uid !== documentId)
    );
    const answers = todoData?.todo.questions.map(({ id: qId, question }) => ({
      answer: data[question?.id || ''],
      questionId: qId,
      type: question?.type,
    }));

    const answerIds = todoData?.todo?.answers?.map(({ id: aId }) => aId);

    // Handle disconnect logic for linked entities
    const originalIncidentId = todoData?.todo?.incident?.id;
    const originalOffenderId = todoData?.todo?.offender?.id;
    const originalInvestigationId = todoData?.todo?.investigation?.id;
    const originalCrimeGroupId = todoData?.todo?.crimeGroup?.id;
    const originalChecklistId = todoData?.todo?.checklist?.id;
    const originalBusinessId = todoData?.todo?.business?.id;

    void updateTodo({
      variables: {
        data: {
          answers: {
            deleteMany:
              answerIds && answerIds.length > 0
                ? [
                    {
                      id: {
                        in: answerIds || [],
                      },
                    },
                  ]
                : undefined,
          },
          assignedUsers: { set: data.assignedUsers.map((id) => ({ id })) },
          // Handle business with special disconnect logic
          businessId: data.business.length > 0 ? data.business[0] : undefined,
          // Handle linked entities - set to null to disconnect
          checklistId:
            checklistsData?.id === undefined
              ? originalChecklistId
                ? null
                : undefined
              : checklistsData.id,

          completed: data.completed
            ? {
                set: data.completed,
              }
            : undefined,
          crimeGroupId:
            crimeGroupsData?.id === undefined
              ? originalCrimeGroupId
                ? null
                : undefined
              : crimeGroupsData.id,
          description: data.description,
          disconnectBusiness:
            originalBusinessId && data.business.length === 0 ? true : undefined,
          documents: {
            // @ts-expect-error TODO fix this date issue Wait to check
            deleted:
              deletedDocuments && deletedDocuments.length > 0
                ? deletedDocuments.map((el) => ({ id: el }))
                : undefined,
            upload:
              newDocuments && newDocuments.length > 0
                ? newDocuments.map((file) => ({
                    fileType: file.type || '',
                    name: file.name || '',
                    origFileName: file.fileName || '',
                    url: file.url || '',
                  }))
                : undefined,
          },
          dueDate: { set: data.dueDate },
          groups: { set: (data.groups || []).map((id) => ({ id })) },
          incidentId:
            incidentsData?.id === undefined
              ? originalIncidentId
                ? null
                : undefined
              : incidentsData.id,
          investigationId:
            investigationsData?.id === undefined
              ? originalInvestigationId
                ? null
                : undefined
              : investigationsData.id,
          name: data.name,
          offenderId:
            offendersData?.id === undefined
              ? originalOffenderId
                ? null
                : undefined
              : offendersData.id,
          questions: {
            create:
              selectedQuestions && selectedQuestions.length > 0
                ? selectedQuestions.map((question) => ({
                    answers: {
                      create: [
                        {
                          answer: (data[question.id] as string) || '',
                          type: question.type,
                        },
                      ],
                    },
                    question: {
                      connect: {
                        id: question.id,
                      },
                    },
                  }))
                : undefined,
            update:
              answers && answers.length > 0
                ? answers?.map((answer) => ({
                    data: {
                      answers: {
                        create: [
                          {
                            answer: (answer.answer as string) || '',
                            todo: {
                              connect: {
                                id: todoId || '',
                              },
                            },
                            type: answer.type,
                          },
                        ],
                      },
                    },
                    where: {
                      id: answer.questionId,
                    },
                  }))
                : undefined,
          },
          timeTaken:
            userTime && timeTaken
              ? {
                  createMany: {
                    data: timeTaken,
                  },
                }
              : undefined,
        },
        where: {
          id: todoId || '',
        },
      },
    });
  };
  // evidence
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment,no-param-reassign,
        file.url = file.response[0].url;

        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment,no-param-reassign,
        file.fileName = file.response[0].blobName;
      }
      return file;
    });

    setDocumentList(newFileList);
  };

  const documentUploadProps: UploadProps = {
    customRequest,
    multiple: true,
    onChange: handleChange,
  };
  return {
    addQuestion,
    adminUsersData: usersData?.users.map((user) => ({
      label: user.fullName,
      value: user.id,
    })),
    availableUsers,
    checklistsData,
    crimeGroupsData,
    documentList,
    documentUploadProps,
    form,
    incidentsData,
    investigationsData,
    offendersData,
    onSubmit,
    questions,
    saving,
    selectedIds,
    selectedQuestions,
    setAddQuestion,
    setAvailableUsers,
    setSelectedIds,
    setSelectedQuestions,
    setUsers,
    taskTimeTracking,
    templatesData,
    templatesLoading,
    todoData,
    todoLoading,
    update,
    updateChecklistsList: setChecklistsData,
    updateCrimeGroupsList: setCrimeGroupsData,
    updateIncidentList: setIncidentsData,
    updateInvestigationList: setInvestigationsData,
    updateOffendersList: setOffendersData,
    users,
    usersLoading,
  };
};
export default useEditTodo;
