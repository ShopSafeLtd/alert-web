import type { MutationUpdaterFn } from '@apollo/client';
import type { FeedTodosQuery } from 'graphql/feedItems/queries/__generated__/feed-todos.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';

import { useStoreActions, useStoreState } from '#/state';
import {
  FeedTodosDocument,
  useFeedTodosQuery,
} from 'graphql/feedItems/queries/__generated__/feed-todos.generated';
import { useUpdateTodoMutation } from 'graphql/todos/mutations/__generated__/update_todo.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useState } from 'react';

interface Props {
  fullSearch: string;
}
interface Return {
  addTodo: boolean;
  data:
    | Exclude<FeedTodosQuery['listTodos'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  onCompletedTodo: (id: string) => void;
  onUncompletedTodo: (id: string) => void;
  saving: boolean;
  setSearch: (value: string) => void;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
}

const useAdminTodos = ({ fullSearch }: Props): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [search, setSearch] = useState('');

  const setTodoList = useStoreActions((actions) => actions.user.setTodos);
  const userTodos = useStoreState((state) => state.user.userTodos);

  const variables = {
    orderBy: {
      createdAt: SortOrder.Desc,
    },
    take: 24,
    where: {
      OR: [
        {
          name: {
            contains: search || fullSearch,
            mode: QueryMode.Insensitive,
          },
        },
        {
          description: {
            contains: search || fullSearch,
            mode: QueryMode.Insensitive,
          },
        },
      ],
      assignedUsers: {
        some: {
          id: {
            in: [userId],
          },
        },
      },

      completed: {
        equals: false,
      },
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  };
  const { data, fetchMore, loading } = useFeedTodosQuery({
    onCompleted: (res) => {
      if (res.listTodos) {
        setTodoList({ userTodos: res.listTodos.totalUserTodos || 0 });
      }
    },
    variables,
  });
  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listTodos: {
            ...fetchMoreResult.listTodos,
            totalUserTodos:
              prev.listTodos?.totalUserTodos ||
              fetchMoreResult?.listTodos?.totalUserTodos ||
              0,
            uncompletedTodos: [
              ...(prev.listTodos?.uncompletedTodos || []),
              ...(fetchMoreResult.listTodos?.uncompletedTodos || []),
            ],
            uncompletedTotal:
              prev.listTodos?.uncompletedTotal ||
              fetchMoreResult?.listTodos?.uncompletedTotal ||
              0,
          },
        };
      },
      variables: {
        ...variables,
        skip: data?.listTodos.uncompletedTodos?.length || 0,
      },
    });
  };

  // const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
  //   store,
  //   { data: res }
  // ) => {
  //   if (res?.createTodo === null || res?.createTodo === undefined) return;
  //
  //   // get existing group list data from Apollo store
  //   const existingData = store.readQuery<FeedTodosQuery>({
  //     query: FeedTodosDocument,
  //     variables,
  //   });
  //   if (!existingData?.listTodos) return;
  //
  //   // write the new data to the Apollo store
  //   store.writeQuery<FeedTodosQuery>({
  //     query: FeedTodosDocument,
  //     data: {
  //       listTodos: {
  //         uncompletedTodos: [
  //           ...(<[]>existingData.listTodos.uncompletedTodos),
  //           res.createTodo,
  //         ],
  //         uncompletedTotal: res.createTodo.completed
  //           ? existingData.listTodos.uncompletedTotal
  //           : existingData.listTodos.uncompletedTotal + 1,
  //         totalUserTodos: res.createTodo.completed
  //           ? existingData.listTodos.totalUserTodos
  //           : existingData.listTodos.totalUserTodos + 1,
  //       },
  //       __typename: 'Query',
  //     },
  //     variables,
  //   });
  // };

  const [updateTodo] = useUpdateTodoMutation({
    onCompleted: () => {
      setSaving(false);
    },
    onError: () => {
      setSaving(false);
    },
    update: (store, { data: res }) => {
      if (res?.updateTodo === null || res?.updateTodo === undefined) return;

      // get existing group list data from Apollo store
      const existingData = store.readQuery<FeedTodosQuery>({
        query: FeedTodosDocument,
        variables,
      });

      if (!existingData?.listTodos) return;
      store.writeQuery<FeedTodosQuery>({
        data: {
          __typename: 'Query',
          listTodos: {
            totalUserTodos: res.updateTodo.completed
              ? existingData.listTodos.totalUserTodos
              : existingData.listTodos.totalUserTodos + 1,
            uncompletedTodos: [
              ...(existingData.listTodos.uncompletedTodos as []),
              res.updateTodo,
            ],
            uncompletedTotal: res.updateTodo.completed
              ? existingData.listTodos.uncompletedTotal
              : existingData.listTodos.uncompletedTotal + 1,
          },
        },
        query: FeedTodosDocument,
        variables,
      });
    },
  });
  // function
  const onCompletedTodo = (todoId: string) => {
    setSaving(true);
    setTodoList({
      userTodos: userTodos ? userTodos - 1 : 0,
    });
    void updateTodo({
      variables: {
        data: {
          completed: { set: true },
          completedBy: {
            connect: {
              id: userId,
            },
          },
          completedDate: { set: new Date() },
        },
        where: {
          id: todoId,
        },
      },
    });
  };
  const onUncompletedTodo = (todoId: string) => {
    setSaving(true);
    setTodoList({
      userTodos: userTodos ? userTodos + 1 : 1,
    });
    void updateTodo({
      variables: {
        data: {
          completed: { set: false },
          completedBy: undefined,
          completedDate: undefined,
        },
        where: {
          id: todoId,
        },
      },
    });
  };
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };

  return {
    addTodo,
    data: data?.listTodos,
    fetchMoreScroll,
    loading: (data === null || data === undefined) && loading,
    onCompletedTodo,
    onUncompletedTodo,
    saving,
    setSearch,
    toggleAddTodo,

    updateTodoList: () => {},
  };
};

export default useAdminTodos;
