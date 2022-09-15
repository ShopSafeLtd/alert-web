import React from 'react';
import { MutationUpdaterFn } from '@apollo/client';
import { DeleteChatMutation } from 'graphql/generated';
import View from './ViewMessage.view';
import useViewMessages from './useViewMessage';

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
}
const ViewMessages = ({ chatId, updateUserChatList }: Props): JSX.Element => {
  const {
    onSubmit,
    loading,
    chatData,
    form,
    saving,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
    deleteMessageConfirm,
    adminRights,
    deleteChatConfirm,
    manageChat,
    toggleManageChat,
    // ref,
  } = useViewMessages({ chatId, updateUserChatList });

  return (
    <View
      onSubmit={onSubmit}
      loading={loading}
      chatData={chatData}
      form={form}
      saving={saving}
      scrolledToTop={scrolledToTop}
      datedMessages={datedMessages}
      userId={userId}
      loadMore={loadMore}
      deleteMessageConfirm={deleteMessageConfirm}
      adminRights={adminRights}
      deleteChatConfirm={deleteChatConfirm}
      manageChat={manageChat}
      toggleManageChat={toggleManageChat}
      chatId={chatId}
      // ref={ref}
    />
  );
};

export default ViewMessages;
