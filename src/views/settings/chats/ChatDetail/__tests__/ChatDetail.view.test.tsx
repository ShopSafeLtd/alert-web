import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ChatDetail from '../ChatDetail.view';

describe('Detail Officer View', () => {
  const data = {
    chat: {
      id: 'test ChatId',
      name: 'test Chat',
      members: [
        {
          id: 'userChatId',
          user: {
            id: 'test userId',
            fullName: 'test user',
            businesses: [{ name: 'test business', id: '' }],
          },
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ChatDetail
          data={data}
          loading={false}
          editChat={false}
          toggleEditChat={jest.fn()}
          saving={false}
          deleteConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test Chat')).toBeInTheDocument();
  });
});
