import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TodoList from '../NotificationList.view';
import { GoodsMode, Role } from 'graphql/generated';

describe('List Officer View', () => {
  const data = {
    notifications: [
      {
        id: 'testId',
        read: false,
        createdAt: new Date('2022-07-25T08:57:55.299Z'),
        notification: {
          id: 'id',
          title: 'title',
          createdAt: new Date('2022-07-25T08:57:55.299Z'),
          schemes: [
            {
              userTodos: 0,
              userNotifications: 0,
              id: 'id',
              name: 'scheme',
              autoApproveIncidents: false,
              autoApproveOffenders: false,
              restrictIncidentAccess: false,
              defaultPublicOffenderDOB: false,
              autoPopulateDescription: false,
              needJustification: false,
              requireSiteNumberForUsers: false,
              oneSelectedIncidentTypeOnly: false,
              reportOnly: true,
              facialRecognition: true,
              facialDetection: false,
              activityAssignToUser: false,
              useBusinessGroupsOnIncident: false,
              imagesRequiredOnOffenders: true,
              defaultGroups: [],
              members: [
                {
                  id: 'id',
                  role: Role.ContentAdmin,
                },
              ],
              goodsMode: GoodsMode.Generic,
              taskTimeTracking: false,
              languageCount: 0,
              connectedToSchemes: [
                {
                  id: '',
                  name: '',
                },
              ],
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
