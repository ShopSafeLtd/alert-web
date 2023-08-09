import React from 'react';
import useCreateQuestion from './useCreateQuestion';
import View from './CreateQuestion.view';

interface Props {
  onClose: () => void;
  update: (id: string, question: string) => void;
  ids?: string[];
}

const CreateQuestionContainer = ({ onClose, update, ids }: Props) => {
  const { data, form, saving, onSubmit, questionData, loading } =
    useCreateQuestion({
      onClose,
      update,
      ids,
    });
  return (
    <View
      data={data}
      form={form}
      onSubmit={onSubmit}
      saving={saving}
      onClose={onClose}
      questionData={questionData}
      loading={loading}
    />
  );
};

export default CreateQuestionContainer;
