import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ViewIncident from '../ViewIncident.view';

describe('Detail Officer View', () => {
  const data = {
    incident: {
      id: 'incidentId',
      date: '2022-08-10T10:40:06.191Z',
      time: '2022-08-11T10:40:09.985Z',
      dayTime: '11:40 - Wed 10, Aug 22',
      description: 'test description',
      location: null,
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        organisation: 'ShopSafe',
      },
      crimeTypes: [
        { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
      ],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [{ id: 'cl6owsuzo33227f9pe9zk4wone' }],
      offenders: [],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ViewIncident
          data={data}
          loading={false}
          saving={false}
          openLightbox={jest.fn()}
          addOffenderRights={false}
          incidentId=""
          deleteRights={false}
          editRights={false}
          onDelete={jest.fn()}
          addExistingOffender={false}
          toggleAddExistingOffender={jest.fn()}
          updateOffenderList={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test description')).toBeInTheDocument();
  });
});
