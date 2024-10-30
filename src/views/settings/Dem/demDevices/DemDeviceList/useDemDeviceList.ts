import type { UpsertDemDeviceMutation } from '#/components/form-components/DemDevice/AddDemDevice/graphql/mutations/__generated__/upsert-dem-device.generated';
import type { DemDeviceData } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

import errorNotification from '#/types/mutation_notifications/error_notification';
import { notification } from 'antd';
import { QueryMode } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

import type { DemDevicesQuery } from '../graphql/queries/__generated__/dem-devices.generated';

import { useUpdateDemDeviceMutation } from '../graphql/mutations/__generated__/update-dem-device-business.generated';
import {
  DemDevicesDocument,
  useDemDevicesQuery,
} from '../graphql/queries/__generated__/dem-devices.generated';

interface Return {
  addDemDevice: boolean;
  assignToBusiness: string;
  data: DemDevicesQuery | undefined;
  editData: DemDeviceData | undefined;
  loading: boolean;
  onAssignedBusiness: (value: string) => void;
  pagination: { page: number; pageSize: number };
  resetPage: () => void;
  saving: boolean;
  search: string;
  setAssignToBusiness: (value: string) => void;
  setEditData: (value: DemDeviceData | undefined) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setSearch: (value: string) => void;
  toggleAddDemDevice: () => void;
  updateDemDeviceList: MutationUpdaterFn<UpsertDemDeviceMutation>;
}

const useDemDeviceList = (): Return => {
  const intl = useIntl();

  const schemeId = useStoreState((state) => state.scheme.id);
  const [addDemDevice, setAddDemDevice] = useState(false);
  const [assignToBusiness, setAssignToBusiness] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pageSize: 24 });
  const [editData, setEditData] = useState<DemDeviceData | undefined>(
    undefined
  );
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const variables = {
    skip: (pagination.page - 1) * pagination.pageSize,
    take: pagination.pageSize,
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
      scheme: { id: { equals: schemeId } },
    },
  };
  const { data, loading } = useDemDevicesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const updateDemDeviceList: MutationUpdaterFn<UpsertDemDeviceMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing demDemDevice list data from Apollo store
    const existingData = store.readQuery<DemDevicesQuery>({
      query: DemDevicesDocument,
      variables: {
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              description: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
          ],
          scheme: { id: { equals: schemeId } },
        },
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<DemDevicesQuery>({
      data: {
        __typename: 'Query',
        demDevices: {
          ...existingData.demDevices,
          edges: [
            ...existingData.demDevices.edges,
            { node: res.upsertDemDevice },
          ],
        },
      },
      query: DemDevicesDocument,
      variables,
    });
  };
  const toggleAddDemDevice = () => {
    setAddDemDevice(!addDemDevice);
  };
  // assign to business
  const [updateDemDevice] = useUpdateDemDeviceMutation({
    onError: () => {
      errorNotification();
    },
  });

  const onAssignedBusiness = (value: string) => {
    setSaving(true);
    if (assignToBusiness)
      void updateDemDevice({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The dem device has been assigned to business.',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully Assigned!',
            }),
            placement: 'bottomRight',
          });
        },
        variables: {
          data: {
            businessId: value,
          },
          where: { id: assignToBusiness },
        },
      }).finally(() => {
        setSaving(false);
        setAssignToBusiness('');
      });
  };

  const resetPage = () => {
    if (pagination.page !== 1)
      setPagination({ page: 1, pageSize: pagination.pageSize });
  };
  return {
    addDemDevice,
    assignToBusiness,
    data,
    editData,
    loading,
    onAssignedBusiness,
    pagination,
    resetPage,
    saving,
    search,
    setAssignToBusiness,
    setEditData,
    setPagination,
    setSearch,
    toggleAddDemDevice,
    updateDemDeviceList,
  };
};

export default useDemDeviceList;
