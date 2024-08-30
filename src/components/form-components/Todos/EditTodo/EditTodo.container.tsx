import React from 'react';

import View from './EditTodo.view';
import useAddTodo from './useEditTodo';

interface Props {
  initData?: {
    id: string;
  };
  onClose: () => void;
  todoId: string;
}

const EditTodo = ({ initData, onClose, todoId }: Props): JSX.Element => {
  const {
    addQuestion,
    adminUsersData,
    availableUsers,
    documentList,
    documentUploadProps,
    form,
    onSubmit,
    questions,
    saving,
    selectedIds,
    setAddQuestion,
    setAvailableUsers,
    setUsers,
    templatesData,
    templatesLoading,
    todoLoading,
    update,
    users,
    usersLoading,
  } = useAddTodo({
    initData,
    onClose,
    todoId,
  });

  return (
    <View
      addQuestion={addQuestion}
      adminUsersData={adminUsersData}
      availableUsers={availableUsers}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      form={form}
      loading={todoLoading}
      onClose={onClose}
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

export default EditTodo;
