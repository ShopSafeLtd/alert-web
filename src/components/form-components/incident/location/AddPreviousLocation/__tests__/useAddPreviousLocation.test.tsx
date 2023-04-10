import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { AddressesDocument } from 'graphql/generated';
import useAddPreviousLocation from '../useAddPreviousLocation';

const mocks = [
  {
    request: {
      query: AddressesDocument,
      variables: {
        where: {
          user: {
            id: {
              equals: 'userId',
            },
          },
        },
      },
    },
    result: {
      data: {
        addresses: [
          {
            id: 'addressId',
            building: null,
            county: null,
            full: 'street, town, s3 7ab',
            postcode: 's3 7ab',
            primary: false,
            street: 'street',
            townCity: 'town',
          },
        ],
      },
    },
  },
];

const UseAddPreviousLocationTest = () => {
  const { data, loading, onSubmit } = useAddPreviousLocation({
    onClose: jest.fn(),
    update: jest.fn(),
  });
  const Addresses =
    data &&
    data.addresses.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.postcode}</span>
      </div>
    ));

  return (
    <div>
      {Addresses}
      <span>{loading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            selectedLocation: 'addressId',
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
      user: {
        id: 'userId',
      },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddPreviousLocationTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('s3 7ab')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
