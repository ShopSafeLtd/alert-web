import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role } from 'graphql/generated';
import { Form } from 'antd';
import EditUser from '../EditUser.view';

describe('Detail Officer View', () => {
  const data = {
    user: {
      id: 'userId',
      fullName: 'test user',
      businesses: [],
      email: '@shopsafe.uk',
      disabled: false,
      newUser: false,
      publicName: true,
      reportToAllBusinesses: false,
      groups: [
        {
          id: 'groupId',
          name: 'groupName',
          description: null,
        },
      ],
      chats: [
        {
          id: 'UserChatId',
          chat: {
            id: 'chatId',
            name: 'chatName',
            description: null,
          },
        },
      ],
      schemes: [
        {
          schemeId: 'schemeId',
          id: 'schemeId',
          role: Role.ContentAdmin,
        },
      ],
      incidentEmail: true,
      incidentPush: true,
      subscribedIncidentOnly: true,
      subscribedOffenderOnly: true,
      messagePush: true,
      offenderEmail: true,
      offenderPush: true,
      approverGroups: [],
    },
  };

  const groupsData = [{ value: 'groupId', label: 'groupName' }];

  const chatsData = [{ value: 'chatId', label: 'chatName' }];
  const [form] = Form.useForm();
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditUser
          selectedGroups={[]}
          selectedRole={Role.ContentAdmin}
          setSelectedGroups={jest.fn()}
          setSelectedRole={jest.fn()}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={data}
          loading={false}
          groupsData={groupsData}
          groupsLoading={false}
          chatsData={chatsData}
          chatsLoading={false}
          saving={false}
          onSearchBusiness={jest.fn()}
          updateNewBusinessData={jest.fn()}
          addBusinessVisible={false}
          toggleAddBusinessVisible={jest.fn()}
          form={form}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
