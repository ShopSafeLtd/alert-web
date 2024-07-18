import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';

import React from 'react';

import View from './AddTodo.view';
import useAddTodo from './useAddTodo';

interface Props {
  businessId?: string;
  incidentId?: string;
  initData?: {
    id: string;
  };
  investigationId?: string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateTodoMutation>;
}

const AddTodo = ({
  businessId,
  incidentId,
  initData,
  investigationId,
  onClose,
  update: updateMutation,
}: Props): JSX.Element => {
  const {
    addQuestion,
    adminUsersData,
    availableUsers,
    documentList,
    documentUploadProps,
    // setSelectedIds,
    form,
    onSubmit,
    questions,
    // selectedQuestions,
    // setSelectedQuestions,
    saving,
    selectedIds,
    setAddQuestion,
    setAvailableUsers,
    setUsers,
    templatesData,
    templatesLoading,
    update,
    users,
    usersLoading,
  } = useAddTodo({
    businessId,
    incidentId,
    initData,
    investigationId,
    onClose,
    updateMutation,
  });

  return (
    <View
      // setSelectedIds={setSelectedIds}
      addQuestion={addQuestion}
      adminUsersData={adminUsersData}
      availableUsers={availableUsers}
      businessId={businessId}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      // selectedQuestions={selectedQuestions}
      form={form}
      onClose={onClose}
      // setSelectedQuestions={setSelectedQuestions}
      onSubmit={onSubmit}
      questions={questions}
      saving={saving}
      selectedIds={selectedIds}
      setAddQuestion={setAddQuestion}
      setAvailableUsers={setAvailableUsers}
      setUsers={setUsers}
      templatesData={templatesData}
      templatesLoading={templatesLoading}
      update={update}
      users={users}
      usersLoading={usersLoading}
    />
  );
};

export default AddTodo;
