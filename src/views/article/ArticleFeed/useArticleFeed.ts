import type {
  ListArticlesFeedQuery,
  ListArticlesFeedQueryVariables,
} from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import type { ArticleFilters } from 'state/data-model';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  currentSchemeDefaultGroups,
  currentUserAtom,
} from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { useListArticlesFeedQuery } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import { PermissionMethod, PermissionModel, QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  filterVariables: ArticleFilters;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  hasCreateRights: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
    watermarkImage?: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;
  onNavigate: () => void;
  openLightbox: (
    elements: { src: string }[],
    index: number,
    watermarkImage?: boolean
  ) => void;
  setGallery: (value: string[]) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  updateArticleList: MutationUpdaterFn<DeleteArticleMutation>;
}

// update Article list after deleting an item
const updateArticleList: MutationUpdaterFn<DeleteArticleMutation> = (
  store,
  { data: res }
) => {
  if (!res?.deleteArticle?.id) return;
  store.evict({
    id: store.identify({ __typename: 'Article', id: res.deleteArticle.id }),
  });
  store.gc();
};

const useArticleFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate('/app/article/add');

  // Global State
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const defaultGroups = useAtomValue(currentSchemeDefaultGroups);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';

  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );

  const setFilterState = useStoreActions((actions) => actions.data.setArticles);
  const {
    createdAt: createdAtFilter,
    gallery,
    groups: groupsFilter,
    order,
    priorities: priorityFilter,
    search,
    status,
  } = filterVariables;
  const [sortFilter, setSortFilter] = useState(false);

  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
    watermarkImage: true,
  });

  const variables: ListArticlesFeedQueryVariables = {
    first: 12,
    order: {
      updatedAt: order,
    },
    scheme: {
      id: schemeId,
    },
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          createdBy: {
            fullName: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        },
        {
          business: {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        },
      ],
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
          }
        : undefined,
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,
      priority:
        priorityFilter.length > 0
          ? {
              in: priorityFilter,
            }
          : undefined,
      status:
        status.length > 0
          ? {
              in: status,
            }
          : undefined,
    },
  };
  // On mount
  useEffect(() => {
    if (groupsFilter.length === 0)
      setFilterState({
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter((group) => group.schemeId === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
  }, []);
  // const { data, loading, fetchMore } = useListArticlesQuery({
  //   fetchPolicy: 'cache-and-network',
  //   variables,
  // });

  const { data, fetchMore, loading } = useListArticlesFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const { groups, groupsLoading } = useGroupsContext();

  // Functions
  const triggerLightbox = (
    elements: { src: string }[],
    index: number,
    watermarkImage?: boolean
  ) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        index,
        open: !lightBoxOpen.open,
        watermarkImage: watermarkImage ?? true,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            index,
            open: !lightBoxOpen.open,
            watermarkImage: watermarkImage ?? true,
          }),
        0.3
      );
    }
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listArticlesRelay: {
            ...fetchMoreResult.listArticlesRelay,
            edges: [
              ...(prev.listArticlesRelay?.edges || []),
              ...(fetchMoreResult.listArticlesRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...variables,
        after: data?.listArticlesRelay?.pageInfo?.endCursor,
      },
    });
  };
  // function

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const setGallery = (values: string[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        gallery: values,
      },
    });
  };
  const setSearch = (value: string) => {
    setFilterState({
      variables: {
        ...filterVariables,
        search: value,
      },
    });
  };
  const hasCreateRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Articles,
    },
  });
  return {
    data: data?.listArticlesRelay || null,
    fetchMoreScroll,
    filterVariables,
    groups,
    groupsLoading,
    hasCreateRights,
    lightBoxOpen,
    lightboxElements,
    loading: (data === null || data === undefined) && loading,
    onNavigate,
    openLightbox: triggerLightbox,
    setGallery,
    setSearch,
    sortFilter,
    toggleSortFilter,
    updateArticleList,
  };
};

export default useArticleFeed;
