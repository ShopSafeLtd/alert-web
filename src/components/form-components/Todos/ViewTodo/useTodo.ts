/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import type {
  TodoQuery,
  UpdateTaskMutation,
} from '../../../../graphql/generated';
import {
  Role,
  SortOrder,
  useListSchemeUsersQuery,
  useTodoQuery,
  useUpdateTaskMutation,
} from '../../../../graphql/generated';
import { useStoreState } from '../../../../state';
import customRequest from '../../../../utils/custom-request';

export interface FormData {
  [key: string]: string | number | boolean | undefined;
}
interface Return {
  todo: TodoQuery | undefined;
  form: FormInstance;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  users: { id: string; name: string; timeTaken: number }[];
  availableUsers: { id: string; name: string; timeTaken: number }[];
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  loading: boolean;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
}

const { useForm } = Form;

const useTodo = ({
  id,
  onClose,
  updateTodo,
  updateQuery,
}: {
  id: string | null;
  onClose: () => void;
  updateTodo: (value: boolean, i?: string) => void;
  updateQuery?: MutationUpdaterFn<UpdateTaskMutation>;
}): Return => {
  const [form] = useForm();

  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const [availableUsers, setAvailableUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);

  const { data: todo, loading } = useTodoQuery({
    variables: {
      where: {
        id: id || '',
      },
    },
    onCompleted: () => {
      if (todo?.todo?.evidence && todo?.todo?.evidence.length > 0)
        setDocumentList(
          todo?.todo?.evidence?.map((document) => ({
            uid: document.id,
            name: document.name,
            status: 'done',
            url: document.url,
          }))
        );
    },
  });

  useEffect(() => {
    if (todo?.todo?.assignedUsers) {
      const u = todo?.todo?.assignedUsers.map((user) => ({
        id: user?.id || '',
        name: user?.fullName || '',
        timeTaken:
          todo.todo?.timeTaken.find((time) => time?.user?.id === user?.id)
            ?.timeTaken || 0,
      }));
      setUsers(u || []);
      form.setFieldsValue(
        Object.fromEntries(u.map((item) => [item.id, item.timeTaken]))
      );
    }
  }, [todo]);

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
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
                role: {
                  in: [Role.SchemeAdmin, Role.ShopsafeAdmin],
                },
              },
            ],
          },
        },
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Asc,
      },
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const [updateTodoMutation] = useUpdateTaskMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
    onError: () => {
      setSaving(false);
    },
    update: updateQuery,
  });

  useEffect(() => {
    if (usersData?.users && todo?.todo) {
      const userr = todo?.todo?.assignedUsers.map((user) => ({
        id: user?.id || '',
        name: user?.fullName || '',
        timeTaken:
          todo.todo?.timeTaken.find((time) => time?.user?.id === user?.id)
            ?.timeTaken || 0,
      }));
      const u = usersData?.users
        .map((user) => ({
          id: user?.id || '',
          name: user?.fullName || '',
          timeTaken: 0,
        }))
        .filter((user) => !userr.some((us) => us.id === user.id));
      setAvailableUsers(u || []);
    }
  }, [todo, usersData]);

  const onSubmit = (value: FormData) => {
    setSaving(true);
    const userTime = users.map((user) => ({
      id: user.id,
      timeTaken: value[user.id],
    }));

    const answers = todo?.todo?.questions.map(({ question, id: qId }) => ({
      questionId: qId,
      answer: value[question?.id || ''],
      type: question?.type,
    }));

    const answerIds = todo?.todo?.answers?.map(({ id: aId }) => aId);

    const timeTaken = userTime
      .map((time) => ({
        timeTaken: time.timeTaken as number,
        userId: time.id,
      }))
      ?.filter((time) => time.timeTaken && time.timeTaken > 0);
    const existingDocumentIds = todo?.todo?.evidence.map((el) => el.id);
    const newDocuments = documentList.filter(
      (el) => !existingDocumentIds?.includes(el.uid)
    );
    const deletedDocuments = existingDocumentIds?.filter((documentId) =>
      documentList.map((el) => el.uid !== documentId)
    );

    void updateTodoMutation({
      variables: {
        where: {
          id: id || '',
        },
        data: {
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
          completed: {
            set: true,
          },
          questions: {
            update: answers?.map((answer) => ({
              where: {
                id: answer.questionId,
              },
              data: {
                answers: {
                  create: [
                    {
                      type: answer.type,
                      answer: (answer.answer as string) || '',
                      todo: {
                        connect: {
                          id: id || '',
                        },
                      },
                    },
                  ],
                },
              },
            })),
          },
          answers: {
            deleteMany: answerIds
              ? [
                  {
                    id: {
                      in: answerIds || [],
                    },
                  },
                ]
              : undefined,
            // createMany: {
            //   data: answers?.map((answer) => ({
            //     answer: answer.answer as string,
            //     taskQuestionId: answer.questionId,
            //     type: answer.type,
            //   })),
            // },
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
      },
    });
    updateTodo(true, id || '');
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
    todo,
    form,
    onSubmit,
    saving,
    availableUsers,
    users,
    setUsers,
    setAvailableUsers,
    loading: loading || usersLoading,
    documentList,
    documentUploadProps,
  };
};

export default useTodo;
