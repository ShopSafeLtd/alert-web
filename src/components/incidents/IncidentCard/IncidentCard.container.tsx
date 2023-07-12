import React from 'react';
import type {
  ListIncidentsQuery,
  RecycleIncidentMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './IncidentCard.view';
import useIncidentCard from './useIncidentCard';

interface Props {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    undefined | null
  >['incidents'][0];
  openLightbox: (elements: { src: string }[], index: number) => void;
  update?: MutationUpdaterFn<RecycleIncidentMutation>;
}

const IncidentCard = ({
  incident,
  openLightbox,
  update,
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
    />
  );
};

export default IncidentCard;
