import { InvestigationStatus } from '#/graphql/types';
import { useStoreActions, useStoreState } from '#/state';
import GetInvestigationStatusValues from '#/types/enums/investigation-status';
import FormatCalendar from '#/utils/format-calendar-24h';
import { Button, Col, Input, Row, Select, Table, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { LinkInvestigationsQuery } from './graphql/__generated__/list-investigations-link.generated';

import GroupsSelect from '../../GroupsSelect/GroupsSelect.view';
import useStyles from './LinkInvestigation.styles';

const { Paragraph, Text } = Typography;

interface Props {
  data:
    | Exclude<LinkInvestigationsQuery['investigationRelay'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  onClose: () => void;
  onPaginationChange: (pageValue: number, sizeValue: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const LinkInvestigation = ({
  data,
  loading,
  onClose,
  onPaginationChange,
  onSelect,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const groupsFilter = useStoreState(
    (state) => state.data.investigations.variables.groups
  );
  const statusFilter = useStoreState(
    (state) => state.data.investigations.variables.status
  );
  const search = useStoreState(
    (state) => state.data.investigations.variables.search
  );
  const setInvestigationGroupsFilter = useStoreActions(
    (actions) => actions.data.setInvestigationGroupsFilter
  );
  const setInvestigationStatusFilter = useStoreActions(
    (actions) => actions.data.setInvestigationStatusFilter
  );
  const setInvestigationSearch = useStoreActions(
    (actions) => actions.data.setInvestigationSearch
  );
  const clearFilters = () => {
    setInvestigationGroupsFilter([]);
    setInvestigationStatusFilter([]);
    setInvestigationSearch('');
  };
  return (
    <div className="add-existing-offender">
      <Row gutter={16}>
        <Col className={classes.list} span={19}>
          <Input
            allowClear
            onChange={(event) => setInvestigationSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search investigations...',
            })}
            value={search}
          />

          <Table
            columns={[
              {
                dataIndex: 'name',
                key: 'name',
                render: (value, item) => (
                  <Link to={`view/${item.key}`}>{value}</Link>
                ),
                title: <FormattedMessage defaultMessage="Name" />,
              },
              {
                dataIndex: 'reference',
                key: 'reference',
                title: <FormattedMessage defaultMessage="Alert ID" />,
              },
              {
                dataIndex: 'status',
                key: 'status',
                title: <FormattedMessage defaultMessage="Status" />,
              },
              {
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (value: Date) =>
                  FormatCalendar(new Date(value), intl, true),
                title: <FormattedMessage defaultMessage="Date Opened" />,
              },
            ]}
            dataSource={data?.edges.map(({ node: investigation }) => ({
              createdAt: investigation.createdAt,
              key: investigation.id,
              name: investigation.name,
              reference: investigation.reference,
              status: GetInvestigationStatusValues[investigation.status],
            }))}
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              hideOnSinglePage: true,
              onChange: onPaginationChange,
              showSizeChanger: true,
              showTotal: (total) => `Total Investigations: ${total}`,
              total: data?.totalCount ?? 0,
            }}
            rowSelection={{
              onSelect,
              type: 'radio',
            }}
            size="small"
          />
        </Col>
        <Col className={classes.filters} span={5}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            </Text>
            <GroupsSelect
              allowClear
              className={classes.filterSelect}
              maxTagCount={2}
              mode="multiple"
              onChange={setInvestigationGroupsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select groups...',
              })}
              // size="small"
              value={groupsFilter}
            />
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Status',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              mode="multiple"
              onChange={setInvestigationStatusFilter}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Open',
                  }),
                  value: InvestigationStatus.Open,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Closed',
                  }),
                  value: InvestigationStatus.Closed,
                },
              ]}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select status...',
              })}
              value={statusFilter}
            />
          </div>

          <Row className={classes.clearRow} justify="end">
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
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
              defaultMessage: 'Link Investigation',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkInvestigation;
