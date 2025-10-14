import React from 'react';

import View from './OffenderFilter.view';
import useOffenderFilter from './useOffenderFilter';

const OffenderFilter = (): JSX.Element => {
  const {
    clearFilters,
    order,
    publicOffenderDOB,
    setAge,
    setBuild,
    setBusinesses,
    setCreatedAtFilter,
    setCrimeTypesFilter,
    setEthnicity,
    setGroupsFilter,
    setHair,
    setHasNoIncidents,
    setOrder,
    setPeculiarities,
    setPoliceAreas,
    setSex,
    setWarnings,
    tags,
    tagsLoading,
    variables,
  } = useOffenderFilter();

  return (
    <View
      clearFilters={clearFilters}
      order={order}
      publicOffenderDOB={publicOffenderDOB}
      setAge={setAge}
      setBuild={setBuild}
      setBusinesses={setBusinesses}
      setCreatedAtFilter={setCreatedAtFilter}
      setCrimeTypesFilter={setCrimeTypesFilter}
      setEthnicity={setEthnicity}
      setGroupsFilter={setGroupsFilter}
      setHair={setHair}
      setHasNoIncidents={setHasNoIncidents}
      setOrder={setOrder}
      setPeculiarities={setPeculiarities}
      setPoliceAreas={setPoliceAreas}
      setSex={setSex}
      setWarnings={setWarnings}
      tags={tags}
      tagsLoading={tagsLoading}
      variables={variables}
    />
  );
};

export default OffenderFilter;
