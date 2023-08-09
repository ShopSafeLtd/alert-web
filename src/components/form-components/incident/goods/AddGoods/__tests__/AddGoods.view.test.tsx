import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddGoods from '../AddGoods.view';
import { GoodsMode } from 'graphql/generated';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddGoods
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          goodsTypesData={{
            listGoodsTypes: {
              total: 1,
              goodsTypes: [{ id: 'id', name: 'name' }],
            },
          }}
          goodsMode={GoodsMode.Generic}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
