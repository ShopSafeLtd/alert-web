import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewChat.view';
import useViewOffender from './useViewChat';

const ViewOffender = (): JSX.Element => {
  const chatId = useParams().id;
  const { data, loading, saving, handleMarkAsRead, currentId } =
    useViewOffender();

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      chatId={chatId || currentId}
      handleMarkAsRead={handleMarkAsRead}
    />
  );
};

export default ViewOffender;
