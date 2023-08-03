import React from 'react';
import useUpdateQuestion from './useUpdateQuestion';
import View from './UpdateQuestion.view';

interface Props {
  onClose: () => void;
  updateQuestionOnTag: (question: string, tagId: string) => void;
  tagQId: string;
  questionId: string;
  required: boolean;
}

const UpdateQuestionContainer = ({
  onClose,
  tagQId,
  questionId,
  updateQuestionOnTag,
  required,
}: Props) => {
  const { data, form, saving, loading, onSubmit } = useUpdateQuestion({
    onClose,
    tagQId,
    questionId,
    updateQuestionOnTag,
    required,
  });
  return (
    <View
      data={data}
      form={form}
      loading={loading}
      onSubmit={onSubmit}
      saving={saving}
      onClose={onClose}
    />
  );
};

export default UpdateQuestionContainer;
