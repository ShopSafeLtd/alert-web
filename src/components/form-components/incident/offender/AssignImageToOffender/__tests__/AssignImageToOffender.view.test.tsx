import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AssignImageToOffender from '../AssignImageToOffender.view';

describe('Detail Officer View', () => {
  const offenderData = [
    {
      id: 'offenderId',
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
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        organisation: 'ShopSafe',
      },
      groups: undefined,
      images: [
        {
          id: 'cl6owsuzo33227f9pe9zk4wone',
          optimised: null,
          url: null,
        },
      ],
      imageUid: undefined,
    },
  ];

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AssignImageToOffender
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={offenderData}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
