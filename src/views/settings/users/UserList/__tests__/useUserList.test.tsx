import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  ListSchemeUsersDocument,
  QueryMode,
  SchemeGroupsDocument,
} from 'graphql/generated';
import { FormattedMessage } from 'react-intl';
import useUserList from '../useUserList';

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
                  // eslint-disable-next-line sonarjs/no-duplicate-string
                  equals: 'test schemeId',
                },
              },
              recycled: {
                equals: false,
              },
            },
          },
          recycled: {
            equals: false,
          },
          groups: undefined,
          OR: [
            {
              fullName: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
            {
              email: {
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
              equals: 'test schemeId',
            },
          },
        },
      },
    },
    result: {
      data: {
        users: [
          {
            id: 'test userId',
            fullName: 'testUser',
            firstLetter: 't',
            email: 'user email',
            business: [{ name: 'user business', id: 'test' }],
            status: 'enabled',
            groups: [{ id: 'groupId', name: 'test group' }],
          },
        ],
      },
    },
  },
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'test schemeId' } },
        },
      },
    },
    result: {
      data: {
        groups: [{ id: 'testId', name: 'TestName', description: null }],
      },
    },
  },
];

const UseUserListTest = () => {
  const { data, loading, groupsLoading } = useUserList();
  const Users =
    data &&
    data.listUsers.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
      </div>
    ));

  return (
    <div>
      {Users}
      <span>
        {loading ? (
          <FormattedMessage defaultMessage="true" id="kSDNX6" />
        ) : (
          <FormattedMessage defaultMessage="false" id="cZ+mfu" />
        )}
      </span>
      <span>
        {groupsLoading ? (
          <FormattedMessage defaultMessage="true" id="kSDNX6" />
        ) : (
          <FormattedMessage defaultMessage="false" id="cZ+mfu" />
        )}
      </span>
    </div>
  );
};

describe('useListUsers - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'test schemeId',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText, getAllByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseUserListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('testUser')).toBeInTheDocument();
    expect(await findByText('TestName')).toBeInTheDocument();
    // expect(await findByText('false')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
  });
});
