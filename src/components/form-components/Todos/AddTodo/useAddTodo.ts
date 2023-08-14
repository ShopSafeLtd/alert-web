import { useState } from 'react';
import type { SelectOptions } from 'types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/generated';
import {
  Role,
  SortOrder,
  useCreateTodoMutation,
  useListSchemeUsersQuery,
} from 'graphql/generated';
import errorNotification from 'types/error_notification';
import { notification } from 'antd';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';

export interface FormData {
  name: string;
  description: string;
  dueDate: Date;
  assignedUsers: string[];
}

interface Props {
  onClose: () => void;
  incidentId?: string;
  updateMutation: MutationUpdaterFn<CreateTodoMutation>;
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
  selectedQuestions: { id: string; question: string }[];
  setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  setSelectedIds: (value: string[]) => void;
}

const useAddTodo = ({ updateMutation, onClose, incidentId }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: string; question: string }[]
  >([]);

  const update = (id: string, question: string) => {
    setSelectedQuestions([...selectedQuestions, { id, question }]);
    setSelectedIds([...selectedIds, id]);
  };
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

  const [createTodo] = useCreateTodoMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The activity has been added.',
          id: 'hDZLqK',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: updateMutation,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void createTodo({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          assignedUsers:
            data.assignedUsers && data.assignedUsers.length > 0
              ? { connect: data.assignedUsers.map((id) => ({ id })) }
              : undefined,
          questions:
            selectedQuestions && selectedQuestions.length > 0
              ? {
                  createMany: {
                    data: selectedQuestions.map((question) => ({
                      questionId: question.id,
                    })),
                  },
                }
              : undefined,
          dueDate: data.dueDate,
          completed: false,
          incident: incidentId ? { connect: { id: incidentId } } : undefined,
          createdBy: { connect: { id: userId } },
          schemes: {
            connect: [
              {
                id: schemeId,
              },
            ],
          },
        },
      },
    });
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
  };
};
export default useAddTodo;
