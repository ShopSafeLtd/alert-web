import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserList from '../UserList.view';

describe('List Officer View', () => {
  const data = {
    listUsers: {
      users: [
        {
          id: 'test userId',
          fullName: 'test user',
          origName: 'testUser',
          email: 'user.email',
          businesses: [],
          groups: [{ id: 'groupId', name: 'test group' }],
          publicName: true,
        },
      ],
      total: 1,
    },
  };
  const groupsData = {
    groups: [{ id: 'groupId', name: 'test group' }],
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          groupsData={groupsData}
          groupsLoading={false}
          selectedGroups={['']}
          setSelectedGroups={jest.fn()}
          addUser={false}
          toggleAddUser={jest.fn()}
          updateUserList={jest.fn()}
          updateExitingUserList={jest.fn()}
          currentPage={1}
          currentPageSize={30}
          onPaginationChange={jest.fn()}
          editUser=""
          toggleEditUser={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test user')).toBeInTheDocument();
  });
});
