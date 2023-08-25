import React from 'react';
import useListWorkflows from './useListWorkflows';
import View from './listWorkflow.view';

const ListWorkflowContainer = () => {
  const { data, loading } = useListWorkflows();
  return <View data={data} loading={loading} />;
};

export default ListWorkflowContainer;
