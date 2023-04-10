import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import useEditExclusion from '../useEditExclusion';

const UseEditExclusionTest = () => {
  const { onSubmit } = useEditExclusion({
    onClose: jest.fn(),
    update: jest.fn(),
    banData: null,
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            startDate: new Date('2022-08-30T11:25:32.702Z'),
            endDate: new Date('2022-08-31T11:25:32.702Z'),
            location: 'location',
            description: 'new description',
            id: 'test',
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useDetailBans - hook', () => {
  const store = createStore(storeModel);

  it('returns the expected values', async () => {
    const { getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider addTypename={false}>
            <UseEditExclusionTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
