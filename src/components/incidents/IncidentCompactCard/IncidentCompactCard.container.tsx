import type { MutationUpdaterFn } from '@apollo/client';
import type { IncidentCardFragment } from 'graphql/fragments/__generated__/incident-card.generated';
import type { RecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';

import React from 'react';

import View from './IncidentCompactCard.view';
import useIncidentCard from './useIncidentCompactCard';

interface Props {
  incident: IncidentCardFragment;
  openLightbox: (elements: { src: string }[], index: number) => void;
  update?: MutationUpdaterFn<RecycleIncidentMutation>;
}

const IncidentCard = ({
  incident,
  openLightbox,
  update,
}: Props): JSX.Element => {
  const {
    addInvestigation,
    approvalRights,
    editImage,
    editImageId,
    editIncidentFeed,
    onDelete,
    onEditImage,
    setEditImageId,
    toggleAddInvestigation,
    toggleEditImage,
    toggleEditIncidentFeed,
  } = useIncidentCard({
    incident,
    update,
  });

  return (
    <View
      addInvestigation={addInvestigation}
      approvalRights={approvalRights}
      editImage={editImage}
      editImageId={editImageId}
      editIncidentFeed={editIncidentFeed}
      incident={incident}
      onDelete={onDelete}
      onEditImage={onEditImage}
      openLightbox={openLightbox}
      setEditImageId={setEditImageId}
      toggleAddInvestigation={toggleAddInvestigation}
      toggleEditImage={toggleEditImage}
      toggleEditIncidentFeed={toggleEditIncidentFeed}
    />
  );
};

export default IncidentCard;
