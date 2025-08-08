import React from 'react';

import View from './exportBusinesses.view';
import useExportBusinesses from './useExportBusinesses';

const ExportBusinessesContainer = () => {
  const {
    data,
    dispatch,
    filtersOpen,
    getZip,
    groupData,
    groupFilter,
    loading,
    mutationLoading,
    parentData,
    parentFilter,
    policeAreas,
    setGroupFilter,
    setParentFilter,
    setPoliceAreas,
    setTagFilter,
    state,
    tagFilter,
    tags,
    toggleFiltersOpen,
  } = useExportBusinesses();
  return (
    <View
      data={data}
      dispatch={dispatch}
      filtersOpen={filtersOpen}
      getZip={getZip}
      groupData={groupData}
      groupFilter={groupFilter}
      loading={loading}
      mutationLoading={mutationLoading}
      parentData={parentData}
      parentFilter={parentFilter}
      policeAreas={policeAreas}
      setGroupFilter={setGroupFilter}
      setParentFilter={setParentFilter}
      setPoliceAreas={setPoliceAreas}
      setTagFilter={setTagFilter}
      state={state}
      tagFilter={tagFilter}
      tags={tags}
      toggleFiltersOpen={toggleFiltersOpen}
    />
  );
};

export default ExportBusinessesContainer;
