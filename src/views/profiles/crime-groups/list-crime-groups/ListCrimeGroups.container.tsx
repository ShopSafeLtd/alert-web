import React from 'react';
import useListCrimeGroups from './useListCrimeGroups';
import View from './ListCrimeGroups.view';

const ListCrimeGroups = () => {
  const { data, loading, search, setSearch } = useListCrimeGroups();

  return (
    <View data={data} loading={loading} search={search} setSearch={setSearch} />
  );
};

export default ListCrimeGroups;
