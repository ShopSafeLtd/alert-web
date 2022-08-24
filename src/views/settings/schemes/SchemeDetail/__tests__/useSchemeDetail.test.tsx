import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import schemeModel from 'state/scheme-model';
import { MemoryRouter } from 'react-router-dom';
import { SchemeDocument } from 'graphql/generated';
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
];

const UseRecycledItemListTest = () => {
  const { data, loading } = useSchemeDetail();
  const Scheme = data && (
    <div key={data.scheme?.id}>
      <span>{data.scheme?.id}</span>
      <span>{data.scheme?.name}</span>
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
  const store = createStore(schemeModel, {
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

    expect(await findByText('test scheme')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
