import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/generated';
import React from 'react';

import View from './AddTodo.view';
import useAddTodo from './useAddTodo';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTodoMutation>;
  incidentId?: string;
}

const AddTodo = ({
  update: updateMutation,
  onClose,
  incidentId,
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
  } = useAddTodo({
    onClose,
    updateMutation,
    incidentId,
  });

  return (
    <View
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
