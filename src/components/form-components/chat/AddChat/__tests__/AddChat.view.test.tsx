import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddChat from '../AddChat.view';

describe('Detail Officer View', () => {
  const usersData = {
    users: [
      {
        id: 'userId',
        fullName: 'testUser',
        email: 'user email',
        organisation: 'user organisation',
        status: 'enabled',
        groups: [{ id: 'groupId', name: 'test group' }],
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddChat
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
