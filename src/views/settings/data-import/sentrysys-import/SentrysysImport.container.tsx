import React from 'react';

import View from './SentrysysImport.view';
import useSentrysysImport from './useSentrysysImport';

const DiscImport = () => {
  const {
    currentStep,
    fileList,
    generating,
    goodsData,
    groupsData,
    handleFileListChange,
    imageModalOpen,
    images,
    incidentItems,
    incidentModalOpen,
    incidentTypes,
    incidents,
    mappingForm,
    memberModalOpen,
    members,
    newBusinesses,
    newIncidents,
    newOffenders,
    newUsers,
    onDeleteNewBusiness,
    onGenerateData,
    onIncidentFileLoaded,
    onMembersFileLoaded,
    onProfileFileLoaded,
    onStepChange,
    onSubmit,
    onUpdateBusiness,
    onUpdateIncident,
    onUpdateOffender,
    onUpdateUser,
    onVehicleFileLoaded,
    profileModalOpen,
    profiles,
    tagData,
    toggleImageModal,
    toggleIncidentModal,
    toggleMemberModal,
    toggleProfileModal,
    toggleVehicleModal,
    vehicleModalOpen,
    vehicles,
  } = useSentrysysImport();

  return (
    <View
      currentStep={currentStep}
      fileList={fileList}
      generating={generating}
      goodsData={goodsData}
      groupsData={groupsData}
      handleFileListChange={handleFileListChange}
      imageModalOpen={imageModalOpen}
      images={images}
      incidentItems={incidentItems}
      incidentModalOpen={incidentModalOpen}
      incidentTypes={incidentTypes}
      incidents={incidents}
      mappingForm={mappingForm}
      memberModalOpen={memberModalOpen}
      members={members}
      newBusinesses={newBusinesses}
      newIncidents={newIncidents}
      newOffenders={newOffenders}
      newUsers={newUsers}
      onDeleteNewBusiness={onDeleteNewBusiness}
      onGenerateData={onGenerateData}
      onIncidentFileLoaded={onIncidentFileLoaded}
      onMembersFileLoaded={onMembersFileLoaded}
      onProfileFileLoaded={onProfileFileLoaded}
      onStepChange={onStepChange}
      onSubmit={onSubmit}
      onUpdateBusiness={onUpdateBusiness}
      onUpdateIncident={onUpdateIncident}
      onUpdateOffender={onUpdateOffender}
      onUpdateUser={onUpdateUser}
      onVehicleFileLoaded={onVehicleFileLoaded}
      profileModalOpen={profileModalOpen}
      profiles={profiles}
      tagData={tagData}
      toggleImageModal={toggleImageModal}
      toggleIncidentModal={toggleIncidentModal}
      toggleMemberModal={toggleMemberModal}
      toggleProfileModal={toggleProfileModal}
      toggleVehicleModal={toggleVehicleModal}
      vehicleModalOpen={vehicleModalOpen}
      vehicles={vehicles}
    />
  );
};

export default DiscImport;
