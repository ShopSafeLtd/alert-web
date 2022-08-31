import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SetPassword from '../SetPassword.view';

describe('Detail Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SetPassword saving={false} onSubmit={jest.fn()} />
      </MemoryRouter>
    );
    expect(getByText('Welcome to Alert!')).toBeInTheDocument();
  });
});
