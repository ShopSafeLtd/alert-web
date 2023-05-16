import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddExclusion from '../AddTodo.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddExclusion
          adminUsersData={[]}
          usersLoading={false}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
