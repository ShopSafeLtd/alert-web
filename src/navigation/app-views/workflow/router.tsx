import React from 'react';
import { Route, Routes } from 'react-router';
import ListWorkflows from 'views/workflows/ListWorkflows/listWorkflow.container';
import ViewWorkflow from 'views/workflows/ViewWorkflow/WorkflowForm.container';

const WorkFlow = (): JSX.Element => (
  // <ChatRouter />
  <Routes>
    <Route index element={<ListWorkflows />} />
    <Route path="/add" element={<ViewWorkflow />} />
    <Route path="/edit/:id" element={<ViewWorkflow />} />
  </Routes>
);

export default WorkFlow;
