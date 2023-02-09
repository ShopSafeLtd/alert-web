import React from 'react';
import { ListIncidentsQuery, RecycleIncidentMutation } from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
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
  const { approvalRights, deleteRights, menuRights, onNavigate, onDelete } =
    useIncidentCard({
      createdById: incident?.createdBy.id,
      update,
    });

  return (
    <View
      approvalRights={approvalRights}
      deleteRights={deleteRights}
      menuRights={menuRights}
      incident={incident}
      openLightbox={openLightbox}
      onNavigate={onNavigate}
      onDelete={onDelete}
    />
  );
};

export default IncidentCard;
