import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';

import useRestoreIncident from '../useRestoreIncident';
import { RecycledItemDocument } from 'graphql/recycled/queries/recycled-item.generated';
import { RestoreIncidentDocument } from 'graphql/recycled/mutations/restore-incident.generated';

const mocks = [
  {
    request: {
      query: RecycledItemDocument,
      variables: {
        where: {
          incidentId: 'incidentId',
        },
      },
    },
    result: {
      data: {
        recycledItem: {
          id: 'recycledId',
          systemTask: false,
          incident: {
            id: 'incidentId',
            date: '2022-08-10T10:40:06.191Z',
            recycled: false,
            subject: 'test subject',
            location: null,
            createdBy: {
              fullName: 'aaa',
              id: 'cl4pe3eu91312371op4c4k2lih2',
              businesses: [{ name: 'user business', id: '' }],
            },
          },
          offender: null,
          scheme: { id: 'schemeId' },
        },
      },
    },
  },
  {
    request: {
      query: RestoreIncidentDocument,
      variables: {
        id: 'incidentId',
        recycledId: 'recycledId',
      },
    },
    result: {
      data: {
        restoreIncident: {
          id: 'incidentId',
          recycled: true,
        },
      },
    },
  },
];

const UseRestoreIncidentTest = () => {
  const { data, loading, onSubmit } = useRestoreIncident({
    onClose: jest.fn(),
    incidentId: 'incidentId',
    recycledId: 'recycledId',
    updateRestore: jest.fn(),
    updateDelete: jest.fn(),
  });
  const Tags = data && (
    <div key={data.recycledItem?.incident?.id}>
      <span>{data.recycledItem?.incident?.id}</span>
      <span>{data.recycledItem?.incident?.subject}</span>
      <button type="button" onClick={() => onSubmit()}>
        submit
      </button>
    </div>
  );

  return (
    <div>
      {Tags}
      <span>{loading ? 'true' : 'false'}</span>
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
            <UseRestoreIncidentTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test subject')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Restored!')).toBeInTheDocument();
  });
});
