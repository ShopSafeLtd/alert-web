import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteChatMutation } from 'graphql/chat/mutation/__generated__/delete_chat.generated';

import React from 'react';

import View from './ViewMessage.view';
import useViewMessages from './useViewMessage';

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
}
const ViewMessages = ({ chatId, updateUserChatList }: Props): JSX.Element => {
  const {
    adminRights,
    articlesData,
    beforeUpload,
    chatData,
    crimeGroupsData,
    data,
    deleteChatConfirm,
    deleteImageConfirm,
    deleteIncidentConfirm,
    deleteMessageConfirm,
    deleteOffenderConfirm,
    fileList,
    form,
    imgChange,
    incidentsData,
    inputStr,
    linkArticle,
    linkCrimeGroup,
    linkIncident,
    linkOffender,
    linkVehicle,
    manageChat,
    membersData,
    messageSent,
    offendersData,
    onPreview,
    onSubmit,
    removeArticle,
    removeCrimeGroup,
    removeImage,
    removeIncident,
    removeOffender,
    removeVehicle,
    restrictIncidentAccess,
    saving,
    scrolledToTop,
    setInputStr,
    setMentionedUser,
    setMessageSent,
    showPicker,
    toggleLinkArticle,
    toggleLinkCrimeGroup,
    toggleLinkIncident,
    toggleLinkOffender,
    toggleLinkVehicle,
    toggleManageChat,
    toggleShowPicker,
    totalChats,
    updateArticleList,
    updateCrimeGroupList,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    userId,
    vehiclesData,
  } = useViewMessages({ chatId, updateUserChatList });

  return (
    <View
      adminRights={adminRights}
      articlesData={articlesData}
      beforeUpload={beforeUpload}
      chatData={chatData}
      chatId={chatId}
      crimeGroupsData={crimeGroupsData}
      data={data}
      deleteChatConfirm={deleteChatConfirm}
      deleteImageConfirm={deleteImageConfirm}
      deleteIncidentConfirm={deleteIncidentConfirm}
      deleteMessageConfirm={deleteMessageConfirm}
      deleteOffenderConfirm={deleteOffenderConfirm}
      fileList={fileList}
      form={form}
      imgChange={imgChange}
      incidentsData={incidentsData}
      inputStr={inputStr}
      linkArticle={linkArticle}
      linkCrimeGroup={linkCrimeGroup}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      linkVehicle={linkVehicle}
      manageChat={manageChat}
      membersData={membersData}
      messageSent={messageSent}
      offendersData={offendersData}
      onPreview={onPreview}
      onSubmit={onSubmit}
      removeArticle={removeArticle}
      removeCrimeGroup={removeCrimeGroup}
      removeImage={removeImage}
      removeIncident={removeIncident}
      removeOffender={removeOffender}
      removeVehicle={removeVehicle}
      restrictIncidentAccess={restrictIncidentAccess}
      saving={saving}
      scrolledToTop={scrolledToTop}
      setInputStr={setInputStr}
      setMentionedUser={setMentionedUser}
      setMessageSent={setMessageSent}
      showPicker={showPicker}
      toggleLinkArticle={toggleLinkArticle}
      toggleLinkCrimeGroup={toggleLinkCrimeGroup}
      toggleLinkIncident={toggleLinkIncident}
      toggleLinkOffender={toggleLinkOffender}
      toggleLinkVehicle={toggleLinkVehicle}
      toggleManageChat={toggleManageChat}
      toggleShowPicker={toggleShowPicker}
      totalChats={totalChats}
      updateArticleList={updateArticleList}
      updateCrimeGroupList={updateCrimeGroupList}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      updateVehicleList={updateVehicleList}
      userId={userId}
      vehiclesData={vehiclesData}
    />
  );
};

export default ViewMessages;
