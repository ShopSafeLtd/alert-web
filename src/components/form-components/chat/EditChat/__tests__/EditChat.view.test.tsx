import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditChat from '../EditChat.view';

describe('Detail Officer View', () => {
  const data = {
    chat: {
      id: 'test ChatId',
      name: 'test Chat',
      members: [
        {
          id: 'userChatId',
          user: {
            id: 'test userId',
            fullName: 'test user',
            businesses: [{ name: 'user business', id: '' }],
          },
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
        businesses: [{ name: 'user business', id: '' }],
        status: 'enabled',
        groups: [{ id: 'groupId', name: 'test group' }],
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditChat
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
