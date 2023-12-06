import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { OffenderSort, storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import { ListOffendersDocument, QueryMode, SortOrder } from 'graphql/generated';
import useAddExistingOffender from '../useSelectOffenders';

const mocks = [
  {
    request: {
      query: ListOffendersDocument,
      variables: {
        scheme: {
          id: 'schemeId',
        },
        order: {
          updatedAt: SortOrder.Asc,
        },
        where: {
          id: {
            notIn: [],
          },
          OR: [
            {
              name: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
          ],
        },
        take: 1,
        skip: 0,
      },
    },
    result: {
      data: {
        listOffenders: {
          total: 1,
          offenders: [
            {
              id: 'offenderId',
              createdAt: '2022-08-10T10:40:06.191Z',
              updatedAt: '2022-08-11T10:40:09.985Z',
              age: null,
              build: null,
              dateOfBirth: null,
              dateSource: null,
              hair: null,
              gender: null,
              name: 'offender name',
              race: null,
              peculiarities: null,
              approved: null,
              active: null,
              createdBy: {
                fullName: 'aaa',
                id: 'cl4pe3eu91312371op4c4k2lih2',
                businesses: [{ name: 'user business', id: '' }],
              },
              tags: [
                { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
              ],
              groups: [
                { id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' },
              ],
              images: [
                {
                  id: 'cl6owsuzo33227f9pe9zk4wone',
                  optimised: null,
                  url: null,
                },
              ],
              incidents: [],
            },
          ],
        },
        take: 1,
        skip: 0,
      },
    },
  },
];

const UseAddExistingOffenderTest = () => {
  const { data, loading, onSubmit } = useAddExistingOffender({
    onClose: jest.fn(),
    update: jest.fn(),
    offenderIds: [],
  });
  const ListOffenders =
    data &&
    data.offenders?.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.name}</span>
      </div>
    ));

  return (
    <div>
      {ListOffenders}
      <span>{loading ? 'true' : 'false'}</span>
      <button type="button" onClick={() => onSubmit()}>
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
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseAddExistingOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('offender name')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
