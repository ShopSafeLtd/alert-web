import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditExclusion from '../EditExclusion.view';

describe('Detail Officer View', () => {
  const data = {
    id: 'banId',
    location: 'location',
    description: 'description',
    startDate: new Date('2022-08-30T11:25:32.702Z'),
    endDate: new Date('2022-08-30T11:25:32.702Z'),
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditExclusion
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          banData={data}
          saving={false}
          setStartDate={jest.fn()}
          disabledDate={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
