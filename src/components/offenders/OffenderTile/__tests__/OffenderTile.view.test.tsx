import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import OffenderTile from '../OffenderTile.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <OffenderTile
          offender={{ id: '', name: 'offenderName', images: [] }}
          onClick={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('offenderName')).toBeInTheDocument();
  });
});
