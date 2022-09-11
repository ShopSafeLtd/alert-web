import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import { MockedProvider } from '@apollo/client/testing';
import { storeModel } from 'state';
import ViewChat from '../ViewChat.view';

describe('Detail Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      user: { id: 'userId' },
      scheme: { id: 'schemeId' },
    },
  });
  const data = {
    user: {
      id: 'userId',
      chats: [
        {
          id: 'userChatId',
          newMessage: false,
          chat: {
            id: 'chatId',
            name: 'name',
            firstLetter: 'a',
            messages: [
              {
                id: 'messageId',
                content: 'content',
                from: {
                  id: 'userId',
                  fullName: 'fullName',
                },
              },
            ],
          },
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <ViewChat
              data={data}
              loading={false}
              saving={false}
              handleMarkAsRead={jest.fn()}
              chatId="chatId"
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(getByText('Chat Groups')).toBeInTheDocument();
  });
});
