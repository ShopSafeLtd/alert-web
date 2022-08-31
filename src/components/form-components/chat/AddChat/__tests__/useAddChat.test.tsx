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
          description: 'chatdescription',
          scheme: {
            connect: {
              id: 'schemeId',
            },
          },
        },
      },
    },
    result: {
      data: {
        createChat: {
          id: 'chatId',
          name: 'chatName',
          description: 'chatdescription',
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
        <span>{el.organisation}</span>
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
            description: 'chatdescription',
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
