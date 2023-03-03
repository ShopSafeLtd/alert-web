import React from 'react';

import { useParams } from 'react-router-dom';
import View from './ViewInvestigation.view';
import useViewCustomer from './useViewInvestigation';

const ViewCustomer: React.FC = () => {
  const { id } = useParams();

  const { data } = useViewCustomer(id || '');
  return <View data={data} />;
};

export default ViewCustomer;
