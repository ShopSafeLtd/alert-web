import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';

import React from 'react';

import View from './AddExistingOffender.view';
import useAddExistingOffender from './useAddExistingOffender';

export interface OffenderData extends OffenderSearchDetailsFragment {}

// interface Props {
//   addOverride?: string;
//   offenderIds: string[] | undefined;
//   onClose: () => void;
//   takeAllSchemes?: boolean;
//   type: 'multiple' | 'single';
//   update: (
//     value: OffenderSearchDetailsFragment | OffenderSearchDetailsFragment[]
//   ) => void;
// }
//

interface SingleProps {
  type?: 'single'; // Make 'single' the default by making it optional
  update: (value: OffenderSearchDetailsFragment) => void;
}

interface MultipleProps {
  type: 'multiple';
  update: (value: OffenderSearchDetailsFragment[]) => void;
}

type Props = {
  addOverride?: string;
  offenderIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
} & (MultipleProps | SingleProps);

const AddExistingOffender = ({
  addOverride,
  offenderIds,
  onClose,
  takeAllSchemes,
  type = 'single',
  update,
}: Props): JSX.Element => {
  const {
    age,
    build,
    clearFilters,
    currentId,
    data,
    ethnicity,
    hair,
    lightBoxOpen,
    loading,
    loadingMore,
    onPaginationChange,
    onSubmit,
    openLightbox,
    pagination,
    peculiarities,
    selectOffender,
    selectedLoading,
    selectedOffender,
    selectedOffenders,
    setAge,
    setBuild,
    setCurrentId,
    setEthnicity,
    setHair,
    setPeculiarities,
    setSearch,
    setSex,
    sex,
  } = useAddExistingOffender({
    offenderIds,
    onClose,
    takeAllSchemes,
    type,
    update:
      type === 'single'
        ? (update as (value: OffenderSearchDetailsFragment) => void)
        : undefined,
    updateMany:
      type === 'multiple'
        ? (update as (value: OffenderSearchDetailsFragment[]) => void)
        : undefined,
  });

  return (
    <View
      addOverride={addOverride}
      age={age}
      build={build}
      clearFilters={clearFilters}
      currentId={currentId}
      data={data}
      ethnicity={ethnicity}
      hair={hair}
      lightBoxOpen={lightBoxOpen}
      loading={loading}
      loadingMore={loadingMore}
      onPaginationChange={onPaginationChange}
      onSubmit={onSubmit}
      openLightbox={openLightbox}
      pagination={pagination}
      peculiarities={peculiarities}
      selectOffender={selectOffender}
      selectedLoading={selectedLoading}
      selectedOffender={selectedOffender}
      selectedOffenders={selectedOffenders}
      setAge={setAge}
      setBuild={setBuild}
      setCurrentId={setCurrentId}
      setEthnicity={setEthnicity}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      setSearch={setSearch}
      setSex={setSex}
      sex={sex}
      type={type}
    />
  );
};

export default AddExistingOffender;
