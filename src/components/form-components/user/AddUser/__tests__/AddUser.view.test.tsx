import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import AddUser from '../AddUser.view';

describe('Detail Officer View', () => {
  const groupsData = [{ value: 'groupId', label: 'groupName' }];
  const chatsData = [{ value: 'chatId', label: 'chatName' }];

  const FormWrapper = () => {
    const [form] = Form.useForm();

    return (
      <AddUser
        addBusinessVisible={false}
        toggleAddBusinessVisible={jest.fn()}
        onSubmit={jest.fn()}
        onClose={jest.fn()}
        groupsData={groupsData}
        groupsLoading={false}
        chatsData={chatsData}
        chatsLoading={false}
        saving={false}
        onValuesChange={jest.fn()}
        existingUser={false}
        form={form}
        onSearchBusiness={jest.fn()}
        businessProvided={false}
        schemeLoading={false}
        selectedRole={undefined}
        setSelectedRole={jest.fn()}
        selectedGroups={[]}
        setSelectedGroups={jest.fn()}
      />
    );
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormWrapper />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
