import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition } from 'graphql/generated';
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
        date: '2022-08-10T10:40:06.191Z' as unknown as Date,
        time: '2022-08-11T10:40:09.985Z',
        dayTime: '11:40 - Wed 10, Aug 22',
        description: 'test description',
        createdBy: {
          fullName: 'aaa',
          id: 'cl4pe3eu91312371op4c4k2lih2',
          businesses: [{ name: 'user business', id: '' }],
        },
        crimeTypes: [
          { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' },
        ],
        groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
        images: [
          {
            id: 'cl6owsuzo33227f9pe9zk4wone',
            optimised: null,
            url: 'htt',
            position: ImagePosition.CenterCenter,
            rotation: 0,
          },
        ],
        offenders: [],
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

            crimeTypes: [],
            groups: [],
            businesses: [],
            goods: [],
            createdAt: undefined,
            incidentDate: undefined,
            gallery: [],
            peculiarities: '',
            compactView: false,
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
