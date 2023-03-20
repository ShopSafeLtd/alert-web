import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role } from 'graphql/generated';
import UserDetail from '../UserDetail.view';

describe('Detail Officer View', () => {
  const data = {
    user: {
      id: 'test UserId',
      fullName: 'test user',
      businesses: [],
      email: '@shopsafe.uk',
      disabled: false,
      newUser: false,
      incidentEmail: false,
      incidentPush: false,
      subscribedIncidentOnly: false,
      subscribedOffenderOnly: false,
      messagePush: false,
      offenderEmail: false,
      offenderPush: false,
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
          id: 'test schemeId',
          role: Role.ContentAdmin,
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserDetail
          demLink={false}
          toggleDemLink={jest.fn()}
          demId=""
          data={data}
          loading={false}
          editUser={false}
          toggleEditUser={jest.fn()}
          saving={false}
          inviteConfirm={jest.fn()}
          enableConfirm={jest.fn()}
          disableConfirm={jest.fn()}
          deleteConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test group')).toBeInTheDocument();
  });
});
