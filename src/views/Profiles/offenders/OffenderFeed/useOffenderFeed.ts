/* eslint-disable @typescript-eslint/no-unused-expressions */
import type {
  Age,
  Build,
  Gender,
  ListOffendersQuery,
  Race,
  RecycleOffenderMutation,
  SearchBusinessesQuery,
} from 'graphql/generated';
import {
  ListOffendersDocument,
  Model,
  QueryMode,
  Role,
  SortOrder,
  useListOffendersQuery,
  useSchemeGroupsQuery,
  useSearchBusinessesQuery,
  useTagsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { OffenderSort, useStoreActions, useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface Return {
  data: ListOffendersQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: OffenderSort;
  setOrder: (value: OffenderSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
    tags: string[];
  };
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  tags: { value: string; label: string }[];
  onTagsChange: (tags: string[]) => void;
  tagsLoading: boolean;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  ethnicity: Race[];
  setEthnicity: (value: Race[]) => void;
  age: Age[];
  setAge: (value: Age[]) => void;
  build: Build[];
  setBuild: (value: Build[]) => void;
  sex: Gender[];
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  hair: string;
  peculiarities: string;
  clearFilters: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  warnings: string[];
  setWarnings: (value: string[]) => void;
  businesses: string[];
  setBusinesses: (value: string[]) => void;
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
}

const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['24', '48', '96'];
  }
  if (window.innerWidth > 1799) {
    return ['24', '48', '96'];
  }
  return ['24'];
};

const useOffenderFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/offenders/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, groups, id: userId } = useStoreState((state) => state.user);
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
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [ethnicity, setEthnicity] = useState<Race[]>([]);
  const [age, setAge] = useState<Age[]>([]);
  const [build, setBuild] = useState<Build[]>([]);
  const [sex, setSex] = useState<Gender[]>([]);
  const [hair, setHair] = useState('');
  const [peculiarities, setPeculiarities] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [businesses, setBusinesses] = useState<string[]>([]);

  const queryVariables = {
    scheme: {
      id: schemeId,
    },
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    where: {
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
      OR: [
        {
          name: {
            contains: variables.search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
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
      approved: gallery.includes('APPROVED')
        ? {
            equals: true,
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
                business:
                  businesses.length > 0
                    ? {
                        id: {
                          in: businesses,
                        },
                      }
                    : undefined,
              },
            }
          : undefined,
      bans: gallery.includes('BANNED')
        ? {
            some: {
              id: {
                contains: '',
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
        groups:
          role === Role.SchemeAdmin
            ? groupData?.groups.map((group) => group.id) || []
            : groups
                // .filter((group) => group.id === schemeId)
                .map((group) => group.id),
      },
      order,
    });
    // eslint-disable-next-line
  }, []);

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: Model.Offender,
        },
      },
    },
  });

  // Fetch Offenders
  const { data, loading } = useListOffendersQuery({
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

  // update Offender list after deleting an item
  const updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListOffendersQuery>({
      query: ListOffendersDocument,
      variables: queryVariables,
    });

    if (existingData === null) return;
    if (existingData?.listOffenders?.offenders === undefined) return;

    store.writeQuery<ListOffendersQuery>({
      query: ListOffendersDocument,
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

  const onGroupsChange = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };

  const onTagsChange = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        tags: values,
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

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const clearFilters = () => {
    setGroupsFilter([]);
    setWarnings([]);
    setAge([]);
    setBuild([]);
    setEthnicity([]);
    setHair('');
    setPeculiarities('');
    setSex([]);
    setBusinesses([]);
    setOrder(OffenderSort.updatedAtDesc);
  };

  return {
    data,
    loading,
    lightBoxOpen,
    openLightbox: triggerLightbox,
    lightboxElements,
    onPaginationChange,
    pagination,
    order,
    setOrder,
    search: variables.search,
    setSearch,
    groups:
      role === Role.SchemeAdmin
        ? groupData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onGroupsChange,
    variables,
    onTagsChange,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    updateOffenderList,
    onNavigate,
    sortFilter,
    toggleSortFilter,
    age,
    build,
    clearFilters,
    ethnicity,
    gallery,
    hair,
    peculiarities,
    setAge,
    setBuild,
    setEthnicity,
    setGallery,
    setHair,
    setPeculiarities,
    setSex,
    sex,
    groupsFilter,
    setGroupsFilter,
    setWarnings,
    warnings,
    businessData,
    businesses,
    setBusinesses,
    businessesLoading,
  };
};

export default useOffenderFeed;
