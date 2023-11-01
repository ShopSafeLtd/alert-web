import React from 'react';
import { useParams } from 'react-router';
import View from './ViewVehicle.view';
import useViewVehicle from './useViewVehicle';

const ViewVehicle = () => {
  const vehicleId = useParams().id || '';

  const {
    data,
    loading,
    saving,
    editVehicle,
    toggleEditVehicle,
    onDeleteVehicle,
    editRights,
    optionRowShow,
    setOptionRowShow,
    userId,
    openLightbox,
    lightBoxOpen,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    lightboxElements,
    replyTo,
    scrolledToTop,
    setEditUpdate,
    setEditUpdateInput,
    setReplyTo,
    loadMore,
    confirmDeleteUpdate,
    toggleSubscribe,
    submitEditVehicle,
    toggleAddDocument,
    addDocument,
    updateDocumentList,
    updateDeleteDocument,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
    editImages,
    toggleEditImages,
    editImageData,
    setEditImageData,
    onDeleteImage,
    onEditImage,
    onUpdateImages,
    addOffender,
    addExistingOffender,
    editOffenderData,
    setEditOffenderData,
    onDeleteOffender,
    toggleAddOffender,
    toggleAddExistingOffender,
    onEditOffender,
    onAddOffender,
    onAddExistingOffender,
  } = useViewVehicle(vehicleId);

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      editVehicle={editVehicle}
      toggleEditVehicle={toggleEditVehicle}
      onDeleteVehicle={onDeleteVehicle}
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
      lightboxElements={lightboxElements}
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      optionRowShow={optionRowShow}
      setOptionRowShow={setOptionRowShow}
      editRights={editRights}
      vehicleId={vehicleId}
      toggleSubscribe={toggleSubscribe}
      submitEditVehicle={submitEditVehicle}
      toggleAddDocument={toggleAddDocument}
      addDocument={addDocument}
      updateDocumentList={updateDocumentList}
      updateDeleteDocument={updateDeleteDocument}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      updateInvestigationList={updateInvestigationList}
      editImages={editImages}
      toggleEditImages={toggleEditImages}
      editImageData={editImageData}
      setEditImageData={setEditImageData}
      onDeleteImage={onDeleteImage}
      onEditImage={onEditImage}
      onUpdateImages={onUpdateImages}
      addOffender={addOffender}
      addExistingOffender={addExistingOffender}
      editOffenderData={editOffenderData}
      setEditOffenderData={setEditOffenderData}
      onDeleteOffender={onDeleteOffender}
      toggleAddOffender={toggleAddOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      onEditOffender={onEditOffender}
      onAddOffender={onAddOffender}
      onAddExistingOffender={onAddExistingOffender}
    />
  );
};

export default ViewVehicle;
