import React from 'react';
import View from './ViewMessage.view';
import useViewMessages from './useViewMessage';

interface Props {
  chatId: string;
}
const ViewMessages = ({ chatId }: Props): JSX.Element => {
  const {
    onSubmit,
    form,
    saving,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
    deleteConfirm,
    deleteRights,
    // ref,
  } = useViewMessages({ chatId });

  return (
    <View
      onSubmit={onSubmit}
      form={form}
      saving={saving}
      scrolledToTop={scrolledToTop}
      datedMessages={datedMessages}
      userId={userId}
      loadMore={loadMore}
      deleteConfirm={deleteConfirm}
      deleteRights={deleteRights}
      // ref={ref}
    />
  );
};

export default ViewMessages;
