import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role, UserQuery } from 'graphql/generated';
import UserDetail from '../UserDetail.view';

describe('Detail Officer View', () => {
  const data: UserQuery | undefined = {
    // @ts-ignore TODO fix
    user: {
      demId: 'test demId',
      reportToAllBusinesses: true,
      approverGroups: [],
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
      publicName: true,
      defaultGroups: [],
      groups: [
        {
          id: 'test',
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
          schemeId: 'test schemeId',
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
          editPassword={false}
          toggleEditPassword={jest.fn()}
          userRole={Role.ContentAdmin}
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
