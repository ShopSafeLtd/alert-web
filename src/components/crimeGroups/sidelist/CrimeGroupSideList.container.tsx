import React, { useState } from 'react';

import View from './CrimeGroupSideList.view';
import useCrimeGroupSideList from './useCrimeGroupSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  forceCollapsed?: boolean;
  onExpandRequest?: () => void;
  to?: string;
}

const CrimeGroupSideList = ({
  current,
  forceCollapsed,
  onExpandRequest,
  to,
}: Props): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, next } = useCrimeGroupSideList(searchQuery);

  return (
    <View
      current={current}
      data={data}
      forceCollapsed={forceCollapsed}
      loading={loading}
      next={next}
      onExpandRequest={onExpandRequest}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      to={to}
    />
  );
};

export default CrimeGroupSideList;
