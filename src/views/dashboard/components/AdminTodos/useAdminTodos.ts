import { useStoreActions, useStoreState } from '#/state';
import type { CreateTodoMutation, FeedTodosQuery } from 'graphql/generated';
import {
  FeedTodosDocument,
  QueryMode,
  SortOrder,
  useFeedTodosQuery,
  useUpdateTodoMutation,
} from 'graphql/generated';
import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

interface Props {
  fullSearch: string;
}
interface Return {
  data:
    | Exclude<FeedTodosQuery['listTodos'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  onCompletedTodo: (id: string) => void;
  onUncompletedTodo: (id: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  setSearch: (value: string) => void;
  fetchMoreScroll: () => void;
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

      assignedUsers: {
        some: {
          id: {
            in: [userId],
          },
        },
      },
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
    },
  };
  const { data, loading, fetchMore } = useFeedTodosQuery({
    variables,
    onCompleted: (res) => {
      if (res.listTodos) {
        setTodoList({ userTodos: res.listTodos.totalUserTodos || 0 });
      }
    },
  });
  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listTodos.uncompletedTodos?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listTodos: {
            ...fetchMoreResult.listTodos,
            uncompletedTodos: [
              ...(prev.listTodos?.uncompletedTodos || []),
              ...(fetchMoreResult.listTodos?.uncompletedTodos || []),
            ],
            uncompletedTotal:
              prev.listTodos?.uncompletedTotal ||
              fetchMoreResult?.listTodos?.uncompletedTotal ||
              0,
            totalUserTodos:
              prev.listTodos?.totalUserTodos ||
              fetchMoreResult?.listTodos?.totalUserTodos ||
              0,
          },
        };
      },
    });
  };

  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<FeedTodosQuery>({
      query: FeedTodosDocument,
      variables,
    });
    if (!existingData?.listTodos) return;

    // write the new data to the Apollo store
    store.writeQuery<FeedTodosQuery>({
      query: FeedTodosDocument,
      data: {
        listTodos: {
          uncompletedTodos: [
            ...(<[]>existingData.listTodos.uncompletedTodos),
            res.createTodo,
          ],
          uncompletedTotal: res.createTodo.completed
            ? existingData.listTodos.uncompletedTotal
            : existingData.listTodos.uncompletedTotal + 1,
          totalUserTodos: res.createTodo.completed
            ? existingData.listTodos.totalUserTodos
            : existingData.listTodos.totalUserTodos + 1,
        },
        __typename: 'Query',
      },
      variables,
    });
  };

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
        query: FeedTodosDocument,
        data: {
          listTodos: {
            uncompletedTodos: [
              ...(<[]>existingData.listTodos.uncompletedTodos),
              res.updateTodo,
            ],
            uncompletedTotal: res.updateTodo.completed
              ? existingData.listTodos.uncompletedTotal
              : existingData.listTodos.uncompletedTotal + 1,
            totalUserTodos: res.updateTodo.completed
              ? existingData.listTodos.totalUserTodos
              : existingData.listTodos.totalUserTodos + 1,
          },
          __typename: 'Query',
        },
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
        where: {
          id: todoId,
        },
        data: {
          completed: { set: true },
          completedDate: { set: new Date() },
          completedBy: {
            connect: {
              id: userId,
            },
          },
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
        where: {
          id: todoId,
        },
        data: {
          completed: { set: false },
          completedDate: undefined,
          completedBy: undefined,
        },
      },
    });
  };
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };

  return {
    data: data?.listTodos,
    loading: (data === null || data === undefined) && loading,
    saving,
    onCompletedTodo,
    onUncompletedTodo,
    addTodo,
    toggleAddTodo,
    updateTodoList,
    setSearch,

    fetchMoreScroll,
  };
};

export default useAdminTodos;
