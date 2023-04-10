import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AssignImageOffenders from '../AssignImageOffender.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AssignImageOffenders
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          image={undefined}
          offendersData={[]}
          toggleAddExistingOffender={jest.fn()}
          toggleAddOffender={jest.fn()}
          addExistingOffender={false}
          addOffender={false}
          onAddOffender={jest.fn()}
          selected={[]}
          toggleOffender={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Add Existing Offender')).toBeInTheDocument();
  });
});
