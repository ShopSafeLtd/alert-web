import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  ChatDocument,
  ListSchemeUsersDocument,
  SortOrder,
  UpdateChatDocument,
} from 'graphql/generated';
import useAddUserToChat from '../AddUserToChat';

const mocks = [
  {
    request: {
      query: UpdateChatDocument,
      variables: {
        where: {
          id: 'chatId',
        },
        data: {
          name: { set: 'new name' },
          description: { set: 'new description' },
          members: {
            create: [
              {
                user: { connect: { id: 'userId' } },
                newMessages: true,
              },
            ],
            delete: [{ id: 'userChatId' }],
          },
        },
      },
    },
    result: {
      data: {
        updateChat: {
          id: '1',
          name: '1',
          description: '1',
          members: [
            {
              id: 'userChatId',
              user: {
                id: 'userId',
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
      query: ChatDocument,
      variables: {
        where: {
          id: 'chatId',
        },
      },
    },
    result: {
      data: {
        chat: {
          id: 'chatId',
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

const UseAddUserToChatTest = () => {
  const { data, loading, usersData, usersLoading, onSubmit } = useAddUserToChat(
    {
      onClose: jest.fn(),
      chatId: 'chatId',
    }
  );
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
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'new name',
            description: 'new description',
            user: ['userId'],
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
    const { findByText, getAllByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddUserToChatTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('testUser')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
