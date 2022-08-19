import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SchemeTerms from '../SchemeTerms.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SchemeTerms />
      </MemoryRouter>
    );
    expect(getByText('Terms of Use')).toBeInTheDocument();
  });
});
