import type {
  ListCustomGalleriesQuery,
  ListOffendersRelayQuery,
  RecycleOffenderMutation,
} from 'graphql/generated';
import {
  ListOffendersRelayDocument,
  QueryMode,
  Role,
  SortOrder,
  useListCustomGalleriesQuery,
  useListOffendersRelayQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { OffenderSort, useStoreActions, useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import type { OffenderFilters } from 'state/data-model';
import cacheOrLoading from 'utils/cache-or-loading';

interface Return {
  data: ListOffendersRelayQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  setSearch: (value: string) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGallery: (values: string[]) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  adminRights: boolean;
  onSelectCustomGalleries: (values: string) => void;
  onSelectGallery: (value: string) => void;
  variables: OffenderFilters;
  fetchMoreScroll: () => void;
  setCompactView: () => void;
  setTableView: () => void;
  tableView: boolean;
}

const useOffenderFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/offenders/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    role,
    id: userId,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const filterVariables = useStoreState(
    (state) => state.data.offenders.variables
  );
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  // local State
  const [sortFilter, setSortFilter] = useState(false);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const isUser = role === Role.User;
  const {
    search,
    groups,
    businesses,
    createdAt,
    gallery,
    customGalleries,
    peculiarities,
    hair,
    warnings,
    ethnicity,
    age,
    build,
    sex,
    compactView,
    tableView,
  } = filterVariables;
  const variables = {
    scheme: {
      id: schemeId,
    },
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    where: {
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      tags:
        warnings.length > 0
          ? {
              some: {
                id: {
                  in: warnings,
                },
              },
            }
          : undefined,
      groups:
        groups.length > 0
          ? {
              some: {
                id: {
                  in: groups,
                },
              },
            }
          : undefined,
      gender:
        sex.length > 0
          ? {
              in: sex,
            }
          : undefined,
      age:
        age.length > 0
          ? {
              in: age,
            }
          : undefined,
      build:
        build.length > 0
          ? {
              in: build,
            }
          : undefined,
      race:
        ethnicity.length > 0
          ? {
              in: ethnicity,
            }
          : undefined,
      hair: hair
        ? {
            contains: hair,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      idVerified: gallery.includes('VERIFIED_ID')
        ? {
            equals: true,
          }
        : undefined,
      peculiarities: peculiarities
        ? {
            mode: QueryMode.Insensitive,
            contains: peculiarities,
          }
        : undefined,
      incidents:
        businesses.length > 0
          ? {
              some: {
                business: {
                  id: {
                    in: businesses,
                  },
                },
              },
            }
          : undefined,
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          alias: {
            hasSome: [search],
          },
        },
        {
          referenceStr: {
            contains: search,
          },
        },
      ],
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      name: gallery.includes('ID')
        ? {
            equals: 'Unidentified Offender',
          }
        : undefined,
      active: gallery.includes('ACTIVE')
        ? {
            equals: true,
          }
        : undefined,
      approved: isUser
        ? {
            equals: true,
          }
        : gallery.includes('NOT APPROVED')
        ? {
            equals: false,
          }
        : undefined,
      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
      bans: gallery.includes('BANNED')
        ? {
            some: {
              active: {
                equals: true,
              },
            },
          }
        : undefined,
      customGalleries:
        customGalleries && customGalleries.length > 0
          ? {
              some: {
                id: {
                  in: customGalleries,
                },
              },
            }
          : undefined,
    },
    first: compactView ? 48 : 12,
  };
  // On mount
  useEffect(() => {
    if (groups.length === 0)
      setOffendersState({
        pagination,
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
        order,
      });
  }, []);

  // Queries
  // Fetch Offenders
  const { data, loading, fetchMore } = useListOffendersRelayQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });

  // custom galleries
  const { data: customGalleriesData } = useListCustomGalleriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        name: SortOrder.Asc,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  // update Offender list after deleting an item
  const updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListOffendersRelayQuery>({
      query: ListOffendersRelayDocument,
      variables,
    });

    if (existingData === null) return;
    if (existingData?.listOffendersRelay?.edges === undefined) return;

    store.writeQuery<ListOffendersRelayQuery>({
      query: ListOffendersRelayDocument,
      data: {
        listOffendersRelay: {
          ...existingData.listOffendersRelay,
          edges: existingData.listOffendersRelay?.edges.filter(
            (edge) => edge?.node?.id !== res?.recycleOffender?.id
          ),
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);

    if (lightBoxOpen.open) {
      setLightBoxOpen({
        open: !lightBoxOpen.open,
        index,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            open: !lightBoxOpen.open,
            index,
          }),
        0.3
      );
    }
  };

  const setGallery = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        gallery: values,
      },
      order,
    });
  };
  const setCustomGalleries = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        customGalleries: values,
      },
      order,
    });
  };

  const setSearch = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
      order,
    });
  };

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const onSelectCustomGalleries = (id: string) => {
    if (id) {
      if (customGalleries.includes(id)) {
        setCustomGalleries(customGalleries.filter((index) => index !== id));
      } else {
        setCustomGalleries([...customGalleries, id]);
      }
    }
  };
  const onSelectGallery = (id: string) => {
    if (id) {
      if (gallery.includes(id)) {
        setGallery(gallery.filter((index) => index !== id));
      } else {
        setGallery([...gallery, id]);
      }
    }
  };

  const setCompactView = () => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        tableView: false,
        compactView: tableView ? compactView : !compactView,
      },
      order,
    });
  };
  const setTableView = () => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        tableView: !tableView,
      },
      order,
    });
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...filterVariables,
        after: data?.listOffendersRelay?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffendersRelay: {
            ...fetchMoreResult.listOffendersRelay,
            edges: [
              ...(prev.listOffendersRelay?.edges || []),
              ...(fetchMoreResult.listOffendersRelay?.edges || []),
            ],
          },
        };
      },
    });
  };

  return {
    fetchMoreScroll,
    data,
    loading: cacheOrLoading({
      loading,
      data,
    }),
    lightBoxOpen,
    openLightbox: triggerLightbox,
    lightboxElements,
    setSearch,
    variables: filterVariables,
    updateOffenderList,
    onNavigate,
    sortFilter,
    toggleSortFilter,
    setGallery,
    customGalleriesData,
    adminRights: role !== Role.User,
    onSelectCustomGalleries,
    onSelectGallery,
    setCompactView,
    tableView,
    setTableView,
  };
};

export default useOffenderFeed;
