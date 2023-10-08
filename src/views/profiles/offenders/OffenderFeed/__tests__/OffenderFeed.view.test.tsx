import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { OffenderSort, storeModel } from 'state';
import { createStore, StoreProvider } from 'easy-peasy';
import { ImagePosition, Role } from 'graphql/generated';
import { MockedProvider } from '@apollo/client/testing';
import OffenderFeed from '../OffenderFeed.view';

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
        offenders: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
            tags: [
              { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
            ],
          },
          order: OffenderSort.updatedAtAsc,
        },
      },
    },
    mockActions: true,
  });
  const data = {
    listOffenders: {
      total: 1,
      offenders: [
        {
          id: 'offenderId',
          createdAt: new Date('2022-07-25T08:57:55.299Z'),
          updatedAt: new Date('2022-07-25T08:57:55.299Z'),
          age: null,
          build: null,
          dateOfBirth: null,
          dateSource: null,
          hair: null,
          gender: null,
          name: 'offender name',
          race: null,
          peculiarities: null,
          approved: null,
          active: null,
          createdBy: {
            fullName: 'aaa',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            businesses: [{ name: 'test business', id: '' }],
          },
          tags: [
            { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
          ],
          groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
          images: [
            {
              id: 'cl6owsuzo33227f9pe9zk4wone',
              optimised: null,
              url: null,
              position: ImagePosition.CenterCenter,
              rotation: 0,
            },
          ],
          incidents: [],
        },
      ],
    },
  };
  const customGalleriesData = {
    listCustomGalleries: {
      total: 1,
      customGalleries: [
        {
          description: '',
          groups: [],
          id: 'climwxd55000tup0vezppswfi',
          name: 'new test 3',
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <OffenderFeed
              lightBoxOpen={{
                open: false,
                index: 0,
              }}
              variables={{
                search: '',
                warnings: [],
                groups: [],
                businesses: [],
                createdAt: undefined,
                gallery: [],
                customGalleries: [],
                peculiarities: '',
                hair: '',
                ethnicity: [],
                build: [],
                age: [],
                sex: [],
              }}
              businessesLoading={false}
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
              order={OffenderSort.updatedAtAsc}
              setOrder={jest.fn()}
              setSearch={jest.fn()}
              groups={[]}
              groupsLoading={false}
              tags={[]}
              tagsLoading={false}
              updateOffenderList={jest.fn()}
              onNavigate={jest.fn()}
              sortFilter
              toggleSortFilter={jest.fn()}
              clearFilters={jest.fn()}
              setAge={jest.fn()}
              setBuild={jest.fn()}
              setEthnicity={jest.fn()}
              setGallery={jest.fn()}
              setGroupsFilter={jest.fn()}
              setHair={jest.fn()}
              setPeculiarities={jest.fn()}
              setSex={jest.fn()}
              setWarnings={jest.fn()}
              businessData={{ listBusinesses: { businesses: [], total: 0 } }}
              setBusinesses={jest.fn()}
              setCreatedAtFilter={jest.fn()}
              customGalleriesData={customGalleriesData}
              adminRights={false}
              onSelectCustomGalleries={jest.fn()}
              onSelectGallery={jest.fn()}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(getByText('Add Offender')).toBeInTheDocument();
  });
});
