import type { OffenderData } from 'types/DataType';

import { Empty, Pagination } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import type { OffenderNode } from './useOffenderGridDataRelay';

import OffenderGrid from './OffenderGrid.view';
import { useOffenderGridDataRelay } from './useOffenderGridDataRelay';

interface OffenderGridContainerProps {
  canDisconnect?: boolean;
  crimeGroupId?: string;
  defaultSortBy?: string;
  disconnectLabel?: string;
  editRights?: boolean;
  incidentId?: string;
  investigationId?: string;
  onDisconnectOffender?: (id: string) => void;
  pageSize?: number;
  setEditOffenderData?: (value: OffenderData | null) => void;
  sortBy?: string;
}

export const OffenderGridContainer: React.FC<OffenderGridContainerProps> = ({
  canDisconnect,
  crimeGroupId,
  defaultSortBy = 'incidents',
  disconnectLabel,
  editRights,
  incidentId,
  investigationId,
  onDisconnectOffender,
  pageSize: initialPageSize = 12,
  setEditOffenderData,
  sortBy: externalSortBy,
}) => {
  const intl = useIntl();

  const {
    handlePageChange,
    handleSortChange,
    loading,
    offenders,
    page,
    pageSize,
    sortBy: internalSortBy,
    totalCount,
  } = useOffenderGridDataRelay({
    crimeGroupId,
    defaultSortBy: externalSortBy || defaultSortBy,
    incidentId,
    investigationId,
    pageSize: initialPageSize,
  });

  // Sync external sort changes into the relay hook so they trigger a server refetch
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (externalSortBy) {
      handleSortChange(externalSortBy);
    }
  }, [externalSortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentSortBy = externalSortBy || internalSortBy || defaultSortBy;

  // Show empty state when no offenders (and not loading)
  if (!loading && offenders.length === 0) {
    return (
      <Empty
        description={
          investigationId
            ? intl.formatMessage({
                defaultMessage: 'No offenders for this investigation',
              })
            : incidentId
              ? intl.formatMessage({
                  defaultMessage: 'No offenders linked to this incident',
                })
              : intl.formatMessage({
                  defaultMessage: 'No offenders for this crime group',
                })
        }
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <div>
      <div className="offender-grid-container">
        <OffenderGrid
          canDisconnect={canDisconnect}
          disconnectLabel={disconnectLabel}
          editRights={editRights}
          loading={loading}
          offenders={offenders as OffenderNode[] | undefined}
          onDisconnectOffender={onDisconnectOffender}
          setEditOffenderData={setEditOffenderData}
          sortBy={currentSortBy}
        />
      </div>

      {totalCount > pageSize && (
        <Pagination
          current={page}
          disabled={loading}
          onChange={handlePageChange}
          pageSize={pageSize}
          pageSizeOptions={[12, 24, 48, 96]}
          showSizeChanger
          showTotal={(total, range) =>
            intl.formatMessage(
              {
                defaultMessage: '{start}-{end} of {total} offenders',
              },
              {
                end: range[1],
                start: range[0],
                total,
              }
            )
          }
          style={{ marginTop: 16, textAlign: 'right' }}
          total={totalCount}
        />
      )}
    </div>
  );
};

export default OffenderGridContainer;
