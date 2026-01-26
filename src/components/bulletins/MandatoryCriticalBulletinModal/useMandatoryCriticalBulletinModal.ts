import { notification } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import type {
  BulletinAcknowledgementStatus,
  PendingCriticalBulletin,
} from './types';

import { useAcknowledgeCriticalBulletinMutation } from '../../../graphql/article/mutations/__generated__/acknowledge-critical-bulletin.generated';

interface UseMandatoryCriticalBulletinModalProps {
  bulletins: PendingCriticalBulletin[];
  onComplete: () => void;
}

interface UseMandatoryCriticalBulletinModalReturn {
  acknowledgementStatus: Record<string, BulletinAcknowledgementStatus>;
  allBulletinsAcknowledged: boolean;
  canProceed: boolean;
  currentBulletin: PendingCriticalBulletin | null;
  handleAcknowledge: (bulletinId: string) => Promise<void>;
  handleBulletinSelect: (bulletinId: string) => void;
  handleContinue: () => void;
  isAcknowledging: boolean;
  isCurrentBulletinAcknowledged: boolean;
}

const useMandatoryCriticalBulletinModal = ({
  bulletins,
  onComplete,
}: UseMandatoryCriticalBulletinModalProps): UseMandatoryCriticalBulletinModalReturn => {
  const intl = useIntl();
  const [currentBulletinId, setCurrentBulletinId] = useState<null | string>(
    null
  );
  const [acknowledgementStatus, setAcknowledgementStatus] = useState<
    Record<string, BulletinAcknowledgementStatus>
  >({});

  // Initialize first bulletin
  useEffect(() => {
    if (bulletins.length > 0 && !currentBulletinId) {
      setCurrentBulletinId(bulletins[0].id);
    }
  }, [bulletins, currentBulletinId]);

  // Initialize acknowledgement status for all bulletins
  useEffect(() => {
    const initialStatus: Record<string, BulletinAcknowledgementStatus> = {};
    for (const bulletin of bulletins) {
      initialStatus[bulletin.id] = {
        bulletinId: bulletin.id,
        isAcknowledged: false,
      };
    }
    setAcknowledgementStatus(initialStatus);
  }, [bulletins]);

  const [acknowledgeMutation, { loading: isAcknowledging }] =
    useAcknowledgeCriticalBulletinMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Critical bulletin acknowledged',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Success',
          }),
          placement: 'bottomRight',
        });
      },
      onError: () => {
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Failed to acknowledge bulletin',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Error',
          }),
          placement: 'bottomRight',
        });
      },
    });

  const handleAcknowledge = useCallback(
    async (bulletinId: string) => {
      await acknowledgeMutation({
        variables: {
          articleId: bulletinId,
        },
      });

      setAcknowledgementStatus((prev) => ({
        ...prev,
        [bulletinId]: {
          bulletinId,
          isAcknowledged: true,
        },
      }));
    },
    [acknowledgeMutation]
  );

  const handleBulletinSelect = useCallback((bulletinId: string) => {
    setCurrentBulletinId(bulletinId);
  }, []);

  const currentBulletin = useMemo(
    () => bulletins.find((b) => b.id === currentBulletinId) ?? null,
    [bulletins, currentBulletinId]
  );

  const isCurrentBulletinAcknowledged = useMemo(
    () =>
      currentBulletinId
        ? acknowledgementStatus[currentBulletinId]?.isAcknowledged ?? false
        : false,
    [acknowledgementStatus, currentBulletinId]
  );

  const allBulletinsAcknowledged = useMemo(
    () =>
      bulletins.length > 0 &&
      bulletins.every((b) => acknowledgementStatus[b.id]?.isAcknowledged),
    [bulletins, acknowledgementStatus]
  );

  const canProceed = useMemo(
    () => allBulletinsAcknowledged,
    [allBulletinsAcknowledged]
  );

  const handleContinue = useCallback(() => {
    if (canProceed) {
      onComplete();
    }
  }, [canProceed, onComplete]);

  return {
    acknowledgementStatus,
    allBulletinsAcknowledged,
    canProceed,
    currentBulletin,
    handleAcknowledge,
    handleBulletinSelect,
    handleContinue,
    isAcknowledging,
    isCurrentBulletinAcknowledged,
  };
};

export default useMandatoryCriticalBulletinModal;
