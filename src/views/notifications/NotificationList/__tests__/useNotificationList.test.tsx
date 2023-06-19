import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';

import { MemoryRouter } from 'react-router-dom';
import { UserNotificationsDocument } from 'graphql/generated';
import useGroupList from '../useNotificationList';

const mocks = [
  {
    request: {
      query: UserNotificationsDocument,
      variables: {
        where: {
          id: 'userId',
          // OR: [
          //   {
          //     name: {
          //       contains: '',
          //       mode: QueryMode.Insensitive,
          //     },
          //   },
          //   {
          //     description: {
          //       contains: '',
          //       mode: QueryMode.Insensitive,
          //     },
          //   },
          // ],
        },
      },
    },
    result: {
      data: {
        notifications: [
          {
            id: 'testId',
            read: false,
            createdAt: '2022-08-10T10:40:09.985Z',
            notification: {
              id: 'id',
              title: 'title',
              createdAt: '2022-08-10T10:40:09.985Z',
              schemes: [{ id: 'id' }],
            },
          },
        ],
        totalNotifications: 1,
        id: 'id',
      },
    },
  },
];

const UseGroupListTest = () => {
  const { data, loading } = useGroupList();
  const Groups =
    data &&
    data.notifications?.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.notification.title}</span>
      </div>
    ));

  return (
    <div>
      {Groups}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListGroups - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'testScheme',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseGroupListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('title')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
