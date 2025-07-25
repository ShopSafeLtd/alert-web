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
    checklistsData,
    crimeGroupsData,
    documentList,
    documentUploadProps,
    form,
    incidentsData,
    investigationsData,
    offendersData,
    onSubmit,
    questions,
    saving,
    selectedIds,
    setAddQuestion,
    setAvailableUsers,
    setUsers,
    taskTimeTracking,
    templatesData,
    templatesLoading,
    todoLoading,
    update,
    updateChecklistsList,
    updateCrimeGroupsList,
    updateIncidentList,
    updateInvestigationList,
    updateOffendersList,
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
      checklistsData={checklistsData}
      crimeGroupsData={crimeGroupsData}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      form={form}
      incidentsData={incidentsData}
      investigationsData={investigationsData}
      loading={todoLoading}
      offendersData={offendersData}
      onClose={onClose}
      onSubmit={onSubmit}
      questions={questions}
      saving={saving}
      selectedIds={selectedIds}
      setAddQuestion={setAddQuestion}
      setAvailableUsers={setAvailableUsers}
      setUsers={setUsers}
      taskTimeTracking={taskTimeTracking}
      templatesData={templatesData}
      templatesLoading={templatesLoading}
      update={update}
      updateChecklistsList={updateChecklistsList}
      updateCrimeGroupsList={updateCrimeGroupsList}
      updateIncidentList={updateIncidentList}
      updateInvestigationList={updateInvestigationList}
      updateOffendersList={updateOffendersList}
      users={users}
      usersLoading={usersLoading}
    />
  );
};

export default EditTodo;
