import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserTerms from '../UserTerms.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserTerms />
      </MemoryRouter>
    );
    expect(getByText('Terms of Use')).toBeInTheDocument();
  });
});
