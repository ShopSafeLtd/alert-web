import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { ChatDocument } from 'graphql/generated';
import useChatDetail from '../useChatDetail';

const mocks = [
  {
    request: {
      query: ChatDocument,
      variables: {
        where: {
          id: 'ChatId',
        },
      },
    },
    result: {
      data: {
        chat: {
          id: 'ChatId',
          name: 'test Chat',
          totalMembers: 1,
          description: null,
          members: [
            {
              id: 'userChatId',
              user: {
                id: 'test userId',
                fullName: 'test user',
                firstLetter: 't',
                businesses: [{ name: 'test business', id: 'test' }],
              },
            },
          ],
        },
      },
    },
  },
];

const UseChatDetailTest = () => {
  const { data, loading } = useChatDetail('ChatId');
  const Chat =
    data &&
    data.chat?.members.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.user.fullName}</span>
      </div>
    ));

  return (
    <div>
      {Chat}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailChats - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      id: 'ChatId',
    },
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseChatDetailTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
