import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddPreviousLocation from '../AddPreviousLocation.view';

describe('Detail Officer View', () => {
  const data = [
    {
      id: 'addressId',
      building: null,
      county: null,
      full: 'street, town, s3 7ab',
      postcode: 's3 7ab',
      primary: false,
      street: 'street',
      townCity: 'town',
    },
  ];

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddPreviousLocation
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={{ addresses: data }}
          loading={false}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
