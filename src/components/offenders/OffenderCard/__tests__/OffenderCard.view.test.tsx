import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition } from 'graphql/generated';
import OffenderCard from '../OffenderCard.view';

describe('Detail Officer View', () => {
  const data = {
    id: 'offenderId',
    createdAt: new Date('2022-07-25T08:57:55.299Z'),
    updatedAt: new Date('2022-07-25T08:57:55.299Z'),
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
      businesses: [{ name: 'user business', id: '' }],
    },
    tags: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' }],
    groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
    images: [
      {
        id: 'cl6owsuzo33227f9pe9zk4wone',
        optimised: null,
        url: null,
        position: ImagePosition.CenterCenter,
        rotation: 0,
      },
    ],
    incidents: [],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <OffenderCard
          offender={data}
          approvalRights={false}
          toggleAddInvestigation={jest.fn()}
          addInvestigation={false}
          deleteRights={false}
          menuRights={false}
          openLightbox={jest.fn()}
          onNavigate={jest.fn()}
          onDelete={jest.fn()}
          editOffenderFeed={false}
          toggleEditOffenderFeed={jest.fn()}
          editImage={false}
          toggleEditImage={jest.fn()}
          editImageId={'id'}
          setEditImageId={jest.fn()}
          onEditImage={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('INCIDENTS')).toBeInTheDocument();
  });
});
