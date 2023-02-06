import React from 'react';
import { Age, Build, Gender, Race } from 'graphql/generated';

import View from './AddExisitingOffender.view';
import useAddExisitingOffender from './useAddExisitingOffender';

export interface OffenderData {
  id: string;
  updatedAt?: Date;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
  tags: {
    id: string;
    name: string;
  }[];
  lastActive: {
    id: string | undefined | null;
    dayTime?: string | undefined | null;
  } | null;
}

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
}

const AddExisitingOffender = ({
  onClose,
  update,
  offenderIds,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    selectedOffender,
    openLightbox,
    lightBoxOpen,
  } = useAddExisitingOffender({ onClose, update, offenderIds });

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      setCurrentId={setCurrentId}
      selectedOffender={selectedOffender}
    />
  );
};

export default AddExisitingOffender;
