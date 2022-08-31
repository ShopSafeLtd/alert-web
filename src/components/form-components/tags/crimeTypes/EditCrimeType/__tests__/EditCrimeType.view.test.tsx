import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditCrimeType from '../EditCrimeType.view';

describe('List Officer View', () => {
  const data = {
    tag: {
      id: 'incidentId',
      name: 'incident name',
      description: 'description',
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditCrimeType
          data={data}
          loading={false}
          onSubmit={jest.fn()}
          saving={false}
          onClose={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
