import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/generated';
import React from 'react';

import View from './AddTodo.view';
import useAddTodo from './useAddTodo';

interface Props {
  onClose: () => void;
  update?: MutationUpdaterFn<CreateTodoMutation>;
  incidentId?: string;
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

const AddTodo = ({
  update: updateMutation,
  onClose,
  incidentId,
  initData,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    adminUsersData,
    usersLoading,
    addQuestion,
    setAddQuestion,
    update,
    selectedIds,
    selectedQuestions,
    setSelectedQuestions,
    setSelectedIds,
    form,
  } = useAddTodo({
    onClose,
    updateMutation,
    incidentId,
    initData,
  });

  return (
    <View
      form={form}
      setSelectedIds={setSelectedIds}
      addQuestion={addQuestion}
      setAddQuestion={setAddQuestion}
      update={update}
      selectedIds={selectedIds}
      selectedQuestions={selectedQuestions}
      setSelectedQuestions={setSelectedQuestions}
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      adminUsersData={adminUsersData}
      usersLoading={usersLoading}
    />
  );
};

export default AddTodo;
