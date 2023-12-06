import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddChat from '../AddChat.view';
import { UserStatus } from '../../../../../graphql/generated';

describe('Detail Officer View', () => {
  const usersData = {
    users: [
      {
        id: 'userId',
        fullName: 'testUser',
        origName: 'testUser',
        email: 'user email',
        publicName: true,
        reportToAllBusinesses: false,
        businesses: [{ name: 'user business', id: '', fullName: '' }],
        status: UserStatus.Active,
        groups: [{ id: 'groupId', name: 'test group' }],
        schemes: [],
        approverGroups: [],
        firstLetter: 'A',
        origFirstLetter: 'A',
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddChat
          form={{} as any}
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
