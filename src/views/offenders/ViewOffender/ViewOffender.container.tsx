import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewOffender.view';
import useViewOffender from './useViewOffender';

const ViewOffender = (): JSX.Element => {
  const offenderId = useParams().id || '';

  const {
    data,
    saving,
    loading,
    openLightbox,
    deleteRights,
    editRights,
    linkIncident,
    toggleLinkIncident,
    updateIncidentList,
    optionMenuItems,
    toggleSubscribe,
    lightboxElements,
    confirmDeleteUpdate,
    confirmUpdateImages,
    editUpdate,
    loadMore,
    replyTo,
    scrolledToTop,
    selectedImages,
    setEditUpdate,
    setReplyTo,
    userId,
    addImages,
    addUpdateImages,
    closeAddImages,
    editUpdateInput,
    handleEditUpdate,
    setEditUpdateInput,
    toggleSelectImages,
    lightBoxOpen,
  } = useViewOffender(offenderId);

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      saving={saving}
      openLightbox={openLightbox}
      offenderId={offenderId}
      deleteRights={deleteRights}
      editRights={editRights}
      linkIncident={linkIncident}
      toggleLinkIncident={toggleLinkIncident}
      updateIncidentList={updateIncidentList}
      optionMenuItems={optionMenuItems}
      lightboxElements={lightboxElements}
      toggleSubscribe={toggleSubscribe}
      confirmDeleteUpdate={confirmDeleteUpdate}
      confirmUpdateImages={confirmUpdateImages}
      editUpdate={editUpdate}
      loadMore={loadMore}
      replyTo={replyTo}
      scrolledToTop={scrolledToTop}
      selectedImages={selectedImages}
      setEditUpdate={setEditUpdate}
      setReplyTo={setReplyTo}
      userId={userId}
      addImages={addImages}
      addUpdateImages={addUpdateImages}
      closeAddImages={closeAddImages}
      editUpdateInput={editUpdateInput}
      handleEditUpdate={handleEditUpdate}
      setEditUpdateInput={setEditUpdateInput}
      toggleSelectImages={toggleSelectImages}
    />
  );
};

export default ViewOffender;
