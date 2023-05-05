import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { UserSort } from 'types/enums/user_sort';
import { Role } from 'graphql/generated';
import { UserStatus } from 'types/enums/user_status';
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
          approverGroups: [],
        },
      ],
      total: 1,
    },
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
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
          clearFilters={jest.fn()}
          groups={[]}
          order={UserSort.createdAtAsc}
          setOrder={jest.fn()}
          setUserRole={jest.fn()}
          setUserStatus={jest.fn()}
          sortFilter
          toggleSortFilter={jest.fn()}
          userRole={Role.SchemeAdmin}
          userStatus={UserStatus.ACTIVE}
        />
      </MemoryRouter>
    );
    expect(getByText('test user')).toBeInTheDocument();
  });
});
