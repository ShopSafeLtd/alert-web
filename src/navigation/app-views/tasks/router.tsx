import React from 'react';
import { Route, Routes } from 'react-router';
import TodoList from 'views/adminTodo/Activities.container';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Tasks = (): JSX.Element => (
  <Routes>
    <Route index element={<TodoList />} />
  </Routes>
);

export default Tasks;
