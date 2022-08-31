import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role } from 'graphql/generated';
import AccountDetail from '../AccountDetail.view';

describe('Detail Officer View', () => {
  const data = {
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
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AccountDetail
          data={data}
          loading={false}
          saving={false}
          onSubmit={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Account Details')).toBeInTheDocument();
  });
});
