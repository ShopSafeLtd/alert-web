import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  CurrentUserQuery,
  GoodsMode,
  PermissionMethod,
  PermissionModel,
  Role,
} from 'graphql/generated';
import EditProfile from '../EditProfile.view';

describe('Detail Officer View', () => {
  const data: CurrentUserQuery | undefined = {
    currentUser: {
      bulletinEmails: false,
      bulletinPush: false,
      notificationCount: 0,
      messageCount: 0,
      reportToAllBusinesses: true,
      id: 'userId',
      fullName: 'test user',
      email: '@shopsafe.uk',
      businesses: [],
      newUser: false,
      incidentEmail: true,
      incidentPush: false,
      messagePush: true,
      offenderEmail: true,
      offenderPush: true,
      publicName: true,
      origName: 'test user',
      groups: [
        {
          id: 'test',
          name: 'test group',
          scheme: {
            id: 'id',
          },
        },
      ],
      defaultGroups: [
        {
          id: 'test',
          name: 'test group',
          scheme: {
            id: 'id',
          },
        },
      ],
      schemes: [
        {
          isAdmin: false,
          id: 'schemeId',
          role: Role.ContentAdmin,
          scheme: {
            userTodos: 0,
            logo: null,
            darkLogo: null,
            autoPopulateDescription: false,
            needJustification: false,
            languageCount: 0,
            customTranslations: [],
            defaultPublicOffenderDOB: true,
            restrictIncidentAccess: false,
            autoApproveIncidents: true,
            autoApproveOffenders: true,
            id: 'ckdhbosuv01028oiblmjgeuii',
            name: 'Demo',
            goodsMode: 'GENERIC' as GoodsMode,
            facialRecognition: false,
            imagesRequiredOnOffenders: false,
            taskTimeTracking: false,
            reportOnly: true,
            oneSelectedIncidentTypeOnly: false,
            requireSiteNumberForUsers: false,
            facialDetection: false,
          },

          permissions: [
            {
              model: PermissionModel.Articles,
              allowedMethods: [PermissionMethod.Approve],
            },
          ],
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditProfile
          data={data}
          loading={false}
          saving={false}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          resetConfirm={jest.fn()}
          groups={[]}
          userDefaultGroups={[]}
        />
      </MemoryRouter>
    );
    expect(getByText('User Details:')).toBeInTheDocument();
  });
});
