import React from 'react';
import { MutationUpdaterFn } from '@apollo/client';
import { DeleteChatMutation } from 'graphql/generated';
import View from './ViewMessage.view';
import useViewMessages from './useViewMessage';

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
  userChatRefetch: () => void;
}
const ViewMessages = ({
  chatId,
  updateUserChatList,
  userChatRefetch,
}: Props): JSX.Element => {
  const {
    onSubmit,
    chatData,
    form,
    saving,
    scrolledToTop,
    userId,
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
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
    removeImage,
    setMentionedUser,
    deleteImageConfirm,
    deleteOffenderConfirm,
    deleteIncidentConfirm,
    data,
    messageSent,
    setMessageSent
  } = useViewMessages({ chatId, updateUserChatList, userChatRefetch });

  return (
    <View
      data={data}
      onSubmit={onSubmit}
      chatData={chatData}
      form={form}
      saving={saving}
      scrolledToTop={scrolledToTop}
      userId={userId}
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
      offendersData={offendersData}
      incidentsData={incidentsData}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      toggleLinkIncident={toggleLinkIncident}
      toggleLinkOffender={toggleLinkOffender}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      removeOffender={removeOffender}
      removeIncident={removeIncident}
      removeImage={removeImage}
      setMentionedUser={setMentionedUser}
      deleteImageConfirm={deleteImageConfirm}
      deleteOffenderConfirm={deleteOffenderConfirm}
      deleteIncidentConfirm={deleteIncidentConfirm}
      messageSent={messageSent}
      setMessageSent={setMessageSent}
    />
  );
};

export default ViewMessages;
