import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  ChatDocument,
  CreateMessageDocument,
  MessagesDocument,
  MessagesSubscriptionDocument,
  Role,
} from 'graphql/generated';
import useViewMessage from '../useViewMessage';

const mocks = [
  {
    request: {
      query: CreateMessageDocument,
      variables: {
        data: {
          chat: {
            connect: {
              id: 'chatId',
            },
          },
          scheme: {
            connect: {
              id: 'schemeId',
            },
          },
          from: {
            connect: {
              id: 'userId',
            },
          },
          content: 'newMessages',
        },
      },
    },
    result: {
      data: {
        createMessage: {
          id: 'messageId',
          sent: true,
          content: 'content',
          createdAt: 'createdAt',

          from: {
            id: 'userId',
            fullName: 'fullName',
            businesses: [{ name: 'user business', id: '' }],
          },
          chat: { id: 'chatId', name: 'chatName' },
          images: [],
          incidents: [],
          offenders: [],
        },
      },
    },
  },
  {
    request: {
      query: MessagesDocument,
      variables: {
        chat: 'chatId',
      },
    },
    result: {
      data: {
        messages: [
          {
            id: 'messageId',
            sent: true,

            content: 'content',
            createdAt: 'createdAt',
            from: {
              id: 'userId',
              fullName: 'fullName',
              businesses: [{ name: 'user business', id: '' }],
            },
            chat: { id: 'chatId', name: 'chatName' },
            images: [],
            incidents: [],
            offenders: [],
          },
        ],
      },
    },
  },
  {
    request: {
      query: ChatDocument,
      variables: {
        where: {
          id: 'chatId',
        },
      },
    },
    result: {
      data: {
        chat: {
          id: 'chatId',
          name: 'test Chat',
          description: null,
          totalMembers: 1,
          members: [
            {
              id: 'userChatId',
              user: {
                id: 'test userId',
                firstLetter: 't',
                fullName: 'test user',
                businesses: [{ name: 'user business', id: '' }],
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: MessagesSubscriptionDocument,
      variables: {
        chat: 'chatId',
      },
    },
    result: {
      data: {
        newMessage: true,
        messages: [
          {
            id: 'messageId',
            sent: true,
            content: 'content',
            createdAt: 'createdAt',
            from: {
              id: 'userId',
              fullName: 'fullName',
              businesses: [{ name: 'user business', id: '' }],
            },
            chat: { id: 'chatId', name: 'chatName' },
            images: [],
            incidents: [],
            offenders: [],
          },
        ],
      },
    },
  },
  {
    request: {
      query: MessagesSubscriptionDocument,
      variables: {
        chat: '',
      },
    },
    result: {
      data: {
        messages: [
          {
            id: 'messageId',
            sent: true,
            content: 'content',
            createdAt: 'createdAt',
            from: {
              id: 'userId',
              fullName: 'fullName',
              businesses: [{ name: 'user business', id: '' }],
            },
            chat: { id: 'chatId', name: 'chatName' },
          },
        ],
      },
    },
  },
];

const UseViewMessageTest = () => {
  const { loading, chatData, setInputStr, onSubmit } = useViewMessage({
    chatId: 'chatId',
    updateUserChatList: jest.fn(),
  });
  const Chat = chatData && (
    <div key={chatData.chat?.id}>
      <span>{chatData.chat?.id}</span>
      <span>{chatData.chat?.name}</span>
    </div>
  );
  const preSubmit = () => {
    setInputStr('newMessages');
  };

  return (
    <div>
      {Chat}
      <span>{loading ? 'true' : 'false'}</span>
      <button type="button" onClick={() => onSubmit()}>
        submit
      </button>
      <button
        type="button"
        onClick={() => {
          preSubmit();
        }}
      >
        preSubmit
      </button>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: { id: 'userId', role: Role.SchemeAdmin },
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseViewMessageTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(await findByText('test Chat')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('preSubmit'));
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
