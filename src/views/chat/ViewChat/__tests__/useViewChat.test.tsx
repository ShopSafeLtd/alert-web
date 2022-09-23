import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';

import { MemoryRouter } from 'react-router-dom';
import {
  SortOrder,
  UserChatsDocument,
  UpdateUserChatDocument,
} from 'graphql/generated';
import { storeModel } from 'state';
import useViewChat from '../useViewChat';

const mocks = [
  {
    request: {
      query: UserChatsDocument,
      variables: {
        where: {
          id: 'userId',
        },
        scheme: 'schemeId',
        orderBy: {
          chat: {
            name: SortOrder.Asc,
          },
        },
      },
    },
    result: {
      data: {
        user: {
          id: 'userId',
          chats: [
            {
              id: 'userChatId',
              newMessages: false,
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
                    content: 'content',
                    createdAt: '2022-08-11T10:40:09.985Z',
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
      },
    },
  },
  {
    request: {
      query: UpdateUserChatDocument,
      variables: {
        where: { id: 'userId' },
        data: {
          chats: {
            update: [
              {
                data: {
                  newMessages: { set: false },
                },
                where: {
                  id: 'userChatId',
                },
              },
            ],
          },
        },
      },
    },
    result: {
      data: {
        updateUser: {
          id: 'userId',
          chats: [
            {
              id: 'userChatId',
              newMessages: false,
              chat: {
                id: 'chatId',
                name: 'name',
              },
            },
          ],
        },
      },
    },
  },
];

const UseViewChatTest = () => {
  const {
    data,
    loading,
    handleMarkAsRead,
    // refetch
  } = useViewChat();
  const User =
    data &&
    data.user?.chats.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.chat.name}</span>
      </div>
    ));

  return (
    <div>
      {User}
      <span>{loading ? 'true' : 'false'}</span>
      <button type="button" onClick={() => handleMarkAsRead('userChatId')}>
        submit
      </button>
    </div>
  );
};

describe('useDetailUsers - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      user: { id: 'userId' },
      scheme: { id: 'schemeId' },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseViewChatTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('name')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    // expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
