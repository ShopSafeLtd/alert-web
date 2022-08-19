import React from 'react';

import View from './ViewChat.view';
import useViewOffender from './useViewChat';

const ViewOffender = (): JSX.Element => {
  const {
    // data,
    loading,
    // saving,
    currentId,
    onChangeId,
    // subscribeToNewMessage,
  } = useViewOffender();

  return (
    <View
      // data={data}
      loading={loading}
      // saving={saving}
      currentId={currentId}
      onChangeId={onChangeId}
      // subscribeToNewMessage={subscribeToNewMessage}
    />
  );
};

export default ViewOffender;
