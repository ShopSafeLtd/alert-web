import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import schemeModel from 'state/scheme-model';
import { MemoryRouter } from 'react-router-dom';
import {
  GroupDocument,
  ListSchemeUsersDocument,
  SortOrder,
} from 'graphql/generated';
import useEditGroup from '../useEditGroup';

const mocks = [
  {
    request: {
      query: GroupDocument,
      variables: {
        where: {
          id: 'groupId',
        },
      },
    },
    result: {
      data: {
        group: {
          id: 'groupId',
          name: 'test group',
          description: null,
          users: [
            {
              id: 'userId',
              fullName: 'test user',
              organisation: 'test organisation',
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

const UseEditGroupTest = () => {
  const { data, loading, usersData, usersLoading } = useEditGroup({
    onClose: jest.fn(),
    groupId: 'groupId',
  });
  const Group =
    data &&
    data.group?.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.organisation}</span>
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
      {Group}
      <span>{loading ? 'true' : 'false'}</span>
      {Users}
      <span>{usersLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
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
            <UseEditGroupTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('testUser')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
  });
});
