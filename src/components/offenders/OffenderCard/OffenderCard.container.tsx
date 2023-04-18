import React from 'react';
import type {
  ListOffendersQuery,
  RecycleOffenderMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './OffenderCard.view';
import useOffenderCard from './useOffenderCard';

interface Props {
  offender: Exclude<
    ListOffendersQuery['listOffenders'],
    undefined | null
  >['offenders'][0];
  openLightbox: (elements: { src: string }[], index: number) => void;
  update?: MutationUpdaterFn<RecycleOffenderMutation>;
  isArticle?: boolean;
}

const OffenderCard = ({
  offender,
  openLightbox,
  update,
  isArticle,
}: Props): JSX.Element => {
  const { approvalRights, deleteRights, menuRights, onNavigate, onDelete } =
    useOffenderCard({
      createdById: offender.createdBy.id,
      update,
    });

  return (
    <View
      isArticle={isArticle}
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
