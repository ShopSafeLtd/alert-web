import React from 'react';
import View from './ViewMessage.view';
import useViewMessages from './useViewMessage';

interface Props {
  chatId: string;
}
const ViewMessges = ({ chatId }: Props): JSX.Element => {
  const {
    onSubmit,
    form,
    // data,
    saving,
    loading,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
  } = useViewMessages({ chatId });

  return (
    <View
      onSubmit={onSubmit}
      form={form}
      // data={data}
      loading={loading}
      saving={saving}
      scrolledToTop={scrolledToTop}
      datedMessages={datedMessages}
      userId={userId}
      loadMore={loadMore}
    />
  );
};

export default ViewMessges;
