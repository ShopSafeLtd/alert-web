import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role } from 'graphql/generated';
import EditUser from '../EditUser.view';

describe('Detail Officer View', () => {
  const data = {
    user: {
      id: 'userId',
      fullName: 'test user',
      organisation: 'ShopSafe ',
      email: '@shopsafe.uk',
      disabled: false,
      newUser: false,
      addresses: [
        {
          building: 'building',
          county: 'Suffolk',
          id: 'ckshi0r5f9684229l4ckxvhld8',
          postcode: 'IP313FA',
          street: 'Unit 2 Sandy Lane',
          townCity: 'Badwell Ash',
        },
      ],
      groups: [
        {
          id: 'groupId',
          name: 'groupName',
          description: null,
        },
      ],
      chats: [
        {
          id: 'UserChatId',
          chat: {
            id: 'chatId',
            name: 'chatName',
            description: null,
          },
        },
      ],
      schemes: [
        {
          id: 'schemeId',
          role: Role.ContentAdmin,
        },
      ],
    },
  };

  const groupsData = {
    groups: [{ id: 'groupId', name: 'groupName', description: null }],
  };
  const chatsData = {
    chats: [{ id: 'chatId', name: 'chatName', description: null }],
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditUser
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={data}
          loading={false}
          groupsData={groupsData}
          groupsLoading={false}
          chatsData={chatsData}
          chatsLoading={false}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
