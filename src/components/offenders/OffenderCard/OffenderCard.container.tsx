import type { MutationUpdaterFn } from '@apollo/client';
import type { OffenderCardFragment } from 'graphql/fragments/__generated__/offender-card.generated';
import type { RecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';

import React from 'react';

import View from './OffenderCard.view';
import useOffenderCard from './useOffenderCard';

interface Props {
  compactView?: boolean;
  isArticle?: boolean;
  offender: OffenderCardFragment;
  openLightbox: (elements: { src: string }[], index: number) => void;
  update?: MutationUpdaterFn<RecycleOffenderMutation>;
}

const OffenderCard = ({
  compactView,
  isArticle,
  offender,
  openLightbox,
  update,
}: Props): JSX.Element => {
  const {
    addInvestigation,
    approvalRights,
    deleteRights,
    editImage,
    editImageId,
    editOffenderFeed,
    knowOffender,
    menuRights,
    onDelete,
    onEditImage,
    onNavigate,
    setEditImageId,
    toggleAddInvestigation,
    toggleEditImage,
    toggleEditOffenderFeed,
    toggleKnowOffender,
  } = useOffenderCard({
    offender,
    update,
  });

  return (
    <View
      addInvestigation={addInvestigation}
      approvalRights={approvalRights}
      compactView={compactView || false}
      deleteRights={deleteRights}
      editImage={editImage}
      editImageId={editImageId}
      editOffenderFeed={editOffenderFeed}
      isArticle={isArticle}
      knowOffender={knowOffender}
      menuRights={menuRights}
      offender={offender}
      onDelete={onDelete}
      onEditImage={onEditImage}
      onNavigate={onNavigate}
      openLightbox={openLightbox}
      setEditImageId={setEditImageId}
      toggleAddInvestigation={toggleAddInvestigation}
      toggleEditImage={toggleEditImage}
      toggleEditOffenderFeed={toggleEditOffenderFeed}
      toggleKnowOffender={toggleKnowOffender}
    />
  );
};

export default OffenderCard;
