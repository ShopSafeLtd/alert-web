/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import {
  Age,
  Build,
  Gender,
  Height,
  Model,
  Race,
  Role,
  SchemeGroupsDocument,
  TagsDocument,
  UpdateOffenderDocument,
  ViewOffenderDocument,
} from 'graphql/generated';
import { OffenderSort, storeModel } from 'state';
import useEditOffender from '../useEditOffender';

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
          dateSource: null,
          dateOfBirth: null,
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
            },
          ],
          incidents: [],
          bans: [],
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
      query: UpdateOffenderDocument,
      variables: {
        where: {
          id: 'offenderId',
        },
        data: {
          approved: { set: true },
          name: { set: 'offenderName' },
          gender: { set: Gender.Unknown },
          race: { set: Race.Unknown },
          build: { set: Build.Unknown },
          hair: { set: 'hair' },
          peculiarities: { set: 'peculiarities' },
          age: { set: Age.Unknown },
          dateSource: { set: null },
          dateOfBirth: { set: null },
          groups: {
            set: [],
          },
          tags: {
            set: [{ id: 'tagId' }],
          },
          scheme: { connect: { id: 'schemeId' } },
          bans: {
            create: undefined,
            delete: undefined,
          },
          images: {
            upload: undefined,
            delete: [],
          },
        },
      },
    },
    result: {
      data: {
        updateOffender: {
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

const UseEditOffenderTest = () => {
  const { data, loading, groups, groupsLoading, tags, tagsLoading, onSubmit } =
    useEditOffender({ offenderId: 'offenderId', reviewed: false });
  const Offender = data && (
    <div key={data.offender?.id}>
      <span>{data.offender?.id}</span>
      <span>{data.offender?.updatedAt}</span>
    </div>
  );

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
      {Offender}
      <span>{loading ? 'true' : 'false'}</span>
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
            height: Height.Unknown,
            comment: 'comment',
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
            <UseEditOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('2022-08-11T10:40:09.985Z')).toBeInTheDocument();
    expect(await findByText('Theft & Handling')).toBeInTheDocument();
    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(3);
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
