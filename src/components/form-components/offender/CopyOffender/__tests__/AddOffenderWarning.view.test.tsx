import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddOffenderWarning from '../AddOffenderWarning.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddOffenderWarning
          onSubmit={jest.fn()}
          saving={false}
          onClose={jest.fn()}
          userSchemes={[]}
          schemeId=""
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
