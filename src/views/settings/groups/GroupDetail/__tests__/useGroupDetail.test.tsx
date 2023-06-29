/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { GroupDocument } from 'graphql/generated';
import useGroupDetail from '../useGroupDetail';

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
              id: 'test userId',
              fullName: 'test user',
              businesses: [{ name: 'test business', id: '' }],
            },
          ],
        },
      },
    },
  },
];

const UseGroupDetailTest = () => {
  const { data, loading } = useGroupDetail('groupId');
  const Group =
    data &&
    data.group?.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.businesses[0]?.name}</span>
      </div>
    ));

  return (
    <div>
      {Group}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      id: 'groupId',
    },
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseGroupDetailTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
