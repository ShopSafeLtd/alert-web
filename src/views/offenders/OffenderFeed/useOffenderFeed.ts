import {
  ListOffendersQuery,
  QueryMode,
  Role,
  SortOrder,
  useListOffendersQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
  Model,
  ListOffendersDocument,
  RecycleOffenderMutation,
} from 'graphql/generated';
import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState, OffenderSort } from 'state';
import { useLightbox } from 'simple-react-lightbox';
import { MutationUpdaterFn } from '@apollo/client';
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
  tags: { value: string; label: string }[];
  onTagsChange: (tags: string[]) => void;
  tagsLoading: boolean;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
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

const useOffenderFeed = (): Return => {
  // Lightbox hook
  const { openLightbox } = useLightbox();
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/offenders/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  // local State
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
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
    onCompleted: (result) => {
      setOffendersState({
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
                .filter((group) => group.id === schemeId)
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
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        updatedAt:
          order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      where: {
        tags: variables.tags.length
          ? {
              some: {
                id: {
                  in: variables.tags,
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
            name: {
              contains: variables.search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      take: pagination.pageSize,
      skip: pagination.pageSize * (pagination.page - 1),
    },
    fetchPolicy: 'cache-and-network',
  });

  // update Offender list after deleting an item
  const updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListOffendersQuery>({
      query: ListOffendersDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt:
            order === OffenderSort.updatedAtDesc
              ? SortOrder.Desc
              : SortOrder.Asc,
        },
        where: {
          tags: variables.tags.length
            ? {
                some: {
                  id: {
                    in: variables.tags,
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
              name: {
                contains: variables.search,
                mode: QueryMode.Insensitive,
              },
            },
          ],
        },
        take: pagination.pageSize,
        skip: pagination.pageSize * (pagination.page - 1),
      },
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
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt:
            order === OffenderSort.updatedAtDesc
              ? SortOrder.Desc
              : SortOrder.Asc,
        },
        where: {
          tags: variables.tags.length
            ? {
                some: {
                  id: {
                    in: variables.tags,
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
              name: {
                contains: variables.search,
                mode: QueryMode.Insensitive,
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
    setTimeout(() => openLightbox(index), 0.3);
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
            .filter((group) => group.id === schemeId)
            .map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onGroupsChange,
    variables,
    onTagsChange,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    updateOffenderList,
    onNavigate,
  };
};

export default useOffenderFeed;
