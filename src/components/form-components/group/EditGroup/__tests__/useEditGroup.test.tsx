import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  GroupDocument,
  ListSchemeUsersDocument,
  SortOrder,
  UpdateGroupDocument,
} from 'graphql/generated';
import useEditGroup from '../useEditGroup';

const mocks = [
  {
    request: {
      query: UpdateGroupDocument,
      variables: {
        where: {
          id: 'groupId',
        },
        data: {
          name: { set: 'new name' },
          description: { set: 'new description' },
          users: {
            set: [{ id: '1' }],
          },
        },
      },
    },
    result: {
      data: {
        updateGroup: {
          id: '1',
          name: '1',
          description: '1',
          users: [
            {
              id: '1',
              fullName: 'test',
              businesses: [{ name: 'user business', id: '' }],
            },
          ],
        },
      },
    },
  },
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
              businesses: [{ id: '', name: 'test business' }],
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
            businesses: [{ name: 'user business', id: '' }],
            status: 'enabled',
            groups: [{ id: 'groupId', name: 'test group' }],
          },
        ],
      },
    },
  },
];

const UseEditGroupTest = () => {
  const { data, loading, usersData, usersLoading, onSubmit } = useEditGroup({
    onClose: jest.fn(),
    groupId: 'groupId',
  });
  const Group =
    data &&
    data.group?.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.businesses[0]?.name}</span>
      </div>
    ));
  const Users =
    usersData &&
    usersData.map((el) => (
      <div key={el.label}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));
  return (
    <div>
      {Group}
      <span>{loading ? 'true' : 'false'}</span>
      {Users}
      <span>{usersLoading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'new name',
            description: 'new description',
            users: ['1'],
            approvers: [],
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
    const { findByText, getAllByText, getByText, container } = render(
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
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
