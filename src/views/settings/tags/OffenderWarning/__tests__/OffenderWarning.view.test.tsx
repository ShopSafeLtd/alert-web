import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TagList from '../OffenderWarningList.view';

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
          editOffender={false}
          toggleEditOffender={jest.fn()}
          addOffender={false}
          toggleAddOffender={jest.fn()}
          updateOffenderWarningList={jest.fn()}
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
