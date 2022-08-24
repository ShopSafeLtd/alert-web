import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import { CurrentUserDocument, Role } from 'graphql/generated';
import { storeModel } from 'state';
// import useOnboarding from '../useOnboarding';

const mocks = [
  {
    request: {
      query: CurrentUserDocument,
    },
    result: {
      data: {
        currentUser: {
          id: 'userId',
          fullName: 'test user',
          organisation: 'ShopSafe ',
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          incidentEmail: false,
          incidentPush: false,
          offenderEmail: false,
          offenderPush: false,
          messagePush: false,
          addresses: null,
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
              name: 'TEST scheme',
              role: Role.ContentAdmin,
              autoApproveIncidents: false,
              autoApproveOffenders: false,
            },
          ],
        },
      },
    },
  },
];

const UseOnboardingTest = () => <div>Account Details</div>;

describe('useListGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: {
        id: 'userId',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseOnboardingTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('Account Details')).toBeInTheDocument();
  });
});
