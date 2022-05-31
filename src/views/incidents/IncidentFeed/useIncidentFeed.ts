import {
  ListIncidentsQuery,
  QueryMode,
  Role,
  SortOrder,
  useListIncidentsQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
  Model
} from "graphql/generated";
import { useState, useEffect } from "react";
import { useStoreActions, useStoreState, IncidentSort } from "state";
import { useLightbox } from "simple-react-lightbox";

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
    crimeTypes: string[];
  }
  crimeTypes: { value: string; label: string; }[];
  onCrimeTypesChange: (crimeTypes: string[]) => void;
  tagsLoading: boolean;
}

const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ["24", "48", "96"];
  } else if (window.innerWidth > 1799) {
    return ["24", "48", "96"];
  } else {
    return ["24"];
  }
};

const useIncidentFeed = (): Return => {
  // Lightbox hook
  const { openLightbox } = useLightbox();

  // Global State
  const scheme = useStoreState((state) => state.scheme.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState(state => state.data.incidents.pagination)
  const variables = useStoreState(state => state.data.incidents.variables)
  const order = useStoreState(state => state.data.incidents.order)
  const setIncidentsState = useStoreActions(actions => actions.data.setIncidents)

  // local State
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions()
    setIncidentsState({
      pagination: {
        ...pagination,
        sizeOptions,
        pageSize: Number(sizeOptions[0])
      },
      variables: {
        ...variables,
        groups: role === Role.SchemeAdmin ? groupData?.groups.map(group => group.id) || [] : groups.map(group => group.id)
      },
      order
    })
    // eslint-disable-next-line
  }, []);

  // Queries
  // Fetch scheme groups if scheme admin
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: scheme,
          },
        },
      },
    },
    fetchPolicy: "cache-and-network",
    skip: role !== Role.SchemeAdmin,
    onCompleted: (result) => {
      setIncidentsState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map(group => group.id)
        },
        order
      })
    }
  });

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: scheme
          }
        },
        dataType: {
          equals: Model.Incident
        }
      }
    }
  })

  // Fetch incidents
  const { data, loading } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: scheme,
      },
      order: {
        createdAt:
          order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      where: {
        crimeTypes: variables.crimeTypes.length
          ? {
              some: {
                id: {
                  in: variables.crimeTypes,
                },
              },
            }
          : undefined,
        groups: variables.groups.length
          ? {
              some: {
                id: {
                  in: variables.groups,
                },
              },
            }
          : undefined,
        OR: [
          {
            subject: {
              contains: variables.search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              OR: [
                {
                  fullName: {
                    contains: variables.search,
                    mode: QueryMode.Insensitive,
                  },
                },
                {
                  organisation: {
                    contains: variables.search,
                    mode: QueryMode.Insensitive,
                  },
                },
              ],
            },
          },
        ],
      },
      take: pagination.pageSize,
      skip: pagination.pageSize * (pagination.page - 1),
    },
    fetchPolicy: "cache-and-network",
  });

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    setTimeout(() => openLightbox(index), 0.3);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setIncidentsState({
      pagination: {
        ...pagination,
        page,
        pageSize
      },
      variables,
      order
    })
  };

  const onGroupsChange = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        groups: values
      },
      order
    })
  }

  const onCrimeTypesChange = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        crimeTypes: values
      },
      order
    })
  }

  const setOrder = (value: IncidentSort) => {
    setIncidentsState({
      pagination,
      variables,
      order: value
    })
  }

  const setSearch = (value: string) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        search: value
      },
      order
    })
  }

  return {
    data,
    loading,
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
        : groups
            .filter((group) => group.id === scheme)
            .map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onGroupsChange,
    variables,
    onCrimeTypesChange,
    crimeTypes: tagsData?.tags.map(tag => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading
  };
};

export default useIncidentFeed;
