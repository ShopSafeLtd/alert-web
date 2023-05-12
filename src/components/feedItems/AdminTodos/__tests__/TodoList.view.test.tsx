import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TodoList from '../AdminTodos.view';

describe('List Officer View', () => {
  const data = {
    uncompletedTodos: [
      {
        id: 'test',
        name: 'uncompletedTodos',
        description: null,
        assignedUsers: [],
        completed: false,
        completedBy: null,
        createdBy: null,
        completedDate: '2023-04-25T21:46:40.796Z',
        dueDate: '2023-04-25T21:46:40.796Z',
      },
    ],
    completedTodos: [
      {
        id: 'test',
        name: 'completedTodos',
        description: null,
        assignedUsers: [],
        completed: true,
        completedBy: { id: 'completedTodos', fullName: 'completedTodos' },
        createdBy: null,
        completedDate: '2023-04-25T21:46:40.796Z',
        dueDate: '2023-04-25T21:46:40.796Z',
      },
    ],
    uncompletedTotal: 1,
    completedTotal: 1,
    totalUserTodos: 1,
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TodoList
          data={data}
          loading={false}
          setSearch={jest.fn()}
          saving={false}
          onCompletedTodo={jest.fn()}
          onUncompletedTodo={jest.fn()}
          addTodo={false}
          toggleAddTodo={jest.fn()}
          updateTodoList={jest.fn()}
          onPaginationChange={jest.fn()}
          currentPage={1}
          currentPageSize={1}
        />
      </MemoryRouter>
    );
    expect(getByText('test group')).toBeInTheDocument();
  });
});
