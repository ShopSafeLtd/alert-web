import React from 'react';
import { Route, Routes } from 'react-router';
import ListWorkflows from 'views/workflows/ListWorkflows/listWorkflow.container';
import ViewWorkflow from 'views/workflows/ViewWorkflow/WorkflowForm.container';

const WorkFlow = (): JSX.Element => (
  // <ChatRouter />
  <Routes>
    <Route element={<ListWorkflows />} index />
    <Route element={<ViewWorkflow />} path="/add" />
    <Route element={<ViewWorkflow />} path="/edit/:id" />
  </Routes>
);

export default WorkFlow;
