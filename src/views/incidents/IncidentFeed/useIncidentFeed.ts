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
import { useStoreState } from "state";
import { useLightbox } from "simple-react-lightbox";

export enum IncidentSort {
  createdAtDesc = "CREATED_AT_DESC",
  createdAtAsc = "CREATED_AT_ASC",
}

interface Variables {
  crimeTypes: string[];
  groups: string[];
  approved: boolean | undefined;
}

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
  const { openLightbox } = useLightbox();

  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    sizeOptions: ["24"],
  });
  const [search, setSearch] = useState("");
  const [variables, setVariables] = useState<Variables>({
    crimeTypes: [],
    groups: [],
    approved: undefined,
  });
  const [order, setOrder] = useState(IncidentSort.createdAtDesc);

  const scheme = useStoreState((state) => state.scheme.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);

  useEffect(() => {
    const sizeOptions = getSizeOptions()
    setPagination({
      ...pagination,
      sizeOptions,
      pageSize: Number(sizeOptions[0])
    });

    setVariables({
      ...variables,
      groups: role === Role.SchemeAdmin ? groupData?.groups.map(group => group.id) || [] : groups.map(group => group.id)
    })
    // eslint-disable-next-line
  }, []);

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
      setVariables({
        ...variables,
        groups: result.groups.map(group => group.id)
      })
    }
  });

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
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              OR: [
                {
                  fullName: {
                    contains: search,
                    mode: QueryMode.Insensitive,
                  },
                },
                {
                  organisation: {
                    contains: search,
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

  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    setTimeout(() => openLightbox(index), 0.3);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      page,
      pageSize,
    });
  };

  const onGroupsChange = (values: string[]) => {
    setVariables({
      ...variables,
      groups: values
    })
  }

  const onCrimeTypesChange = (values: string[]) => {
    setVariables({
      ...variables,
      crimeTypes: values
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
    search,
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
