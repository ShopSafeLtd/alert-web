import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state/store';
import { MemoryRouter } from 'react-router-dom';
import { Role, ListIncidentsDocument, SortOrder } from 'graphql/generated';
import { IncidentSort } from 'state';
import useIncidentSideList from '../useIncidentSideList';

const mocks = [
  {
    request: {
      query: ListIncidentsDocument,
      variables: {
        scheme: {
          id: 'schemeId',
        },
        order: {
          createdAt: SortOrder.Asc,
        },
        take: 1,
        skip: 0,
      },
    },
    result: {
      data: {
        listIncidents: {
          total: 1,
          incidents: [
            {
              id: 'incidentId',
              subject: 'test subject ',
              location: null,
              approved: null,
              date: '2022-08-10T10:40:06.191Z',
              time: '2022-08-11T10:40:09.985Z',
              dayTime: '11:40 - Wed 10, Aug 22',
              description: 'test description',
              createdBy: {
                fullName: 'aaa',
                id: 'cl4pe3eu91312371op4c4k2lih2',
                businesses: [{ name: 'user business', id: '' }],
              },
              crimeTypes: [
                { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' },
              ],
              groups: [
                { id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' },
              ],
              images: [
                {
                  id: 'cl6owsuzo33227f9pe9zk4wone',
                  optimised: null,
                  url: 'htt',
                },
              ],
              offenders: [],
            },
          ],
        },
        take: 1,
        skip: 0,
      },
    },
  },
];

const UseIncidentSideListTest = () => {
  const { data } = useIncidentSideList();
  const ListIncidents =
    data &&
    data.listIncidents?.incidents.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.description}</span>
      </div>
    ));

  return <div>{ListIncidents}</div>;
};

describe('useIncidentSideList - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: {
        role: Role.SchemeAdmin,
        groups: [],
      },
      data: {
        incidents: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            search: '',
            groups: [],
            crimeTypes: [],
          },
          order: IncidentSort.createdAtAsc,
        },
      },
    },
    mockActions: true,
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseIncidentSideListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test description')).toBeInTheDocument();
  });
});
