import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import GroupDetail from '../GroupDetail.view';

describe('Detail Officer View', () => {
  const data = {
    group: {
      id: 'test groupId',
      name: 'test group',
      users: [
        {
          id: 'test userId',
          fullName: 'test user',
          organisation: 'test organisation',
        },
      ],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <GroupDetail
          data={data}
          loading={false}
          editGroup={false}
          toggleEditGroup={jest.fn()}
          saving={false}
          deleteConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test group')).toBeInTheDocument();
  });
});
