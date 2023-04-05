import React from 'react';
import View from './CrimeGroupSideList.view';
import useCrimeGroupSideList from './useCrimeGroupSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to: string;
}

const CrimeGroupSideList = ({ current, to }: Props): JSX.Element => {
  const { data, loading } = useCrimeGroupSideList();

  return <View data={data} loading={loading} current={current} to={to} />;
};

export default CrimeGroupSideList;
