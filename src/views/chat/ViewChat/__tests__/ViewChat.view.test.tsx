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
          updatedAt: '2022-08-11T10:40:09.985Z',
          user: {
            id: 'userId',
            fullName: 'test user',
            firstLetter: 't',
            organisation: 'test organisation',
          },
          chat: {
            id: 'chatId',
            name: 'name',
            totalMembers: 1,
            firstLetter: 'a',
            messages: [
              {
                id: 'messageId',
                createdAt: '2022-08-11T10:40:09.985Z',
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
              addChat={false}
              toggleAddChat={jest.fn()}
              updateAddUserChat={jest.fn()}
              updateDeletedUserChat={jest.fn()}
              adminRights={false}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(getByText('Chat Groups')).toBeInTheDocument();
  });
});
