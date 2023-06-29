/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state/store';
import { MemoryRouter } from 'react-router-dom';
import {
  ListOffendersDocument,
  Model,
  QueryMode,
  Role,
  SchemeGroupsDocument,
  SortOrder,
  TagsDocument,
} from 'graphql/generated';
import { OffenderSort } from 'state';
import useOffenderFeed from '../useOffenderFeed';

const mocks = [
  {
    request: {
      query: ListOffendersDocument,
      variables: {
        scheme: {
          id: 'schemeId',
        },
        order: {
          updatedAt: SortOrder.Asc,
        },
        where: {
          tags: undefined,
          groups: undefined,
          OR: [
            {
              name: {
                contains: '',
                mode: QueryMode.Insensitive,
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
                businesses: [{ name: 'test business', id: '' }],
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
                  url: null,
                },
              ],
              incidents: [],
            },
          ],
        },
        take: 1,
        skip: 0,
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
            equals: Model.Offender,
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

const UseOffenderFeedTest = () => {
  const { data, loading, groups, groupsLoading, tags, tagsLoading } =
    useOffenderFeed();
  const ListOffenders =
    data &&
    data.listOffenders?.offenders.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.updatedAt}</span>
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
    tags &&
    tags.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));
  return (
    <div>
      {ListOffenders}
      <span>{loading ? 'true' : 'false'}</span>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Tags}
      <span>{tagsLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useOffenderFeed - hook', () => {
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
        offenders: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            search: '',
            groups: [],
            tags: [],
          },
          order: OffenderSort.updatedAtAsc,
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
            <UseOffenderFeedTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('2022-08-11T10:40:09.985Z')).toBeInTheDocument();
    expect(await findByText('Theft & Handling')).toBeInTheDocument();
    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(3);
  });
});
