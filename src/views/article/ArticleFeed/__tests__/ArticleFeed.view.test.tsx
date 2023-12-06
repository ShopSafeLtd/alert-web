import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { ArticlePriority, SortOrder } from 'graphql/generated';
import { MockedProvider } from '@apollo/client/testing';
import ArticleFeed from '../ArticleFeed.view';

describe('Detail Officer View', () => {
  const data = {
    total: 1,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 'Y3JlYXRlZEF0OjIwMjItMDctMjVUMDg6NTc6NTUuMjk5Wi0wMDowMA==',
      endCursor: 'Y3JlYXRlZEF0OjIwMjItMDctMjVUMDg6NTc6NTUuMjk5Wi0wMDowMA==',
    },
    edges: [
      {
        node: {
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
          watermarkImage: false,
          previewImage:
            'https://shopsafealert.blob.core.windows.net/images-1/ed58b498-6067-4f05-8416-85df6a6d02b0-filename-optimised.webp',
          previewText: null,
          priority: ArticlePriority.Normal,
          tags: [],
          title: 'test',
          updatedAt: new Date('2022-07-25T08:57:55.299Z'),
          groups: [],
        },
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MockedProvider mocks={[]} addTypename={false}>
          <ArticleFeed
            fetchMoreScroll={jest.fn()}
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
            order={SortOrder.Asc}
            setOrder={jest.fn()}
            search=""
            setSearch={jest.fn()}
            groups={[]}
            groupsLoading={false}
            updateArticleList={jest.fn()}
            onNavigate={jest.fn()}
            priorityFilter={[]}
            setPriorityFilter={jest.fn()}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(getByText('Add Article')).toBeInTheDocument();
  });
});
