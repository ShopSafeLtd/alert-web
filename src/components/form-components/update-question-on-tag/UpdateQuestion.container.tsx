import type { AnswerType } from 'graphql/types';

import React from 'react';

import View from './UpdateQuestion.view';
import useUpdateQuestion from './useUpdateQuestion';

export interface TagQuestion {
  options?: string[];
  question: string;
  questionId: string;
  tagQuestionId: string;
  type: AnswerType;
}
interface Props {
  dependent?: {
    dependentAnswer: string;
    dependentOn: string;
  };
  onClose: () => void;
  questionId: string;
  required: boolean;
  tagQId: string;
  tagQuestions: TagQuestion[];
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      answer: string;
      questionId: string;
      tagQuestionId: string;
    }
  ) => void;
}

/**
 for use on tags as it allows setting a dependant question within a tag
* */
const UpdateQuestionContainer = ({
  dependent,
  onClose,
  questionId,
  required,
  tagQId,
  tagQuestions,
  updateQuestionOnTag,
}: Props) => {
  const { brands, data, form, loading, onSubmit, saving } = useUpdateQuestion({
    dependent,
    onClose,
    questionId,
    required,
    tagQId,
    tagQuestions,
    updateQuestionOnTag,
  });
  return (
    <View
      brands={brands}
      data={data}
      form={form}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      tagQuestions={tagQuestions}
    />
  );
};

export default UpdateQuestionContainer;
