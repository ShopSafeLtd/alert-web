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
import useManageChat from '../useManageChatMember';

const mocks = [
  {
    request: {
      query: UpdateChatDocument,
      variables: {
        where: {
          id: 'chatId',
        },
        data: {
          members: {
            create: [
              // {
              //   user: { connect: { id: 'userId' } },
              //   newMessages: true,
              // },
            ],
            delete: [],
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
          totalMembers: 1,
          members: [
            {
              id: 'userChatId',
              user: {
                id: 'test userId',
                fullName: 'test user',
                firstLetter: 't',
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
            firstLetter: 't',
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

const UseManageChatTest = () => {
  const { loading, usersData, onSubmit } = useManageChat({
    onClose: jest.fn(),
    chatId: 'chatId',
  });

  const Users =
    usersData &&
    usersData.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.organisation}</span>
      </div>
    ));
  return (
    <div>
      <span>{loading ? 'true' : 'false'}</span>
      {Users}

      <button type="button" onClick={() => onSubmit()}>
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
            <UseManageChatTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('testUser')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
