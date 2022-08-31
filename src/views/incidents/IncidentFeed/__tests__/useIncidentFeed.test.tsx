import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state/store';
import { MemoryRouter } from 'react-router-dom';
import {
  Role,
  ListIncidentsDocument,
  SchemeGroupsDocument,
  TagsDocument,
  Model,
  SortOrder,
  QueryMode,
} from 'graphql/generated';
import { IncidentSort } from 'state';
import useIncidentFeed from '../useIncidentFeed';

const mocks = [
  {
    request: {
      query: ListIncidentsDocument,
      variables: {
        scheme: {
          id: 'schemeId',
        },
        order: {
          createdAt: SortOrder.Desc,
        },
        where: {
          crimeTypes: undefined,
          groups: undefined,
          OR: [
            {
              subject: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
            {
              createdBy: {
                OR: [
                  {
                    fullName: {
                      contains: '',
                      mode: QueryMode.Insensitive,
                    },
                  },
                  {
                    organisation: {
                      contains: '',
                      mode: QueryMode.Insensitive,
                    },
                  },
                ],
              },
            },
          ],
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
                organisation: 'ShopSafe',
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
      },
    },
  },
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
        },
      },
    },
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
];

const UseIncidentFeedTest = () => {
  const { data, loading, groups, groupsLoading, crimeTypes, tagsLoading } =
    useIncidentFeed();
  const ListIncidents =
    data &&
    data.listIncidents?.incidents.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.description}</span>
      </div>
    ));

  const Groups =
    groups &&
    groups.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));
  const Tags =
    crimeTypes &&
    crimeTypes.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));
  return (
    <div>
      {ListIncidents}
      <span>{loading ? 'true' : 'false'}</span>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Tags}
      <span>{tagsLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useIncidentFeed - hook', () => {
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
          order: IncidentSort.createdAtDesc,
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
            <UseIncidentFeedTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test description')).toBeInTheDocument();
    expect(await findByText('Theft & Handling')).toBeInTheDocument();
    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(3);
  });
});
