import React from 'react';
import View from './DiscImport.view';
import useDiscImport from './useDiscImport';

const DiscImport = () => {
  const {
    knownSubjects,
    members,
    onKnownSubjectFileLoaded,
    onMembersFileLoaded,
    idSought,
    onIDSoughtFileLoaded,
    incidents,
    onIncidentFileLoaded,
    onGenerateData,
    newBusinesses,
    onDeleteNewBusiness,
    newOffenders,
    fileList,
    handleFileListChange,
    images,
    newUsers,
    groupsData,
    idSoughtModalOpen,
    imageModalOpen,
    incidentModalOpen,
    knownSubjectModalOpen,
    memberModalOpen,
    toggleIdSoughtModal,
    toggleImageModal,
    toggleIncidentModal,
    toggleKnownSubjectModal,
    toggleMemberModal,
    generating,
    tagData,
    newIncidents,
    activeTags,
    onSubmit,
    onUpdateOffender,
    onUpdateIncident,
    onUpdateBusiness,
    onUpdateUser,
    mappingForm,
    areas,
    galleries,
    currentStep,
    onStepChange,
  } = useDiscImport();

  return (
    <View
      knownSubjects={knownSubjects}
      members={members}
      onKnownSubjectFileLoaded={onKnownSubjectFileLoaded}
      onMembersFileLoaded={onMembersFileLoaded}
      idSought={idSought}
      onIDSoughtFileLoaded={onIDSoughtFileLoaded}
      incidents={incidents}
      onIncidentFileLoaded={onIncidentFileLoaded}
      onGenerateData={onGenerateData}
      newBusinesses={newBusinesses}
      onDeleteNewBusiness={onDeleteNewBusiness}
      newOffenders={newOffenders}
      fileList={fileList}
      handleFileListChange={handleFileListChange}
      images={images}
      newUsers={newUsers}
      groupsData={groupsData}
      idSoughtModalOpen={idSoughtModalOpen}
      imageModalOpen={imageModalOpen}
      incidentModalOpen={incidentModalOpen}
      knownSubjectModalOpen={knownSubjectModalOpen}
      memberModalOpen={memberModalOpen}
      toggleIdSoughtModal={toggleIdSoughtModal}
      toggleImageModal={toggleImageModal}
      toggleIncidentModal={toggleIncidentModal}
      toggleKnownSubjectModal={toggleKnownSubjectModal}
      toggleMemberModal={toggleMemberModal}
      generating={generating}
      tagData={tagData}
      newIncidents={newIncidents}
      activeTags={activeTags}
      onSubmit={onSubmit}
      onUpdateOffender={onUpdateOffender}
      onUpdateIncident={onUpdateIncident}
      onUpdateBusiness={onUpdateBusiness}
      onUpdateUser={onUpdateUser}
      mappingForm={mappingForm}
      areas={areas}
      galleries={galleries}
      currentStep={currentStep}
      onStepChange={onStepChange}
    />
  );
};

export default DiscImport;
