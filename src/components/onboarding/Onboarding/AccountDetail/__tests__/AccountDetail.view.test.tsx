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
      email: '@shopsafe.uk',
      businesses: [],
      newUser: false,
      incidentEmail: true,
      incidentPush: false,
      messagePush: true,
      offenderEmail: true,
      offenderPush: true,
      publicName: true,
      groups: [
        {
          id: 'test',
          name: 'test group',
          description: null,
          scheme: {
            id: 'id',
          },
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
