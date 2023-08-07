import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CurrentUserQuery, GoodsMode, Role } from 'graphql/generated';
import EditProfile from '../EditProfile.view';

describe('Detail Officer View', () => {
  const data: CurrentUserQuery | undefined = {
    currentUser: {
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
      schemes: [
        {
          id: 'schemeId',
          role: Role.ContentAdmin,
          scheme: {
            customTranslations: [],
            defaultPublicOffenderDOB: true,
            autoApproveIncidents: true,
            autoApproveOffenders: true,
            id: 'ckdhbosuv01028oiblmjgeuii',
            name: 'Demo',
            goodsMode: 'GENERIC' as GoodsMode,
            facialRecognition: false,
            imagesRequiredOnOffenders: false,
          },
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
        />
      </MemoryRouter>
    );
    expect(getByText('User Details:')).toBeInTheDocument();
  });
});
