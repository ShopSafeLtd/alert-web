import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditExclusion from '../EditExclusion.view';

describe('Detail Officer View', () => {
  const data = {
    ban: {
      id: 'banId',
      active: false,
      location: 'location',
      description: null,
      startDate: 'startDate',
      endDate: 'endDate',
      createdAt: 'createdAt',
      createdBy: {
        id: 'userId',
        fullName: 'user name',
      },
    },
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditExclusion
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          data={data}
          loading={false}
          saving={false}
          setStartDate={jest.fn()}
          disabledDate={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
