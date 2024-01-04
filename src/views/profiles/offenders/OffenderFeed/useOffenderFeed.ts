/* eslint-disable @typescript-eslint/no-unused-expressions */
import type {
  Age,
  Build,
  Gender,
  ListCustomGalleriesQuery,
  ListOffendersRelayQuery,
  Race,
  RecycleOffenderMutation,
  SearchBusinessesQuery,
} from 'graphql/generated';
import {
  ListOffendersRelayDocument,
  Model,
  QueryMode,
  Role,
  SortOrder,
  useListCustomGalleriesQuery,
  useListOffendersRelayQuery,
  useSchemeGroupsQuery,
  useSearchBusinessesQuery,
  useTagsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { OffenderSort, useStoreActions, useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import type { DateType } from 'types/DataType';
import type { OffenderFilters } from 'state/data-model';
import cacheOrLoading from 'utils/cache-or-loading';

interface Return {
  data: ListOffendersRelayQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  order: OffenderSort;
  setOrder: (value: OffenderSort) => void;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setEthnicity: (value: Race[]) => void;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setWarnings: (value: string[]) => void;
  setBusinesses: (value: string[]) => void;
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  adminRights: boolean;
  onSelectCustomGalleries: (values: string) => void;
  onSelectGallery: (value: string) => void;
  variables: OffenderFilters;
  fetchMoreScroll: () => void;
  setCompactView: () => void;
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
  const variables = useStoreState((state) => state.data.offenders.variables);
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
  } = variables;
  const queryVariables = {
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
  // Queries
  // Fetch scheme groups if scheme admin
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
  });
  // On mount
  useEffect(() => {
    if (groups.length === 0)
      setOffendersState({
        pagination,
        variables: {
          ...variables,
          groups: defaultGroups.map(({ id }) => id),
        },
        order,
      });
  }, []);

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
        dataType: {
          equals: Model.Offender,
        },
      },
    },
  });

  // Fetch Offenders
  const { data, loading, fetchMore } = useListOffendersRelayQuery({
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const { data: businessData, loading: businessesLoading } =
    useSearchBusinessesQuery({
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
        orderBy: {
          name: SortOrder.Asc,
        },
      },
    });
  // custom galleries
  const { data: customGalleriesData } = useListCustomGalleriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
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
      variables: queryVariables,
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
      variables: queryVariables,
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

  const setGroupsFilter = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };

  const setWarnings = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        warnings: values,
      },
      order,
    });
  };
  const setBusinesses = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
      order,
    });
  };
  const setEthnicity = (values: Race[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        ethnicity: values,
      },
      order,
    });
  };
  const setBuild = (values: Build[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        build: values,
      },
      order,
    });
  };
  const setAge = (values: Age[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        age: values,
      },
      order,
    });
  };
  const setSex = (values: Gender[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        sex: values,
      },
      order,
    });
  };
  const setGallery = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        gallery: values,
      },
      order,
    });
  };
  const setCustomGalleries = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        customGalleries: values,
      },
      order,
    });
  };
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
      order,
    });
  };
  const setOrder = (value: OffenderSort) => {
    setOffendersState({
      pagination,
      variables,
      order: value,
    });
  };
  const setSearch = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
      order,
    });
  };
  const setPeculiarities = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        peculiarities: value,
      },
      order,
    });
  };
  const setHair = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        hair: value,
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
        ...variables,
        compactView: !compactView,
      },
      order,
    });
  };

  const clearFilters = () => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        search: '',
        warnings: [],
        groups: [],
        businesses: [],
        createdAt: undefined,
        gallery: [],
        customGalleries: [],
        peculiarities: '',
        hair: '',
        ethnicity: [],
        build: [],
        age: [],
        sex: [],
      },
      order: OffenderSort.updatedAtDesc,
    });
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
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

    order,
    setOrder,
    setSearch,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    variables,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    updateOffenderList,
    onNavigate,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setAge,
    setBuild,
    setEthnicity,
    setGallery,
    setHair,
    setPeculiarities,
    setSex,
    setGroupsFilter,
    setWarnings,
    businessData,
    setBusinesses,
    businessesLoading,
    setCreatedAtFilter,
    customGalleriesData,
    adminRights: role !== Role.User,
    onSelectCustomGalleries,
    onSelectGallery,
    setCompactView,
  };
};

export default useOffenderFeed;
