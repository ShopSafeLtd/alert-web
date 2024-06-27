import { useStoreActions, useStoreState } from 'state';

import { useMemo, useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ListData } from '../useActivities';
import type { TableProps } from 'antd';
import { notification } from 'antd';
import type { TableItem } from '#/views/adminTodo/TodoList/TodoList.view';
import type { ListTodosQuery } from 'graphql/todos/queries/list_todos.generated';
import {
  ListTodosDocument,
  useListTodosQuery,
} from 'graphql/todos/queries/list_todos.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type { SchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import { useSchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import {
  PermissionMethod,
  PermissionModel,
  QueryMode,
  SortOrder,
} from 'graphql/types';
import { useUpdateTodoMutation } from 'graphql/todos/mutations/update_todo.generated';
import hasPermission from '#/utils/has-permission';
import { useDeleteTodoMutation } from '../graphql/mutations/delete-todo.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';

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
  selectedTodo: string | null;
  setSelectedTodo: (id: string | null) => void;
  selectedTemplate: ListData | null;
  selectTemplate: (id: string | null) => void;
  onTableChange: TableProps<TableItem>['onChange'];
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  groupsData: SchemeGroupsSelectQuery | undefined;
  editRights: boolean;
  deleteRights: boolean;
  editTodo: string | null;
  setEditTodo: (id: string | null) => void;
  onDeleteTodo: (id: string) => void;
}

interface Props {
  templateData: ListData[];
}

const useAdminTodos = ({ templateData }: Props): Return => {
  const { id: userId, schemes: userSchemes } = useStoreState(
    (state) => state.user
  );
  const schemeId = useStoreState((state) => state.scheme.id);
  const currentScheme = useMemo(
    () => userSchemes.find((scheme) => scheme.scheme.id === schemeId),
    [userSchemes, schemeId]
  );
  const permissions = currentScheme?.permissions;

  const [saving, setSaving] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [allSchemes, setAllSchemes] = useState(false);
  const [search, setSearch] = useState('');
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const setTodoList = useStoreActions((actions) => actions.user.setTodos);
  const userTodos = useStoreState((state) => state.user.userTodos);
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [editTodo, setEditTodo] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ListData | null>(
    null
  );

  const selectTemplate = (id: string | null) => {
    const template = templateData.find((t) => t.id === id);
    if (template) {
      setSelectedTemplate(template);
      setAddTodo(true);
    }
  };
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
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,
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
        setTodoList({ userTodos: res.listTodos.uncompletedTotal || 0 });
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
          // TODO: add groups to create response if you can add groups on creation
          todos: [...(<[]>existingData.listTodos.todos), res.createTodo],
          total: existingData.listTodos.total + 1,
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
  });
  const [deleteTodo] = useDeleteTodoMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Removed',
        description: `The activity has been removed!`,
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.deleteTodo === null || res?.deleteTodo === undefined) return;

      const existingData = store.readQuery<ListTodosQuery>({
        query: ListTodosDocument,
        variables,
      });

      if (!existingData?.listTodos) return;

      store.writeQuery<ListTodosQuery>({
        query: ListTodosDocument,
        data: {
          listTodos: {
            todos: existingData.listTodos.todos.filter(
              ({ id }) => id !== res.deleteTodo.id
            ),
            total: existingData.listTodos.total - 1,
            uncompletedTotal: res.deleteTodo.completed
              ? existingData.listTodos.uncompletedTotal - 1
              : existingData.listTodos.uncompletedTotal,
            totalUserTodos: res.deleteTodo.completed
              ? existingData.listTodos.totalUserTodos - 1
              : existingData.listTodos.totalUserTodos,
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
      // optimisticResponse: {
      //   __typename: 'Mutation',

      //   updateTodo: {
      //     assignedUsers: [],
      //     id: '',
      //     name: '',
      //     createdBy: {
      //       fullName,
      //       id: userId,
      //       __typename: 'User',
      //     },
      //     completedBy: {
      //       fullName,
      //       id: userId,
      //       __typename: 'User',
      //     },
      //     __typename: 'Todo',
      //     completedDate: new Date(),
      //     completed: false,
      //   },
      // },
    });
    setTodoList({
      userTodos: userTodos ? userTodos + 1 : 1,
    });
  };
  const onDeleteTodo = (currentId: string) => {
    setSaving(true);
    void deleteTodo({
      variables: {
        id: currentId,
      },
    }).finally(() => setSaving(false));
  };
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
    setSelectedTemplate(null);
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

  const { data: groupsData } = useSchemeGroupsSelectQuery({
    fetchPolicy: 'cache-first',
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
    },
  });

  const onTableChange: TableProps<TableItem>['onChange'] = (_, filters) => {
    setGroupsFilter((filters.groups as string[]) ?? []);
  };

  const deleteRights = hasPermission({
    permissions,
    permission: {
      model: PermissionModel.Articles,
      method: PermissionMethod.Delete,
    },
  });
  const editRights = hasPermission({
    permissions,
    permission: {
      model: PermissionModel.Articles,
      method: PermissionMethod.Edit,
    },
  });

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
    selectedTodo,
    setSelectedTodo,
    selectTemplate,
    selectedTemplate,
    onTableChange,
    setGroupsFilter,
    groupsFilter,
    groupsData,
    editRights,
    deleteRights,
    editTodo,
    setEditTodo,
    onDeleteTodo,
  };
};

export default useAdminTodos;
