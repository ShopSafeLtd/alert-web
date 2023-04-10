import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddExclusion from '../AddExclusion.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddExclusion
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          saving={false}
          setStartDate={jest.fn()}
          disabledDate={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
