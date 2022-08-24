import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddUser from '../AddUser.view';

describe('Detail Officer View', () => {
  const groupsData = {
    groups: [{ id: 'groupId', name: 'groupName', description: null }],
  };
  const chatsData = {
    chats: [{ id: 'chatId', name: 'chatName', description: null }],
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddUser
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          groupsData={groupsData}
          groupsLoading={false}
          chatsData={chatsData}
          chatsLoading={false}
          saving={false}
          onValuesChange={jest.fn()}
          existingUser={false}
          form={[]}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
