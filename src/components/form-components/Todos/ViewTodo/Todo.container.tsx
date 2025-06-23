import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import View from './Todo.view';
import useTodo from './useTodo';

const ViewTodo = ({
  confirmText,
  id,
  minimal = false,
  onClose,
  updateQuery,
  updateTodo,
}: {
  confirmText?: string;
  id: null | string;
  minimal?: boolean;
  onClose: () => void;
  updateQuery?: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodo?: (value: boolean, i?: string) => void;
}) => {
  const {
    actionsOpen,
    availableUsers,
    checklistsData,
    crimeGroupsData,
    documentList,
    documentUploadProps,
    form,
    incidentsData,
    investigationsData,
    loading,
    needAuthorised,
    offendersData,
    onAuthorisedTodo,
    onSubmit,
    saving,
    setAvailableUsers,
    setUsers,
    todo,
    toggleActionsOpen,
    updateChecklistsList,
    updateCrimeGroupsList,
    updateIncidentList,
    updateInvestigationList,
    updateOffendersList,
    users,
  } = useTodo({
    id,
    minimal,
    onClose,
    updateQuery,
    updateTodo,
  });

  return (
    <View
      actionsOpen={actionsOpen}
      availableUsers={availableUsers}
      checklistsData={checklistsData}
      confirmText={confirmText}
      crimeGroupsData={crimeGroupsData}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      form={form}
      incidentsData={incidentsData}
      investigationsData={investigationsData}
      loading={loading}
      minimal={minimal}
      needAuthorised={needAuthorised}
      offendersData={offendersData}
      onAuthorisedTodo={onAuthorisedTodo}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      setAvailableUsers={setAvailableUsers}
      setUsers={setUsers}
      todo={todo}
      toggleActionsOpen={toggleActionsOpen}
      updateChecklistsList={updateChecklistsList}
      updateCrimeGroupsList={updateCrimeGroupsList}
      updateIncidentList={updateIncidentList}
      updateInvestigationList={updateInvestigationList}
      updateOffendersList={updateOffendersList}
      users={users}
    />
  );
};

export default ViewTodo;
