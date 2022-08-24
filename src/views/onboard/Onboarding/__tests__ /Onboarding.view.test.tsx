import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MockedProvider } from '@apollo/client/testing';
import Onboarding from '../Onboarding.view';

describe('List Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: {
        id: 'userId',
      },
    },
  });
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <Onboarding
              onSubmit={jest.fn()}
              saving={false}
              current={1}
              setCurrent={jest.fn()}
              onBack={jest.fn()}
              updateAccountDetail={jest.fn()}
              updateTermsSigned={jest.fn()}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(getByText('Terms & Conditions')).toBeInTheDocument();
  });
});
