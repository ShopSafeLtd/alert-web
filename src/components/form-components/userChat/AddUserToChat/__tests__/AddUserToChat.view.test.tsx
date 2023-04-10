import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddUserToChat from '../AddUserToChat.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddUserToChat
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          loading={false}
          usersData={[]}
          saving={false}
          search=""
          setSearch={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
