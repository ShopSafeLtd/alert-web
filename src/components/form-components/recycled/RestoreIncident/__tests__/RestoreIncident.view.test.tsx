import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RestoreIncident from '../RestoreIncident.view';

describe('List Officer View', () => {
  const data = {
    recycledItem: {
      id: 'recycledId',
      systemTask: false,
      offender: {
        id: 'offenderId',
        gender: null,
        name: 'test offender',
        race: null,
        recycled: true,
        incidents: [],
      },
      incident: {
        id: 'incidentId',
        date: new Date('2022-07-25T08:57:55.299Z'),
        recycled: false,
        subject: 'test subject',
        createdBy: {
          fullName: 'aaa',
          id: 'cl4pe3eu91312371op4c4k2lih2',
          businesses: [{ name: 'user business', id: '' }],
        },
        location: null,
        offender: null,
        scheme: { id: 'schemeId' },
      },
      scheme: { id: 'schemeId' },
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RestoreIncident
          data={data}
          loading={false}
          onSubmit={jest.fn()}
          saving={false}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Delete Now')).toBeInTheDocument();
  });
});
