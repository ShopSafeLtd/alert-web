import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { CreateUserinAuth0Document } from 'graphql/generated';
import useSetPassword from '../useSetPassword';

const mocks = [
  {
    request: {
      query: CreateUserinAuth0Document,
      variables: {
        id: 'userId',
        password: 'data.password',
      },
    },
    result: {
      data: {
        createUserInAuth0: {
          message: 'message',
        },
      },
    },
  },
];

const UseSetPasswordTest = () => {
  const { onSubmit } = useSetPassword({ userId: 'userId' });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            password: 'data.password',
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useDetailUsers - hook', () => {
  const store = createStore(storeModel);

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseSetPasswordTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Created!')).toBeInTheDocument();
  });
});
