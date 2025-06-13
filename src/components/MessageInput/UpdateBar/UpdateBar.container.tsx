import React from 'react';

import View from './UpdateBar.view';
import useUpdateBar from './useUpdateBar';

interface Props {
  crimeGroupId?: string;
  incidentId?: string;
  investigationId?: string;
  offenderId?: string;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  setOptionRowShow?: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  subscribed: boolean;
  vehicleId?: string;
}

const UpdateBar = ({
  crimeGroupId,
  incidentId,
  investigationId,
  offenderId,
  replyTo,
  setOptionRowShow,
  setReplyTo,
  subscribed,
  vehicleId,
}: Props) => {
  const {
    articlesData,
    beforeUpdateImageUpload,
    crimeGroupsData,
    handleMarkAsRead,
    hideIncident,
    linkArticle,
    linkCrimeGroup,
    linkIncident,
    linkOffender,
    linkVehicle,
    loading,
    onSearch,
    onSubmitUpdate,
    onUpdateImageChange,
    onUpdateImagePreview,
    removeArticle,
    removeCrimeGroup,
    removeUpdateImage,
    removeUpdateIncident,
    removeUpdateOffender,
    removeVehicle,
    saving,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkArticle,
    toggleLinkCrimeGroup,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleLinkVehicle,
    toggleShowUpdatePicker,
    updateArticleList,
    updateCrimeGroupList,
    updateFileList,
    updateForm,
    updateIncidentList,
    updateIncidents,
    updateInput,
    updateOffenders,
    updateOffendersList,
    updateVehicleList,
    vehiclesData,
  } = useUpdateBar({
    crimeGroupId,
    incidentId,
    investigationId,
    offenderId,
    replyTo,
    setOptionRowShow,
    setReplyTo,
    subscribed,
    vehicleId,
  });

  return (
    <View
      articlesData={articlesData}
      beforeUpdateImageUpload={beforeUpdateImageUpload}
      crimeGroupsData={crimeGroupsData}
      handleMarkAsRead={handleMarkAsRead}
      hideIncident={hideIncident}
      linkArticle={linkArticle}
      linkCrimeGroup={linkCrimeGroup}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      linkVehicle={linkVehicle}
      loading={loading}
      onSearch={onSearch}
      onSubmitUpdate={onSubmitUpdate}
      onUpdateImageChange={onUpdateImageChange}
      onUpdateImagePreview={onUpdateImagePreview}
      removeArticle={removeArticle}
      removeCrimeGroup={removeCrimeGroup}
      removeUpdateImage={removeUpdateImage}
      removeUpdateIncident={removeUpdateIncident}
      removeUpdateOffender={removeUpdateOffender}
      removeVehicle={removeVehicle}
      replyTo={replyTo}
      saving={saving}
      schemeUsers={schemeUsers}
      setMentionedUser={setMentionedUser}
      setReplyTo={setReplyTo}
      setUpdateInput={setUpdateInput}
      showUpdatePicker={showUpdatePicker}
      toggleLinkArticle={toggleLinkArticle}
      toggleLinkCrimeGroup={toggleLinkCrimeGroup}
      toggleLinkUpdateIncident={toggleLinkUpdateIncident}
      toggleLinkUpdateOffender={toggleLinkUpdateOffender}
      toggleLinkVehicle={toggleLinkVehicle}
      toggleShowUpdatePicker={toggleShowUpdatePicker}
      updateArticleList={updateArticleList}
      updateCrimeGroupList={updateCrimeGroupList}
      updateFileList={updateFileList}
      updateForm={updateForm}
      updateIncidentList={updateIncidentList}
      updateIncidents={updateIncidents}
      updateInput={updateInput}
      updateOffenders={updateOffenders}
      updateOffendersList={updateOffendersList}
      updateVehicleList={updateVehicleList}
      vehiclesData={vehiclesData}
    />
  );
};

export default UpdateBar;
