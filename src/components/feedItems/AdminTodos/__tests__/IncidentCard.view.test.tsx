import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition } from 'graphql/generated';
import OffenderCard from '../AdminTodos.view';

describe('Detail Officer View', () => {
  const data = {
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
          deleteRights={false}
          menuRights={false}
          openLightbox={jest.fn()}
          onNavigate={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('INCIDENTS')).toBeInTheDocument();
  });
});
