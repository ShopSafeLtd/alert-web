import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RestoreOffender from '../RestoreOffender.view';

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
        incident: null,
        scheme: { id: 'schemeId' },
      },
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
