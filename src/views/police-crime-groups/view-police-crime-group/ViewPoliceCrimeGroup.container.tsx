import React from 'react';

import ViewPoliceCrimeGroup from './ViewPoliceCrimeGroup.view';
import useViewPoliceCrimeGroup from './useViewPoliceCrimeGroup';

const ViewPoliceCrimeGroupContainer = (): JSX.Element => {
  const { data, error, loading } = useViewPoliceCrimeGroup();

  return <ViewPoliceCrimeGroup data={data} error={error} loading={loading} />;
};

export default ViewPoliceCrimeGroupContainer;
