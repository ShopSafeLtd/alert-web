import React from 'react';
import useAddQuestion from './useAddQuestion';
import View from './AddQuestion.view';

interface Props {
  onClose: () => void;
}

const AddQuestionContainer = ({ onClose }: Props) => {
  const { data, form, questionData, saving, loading, onSubmit } =
    useAddQuestion({ onClose });
  return (
    <View
      data={data}
      form={form}
      questionData={questionData}
      loading={loading}
      onSubmit={onSubmit}
      saving={saving}
      onClose={onClose}
    />
  );
};

export default AddQuestionContainer;
