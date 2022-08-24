import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import schemeModel from 'state/scheme-model';
import { MemoryRouter } from 'react-router-dom';
import { Role, CurrentUserDocument } from 'graphql/generated';
import useAccountDetail from '../useAccountDetail';

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
              id: 'schemeId',
              role: Role.ContentAdmin,
              scheme: {
                autoApproveIncidents: true,
                autoApproveOffenders: true,
                id: 'ckdhbosuv01028oiblmjgeuii',
                name: 'Demo',
              },
            },
          ],
        },
      },
    },
  },
];

const UseAccountDetailTest = () => {
  const { data, loading } = useAccountDetail({
    setCurrent: jest.fn(),
    update: jest.fn(),
  });
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
    </div>
  );
};

describe('useDetailUsers - hook', () => {
  const store = createStore(schemeModel);

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAccountDetailTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
