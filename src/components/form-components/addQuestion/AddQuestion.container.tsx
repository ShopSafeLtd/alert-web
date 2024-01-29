import React from 'react';
import useAddQuestion from './useAddQuestion';
import View from './AddQuestion.view';
import type { TagQuestion } from '../update-question-on-tag/UpdateQuestion.container';

interface Props {
  onClose: () => void;
  tagQuestions?: TagQuestion[];
}

const AddQuestionContainer = ({ onClose, tagQuestions }: Props) => {
  const { data, form, questionData, saving, loading, onSubmit, brands } =
    useAddQuestion({ onClose, tagQuestions });
  return (
    <View
      data={data}
      form={form}
      questionData={questionData}
      loading={loading}
      onSubmit={onSubmit}
      saving={saving}
      tagQuestions={tagQuestions}
      onClose={onClose}
      brands={brands}
    />
  );
};

export default AddQuestionContainer;
