import React from 'react';

import type { TagQuestion } from '../update-question-on-tag/UpdateQuestion.container';

import View from './AddQuestion.view';
import useAddQuestion from './useAddQuestion';

interface Props {
  onClose: () => void;
  tagQuestions?: TagQuestion[];
}

const AddQuestionContainer = ({ onClose, tagQuestions }: Props) => {
  const { brands, data, form, loading, onSubmit, questionData, saving } =
    useAddQuestion({ onClose, tagQuestions });
  return (
    <View
      brands={brands}
      data={data}
      form={form}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      questionData={questionData}
      saving={saving}
      tagQuestions={tagQuestions}
    />
  );
};

export default AddQuestionContainer;
