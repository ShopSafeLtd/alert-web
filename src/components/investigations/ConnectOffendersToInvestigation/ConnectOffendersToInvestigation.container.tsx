import React from 'react';

import ConnectOffendersToInvestigation from './ConnectOffendersToInvestigation';
import useConnectOffendersToInvestigation from './useConnectOffendersToInvestigation';

interface ConnectOffendersToInvestigationContainerProps {
  existingOffenderIds: string[];
  investigationId: string;
  investigationName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const ConnectOffendersToInvestigationContainer: React.FC<
  ConnectOffendersToInvestigationContainerProps
> = (props) => {
  const {
    cascadeOptions,
    clearSelection,
    filters,
    handleCancel,
    handleCascadeOptionChange,
    handleFilterChange,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleSubmit,
    loading,
    offenders,
    page,
    pageSize,
    search,
    selectedOffenderIds,
    selectedOffenders,
    sortBy,
    submitting,
    toggleOffenderSelection,
    total,
  } = useConnectOffendersToInvestigation(props);

  return (
    <ConnectOffendersToInvestigation
      cascadeOptions={cascadeOptions}
      filters={filters}
      loading={loading}
      offenders={offenders}
      onCancel={handleCancel}
      onCascadeOptionChange={handleCascadeOptionChange}
      onClearSelection={clearSelection}
      onFilterChange={
        handleFilterChange as (
          filterKey: 'age' | 'build' | 'ethnicity' | 'gender',
          value: string[]
        ) => void
      }
      onPageChange={handlePageChange}
      onSearchChange={handleSearchChange}
      onSortChange={handleSortChange}
      onSubmit={() => {
        void handleSubmit();
      }}
      onToggleSelection={toggleOffenderSelection}
      page={page}
      pageSize={pageSize}
      search={search}
      selectedOffenderIds={selectedOffenderIds}
      selectedOffenders={selectedOffenders}
      sortBy={sortBy}
      submitting={submitting}
      total={total}
    />
  );
};

export default ConnectOffendersToInvestigationContainer;
