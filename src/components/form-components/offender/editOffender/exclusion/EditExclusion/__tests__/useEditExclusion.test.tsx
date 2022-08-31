import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { BanDocument, UpdateBanDocument } from 'graphql/generated';
import useEditExclusion from '../useEditExclusion';

const mocks = [
  {
    request: {
      query: UpdateBanDocument,
      variables: {
        where: {
          id: 'banId',
        },
        data: {
          startDate: { set: new Date() },
          endDate: { set: new Date() },
          location: { set: 'location' },
          description: { set: 'new description' },
        },
      },
    },
    result: {
      data: {
        updateBan: {
          id: 'banId',
          active: false,
          startDate: new Date(),
          endDate: new Date(),
          location: 'location',
          description: 'new description',
          createdBy: {
            id: 'userId',
            fullName: 'user name',
          },
          createdAt: 'createdAt',
        },
      },
    },
  },
  {
    request: {
      query: BanDocument,
      variables: {
        where: {
          id: 'banId',
        },
      },
    },
    result: {
      data: {
        ban: {
          id: 'banId',
          active: false,
          location: 'location',
          description: null,
          startDate: 'startDate',
          endDate: 'endDate',
          createdAt: 'createdAt',
          createdBy: {
            id: 'userId',
            fullName: 'user name',
          },
        },
      },
    },
  },
];

const UseEditExclusionTest = () => {
  const { data, loading, onSubmit } = useEditExclusion({
    onClose: jest.fn(),
    banId: 'banId',
  });
  const Ban = data && (
    <div key={data.ban?.id}>
      <span>{data.ban?.id}</span>
      <span>{data.ban?.location}</span>
    </div>
  );

  return (
    <div>
      {Ban}
      <span>{loading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            startDate: new Date(),
            endDate: new Date(),
            location: 'location',
            description: 'new description',
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useDetailBans - hook', () => {
  const store = createStore(storeModel);

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseEditExclusionTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('location')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
