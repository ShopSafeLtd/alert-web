import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { OffenderSort, storeModel } from 'state';
import { createStore, StoreProvider } from 'easy-peasy';
import { Role } from 'graphql/generated';
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
          createdAt: '2022-08-10T10:40:06.191Z',
          updatedAt: '2022-08-11T10:40:09.985Z',
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
            organisation: 'ShopSafe',
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
            },
          ],
          incidents: [],
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
              data={data}
              loading={false}
              lightboxElements={[]}
              openLightbox={jest.fn()}
              onPaginationChange={jest.fn()}
              pagination={{ page: 1, pageSize: 1, sizeOptions: [] }}
              order={OffenderSort.updatedAtAsc}
              variables={{ groups: [], tags: [] }}
              setOrder={jest.fn()}
              search=""
              setSearch={jest.fn()}
              groups={[]}
              groupsLoading={false}
              onGroupsChange={jest.fn()}
              tags={[]}
              onTagsChange={jest.fn()}
              tagsLoading={false}
              updateOffenderList={jest.fn()}
              onNavigate={jest.fn()}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(getByText('Add Offender')).toBeInTheDocument();
  });
});
