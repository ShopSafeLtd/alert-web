import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditGroup from '../EditGroup.view';

describe('Detail Officer View', () => {
  const data = {
    group: {
      id: 'groupId',
      name: 'test group',
      description: null,
      users: [
        {
          id: 'userId',
          fullName: 'test user',
          businesses: [{ id: '', name: 'test business', fullName: '' }],
        },
      ],
    },
  };
  const usersData = {
    users: [
      {
        id: 'userId',
        fullName: 'testUser',
        email: 'user email',
        publicName: true,
        businesses: [{ id: '', name: 'test business', fullName: '' }],
        status: 'enabled',
        groups: [{ id: 'groupId', name: 'test group' }],
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditGroup
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={data}
          loading={false}
          usersData={usersData}
          usersLoading={false}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
