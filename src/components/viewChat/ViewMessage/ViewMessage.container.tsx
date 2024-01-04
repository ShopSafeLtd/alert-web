import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteChatMutation } from 'graphql/generated';
import View from './ViewMessage.view';
import useViewMessages from './useViewMessage';

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
}
const ViewMessages = ({ chatId, updateUserChatList }: Props): JSX.Element => {
  const {
    onSubmit,
    chatData,
    form,
    totalChats,
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
    crimeGroupsData,
    vehiclesData,
    linkIncident,
    linkOffender,
    linkVehicle,
    linkCrimeGroup,
    toggleLinkIncident,
    toggleLinkOffender,
    toggleLinkVehicle,
    toggleLinkCrimeGroup,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    updateCrimeGroupList,
    removeOffender,
    removeIncident,
    removeImage,
    removeCrimeGroup,
    removeVehicle,
    setMentionedUser,
    deleteImageConfirm,
    deleteOffenderConfirm,
    deleteIncidentConfirm,
    data,
    messageSent,
    setMessageSent,
    restrictIncidentAccess,
    articlesData,
    linkArticle,
    toggleLinkArticle,
    updateArticleList,
    removeArticle,
  } = useViewMessages({ chatId, updateUserChatList });

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
      crimeGroupsData={crimeGroupsData}
      vehiclesData={vehiclesData}
      linkVehicle={linkVehicle}
      linkCrimeGroup={linkCrimeGroup}
      toggleLinkVehicle={toggleLinkVehicle}
      toggleLinkCrimeGroup={toggleLinkCrimeGroup}
      updateVehicleList={updateVehicleList}
      updateCrimeGroupList={updateCrimeGroupList}
      removeOffender={removeOffender}
      removeIncident={removeIncident}
      removeCrimeGroup={removeCrimeGroup}
      removeVehicle={removeVehicle}
      removeImage={removeImage}
      setMentionedUser={setMentionedUser}
      deleteImageConfirm={deleteImageConfirm}
      deleteOffenderConfirm={deleteOffenderConfirm}
      deleteIncidentConfirm={deleteIncidentConfirm}
      messageSent={messageSent}
      setMessageSent={setMessageSent}
      totalChats={totalChats}
      restrictIncidentAccess={restrictIncidentAccess}
      articlesData={articlesData}
      linkArticle={linkArticle}
      toggleLinkArticle={toggleLinkArticle}
      updateArticleList={updateArticleList}
      removeArticle={removeArticle}
    />
  );
};

export default ViewMessages;
