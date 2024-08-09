import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { CrimeType } from 'graphql/types';
import useEditCrimeType from '../useEditCrimeType';
import { TagDocument } from 'graphql/tag/queries/__generated__/tag.generated';
import { UpdateTagDocument } from 'graphql/tag/mutation/__generated__/update_tag.generated';

const mocks = [
  {
    request: {
      query: TagDocument,
      variables: {
        where: {
          id: 'incidentId',
        },
      },
    },
    result: {
      data: {
        tag: {
          id: 'incidentId',
          name: 'incident name',
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
          id: 'incidentId',
        },
        data: {
          name: { set: 'incident Name' },
          description: { set: 'incident description' },
        },
      },
    },
    result: {
      data: {
        updateTag: {
          id: 'incidentId',
          name: 'incident Name',
          description: 'incident description',
        },
      },
    },
  },
];

const UseEditCrimeTypeTest = () => {
  const { data, loading, onSubmit } = useEditCrimeType({
    onClose: jest.fn(),
    incidentId: 'incidentId',
  });
  const Tags = data && (
    <div key={data.tag?.id}>
      <span>{data.tag?.id}</span>
      <span>{data.tag?.name}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'incident Name',
            description: 'incident description',
            crimeType: CrimeType.TheftHandling,
          })
        }
      >
        submit
      </button>
    </div>
  );

  return (
    <div>
      {Tags}
      <span>{loading ? 'true' : 'false'}</span>
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
            <UseEditCrimeTypeTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('incident name')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
