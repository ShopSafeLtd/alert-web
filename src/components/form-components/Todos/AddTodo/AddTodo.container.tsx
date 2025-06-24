import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';

import React from 'react';

import View from './AddTodo.view';
import useAddTodo from './useAddTodo';

interface Props {
  businessId?: string;
  checklistId?: string;
  crimeGroupId?: string;
  incidentId?: string;
  initData?: {
    id: string;
  };
  investigationId?: string;
  offenderId?: string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateTodoMutation>;
  vehicleId?: string;
}

const AddTodo = ({
  businessId,
  checklistId,
  crimeGroupId,
  incidentId,
  initData,
  investigationId,
  offenderId,
  onClose,
  update: updateMutation,
  vehicleId,
}: Props): JSX.Element => {
  const {
    addQuestion,
    adminUsersData,
    availableUsers,
    checklistsData,
    crimeGroupsData,
    documentList,
    documentUploadProps,
    // setSelectedIds,
    form,
    // selectedQuestions,
    incidentsData,
    investigationsData,
    offendersData,
    // removeChecklist,
    // removeCrimeGroup,
    // removeIncident,
    // removeOffender,
    onSubmit,
    questions,
    // setSelectedQuestions,
    saving,
    selectedIds,
    setAddQuestion,
    setAvailableUsers,
    setUsers,
    templatesData,
    templatesLoading,

    update,
    updateChecklistsList,
    updateCrimeGroupsList,
    updateIncidentList,
    updateInvestigationList,
    updateOffendersList,
    users,
    usersLoading,
  } = useAddTodo({
    businessId,
    checklistId,
    crimeGroupId,
    incidentId,
    initData,
    investigationId,
    offenderId,
    onClose,
    updateMutation,
    vehicleId,
  });

  return (
    <View
      // setSelectedIds={setSelectedIds}
      addQuestion={addQuestion}
      adminUsersData={adminUsersData}
      availableUsers={availableUsers}
      businessId={businessId}
      checklistsData={checklistsData}
      crimeGroupsData={crimeGroupsData}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      // selectedQuestions={selectedQuestions}
      form={form}
      incidentsData={incidentsData}
      investigationsData={investigationsData}
      offendersData={offendersData}
      onClose={onClose}
      // removeChecklist={removeChecklist}
      // removeCrimeGroup={removeCrimeGroup}
      // removeIncident={removeIncident}
      // setSelectedQuestions={setSelectedQuestions}
      onSubmit={onSubmit}
      questions={questions}
      // removeOffender={removeOffender}
      saving={saving}
      selectedIds={selectedIds}
      setAddQuestion={setAddQuestion}
      setAvailableUsers={setAvailableUsers}
      setUsers={setUsers}
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

export default AddTodo;
