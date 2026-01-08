import React from 'react';

import View from './ActivityTemplate.view';
import useCreateActivityTemplate from './useCreateActivityTemplate';

interface ListData {
  defaultDueDays: number;
  description: string;
  id: string;
  name: string;
  questions: {
    id: string;
    question: string;
  }[];
  requiredQuestionIds: string[];
}

interface Props {
  id?: string;
  initData?: {
    defaultDueDays: number;
    description: string;
    name: string;
    questions: {
      id: string;
      question: string;
    }[];
    requiredQuestionIds?: string[];
  };
  onClose: () => void;
  update: (item: ListData, type: 'create' | 'delete' | 'update') => void;
}

const ActivityTemplateForm = ({
  id,
  initData,
  onClose,
  update,
}: Props): JSX.Element => {
  const {
    addQuestion,
    editQuestion,
    form,
    onSubmit,
    requiredQuestionIds,
    saving,
    selectedIds,
    selectedQuestions,
    setAddQuestion,
    setEditQuestion,
    setRequiredQuestionIds,
    setSelectedIds,
    setSelectedQuestions,
    updateQs,
  } = useCreateActivityTemplate({
    id,
    initData,
    onClose,
    update,
  });

  return (
    <View
      addQuestion={addQuestion}
      editQuestion={editQuestion}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      requiredQuestionIds={requiredQuestionIds}
      saving={saving}
      selectedIds={selectedIds}
      selectedQuestions={selectedQuestions}
      setAddQuestion={setAddQuestion}
      setEditQuestion={setEditQuestion}
      setRequiredQuestionIds={setRequiredQuestionIds}
      setSelectedIds={setSelectedIds}
      setSelectedQuestions={setSelectedQuestions}
      update={updateQs}
    />
  );
};

export default ActivityTemplateForm;
