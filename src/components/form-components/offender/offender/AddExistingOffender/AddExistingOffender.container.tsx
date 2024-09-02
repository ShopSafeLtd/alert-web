import type { Age, Build, Gender, ImagePosition, Race } from 'graphql/types';

import React from 'react';

import View from './AddExistingOffender.view';
import useAddExistingOffender from './useAddExistingOffender';

export interface OffenderData {
  age?: Age | null;
  approved?: boolean | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  hair?: null | string;
  id: string;
  imageUid?: string[] | undefined;
  images?: {
    fileName?: null | string;
    id: string;
    new?: boolean;
    optimised?: null | string;
    position: ImagePosition;
    rotation: number;
    type?: null | string;
    url?: null | string;
  }[];
  lastActive:
    | { dayTime?: null | string | undefined; id: string }
    | null
    | undefined;
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  tags: {
    id: string;
    name: string;
  }[];
  updatedAt?: Date;
}

interface Props {
  addOverride?: string;
  offenderIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update: (value: OffenderData) => void;
}

const AddExistingOffender = ({
  addOverride,
  offenderIds,
  onClose,
  takeAllSchemes,
  update,
}: Props): JSX.Element => {
  const {
    age,
    build,
    clearFilters,
    data,
    ethnicity,
    hair,
    lightBoxOpen,
    loading,
    onPaginationChange,
    onSubmit,
    openLightbox,
    pagination,
    peculiarities,
    search,
    selectedOffender,
    setAge,
    setBuild,
    setCurrentId,
    setEthnicity,
    setHair,
    setPeculiarities,
    setSearch,
    setSex,
    sex,
  } = useAddExistingOffender({ offenderIds, onClose, takeAllSchemes, update });

  return (
    <View
      addOverride={addOverride}
      age={age}
      build={build}
      clearFilters={clearFilters}
      data={data}
      ethnicity={ethnicity}
      hair={hair}
      lightBoxOpen={lightBoxOpen}
      loading={loading}
      onPaginationChange={onPaginationChange}
      onSubmit={onSubmit}
      openLightbox={openLightbox}
      pagination={pagination}
      peculiarities={peculiarities}
      search={search}
      selectedOffender={selectedOffender}
      setAge={setAge}
      setBuild={setBuild}
      setCurrentId={setCurrentId}
      setEthnicity={setEthnicity}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      setSearch={setSearch}
      setSex={setSex}
      sex={sex}
    />
  );
};

export default AddExistingOffender;
