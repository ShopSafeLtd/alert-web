import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { Role, ViewOffenderDocument } from 'graphql/generated';
import useViewOffender from '../useViewOffender';

const mocks = [
  {
    request: {
      query: ViewOffenderDocument,
      variables: {
        where: {
          id: 'offenderId',
        },
      },
    },
    result: {
      data: {
        offender: {
          id: 'offenderId',
          createdAt: '2022-08-10T10:40:06.191Z',
          updatedAt: '2022-08-11T10:40:09.985Z',
          age: null,
          build: null,
          dateOfBirth: null,
          dateSource: null,
          hair: null,
          gender: null,
          name: null,
          race: null,
          peculiarities: null,
          approved: null,
          active: null,
          createdBy: {
            fullName: 'aaa',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            organisation: 'ShopSafe',
          },
          tags: [
            { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
          ],
          groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
          images: [
            { id: 'cl6owsuzo33227f9pe9zk4wone', optimised: null, url: null },
          ],
          bans: [],
          incidents: [],
        },
      },
    },
  },
];

const UseViewOffenderTest = () => {
  const { data, loading } = useViewOffender('offenderId');
  const Group = data && (
    <div key={data.offender?.id}>
      <span>{data.offender?.id}</span>
      <span>{data.offender?.createdAt}</span>
    </div>
  );

  return (
    <div>
      {Group}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      id: 'offenderId',
      user: { role: Role.User },
    },
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseViewOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('2022-08-10T10:40:06.191Z')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
