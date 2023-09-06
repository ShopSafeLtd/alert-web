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
    id: string;
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
    // selectedQuestions,
    // setSelectedQuestions,
    // setSelectedIds,
    form,
    templatesLoading,
    templatesData,
    questions,
    setUsers,
    setAvailableUsers,
    users,
    availableUsers,
  } = useAddTodo({
    onClose,
    updateMutation,
    incidentId,
    initData,
  });

  return (
    <View
      form={form}
      // setSelectedIds={setSelectedIds}
      addQuestion={addQuestion}
      setAddQuestion={setAddQuestion}
      update={update}
      selectedIds={selectedIds}
      // selectedQuestions={selectedQuestions}
      // setSelectedQuestions={setSelectedQuestions}
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      adminUsersData={adminUsersData}
      usersLoading={usersLoading}
      templatesLoading={templatesLoading}
      templatesData={templatesData}
      questions={questions}
      availableUsers={availableUsers}
      setAvailableUsers={setAvailableUsers}
      setUsers={setUsers}
      users={users}
    />
  );
};

export default AddTodo;
