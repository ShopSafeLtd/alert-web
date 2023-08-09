import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditGoods from '../EditGoods.view';
import { GoodsMode } from 'graphql/generated';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditGoods
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={{
            id: `id`,
            goodsTypeId: ' value.goodsTypeId',
            name: 'name',
            value: 0,
            recoveredValue: 0,
          }}
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
