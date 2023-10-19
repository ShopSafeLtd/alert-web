import React from 'react';
import type {
  OffenderCardFragment,
  RecycleOffenderMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './OffenderCard.view';
import useOffenderCard from './useOffenderCard';

interface Props {
  offender: OffenderCardFragment;
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
    />
  );
};

export default OffenderCard;
