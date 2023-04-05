import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import IncidentSkeletonCard from '../ArticleSkeletonCard.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <IncidentSkeletonCard />
      </MemoryRouter>
    );
    expect(getByText('OFFENDERS')).toBeInTheDocument();
  });
});
