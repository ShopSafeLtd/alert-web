import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';

import useEditGroup from '../useEditGroup';

import { UpdateGroupDocument } from 'graphql/group/mutation/__generated__/update_group.generated';
import { GroupDocument } from 'graphql/group/queries/__generated__/group.generated';

const mocks = [
  {
    request: {
      query: UpdateGroupDocument,
      variables: {
        where: {
          id: 'groupId',
        },
        data: {
          name: { set: 'new name' },
          description: { set: 'new description' },
          users: {
            set: [{ id: '1' }],
          },
        },
      },
    },
    result: {
      data: {
        updateGroup: {
          id: '1',
          name: '1',
          description: '1',
          users: [
            {
              id: '1',
              fullName: 'test',
              businesses: [{ name: 'user business', id: '' }],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GroupDocument,
      variables: {
        where: {
          id: 'groupId',
        },
      },
    },
    result: {
      data: {
        group: {
          id: 'groupId',
          name: 'test group',
          description: null,
          users: [
            {
              id: 'userId',
              fullName: 'test user',
              businesses: [{ id: '', name: 'test business' }],
            },
          ],
        },
      },
    },
  },
];

const UseEditGroupTest = () => {
  const { data, loading, onSubmit } = useEditGroup({
    onClose: jest.fn(),
    groupId: 'groupId',
  });
  const Group =
    data &&
    data.group?.users.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.fullName}</span>
        <span>{el.businesses[0]?.name}</span>
      </div>
    ));
  return (
    <div>
      {Group}
      <span>{loading ? 'true' : 'false'}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'new name',
            description: 'new description',
            users: ['1'],
            approvers: [],
            showName: true,
            showAlias: true,
            showEthnicity: true,
            showGender: true,
            showBuild: true,
            showHeight: true,
            showHair: true,
            showAge: true,
            showDateOfBirth: true,
            showDateOfBirthSource: true,
            showIdVerified: true,
            showPeculiarities: true,
            showComment: true,
            showImages: true,
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
    },
  });

  it('returns the expected values', async () => {
    const { findByText, getByText, container } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseEditGroupTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test user')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
    fireEvent.click(getByText('submit'));
    expect(container).toBeInTheDocument();
    expect(await findByText('Successfully Updated!')).toBeInTheDocument();
  });
});
