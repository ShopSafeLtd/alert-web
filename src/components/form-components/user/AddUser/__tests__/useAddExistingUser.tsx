import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import {
  CreateUserInDatabaseDocument,
  InviteExistingUserDocument,
  Role,
  SchemeChatsDocument,
  SchemeGroupsDocument,
  SearchUserDocument,
  SortOrder,
} from 'graphql/generated';
import useAddUser from '../useAddUser';

const mocks = [
  {
    request: {
      query: SearchUserDocument,
      variables: {
        where: {
          email: 'email',
        },
      },
    },
    result: {
      data: {
        user: {
          id: 'userId',
          fullName: 'test user',
          organisation: 'ShopSafe ',
          email: 'email',
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
      },
    },
  },
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
        },
        orderBy: {
          name: SortOrder.Asc,
        },
      },
    },
    result: {
      data: {
        groups: [{ id: 'groupId', name: 'groupName', description: null }],
      },
    },
  },
  {
    request: {
      query: SchemeChatsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
        },
        orderBy: {
          name: SortOrder.Asc,
        },
      },
    },
    result: {
      data: {
        chats: [{ id: 'chatId', name: 'chatName', description: null }],
      },
    },
  },
  {
    request: {
      query: CreateUserInDatabaseDocument,
      variables: {
        data: {
          address: {
            postcode: 'postcode',
            street: 'street',
            townCity: 'townCity',
            building: 'building',
            county: 'county',
            primary: true,
          },
          email: 'email',
          fullName: 'fullName',
          groups: [{ id: 'groupId' }],
          organisation: 'organisation',
          role: 'USER',
          scheme: { id: 'schemeId' },
          chats: [{ id: 'chatId' }],
        },
        groupWhere: { scheme: { id: { equals: 'schemeId' } } },
      },
    },
    result: {
      data: {
        createUserInDatabase: {
          id: 'userId',
          fullName: 'test user',
          organisation: 'ShopSafe ',
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          status: 'active',
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
              name: 'test group',
              description: null,
            },
          ],
          chats: [
            {
              id: 'UserChatId',
              chat: {
                id: 'chatId',
                name: 'test chat',
                description: null,
              },
            },
          ],
          schemes: [
            {
              id: 'schemeId',
              role: Role.User,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: InviteExistingUserDocument,
      variables: {
        where: { id: 'userId' },
        data: {
          groups: { connect: [{ id: 'groupId' }] },
          chats: {
            create: [
              { newMessages: false, chat: { connect: { id: 'chatId' } } },
            ],
          },
          schemes: {
            create: [{ role: 'USER', scheme: { connect: { id: 'schemeId' } } }],
          },
        },
        groupWhere: { scheme: { id: { equals: 'schemeId' } } },
      },
    },
    result: {
      data: {
        inviteExistingUser: {
          id: 'userId',
          fullName: 'test user',
          organisation: 'ShopSafe ',
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          status: 'active',
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
              name: 'test group',
              description: null,
            },
          ],
          chats: {
            create: [
              {
                chat: { connect: { id: 'chatId' } },
                newMessages: true,
              },
            ],
          },
          schemes: [
            {
              id: 'schemeId',
              role: Role.User,
            },
          ],
        },
      },
    },
  },
];

const UseAddUserTest = () => {
  const {
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    onSubmit,
    onValuesChange,
    // existingUser,
  } = useAddUser({
    onClose: jest.fn(),
    update: jest.fn(),
    updateSearch: jest.fn(),
  });

  const preSubmit = () => {
    const value = {
      email: 'email',
      fullName: '',
      organisation: '',
      role: Role.ContentAdmin,
      postcode: '',
      street: '',
      townCity: '',
      building: '',
      county: '',
      groups: [],
      chats: [],
    };
    const changedValues = { email: 'email' };
    onValuesChange(changedValues, value);
  };
  const Groups =
    groupsData &&
    groupsData.groups.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.name}</span>
      </div>
    ));
  const Chats =
    chatsData &&
    chatsData.chats.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.name}</span>
      </div>
    ));

  return (
    <div>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Chats}
      <span>{chatsLoading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            email: 'email',
            fullName: 'fullName',
            organisation: 'organisation',
            postcode: 'postcode',
            street: 'street',
            townCity: 'townCity',
            building: 'building',
            county: 'county',
            role: Role.User,
            groups: ['groupId'],
            chats: ['chatId'],
          })
        }
      >
        submit
      </button>
      <button
        type="button"
        onClick={() => {
          preSubmit();
        }}
      >
        preSubmit
      </button>
    </div>
  );
};

describe('useDetailUsers - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: { id: 'schemeId' },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getAllByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddUserTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('groupName')).toBeInTheDocument();
    expect(await findByText('chatName')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
    fireEvent.click(getByText('preSubmit'));
    expect(await findByText('OK')).toBeInTheDocument();
    fireEvent.click(getByText('OK'));
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Invited!')).toBeInTheDocument();
  });
});
