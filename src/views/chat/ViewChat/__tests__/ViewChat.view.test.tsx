import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import { MockedProvider } from '@apollo/client/testing';
import { storeModel } from 'state';
import ViewChat from '../ViewChat.view';
import { UserChatsQuery } from '../../../../graphql/generated';

describe('Detail Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      user: { id: 'userId' },
      scheme: { id: 'schemeId' },
    },
  });
  const data: UserChatsQuery = {
    user: {
      id: 'userId',
      chats: [
        {
          createdAt: '2022-08-11T10:40:09.985Z',
          id: 'userChatId',
          updatedAt: '2022-08-11T10:40:09.985Z',
          user: {
            id: 'userId',
            fullName: 'test user',
            firstLetter: 't',
          },
          chat: {
            id: 'chatId',
            name: 'name',
            totalMembers: 1,
            firstLetter: 'a',
            messages: [
              {
                images: [],
                offenders: [],
                incidents: [],
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
              loading={false}
              data={data}
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
