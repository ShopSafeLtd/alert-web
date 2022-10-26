import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import LinkIncident from '../LinkIncident.view';

describe('Detail Officer View', () => {
  const data = {
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
          groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
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
  };
  const incidentData = {
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
    crimeTypes: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' }],
    groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
    images: [
      {
        id: 'cl6owsuzo33227f9pe9zk4wone',
        optimised: null,
        url: 'htt',
      },
    ],
    offenders: [],
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LinkIncident
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={data}
          loading={false}
          saving={false}
          search=""
          setSearch={jest.fn()}
          openLightbox={jest.fn()}
          onPaginationChange={jest.fn()}
          setCurrentId={jest.fn()}
          selectedIncident={incidentData}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
