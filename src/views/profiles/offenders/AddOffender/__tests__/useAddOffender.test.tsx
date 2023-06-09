import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import {
  Age,
  Gender,
  Race,
  Build,
  SchemeGroupsDocument,
  TagsDocument,
  Model,
  Role,
  CreateOffenderDocument,
  Height,
} from 'graphql/generated';
import { OffenderSort, storeModel } from 'state';
import useAddOffender from '../useAddOffender';

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
  {
    request: {
      query: CreateOffenderDocument,
      variables: {
        data: {
          name: 'offenderName',
          gender: 'UNKNOWN',
          race: 'UNKNOWN',
          build: 'UNKNOWN',
          hair: 'hair',
          peculiarities: 'peculiarities',
          age: 'UNKNOWN',
          dateSource: null,
          dateOfBirth: null,
          groups: { connect: [] },
          tags: { connect: [{ id: 'tagId' }] },
          scheme: 'schemeId',
          image: { upload: undefined },
          bans: undefined,
        },
      },
    },
    result: {
      data: {
        createOffender: {
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
            businesses: [{ name: 'test business', id: '' }],
          },
          tags: [
            { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
          ],
          groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
          images: [],
          bans: [],
          incidents: [],
        },
      },
    },
  },
];

const UseAddOffenderTest = () => {
  const { groups, groupsLoading, tags, tagsLoading, onSubmit } =
    useAddOffender();

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
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Tags}
      <span>{tagsLoading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'offenderName',
            gender: Gender.Unknown,
            race: Race.Unknown,
            build: Build.Unknown,
            hair: 'hair',
            peculiarities: 'peculiarities',
            age: Age.Unknown,
            groups: ['groupId'],
            tags: ['tagId'],
            customGalleries: [],
            height: Height.Unknown,
            comment: 'unknown',
          })
        }
      >
        submit
      </button>
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
        Offenders: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            search: '',
            groups: [],
            crimeTypes: [],
          },
          order: OffenderSort.updatedAtAsc,
        },
      },
    },
    mockActions: true,
  });
  it('returns the expected values', async () => {
    const { findByText, getAllByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('Theft & Handling')).toBeInTheDocument();
    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Added!')).toBeInTheDocument();
  });
});
