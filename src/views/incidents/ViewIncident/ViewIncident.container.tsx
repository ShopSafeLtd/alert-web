import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewIncident.view';
import useViewIncident from './useViewIncident';
import useApproveIncident from './useApproveIncident';

const ViewIncident = (): JSX.Element => {
  const incidentId = useParams().id || '';
  const {
    data,
    loading,
    saving,
    openLightbox,
    deleteRights,
    editRights,
    linkOffender,
    toggleLinkOffender,
    updateOffendersList,
    loadMore,
    scrolledToTop,
    userId,
    replyTo,
    setReplyTo,
    confirmUpdateImages,
    addImages,
    addUpdateImages,
    closeAddImages,
    toggleSubscribe,
    selectedImages,
    toggleSelectImages,
    confirmDeleteUpdate,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    setEditUpdate,
    setEditUpdateInput,
    lightboxElements,
    lightBoxOpen,
    optionRowShow,
    setOptionRowShow,
    onDelete,
  } = useViewIncident(incidentId);
  const { onApprove, onReject, approving } = useApproveIncident({ incidentId });

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      openLightbox={openLightbox}
      incidentId={incidentId}
      deleteRights={deleteRights}
      editRights={editRights}
      linkOffender={linkOffender}
      toggleLinkOffender={toggleLinkOffender}
      updateOffendersList={updateOffendersList}
      loadMore={loadMore}
      scrolledToTop={scrolledToTop}
      userId={userId}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      confirmUpdateImages={confirmUpdateImages}
      addImages={addImages}
      addUpdateImages={addUpdateImages}
      closeAddImages={closeAddImages}
      toggleSubscribe={toggleSubscribe}
      selectedImages={selectedImages}
      toggleSelectImages={toggleSelectImages}
      confirmDeleteUpdate={confirmDeleteUpdate}
      editUpdate={editUpdate}
      editUpdateInput={editUpdateInput}
      handleEditUpdate={handleEditUpdate}
      setEditUpdate={setEditUpdate}
      setEditUpdateInput={setEditUpdateInput}
      onDelete={onDelete}
      lightboxElements={lightboxElements}
      lightBoxOpen={lightBoxOpen}
      optionRowShow={optionRowShow}
      setOptionRowShow={setOptionRowShow}
      onApprove={onApprove}
      onReject={onReject}
      approving={approving}
    />
  );
};

export default ViewIncident;
