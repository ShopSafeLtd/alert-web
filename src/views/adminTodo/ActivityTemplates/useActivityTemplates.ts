import type { ListData } from '#/views/adminTodo/TodoList/useTodoList';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useDeleteQuestionGroupMutation } from '#/views/adminTodo/graphql/mutations/__generated__/deleteQuestionGroup.generated';
import {
  QuestionGroupOnSchemeDocument,
  type QuestionGroupOnSchemeQuery,
  useQuestionGroupOnSchemeQuery,
} from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { useApolloClient } from '@apollo/client';
import { useAtomValue } from 'jotai/index';
import { useMemo, useState } from 'react';

interface Return {
  activityTemplateForm: boolean;
  addActivity: boolean;
  createActivity: (id: null | string) => void;
  deleteQuestion: (id: string) => void;
  loading: boolean;
  onClose: () => void;
  selectedActivity: ListData | null;
  tableData: ListData[];
  toggleAddTemplate: () => void;
  toggleEdit: (id: null | string) => void;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
}

const useActivityTemplates = (): Return => {
  const store = useApolloClient();
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [addActivity, setAddActivity] = useState(false);
  const [activityTemplateForm, setActivityTemplateForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ListData | null>(
    null
  );

  const { data, loading } = useQuestionGroupOnSchemeQuery({
    variables: {
      where: {
        id: currentScheme,
      },
    },
  });

  const tableData: ListData[] = useMemo(() => {
    if (data?.scheme?.questionGroups) {
      return data.scheme.questionGroups.map((qGroup) => ({
        defaultDueDays: qGroup.defaultDueDate || 0,
        description: qGroup.description || '',
        id: qGroup.id,
        name: qGroup.name,
        questions: qGroup.questions.map(({ id, questionFormatted }) => ({
          id,
          question: questionFormatted || '',
        })),
        requiredQuestionIds: qGroup.requiredQuestionIds || [],
      }));
    }
    return [];
  }, [data]);

  const updateTemplates = (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => {
    const existing = store.readQuery<QuestionGroupOnSchemeQuery>({
      query: QuestionGroupOnSchemeDocument,
      variables: {
        where: {
          id: currentScheme,
        },
      },
    });
    if (existing && existing.scheme && existing.scheme.questionGroups) {
      if (type === 'create') {
        store.writeQuery({
          data: {
            scheme: {
              ...existing.scheme,
              questionGroups: [...existing.scheme.questionGroups, item],
            },
          },
          query: QuestionGroupOnSchemeDocument,
          variables: {
            where: {
              id: currentScheme,
            },
          },
        });
      }
      if (type === 'update') {
        store.writeQuery({
          data: {
            scheme: {
              ...existing.scheme,
              questionGroups: existing.scheme.questionGroups.map((qGroup) => {
                if (qGroup.id === item.id) {
                  return item;
                }
                return qGroup;
              }),
            },
          },
          query: QuestionGroupOnSchemeDocument,
          variables: {
            where: {
              id: currentScheme,
            },
          },
        });
      }
      if (type === 'delete') {
        store.writeQuery({
          data: {
            scheme: {
              ...existing.scheme,
              questionGroups: existing.scheme.questionGroups.filter(
                (qGroup) => qGroup.id !== item.id
              ),
            },
          },
          query: QuestionGroupOnSchemeDocument,
          variables: {
            where: {
              id: currentScheme,
            },
          },
        });
      }
    }
  };

  const onClose = () => {
    setAddActivity(false);
    setActivityTemplateForm(false);
    setSelectedActivity(null);
  };

  const toggleAddTemplate = () => {
    setActivityTemplateForm(!activityTemplateForm);
  };

  const toggleEdit = (id: null | string) => {
    if (id) {
      setSelectedActivity(tableData.find((item) => item.id === id) || null);
      setActivityTemplateForm(true);
    } else {
      setActivityTemplateForm(false);
      setSelectedActivity(null);
    }
  };

  const createActivity = (id: null | string) => {
    if (id) {
      setSelectedActivity(tableData.find((item) => item.id === id) || null);
      setAddActivity(true);
    } else {
      setAddActivity(false);
      setSelectedActivity(null);
    }
  };

  const [deleteTemplate] = useDeleteQuestionGroupMutation();

  const deleteQuestion = (id: string) => {
    void deleteTemplate({
      variables: {
        where: {
          id,
        },
      },
    });
    const found = tableData.find((item) => item.id === id);
    if (!found) return;
    updateTemplates(found, 'delete');
  };

  return {
    activityTemplateForm,
    addActivity,
    createActivity,
    deleteQuestion,
    loading,
    onClose,
    selectedActivity,
    tableData,
    toggleAddTemplate,
    toggleEdit,
    updateTemplates,
  };
};

export default useActivityTemplates;
