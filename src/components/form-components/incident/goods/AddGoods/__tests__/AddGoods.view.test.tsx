import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddGoods from '../AddGoods.view';
import { GoodsMode } from 'graphql/types';
import { Form } from 'antd';

describe('Detail Officer View', () => {
  const [form] = Form.useForm();

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddGoods
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          saving={false}
          goodsTypesData={{
            listGoodsTypes: {
              total: 1,
              goodsTypes: [{ id: 'id', name: 'name' }],
            },
          }}
          onAddItem={jest.fn()}
          form={form}
          division={''}
          goodsMode={GoodsMode.Generic}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
