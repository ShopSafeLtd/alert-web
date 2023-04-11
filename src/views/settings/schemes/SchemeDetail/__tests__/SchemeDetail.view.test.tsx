import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SchemeList from '../SchemeDetail.view';

describe('List Officer View', () => {
  const data = {
    scheme: {
      id: 'schemeId',
      name: 'test scheme',
      autoApproveIncidents: false,
      autoApproveOffenders: false,
      logo: null,
      offenderRetention: null,
      incidentRetention: null,
      defaultIncidentEmail: false,
      defaultIncidentPush: false,
      defaultSubscribedIncidentOnly: false,
      defaultSubscribedOffenderOnly: false,
      defaultMessagePush: false,
      defaultOffenderEmail: false,
      defaultOffenderPush: false,
      defaultPublicOffenderDOB: true,
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SchemeList
          data={data}
          loading={false}
          saving={false}
          onSubmit={jest.fn()}
          beforeUpload={jest.fn()}
          imgChange={jest.fn()}
          onPreview={jest.fn()}
          fileList={[]}
          darkFileList={[]}
          darkImgChange={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Scheme Details:')).toBeInTheDocument();
  });
});
