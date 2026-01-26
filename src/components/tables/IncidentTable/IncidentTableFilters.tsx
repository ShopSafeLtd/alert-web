import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import IncidentTypesSelect from '#/components/form-components/IncidentTypesSelect/IncidentTypesSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { Button, Col, Radio, Row, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { IncidentFilters } from './useIncidentTableData';

const { RangePicker } = DatePicker;

interface IncidentTableFiltersProps {
  filters: IncidentFilters;
  investigationId?: string;
  offenderId?: string;
  onClearFilters: () => void;
  onFiltersChange: (filters: Partial<IncidentFilters>) => void;
}

export const IncidentTableFilters: React.FC<IncidentTableFiltersProps> = ({
  filters,
  investigationId: _investigationId,
  offenderId: _offenderId,
  onClearFilters,
  onFiltersChange,
}) => {
  const intl = useIntl();

  // Date range handler
  const handleDateRangeChange = useCallback(
    (dates: [Date | null, Date | null] | null) => {
      if (dates && dates[0] && dates[1]) {
        onFiltersChange({
          dateRange: {
            endDate: dayjs(dates[1]).endOf('day').toDate(),
            startDate: dayjs(dates[0]).startOf('day').toDate(),
          },
        });
      } else {
        onFiltersChange({ dateRange: undefined });
      }
    },
    [onFiltersChange]
  );

  // Convert date range for RangePicker value
  const dateRangeValue = useMemo<[Date, Date] | undefined>(() => {
    if (filters.dateRange) {
      return [filters.dateRange.startDate, filters.dateRange.endDate];
    }
    return undefined;
  }, [filters.dateRange]);

  // Active filter count
  const activeFilterCount = useMemo(
    () =>
      Object.values(filters).filter((v) =>
        v !== undefined && v !== null
          ? Array.isArray(v)
            ? v.length > 0
            : true
          : false
      ).length,
    [filters]
  );

  return (
    <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
      <Row gutter={[16, 16]}>
        {/* Crime Types */}
        <Col lg={6} md={12} sm={12} xs={24}>
          <IncidentTypesSelect
            allowClear
            onChange={(value) =>
              onFiltersChange({
                crimeTypes: Array.isArray(value) ? value : undefined,
              })
            }
            placeholder={intl.formatMessage({
              defaultMessage: 'Filter by incident types',
            })}
            style={{ width: '100%' }}
            value={filters.crimeTypes}
          />
        </Col>

        {/* Location Filter */}
        <Col lg={6} md={12} sm={12} xs={24}>
          <BusinessesSelect
            allowClear
            onChange={(value) =>
              onFiltersChange({ locationId: value[0] || undefined })
            }
            placeholder={intl.formatMessage({
              defaultMessage: 'Filter by location',
            })}
            style={{ width: '100%' }}
            value={filters.locationId}
          />
        </Col>

        {/* Date Range */}
        <Col lg={6} md={12} sm={12} xs={24}>
          <RangePicker
            onChange={handleDateRangeChange}
            placeholder={[
              intl.formatMessage({ defaultMessage: 'Start date' }),
              intl.formatMessage({ defaultMessage: 'End date' }),
            ]}
            style={{ width: '100%' }}
            value={dateRangeValue}
          />
        </Col>

        {/* Crime Reference Filter */}
        <Col lg={6} md={12} sm={12} xs={24}>
          <Space.Compact style={{ display: 'flex', width: '100%' }}>
            <Radio.Group
              onChange={(e) =>
                onFiltersChange({
                  hasCrimeReference: e.target.value as boolean,
                })
              }
              style={{ display: 'flex', flex: 1 }}
              value={filters.hasCrimeReference}
            >
              <Radio.Button
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                value={true}
              >
                {intl.formatMessage({
                  defaultMessage: 'Crime Ref',
                })}
              </Radio.Button>
              <Radio.Button
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                value={false}
              >
                {intl.formatMessage({
                  defaultMessage: 'None',
                })}
              </Radio.Button>
            </Radio.Group>
            {filters.hasCrimeReference !== undefined && (
              <Button
                onClick={() =>
                  onFiltersChange({ hasCrimeReference: undefined })
                }
                style={{
                  flexShrink: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Clear' })}
              </Button>
            )}
          </Space.Compact>
        </Col>
      </Row>

      {/* Active Filter Badges & Clear Button */}
      {activeFilterCount > 0 && (
        <Row>
          <Col span={24}>
            <Space size="small" wrap>
              {filters.crimeTypes && filters.crimeTypes.length > 0 && (
                <Tag
                  closable
                  onClose={() => onFiltersChange({ crimeTypes: undefined })}
                >
                  {intl.formatMessage(
                    { defaultMessage: '{count} type(s)' },
                    { count: filters.crimeTypes.length }
                  )}
                </Tag>
              )}
              {filters.hasCrimeReference !== undefined && (
                <Tag
                  closable
                  onClose={() =>
                    onFiltersChange({ hasCrimeReference: undefined })
                  }
                >
                  {filters.hasCrimeReference
                    ? intl.formatMessage({
                        defaultMessage: 'Has crime ref',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'No crime ref',
                      })}
                </Tag>
              )}
              {filters.locationId && (
                <Tag
                  closable
                  onClose={() => onFiltersChange({ locationId: undefined })}
                >
                  <FormattedMessage defaultMessage="Location filtered" />
                </Tag>
              )}
              {filters.dateRange && (
                <Tag
                  closable
                  onClose={() => onFiltersChange({ dateRange: undefined })}
                >
                  <FormattedMessage defaultMessage="Date range" />
                </Tag>
              )}
              <Button onClick={onClearFilters} size="small" type="link">
                <FormattedMessage
                  defaultMessage="Clear all filters ({count})"
                  values={{ count: activeFilterCount }}
                />
              </Button>
            </Space>
          </Col>
        </Row>
      )}
    </Space>
  );
};
