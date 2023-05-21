import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { QueryMode, SchemeGroupsDocument } from 'graphql/generated';
import useArticlesSection from '../useArticlesSection';

const mocks = [
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'testScheme' } },
          OR: [
            {
              name: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
            {
              description: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
          ],
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

const UseGroupListTest = () => {
  const { data, loading } = useArticlesSection({ fullSearch: 'a' });
  const uncompletedTodos =
    data &&
    data.uncompletedTodos?.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.name}</span>
      </div>
    ));

  return (
    <div>
      {uncompletedTodos}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'testScheme',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseGroupListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('TestName')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
