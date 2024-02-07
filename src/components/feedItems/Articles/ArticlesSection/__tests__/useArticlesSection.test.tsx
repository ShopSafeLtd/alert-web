import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state';
import { MemoryRouter } from 'react-router-dom';
import {
  ArticlePriority,
  ListArticlesDocument,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import useArticlesSection from '../useArticlesSection';

const mocks = [
  {
    request: {
      query: ListArticlesDocument,
      variables: {
        scheme: {
          id: 'schemeId',
        },
        where: {
          createdAt: undefined,
          createdBy: undefined,
          priority: undefined,
          OR: [
            {
              title: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
            },
          ],
        },
        order: {
          updatedAt: SortOrder.Desc,
        },
        skip: 0,
        take: 1,
      },
      result: {
        data: {
          total: 1,
          articles: [
            {
              createdBy: {
                fullName: 'Alex Nicholls',
                id: 'cl4y3a97h2589631op4xk29hjc4',
                organisation: 'Shopsafe',
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
            },
          ],
        },
      },
    },
  },
];

const UseArticleListTest = () => {
  const { data, loading } = useArticlesSection({
    fullSearch: 'a',
    fullCreatedAtFilter: undefined,
    fullGroupFilter: [],
    fullGallery: [],
  });
  const articles =
    data &&
    data.articles?.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.title}</span>
      </div>
    ));

  return (
    <div>
      {articles}
      <span>{loading ? 'true' : 'false'}</span>
    </div>
  );
};

describe('useListArticles - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
    },
  });
  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseArticleListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('test')).toBeInTheDocument();
    expect(await findByText('false')).toBeInTheDocument();
  });
});
