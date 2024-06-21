import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ImagePosition } from 'graphql/types';
import AddExistingOffender from '../SelectOffenders.view';

describe('Detail Officer View', () => {
  const data = {
    total: 1,
    offenders: [
      {
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
        totalValue: 0,
        totalIncidents: 0,
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
      },
    ],
  };
  const offenderData = {
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
    totalValue: 0,
    totalIncidents: 0,
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
        <AddExistingOffender
          fetchMoreScroll={jest.fn()}
          onSubmit={jest.fn()}
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          openLightbox={jest.fn()}
          setCurrentId={jest.fn()}
          selectedOffender={offenderData}
          lightBoxOpen={{
            open: false,
            index: 0,
          }}
          age={[]}
          build={[]}
          clearFilters={jest.fn()}
          ethnicity={[]}
          hair={''}
          peculiarities=""
          setAge={jest.fn()}
          setBuild={jest.fn()}
          setEthnicity={jest.fn()}
          setHair={jest.fn()}
          setPeculiarities={jest.fn()}
          setSex={jest.fn()}
          sex={[]}
          onSelect={jest.fn()}
          selected={[]}
          onClose={jest.fn()}
          saving
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
