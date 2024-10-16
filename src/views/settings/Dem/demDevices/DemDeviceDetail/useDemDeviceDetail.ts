import type { RecycleDemEvidenceMutation } from '#/components/tables/DemEvidenceTable/graphql/__generated__/recycle-dem-evidence.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { DemDeviceQuery } from '../graphql/queries/__generated__/dem-device.generated';
import type {
  ListDemDeviceEvidenceQuery,
  ListDemDeviceEvidenceQueryVariables,
} from '../graphql/queries/__generated__/list-device-dem-evidence.generated';

import { useDeleteDemDeviceMutation } from '../graphql/mutations/__generated__/delete-dem-device.generated';
import { useUpdateDemDeviceMutation } from '../graphql/mutations/__generated__/update-dem-device-business.generated';
import { useDemDeviceQuery } from '../graphql/queries/__generated__/dem-device.generated';
import {
  ListDemDeviceEvidenceDocument,
  useListDemDeviceEvidenceQuery,
} from '../graphql/queries/__generated__/list-device-dem-evidence.generated';

interface Return {
  assignToBusiness: boolean;
  data: DemDeviceQuery | undefined;
  deleteConfirm: () => void;
  editDemDevice: boolean;

  evidenceData: ListDemDeviceEvidenceQuery | undefined;
  evidenceLoading: boolean;
  loading: boolean;
  onAssignedBusiness: (value: string) => void;
  saving: boolean;
  toggleAssignToBusiness: () => void;
  toggleEditDemDevice: () => void;
  updateDeleteEvidenceList: MutationUpdaterFn<RecycleDemEvidenceMutation>;
}

const useDemDeviceDetail = (demDeviceId: string): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [editDemDevice, setEditDemDevice] = useState(false);
  const [assignToBusiness, setAssignToBusiness] = useState(false);

  const { data, loading } = useDemDeviceQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: demDeviceId,
      },
    },
  });
  const { data: evidenceData, loading: evidenceLoading } =
    useListDemDeviceEvidenceQuery({
      variables: {
        where: demDeviceId,
      },
    });
  const updateDeleteEvidenceList: MutationUpdaterFn<
    RecycleDemEvidenceMutation
  > = (store, { data: res }) => {
    if (
      res?.recycleDemEvidence === null ||
      res?.recycleDemEvidence === undefined
    )
      return;

    const existingData = store.readQuery<
      ListDemDeviceEvidenceQuery,
      ListDemDeviceEvidenceQueryVariables
    >({
      query: ListDemDeviceEvidenceDocument,
      variables: {
        where: demDeviceId,
      },
    });

    if (!existingData?.listDemDeviceEvidence.totalCount) return;

    store.writeQuery<
      ListDemDeviceEvidenceQuery,
      ListDemDeviceEvidenceQueryVariables
    >({
      data: {
        listDemDeviceEvidence: {
          ...existingData.listDemDeviceEvidence,
          edges: existingData.listDemDeviceEvidence.edges.filter(
            (item) => item.node.id !== res.recycleDemEvidence
          ),
        },
      },
      query: ListDemDeviceEvidenceDocument,
      variables: {
        where: demDeviceId,
      },
    });
  };
  const [updateDemDevice] = useUpdateDemDeviceMutation({
    onError: () => {
      errorNotification();
    },
  });

  const onAssignedBusiness = (value: string) => {
    setSaving(true);
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
        where: { id: demDeviceId },
      },
    }).finally(() => {
      setSaving(false);
      setAssignToBusiness(false);
    });
  };
  const [deleteDemDevice] = useDeleteDemDeviceMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The dem device has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const deleteConfirm = () => {
    setSaving(true);
    if (demDeviceId)
      void deleteDemDevice({
        variables: {
          id: demDeviceId,
        },
      });
  };
  const toggleEditDemDevice = () => setEditDemDevice(!editDemDevice);
  const toggleAssignToBusiness = () => setAssignToBusiness(!assignToBusiness);

  return {
    assignToBusiness,
    data,
    deleteConfirm,
    editDemDevice,
    evidenceData,
    evidenceLoading,
    loading,
    onAssignedBusiness,
    saving,
    toggleAssignToBusiness,
    toggleEditDemDevice,
    updateDeleteEvidenceList,
  };
};

export default useDemDeviceDetail;
