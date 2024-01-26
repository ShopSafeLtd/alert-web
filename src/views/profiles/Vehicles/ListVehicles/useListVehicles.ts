import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type {
  CreateVehicleMutation,
  ListCustomGalleriesQuery,
  ListVehiclesQuery,
} from 'graphql/generated';
import {
  ListVehiclesDocument,
  QueryMode,
  Role,
  SortOrder,
  useCreateVehicleMutation,
  useListCustomGalleriesQuery,
  useListVehiclesQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';
import type { DateType, VehicleData } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { VehicleFilters } from 'state/data-model';
import { useNavigate } from 'react-router';

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  onSubmit: (value: VehicleData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  onSelectCustomGalleries: (values: string) => void;
  setOrder: (value: SortOrder) => void;
  addInvestigation: string;
  toggleAddInvestigation: (value: string) => void;
  variables: VehicleFilters;
  onNavigate: () => void;
}
const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['10', '20', '30'];
  }
  if (window.innerWidth > 1799) {
    return ['10', '20', '30'];
  }
  return ['10'];
};
const useListVehicles = (): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/vehicles/add`);
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    role,
    id: userId,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.vehicles.pagination);
  const filterVariables = useStoreState(
    (state) => state.data.vehicles.variables
  );
  const setFilterState = useStoreActions((actions) => actions.data.setVehicles);
  const [sortFilter, setSortFilter] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState('');
  const {
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    gallery,
    customGalleries,
    order,
  } = filterVariables;

  const variables = {
    order: {
      updatedAt: order,
    },
    where: {
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
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
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
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

      OR: [
        {
          make: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          referenceStr: {
            contains: search,
          },
        },
        {
          registration: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          model: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
  };

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    if (groupsFilter.length === 0) {
      setFilterState({
        pagination: {
          ...pagination,
          sizeOptions,
          pageSize: Number(sizeOptions[0]),
        },
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    } else {
      setFilterState({
        pagination: {
          ...pagination,
          sizeOptions,
          pageSize: Number(sizeOptions[0]),
        },
        variables: filterVariables,
      });
    }
  }, []);
  const { data: vehiclesData, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
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

  const updateVehicleList: MutationUpdaterFn<CreateVehicleMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListVehiclesQuery>({
      query: ListVehiclesDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<ListVehiclesQuery>({
      query: ListVehiclesDocument,
      data: {
        listVehicles: {
          ...existingData.listVehicles,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          vehicles:
            existingData?.listVehicles?.vehicles &&
            existingData.listVehicles.vehicles.length > 0
              ? [
                  ...(existingData?.listVehicles?.vehicles || []),
                  ...(Array.isArray(res.createVehicle)
                    ? res.createVehicle
                    : [res.createVehicle]),
                ]
              : [res.createVehicle],
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const [createVehicle] = useCreateVehicleMutation({
    onCompleted: () => {
      // setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been added!',
          id: 'htkq75',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      // setSaving(false);
      errorNotification();
    },
    update: updateVehicleList,
  });

  const onSubmit = (data: VehicleData) => {
    void createVehicle({
      variables: {
        data: {
          make: data.make || '',
          model: data.model || '',
          colour: data.colour || '',
          registration: data.registration || '',
          groups:
            data?.groups && data.groups.length > 0
              ? data?.groups?.map((id) => ({ id }))
              : [],
          customGalleries: {
            connect:
              data.customGalleries && data.customGalleries.length > 0
                ? data.customGalleries.map((id) => ({ id }))
                : undefined,
            create:
              data.newCustomGalleriesData &&
              data.newCustomGalleriesData.length > 0
                ? data.newCustomGalleriesData.map((value) => ({
                    name: value.name,
                    description: value.description || '',
                    schemes: { connect: [{ id: schemeId }] },
                    groups: {
                      connect:
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups?.map((id) => ({ id })) || [],
                    },
                  }))
                : undefined,
          },
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length > 0
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          incidents:
            data.incidents && data.incidents.length > 0
              ? data.incidents.map((id) => ({ id }))
              : [],
          offenders:
            data.offenders && data.offenders.length > 0
              ? data.offenders.map((id) => ({ id }))
              : [],
          schemes: schemeId,

          image: {
            upload:
              data.images && data.images.length > 0
                ? data.images.map((item) => ({
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                    position: item.position,
                    primary: item.primary,
                    policeImage: item.policeImage,
                    rotation: item.rotation || 0,
                  }))
                : undefined,
          },
        },
      },
    });
  };
  const setGallery = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        gallery: values,
      },
    });
  };
  const setCustomGalleries = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        customGalleries: values,
      },
    });
  };
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        createdAt: values,
      },
    });
  };

  const setOrder = (values: SortOrder) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        order: values,
      },
    });
  };

  const setSearch = (value: string) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
    });
  };
  const setGroupsFilter = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        groups: values,
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
  // const onSelectGalleries = (id: string) => {
  //   if (id) {
  //     if (gallery.includes(id)) {
  //       setGallery(gallery.filter((index) => index !== id));
  //     } else {
  //       setCustomGalleries([...gallery, id]);
  //     }
  //   }
  // };
  const clearFilters = () => {
    setFilterState({
      pagination,
      variables: {
        order: SortOrder.Desc,
        search: '',
        createdAt: undefined,
        gallery: [],
        customGalleries: [],
        groups: [],
      },
    });
  };
  return {
    data: vehiclesData,
    loading,
    setSearch,

    // updateVehicleList,
    onSubmit,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    customGalleriesData,
    onSelectCustomGalleries,
    setGallery,
    setOrder,
    addInvestigation,
    toggleAddInvestigation: setAddInvestigation,
    variables: filterVariables,
    onNavigate,
  };
};

export default useListVehicles;
