import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddCrimeType from '../AddCrimeType.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddCrimeType onSubmit={jest.fn()} saving={false} onClose={jest.fn()} />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
