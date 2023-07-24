import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditChat from '../EditChat.view';
import { UserStatus } from '../../../../../graphql/generated';

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
            publicName: true,
            reportToAllBusinesses: false,
            businesses: [{ name: 'user business', id: '', fullName: '' }],
            origName: 'test user',
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
        origName: 'testUser',
        email: 'user email',
        publicName: true,
        businesses: [{ name: 'user business', id: '', fullName: '' }],
        status: UserStatus.Active,
        groups: [{ id: 'groupId', name: 'test group' }],
        schemes: [],
        approverGroups: [],
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
