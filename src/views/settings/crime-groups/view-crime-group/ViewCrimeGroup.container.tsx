import React from 'react';
import View from './ViewCrimeGroup.view';
import useViewCrimeGroup from './useViewCrimeGroup';

const ViewCrimeGroup = () => {
  const { data } = useViewCrimeGroup();

  return <View data={data} />;
};

export default ViewCrimeGroup;
