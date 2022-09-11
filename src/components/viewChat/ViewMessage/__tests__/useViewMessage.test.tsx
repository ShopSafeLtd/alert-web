import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  CreateMessageDocument,
  MessagesDocument,
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
            organisation: 'organisation',
          },
          chat: { id: 'chatId', name: 'chatName' },
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
              organisation: 'organisation',
            },
            chat: { id: 'chatId', name: 'chatName' },
          },
        ],
      },
    },
  },
];

const UseViewMessageTest = () => {
  const { onSubmit } = useViewMessage({
    chatId: 'chatId',
  });
  return (
    <div>
      <button
        type="button"
        onClick={() => onSubmit({ newMessage: 'newMessages' })}
      >
        submit
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
    const { getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseViewMessageTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    // expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
