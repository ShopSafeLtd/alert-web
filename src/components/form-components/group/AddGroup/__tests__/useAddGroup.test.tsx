import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';

import useAddGroup from '../useAddGroup';

import { SortOrder } from 'graphql/types';
import { CreateGroupDocument } from 'graphql/groups/mutations/__generated__/create-group.generated';
import { ListSchemeUsersDocument } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

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
    usersData.map((el) => (
      <div key={el.value}>
        <span>{el.label}</span>
        <span>{el.label}</span>
        <span>{el.label}</span>
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
            approvers: [],
            showName: true,
            showAlias: true,
            showEthnicity: true,
            showGender: true,
            showBuild: true,
            showHeight: true,
            showHair: true,
            showAge: true,
            showDateOfBirth: true,
            showDateOfBirthSource: true,
            showIdVerified: true,
            showPeculiarities: true,
            showComment: true,
            showImages: true,
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
