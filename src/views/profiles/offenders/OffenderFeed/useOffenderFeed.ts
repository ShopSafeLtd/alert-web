/* eslint-disable @typescript-eslint/no-unused-expressions */
import type {
  Age,
  Build,
  Gender,
  ListCustomGalleriesQuery,
  OffenderFeedListQuery,
  Race,
  RecycleOffenderMutation,
  SearchBusinessesQuery,
} from 'graphql/generated';
import {
  Model,
  OffenderFeedListDocument,
  QueryMode,
  Role,
  SortOrder,
  useListCustomGalleriesQuery,
  useOffenderFeedListQuery,
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
  data: OffenderFeedListQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
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
}

const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['12', '24', '48', '96'];
  }
  if (window.innerWidth > 1799) {
    return ['12', '24', '48', '96'];
  }
  return ['12'];
};

const useOffenderFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/offenders/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    role,
    id: userId,
    defaultGroups,
  } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const defaultGroupsId = defaultGroups
    .filter(({ scheme }) => scheme.id === schemeId)
    .map(({ id }) => id);
  // local State
  const [sortFilter, setSortFilter] = useState(false);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  // const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  // const [warnings, setWarnings] = useState<string[]>([]);
  // const [ethnicity, setEthnicity] = useState<Race[]>([]);
  // const [age, setAge] = useState<Age[]>([]);
  // const [build, setBuild] = useState<Build[]>([]);
  // const [sex, setSex] = useState<Gender[]>([]);
  // const [hair, setHair] = useState('');
  // const [peculiarities, setPeculiarities] = useState('');
  // const [gallery, setGallery] = useState<string[]>([]);
  // const [customGalleries, setCustomGalleries] = useState<string[]>([]);
  // const [businesses, setBusinesses] = useState<string[]>([]);
  // const [createdAtFilter, setCreatedAtFilter] = useState<
  //   DateType | undefined
  // >();
  const isUser = role === Role.User;

  const {
    search,
    groups: groupsFilter,
    businesses,
    createdAt: createdAtFilter,
    gallery,
    customGalleries,
    peculiarities,
    hair,
    warnings,
    ethnicity,
    age,
    build,
    sex,
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
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
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
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
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
    take: pagination.pageSize,
    skip: pagination.pageSize * (pagination.page - 1),
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
    const sizeOptions = getSizeOptions();
    setOffendersState({
      pagination: {
        ...pagination,
        sizeOptions,
        pageSize: Number(sizeOptions[0]),
      },
      variables: {
        ...variables,
        groups: defaultGroupsId,
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
  const { data, loading, fetchMore } = useOffenderFeedListQuery({
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

    const existingData = store.readQuery<OffenderFeedListQuery>({
      query: OffenderFeedListDocument,
      variables: queryVariables,
    });

    if (existingData === null) return;
    if (existingData?.listOffenders?.offenders === undefined) return;

    store.writeQuery<OffenderFeedListQuery>({
      query: OffenderFeedListDocument,
      data: {
        listOffenders: {
          ...existingData.listOffenders,
          offenders: existingData.listOffenders?.offenders.filter(
            (offender) => offender.id !== res?.recycleOffender?.id
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
  const onPaginationChange = (page: number, pageSize: number) => {
    setOffendersState({
      pagination: {
        ...pagination,
        page,
        pageSize,
      },
      variables,
      order,
    });
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

  const clearFilters = () => {
    setOffendersState({
      pagination,
      variables: {
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
        ...queryVariables,
        take: 12,
        skip: data?.listOffenders?.offenders?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffenders: {
            ...fetchMoreResult.listOffenders,
            total:
              fetchMoreResult.listOffenders?.total ||
              prev.listOffenders?.total ||
              0,
            offenders: [
              ...(prev.listOffenders?.offenders || []),
              ...(fetchMoreResult.listOffenders?.offenders || []),
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
    onPaginationChange,
    pagination,
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
  };
};

export default useOffenderFeed;
