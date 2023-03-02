import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import {
  Role,
  SchemeChatsDocument,
  SchemeGroupsDocument,
  SortOrder,
  UpdateUserDocument,
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
          businesses: [{ name: 'user business', id: '' }],
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
              role: Role.User,
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
      query: UpdateUserDocument,
      variables: {
        where: {
          id: 'userId',
        },
        data: {
          addresses: {
            update: [
              {
                data: {
                  postcode: { set: 'postcode' },
                  street: { set: 'street' },
                  townCity: { set: 'townCity' },
                  building: { set: 'building' },
                  county: { set: 'county' },
                },
                where: {
                  id: 'ckshi0r5f9684229l4ckxvhld8',
                },
              },
            ],
          },
          email: { set: 'email' },
          fullName: { set: 'fullName' },
          business: { connect: [{ id: 'id' }] },
          schemes: {
            update: [
              {
                data: {
                  role: { set: Role.User },
                },
                where: {
                  id: 'schemeId',
                },
              },
            ],
          },
          groups: {
            set: [{ id: 'groupId' }],
          },
          chats: {
            create: [],
            delete: [],
          },
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
      },
    },
    result: {
      data: {
        updateUser: {
          id: 'userId',
          fullName: 'test user',
          businesses: [{ name: 'user business', id: '' }],
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          incidentEmail: { set: false },
          incidentPush: { set: false },
          offenderEmail: { set: false },
          offenderPush: { set: false },
          messagePush: { set: false },
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
              role: Role.ContentAdmin,
            },
          ],
        },
      },
    },
  },
];

const UseEditUserTest = () => {
  const {
    data,
    loading,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    onSubmit,
  } = useEditUser({
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
      <button
        type="button"
        onClick={() =>
          onSubmit({
            fullName: 'fullName',
            email: 'email',
            role: Role.User,
            business: {
              value: '',
              label: '',
            },
            groups: ['groupId'],
            chats: ['chatId'],
          })
        }
      >
        submit
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
            <UseEditUserTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('groupName')).toBeInTheDocument();
    expect(await findByText('chatName')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(3);
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
