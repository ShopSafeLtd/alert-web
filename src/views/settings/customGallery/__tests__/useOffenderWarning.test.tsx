/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  Model,
  QueryMode,
  ListCustomGalleriesDocument,
} from 'graphql/generated';
import useTagList from '../useCustomGalleries';

const mocks = [
  {
    request: {
      query: ListCustomGalleriesDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
          dataType: {
            equals: Model.Offender,
          },
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
        tags: [{ id: 'testId', name: 'TestName', description: 'description' }],
      },
    },
  },
];

const UseTagListTest = () => {
  const { data, loading } = useTagList();
  const CustomGalleries =
    data &&
    data.listCustomGalleries.customGalleries.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.name}</span>
      </div>
    ));

  return (
    <div>
      {CustomGalleries}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListCustomGalleries - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseTagListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('TestName')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
