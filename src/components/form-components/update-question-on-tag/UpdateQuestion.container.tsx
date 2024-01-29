import React from 'react';
import useUpdateQuestion from './useUpdateQuestion';
import View from './UpdateQuestion.view';
import type { AnswerType } from '../../../graphql/generated';

export interface TagQuestion {
  questionId: string;
  tagQuestionId: string;
  question: string;
  type: AnswerType;
  options?: string[];
}
interface Props {
  onClose: () => void;
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      tagQuestionId: string;
      questionId: string;
      answer: string;
    }
  ) => void;
  tagQId: string;
  questionId: string;
  required: boolean;
  tagQuestions: TagQuestion[];
  dependent?: {
    dependentOn: string;
    dependentAnswer: string;
  };
}

/**
 for use on tags as it allows setting a dependant question within a tag
* */
const UpdateQuestionContainer = ({
  onClose,
  tagQId,
  questionId,
  updateQuestionOnTag,
  required,
  tagQuestions,
  dependent,
}: Props) => {
  const { data, form, saving, loading, onSubmit, brands } = useUpdateQuestion({
    onClose,
    tagQId,
    questionId,
    updateQuestionOnTag,
    required,
    tagQuestions,
    dependent,
  });
  return (
    <View
      brands={brands}
      data={data}
      form={form}
      loading={loading}
      onSubmit={onSubmit}
      saving={saving}
      onClose={onClose}
      tagQuestions={tagQuestions}
    />
  );
};

export default UpdateQuestionContainer;
