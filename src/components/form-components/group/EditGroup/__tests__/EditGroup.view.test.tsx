import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditGroup from '../EditGroup.view';

describe('Detail Officer View', () => {
  const data = {
    group: {
      id: 'groupId',
      name: 'test group',
      description: null,
      approver: [],
      users: [
        {
          id: 'userId',
          fullName: 'test user',
          businesses: [{ id: '', name: 'test business', fullName: '' }],
        },
      ],
    },
  };
  const usersData = [
    {
      value: 'userId',
      label: 'testUser',
    },
  ];
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditGroup
          setSelectedUsers={jest.fn()}
          selectedUsers={[]}
          adminUsersData={usersData}
          key={data.group.id}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          onUsersOptionsChange={jest.fn()}
          data={data}
          loading={false}
          saving={false}
          showOffenderSettings={false}
          setShowOffenderSettings={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
