import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TermList from '../TermList.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TermList />
      </MemoryRouter>
    );
    expect(getByText('User Terms')).toBeInTheDocument();
  });
});
