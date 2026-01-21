import type { UnrestrictedOffendersRelayQuery } from 'graphql/offenders/queries/__generated__/unrestricted-offenders-relay.generated';
import type { CascadeOptions } from 'types/investigations';

import {
  Button,
  Empty,
  Input,
  Pagination,
  Select,
  Spin,
  Tag,
  Typography,
} from 'antd';
import CascadeOptionsCheckbox from 'components/investigations/CascadeOptionsCheckbox';
import OffenderSelectableCard from 'components/offenders/OffenderSelectableCard';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './ConnectOffendersToInvestigation.styles';

const { Text, Title } = Typography;
const { Option } = Select;

type Offender =
  UnrestrictedOffendersRelayQuery['unrestrictedOffendersRelay']['edges'][number]['node'];

interface ConnectOffendersToInvestigationProps {
  // Cascade options
  cascadeOptions: CascadeOptions;
  // Filters
  filters: {
    age: string[];
    build: string[];
    ethnicity: string[];
    gender: string[];
  };
  // Data
  loading: boolean;
  // Data
  offenders: Offender[];
  // Actions
  onCancel: () => void;
  // Cascade options
  onCascadeOptionChange: (
    key: keyof CascadeOptions
  ) => (checked: boolean) => void;
  // Selection
  onClearSelection: () => void;
  // Filters
  onFilterChange: (
    filterKey: 'age' | 'build' | 'ethnicity' | 'gender',
    value: string[]
  ) => void;
  // Pagination
  onPageChange: (page: number) => void;
  // Search
  onSearchChange: (value: string) => void;
  // Sort
  onSortChange: (value: string) => void;
  // Actions
  onSubmit: () => void;
  // Selection
  onToggleSelection: (offenderId: string) => void;
  // Pagination
  page: number;
  // Pagination
  pageSize: number;
  // Search
  search: string;
  // Selection
  selectedOffenderIds: string[];
  // Selection
  selectedOffenders: Offender[];
  // Sort
  sortBy: string;
  // Data
  submitting: boolean;
  // Data
  total: number;
}

const ConnectOffendersToInvestigation: React.FC<
  ConnectOffendersToInvestigationProps
> = ({
  cascadeOptions,
  filters,
  loading,
  offenders,
  onCancel,
  onCascadeOptionChange,
  onClearSelection,
  onFilterChange,
  onPageChange,
  onSearchChange,
  onSortChange,
  onSubmit,
  onToggleSelection,
  page,
  pageSize,
  search,
  selectedOffenderIds,
  selectedOffenders,
  sortBy,
  submitting,
  total,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const renderSearchAndFilters = () => (
    <div className={classes.searchAndFiltersRow}>
      <Input.Search
        allowClear
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={intl.formatMessage({
          defaultMessage: 'Search by name, reference, or characteristics...',
        })}
        size="large"
        style={{ flex: 1 }}
        value={search}
      />

      <Select
        allowClear
        mode="multiple"
        onChange={(value) => onFilterChange('ethnicity', value)}
        placeholder={intl.formatMessage({ defaultMessage: 'Ethnicity' })}
        size="large"
        style={{ width: 160 }}
        value={filters.ethnicity}
      >
        <Option value="IC1">
          {intl.formatMessage({ defaultMessage: 'IC1' })}
        </Option>
        <Option value="IC2">
          {intl.formatMessage({ defaultMessage: 'IC2' })}
        </Option>
        <Option value="IC3">
          {intl.formatMessage({ defaultMessage: 'IC3' })}
        </Option>
        <Option value="IC4">
          {intl.formatMessage({ defaultMessage: 'IC4' })}
        </Option>
        <Option value="IC5">
          {intl.formatMessage({ defaultMessage: 'IC5' })}
        </Option>
        <Option value="IC6">
          {intl.formatMessage({ defaultMessage: 'IC6' })}
        </Option>
      </Select>

      <Select
        allowClear
        mode="multiple"
        onChange={(value) => onFilterChange('build', value)}
        placeholder={intl.formatMessage({ defaultMessage: 'Build' })}
        size="large"
        style={{ width: 140 }}
        value={filters.build}
      >
        <Option value="SMALL">
          {intl.formatMessage({ defaultMessage: 'Small' })}
        </Option>
        <Option value="MEDIUM">
          {intl.formatMessage({ defaultMessage: 'Medium' })}
        </Option>
        <Option value="LARGE">
          {intl.formatMessage({ defaultMessage: 'Large' })}
        </Option>
      </Select>

      <Select
        allowClear
        mode="multiple"
        onChange={(value) => onFilterChange('gender', value)}
        placeholder={intl.formatMessage({ defaultMessage: 'Gender' })}
        size="large"
        style={{ width: 140 }}
        value={filters.gender}
      >
        <Option value="MALE">
          {intl.formatMessage({ defaultMessage: 'Male' })}
        </Option>
        <Option value="FEMALE">
          {intl.formatMessage({ defaultMessage: 'Female' })}
        </Option>
      </Select>

      <Select
        disabled={submitting}
        onChange={onSortChange}
        size="large"
        style={{ width: 180 }}
        value={sortBy}
      >
        <Option value="recent">
          {intl.formatMessage({ defaultMessage: 'Most Recent' })}
        </Option>
        <Option value="oldest">
          {intl.formatMessage({ defaultMessage: 'Oldest First' })}
        </Option>
        <Option value="nameAsc">
          {intl.formatMessage({ defaultMessage: 'Name (A-Z)' })}
        </Option>
        <Option value="nameDesc">
          {intl.formatMessage({ defaultMessage: 'Name (Z-A)' })}
        </Option>
        <Option value="incidents">
          {intl.formatMessage({ defaultMessage: 'Most Incidents' })}
        </Option>
        <Option value="value">
          {intl.formatMessage({ defaultMessage: 'Highest Value' })}
        </Option>
      </Select>
    </div>
  );

  const renderSelectedSection = () => {
    if (selectedOffenderIds.length === 0) return null;

    return (
      <div className={classes.selectedSection}>
        <Text className={classes.selectedTitle} strong>
          {intl.formatMessage(
            {
              defaultMessage: 'Selected: {count}',
            },
            { count: selectedOffenderIds.length }
          )}
        </Text>
        <div className={classes.selectedTagsWrapper}>
          {selectedOffenders.map((offender) => (
            <Tag
              closable
              color="blue"
              key={offender.id}
              onClose={() => onToggleSelection(offender.id)}
            >
              {intl.formatMessage(
                {
                  defaultMessage: '{name} (#{reference})',
                },
                {
                  name:
                    offender.name ||
                    intl.formatMessage({ defaultMessage: 'Unknown' }),
                  reference: offender.reference ?? 'N/A',
                }
              )}
            </Tag>
          ))}
        </div>
        <Button onClick={onClearSelection} size="small">
          {intl.formatMessage({ defaultMessage: 'Clear All' })}
        </Button>
      </div>
    );
  };

  const renderOffendersGrid = () => {
    if (loading && offenders.length === 0) {
      return (
        <div className={classes.loadingOverlay}>
          <Spin size="large" />
        </div>
      );
    }

    if (!loading && offenders.length === 0) {
      return (
        <div className={classes.emptyState}>
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No offenders found',
            })}
          />
        </div>
      );
    }

    return (
      <>
        <div className={classes.resultsGrid}>
          {offenders.map((offender) => {
            const isSelected = selectedOffenderIds.includes(offender.id);
            return (
              <OffenderSelectableCard
                isSelected={isSelected}
                key={offender.id}
                offender={offender}
                onClick={() => onToggleSelection(offender.id)}
              />
            );
          })}
        </div>
        {total > pageSize && (
          <div className={classes.pagination}>
            <Pagination
              current={page}
              onChange={onPageChange}
              pageSize={pageSize}
              showSizeChanger={false}
              size="small"
              total={total}
            />
          </div>
        )}
      </>
    );
  };

  const renderActions = () => {
    const selectedCount = selectedOffenderIds.length;
    const hasSelection = selectedCount > 0;

    return (
      <div className={classes.actionsSection}>
        <div className={classes.cascadeOptionsRow}>
          <CascadeOptionsCheckbox
            disabled={submitting}
            layout="horizontal"
            onChange={(value) => {
              for (const [key, val] of Object.entries(value)) {
                if (val !== cascadeOptions[key as keyof CascadeOptions]) {
                  onCascadeOptionChange(key as keyof CascadeOptions)(
                    val as boolean
                  );
                }
              }
            }}
            value={cascadeOptions}
          />
        </div>
        <div className={classes.actionsButtons}>
          <Button disabled={submitting} onClick={onCancel}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button
            disabled={!hasSelection}
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage(
              {
                defaultMessage: 'Add {count} {offendersText}',
              },
              {
                count: selectedCount,
                offendersText:
                  selectedCount === 1
                    ? intl.formatMessage({ defaultMessage: 'Offender' })
                    : intl.formatMessage({ defaultMessage: 'Offenders' }),
              }
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {/* Search and Filters Row */}
      {renderSearchAndFilters()}

      {/* Selected Offenders */}
      {renderSelectedSection()}

      {/* Results */}
      <div className={classes.resultsSection}>
        <div className={classes.resultsHeader}>
          <Title level={5}>
            {intl.formatMessage(
              {
                defaultMessage: 'Results ({count})',
              },
              { count: total }
            )}
          </Title>
        </div>
        {renderOffendersGrid()}
      </div>

      {/* Actions with Cascade Options */}
      {renderActions()}
    </div>
  );
};

export default ConnectOffendersToInvestigation;
