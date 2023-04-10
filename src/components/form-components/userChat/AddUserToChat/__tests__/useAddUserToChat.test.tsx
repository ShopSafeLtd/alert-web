import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  ListSchemeUsersDocument,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import useAddUserToChat from '../useAddUserToChat';

const mocks = [
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
          OR: [
            {
              fullName: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
            {
              businesses: {
                some: {
                  name: {
                    contains: '',
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
          ],
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
            businesses: [{ name: 'user business', id: '' }],
            status: 'enabled',
            groups: [{ id: 'groupId', name: 'test group' }],
          },
        ],
      },
    },
  },
];

const UseAddUserToChatTest = () => {
  const { usersData, loading, onSubmit } = useAddUserToChat({
    onClose: jest.fn(),
    membersData: [],
    addMemberUpdate: jest.fn(),
  });

  const Users =
    usersData &&
    usersData.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.businesses[0]?.name}</span>
      </div>
    ));
  return (
    <div>
      <span>{loading ? 'true' : 'false'}</span>
      {Users}
      <button type="button" onClick={() => onSubmit({ user: ['userId'] })}>
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
            <UseAddUserToChatTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('testUser')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
