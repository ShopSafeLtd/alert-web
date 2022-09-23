import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ManageChat from '../ManageChatMember.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ManageChat
          onClose={jest.fn()}
          onSubmit={jest.fn()}
          addMemberUpdate={jest.fn()}
          loading={false}
          usersData={[]}
          saving={false}
          addMember={false}
          toggleAddMember={jest.fn()}
          membersData={[]}
          deleteConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
