import type {
  ActiveChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
} from '#/state/filter-model';

import { ChecklistStatus } from '#/graphql/types';
import { useStoreActions } from '#/state';
import { Button, Col, Row, Table, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { LinkActiveChecklistsQuery } from './__generated__/link-active-checklist.generated';

interface Props {
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  checklistFilter: FilterModelValues;
  data: LinkActiveChecklistsQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const LinkChecklist = ({
  activeChecklistSort,
  checklistFilter,
  data,
  loading,
  onClose,
  onSelect,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const { setActiveChecklistSort, setChecklistFilters } = useStoreActions(
    (state) => state.filter
  );
  return (
    <div className="add-existing-offender">
      <Table
        columns={[
          {
            dataIndex: 'name',
            defaultSortOrder:
              activeChecklistSort.field === 'name'
                ? activeChecklistSort.order === 'asc'
                  ? 'ascend'
                  : 'descend'
                : undefined,
            key: 'name',
            sorter: true,
            title: <FormattedMessage defaultMessage="Title" />,
          },
          {
            dataIndex: 'businessName',
            key: 'businessName',
            title: <FormattedMessage defaultMessage="Business" />,
          },
          {
            dataIndex: 'percentComplete',
            defaultSortOrder:
              activeChecklistSort.field === 'percentComplete'
                ? activeChecklistSort.order === 'asc'
                  ? 'ascend'
                  : 'descend'
                : undefined,
            key: 'percentComplete',
            sorter: true,
            title: <FormattedMessage defaultMessage="Completion (%)" />,
            width: 130,
          },
          {
            dataIndex: 'score',
            key: 'score',
            title: <FormattedMessage defaultMessage="Score (%)" />,
            width: 100,
          },
          {
            dataIndex: 'status',
            defaultSortOrder:
              activeChecklistSort.field === 'status'
                ? activeChecklistSort.order === 'asc'
                  ? 'ascend'
                  : 'descend'
                : undefined,
            filterMultiple: true,
            filteredValue: checklistFilter.activeStatus,
            filters: [
              {
                text: intl.formatMessage({
                  defaultMessage: 'In Progress',
                }),
                value: ChecklistStatus.InProgress,
              },
              {
                text: intl.formatMessage({
                  defaultMessage: 'Completed',
                }),
                value: ChecklistStatus.Completed,
              },
            ],
            key: 'status',
            // eslint-disable-next-line no-confusing-arrow
            render: (value: ChecklistStatus) =>
              value === ChecklistStatus.InProgress ? (
                <Typography.Text type="warning">
                  <FormattedMessage defaultMessage="In Progress" />
                </Typography.Text>
              ) : (
                <Typography.Text type="success">
                  <FormattedMessage defaultMessage="Completed" />
                </Typography.Text>
              ),
            sorter: true,
            title: <FormattedMessage defaultMessage="Status" />,
            width: 120,
          },
        ]}
        dataSource={data?.activeChecklists.edges?.map(
          ({ node: checklist }) => ({
            businessName: checklist.business?.name || '',
            key: checklist.id,
            name: checklist.name || '',
            percentComplete: `${checklist.percentComplete || 0}%`,
            score: checklist.percentageScore,
            status: checklist.status,
          })
        )}
        loading={loading}
        onChange={(_pagination, filters, sorter) => {
          if (sorter && 'field' in sorter) {
            setActiveChecklistSort({
              field: sorter.field as ActiveChecklistSortOptions,
              order: sorter.order === 'ascend' ? 'asc' : 'desc',
            });
          } else if ('order' in sorter && sorter.order === undefined) {
            setActiveChecklistSort({
              field: 'createdAt',
              order: 'desc',
            });
          }
          if (filters && filters.status) {
            setChecklistFilters({
              activeStatus: filters.status as ChecklistStatus[],
            });
          }

          if (filters?.status?.length === 0 || !filters.status) {
            setChecklistFilters({
              activeStatus: [
                ChecklistStatus.InProgress,
                ChecklistStatus.Completed,
              ],
            });
          }
        }}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: false,
          total: data?.activeChecklists.totalCount,
        }}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Link Checklist',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkChecklist;
