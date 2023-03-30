import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddGroup from '../AddGroup.view';

describe('Detail Officer View', () => {
  const usersData = {
    users: [
      {
        id: 'userId',
        fullName: 'testUser',
        email: 'user email',
        publicName: true,
        businesses: [{ id: '', name: 'user business', fullName: '' }],
        status: 'enabled',
        groups: [{ id: 'groupId', name: 'test group' }],
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddGroup
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          usersData={usersData}
          usersLoading={false}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
