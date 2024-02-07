import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { TagType } from 'graphql/generated';
import TagList from '../CrimeTypeList.view';

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
          updateTagParent={jest.fn()}
          data={data}
          search=""
          setSearch={jest.fn()}
          editIncident={false}
          toggleEditIncident={jest.fn()}
          addIncident={false}
          toggleAddIncident={jest.fn()}
          updateCrimeTypeList={jest.fn()}
          incidentId=""
          setIncidentId={jest.fn()}
          saving={false}
          deleteConfirm={jest.fn()}
          addImpact
          addInvolved
          impactData={{ tags: [] }}
          impactLoading
          involvedData={{ tags: [] }}
          involvedLoading
          toggleAddImpact={jest.fn()}
          toggleAddInvolved={jest.fn()}
          updateImpactList={jest.fn()}
          updateInvolvedList={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('TestName')).toBeInTheDocument();
  });
});
