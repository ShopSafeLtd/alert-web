import type {
  ListOffendersRelayQuery,
  ListOffendersRelayQueryVariables,
} from '#/views/profiles/offenders/OffenderFeed/graphql/queries/__generated__/offender-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import type { RecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import type {
  InputMaybe,
  OffenderOrderByWithRelationInput,
} from 'graphql/types';
import type { OffenderFilters } from 'state/data-model';

import { useGroupsContext } from '#/context/groups-context';
import {
  ListOffendersRelayDocument,
  useListOffendersRelayQuery,
} from '#/views/profiles/offenders/OffenderFeed/graphql/queries/__generated__/offender-feed.generated';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OffenderSort, useStoreActions, useStoreState } from 'state';
import cacheOrLoading from 'utils/cache-or-loading';

interface Return {
  adminRights: boolean;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  data: ListOffendersRelayQuery | undefined;
  fetchMoreScroll: () => void;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;
  onNavigate: () => void;
  onSelectCustomGalleries: (values: string) => void;
  onSelectGallery: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setCompactView: () => void;
  setGallery: (values: string[]) => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
  sortFilter: boolean;
  tableView: boolean;
  toggleSortFilter: () => void;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  variables: OffenderFilters;
}

const useOffenderFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate('/app/offenders/add');

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    filterDefaultGroups: defaultGroups,
    id: userId,
    role,
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
    index: 0,
    open: false,
  });
  const isUser = role === Role.User;
  const { groups: defaultGroupsOnScheme } = useGroupsContext();
  const {
    age,
    build,
    businesses,
    compactView,
    createdAt,
    customGalleries,
    ethnicity,
    gallery,
    groups,
    hair,
    peculiarities,
    search,
    sex,
    tableView,
    warnings,
  } = filterVariables;

  const generateSorted = (): {
    order: InputMaybe<OffenderOrderByWithRelationInput>;
    orderByValue: InputMaybe<SortOrder>;
  } => {
    switch (order) {
      case OffenderSort.updatedAtAsc: {
        return {
          order: { updatedAt: SortOrder.Asc },
          orderByValue: null,
        };
      }
      case OffenderSort.noIncidentAsc: {
        return {
          order: { incidents: { _count: SortOrder.Asc } },
          orderByValue: null,
        };
      }
      case OffenderSort.noIncidentDesc: {
        return {
          order: { incidents: { _count: SortOrder.Desc } },
          orderByValue: null,
        };
      }
      case OffenderSort.incidentValueAsc: {
        return {
          order: null,
          orderByValue: SortOrder.Asc,
        };
      }
      case OffenderSort.incidentValueDesc: {
        return {
          order: null,
          orderByValue: SortOrder.Desc,
        };
      }

      default: {
        return {
          order: { updatedAt: SortOrder.Desc },
          orderByValue: null,
        };
      }
    }
  };

  const variables: ListOffendersRelayQueryVariables = {
    scheme: {
      id: schemeId,
    },
    ...generateSorted(),
    first: compactView ? 48 : 12,
    where: {
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
      active: gallery.includes('ACTIVE')
        ? {
            equals: true,
          }
        : undefined,
      age:
        age.length > 0
          ? {
              in: age,
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
      bans: gallery.includes('BANNED')
        ? {
            some: {
              active: {
                equals: true,
              },
            },
          }
        : undefined,
      build:
        build.length > 0
          ? {
              in: build,
            }
          : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
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
      gender:
        sex.length > 0
          ? {
              in: sex,
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
          : {
              // TODO check this is right, it will fallback to all scheme groups available to user, i.e if admin all if not then whatever they have
              some: {
                id: {
                  in: defaultGroupsOnScheme.map(({ value: id }) => id),
                },
              },
            },
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
      name: gallery.includes('ID')
        ? {
            equals: 'Unidentified Offender',
          }
        : undefined,
      peculiarities: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      race:
        ethnicity.length > 0
          ? {
              in: ethnicity,
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
    },
  };
  // On mount
  useEffect(() => {
    if (groups.length === 0)
      setOffendersState({
        order,
        pagination,
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
  }, []);

  // Queries
  // Fetch Offenders
  const { data, fetchMore, loading } = useListOffendersRelayQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // custom galleries
  const { data: customGalleriesData } = useListCustomGalleriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        name: SortOrder.Asc,
      },
      take: 100,
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
      data: {
        __typename: 'Query',
        listOffendersRelay: {
          ...existingData.listOffendersRelay,
          edges: existingData.listOffendersRelay?.edges.filter(
            (edge) => edge?.node?.id !== res?.recycleOffender?.id
          ),
        },
      },
      query: ListOffendersRelayDocument,
      variables,
    });
  };

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);

    if (lightBoxOpen.open) {
      setLightBoxOpen({
        index,
        open: !lightBoxOpen.open,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            index,
            open: !lightBoxOpen.open,
          }),
        0.3
      );
    }
  };

  const setGallery = (values: string[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        gallery: values,
      },
    });
  };
  const setCustomGalleries = (values: string[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        customGalleries: values,
      },
    });
  };

  const setSearch = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
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
      order,
      pagination,
      variables: {
        ...filterVariables,
        compactView: tableView ? compactView : !compactView,
        tableView: false,
      },
    });
  };
  const setTableView = () => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        tableView: !tableView,
      },
    });
  };

  const fetchMoreScroll = () => {
    void fetchMore({
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
      variables: {
        ...filterVariables,
        after: data?.listOffendersRelay?.pageInfo?.endCursor,
      },
    });
  };

  return {
    adminRights: role !== Role.User,
    customGalleriesData,
    data,
    fetchMoreScroll,
    lightBoxOpen,
    lightboxElements,
    loading: cacheOrLoading({
      data,
      loading,
    }),
    onNavigate,
    onSelectCustomGalleries,
    onSelectGallery,
    openLightbox: triggerLightbox,
    setCompactView,
    setGallery,
    setSearch,
    setTableView,
    sortFilter,
    tableView,
    toggleSortFilter,
    updateOffenderList,
    variables: filterVariables,
  };
};

export default useOffenderFeed;
