import React from 'react';
import { useParams } from 'react-router';

import View from './ViewCrimeGroup.view';
import useViewCrimeGroup from './useViewCrimeGroup';

const ViewCrimeGroup = () => {
  const crimeGroupId = useParams().id || '';

  const {
    addAlias,
    addDocument,
    addExistingOffender,
    addExistingVehicle,
    addInvestigation,
    addNewVehicle,
    addOffender,
    confirmDeleteUpdate,
    data,
    editRights,
    editUpdate,
    editUpdateInput,
    handleAddSuggestion,
    handleEditUpdate,
    loadMore,
    loading,
    offenderIds,
    onCompletedAddOffender,
    onDeleteCrimeGroup,
    onDisconnectOffender,
    onDisconnectVehicle,
    optionRowShow,
    replyTo,
    saving,
    scrolledToTop,
    setEditUpdate,
    setEditUpdateInput,
    setOptionRowShow,
    setReplyTo,
    submitNewVehicle,
    submitOffender,
    submitVehicle,
    suggestedData,
    toggleAddAlias,
    toggleAddDocument,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddInvestigation,
    toggleAddNewVehicle,
    toggleAddOffender,
    toggleSubscribe,
    toggleViewSuggested,
    updateAddOffenderList,
    updateDeleteDocument,
    updateDocumentList,
    updateInvestigationList,
    userId,
    vehicleIds,
    viewSuggestedOpen,
  } = useViewCrimeGroup(crimeGroupId);

  return (
    <View
      addAlias={addAlias}
      addDocument={addDocument}
      addExistingOffender={addExistingOffender}
      addExistingVehicle={addExistingVehicle}
      addInvestigation={addInvestigation}
      addNewVehicle={addNewVehicle}
      addOffender={addOffender}
      confirmDeleteUpdate={confirmDeleteUpdate}
      crimeGroupId={crimeGroupId}
      data={data}
      editRights={editRights}
      editUpdate={editUpdate}
      editUpdateInput={editUpdateInput}
      handleAddSuggestion={handleAddSuggestion}
      handleEditUpdate={handleEditUpdate}
      loadMore={loadMore}
      loading={loading}
      offenderIds={offenderIds}
      onCompletedAddOffender={onCompletedAddOffender}
      onDeleteCrimeGroup={onDeleteCrimeGroup}
      onDisconnectOffender={onDisconnectOffender}
      onDisconnectVehicle={onDisconnectVehicle}
      optionRowShow={optionRowShow}
      replyTo={replyTo}
      saving={saving}
      scrolledToTop={scrolledToTop}
      setEditUpdate={setEditUpdate}
      setEditUpdateInput={setEditUpdateInput}
      setOptionRowShow={setOptionRowShow}
      setReplyTo={setReplyTo}
      submitNewVehicle={submitNewVehicle}
      submitOffender={submitOffender}
      submitVehicle={submitVehicle}
      suggestedData={suggestedData}
      toggleAddAlias={toggleAddAlias}
      toggleAddDocument={toggleAddDocument}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddInvestigation={toggleAddInvestigation}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddOffender={toggleAddOffender}
      toggleSubscribe={toggleSubscribe}
      toggleViewSuggested={toggleViewSuggested}
      updateAddOffenderList={updateAddOffenderList}
      updateDeleteDocument={updateDeleteDocument}
      updateDocumentList={updateDocumentList}
      updateInvestigationList={updateInvestigationList}
      userId={userId}
      vehicleIds={vehicleIds}
      viewSuggestedOpen={viewSuggestedOpen}
    />
  );
};

export default ViewCrimeGroup;
