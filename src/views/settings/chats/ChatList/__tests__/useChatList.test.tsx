import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { QueryMode, SchemeChatsDocument } from 'graphql/generated';
import useChatList from '../useChatList';

const mocks = [
  {
    request: {
      query: SchemeChatsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'testScheme' } },
          OR: [
            {
              name: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
            {
              description: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
          ],
        },
      },
    },
    result: {
      data: {
        chats: [{ id: 'testId', name: 'TestName', description: null }],
      },
    },
  },
];

const UseChatListTest = () => {
  const { data, loading } = useChatList();
  const Chats =
    data &&
    data.chats.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.name}</span>
      </div>
    ));

  return (
    <div>
      {Chats}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListChats - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'testScheme',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseChatListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('TestName')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
