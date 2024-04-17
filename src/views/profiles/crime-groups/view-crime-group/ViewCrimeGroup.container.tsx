import React from 'react';
import { useParams } from 'react-router';
import View from './ViewCrimeGroup.view';
import useViewCrimeGroup from './useViewCrimeGroup';

const ViewCrimeGroup = () => {
  const crimeGroupId = useParams().id || '';

  const {
    data,
    loading,
    saving,
    offenderIds,
    vehicleIds,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    addNewVehicle,
    addExistingVehicle,
    toggleAddNewVehicle,
    toggleAddExistingVehicle,
    onDeleteCrimeGroup,
    addAlias,
    toggleAddAlias,
    editRights,
    optionRowShow,
    setOptionRowShow,
    userId,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    replyTo,
    scrolledToTop,
    setEditUpdate,
    setEditUpdateInput,
    setReplyTo,
    loadMore,
    confirmDeleteUpdate,
    toggleSubscribe,
    submitNewVehicle,
    submitOffender,
    submitVehicle,
    suggestedData,
    viewSuggestedOpen,
    toggleViewSuggested,
    handleAddSuggestion,
    toggleAddDocument,
    addDocument,
    updateDocumentList,
    updateDeleteDocument,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
    toggleShowIntel,
    showIntel,
    updateAddOffenderList,
    onCompletedAddOffender,
  } = useViewCrimeGroup(crimeGroupId);

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      addOffender={addOffender}
      toggleAddOffender={toggleAddOffender}
      addExistingOffender={addExistingOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      addNewVehicle={addNewVehicle}
      addExistingVehicle={addExistingVehicle}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      offenderIds={offenderIds}
      vehicleIds={vehicleIds}
      onDeleteCrimeGroup={onDeleteCrimeGroup}
      addAlias={addAlias}
      toggleAddAlias={toggleAddAlias}
      loadMore={loadMore}
      scrolledToTop={scrolledToTop}
      userId={userId}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      confirmDeleteUpdate={confirmDeleteUpdate}
      editUpdate={editUpdate}
      editUpdateInput={editUpdateInput}
      handleEditUpdate={handleEditUpdate}
      setEditUpdate={setEditUpdate}
      setEditUpdateInput={setEditUpdateInput}
      optionRowShow={optionRowShow}
      setOptionRowShow={setOptionRowShow}
      editRights={editRights}
      crimeGroupId={crimeGroupId}
      toggleSubscribe={toggleSubscribe}
      submitNewVehicle={submitNewVehicle}
      submitOffender={submitOffender}
      submitVehicle={submitVehicle}
      suggestedData={suggestedData}
      viewSuggestedOpen={viewSuggestedOpen}
      toggleViewSuggested={toggleViewSuggested}
      handleAddSuggestion={handleAddSuggestion}
      toggleAddDocument={toggleAddDocument}
      addDocument={addDocument}
      updateDocumentList={updateDocumentList}
      updateDeleteDocument={updateDeleteDocument}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      updateInvestigationList={updateInvestigationList}
      showIntel={showIntel}
      toggleShowIntel={toggleShowIntel}
      updateAddOffenderList={updateAddOffenderList}
      onCompletedAddOffender={onCompletedAddOffender}
    />
  );
};

export default ViewCrimeGroup;
