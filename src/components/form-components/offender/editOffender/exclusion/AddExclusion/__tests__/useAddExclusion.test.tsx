import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { CreateBanDocument } from 'graphql/generated';
import useAddExclusion from '../useAddExclusion';

const mocks = [
  {
    request: {
      query: CreateBanDocument,
      variables: {
        data: {
          startDate: new Date('2022-08-30T11:25:32.702Z'),
          endDate: new Date('2022-08-31T11:25:32.702Z'),
          location: 'location',
          description: 'new description',
          scheme: {
            connect: {
              id: 'schemeId',
            },
          },
          createdBy: { connect: { id: 'userId' } },
          offender: { connect: { id: 'offenderId' } },
        },
      },
    },
    result: {
      data: {
        createBan: {
          id: 'banId',
          active: false,
          startDate: '2022-08-30T11:25:32.702Z',
          endDate: '2022-08-31T11:25:32.702Z',
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
];

const UseAddExclusionTest = () => {
  const { onSubmit } = useAddExclusion({
    onClose: jest.fn(),
    update: jest.fn(),
    offenderId: 'offenderId',
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            startDate: new Date('2022-08-30T11:25:32.702Z'),
            endDate: new Date('2022-08-31T11:25:32.702Z'),
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
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
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
            <UseAddExclusionTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Added!')).toBeInTheDocument();
  });
});
