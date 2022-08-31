import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { TagDocument, UpdateTagDocument } from 'graphql/generated';
import useEditOffenderWarning from '../useEditOffenderWarning';

const mocks = [
  {
    request: {
      query: TagDocument,
      variables: {
        where: {
          id: 'offenderId',
        },
      },
    },
    result: {
      data: {
        tag: {
          id: 'offenderId',
          name: 'offender name',
          description: 'description',
        },
      },
    },
  },
  {
    request: {
      query: UpdateTagDocument,
      variables: {
        where: {
          id: 'offenderId',
        },
        data: {
          name: { set: 'offender Name' },
          description: { set: 'offender description' },
        },
      },
    },
    result: {
      data: {
        updateTag: {
          id: 'offenderId',
          name: 'offender Name',
          description: 'offender description',
        },
      },
    },
  },
];

const UseEditOffenderWarningTest = () => {
  const { data, loading, onSubmit } = useEditOffenderWarning({
    onClose: jest.fn(),
    offenderId: 'offenderId',
  });
  const Tags = data && (
    <div key={data.tag?.id}>
      <span>{data.tag?.id}</span>
      <span>{data.tag?.name}</span>
    </div>
  );

  return (
    <div>
      {Tags}
      <span>{loading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'offender Name',
            description: 'offender description',
          })
        }
      >
        submit
      </button>
    </div>
  );
};

describe('useListTags - hook', () => {
  const store = createStore(storeModel);
  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseEditOffenderWarningTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('offender name')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
