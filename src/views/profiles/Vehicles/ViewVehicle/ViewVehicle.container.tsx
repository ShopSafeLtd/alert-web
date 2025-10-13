import React from 'react';
import { useParams } from 'react-router';

import View from './ViewVehicle.view';
import useViewVehicle from './useViewVehicle';

const ViewVehicle = () => {
  const vehicleId = useParams().id || '';

  const {
    addDocument,
    addExistingOffender,
    addInvestigation,
    addOffender,
    confirmDeleteUpdate,
    data,
    editImageData,
    editImages,
    editOffenderData,
    editRights,
    editUpdate,
    editUpdateInput,
    editVehicle,
    handleEditUpdate,
    lightBoxOpen,
    lightboxElements,
    loadMore,
    loading,
    onAddExistingOffender,
    onCompletedAddOffender,
    onCompletedEditOffender,
    onDeleteImage,
    onDeleteOffender,
    onDeleteVehicle,
    onEditImage,
    onUpdateImages,
    openLightbox,
    optionRowShow,
    replyTo,
    saving,
    scrolledToTop,
    setEditImageData,
    setEditOffenderData,
    setEditUpdate,
    setEditUpdateInput,
    setOptionRowShow,
    setReplyTo,
    submitEditVehicle,
    toggleAddDocument,
    toggleAddExistingOffender,
    toggleAddInvestigation,
    toggleAddOffender,
    toggleEditImages,
    toggleEditVehicle,
    toggleSubscribe,
    updateAddOffenderList,
    updateDeleteDocument,
    updateDocumentList,
    updateEditOffenderList,
    updateInvestigationList,
    userId,
  } = useViewVehicle(vehicleId);

  return (
    <View
      addDocument={addDocument}
      addExistingOffender={addExistingOffender}
      addInvestigation={addInvestigation}
      addOffender={addOffender}
      confirmDeleteUpdate={confirmDeleteUpdate}
      data={data}
      editImageData={editImageData}
      editImages={editImages}
      editOffenderData={editOffenderData}
      editRights={editRights}
      editUpdate={editUpdate}
      editUpdateInput={editUpdateInput}
      editVehicle={editVehicle}
      handleEditUpdate={handleEditUpdate}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loadMore={loadMore}
      loading={loading}
      onAddExistingOffender={onAddExistingOffender}
      onCompletedAddOffender={onCompletedAddOffender}
      onCompletedEditOffender={onCompletedEditOffender}
      onDeleteImage={onDeleteImage}
      onDeleteOffender={onDeleteOffender}
      onDeleteVehicle={onDeleteVehicle}
      onEditImage={onEditImage}
      onUpdateImages={onUpdateImages}
      openLightbox={openLightbox}
      optionRowShow={optionRowShow}
      replyTo={replyTo}
      saving={saving}
      scrolledToTop={scrolledToTop}
      setEditImageData={setEditImageData}
      setEditOffenderData={setEditOffenderData}
      setEditUpdate={setEditUpdate}
      setEditUpdateInput={setEditUpdateInput}
      setOptionRowShow={setOptionRowShow}
      setReplyTo={setReplyTo}
      submitEditVehicle={submitEditVehicle}
      toggleAddDocument={toggleAddDocument}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddInvestigation={toggleAddInvestigation}
      toggleAddOffender={toggleAddOffender}
      toggleEditImages={toggleEditImages}
      toggleEditVehicle={toggleEditVehicle}
      toggleSubscribe={toggleSubscribe}
      updateAddOffenderList={updateAddOffenderList}
      updateDeleteDocument={updateDeleteDocument}
      updateDocumentList={updateDocumentList}
      updateEditOffenderList={updateEditOffenderList}
      updateInvestigationList={updateInvestigationList}
      userId={userId}
      vehicleId={vehicleId}
    />
  );
};

export default ViewVehicle;
