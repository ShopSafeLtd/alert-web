import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { IncidentSort, storeModel } from 'state';
import { createStore, StoreProvider } from 'easy-peasy';
import { ImagePosition, Role } from 'graphql/generated';
import { MockedProvider } from '@apollo/client/testing';
import IncidentFeed from '../IncidentFeed.view';

describe('Detail Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: {
        role: Role.User,
        groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      },
      data: {
        incidents: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
            crimeTypes: [
              { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
            ],
          },
          order: IncidentSort.createdAtAsc,
        },
      },
    },
    mockActions: true,
  });
  const data = {
    listIncidents: {
      total: 1,
      incidents: [
        {
          id: 'incidentId',
          date: '2022-08-10T10:40:06.191Z',
          time: '2022-08-11T10:40:09.985Z',
          dayTime: '11:40 - Wed 10, Aug 22',
          description: 'test description',
          location: null,
          createdBy: {
            fullName: 'aaa',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            businesses: [{ name: 'test business', id: '' }],
          },
          crimeTypes: [
            { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
          ],
          groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
          images: [
            {
              id: 'cl6owsuzo33227f9pe9zk4wone',
              position: ImagePosition.CenterCenter,
              rotation: 0,
            },
          ],
          offenders: [],
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <IncidentFeed
              setCreatedAtFilter={jest.fn()}
              setIncidentDateFilter={jest.fn()}
              lightBoxOpen={{
                open: false,
                index: 0,
              }}
              businesses={[]}
              businessesFilter={[]}
              businessesLoading={false}
              clearFilters={jest.fn()}
              crimeTypesFilter={[]}
              gallery={[]}
              goods={[]}
              goodsLoading={false}
              goodsFilter={[]}
              groupsFilter={[]}
              peculiarities=""
              setBusinessesFilter={jest.fn()}
              setGallery={jest.fn()}
              sortFilter={false}
              setCrimeTypesFilter={jest.fn()}
              setGroupsFilter={jest.fn()}
              setPeculiarities={jest.fn()}
              setGoodsFilter={jest.fn()}
              toggleSortFilter={jest.fn()}
              data={data}
              loading={false}
              lightboxElements={[]}
              openLightbox={jest.fn()}
              onPaginationChange={jest.fn()}
              pagination={{
                page: 1,
                pageSize: 1,
                sizeOptions: [],
              }}
              order={IncidentSort.createdAtAsc}
              setOrder={jest.fn()}
              search=""
              setSearch={jest.fn()}
              groups={[]}
              groupsLoading={false}
              crimeTypes={[]}
              tagsLoading={false}
              updateIncidentList={jest.fn()}
              onNavigate={jest.fn()}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(getByText('Add Incident')).toBeInTheDocument();
  });
});
