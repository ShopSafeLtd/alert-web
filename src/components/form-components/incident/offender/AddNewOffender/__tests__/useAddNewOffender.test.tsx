import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { OffenderSort, storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  Age,
  Gender,
  Race,
  Build,
  Role,
  SchemeGroupsDocument,
} from 'graphql/generated';
import useAddNewOffender from '../useAddNewOffender';

const mocks = [
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
        },
      },
    },
    result: {
      data: {
        groups: [{ id: 'groupId', name: 'groupName', description: null }],
      },
    },
  },
];

const UseAddNewOffenderTest = () => {
  const { groups, groupsLoading, onSubmit } = useAddNewOffender({
    onClose: jest.fn(),
    update: jest.fn(),
  });
  const Groups =
    groups &&
    groups.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));

  return (
    <div>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
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
            groups: [],
          })
        }
      >
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
      user: {
        role: Role.SchemeAdmin,
        groups: [],
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
            <UseAddNewOffenderTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('groupName')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
  });
});
