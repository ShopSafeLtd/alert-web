import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddGroup from '../AddGroup.view';

describe('Detail Officer View', () => {
  const usersData = [
    {
      value: 'userId',
      label: 'testUser',
    },
  ];

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddGroup
          adminUsersData={usersData}
          selectedUsers={[]}
          setSelectedUsers={jest.fn()}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          usersData={usersData}
          usersLoading={false}
          saving={false}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
