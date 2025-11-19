import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { InvestigationRelayQuery } from 'graphql/investigations/queries/__generated__/list-investigations-all-schemes.generated';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { useStoreActions, useStoreState } from '#/state';
import DebouncedInput from '#/utils/debounced-input';
import FormatCalendar from '#/utils/format-calendar-24h';
import { Button, Col, Drawer, Row, Select, Table, Tag, Tooltip } from 'antd';
import { InvestigationStatus } from 'graphql/types';
import React from 'react';
import { FormattedList, FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import GetInvestigationStatusValues from 'types/enums/investigation-status';

import AddInvestigation from '../../../components/form-components/Investigation/AddInvestigation';
import useStyles from './ListInvestigations.styles';

interface Props {
  addInvestigation: boolean;
  data: InvestigationRelayQuery | undefined;
  loading: boolean;
  onPaginationChange: (pageValue: number, sizeValue: number) => void;
  toggleAddInvestigation: () => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
}

const getTagColor = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'success';
  if (value === InvestigationStatus.Paused) return 'warning';
  if (value === InvestigationStatus.Closed) return 'default';
  return 'default';
};
const ListInvestigations = ({
  addInvestigation,
  data,
  loading,
  onPaginationChange,
  toggleAddInvestigation,
  updateInvestigationList,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
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

  return (
    <div className={classes.page}>
      <Row className={classes.headerRow} gutter={8}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <DebouncedInput
            allowClear
            defaultValue={search || ''}
            onChange={(e) => setInvestigationSearch(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search investigations...',
            })}
            style={{ width: '100%' }}
          />
        </Col>
        <Col lg={5} md={8} sm={12} xs={24}>
          <GroupsSelect
            allowClear
            maxTagCount={1}
            mode="multiple"
            onChange={setInvestigationGroupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select groups...',
            })}
            style={{ width: '100%' }}
            value={groupsFilter}
          />
        </Col>
        <Col lg={4} md={6} sm={12} xs={24}>
          <Select
            allowClear
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
                  defaultMessage: 'Paused',
                }),
                value: InvestigationStatus.Paused,
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
            style={{ width: '100%' }}
            value={statusFilter}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button onClick={toggleAddInvestigation} type="primary">
            <FormattedMessage defaultMessage="Create Investigation" />
          </Button>
        </Col>
        {/* <Col> */}
        {/*  <Button */}
        {/*    type={takeAllSchemes ? 'text' : 'primary'} */}
        {/*    onClick={() => setTakeAllSchemes(false)} */}
        {/*    // disabled={saving} */}
        {/*  > */}
        {/*    {intl.formatMessage({ */}
        {/*      defaultMessage: 'Current Scheme', */}
        {/*      id: 'qWFImB', */}
        {/*    })} */}
        {/*  </Button> */}
        {/* </Col> */}
        {/* <Col> */}
        {/*   <Button */}
        {/*     type={takeAllSchemes ? 'primary' : 'text'} */}
        {/*     onClick={() => setTakeAllSchemes(true)} */}
        {/*   > */}
        {/*     {intl.formatMessage({ */}
        {/*       defaultMessage: 'All Schemes', */}
        {/*       id: '4zN3gE', */}
        {/*     })} */}
        {/*   </Button> */}
        {/* </Col> */}
        {/* <Col style={{ marginLeft: 10 }}> */}
        {/*   <Button */}
        {/*     type="default" */}
        {/*     onClick={() => setTakeAllSchemes(!takeAllSchemes)} */}
        {/*     icon={<FontAwesomeIcon icon={faRotate} size="10x" />} */}
        {/*   /> */}
        {/* </Col> */}
        {/*  <Col flex={1}> */}
        {/*    <Input */}
        {/*      value={search} */}
        {/*      onChange={(event) => setSearch(event.target.value)} */}
        {/*      allowClear */}
        {/*      className={classes.searchInput} */}
        {/*      placeholder="Search vehicles..." */}
        {/*    /> */}
        {/*  </Col> */}
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
            title: <FormattedMessage defaultMessage="Name" />,
            width: 300,
          },
          {
            dataIndex: 'reference',
            key: 'reference',
            sorter: (a, b) => (a.reference || 0) - (b.reference || 0),
            title: <FormattedMessage defaultMessage="Alert ID" />,
            width: 120,
          },
          {
            dataIndex: 'status',
            key: 'status',
            render: (value: InvestigationStatus) => (
              <Tag color={getTagColor(value)}>
                {GetInvestigationStatusValues[value]}
              </Tag>
            ),
            sorter: (a, b) => a.status.localeCompare(b.status),
            title: <FormattedMessage defaultMessage="Status" />,
            width: 100,
          },
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: Date) =>
              FormatCalendar(new Date(value), intl, true),
            sorter: (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            title: <FormattedMessage defaultMessage="Date Opened" />,
            width: 180,
          },
          {
            dataIndex: 'closedAt',
            key: 'closedAt',
            render: (value: string) =>
              value ? FormatCalendar(new Date(value), intl, true) : undefined,
            sorter: (a, b) => {
              if (!a.closedAt && !b.closedAt) return 0;
              if (!a.closedAt) return 1;
              if (!b.closedAt) return -1;
              return (
                new Date(a.closedAt).getTime() - new Date(b.closedAt).getTime()
              );
            },
            title: <FormattedMessage defaultMessage="Date Closed" />,
            width: 180,
          },
          {
            dataIndex: 'groups',
            ellipsis: true,
            key: 'groups',
            render: (value, item) => {
              const groups = item?.groups || [];
              const groupNames = groups.map((group) => group.name);
              const displayGroups = groupNames.slice(0, 3);
              const remainingCount = groupNames.length - 3;

              return (
                <Tooltip
                  title={
                    groupNames.length > 3 ? (
                      <FormattedList type="unit" value={groupNames} />
                    ) : null
                  }
                >
                  <div>
                    {displayGroups.join(', ')}
                    {remainingCount > 0 && (
                      <span style={{ color: '#8c8c8c' }}>
                        <FormattedMessage
                          defaultMessage=" +{count} more"
                          values={{ count: remainingCount }}
                        />
                      </span>
                    )}
                  </div>
                </Tooltip>
              );
            },
            title: <FormattedMessage defaultMessage="Groups" />,
            width: 200,
          },
          {
            dataIndex: 'description',
            key: 'description',
            render: (value: string) => (
              <Tooltip title={value}>
                <div className={classes.descriptionCell}>{value}</div>
              </Tooltip>
            ),
            title: <FormattedMessage defaultMessage="Description" />,
          },
        ]}
        dataSource={data?.investigationRelay.edges.map(
          ({ node: investigation }) => ({
            closedAt: investigation.closedAt,
            createdAt: investigation.createdAt,
            description: investigation.description || '',
            groups: investigation.groups || [],
            key: investigation.id,
            name: investigation.name,
            reference: investigation.reference,
            status: investigation.status || InvestigationStatus.Open,
          })
        )}
        loading={loading}
        onRow={(record) => ({
          onClick: () => navigate(`/app/investigations/view/${record.key}`),
        })}
        pagination={{
          defaultPageSize: 25,
          hideOnSinglePage: true,
          // current: currentPage,
          onChange: onPaginationChange,
          // pageSize: currentPageSize,
          pageSizeOptions: [10, 25, 50, 100],
          showSizeChanger: true,
          showTotal: (total) => `Total Investigations: ${total}`,
          total: data?.investigationRelay.totalCount ?? 0,
        }}
        size="small"
      />
      <Drawer
        onClose={toggleAddInvestigation}
        open={addInvestigation}
        title={<FormattedMessage defaultMessage="Add New Investigation" />}
        width="500"
      >
        {addInvestigation ? (
          <AddInvestigation
            onClose={toggleAddInvestigation}
            update={updateInvestigationList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListInvestigations;
