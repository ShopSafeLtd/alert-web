import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { IncidentSort, storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { ListIncidentsDocument, QueryMode, SortOrder } from 'graphql/generated';
import useLinkIncident from '../useLinkIncident';

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
        where: {
          id: {
            notIn: [],
          },
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
      },
    },
    result: {
      data: {
        listIncidents: {
          total: 1,
          incidents: [
            {
              id: 'incidentId',
              subject: 'test subject',
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
];

const UseLinkIncidentTest = () => {
  const { data, loading, onSubmit } = useLinkIncident({
    onClose: jest.fn(),
    update: jest.fn(),
    incidentIds: [],
  });
  const ListIncidents =
    data &&
    data.listIncidents?.incidents.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.subject}</span>
      </div>
    ));

  return (
    <div>
      {ListIncidents}
      <span>{loading ? 'true' : 'false'}</span>
      <button type="button" onClick={() => onSubmit('incidentId')}>
        submit
      </button>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      data: {
        incidents: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            search: '',
            groups: [],
            tags: [],
          },
          order: IncidentSort.createdAtAsc,
        },
      },
    },
    mockActions: true,
  });

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseLinkIncidentTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test subject')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
