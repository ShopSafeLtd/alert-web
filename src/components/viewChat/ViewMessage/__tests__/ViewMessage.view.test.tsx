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
        saving={false}
        form={form}
        scrolledToTop={jest.fn()}
        datedMessages={[]}
        loadMore={false}
        deleteConfirm={jest.fn()}
        userId=""
        deleteRights
      />
    );
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormWrapper />
      </MemoryRouter>
    );
    expect(getByText('Send')).toBeInTheDocument();
  });
});
