import React from 'react';
import type { Age, Build, Gender, Race } from 'graphql/generated';

import View from './AddExistingOffender.view';
import useAddExistingOffender from './useAddExistingOffender';

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
  lastActive:
    | { id: string; dayTime?: string | null | undefined }
    | null
    | undefined;
}

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
}

const AddExistingOffender = ({
  onClose,
  update,
  offenderIds,
}: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    selectedOffender,
    openLightbox,
    lightBoxOpen,
    age,
    build,
    ethnicity,
    setAge,
    setBuild,
    setEthnicity,
    setSex,
    sex,
    pagination,
    hair,
    peculiarities,
    setHair,
    setPeculiarities,
    clearFilters,
  } = useAddExistingOffender({ onClose, update, offenderIds });

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      onSubmit={onSubmit}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onPaginationChange={onPaginationChange}
      setCurrentId={setCurrentId}
      selectedOffender={selectedOffender}
      age={age}
      build={build}
      ethnicity={ethnicity}
      setAge={setAge}
      setBuild={setBuild}
      setEthnicity={setEthnicity}
      setSex={setSex}
      sex={sex}
      pagination={pagination}
      hair={hair}
      peculiarities={peculiarities}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      clearFilters={clearFilters}
    />
  );
};

export default AddExistingOffender;
