import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import {
  CurrentUserDocument,
  Role,
  UpdateUserDocument,
} from 'graphql/generated';
import { storeModel } from 'state';
import useOnboarding from '../useOnboarding';

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
          businesses: [{ name: 'test', id: 'test' }],
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          incidentEmail: false,
          incidentPush: false,
          offenderEmail: false,
          offenderPush: false,
          messagePush: false,
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
              id: 'userChatId',
              chat: {
                id: 'chatId',
                name: 'test chat',
                description: null,
              },
            },
          ],
          schemes: [
            {
              id: 'schemesId',
              role: Role.ContentAdmin,
              scheme: {
                id: 'schemeId',
                name: 'TEST scheme',
                autoApproveIncidents: false,
                autoApproveOffenders: false,
              },
            },
          ],
        },
      },
    },
  },

  {
    request: {
      query: UpdateUserDocument,
      variables: {
        where: {
          id: 'userId',
        },
        data: {
          fullName: { set: 'fullName' },
          businesses: { connect: [{ id: 'test' }] },
          termsSigned: { set: true },
          newUser: { set: false },
          addresses: {
            update: [
              {
                data: {
                  postcode: { set: 'postcode' },
                  street: { set: 'street' },
                  townCity: { set: 'townCity' },
                  building: { set: 'building' },
                  county: { set: 'county' },
                },
                where: {
                  id: '',
                },
              },
            ],
          },
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
        updateUser: {
          id: 'userId',
          fullName: 'test user',
          businesses: [{ name: 'test', id: 'test' }],
          email: '@shopsafe.uk',
          disabled: false,
          newUser: false,
          incidentEmail: false,
          incidentPush: false,
          offenderEmail: false,
          offenderPush: false,
          messagePush: false,
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
              id: 'groupId',
              name: 'test group',
              description: null,
            },
          ],
          chats: [
            {
              id: 'userChatId',
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

const UseOnboardingTest = () => {
  const { onSubmit, updateTermsSigned, updateAccountDetail } = useOnboarding();
  const preSubmit = () => {
    updateTermsSigned();
    updateAccountDetail({
      fullName: 'fullName',
      businesses: [{ name: 'test', id: 'test' }],
      building: 'building',
      county: 'county',
      postcode: 'postcode',
      street: 'street',
      townCity: 'townCity',
    });
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          onSubmit();
        }}
      >
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
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseOnboardingTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    fireEvent.click(getByText('preSubmit'));
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
