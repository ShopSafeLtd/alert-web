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
    // data,
    saving,
    loading,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
    ref,
  } = useViewMessages({ chatId });

  console.log(datedMessages);

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
      ref={ref}
    />
  );
};

export default ViewMessages;
