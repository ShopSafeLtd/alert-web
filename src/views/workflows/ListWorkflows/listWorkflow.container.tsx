import React from 'react';

import View from './listWorkflow.view';
import useListWorkflows from './useListWorkflows';

const ListWorkflowContainer = () => {
  const { data, loading } = useListWorkflows();
  return <View data={data} loading={loading} />;
};

export default ListWorkflowContainer;
