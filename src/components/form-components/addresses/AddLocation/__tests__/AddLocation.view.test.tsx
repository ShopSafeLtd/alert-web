import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddLocation from '../AddLocation.view';
import { Form } from 'antd';

describe('Detail Officer View', () => {
  const [form] = Form.useForm();

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddLocation
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          saving={false}
          location={undefined}
          setLocation={jest.fn()}
          form={form}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
