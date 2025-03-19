/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { TodoQuery } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/view-task.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile, UploadProps } from 'antd';

import { useUpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import { useTodoQuery } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/view-task.generated';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { Form } from 'antd';
import { Role, SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

import { useStoreState } from '../../../../state';
import customRequest from '../../../../utils/custom-request';

export interface FormData {
  [key: string]: boolean | number | string | undefined;
}
interface Return {
  availableUsers: { id: string; name: string; timeTaken: number }[];
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  todo: TodoQuery | undefined;
  users: { id: string; name: string; timeTaken: number }[];
}

const { useForm } = Form;

const useTodo = ({
  id,
  onClose,
  updateQuery,
  updateTodo,
}: {
  id: null | string;
  onClose: () => void;
  updateQuery?: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodo: (value: boolean, i?: string) => void;
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
  const currentUser = useAtomValue(userIdAtom);
  const { data: todo, loading } = useTodoQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      if (todo?.todo?.evidence && todo?.todo?.evidence.length > 0)
        setDocumentList(
          todo?.todo?.evidence?.map((document) => ({
            name: document.name,
            status: 'done',
            uid: document.id,
            url: document.url,
          }))
        );
    },
    variables: {
      where: {
        id: id || '',
      },
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

    const answers = todo?.todo?.questions.map(({ id: qId, question }) => ({
      answer: value[question?.id || ''],
      questionId: qId,
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
        data: {
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
          completed: {
            set: true,
          },
          completedBy: {
            connect: { id: currentUser },
          },
          completedDate: {
            set: new Date(),
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
                    fileType: file.type || '',
                    name: file.name || '',
                    origFileName: file.fileName || '',
                    url: file.url || '',
                  }))
                : undefined,
          },
          questions: {
            update: answers?.map((answer) => ({
              data: {
                answers: {
                  create: [
                    {
                      answer: (answer.answer as string) || '',
                      todo: {
                        connect: {
                          id: id || '',
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
            })),
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
          id: id || '',
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
    multiple: true,
    onChange: handleChange,
  };
  return {
    availableUsers,
    documentList,
    documentUploadProps,
    form,
    loading: loading || usersLoading,
    onSubmit,
    saving,
    setAvailableUsers,
    setUsers,
    todo,
    users,
  };
};

export default useTodo;
