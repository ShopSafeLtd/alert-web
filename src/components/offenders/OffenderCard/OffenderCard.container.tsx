import React from 'react';

import type { MutationUpdaterFn } from '@apollo/client';
import View from './OffenderCard.view';
import useOffenderCard from './useOffenderCard';
import type { RecycleOffenderMutation } from 'graphql/offenders/mutations/recycle-offender.generated';
import type { OffenderCardFragment } from 'graphql/fragments/offender-card.generated';

interface Props {
  offender: OffenderCardFragment;
  openLightbox: (elements: { src: string }[], index: number) => void;
  update?: MutationUpdaterFn<RecycleOffenderMutation>;
  isArticle?: boolean;
  compactView?: boolean;
}

const OffenderCard = ({
  offender,
  openLightbox,
  update,
  isArticle,
  compactView,
}: Props): JSX.Element => {
  const {
    approvalRights,
    deleteRights,
    menuRights,
    onDelete,
    editOffenderFeed,
    toggleEditOffenderFeed,
    editImage,
    toggleEditImage,
    editImageId,
    setEditImageId,
    onEditImage,
    onNavigate,
    addInvestigation,
    toggleAddInvestigation,
    knowOffender,
    toggleKnowOffender,
  } = useOffenderCard({
    offender,
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
      onDelete={onDelete}
      editOffenderFeed={editOffenderFeed}
      toggleEditOffenderFeed={toggleEditOffenderFeed}
      editImage={editImage}
      toggleEditImage={toggleEditImage}
      editImageId={editImageId}
      setEditImageId={setEditImageId}
      onEditImage={onEditImage}
      onNavigate={onNavigate}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      compactView={compactView || false}
      knowOffender={knowOffender}
      toggleKnowOffender={toggleKnowOffender}
    />
  );
};

export default OffenderCard;
