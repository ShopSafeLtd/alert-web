import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import IncidentTile from '../IncidentTile.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <IncidentTile
          incident={{ subject: 'incidentSubject', images: [] }}
          onClick={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('incidentSubject')).toBeInTheDocument();
  });
});
