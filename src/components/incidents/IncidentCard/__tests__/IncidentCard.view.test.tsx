import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition } from 'graphql/generated';
import IncidentCard from '../IncidentCard.view';

describe('Detail Officer View', () => {
  const data = {
    id: 'incidentId',
    subject: 'test subject ',
    location: null,
    approved: null,
    date: '2022-08-10T10:40:06.191Z',
    time: '2022-08-11T10:40:09.985Z',
    dayTime: '11:40 - Wed 10, Aug 22',
    description: 'test description',
    createdByUser: false,
    crimeTypes: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' }],
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
    totalImages: 0,
    offenders: [],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <IncidentCard
          incident={data}
          toggleAddInvestigation={jest.fn()}
          addInvestigation={false}
          approvalRights={false}
          deleteRights={false}
          menuRights={false}
          openLightbox={jest.fn()}
          onDelete={jest.fn()}
          editIncidentFeed={false}
          toggleEditIncidentFeed={jest.fn()}
          editImage={false}
          toggleEditImage={jest.fn()}
          editImageId={'id'}
          setEditImageId={jest.fn()}
          onEditImage={jest.fn()}
          compactView
        />
      </MemoryRouter>
    );
    expect(getByText('OFFENDERS')).toBeInTheDocument();
  });
});
