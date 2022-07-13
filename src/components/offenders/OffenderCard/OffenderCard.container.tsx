import React from 'react';
import { ListOffendersQuery } from 'graphql/generated';
import View from './OffenderCard.view';
import useOffenderCard from './useOffenderCard';

interface Props {
  offender: Exclude<
    ListOffendersQuery['listOffenders'],
    undefined | null
  >['offenders'][0];
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const OffenderCard = ({ offender, openLightbox }: Props) => {
  const { approvalRights, deleteRights, menuRights, onDelete } =
    useOffenderCard({
      createdById: offender.createdBy.id,
    });

  return (
    <View
      approvalRights={approvalRights}
      deleteRights={deleteRights}
      menuRights={menuRights}
      offender={offender}
      openLightbox={openLightbox}
      onDelete={onDelete}
    />
  );
};

export default OffenderCard;
