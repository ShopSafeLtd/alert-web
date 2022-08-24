import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditOffender from '../EditOffender.view';

describe('List Officer View', () => {
  const data = {
    offender: {
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
        organisation: 'ShopSafe',
      },
      tags: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' }],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [
        {
          id: 'cl6owsuzo33227f9pe9zk4wone',
          optimised: null,
          url: null,
        },
      ],
      incidents: [],
      bans: [],
    },
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditOffender
          onSubmit={jest.fn()}
          data={data}
          loading={false}
          saving={false}
          groups={[]}
          groupsLoading={false}
          tags={[]}
          tagsLoading={false}
          imgChange={jest.fn()}
          fileList={[]}
          addOffenderTag={false}
          toggleAddOffenderTag={jest.fn()}
          updateOffenderTag={jest.fn()}
          addExclusion={false}
          toggleAddExclusion={jest.fn()}
          editExclusion={false}
          toggleEditExclusion={jest.fn()}
          updateExclusion={jest.fn()}
          banId=""
          setBanId={jest.fn()}
          deleteConfirm={jest.fn()}
          ageCheck={false}
          setAgeCheck={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Edit Offender')).toBeInTheDocument();
  });
});
