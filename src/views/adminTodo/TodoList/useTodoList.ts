import type { SchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import type { TableItem } from '#/views/adminTodo/TodoList/TodoList.view';
import type { MutationUpdaterFn } from '@apollo/client';
import type { TableProps } from 'antd';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type { ListTodosQuery } from 'graphql/todos/queries/list_todos.generated';

import { useSchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import hasPermission from '#/utils/has-permission';
import { notification } from 'antd';
import { useUpdateTodoMutation } from 'graphql/todos/mutations/update_todo.generated';
import {
  ListTodosDocument,
  useListTodosQuery,
} from 'graphql/todos/queries/list_todos.generated';
import {
  PermissionMethod,
  PermissionModel,
  QueryMode,
  SortOrder,
} from 'graphql/types';
import { useMemo, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

import type { ListData } from '../useActivities';

import { useDeleteTodoMutation } from '../graphql/mutations/delete-todo.generated';

interface Return {
  addTodo: boolean;
  allSchemes: boolean;
  allUsers: boolean;
  currentPage: number;
  currentPageSize: number;
  data:
    | Exclude<ListTodosQuery['listTodos'], null | undefined>
    | null
    | undefined;
  deleteRights: boolean;
  editRights: boolean;
  editTodo: null | string;
  groupsData: SchemeGroupsSelectQuery | undefined;
  groupsFilter: string[];
  loading: boolean;
  onCompletedTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onTableChange: TableProps<TableItem>['onChange'];
  onUncompletedTodo: (id: string) => void;
  saving: boolean;
  selectTemplate: (id: null | string) => void;
  selectedTemplate: ListData | null;
  selectedTodo: null | string;
  setEditTodo: (id: null | string) => void;
  setGroupsFilter: (value: string[]) => void;
  setSearch: (value: string) => void;
  setSelectedTodo: (id: null | string) => void;
  toggleAddTodo: () => void;
  toggleAllSchemes: () => void;
  toggleAllUsers: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
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
  const [selectedTodo, setSelectedTodo] = useState<null | string>(null);
  const [editTodo, setEditTodo] = useState<null | string>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ListData | null>(
    null
  );

  const selectTemplate = (id: null | string) => {
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
      assignedUsers: allUsers
        ? undefined
        : {
            some: {
              id: {
                in: [userId],
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
    },
  };
  const { data, loading } = useListTodosQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      if (res.listTodos) {
        setTodoList({ userTodos: res.listTodos.uncompletedTotal || 0 });
      }
    },
    variables,
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
      data: {
        __typename: 'Query',
        listTodos: {
          // TODO: add groups to create response if you can add groups on creation
          todos: [...(existingData.listTodos.todos as []), res.createTodo],
          total: existingData.listTodos.total + 1,
          totalUserTodos: res.createTodo.completed
            ? existingData.listTodos.totalUserTodos
            : existingData.listTodos.totalUserTodos + 1,
          uncompletedTotal: res.createTodo.completed
            ? existingData.listTodos.uncompletedTotal
            : existingData.listTodos.uncompletedTotal + 1,
        },
      },
      query: ListTodosDocument,
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
        description: `The activity has been removed!`,
        message: 'Successfully Removed',
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
        data: {
          __typename: 'Query',
          listTodos: {
            todos: existingData.listTodos.todos.filter(
              ({ id }) => id !== res.deleteTodo.id
            ),
            total: existingData.listTodos.total - 1,
            totalUserTodos: res.deleteTodo.completed
              ? existingData.listTodos.totalUserTodos - 1
              : existingData.listTodos.totalUserTodos,
            uncompletedTotal: res.deleteTodo.completed
              ? existingData.listTodos.uncompletedTotal - 1
              : existingData.listTodos.uncompletedTotal,
          },
        },
        query: ListTodosDocument,
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
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Articles,
    },
    permissions,
  });
  const editRights = hasPermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Articles,
    },
    permissions,
  });

  return {
    addTodo,
    allSchemes,
    allUsers,
    currentPage: page,
    currentPageSize: pageSize,
    data: data?.listTodos,
    deleteRights,
    editRights,
    editTodo,
    groupsData,
    groupsFilter,
    loading: (data === null || data === undefined) && loading,
    onCompletedTodo,
    onDeleteTodo,
    onPaginationChange,
    onTableChange,
    onUncompletedTodo,
    saving,
    selectTemplate,
    selectedTemplate,
    selectedTodo,
    setEditTodo,
    setGroupsFilter,
    setSearch,
    setSelectedTodo,
    toggleAddTodo,
    toggleAllSchemes,
    toggleAllUsers,
    updateTodoList,
  };
};

export default useAdminTodos;
