import React from 'react';

import View from './ListCrimeGroups.view';
import useListCrimeGroups from './useListCrimeGroups';

const ListCrimeGroups = () => {
  const { data, loading, search, setSearch } = useListCrimeGroups();

  return (
    <View data={data} loading={loading} search={search} setSearch={setSearch} />
  );
};

export default ListCrimeGroups;
