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
        chatData={{}}
        saving={false}
        form={form}
        scrolledToTop={jest.fn()}
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
        imgChange={undefined}
        onPreview={jest.fn()}
        beforeUpload={jest.fn()}
        fileList={[]}
        updateOffendersList={jest.fn()}
        offendersData={[]}
        incidentsData={undefined}
        linkIncident={false}
        linkOffender={false}
        toggleLinkIncident={jest.fn()}
        toggleLinkOffender={jest.fn()}
        updateIncidentList={jest.fn()}
        removeOffender={jest.fn()}
        removeIncident={jest.fn()}
        removeImage={jest.fn()}
        setMentionedUser={jest.fn()}
        deleteImageConfirm={jest.fn()}
        deleteOffenderConfirm={jest.fn()}
        deleteIncidentConfirm={jest.fn()}
        data={{
          chatMessages: [],
        }}
        messageSent
        setMessageSent={() => {}}
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
