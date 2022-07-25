import React from 'react';
import { ListOffendersQuery, RecycleOffenderMutation } from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
import View from './OffenderCard.view';
import useOffenderCard from './useOffenderCard';

interface Props {
  offender: Exclude<
    ListOffendersQuery['listOffenders'],
    undefined | null
  >['offenders'][0];
  openLightbox: (elements: { src: string }[], index: number) => void;
  update: MutationUpdaterFn<RecycleOffenderMutation>;
}

const OffenderCard = ({ offender, openLightbox, update }: Props) => {
  const { approvalRights, deleteRights, menuRights, onNavigate, onDelete } =
    useOffenderCard({
      createdById: offender.createdBy.id,
      update,
    });

  return (
    <View
      approvalRights={approvalRights}
      deleteRights={deleteRights}
      menuRights={menuRights}
      offender={offender}
      openLightbox={openLightbox}
      onNavigate={onNavigate}
      onDelete={onDelete}
    />
  );
};

export default OffenderCard;
