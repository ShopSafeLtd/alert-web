/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { SchemeDocument, UpdateSchemeDocument } from 'graphql/generated';
import useSchemeDetail from '../useSchemeDetail';

const mocks = [
  {
    request: {
      query: SchemeDocument,
      variables: {
        where: {
          id: 'schemeId',
        },
      },
    },
    result: {
      data: {
        scheme: {
          id: 'schemeId',
          name: 'test scheme',
          autoApproveIncidents: false,
          autoApproveOffenders: false,
          incidentRetention: 1,
          offenderRetention: 1,
          logo: null,
        },
      },
    },
  },
  {
    request: {
      query: UpdateSchemeDocument,
      variables: {
        where: {
          id: 'schemeId',
        },
        data: {
          name: { set: 'new name' },
          autoApproveIncidents: { set: false },
          autoApproveOffenders: { set: false },
          incidentRetention: { set: 1 },
          offenderRetention: { set: 1 },
          logo: {},
        },
      },
    },
    result: {
      data: {
        updateScheme: {
          id: 'schemeId',
          name: 'new name',
          autoApproveIncidents: false,
          autoApproveOffenders: false,
          incidentRetention: 1,
          offenderRetention: 1,
          logo: null,
        },
      },
    },
  },
];

const UseRecycledItemListTest = () => {
  const { data, loading, onSubmit } = useSchemeDetail();
  const Scheme = data && (
    <div key={data.scheme?.id}>
      <span>{data.scheme?.id}</span>
      <span>{data.scheme?.name}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'new name',
            autoApproveIncidents: false,
            autoApproveOffenders: false,
            incidentRetention: 1,
            offenderRetention: 1,
            defaultIncidentEmail: true,
            defaultIncidentPush: true,
            defaultMessagePush: true,
            defaultOffenderEmail: true,
            defaultOffenderPush: true,
            defaultSubscribedIncidentOnly: true,
            defaultSubscribedOffenderOnly: true,
            defaultPublicOffenderDOB: true,
          })
        }
      >
        submit
      </button>
    </div>
  );
  return (
    <div>
      {Scheme}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListScheme - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: { id: 'schemeId' },
    },
  });
  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseRecycledItemListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test scheme')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
