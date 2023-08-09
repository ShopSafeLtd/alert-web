import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import useEditGoods from '../useEditGoods';

const UseEditGoodsTest = () => {
  const data = {
    id: `id`,
    goodsTypeId: ' value.goodsTypeId',
    name: 'name',
    value: 0,
    recoveredValue: 0,
  };
  const { onSubmit } = useEditGoods({
    data,
    update: jest.fn(),
  });

  return (
    <div>
      <button type="button" onClick={() => onSubmit(data)}>
        submit
      </button>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      user: {
        id: 'userId',
      },
    },
  });

  it('returns the expected values', async () => {
    const { getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider addTypename={false}>
            <UseEditGoodsTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
