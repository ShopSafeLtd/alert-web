import React from 'react';

import View from './ActivityTemplate.view';
import useCreateActivityTemplate from './useCreateActivityTemplate';
import type { ListData } from '../../../views/adminTodo/useActivities';

interface Props {
  onClose: () => void;
  update: (item: ListData, type: 'create' | 'update' | 'delete') => void;
  id?: string;
  initData?: {
    name: string;
    description: string;
    questions: {
      id: string;
      question: string;
    }[];
    defaultDueDays: number;
  };
}

const ActivityTemplateForm = ({
  update,
  onClose,
  initData,
  id,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    addQuestion,
    setAddQuestion,
    selectedIds,
    selectedQuestions,
    setSelectedQuestions,
    setSelectedIds,
    form,
    updateQs,
  } = useCreateActivityTemplate({
    onClose,
    id,
    update,
    initData,
  });

  return (
    <View
      form={form}
      setSelectedIds={setSelectedIds}
      addQuestion={addQuestion}
      setAddQuestion={setAddQuestion}
      update={updateQs}
      selectedIds={selectedIds}
      selectedQuestions={selectedQuestions}
      setSelectedQuestions={setSelectedQuestions}
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
    />
  );
};

export default ActivityTemplateForm;
