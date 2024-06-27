/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import type { CustomQuestion, SelectOptions } from 'types/DataType';

import errorNotification from 'types/mutation_notifications/error_notification';
import type { FormInstance, UploadFile } from 'antd';
import { Form, notification } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';
import type { Moment } from 'moment';
import moment from 'moment';
import customRequest from '../../../../utils/custom-request';
import { AnswerType, Role, SortOrder } from 'graphql/types';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import { useAddTodoUsersQuery } from '#/components/form-components/Todos/AddTodo/graphql/AddTodoUsers.generated';
import type { EditTodoQuery } from './graphql/edit_todo.generated';
import { useEditTodoQuery } from './graphql/edit_todo.generated';
import { useUpdateTodoDetailsMutation } from './graphql/update-todo-details.generated';

const { useForm } = Form;

export interface FormData {
  name: string;
  description: string;
  completed: boolean;
  dueDate: Moment;
  assignedUsers: string[];
  questionGroup?: string;
  groups: string[];
  [answer: string]: string | string[] | undefined | Moment | number | boolean;
}

interface Props {
  onClose: () => void;
  initData?: {
    id: string;
  };
  todoId: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  addQuestion: boolean;
  setAddQuestion: (value: boolean) => void;
  update: (id: string, question: string) => void;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string; type: AnswerType }[];
  setSelectedQuestions: (
    value: { id: string; question: string; type: AnswerType }[]
  ) => void;
  setSelectedIds: (value: string[]) => void;
  form: FormInstance<FormData>;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  questions: CustomQuestion[];
  users: { id: string; name: string; timeTaken: number }[];
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  todoLoading: boolean;
  todoData: EditTodoQuery | undefined;
}

const useEditTodo = ({ onClose, initData, todoId }: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const activityAssignToUser = useStoreState(
    (state) => state.scheme.activityAssignToUser
  );
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
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
    variables: {
      where: { id: todoId },
    },
    onCompleted: ({ todo }) => {
      form.setFieldsValue({
        name: todo.name || '',
        description: todo?.description || '',
        dueDate: moment(todo.dueDate, 'YYYY-MM-DD'),
        completed: todo.completed || false,
        assignedUsers: todo.assignedUsers.map(({ id }) => id),
        groups: todo.groups.map(({ id }) => id),
        // questionGroup: todo.questions.map((el) => el.id),
      });
      if (todo?.evidence && todo?.evidence.length > 0)
        setDocumentList(
          todo.evidence.map((document) => ({
            uid: document.id,
            name: document.name,
            status: 'done',
            url: document.url,
          }))
        );
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

  const questionGroup = Form.useWatch('questionGroup', form);

  useEffect(() => {
    const template = templatesData?.scheme?.questionGroups.find(
      ({ id }) => id === questionGroup
    );
    if (template) {
      const {
        defaultDueDate,
        name,
        description,
        questions: templateQuestions,
      } = template;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + defaultDueDate);

      const formattedDate = moment(dueDate);
      setSelectedIds(templateQuestions.map((question) => question.id));
      setSelectedQuestions(
        templateQuestions.map((question) => ({
          id: question.id,
          question: question.questionFormatted,
          type: question.type,
        }))
      );

      form.setFieldsValue({
        name,
        description: description || '',
        dueDate: formattedDate,
      });

      setQuestions(
        templateQuestions.map((question) => ({
          answerType: question.type,
          label: question.questionFormatted,
          questionId: question.id,
          required: false,
          tagQuestionId: '',
          value: '',
          options: question.optionsFormFormatted || [],
        }))
      );
    }
  }, [questionGroup, templatesData]);

  const { data: usersData, loading: usersLoading } = useAddTodoUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
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
                role: activityAssignToUser
                  ? undefined
                  : {
                      in: [
                        Role.ContentAdmin,
                        Role.SchemeAdmin,
                        Role.ShopsafeAdmin,
                      ],
                    },
              },
            ],
          },
        },
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
      orderBy: {
        fullName: SortOrder.Asc,
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
            return {
              id,
              name: fullUser?.fullName || '',
              timeTaken: 0,
            };
          }),
      ]);
    }
  }, [assignedUsers, usersData]);

  const [updateTodo] = useUpdateTodoDetailsMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The activity has been updated.',
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
    // const answers = todoData?.todo.questions.map(({ question, id: qId }) => ({
    //   questionId: qId,
    //   // answer: value[question?.id || ''],
    //   type: question?.type,
    // }));

    // const answerIds = todoData?.todo?.answers?.map(({ id: aId }) => aId);

    void updateTodo({
      variables: {
        where: {
          id: todoId || '',
        },
        data: {
          name: data.name,
          description: data.description,

          // assignedUsers:
          //   data.assignedUsers && data.assignedUsers.length > 0
          //     ? { connect: data.assignedUsers.map((id) => ({ id })) }
          //     : undefined,
          assignedUsers: { set: data.assignedUsers.map((id) => ({ id })) },
          groups: { set: data.groups.map((id) => ({ id })) },
          timeTaken:
            userTime && timeTaken
              ? {
                  createMany: {
                    data: timeTaken,
                  },
                }
              : undefined,
          dueDate: { set: data.dueDate.toDate() },
          completed: {
            set: data.completed,
          },
          documents: {
            // @ts-expect-error TODO fix this date issue Wait to check
            deleted:
              deletedDocuments && deletedDocuments.length > 0
                ? deletedDocuments.map((el) => ({ id: el }))
                : undefined,
            upload:
              newDocuments && newDocuments.length > 0
                ? newDocuments.map((file) => ({
                    url: file.url || '',
                    name: file.name || '',
                    fileType: file.type || '',
                    origFileName: file.fileName || '',
                  }))
                : undefined,
          },
          // questions: {
          //   update: answers?.map((answer) => ({
          //     where: {
          //       id: answer.questionId,
          //     },
          //     data: {
          //       answers: {
          //         create: [
          //           {
          //             type: answer.type,
          //             answer: (answer.answer as string) || '',
          //             todo: {
          //               connect: {
          //                 id: todoId || '',
          //               },
          //             },
          //           },
          //         ],
          //       },
          //     },
          //   })),
          // },
          // answers: {
          //   deleteMany: answerIds
          //     ? [
          //         {
          //           id: {
          //             in: answerIds || [],
          //           },
          //         },
          //       ]
          //     : undefined,
          // },
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
    onChange: handleChange,
    multiple: true,
  };
  return {
    onSubmit,
    saving,
    adminUsersData: usersData?.users.map((user) => ({
      value: user.id,
      label: user.fullName,
    })),
    usersLoading,
    addQuestion,
    setAddQuestion,
    update,
    selectedIds,
    selectedQuestions,
    setSelectedQuestions,
    setSelectedIds,
    form,
    templatesData,
    templatesLoading,
    questions,
    setAvailableUsers,
    setUsers,
    users,
    availableUsers,
    documentList,
    documentUploadProps,
    todoLoading,
    todoData,
  };
};
export default useEditTodo;
