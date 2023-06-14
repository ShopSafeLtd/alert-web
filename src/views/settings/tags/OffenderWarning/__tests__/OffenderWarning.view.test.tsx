import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { TagType } from 'graphql/generated';
import TagList from '../OffenderWarningList.view';

describe('List Officer View', () => {
  const data = {
    tags: [
      {
        id: 'testId',
        name: 'TestName',
        description: 'description',
        type: TagType.IncidentCrimeType,
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TagList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          editOffenderWarning={false}
          toggleEditOffenderWarning={jest.fn()}
          addOffenderWarning={false}
          toggleAddOffenderWarning={jest.fn()}
          onAddOffenderWarning={jest.fn()}
          offenderId=""
          setOffenderId={jest.fn()}
          saving={false}
          deleteConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('TestName')).toBeInTheDocument();
  });
});
