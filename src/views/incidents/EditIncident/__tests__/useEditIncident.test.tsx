import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import {
  SchemeGroupsDocument,
  TagsDocument,
  Model,
  ListOffendersDocument,
  Role,
  ViewIncidentDocument,
  UpdateIncidentDocument,
  SortOrder,
} from 'graphql/generated';
import { IncidentSort, storeModel } from 'state';
import useEditIncident from '../useEditIncident';

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
          date: '2022-08-30T11:25:32.702Z',
          time: '2022-08-30T11:25:32.702Z',
          dayTime: '11:25 - Tue 30, Aug 22',
          description: 'description',
          subject: 'subject ',
          location: {
            id: 'locationId',
            building: 'building',
            street: 'street',
            townCity: 'townCity',
            county: 'county',
            postcode: 'postcode',
            full: 'full address',
          },
          approved: true,
          value: 1,
          recoveredValue: 1,
          createdBy: {
            fullName: 'aaa',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            businesses: [{ name: 'test business', id: '' }],
          },
          crimeTypes: [{ id: 'tagId', name: 'Theft & Handling ' }],
          groups: [{ id: 'groupId', name: 'NightSafe' }],
          images: [
            {
              id: 'cl6owsuzo33227f9pe9zk4wone',
              optimised: 'optimised',
              url: 'url',
            },
          ],
          offenders: [],
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
        take: 20,
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
      },
    },
  },
  {
    request: {
      query: UpdateIncidentDocument,
      variables: {
        where: { id: 'incidentId' },
        data: {
          approved: { set: true },
          subject: { set: 'subject' },
          description: { set: 'description' },
          date: { set: '2022-08-30T11:25:32.702Z' },
          time: { set: '2022-08-30T11:25:32.702Z' },
          value: { set: 1 },
          recoveredValue: { set: 1 },
          location: {
            update: {
              building: { set: 'building' },
              street: { set: 'street' },
              townCity: { set: 'townCity' },
              county: { set: 'county' },
              postcode: { set: 'postcode' },
            },
          },
          groups: { set: [] },
          crimeTypes: { set: [{ id: 'tagId' }] },
          offenders: {
            connect: undefined,
            update: [],
            create: undefined,
            disconnect: undefined,
          },
          images: { upload: undefined, delete: [] },
        },
      },
    },
    result: {
      data: {
        updateIncident: {
          id: 'incidentId',
          date: '2022-08-30T11:25:32.702Z',
          time: '2022-08-30T11:25:32.702Z',
          dayTime: '11:25 - Tue 30, Aug 22',
          description: 'description',
          subject: 'subject ',
          location: {
            id: 'locationId',
            building: 'building',
            street: 'street',
            townCity: 'townCity',
            county: 'county',
            postcode: 'postcode',
            full: 'full address',
          },
          approved: true,
          value: 1,
          recoveredValue: 1,
          createdBy: {
            fullName: 'aaa',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            businesses: [{ name: 'test business', id: '' }],
          },
          crimeTypes: [{ id: 'tagId', name: 'Theft & Handling ' }],
          groups: [{ id: 'groupId', name: 'NightSafe' }],
          images: [
            {
              id: 'cl6owsuzo33227f9pe9zk4wone',
              optimised: 'optimised',
              url: 'url',
            },
          ],
          offenders: [],
        },
      },
    },
  },
];

const UseEditIncidentTest = () => {
  const {
    data,
    loading,
    groups,
    groupsLoading,
    crimeTypes,
    tagsLoading,
    recentOffenderData,
    recentOffenderLoading,
    onSubmit,
  } = useEditIncident({ incidentId: 'incidentId', reviewed: false });
  const Incident = data && (
    <div key={data.incident?.id}>
      <span>{data.incident?.id}</span>
      <span>{data.incident?.description}</span>
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
    crimeTypes &&
    crimeTypes.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));
  const RecentOffenders =
    recentOffenderData &&
    recentOffenderData.listOffenders?.offenders.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.createdAt}</span>
      </div>
    ));
  return (
    <div>
      {Incident}
      <span>{loading ? 'true' : 'false'}</span>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
      {Tags}
      <span>{tagsLoading ? 'true' : 'false'}</span>
      {RecentOffenders}
      <span>{recentOffenderLoading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            subject: 'subject',
            description: 'description',
            date: new Date('2022-08-30T11:25:32.702Z'),
            value: 1,
            recoveredValue: 1,
            business: {
              label: 'test',
              value: 'test',
            },
            groups: ['groupId'],
            tagsCrimeTypes: ['tagId'],
            tagsImpact: ['tagId'],
            tagsInvolved: ['tagId'],
            images: [
              {
                id: 'cl6owsuzo33227f9pe9zk4wone',
                optimised: 'optimised',
                url: 'url',
              },
            ],
            goods: [],
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
    const { findByText, getAllByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseEditIncidentTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('description')).toBeInTheDocument();
    expect(await findByText('Theft & Handling')).toBeInTheDocument();
    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(await findByText('2022-08-10T10:40:06.191Z')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(4);
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
