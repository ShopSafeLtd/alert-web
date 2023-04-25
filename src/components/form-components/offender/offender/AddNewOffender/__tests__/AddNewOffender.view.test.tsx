import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddNewOffender from '../AddNewOffender.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddNewOffender
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          saving={false}
          ageCheck={false}
          setAgeCheck={jest.fn()}
          imgChange={jest.fn()}
          beforeUpload={jest.fn()}
          fileList={[]}
          // onSearchOffender={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
