import type { MutationUpdaterFn } from '@apollo/client';
import type {
  CreateVehicleMutation,
  ListVehiclesQuery,
} from 'graphql/generated';
import {
  ListVehiclesDocument,
  QueryMode,
  SortOrder,
  useListVehiclesQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addVehicle: boolean;
  toggleAddVehicle: () => void;
  updateVehicleList: MutationUpdaterFn<CreateVehicleMutation>;
}

const useListVehicles = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addVehicle, setAddVehicle] = useState(false);
  const [search, setSearch] = useState('');
  const variables = {
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

      OR: [
        {
          make: {
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
  const { data, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const toggleAddVehicle = () => {
    setAddVehicle(!addVehicle);
  };

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
  return {
    data,
    loading,
    search,
    setSearch,
    addVehicle,
    toggleAddVehicle,
    updateVehicleList,
  };
};

export default useListVehicles;
