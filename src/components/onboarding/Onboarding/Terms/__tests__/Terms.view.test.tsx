import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Terms from '../Terms.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Terms
          onSubmit={jest.fn()}
          update={jest.fn()}
          saving={false}
          onBack={jest.fn()}
          setCurrent={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Terms of Use')).toBeInTheDocument();
  });
});
