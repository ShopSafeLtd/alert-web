import React from 'react';

import View from './DiscImport.view';
import useDiscImport from './useDiscImport';

const DiscImport = () => {
  const {
    activeTags,
    areas,
    currentStep,
    fileList,
    galleries,
    generating,
    groupsData,
    handleFileListChange,
    idSought,
    idSoughtModalOpen,
    imageModalOpen,
    images,
    incidentModalOpen,
    incidents,
    knownSubjectModalOpen,
    knownSubjects,
    mappingForm,
    memberModalOpen,
    members,
    newBusinesses,
    newIncidents,
    newOffenders,
    newUsers,
    onDeleteNewBusiness,
    onGenerateData,
    onIDSoughtFileLoaded,
    onIncidentFileLoaded,
    onKnownSubjectFileLoaded,
    onMembersFileLoaded,
    onStepChange,
    onSubmit,
    onUpdateBusiness,
    onUpdateIncident,
    onUpdateOffender,
    onUpdateUser,
    tagData,
    toggleIdSoughtModal,
    toggleImageModal,
    toggleIncidentModal,
    toggleKnownSubjectModal,
    toggleMemberModal,
  } = useDiscImport();

  return (
    <View
      activeTags={activeTags}
      areas={areas}
      currentStep={currentStep}
      fileList={fileList}
      galleries={galleries}
      generating={generating}
      groupsData={groupsData}
      handleFileListChange={handleFileListChange}
      idSought={idSought}
      idSoughtModalOpen={idSoughtModalOpen}
      imageModalOpen={imageModalOpen}
      images={images}
      incidentModalOpen={incidentModalOpen}
      incidents={incidents}
      knownSubjectModalOpen={knownSubjectModalOpen}
      knownSubjects={knownSubjects}
      mappingForm={mappingForm}
      memberModalOpen={memberModalOpen}
      members={members}
      newBusinesses={newBusinesses}
      newIncidents={newIncidents}
      newOffenders={newOffenders}
      newUsers={newUsers}
      onDeleteNewBusiness={onDeleteNewBusiness}
      onGenerateData={onGenerateData}
      onIDSoughtFileLoaded={onIDSoughtFileLoaded}
      onIncidentFileLoaded={onIncidentFileLoaded}
      onKnownSubjectFileLoaded={onKnownSubjectFileLoaded}
      onMembersFileLoaded={onMembersFileLoaded}
      onStepChange={onStepChange}
      onSubmit={onSubmit}
      onUpdateBusiness={onUpdateBusiness}
      onUpdateIncident={onUpdateIncident}
      onUpdateOffender={onUpdateOffender}
      onUpdateUser={onUpdateUser}
      tagData={tagData}
      toggleIdSoughtModal={toggleIdSoughtModal}
      toggleImageModal={toggleImageModal}
      toggleIncidentModal={toggleIncidentModal}
      toggleKnownSubjectModal={toggleKnownSubjectModal}
      toggleMemberModal={toggleMemberModal}
    />
  );
};

export default DiscImport;
