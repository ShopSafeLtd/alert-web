import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RestoreOffender from '../RestoreOffender.view';
import { RecycledItemQuery } from 'graphql/recycled/queries/__generated__/recycled-item.generated';

describe('List Officer View', () => {
  const data: RecycledItemQuery = {
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
        subject: 'test subject',
        recycled: true,
        date: '2022-08-10T10:40:06.191Z' as unknown as Date,
        location: null,
        createdBy: {
          fullName: 'aaa',
          id: 'cl4pe3eu91312371op4c4k2lih2',
          businesses: [{ name: 'user business', id: '' }],
        },
      },
      scheme: { id: 'schemeId' },
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RestoreOffender
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
