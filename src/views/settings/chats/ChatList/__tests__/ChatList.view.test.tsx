import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ChatList from '../ChatList.view';

describe('List Officer View', () => {
  const data = {
    chats: [
      {
        id: 'test',
        name: 'test Chat',
        description: null,
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ChatList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          addChat={false}
          toggleAddChat={jest.fn()}
          updateChatList={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test Chat')).toBeInTheDocument();
  });
});
