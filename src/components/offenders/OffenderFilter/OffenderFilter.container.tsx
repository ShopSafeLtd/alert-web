import React from 'react';

import View from './OffenderFilter.view';
import useOffenderFilter from './useOffenderFilter';

const OffenderFilter = (): JSX.Element => {
  const {
    businessData,
    businessesLoading,
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
    setOrder,
    setPeculiarities,
    setSex,
    setWarnings,
    tags,
    tagsLoading,
    variables,
  } = useOffenderFilter();

  return (
    <View
      businessData={businessData}
      businessesLoading={businessesLoading}
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
      setOrder={setOrder}
      setPeculiarities={setPeculiarities}
      setSex={setSex}
      setWarnings={setWarnings}
      tags={tags}
      tagsLoading={tagsLoading}
      variables={variables}
    />
  );
};

export default OffenderFilter;
