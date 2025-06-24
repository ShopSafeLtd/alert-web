/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import errorNotification from '#/types/mutation_notifications/error_notification';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { TodoQuery } from '../ViewTodo/graphql/__generated__/view-task.generated';

import { useUpdateTaskMutation } from '../ViewTodo/graphql/__generated__/update-todo.generated';
import { useTodoQuery } from '../ViewTodo/graphql/__generated__/view-task.generated';

interface Return {
  loading: boolean;
  onAuthorisedTodo: () => void;
  saving: boolean;
  todo: TodoQuery | undefined;
}

const useTodo = ({
  id,
  onClose,
}: {
  id: null | string;
  onClose: () => void;
}): Return => {
  const [saving, setSaving] = useState(false);
  const intl = useIntl();

  const { data: todo, loading } = useTodoQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {},
    variables: {
      where: {
        id: id || '',
      },
    },
  });

  const [updateTodoMutation] = useUpdateTaskMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The activity has been authorised.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Authorised!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    // update: updateQuery,
  });

  const onAuthorisedTodo = () => {
    setSaving(true);
    void updateTodoMutation({
      variables: {
        data: {
          authorised: {
            set: true,
          },
        },
        where: {
          id: id || '',
        },
      },
    });
  };

  return {
    loading,
    onAuthorisedTodo,
    saving,
    todo,
  };
};

export default useTodo;
