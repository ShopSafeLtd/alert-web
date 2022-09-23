import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import ViewMessage from '../ViewMessage.view';

describe('List Officer View', () => {
  const FormWrapper = () => {
    const [form] = Form.useForm();

    return (
      <ViewMessage
        onSubmit={jest.fn()}
        loading={false}
        chatData={{}}
        saving={false}
        form={form}
        scrolledToTop={jest.fn()}
        datedMessages={[]}
        loadMore={false}
        userId=""
        deleteMessageConfirm={jest.fn()}
        adminRights
        deleteChatConfirm={jest.fn()}
        manageChat={false}
        toggleManageChat={jest.fn()}
        chatId=""
        membersData={[
          { id: 'id', fullName: '', organisation: '', firstLetter: '' },
        ]}
        inputStr=""
        setInputStr={jest.fn()}
        showPicker={false}
        toggleShowPicker={jest.fn()}
      />
    );
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormWrapper />
      </MemoryRouter>
    );
    expect(getByText('Manage Chat Members')).toBeInTheDocument();
  });
});
