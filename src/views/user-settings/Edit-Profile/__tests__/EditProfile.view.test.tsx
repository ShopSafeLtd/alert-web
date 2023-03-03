import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role } from 'graphql/generated';
import EditProfile from '../EditProfile.view';

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
        <EditProfile
          data={data}
          loading={false}
          saving={false}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          resetConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('User Details:')).toBeInTheDocument();
  });
});
