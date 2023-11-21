import React from 'react';
import type {
  IncidentCardFragment,
  RecycleIncidentMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './IncidentCard.view';
import useIncidentCard from './useIncidentCard';

interface Props {
  incident: IncidentCardFragment;
  openLightbox: (elements: { src: string }[], index: number) => void;
  update?: MutationUpdaterFn<RecycleIncidentMutation>;
  compactView?: boolean;
}

const IncidentCard = ({
  incident,
  openLightbox,
  update,
  compactView,
}: Props): JSX.Element => {
  const {
    approvalRights,
    deleteRights,
    menuRights,
    editIncidentFeed,
    toggleEditIncidentFeed,
    onDelete,
    editImage,
    toggleEditImage,
    editImageId,
    setEditImageId,
    onEditImage,
    addInvestigation,
    toggleAddInvestigation,
  } = useIncidentCard({
    incident,
    update,
  });

  return (
    <View
      approvalRights={approvalRights}
      deleteRights={deleteRights}
      menuRights={menuRights}
      incident={incident}
      openLightbox={openLightbox}
      onDelete={onDelete}
      editIncidentFeed={editIncidentFeed}
      toggleEditIncidentFeed={toggleEditIncidentFeed}
      editImage={editImage}
      toggleEditImage={toggleEditImage}
      editImageId={editImageId}
      setEditImageId={setEditImageId}
      onEditImage={onEditImage}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      compactView={compactView || false}
    />
  );
};

export default IncidentCard;
