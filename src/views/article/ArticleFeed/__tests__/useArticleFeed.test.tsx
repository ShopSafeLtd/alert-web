/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { MemoryRouter } from 'react-router-dom';
import {
  ArticlePriority,
  ListArticlesDocument,
  QueryMode,
  SchemeGroupsDocument,
  SortOrder,
} from 'graphql/generated';

import useArticleFeed from '../useArticleFeed';

const mocks = [
  {
    request: {
      query: ListArticlesDocument,
      variables: {
        scheme: {
          id: 'schemeId',
        },
        order: {
          createdAt: SortOrder.Asc,
        },
        where: {
          crimeTypes: undefined,
          groups: undefined,
          OR: [
            {
              subject: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
            {
              createdBy: {
                OR: [
                  {
                    fullName: {
                      contains: '',
                      mode: QueryMode.Insensitive,
                    },
                  },
                  {
                    businesses: {
                      some: {
                        name: {
                          contains: '',
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        take: 1,
        skip: 0,
      },
    },
    result: {
      data: {
        listArticles: {
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
              updatedAt: '2023-05-16T17:39:30.210Z',
              groups: [],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: SchemeGroupsDocument,
      variables: {
        where: {
          scheme: { id: { equals: 'schemeId' } },
        },
      },
    },
    result: {
      data: {
        groups: [
          {
            id: 'ckqtnb4r056540229myw4yk8zvq',
            name: 'NightSafe',
            description: null,
          },
        ],
      },
    },
  },
];

const UseArticleFeedTest = () => {
  const { data, loading, groups, groupsLoading } = useArticleFeed();
  const ListArticles =
    data &&
    data.articles.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.title}</span>
      </div>
    ));

  const Groups =
    groups &&
    groups.map((el) => (
      <div key={el.value}>
        <span>{el.value}</span>
        <span>{el.label}</span>
      </div>
    ));

  return (
    <div>
      {ListArticles}
      <span>{loading ? 'true' : 'false'}</span>
      {Groups}
      <span>{groupsLoading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useArticleFeed - hook', () => {
  it('returns the expected values', async () => {
    const { findByText, getAllByText } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <UseArticleFeedTest />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await findByText('test')).toBeInTheDocument();

    expect(await findByText('NightSafe')).toBeInTheDocument();
    expect(getAllByText('false')).toHaveLength(2);
  });
});
