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
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  subscribed: boolean;
}

const UpdateBar = ({
  replyTo,
  offenderId,
  incidentId,
  setReplyTo,
  subscribed,
}: Props) => {
  const {
    beforeUpdateImageUpload,
    onSubmitUpdate,
    onUpdateImageChange,
    onUpdateImagePreview,
    removeUpdateImage,
    removeUpdateIncident,
    removeUpdateOffender,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleShowUpdatePicker,
    updateFileList,
    updateForm,
    updateIncidents,
    updateInput,
    updateIncidentList,
    updateOffendersList,
    linkIncident,
    linkOffender,
    updateOffenders,
  } = useUpdateBar({
    replyTo,
    incidentId,
    setReplyTo,
    subscribed,
    offenderId,
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
      schemeUsers={schemeUsers}
      setMentionedUser={setMentionedUser}
      setUpdateInput={setUpdateInput}
      showUpdatePicker={showUpdatePicker}
      toggleLinkUpdateIncident={toggleLinkUpdateIncident}
      toggleLinkUpdateOffender={toggleLinkUpdateOffender}
      toggleShowUpdatePicker={toggleShowUpdatePicker}
      updateFileList={updateFileList}
      updateForm={updateForm}
      updateIncidents={updateIncidents}
      updateInput={updateInput}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      updateOffenders={updateOffenders}
    />
  );
};

export default UpdateBar;
