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
}

/**
 for use on tags as it allows setting a dependant question within a tag
* */
const UpdateQuestionContainer = ({ onClose, questionId, required }: Props) => {
  const { data, form, loading, onSubmit, saving } = useUpdateQuestion({
    onClose,
    questionId,
    required,
  });
  return (
    <View
      data={data}
      form={form}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default UpdateQuestionContainer;
