import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition, IncidentPriority } from 'graphql/generated';
import LinkIncident from '../SelectIncidents.view';

describe('Detail Officer View', () => {
  const data = {
    total: 1,
    incidents: [
      {
        id: 'incidentId',
        subject: 'test subject',
        location: null,
        approved: null,
        dayTime: '11:40 - Wed 10, Aug 22',
        description: 'test description',
        priority: IncidentPriority.Normal,
        crimeTypes: [
          { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' },
        ],
        groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
        images: [
          {
            id: 'cl6owsuzo33227f9pe9zk4wone',
            position: ImagePosition.CenterCenter,
            rotation: 0,
            low: '',
            primary: false,
          },
        ],
        offenders: [],
        business: {
          name: '',
        },
        createdByUser: false,
        customerRef: '',
        totalImages: 0,
      },
    ],
  };
  const variables = {
    search: '',
    crimeTypes: [],
    groups: [],
    businesses: [],
    createdAt: undefined,
    priority: [IncidentPriority.Normal],
    incidentDate: undefined,
    goods: [],
    gallery: [],
    peculiarities: '',
    compactView: false,
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LinkIncident
          onSelect={jest.fn()}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={data}
          loading={false}
          saving={false}
          search=""
          setSearch={jest.fn()}
          onPaginationChange={jest.fn()}
          setPeculiarities={jest.fn()}
          setGroupsFilter={jest.fn()}
          businesses={[]}
          goods={[]}
          setCrimeTypesFilter={jest.fn()}
          setGoodsFilter={jest.fn()}
          setBusinessesFilter={jest.fn()}
          goodsLoading={false}
          businessesLoading={false}
          variables={variables}
          groups={[]}
          groupsLoading={false}
          crimeTypes={[]}
          tagsLoading={false}
          clearFilters={jest.fn()}
          pagination={{ page: 1, pageSize: 1, sizeOptions: ['12'] }}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
