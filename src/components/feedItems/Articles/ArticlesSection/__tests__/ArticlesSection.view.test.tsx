import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ArticlePriority, SortOrder } from 'graphql/generated';
import TodoList from '../ArticlesSection.view';

describe('List Officer View', () => {
  const data = {
    total: 1,
    articles: [
      {
        createdBy: {
          fullName: 'Alex Nicholls',
          id: 'cl4y3a97h2589631op4xk29hjc4',
          businesses: [{ name: 'user business', id: '' }],
        },
        id: 'clhqk6of6000r070vpc1830ot',
        image: {
          card: 'https://shopsafealert.blob.core.windows.net/images…98-6067-4f05-8416-85df6a6d02b0-filename-card.webp',
          id: 'clhqk6oc6000p070v8zmivigv',
          optimised:
            'https://shopsafealert.blob.core.windows.net/images…=4ml5beAqOP2%2BGGs388WVhWeRi0oU4GYM0CF0GCf2Rj0%3D',
          url: null,
        },
        images: [],
        previewImage:
          'https://shopsafealert.blob.core.windows.net/images-1/ed58b498-6067-4f05-8416-85df6a6d02b0-filename-optimised.webp',
        previewText: null,
        priority: ArticlePriority.Normal,
        tags: [],
        title: 'test',
        updatedAt: new Date('2022-07-25T08:57:55.299Z'),
        groups: [],
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TodoList
          data={data}
          loading={false}
          search=""
          setSearch={jest.fn()}
          saving={false}
          order={SortOrder.Desc}
          setOrder={jest.fn()}
          groups={[]}
          groupsLoading={false}
          setCreatedAtFilter={jest.fn()}
          priorityFilter={[]}
          setPriorityFilter={jest.fn()}
          groupsFilter={[]}
          setGroupsFilter={jest.fn()}
          sortFilter={false}
          toggleSortFilter={jest.fn()}
          clearFilters={jest.fn()}
          adminRights={false}
          fetchMoreScroll={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test')).toBeInTheDocument();
  });
});
