import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import {
  Role,
  CurrentUserDocument,
  UpdateUserDocument,
} from 'graphql/generated';
import { storeModel } from 'state';
import useEditProfile from '../useEditProfile';

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
          newUser: false,
          incidentEmail: true,
          incidentPush: false,
          messagePush: true,
          offenderEmail: true,
          offenderPush: true,
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
        where: { id: 'userId' },
        data: {
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
                where: { id: 'ckshi0r5f9684229l4ckxvhld8' },
              },
            ],
          },
          email: { set: 'email' },
          fullName: { set: 'name' },
          organisation: { set: 'organisation' },
          incidentEmail: { set: false },
          incidentPush: { set: false },
          offenderEmail: { set: false },
          offenderPush: { set: false },
          messagePush: { set: false },
        },
        groupWhere: { scheme: { id: { equals: 'schemeId' } } },
        chatWhere: { chat: { scheme: { id: { equals: 'schemeId' } } } },
      },
    },
    result: {
      data: {
        updateUser: {
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
            },
          ],
          chats: [
            {
              id: 'UserChatId',
              chat: {
                id: 'chatId',
                name: 'test chat',
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

const UseEditProfileTest = () => {
  const { data, loading, onSubmit } = useEditProfile();
  const User = data && (
    <div key={data.currentUser?.id}>
      <span>{data.currentUser?.id}</span>
      <span>{data.currentUser?.fullName}</span>
    </div>
  );

  return (
    <div>
      {User}
      <span>{loading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            fullName: 'name',
            email: 'email',
            organisation: 'organisation',
            postcode: 'postcode',
            street: 'street',
            townCity: 'townCity',
            building: 'building',
            county: 'county',
            incidentEmail: false,
            incidentPush: false,
            offenderEmail: false,
            offenderPush: false,
            messagePush: false,
          })
        }
      >
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
            <UseEditProfileTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
