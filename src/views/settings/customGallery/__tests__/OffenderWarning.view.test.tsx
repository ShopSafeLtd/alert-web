import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { TagType } from 'graphql/generated';
import TagList from '../CustomGalleries.view';

describe('List Officer View', () => {
  const data = {
    listCustomGalleries: {
      customGalleries: [
        {
          id: 'testId',
          name: 'TestName',
          description: 'description',
          groups: [],
        },
      ],
      total: 1,
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TagList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          editCustomGallery={undefined}
          setEditCustomGallery={jest.fn()}
          addCustomGallery={false}
          toggleAddCustomGallery={jest.fn()}
          onAddCustomGallery={jest.fn()}
          saving={false}
          deleteConfirm={jest.fn()}
          onEditCustomGallery={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('TestName')).toBeInTheDocument();
  });
});
