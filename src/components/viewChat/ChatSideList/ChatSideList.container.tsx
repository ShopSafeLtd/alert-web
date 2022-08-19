import React from 'react';
import View from './ChatSideList.view';
import useChatSideList from './useChatSideList';

interface Props {
  onChangeId: (id: string) => void;
  currentId: string;
}

const ChatSideList = ({ onChangeId, currentId }: Props): JSX.Element => {
  const { data, loading, saving, handleMarkAsRead } = useChatSideList({
    onChangeId,
  });

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      currentId={currentId}
      handleMarkAsRead={handleMarkAsRead}
    />
  );
};

export default ChatSideList;
