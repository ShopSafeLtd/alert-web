import React from 'react';

import View from './SelectOffenders.view';
import useSelectedOffenders from './useSelectOffenders';

interface Props {
  onClose: () => void;
  update: (value: string[]) => void;
  offenderIds: string[] | undefined;
  addOverride?: string;
  takeAllSchemes?: boolean;
}

const SelectedOffenders = ({
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
    hair,
    peculiarities,
    setHair,
    setPeculiarities,
    clearFilters,
    onSelect,
    selected,
    saving,
    fetchMoreScroll,
  } = useSelectedOffenders({ onClose, update, offenderIds, takeAllSchemes });

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      onSubmit={onSubmit}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      fetchMoreScroll={fetchMoreScroll}
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
      hair={hair}
      peculiarities={peculiarities}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      clearFilters={clearFilters}
      addOverride={addOverride}
      onSelect={onSelect}
      selected={selected}
      onClose={onClose}
      saving={saving}
    />
  );
};

export default SelectedOffenders;
