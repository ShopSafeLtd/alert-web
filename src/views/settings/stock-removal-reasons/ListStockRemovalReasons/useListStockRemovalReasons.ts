import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { message } from 'antd';
import { useUpsertStockRemovalReasonOptionMutation } from 'graphql/stock-removal-reasons/mutations/__generated__/upsert-stock-removal-reason-option.generated';
import { useListStockRemovalReasonOptionsQuery } from 'graphql/stock-removal-reasons/queries/__generated__/list-stock-removal-reason-options.generated';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export interface ReasonTableRow {
  active: boolean;
  id: string;
  label: string;
  position: number;
}

interface Return {
  createDrawerOpen: boolean;
  editDrawerOpen: boolean;
  loading: boolean;
  onCloseCreateDrawer: () => void;
  onCloseEditDrawer: () => void;
  onDelete: (id: string) => void;
  onOpenCreateDrawer: () => void;
  onOpenEditDrawer: (reason: ReasonTableRow) => void;
  reasons: ReasonTableRow[];
  selectedReason: ReasonTableRow | null;
}

const useListStockRemovalReasons = (): Return => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<ReasonTableRow | null>(
    null
  );

  const { data, loading } = useListStockRemovalReasonOptionsQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentSchemeId,
    variables: {
      where: { id: currentSchemeId },
    },
  });

  const [upsertReason] = useUpsertStockRemovalReasonOptionMutation();

  const reasons: ReasonTableRow[] = [
    ...(data?.scheme?.stockRemovalReasonOptions ?? []),
  ]
    .sort((a, b) => a.position - b.position)
    .map((r) => ({
      active: r.active,
      id: r.id,
      label: r.label,
      position: r.position,
    }));

  const onOpenCreateDrawer = () => setCreateDrawerOpen(true);
  const onCloseCreateDrawer = () => setCreateDrawerOpen(false);

  const onOpenEditDrawer = (reason: ReasonTableRow) => {
    setSelectedReason(reason);
    setEditDrawerOpen(true);
  };

  const onCloseEditDrawer = () => {
    setEditDrawerOpen(false);
    setSelectedReason(null);
  };

  const onDelete = (id: string) => {
    void (async () => {
      const reason = reasons.find((r) => r.id === id);
      if (!reason || !currentSchemeId) return;
      try {
        await upsertReason({
          refetchQueries: ['ListStockRemovalReasonOptions'],
          variables: {
            data: {
              active: false,
              id,
              label: reason.label,
              position: reason.position,
              schemeId: currentSchemeId,
            },
          },
        });
        void message.success(
          intl.formatMessage({
            defaultMessage: 'Reason deactivated successfully',
          })
        );
      } catch (error) {
        void message.error(
          intl.formatMessage({ defaultMessage: 'Failed to deactivate reason' })
        );
        console.error('Error deactivating reason option:', error);
      }
    })();
  };

  return {
    createDrawerOpen,
    editDrawerOpen,
    loading,
    onCloseCreateDrawer,
    onCloseEditDrawer,
    onDelete,
    onOpenCreateDrawer,
    onOpenEditDrawer,
    reasons,
    selectedReason,
  };
};

export default useListStockRemovalReasons;
