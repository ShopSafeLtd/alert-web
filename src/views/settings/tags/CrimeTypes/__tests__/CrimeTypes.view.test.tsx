import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TagList from '../CrimeTypeList.view';

describe('List Officer View', () => {
  const data = {
    tags: [{ id: 'testId', name: 'TestName', description: 'description' }],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TagList
          data={data}
          loading={false}
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
        />
      </MemoryRouter>
    );
    expect(getByText('TestName')).toBeInTheDocument();
  });
});
