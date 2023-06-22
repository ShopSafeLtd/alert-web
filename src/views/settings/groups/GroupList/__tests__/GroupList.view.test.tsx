import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import GroupList from '../GroupList.view';

describe('List Officer View', () => {
  const data = {
    groups: [],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <GroupList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          addGroup={false}
          toggleAddGroup={jest.fn()}
          updateGroupList={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test group')).toBeInTheDocument();
  });
});
