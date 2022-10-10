import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddNewOffender from '../AddNewOffender.view';

describe('Detail Officer View', () => {
  const groups = [{ value: 'groupId', label: 'groupName' }];
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddNewOffender
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          groups={groups}
          groupsLoading={false}
          saving={false}
          ageCheck={false}
          setAgeCheck={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
