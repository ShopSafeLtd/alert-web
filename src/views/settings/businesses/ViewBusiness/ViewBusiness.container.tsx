import type { BusinessLPWatchlistOrderBy } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';

import View from './ViewBusiness.view';
import { useBusinessLossPreventionDashboard } from './useBusinessLossPreventionDashboard';
import useViewBusiness from './useViewBusiness';

const ViewBusiness = () => {
  const {
    actionsData,
    addDemDevice,
    addTodo,
    addUserVisible,
    bulkInviteConfirm,
    bulkInviting,
    businessId,
    completeTodoVisible,
    data,
    deleteConfirm,
    editDeviceData,
    editVisible,
    evidenceData,
    evidenceLoading,
    inviteUserVisible,
    linkDemVisible,
    loading,
    onEditAddress,
    onRemoveBusiness,
    onRemoveDevice,
    saving,
    selectedUserIds,
    setCompleteTodoVisible,
    setEditDeviceData,
    setSelectedUserIds,
    setViewTodoVisible,
    templatesData,
    templatesLoading,
    toggleAddDemDevice,
    toggleAddTodo,
    toggleAddUser,
    toggleEdit,
    toggleInviteUser,
    toggleLinkDem,
    updateAddUsersToBusiness,
    updateDeleteEvidenceList,
    updateDemDeviceList,
    updateTodo,
    updateTodoList,
    updateUsersList,
    updateUsersListExisting,
    usersData,
    usersLoading,
    viewTodoVisible,
  } = useViewBusiness();

  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [watchlistOrderBy, setWatchlistOrderBy] = useState<
    BusinessLPWatchlistOrderBy | undefined
  >(undefined);

  const {
    crimePatterns: lpCrimePatterns,
    linkedInvestigations,
    loading: lpLoading,
    offenderWatchlist: lpOffenderWatchlist,
    riskProfile,
    schemeComparison,
    summary: lpSummary,
    watchlistInsights: lpWatchlistInsights,
  } = useBusinessLossPreventionDashboard(businessId);

  return (
    <View
      actionsData={actionsData}
      addDemDevice={addDemDevice}
      addTodo={addTodo}
      addUserVisible={addUserVisible}
      bulkInviteConfirm={bulkInviteConfirm}
      bulkInviting={bulkInviting}
      businessId={businessId}
      completeTodoVisible={completeTodoVisible}
      data={data}
      deleteConfirm={deleteConfirm}
      editDeviceData={editDeviceData}
      editVisible={editVisible}
      evidenceData={evidenceData}
      evidenceLoading={evidenceLoading}
      inviteUserVisible={inviteUserVisible}
      linkDemVisible={linkDemVisible}
      linkedInvestigations={linkedInvestigations}
      loading={loading}
      lpCrimePatterns={lpCrimePatterns}
      lpLoading={lpLoading}
      lpOffenderWatchlist={lpOffenderWatchlist}
      lpSummary={lpSummary}
      lpWatchlistInsights={lpWatchlistInsights}
      onEditAddress={onEditAddress}
      onRemoveBusiness={onRemoveBusiness}
      onRemoveDevice={onRemoveDevice}
      riskProfile={riskProfile}
      saving={saving}
      schemeComparison={schemeComparison}
      schemeId={schemeId}
      selectedUserIds={selectedUserIds}
      setCompleteTodoVisible={setCompleteTodoVisible}
      setEditDeviceData={setEditDeviceData}
      setSelectedUserIds={setSelectedUserIds}
      setViewTodoVisible={setViewTodoVisible}
      setWatchlistOrderBy={setWatchlistOrderBy}
      templatesData={templatesData}
      templatesLoading={templatesLoading}
      toggleAddDemDevice={toggleAddDemDevice}
      toggleAddTodo={toggleAddTodo}
      toggleAddUser={toggleAddUser}
      toggleEdit={toggleEdit}
      toggleInviteUser={toggleInviteUser}
      toggleLinkDem={toggleLinkDem}
      updateAddUsersToBusiness={updateAddUsersToBusiness}
      updateDeleteEvidenceList={updateDeleteEvidenceList}
      updateDemDeviceList={updateDemDeviceList}
      updateTodo={updateTodo}
      updateTodoList={updateTodoList}
      updateUsersList={updateUsersList}
      updateUsersListExisting={updateUsersListExisting}
      usersData={usersData}
      usersLoading={usersLoading}
      viewTodoVisible={viewTodoVisible}
      watchlistOrderBy={watchlistOrderBy}
    />
  );
};

export default ViewBusiness;
