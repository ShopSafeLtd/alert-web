import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import AddNewOffender from '../AddNewOffender.view';

describe('Detail Officer View', () => {
  const FormWrapper = () => {
    const [form] = Form.useForm();

    return (
      <AddNewOffender
        onSubmit={jest.fn()}
        onClose={jest.fn()}
        saving={false}
        ageCheck={false}
        setAgeCheck={jest.fn()}
        imgChange={jest.fn()}
        beforeUpload={jest.fn()}
        fileList={[]}
        onRemoveImage={jest.fn()}
        editImage={null}
        onEditImage={jest.fn()}
        toggleEditImage={jest.fn()}
        primaryImage="primaryImage"
        setPrimaryImage={jest.fn()}
        hideImages={false}
        idVerified={false}
        onValuesChange={jest.fn()}
        form={form}
        // onSearchOffender={jest.fn()}
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
