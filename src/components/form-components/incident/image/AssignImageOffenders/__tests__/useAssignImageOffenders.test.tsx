import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { OffenderSort, storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import useAssignImageOffenders from '../useAssignImageOffender';

const UseAssignImageOffendersTest = () => {
  const offenderData = [
    {
      age: null,
      build: null,
      dateOfBirth: null,
      gender: null,
      id: 'ckwm8h5rf2294802an6cimfn44q',
      images: [],
      name: 'Unidentified Offender',
      race: null,
    },
  ];
  const image = {
    id: 'imageId',
    uid: 'rc-upload-1666383872186-4',
    name: '871e960e-ad78-47f2-8c26-9c3443431f55-optimised.jpeg',
  };
  const { submitImage } = useAssignImageOffenders({
    onSubmit: jest.fn(),
    offenderData,
    image,
  });

  return (
    <div>
      <button type="button" onClick={() => submitImage()}>
        submit
      </button>
    </div>
  );
};

describe('useDetailGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      data: {
        offenders: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            search: '',
            groups: [],
            tags: [],
          },
          order: OffenderSort.updatedAtAsc,
        },
      },
    },
    mockActions: true,
  });

  it('returns the expected values', async () => {
    const { getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider addTypename={false}>
            <UseAssignImageOffendersTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
