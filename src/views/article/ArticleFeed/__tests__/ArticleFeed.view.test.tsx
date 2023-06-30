import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { ArticlePriority, SortOrder } from 'graphql/generated';
import { MockedProvider } from '@apollo/client/testing';
import ArticleFeed from '../ArticleFeed.view';

describe('Detail Officer View', () => {
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
        <MockedProvider mocks={[]} addTypename={false}>
          <ArticleFeed
            setCreatedAtFilter={jest.fn()}
            lightBoxOpen={{
              open: false,
              index: 0,
            }}
            clearFilters={jest.fn()}
            gallery={[]}
            groupsFilter={[]}
            setGallery={jest.fn()}
            sortFilter={false}
            setGroupsFilter={jest.fn()}
            toggleSortFilter={jest.fn()}
            data={data}
            loading={false}
            lightboxElements={[]}
            openLightbox={jest.fn()}
            onPaginationChange={jest.fn()}
            order={SortOrder.Asc}
            setOrder={jest.fn()}
            search=""
            setSearch={jest.fn()}
            groups={[]}
            groupsLoading={false}
            updateArticleList={jest.fn()}
            onNavigate={jest.fn()}
            currentPage={1}
            currentPageSize={1}
            priorityFilter={[]}
            setPriorityFilter={jest.fn()}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(getByText('Add Article')).toBeInTheDocument();
  });
});
