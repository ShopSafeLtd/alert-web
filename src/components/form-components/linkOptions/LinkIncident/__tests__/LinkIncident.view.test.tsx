import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition } from 'graphql/generated';
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
            },
          ],
          offenders: [],
        },
      ],
    },
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
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
