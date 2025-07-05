import type { QuestionManagementListQuery } from '#/views/settings/questions/graphql/queries/__generated__/questions.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useDeleteQuestionMutation } from '#/views/settings/questions/graphql/mutations/__generated__/delete-question.generated';
import {
  QuestionManagementListDocument,
  useQuestionManagementListQuery,
} from '#/views/settings/questions/graphql/queries/__generated__/questions.generated';
import { AnswerType, QuestionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export type QuestionNode =
  QuestionManagementListQuery['questions']['edges'][number]['node'];

export interface Filters {
  activityQuestions?: boolean;
  search?: string;
  tagQuestions?: boolean;
  type?: AnswerType[];
}

interface Return {
  answerTypeLabels: Record<AnswerType, string>;
  closeDrawer: () => void;
  deleteQuestion: (id: string) => void;
  filters: Filters;
  isDrawerOpen: boolean;
  isModalOpen: null | string;
  loading: boolean;
  modelTypeLabels: Record<QuestionModel, string>;
  openDrawer: (id: string) => void;
  page: number;
  pageSize: number;
  questions: QuestionNode[];
  selectedQuestionId: null | string;
  selectedQuestionModes: string[];
  setActivityQuestionsFilter: (activityQuestions: boolean) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchFilter: (search: string) => void;
  setTagQuestionsFilter: (tagQuestions: boolean) => void;
  setTypeFilter: (type: AnswerType[]) => void;
  toggleModal: (id?: string) => void;
  total: number;
}

const useQuestions = (): Return => {
  const [filters, setFilters] = useState<Filters>({
    activityQuestions: true,
    search: undefined,
    tagQuestions: true,
    type: undefined,
  });
  const [selectedQuestionId, setSelectedQuestionId] = useState<null | string>(
    null
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { data, loading, previousData } = useQuestionManagementListQuery({
    variables: {
      schemeId: currentScheme,
      ...filters,

      first: pageSize,
      skip: pageSize * (page - 1),
    },
  });

  const [deleteQuestionMutation] = useDeleteQuestionMutation();

  const fallBackData: QuestionNode[] =
    previousData?.questions?.edges.map((edge) => edge.node) ?? [];

  const questions: QuestionNode[] =
    data?.questions?.edges.map((edge) => edge.node) ?? [];

  const openDrawer = (id: string) => {
    if (id !== 'create') {
      setSelectedQuestionId(id);
    }
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedQuestionId(null);
    setDrawerOpen(false);
  };

  const setSearchFilter = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const setTagQuestionsFilter = (tagQuestions: boolean) => {
    setFilters((prev) => ({ ...prev, tagQuestions }));
  };

  const setActivityQuestionsFilter = (activityQuestions: boolean) => {
    setFilters((prev) => ({ ...prev, activityQuestions }));
  };

  const setTypeFilter = (type: AnswerType[]) => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const deleteQuestion = (id: string) => {
    try {
      void deleteQuestionMutation({
        update: (cache) => {
          const existingData = cache.readQuery<QuestionManagementListQuery>({
            query: QuestionManagementListDocument,
            variables: {
              schemeId: currentScheme,
              ...filters,
              first: pageSize,
              skip: pageSize * (page - 1),
            },
          });
          if (!existingData) return;
          const newEdges = existingData.questions.edges.filter(
            (edge) => edge.node.id !== id
          );
          cache.writeQuery<QuestionManagementListQuery>({
            data: {
              ...existingData,
              questions: {
                ...existingData.questions,
                edges: newEdges,
              },
            },
            query: QuestionManagementListDocument,
            variables: {
              schemeId: currentScheme,
              ...filters,
              first: pageSize,
              skip: pageSize * (page - 1),
            },
          });
        },
        variables: { where: { id } },
      });
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const intl = useIntl();
  const selectedQuestionModes: string[] = [];
  if (filters.activityQuestions) {
    selectedQuestionModes.push('activities');
  }
  if (filters.tagQuestions) {
    selectedQuestionModes.push('tags');
  }

  const answerTypeLabels: Record<AnswerType, string> = {
    [AnswerType.Boolean]: intl.formatMessage({
      defaultMessage: 'True/False',
    }),
    [AnswerType.Date]: intl.formatMessage({
      defaultMessage: 'Date',
    }),
    [AnswerType.Number]: intl.formatMessage({ defaultMessage: 'Number' }),
    [AnswerType.Select]: intl.formatMessage({
      defaultMessage: 'Multi Select',
    }),
    [AnswerType.SelectSingle]: intl.formatMessage({
      defaultMessage: 'Single Select',
    }),
    [AnswerType.String]: intl.formatMessage({
      defaultMessage: 'Text',
    }),
    [AnswerType.Time]: intl.formatMessage({
      defaultMessage: 'Time',
    }),
  };

  const modelTypeLabels: Record<QuestionModel, string> = {
    [QuestionModel.Tag]: intl.formatMessage({
      defaultMessage: 'Tag',
    }),
    [QuestionModel.Task]: intl.formatMessage({
      defaultMessage: 'Activity',
    }),
  };

  const [isModalOpen, setModalOpen] = useState<null | string>(null);

  const toggleModal = (id?: string) => {
    if (id) {
      setModalOpen(id);
    } else {
      setModalOpen(null);
    }
  };

  return {
    answerTypeLabels,
    closeDrawer,
    deleteQuestion,
    filters,
    isDrawerOpen,
    isModalOpen,
    loading,
    modelTypeLabels,
    openDrawer,
    page,
    pageSize,
    questions: loading ? fallBackData : questions,
    selectedQuestionId,
    selectedQuestionModes,
    setActivityQuestionsFilter,
    setPage,
    setPageSize,
    setSearchFilter,
    setTagQuestionsFilter,
    setTypeFilter,
    toggleModal,
    total: data?.questions?.totalCount ?? 0,
  };
};

export default useQuestions;
