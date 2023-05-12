import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type {
  CreateVehicleMutation,
  ListVehiclesQuery,
} from 'graphql/generated';
import {
  useCreateVehicleMutation,
  ListVehiclesDocument,
  QueryMode,
  SortOrder,
  useListVehiclesQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import type { VehicleData } from 'types/DataType';

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addVehicle: boolean;
  toggleAddVehicle: () => void;
  // updateVehicleList: MutationUpdaterFn<CreateVehicleMutation>;
  onSubmit: (value: VehicleData) => void;
}

const useListVehicles = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addVehicle, setAddVehicle] = useState(false);
  const [search, setSearch] = useState('');
  // const [saving, setSaving] = useState(false);

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
          reference: {
            equals: Number(search),
          },
        },
        {
          registration: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
  };
  const { data: vehiclesData, loading } = useListVehiclesQuery({
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

  const [createVehicle] = useCreateVehicleMutation({
    onCompleted: () => {
      // setSaving(false);
      toggleAddVehicle();
      notification.success({
        message: 'Successfully Added!',
        description: 'The vehicle has been added! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      // setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateVehicleList,
  });

  const onSubmit = (data: VehicleData) => {
    // setSaving(true);
    createVehicle({
      variables: {
        data: {
          make: data.make || '',
          model: data.model || '',
          colour: data.colour || '',
          registration: data.registration || '',
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
                  }))
                : undefined,
          },
        },
      },
    });
  };
  return {
    data: vehiclesData,
    loading,
    search,
    setSearch,
    addVehicle,
    toggleAddVehicle,
    // updateVehicleList,
    onSubmit,
  };
};

export default useListVehicles;
