import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import schemeModel from 'state/scheme-model';
import { MemoryRouter } from 'react-router-dom';
import { Role, ViewIncidentDocument } from 'graphql/generated';
import useViewIncident from '../useViewIncident';

const mocks = [
  {
    request: {
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: 'incidentId',
        },
      },
    },
    result: {
      data: {
        incident: {
          id: 'incidentId',
          date: '2022-08-10T10:40:06.191Z',
          time: '2022-08-11T10:40:09.985Z',
          dayTime: '11:40 - Wed 10, Aug 22',
          description: 'test description',
          location: null,
          createdBy: {
            fullName: 'aaa',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            organisation: 'ShopSafe',
          },
          crimeTypes: [
            { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
          ],
          groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
          images: [{ id: 'cl6owsuzo33227f9pe9zk4wone' }],
          offenders: [],
        },
      },
    },
  },
];

const UseViewIncidentTest = () => {
  const { data, loading } = useViewIncident('incidentId');
  const Group = data && (
    <div key={data.incident?.id}>
      <span>{data.incident?.id}</span>
      <span>{data.incident?.subject}</span>
      <span>{data.incident?.description}</span>
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
  const store = createStore(schemeModel, {
    initialState: {
      id: 'incidentId',
      user: { role: Role.User },
    },
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseViewIncidentTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test description')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
