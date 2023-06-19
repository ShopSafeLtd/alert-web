import React from 'react';
import { Routes, Route } from 'react-router';
import TodoList from 'views/adminTodo/TodoList';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Tasks = (): JSX.Element => (
  <Routes>
    <Route index element={<TodoList />} />
  </Routes>
);

export default Tasks;
