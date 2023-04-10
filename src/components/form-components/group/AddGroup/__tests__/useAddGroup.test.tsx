import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import {
  CreateGroupDocument,
  ListSchemeUsersDocument,
  SortOrder,
} from 'graphql/generated';
import useAddGroup from '../useAddGroup';

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
          },
        ],
      },
    },
  },
  {
    request: {
      query: CreateGroupDocument,
      variables: {
        data: {
          name: 'groupName',
          description: 'group description',
          users: { connect: [{ id: 'id' }] },
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
        createGroup: {
          id: 'groupId',
          name: 'groupName',
          description: 'group description',
          users: {
            id: 'userId',
            fullName: 'test user',
            businesses: [{ name: 'user business', id: '' }],
          },
        },
      },
    },
  },
];

const UseAddGroupTest = () => {
  const { usersData, usersLoading, onSubmit } = useAddGroup({
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
            name: 'groupName',
            description: 'group description',
            users: ['id'],
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
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
            <UseAddGroupTest />
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
