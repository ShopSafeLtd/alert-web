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
        idVerified={false}
        images={[]}
        form={form}
        uploading={false}
        setUploading={jest.fn()}
        offenderSettings={{
          name: true,
          alias: true,
          ethnicity: true,
          gender: true,
          build: true,
          height: true,
          hair: true,
          age: true,
          dateOfBirth: true,
          dateOfBirthSource: true,
          idVerified: true,
          peculiarities: true,
          comment: true,
          images: true,
        }}
        loading={false}
        knowAddress={false}
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
