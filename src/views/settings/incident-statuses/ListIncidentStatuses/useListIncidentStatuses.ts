import type { ListIncidentStatusesQuery } from 'graphql/incidents/queries/__generated__/list-incident-statuses.generated';

import { message } from 'antd';
import { useDeleteIncidentStatusMutation } from 'graphql/incidents/mutations/__generated__/delete-incident-status.generated';
import { useListIncidentStatusesQuery } from 'graphql/incidents/queries/__generated__/list-incident-statuses.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';

interface TableData {
  description: null | string | undefined;
  key: string;
  name: string;
  tooltip: null | string | undefined;
}

interface Return {
  createDrawerOpen: boolean;
  data: ListIncidentStatusesQuery | undefined;
  editDrawerOpen: boolean;
  loading: boolean;
  onCloseCreateDrawer: () => void;
  onCloseEditDrawer: () => void;
  onDelete: (id: string) => Promise<void>;
  onOpenCreateDrawer: () => void;
  onOpenEditDrawer: (status: TableData) => void;
  selectedStatus: TableData | null;
}

const useListIncidentStatuses = (): Return => {
  const intl = useIntl();
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TableData | null>(null);

  const { data, loading } = useListIncidentStatusesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [deleteStatus] = useDeleteIncidentStatusMutation();

  const onOpenCreateDrawer = () => {
    setCreateDrawerOpen(true);
  };

  const onCloseCreateDrawer = () => {
    setCreateDrawerOpen(false);
  };

  const onOpenEditDrawer = (status: TableData) => {
    setSelectedStatus(status);
    setEditDrawerOpen(true);
  };

  const onCloseEditDrawer = () => {
    setEditDrawerOpen(false);
    setSelectedStatus(null);
  };

  const onDelete = async (id: string) => {
    try {
      await deleteStatus({
        refetchQueries: ['ListIncidentStatuses'],
        variables: {
          where: { id },
        },
      });
      void message.success(
        intl.formatMessage({ defaultMessage: 'Status deleted successfully' })
      );
    } catch (error) {
      void message.error(
        intl.formatMessage({
          defaultMessage: 'Failed to delete status',
        })
      );
      console.error('Error deleting status:', error);
    }
  };

  return {
    createDrawerOpen,
    data,
    editDrawerOpen,
    loading,
    onCloseCreateDrawer,
    onCloseEditDrawer,
    onDelete,
    onOpenCreateDrawer,
    onOpenEditDrawer,
    selectedStatus,
  };
};

export default useListIncidentStatuses;
