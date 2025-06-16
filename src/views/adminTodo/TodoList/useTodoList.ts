import type {
  TodoListQuery,
  TodoListQueryVariables,
} from '#/views/adminTodo/TodoList/__generated__/TodoListQuery.generated';
import type { TableItem } from '#/views/adminTodo/TodoList/TodoList.view';
import type { MutationUpdaterFn } from '@apollo/client';
import type { TableProps } from 'antd';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';

import { useGroupsContext } from '#/context/groups-context';
import {
  currentPermissionsAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import {
  TodoListDocument,
  useTodoListQuery,
} from '#/views/adminTodo/TodoList/__generated__/TodoListQuery.generated';
import {
  activityFilterBusinessIdsAtom,
  activityFilterCompletedDateAtom,
  activityFilterCreatedDateAtom,
  activityFilterDueDateAtom,
  activityFilterGroupIdsAtom,
  activityFilterUserIdsAtom,
} from '#/views/adminTodo/TodoList/ActivityFilter';
import { useDeleteTodoMutation } from '#/views/adminTodo/graphql/mutations/__generated__/delete-todo.generated';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { useUpdateTodoMutation } from 'graphql/todos/mutations/__generated__/update_todo.generated';
import {
  PermissionMethod,
  PermissionModel,
  SortOrder,
  TodoStatusInput,
  TodoUserModeInput,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useMemo, useState } from 'react';

export interface ListData {
  defaultDueDays: number;
  description: string;
  id: string;
  name: string;
  questions: {
    id: string;
    question: string;
  }[];
}

interface Return {
  addTodo: boolean;
  canDelete: boolean;
  currentPage: number;
  currentPageSize: number;
  data: TodoListQuery | null | undefined;
  editTodo: null | string;
  filtersOpen: boolean;
  groupsData: { label: string; value: string }[];
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
  setEditTodo: (value: null | string) => void;
  setGroupsFilter: (value: string[]) => void;
  setSearch: (value: string) => void;
  setSelectedTodo: (id: null | string) => void;
  setStatusMode: (value: TodoStatusInput) => void;
  templateData: ListData[];
  toggleAddTodo: () => void;
  toggleAllSchemes: () => void;
  toggleAllUsers: () => void;
  toggleFiltersOpen: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
}

const useAdminTodos = ({
  defaultOpen,
}: {
  defaultOpen?: null | string;
}): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const permissions = useAtomValue(currentPermissionsAtom);
  const userId = useAtomValue(userIdAtom);
  const groupIds = useAtomValue(activityFilterGroupIdsAtom);
  const businessIds = useAtomValue(activityFilterBusinessIdsAtom);
  const userIds = useAtomValue(activityFilterUserIdsAtom);
  const dueDate = useAtomValue(activityFilterDueDateAtom);
  const createdDate = useAtomValue(activityFilterCreatedDateAtom);
  const completedDate = useAtomValue(activityFilterCompletedDateAtom);

  const [saving, setSaving] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [editTodo, setEditTodo] = useState<null | string>(null);
  const [allUsers, setAllUsers] = useState(false);
  const [allSchemes, setAllSchemes] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [statusMode, setStatusMode] = useState<TodoStatusInput>(
    TodoStatusInput.Uncompleted
  );
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [selectedTodo, setSelectedTodo] = useState<null | string>(
    defaultOpen || null
  );
  const [selectedTemplate, setSelectedTemplate] = useState<ListData | null>(
    null
  );

  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { data: queryData } = useQuestionGroupOnSchemeQuery({
    variables: {
      orderBy: [
        {
          name: SortOrder.Asc,
        },
      ],
      where: {
        id: currentScheme,
      },
    },
  });

  const templateData: ListData[] = useMemo(() => {
    if (queryData?.scheme?.questionGroups) {
      return queryData.scheme.questionGroups.map((qGroup) => ({
        defaultDueDays: qGroup.defaultDueDate || 0,
        description: qGroup.description || '',
        id: qGroup.id,
        name: qGroup.name,
        questions: qGroup.questions.map(({ id, questionFormatted }) => ({
          id,
          question: questionFormatted || '',
        })),
      }));
    }
    return [];
  }, [queryData]);

  const selectTemplate = (id: null | string) => {
    const template = templateData.find((t) => t.id === id);
    if (template) {
      setSelectedTemplate(template);
      setAddTodo(true);
    }
  };

  const getUsersMode = (): TodoUserModeInput => {
    if (allUsers && userIds && userIds.length > 0)
      return TodoUserModeInput.Selected;
    if (allUsers) return TodoUserModeInput.All;
    return TodoUserModeInput.Current;
  };

  const variables: TodoListQueryVariables = {
    orderBy: {
      createdAt: SortOrder.Desc,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      assignedUsers: userIds && userIds.length > 0 ? userIds : undefined,
      businessIds:
        businessIds && businessIds.length > 0 ? businessIds : undefined,
      completedAt: completedDate?.value,
      createdAt: createdDate?.value,
      dueDate: dueDate?.value,
      groupIds: groupIds && groupIds.length > 0 ? groupIds : undefined,
      schemeIds: [schemeId],
      search,
      status: statusMode,
      userMode: getUsersMode(),
    },
  };
  const { data, fetchMore, loading } = useTodoListQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<TodoListQuery, TodoListQueryVariables>(
      {
        query: TodoListDocument,
        variables,
      }
    );

    if (!existingData?.todoRelay.edges) return;

    // write the new data to the Apollo store
    store.writeQuery<TodoListQuery, TodoListQueryVariables>({
      data: {
        __typename: 'Query',
        todoRelay: {
          ...existingData.todoRelay,
          edges: [{ node: res.createTodo }, ...existingData.todoRelay.edges],
        },
      },
      query: TodoListDocument,
      variables,
    });
  };

  const [deleteTodo] = useDeleteTodoMutation({
    update: (store, { data: res }) => {
      if (res?.deleteTodo === null || res?.deleteTodo === undefined) return;

      const existingData = store.readQuery<
        TodoListQuery,
        TodoListQueryVariables
      >({
        query: TodoListDocument,
        variables,
      });

      if (!existingData?.todoRelay.edges) return;

      store.writeQuery<TodoListQuery, TodoListQueryVariables>({
        data: {
          todoRelay: {
            ...existingData.todoRelay,
            edges: existingData.todoRelay.edges.filter(
              (item) => item.node.id !== res.deleteTodo.id
            ),
          },
        },
        query: TodoListDocument,
        variables,
      });
    },
  });

  const [updateTodo] = useUpdateTodoMutation({
    onCompleted: () => {
      setSaving(false);
    },
    onError: () => {
      setSaving(false);
    },
  });
  // function
  const onCompletedTodo = (todoId: string) => {
    setSaving(true);
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
    });
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

  const { groups: groupsData } = useGroupsContext();

  const onTableChange: TableProps<TableItem>['onChange'] = (_, filters) => {
    console.log(filters);
    setGroupsFilter((filters.groups as string[]) ?? []);
  };

  const onDeleteTodo = async (id: string) => {
    await deleteTodo({
      optimisticResponse: {
        deleteTodo: {
          id,
        },
      },
      variables: {
        id,
      },
    });
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          todoRelay: {
            ...fetchMoreResult.todoRelay,
            edges: [
              ...(prev.todoRelay?.edges || []),
              ...(fetchMoreResult.todoRelay?.edges.filter(
                (item) =>
                  !prev.todoRelay.edges.some(
                    ({ node }) => node.id === item.node.id
                  )
              ) || []),
            ],
          },
        };
      },
      variables: {
        after: data?.todoRelay.pageInfo.endCursor,
        orderBy: variables.orderBy,
        take: 1,
        where: variables.where,
      },
    });
  };

  const canDelete = hasPermission({
    permission: [
      { method: PermissionMethod.Edit, model: PermissionModel.Tasks },
      { method: PermissionMethod.Delete, model: PermissionModel.Tasks },
    ],
    permissions,
  });

  const toggleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };

  return {
    addTodo,
    canDelete,
    currentPage: page,
    currentPageSize: pageSize,
    data,
    editTodo,
    filtersOpen,
    groupsData,
    groupsFilter,
    loading: (data === null || data === undefined) && loading,
    onCompletedTodo,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
    setStatusMode,
    templateData,
    toggleAddTodo,
    toggleAllSchemes,
    toggleAllUsers,
    toggleFiltersOpen,
    updateTodoList,
  };
};

export default useAdminTodos;
