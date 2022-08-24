import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import schemeModel from 'state/scheme-model';
import { MemoryRouter } from 'react-router-dom';
import {
  ChatDocument,
  ListSchemeUsersDocument,
  SortOrder,
} from 'graphql/generated';
import useEditChat from '../useEditChat';

const mocks = [
  {
    request: {
      query: ChatDocument,
      variables: {
        where: {
          id: 'ChatId',
        },
      },
    },
    result: {
      data: {
        chat: {
          id: 'ChatId',
          name: 'test Chat',
          description: null,
          members: [
            {
              id: 'userChatId',
              user: {
                id: 'test userId',
                fullName: 'test user',
                organisation: 'test organisation',
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: ListSchemeUsersDocument,
      variables: {
        where: {
          schemes: {
            some: {
              scheme: {
                id: {
                  equals: 'schemeId',
                },
              },
            },
          },
        },
        groupWhere: {
          scheme: {
            id: {
              equals: 'schemeId',
            },
          },
        },
        orderBy: {
          fullName: SortOrder.Desc,
        },
      },
    },
    result: {
      data: {
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
      },
    },
  },
];

const UseEditChatTest = () => {
  const { data, loading, usersData, usersLoading } = useEditChat({
    onClose: jest.fn(),
    chatId: 'ChatId',
  });
  const Chat =
    data &&
    data.chat?.members.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.user.fullName}</span>
      </div>
    ));
  const Users =
    usersData &&
    usersData.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.organisation}</span>
      </div>
    ));
  return (
    <div>
      {Chat}
      <span>{loading ? 'true' : 'false'}</span>
      {Users}
      <span>{usersLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailChats - hook', () => {
  const store = createStore(schemeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getAllByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseEditChatTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('testUser')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
  });
});
