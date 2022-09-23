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
    data,
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
    membersData,
    inputStr,
    setInputStr,
    showPicker,
    toggleShowPicker,
    imgChange,
    onPreview,
    beforeUpload,
    fileList,
  } = useViewMessages({ chatId, updateUserChatList });

  return (
    <View
      onSubmit={onSubmit}
      data={data}
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
      membersData={membersData}
      inputStr={inputStr}
      setInputStr={setInputStr}
      showPicker={showPicker}
      toggleShowPicker={toggleShowPicker}
      imgChange={imgChange}
      onPreview={onPreview}
      beforeUpload={beforeUpload}
      fileList={fileList}
    />
  );
};

export default ViewMessages;
