import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';

import {
  QuestionGroupOnSchemeDocument,
  useQuestionGroupOnSchemeQuery,
} from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { useApolloClient } from '@apollo/client';
import { useMemo } from 'react';

import { useStoreState } from '../../state';

interface Return {
  loading: boolean;
  templateData: ListData[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
}

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
const useActivityTemplates = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const store = useApolloClient();
  const { data, loading } = useQuestionGroupOnSchemeQuery({
    variables: {
      where: {
        id: currentScheme,
      },
    },
  });

  const templateData: ListData[] = useMemo(() => {
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

  return {
    loading,
    templateData,
    updateTemplates,
  };
};

export default useActivityTemplates;
