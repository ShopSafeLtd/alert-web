import React from 'react';
import type { OffenderData } from 'types/DataType';

import View from './AddExistingOffender.view';
import useAddExistingOffender from './useAddExistingOffender';

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
  addOverride?: string;
  takeAllSchemes?: boolean;
}

const AddExistingOffender = ({
  onClose,
  update,
  offenderIds,
  addOverride,
  takeAllSchemes,
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
  } = useAddExistingOffender({ onClose, update, offenderIds, takeAllSchemes });

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
      addOverride={addOverride}
    />
  );
};

export default AddExistingOffender;
