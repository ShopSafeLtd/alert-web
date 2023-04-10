import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { RecycledItemsDocument, SortOrder } from 'graphql/generated';
import useRecycleBin from '../RecycleBin';

const mocks = [
  {
    request: {
      query: RecycledItemsDocument,
      variables: {
        schemeId: 'schemeId',
        order: {
          deletedAt: SortOrder.Asc,
        },
      },
    },
    result: {
      data: {
        recycledItems: [
          {
            id: 'testId',
            deletedAt: '2022-07-25T08:57:55.299Z',
            expiresAt: '2022-07-25T08:57:55.299Z',
            systemTask: false,
            scheme: { id: 'schemeId' },
            offender: null,
            deletedBy: {
              id: 'userId',
              fullName: 'test user',
              businesses: [{ name: 'test business', id: 'test' }],
            },
            incident: {
              id: 'incidentId',
              date: '2022-08-01T16:44:33.355Z',
              recycled: true,
              subject: 'dd',
              location: null,
              createdBy: {
                fullName: 'test createBy',
                id: 'cl4pe3eu91312371op4c4k2lih2',
                businesses: [{ name: 'test business', id: 'test' }],
              },
            },
          },
        ],
      },
    },
  },
];

const UseRecycledItemListTest = () => {
  const { data, loading } = useRecycleBin();
  const RecycledItems =
    data &&
    data.recycledItems?.map((el) => (
      <div key={el?.id}>
        <span>{el?.id}</span>
        <span>{el?.deletedAt}</span>
      </div>
    ));

  return (
    <div>
      {RecycledItems}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListRecycledItems - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: { id: 'schemeId' },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseRecycledItemListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('2022-07-25T08:57:55.299Z')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
