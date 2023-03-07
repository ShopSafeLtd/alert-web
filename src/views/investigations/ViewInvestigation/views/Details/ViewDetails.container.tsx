import React from 'react';
import View from './ViewDetails.view';
import useViewDetails from './useViewDetails';

interface Props {
  investigationId: string;
}

const ViewDetails = ({ investigationId }: Props) => {
  const {
    data,
    loading,

    scrolledToTop,
    loadMore,
    userId,
    editRights,
    saving,
    setEditUpdate,
    confirmDeleteUpdate,
    replyTo,
    setReplyTo,
    handleEditUpdate,
    setEditUpdateInput,
    editUpdateInput,
    editUpdate,
    toggleSubscribe,
  } = useViewDetails({ investigationId });

  return (
    <View
      handleEditUpdate={handleEditUpdate}
      confirmDeleteUpdate={confirmDeleteUpdate}
      setEditUpdate={setEditUpdate}
      editRights={editRights}
      saving={saving}
      userId={userId}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      loadMore={loadMore}
      scrolledToTop={scrolledToTop}
      data={data}
      loading={loading}
      investigationId={investigationId}
      editUpdateInput={editUpdateInput}
      setEditUpdateInput={setEditUpdateInput}
      editUpdate={editUpdate}
      toggleSubscribe={toggleSubscribe}
    />
  );
};

export default ViewDetails;
