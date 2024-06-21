import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditChat from '../EditChat.view';
import { UserStatus } from 'graphql/types';

describe('Detail Officer View', () => {
  const data = {
    chat: {
      id: 'test ChatId',
      name: 'test Chat',
      totalMembers: 0,
      totalMessages: 0,

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
            firstLetter: 'A',
            origFirstLetter: 'A',
          },
        },
      ],
    },
  };
  const usersData = {
    users: [
      {
        reportToAllBusinesses: false,

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
        firstLetter: 'A',
        origFirstLetter: 'A',
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
