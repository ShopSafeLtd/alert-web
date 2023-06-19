import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { CreateTagDocument, Model } from 'graphql/generated';
import useAddOffenderWarning from '../useAddOffenderWarning';

const mocks = [
  {
    request: {
      query: CreateTagDocument,
      variables: {
        data: {
          name: 'data.name',
          description: 'data.description',
          scheme: {
            connect: {
              id: 'schemeId',
            },
          },
          createdBy: { connect: { id: 'userId' } },
          dataType: Model.Offender,
        },
      },
    },
    result: {
      data: {
        createTag: {
          id: 'offenderId',
          name: 'offender name',
          description: 'description',
        },
      },
    },
  },
];

const UseAddOffenderWarningTest = () => {
  const { onSubmit } = useAddOffenderWarning({
    update: jest.fn(),
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'data.name',
            description: 'data.description',
            schemes: [],
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useListTags - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: { id: 'userId' },
    },
  });
  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddOffenderWarningTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Added!')).toBeInTheDocument();
  });
});
