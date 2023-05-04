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
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleShowUpdatePicker,
    toggleLinkVehicle,
    toggleLinkCrimeGroup,
    updateFileList,
    updateForm,
    updateIncidents,
    updateInput,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    updateCrimeGroupList,
    linkIncident,
    linkOffender,
    linkVehicle,
    linkCrimeGroup,
    updateOffenders,
    crimeGroupsData,
    vehiclesData,
    saving,
    handleMarkAsRead,
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
      beforeUpdateImageUpload={beforeUpdateImageUpload}
      onSubmitUpdate={onSubmitUpdate}
      onUpdateImageChange={onUpdateImageChange}
      onUpdateImagePreview={onUpdateImagePreview}
      removeUpdateImage={removeUpdateImage}
      removeUpdateIncident={removeUpdateIncident}
      removeUpdateOffender={removeUpdateOffender}
      removeCrimeGroup={removeCrimeGroup}
      removeVehicle={removeVehicle}
      schemeUsers={schemeUsers}
      setMentionedUser={setMentionedUser}
      setUpdateInput={setUpdateInput}
      showUpdatePicker={showUpdatePicker}
      toggleLinkUpdateIncident={toggleLinkUpdateIncident}
      toggleLinkUpdateOffender={toggleLinkUpdateOffender}
      toggleShowUpdatePicker={toggleShowUpdatePicker}
      toggleLinkVehicle={toggleLinkVehicle}
      toggleLinkCrimeGroup={toggleLinkCrimeGroup}
      updateFileList={updateFileList}
      updateForm={updateForm}
      updateIncidents={updateIncidents}
      updateInput={updateInput}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      updateVehicleList={updateVehicleList}
      updateCrimeGroupList={updateCrimeGroupList}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      linkVehicle={linkVehicle}
      linkCrimeGroup={linkCrimeGroup}
      updateOffenders={updateOffenders}
      crimeGroupsData={crimeGroupsData}
      vehiclesData={vehiclesData}
      saving={saving}
      handleMarkAsRead={handleMarkAsRead}
    />
  );
};

export default UpdateBar;
