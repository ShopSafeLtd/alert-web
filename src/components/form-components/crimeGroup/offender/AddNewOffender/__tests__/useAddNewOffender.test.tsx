import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { Age, Gender, Race, Build } from 'graphql/generated';
import useAddNewOffender from '../useAddNewOffender';

const UseAddNewOffenderTest = () => {
  const { onSubmit } = useAddNewOffender({
    onClose: jest.fn(),
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'offender name',
            age: Age.Unknown,
            gender: Gender.Unknown,
            race: Race.Unknown,
            build: Build.Unknown,
            hair: 'unknown',
            peculiarities: 'unknown',
            dateSource: 'unknown',
            dateOfBirth: new Date(),
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
            <UseAddNewOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
