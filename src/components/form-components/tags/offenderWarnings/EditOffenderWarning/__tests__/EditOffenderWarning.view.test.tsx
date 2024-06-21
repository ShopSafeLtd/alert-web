import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import EditOffenderWarning from '../EditOffenderWarning.view';
import { TagType } from 'graphql/types';

describe('List Officer View', () => {
  const data = {
    tag: {
      id: 'offenderId',
      name: 'offender name',
      description: 'description',
      type: TagType.IncidentCrimeType,
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditOffenderWarning
          data={data}
          loading={false}
          onSubmit={jest.fn()}
          saving={false}
          onClose={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
