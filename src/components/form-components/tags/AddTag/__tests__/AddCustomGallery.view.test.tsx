import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddOffenderWarning from '../AddTag.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddOffenderWarning
          onSubmit={jest.fn()}
          saving={false}
          onClose={jest.fn()}
          description={''}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
