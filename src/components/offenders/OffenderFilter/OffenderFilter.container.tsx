import React from 'react';
import View from './OffenderFilter.view';
import useOffenderFilter from './useOffenderFilter';

const OffenderFilter = (): JSX.Element => {
  const {
    order,
    setOrder,
    tags,
    tagsLoading,
    clearFilters,
    setAge,
    setBuild,
    setEthnicity,
    setGroupsFilter,
    setHair,
    setPeculiarities,
    setSex,
    setWarnings,
    businessData,
    setBusinesses,
    businessesLoading,
    setCreatedAtFilter,
    variables,
    publicOffenderDOB,
  } = useOffenderFilter();

  return (
    <View
      order={order}
      setOrder={setOrder}
      tags={tags}
      tagsLoading={tagsLoading}
      clearFilters={clearFilters}
      setAge={setAge}
      setBuild={setBuild}
      setEthnicity={setEthnicity}
      setGroupsFilter={setGroupsFilter}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      setSex={setSex}
      setWarnings={setWarnings}
      businessData={businessData}
      setBusinesses={setBusinesses}
      businessesLoading={businessesLoading}
      setCreatedAtFilter={setCreatedAtFilter}
      variables={variables}
      publicOffenderDOB={publicOffenderDOB}
    />
  );
};

export default OffenderFilter;
