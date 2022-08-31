import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';

import useAssignImageToOffender from '../useAssignImageToOffender';

const UseAssignImageToOffenderTest = () => {
  const { onSubmit } = useAssignImageToOffender({
    onClose: jest.fn(),
    update: jest.fn(),
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            selectedOffenderIds: ['offenderId'],
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel);

  it('returns the expected values', async () => {
    const { getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider addTypename={false}>
            <UseAssignImageToOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
