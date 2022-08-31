import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { Role, UserDocument } from 'graphql/generated';
import useUserDetail from '../useUserDetail';

const mocks = [
  {
    request: {
      query: UserDocument,
      variables: {
        where: {
          id: 'userId',
        },
        groupWhere: {
          scheme: {
            id: {
              equals: 'schemeId',
            },
          },
        },
        chatWhere: {
          chat: {
            scheme: {
              id: {
                equals: 'schemeId',
              },
            },
          },
        },
      },
    },
    result: {
      data: {
        user: {
          id: 'userId',
          fullName: 'test user',
          organisation: 'ShopSafe ',
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          addresses: [
            {
              building: 'building',
              county: 'Suffolk',
              id: 'ckshi0r5f9684229l4ckxvhld8',
              postcode: 'IP313FA',
              street: 'Unit 2 Sandy Lane',
              townCity: 'Badwell Ash',
            },
          ],
          groups: [
            {
              id: 'test',
              name: 'test group',
              description: null,
            },
          ],
          chats: [
            {
              id: 'UserChatId',
              chat: {
                id: 'chatId',
                name: 'test chat',
                description: null,
              },
            },
          ],
          schemes: [
            {
              id: 'schemeId',
              role: Role.ContentAdmin,
            },
          ],
        },
      },
    },
  },
];

const UseUserDetailTest = () => {
  const { data, loading } = useUserDetail('userId');
  const User = data && (
    // data.user?.users.map((el) => (
    <div key={data.user?.id}>
      <span>{data.user?.id}</span>
      <span>{data.user?.fullName}</span>
    </div>
  );
  // ));

  return (
    <div>
      {User}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useDetailUsers - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      id: 'userId',
      scheme: { id: 'schemeId' },
    },
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseUserDetailTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
