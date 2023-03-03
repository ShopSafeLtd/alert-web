import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';

import { MemoryRouter } from 'react-router-dom';
import {
  CreateChatDocument,
  ListSchemeUsersDocument,
  SortOrder,
} from 'graphql/generated';
import { storeModel } from 'state';
import useAddChat from '../useAddChat';

const mocks = [
  {
    request: {
      query: CreateChatDocument,
      variables: {
        data: {
          name: 'chatName',
          description: 'chatDescription',
          members: {
            create: [
              { user: { connect: { id: 'userChatId' } }, newMessages: false },
            ],
          },
          scheme: { connect: { id: 'schemeId' } },
        },
      },
    },
    result: {
      data: {
        createChat: {
          id: 'chatId',
          name: 'chatName',
          description: 'chatDescription',
          members: [
            {
              id: 'userChatId',
              newMessages: false,
              updatedAt: '2022-08-11T10:40:09.985Z',
              createdAt: '2022-08-10T10:40:09.985Z',
              user: {
                id: 'userId',
                fullName: 'test user',
                firstLetter: 't',
                businesses: [{ name: 'user business', id: '' }],
              },
              chat: {
                id: 'chatId',
                name: 'chatName',
                firstLetter: 'c',
                messages: {
                  id: 'messageId',
                  content: 'content',
                  createdAt: '2022-08-11T10:40:09.985Z',
                  from: {
                    id: 'userId',
                    fullName: 'test user',
                  },
                  images: [],
                  incidents: [],
                  offenders: [],
                },
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
          fullName: SortOrder.Asc,
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
            firstLetter: 't',
            businesses: [{ name: 'user business', id: '' }],
            status: 'enabled',
            groups: [{ id: 'groupId', name: 'test group' }],
            members: [
              {
                id: 'userChatId',
                user: {
                  id: 'userId',
                  fullName: 'test user',
                  firstLetter: 't',
                  businesses: [{ name: 'user business', id: '' }],
                },
              },
            ],
          },
        ],
      },
    },
  },
];

const UseAddChatTest = () => {
  const { usersData, usersLoading, onSubmit } = useAddChat({
    onClose: jest.fn(),
    update: jest.fn(),
  });

  const Users =
    usersData &&
    usersData.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.businesses[0]?.name}</span>
      </div>
    ));
  return (
    <div>
      {Users}
      <span>{usersLoading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'chatName',
            description: 'chatDescription',
            users: ['userChatId'],
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useDetailChats - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddChatTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('testUser')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Added!')).toBeInTheDocument();
  });
});
