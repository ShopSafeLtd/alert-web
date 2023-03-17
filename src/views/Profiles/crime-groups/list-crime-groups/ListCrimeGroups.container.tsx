import React from 'react';
import useListCrimeGroups from './useListCrimeGroups';
import View from './ListCrimeGroups.view';

const ListCrimeGroups = () => {
  const { data, loading } = useListCrimeGroups();

  return <View data={data} loading={loading} />;
};

export default ListCrimeGroups;
