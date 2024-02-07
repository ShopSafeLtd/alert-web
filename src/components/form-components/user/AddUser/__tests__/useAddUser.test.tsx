/* eslint-disable */
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
          email: '',
        },
      },
    },
    result: {
      data: {
        user: {
          publicName: true,

          id: 'userId',
          fullName: 'test user',
          business: {
            label: '',
            value: '',
          },
          email: 'email',
          disabled: false,
          newUser: false,
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
          email: 'email',
          fullName: 'fullName',
          groups: [{ id: 'groupId' }],
          business: {
            label: '',
            value: '',
          },
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
          business: {
            label: '',
            value: '',
          },
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          status: 'active',
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
          business: {
            label: '',
            value: '',
          },
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          status: 'active',
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
  const { groupsData, groupsLoading, chatsData, chatsLoading, onSubmit } =
    useAddUser({
      onClose: jest.fn(),
      update: jest.fn(),
      updateSearch: jest.fn(),
    });

  const Groups =
    groupsData &&
    groupsData.map(({ value, label }) => (
      <div key={value}>
        <span>{value}</span>
        <span>{label}</span>
      </div>
    ));
  const Chats =
    chatsData &&
    chatsData.map(({ value, label }) => (
      <div key={value}>
        <span>{value}</span>
        <span>{label}</span>
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
            reportToAllBusinesses: false,
            email: 'email',
            fullName: 'fullName',
            incidentEmail: false,
            incidentPush: false,
            subscribedIncidentOnly: false,
            subscribedOffenderOnly: false,
            messagePush: false,
            offenderEmail: false,
            offenderPush: false,
            publicName: true,
            businesses: [
              {
                label: '',
                value: '',
              },
            ],
            role: Role.User,
            groups: ['groupId'],
            chats: ['chatId'],
            approverGroups: [],
            defaultGroups: [],
            bulletinEmails: false,
            bulletinPush: false,
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
            <UseAddUserTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('groupName')).toBeInTheDocument();
    expect(await findByText('chatName')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Invited!')).toBeInTheDocument();
  });
});
