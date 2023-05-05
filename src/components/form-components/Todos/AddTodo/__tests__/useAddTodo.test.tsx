import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import useAddExclusion from '../useAddTodo';

const UseAddExclusionTest = () => {
  const { onSubmit } = useAddExclusion({
    onClose: jest.fn(),
    update: jest.fn(),
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            description: 'new description',
            name: 'new name',
            dueDate: new Date(),
            assignedUsers: [],
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
            <UseAddExclusionTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
