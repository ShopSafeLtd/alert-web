import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import OffenderSkeletonCard from '../OffenderSkeletonCard.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <OffenderSkeletonCard />
      </MemoryRouter>
    );
    expect(getByText('INCIDENTS')).toBeInTheDocument();
  });
});
