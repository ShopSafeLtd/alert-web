import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import {
  RecycledItemDocument,
  RestoreOffenderDocument,
} from 'graphql/generated';
import useRestoreOffender from '../useRestoreOffender';

const mocks = [
  {
    request: {
      query: RecycledItemDocument,
      variables: {
        where: {
          offenderId: 'offenderId',
        },
      },
    },
    result: {
      data: {
        recycledItem: {
          id: 'recycledId',
          systemTask: false,
          offender: {
            id: 'offenderId',
            gender: null,
            name: 'test offender',
            race: null,
            recycled: true,
            incidents: null,
          },
          incident: null,
          scheme: { id: 'schemeId' },
        },
      },
    },
  },
  {
    request: {
      query: RestoreOffenderDocument,
      variables: {
        id: 'offenderId',
        recycledId: 'recycledId',
      },
    },
    result: {
      data: {
        restoreOffender: {
          id: 'offenderId',
          recycledId: 'recycledId',
        },
      },
    },
  },
];

const UseRestoreOffenderTest = () => {
  const { data, loading, onSubmit } = useRestoreOffender({
    onClose: jest.fn(),
    offenderId: 'offenderId',
    recycledId: 'recycledId',
    updateRestore: jest.fn(),
    updateDelete: jest.fn(),
  });
  const Tags = data && (
    <div key={data.recycledItem?.offender?.id}>
      <span>{data.recycledItem?.offender?.id}</span>
      <span>{data.recycledItem?.offender?.name}</span>
    </div>
  );

  return (
    <div>
      {Tags}
      <span>{loading ? 'true' : 'false'}</span>
      <button type="button" onClick={() => onSubmit()}>
        submit
      </button>
    </div>
  );
};

describe('useListTags - hook', () => {
  const store = createStore(storeModel);
  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseRestoreOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test offender')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Restored!')).toBeInTheDocument();
  });
});
