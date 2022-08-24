import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import {
  SchemeGroupsDocument,
  TagsDocument,
  Model,
  ListOffendersDocument,
  Role,
  AddressesDocument,
} from 'graphql/generated';
import { IncidentSort, storeModel } from 'state';
import useAddIncident from '../useAddIncident';

const mocks = [
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
        },
      },
    },
    skip: false,
    result: {
      data: {
        groups: [
          {
            id: 'ckqtnb4r056540229myw4yk8zvq',
            name: 'NightSafe',
            description: null,
          },
        ],
      },
    },
  },
  {
    request: {
      query: AddressesDocument,
      variables: {
        where: {
          user: { id: { equals: 'userId' } },
        },
      },
    },
    result: {
      data: {
        addresses: [
          {
            building: '',
            county: '',
            full: 'street, town, s3 7ab',
            id: 'cl6bx5p7z466891oo46r05hkby',
            postcode: 's3 7ab',
            primary: true,
            street: 'street',
            townCity: 'town',
          },
        ],
      },
    },
  },
  {
    request: {
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
          dataType: {
            equals: Model.Incident,
          },
        },
      },
    },
    result: {
      data: {
        tags: [
          {
            id: 'ckdhdhmr500186mnyy5k9sunm',
            name: 'Theft & Handling ',
            description: 'description',
          },
        ],
      },
    },
  },
  {
    request: {
      query: ListOffendersDocument,
      variables: {
        scheme: { id: 'schemeId' },
      },
    },
    result: {
      data: {
        listOffenders: {
          total: 1,
          offenders: [
            {
              id: 'incidentId',
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
              groups: [
                { id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' },
              ],
              images: [
                {
                  id: 'cl6owsuzo33227f9pe9zk4wone',
                  optimised: null,
                  // url: null,
                },
              ],
              bans: [],
              incidents: [],
            },
          ],
        },
      },
    },
  },
];

const UseAddIncidentTest = () => {
  const {
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    primaryAddress,
    addressLoading,
  } = useAddIncident();

  const Groups =
    groups &&
    groups.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));

  const Addresses = primaryAddress && (
    <div key={primaryAddress.id}>
      <span>{primaryAddress.id}</span>
      <span>{primaryAddress.postcode}</span>
    </div>
  );

  const Tags =
    tags &&
    tags.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));

  return (
    <div>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Addresses}
      <span>{addressLoading ? 'true' : 'false'}</span>
      {Tags}
      <span>{tagsLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListUsers - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: {
        id: 'userId',
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
    const { findByText, getAllByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddIncidentTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('s3 7ab')).toBeInTheDocument();
    expect(await findByText('Theft & Handling')).toBeInTheDocument();
    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(3);
  });
});
