import { useMemo } from 'react';
import { useApolloClient } from '@apollo/client';
import type { QuestionGroupOnSchemeQuery } from '../../graphql/generated';
import {
  QuestionGroupOnSchemeDocument,
  useQuestionGroupOnSchemeQuery,
} from '../../graphql/generated';
import { useStoreState } from '../../state';

interface Return {
  templateData: ListData[];
  loading: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
}

export interface ListData {
  id: string;
  name: string;
  description: string;
  questions: {
    id: string;
    question: string;
  }[];
  defaultDueDays: number;
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
    if (data && data.scheme && data.scheme.questionGroups) {
      return data.scheme.questionGroups.map((qGroup) => ({
        id: qGroup.id,
        name: qGroup.name,
        description: qGroup.description || '',
        questions: qGroup.questions.map(({ questionFormatted, id }) => ({
          question: questionFormatted || '',
          id,
        })),
        defaultDueDays: qGroup.defaultDueDate || 0,
      }));
    }
    return [];
  }, [data]);

  const updateTemplates = (
    item: ListData,
    type: 'create' | 'update' | 'delete'
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
          query: QuestionGroupOnSchemeDocument,
          variables: {
            where: {
              id: currentScheme,
            },
          },
          data: {
            scheme: {
              ...existing.scheme,
              questionGroups: [...existing.scheme.questionGroups, item],
            },
          },
        });
      }
      if (type === 'update') {
        store.writeQuery({
          query: QuestionGroupOnSchemeDocument,
          variables: {
            where: {
              id: currentScheme,
            },
          },
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
        });
      }
      if (type === 'delete') {
        store.writeQuery({
          query: QuestionGroupOnSchemeDocument,
          variables: {
            where: {
              id: currentScheme,
            },
          },
          data: {
            scheme: {
              ...existing.scheme,
              questionGroups: existing.scheme.questionGroups.filter(
                (qGroup) => qGroup.id !== item.id
              ),
            },
          },
        });
      }
    }
  };

  return {
    templateData,
    loading,
    updateTemplates,
  };
};

export default useActivityTemplates;
