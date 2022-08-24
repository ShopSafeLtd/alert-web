import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import schemeModel from 'state/scheme-model';
import { MemoryRouter } from 'react-router-dom';
import {
  Role,
  SchemeChatsDocument,
  SchemeGroupsDocument,
  SortOrder,
  UserDocument,
} from 'graphql/generated';
import useEditUser from '../useEditUser';

const mocks = [
  {
    request: {
      query: UserDocument,
      variables: {
        where: {
          id: 'userId',
        },
        groupWhere: {
          scheme: {
            id: {
              equals: 'schemeId',
            },
          },
        },
        chatWhere: {
          chat: {
            scheme: {
              id: {
                equals: 'schemeId',
              },
            },
          },
        },
        schemeWhere: {
          scheme: {
            id: {
              equals: 'schemeId',
            },
          },
        },
      },
    },
    result: {
      data: {
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
          name: SortOrder.Desc,
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
          name: SortOrder.Desc,
        },
      },
    },
    result: {
      data: {
        chats: [{ id: 'chatId', name: 'chatName', description: null }],
      },
    },
  },
];

const UseEditUserTest = () => {
  const { data, loading, groupsData, groupsLoading, chatsData, chatsLoading } =
    useEditUser({
      onClose: jest.fn(),
      userId: 'userId',
    });
  const User = data && (
    <div key={data.user?.id}>
      <span>{data.user?.id}</span>
      <span>{data.user?.fullName}</span>
    </div>
  );
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
      {User}
      <span>{loading ? 'true' : 'false'}</span>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Chats}
      <span>{chatsLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailUsers - hook', () => {
  const store = createStore(schemeModel, {
    initialState: {
      scheme: { id: 'schemeId' },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getAllByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseEditUserTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('groupName')).toBeInTheDocument();
    expect(await findByText('chatName')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(3);
  });
});
