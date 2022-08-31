import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RestoreIncident from '../RestoreIncident.view';

describe('List Officer View', () => {
  const data = {
    recycledItem: {
      id: 'recycledId',
      systemTask: false,
      incident: {
        id: 'incidentId',
        date: '2022-08-10T10:40:06.191Z',
        recycled: false,
        subject: 'test subject',
        createdBy: {
          fullName: 'aaa',
          id: 'cl4pe3eu91312371op4c4k2lih2',
          organisation: 'ShopSafe',
        },
        location: null,
        offender: null,
        scheme: { id: 'schemeId' },
      },
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
