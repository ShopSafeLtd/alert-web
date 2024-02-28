import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition, IncidentPriority } from 'graphql/generated';
import LinkIncident from '../LinkIncident.view';

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
          pagination={{
            page: 0,
            pageSize: 0,
            sizeOptions: [],
          }}
          variables={{
            search: '',
            priority: [IncidentPriority.Normal],
            crimeTypes: [],
            groups: [],
            businesses: [],
            goods: [],
            createdAt: undefined,
            incidentDate: undefined,
            gallery: [],
            peculiarities: '',
            compactView: false,
            tableView: false,
          }}
          clearFilters={function (): void {
            throw new Error('Function not implemented.');
          }}
          goods={[]}
          setGoodsFilter={function (value: string[]): void {
            throw new Error('Function not implemented.');
          }}
          businesses={[]}
          setBusinessesFilter={function (value: string[]): void {
            throw new Error('Function not implemented.');
          }}
          businessesLoading={false}
          goodsLoading={false}
          groups={[]}
          groupsLoading={false}
          crimeTypes={[]}
          tagsLoading={false}
          setGroupsFilter={function (value: string[]): void {
            throw new Error('Function not implemented.');
          }}
          setPeculiarities={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
          setCrimeTypesFilter={function (value: string[]): void {
            throw new Error('Function not implemented.');
          }}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
