import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TodoList from '../NotificationList.view';

describe('List Officer View', () => {
  const data = {
    notifications: [
      {
        id: 'testId',
        read: false,
        createdAt: '2022-08-10T10:40:09.985Z',
        notification: {
          id: 'id',
          title: 'title',
          createdAt: '2022-08-10T10:40:09.985Z',
          schemes: [
            {
              id: 'id',
              name: 'scheme',
              autoApproveIncidents: false,
              autoApproveOffenders: false,
              defaultPublicOffenderDOB: false,
            },
          ],
        },
      },
    ],
    totalNotifications: 1,
    totalUnreadNotifications: 1,

    id: 'id',
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TodoList
          data={data}
          loading={false}
          setSearch={jest.fn()}
          saving={false}
          takeAllSchemes={false}
          toggleTakeAllSchemes={jest.fn()}
          handleMarkAsRead={jest.fn()}
          handleMarkAllRead={jest.fn()}
          onPaginationChange={jest.fn()}
          currentPage={1}
          currentPageSize={1}
        />
      </MemoryRouter>
    );
    expect(getByText('test group')).toBeInTheDocument();
  });
});
