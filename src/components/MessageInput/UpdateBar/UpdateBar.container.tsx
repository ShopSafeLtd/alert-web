import React from 'react';
import View from './UpdateBar.view';
import useUpdateBar from './useUpdateBar';

interface Props {
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  incidentId?: string;
  offenderId?: string;
  investigationId?: string;
  vehicleId?: string;
  crimeGroupId?: string;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  subscribed: boolean;
  setOptionRowShow?: (value: boolean) => void;
}

const UpdateBar = ({
  replyTo,
  offenderId,
  incidentId,
  investigationId,
  vehicleId,
  crimeGroupId,
  setReplyTo,
  subscribed,
  setOptionRowShow,
}: Props) => {
  const {
    beforeUpdateImageUpload,
    onSubmitUpdate,
    onUpdateImageChange,
    onUpdateImagePreview,
    removeUpdateImage,
    removeUpdateIncident,
    removeUpdateOffender,
    removeCrimeGroup,
    removeVehicle,
    removeArticle,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleShowUpdatePicker,
    toggleLinkVehicle,
    toggleLinkCrimeGroup,
    toggleLinkArticle,
    updateFileList,
    updateForm,
    updateIncidents,
    updateInput,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    updateCrimeGroupList,
    updateArticleList,
    linkIncident,
    linkOffender,
    linkVehicle,
    linkCrimeGroup,
    linkArticle,
    updateOffenders,
    crimeGroupsData,
    vehiclesData,
    articlesData,
    saving,
    handleMarkAsRead,
    hideIncident,
    adminRights,
  } = useUpdateBar({
    replyTo,
    incidentId,
    setReplyTo,
    subscribed,
    offenderId,
    investigationId,
    setOptionRowShow,
    vehicleId,
    crimeGroupId,
  });

  return (
    <View
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      beforeUpdateImageUpload={beforeUpdateImageUpload}
      onSubmitUpdate={onSubmitUpdate}
      onUpdateImageChange={onUpdateImageChange}
      onUpdateImagePreview={onUpdateImagePreview}
      removeUpdateImage={removeUpdateImage}
      removeUpdateIncident={removeUpdateIncident}
      removeUpdateOffender={removeUpdateOffender}
      removeCrimeGroup={removeCrimeGroup}
      removeVehicle={removeVehicle}
      removeArticle={removeArticle}
      schemeUsers={schemeUsers}
      setMentionedUser={setMentionedUser}
      setUpdateInput={setUpdateInput}
      showUpdatePicker={showUpdatePicker}
      toggleLinkUpdateIncident={toggleLinkUpdateIncident}
      toggleLinkUpdateOffender={toggleLinkUpdateOffender}
      toggleShowUpdatePicker={toggleShowUpdatePicker}
      toggleLinkVehicle={toggleLinkVehicle}
      toggleLinkCrimeGroup={toggleLinkCrimeGroup}
      toggleLinkArticle={toggleLinkArticle}
      updateFileList={updateFileList}
      updateForm={updateForm}
      updateIncidents={updateIncidents}
      updateInput={updateInput}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      updateVehicleList={updateVehicleList}
      updateCrimeGroupList={updateCrimeGroupList}
      updateArticleList={updateArticleList}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      linkVehicle={linkVehicle}
      linkCrimeGroup={linkCrimeGroup}
      linkArticle={linkArticle}
      updateOffenders={updateOffenders}
      crimeGroupsData={crimeGroupsData}
      vehiclesData={vehiclesData}
      articlesData={articlesData}
      saving={saving}
      adminRights={adminRights}
      handleMarkAsRead={handleMarkAsRead}
      hideIncident={hideIncident}
    />
  );
};

export default UpdateBar;
