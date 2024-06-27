import React from 'react';

import View from './EditTodo.view';
import useAddTodo from './useEditTodo';

interface Props {
  onClose: () => void;
  initData?: {
    id: string;
  };
  todoId: string;
}

const EditTodo = ({ onClose, initData, todoId }: Props): JSX.Element => {
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
    documentList,
    documentUploadProps,
    todoLoading,
    // todoData,
  } = useAddTodo({
    onClose,
    initData,
    todoId,
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
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      loading={todoLoading}
    />
  );
};

export default EditTodo;
