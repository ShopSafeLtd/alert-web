import { useStoreActions, useStoreState } from 'state';
import type { CreateTodoMutation, ListTodosQuery } from 'graphql/generated';
import {
  ListTodosDocument,
  QueryMode,
  SortOrder,
  useListTodosQuery,
  useUpdateTodoMutation,
} from 'graphql/generated';
import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

interface Return {
  data:
    | Exclude<ListTodosQuery['listTodos'], undefined | null>
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
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  allUsers: boolean;
  toggleAllUsers: () => void;
  allSchemes: boolean;
  toggleAllSchemes: () => void;
}

const useAdminTodos = (): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const [saving, setSaving] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [allSchemes, setAllSchemes] = useState(false);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const setTodoList = useStoreActions((actions) => actions.user.setTodos);
  const userTodos = useStoreState((state) => state.user.userTodos);
  const variables = {
    orderBy: {
      createdAt: SortOrder.Desc,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      schemes: {
        some: {
          id: allSchemes
            ? {
                in: userSchemes.map((scheme) => scheme.scheme.id),
              }
            : {
                equals: schemeId,
              },
        },
      },
      assignedUsers: allUsers
        ? undefined
        : {
            some: {
              id: {
                in: [userId],
              },
            },
          },
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          description: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
  };
  const { data, loading } = useListTodosQuery({
    variables,
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      if (res.listTodos) {
        setTodoList({ userTodos: res.listTodos.totalUserTodos || 0 });
      }
    },
  });

  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<ListTodosQuery>({
      query: ListTodosDocument,
      variables,
    });

    if (!existingData?.listTodos) return;

    // write the new data to the Apollo store
    store.writeQuery<ListTodosQuery>({
      query: ListTodosDocument,
      data: {
        listTodos: {
          uncompletedTotal: [
            ...(<[]>existingData.listTodos.uncompletedTodos),
            res.createTodo,
          ].length,
          uncompletedTodos: [
            ...(<[]>existingData.listTodos.uncompletedTodos),
            res.createTodo,
          ],
          completedTodos: existingData.listTodos.completedTodos,
          completedTotal: existingData.listTodos.completedTotal,
          totalUserTodos: existingData.listTodos.totalUserTodos,
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
      const existingData = store.readQuery<ListTodosQuery>({
        query: ListTodosDocument,
        variables,
      });

      if (!existingData?.listTodos) return;
      if (res.updateTodo.completed) {
        store.writeQuery<ListTodosQuery>({
          query: ListTodosDocument,
          data: {
            listTodos: {
              totalUserTodos: existingData.listTodos.totalUserTodos + 1,
              completedTotal: [
                ...(<[]>existingData.listTodos.completedTodos),
                res.updateTodo,
              ].length,
              completedTodos: [
                ...(<[]>existingData.listTodos.completedTodos),
                res.updateTodo,
              ],
              uncompletedTotal: existingData.listTodos.uncompletedTotal + 1,
              uncompletedTodos: existingData.listTodos.uncompletedTodos.filter(
                (todo) => todo.id !== res?.updateTodo?.id
              ),
            },
            __typename: 'Query',
          },
          variables,
        });
      }
      if (!res.updateTodo.completed) {
        store.writeQuery<ListTodosQuery>({
          query: ListTodosDocument,
          data: {
            listTodos: {
              totalUserTodos: existingData.listTodos.totalUserTodos - 1,

              uncompletedTotal: [
                ...(<[]>existingData.listTodos.uncompletedTodos),
                res.updateTodo,
              ].length,
              uncompletedTodos: [
                ...(<[]>existingData.listTodos.uncompletedTodos),
                res.updateTodo,
              ],
              completedTodos: existingData.listTodos.completedTodos.filter(
                (todo) => todo.id !== res?.updateTodo?.id
              ),
              completedTotal: existingData.listTodos.completedTotal - 1,
            },
            __typename: 'Query',
          },
          variables,
        });
      }
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
    setTodoList({
      userTodos: userTodos ? userTodos + 1 : 1,
    });
  };
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };
  const onPaginationChange = (pageVale: number, pageSizeValue: number) => {
    setPage(pageVale);
    setPageSize(pageSizeValue);
  };
  const toggleAllUsers = () => {
    setAllUsers(!allUsers);
  };
  const toggleAllSchemes = () => {
    setAllSchemes(!allSchemes);
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
    onPaginationChange,
    currentPage: page,
    currentPageSize: pageSize,
    allUsers,
    toggleAllUsers,
    allSchemes,
    toggleAllSchemes,
  };
};

export default useAdminTodos;
