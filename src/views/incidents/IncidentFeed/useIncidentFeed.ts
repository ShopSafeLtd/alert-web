import {
  ListIncidentsDocument,
  ListIncidentsQuery,
  Model,
  QueryMode,
  RecycleIncidentMutation,
  Role,
  SortOrder,
  useListIncidentsQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { IncidentSort, useStoreActions, useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
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
  };
  crimeTypes: { value: string; label: string }[];
  onCrimeTypesChange: (crimeTypes: string[]) => void;
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
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

const useIncidentFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  // local State
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

  // Queries
  // Fetch scheme groups if scheme admin
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
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
    onCompleted: (result) => {
      setIncidentsState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map((group) => group.id),
        },
        order,
      });
    },
  });
  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    setIncidentsState({
      pagination: {
        ...pagination,
        sizeOptions,
        pageSize: Number(sizeOptions[0]),
      },
      variables: {
        ...variables,
        groups:
          role === Role.SchemeAdmin
            ? groupsData?.groups.map((group) => group.id) || []
            : groups.map((group) => group.id),
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
          equals: Model.Incident,
        },
      },
    },
  });

  // Fetch incidents
  const { data, loading } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: schemeId,
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
    fetchPolicy: 'cache-and-network',
  });

  // update Incident list after deleting an item
  const updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          createdAt:
            order === IncidentSort.createdAtDesc
              ? SortOrder.Desc
              : SortOrder.Asc,
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
    });

    if (existingData === null) return;
    if (existingData?.listIncidents?.incidents === undefined) return;

    store.writeQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      data: {
        listIncidents: {
          ...existingData.listIncidents,
          incidents: existingData.listIncidents?.incidents.filter(
            (incident) => incident.id !== res?.recycleIncident?.id
          ),
        },
        __typename: 'Query',
      },
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          createdAt:
            order === IncidentSort.createdAtDesc
              ? SortOrder.Desc
              : SortOrder.Asc,
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
    setIncidentsState({
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
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };

  const onCrimeTypesChange = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
      order,
    });
  };

  const setOrder = (value: IncidentSort) => {
    setIncidentsState({
      pagination,
      variables,
      order: value,
    });
  };

  const setSearch = (value: string) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
      order,
    });
  };

  return {
    data,
    loading,
    lightboxElements,
    onPaginationChange,
    pagination,
    order,
    setOrder,
    search: variables.search,
    setSearch,
    groups:
      role === Role.SchemeAdmin
        ? groupsData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onGroupsChange,
    variables,
    onCrimeTypesChange,
    crimeTypes:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    updateIncidentList,
    onNavigate,
    lightBoxOpen,
    openLightbox: triggerLightbox,
  };
};

export default useIncidentFeed;
