import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { InvestigationRelayQuery } from 'graphql/investigations/queries/__generated__/list-investigations-all-schemes.generated';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { useStoreActions, useStoreState } from '#/state';
import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from 'antd';
import { InvestigationStatus } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormattedList } from 'react-intl/lib';
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

const getTextStatus = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'success';
  if (value === InvestigationStatus.Closed) return 'danger';
  if (value === InvestigationStatus.Paused) return 'warning';
  return 'success';
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
        <Col>
          <Input
            allowClear
            onChange={(e) => setInvestigationSearch(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search investigations...',
            })}
            style={{ width: 400 }}
            value={search}
          />
        </Col>
        <Col>
          <GroupsSelect
            allowClear
            maxTagCount={1}
            mode="multiple"
            onChange={setInvestigationGroupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select groups...',
            })}
            style={{ maxWidth: 400, minWidth: 200 }}
            value={groupsFilter}
          />
        </Col>
        <Col>
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
                  defaultMessage: 'Closed',
                }),
                value: InvestigationStatus.Closed,
              },
            ]}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select status...',
            })}
            style={{ width: 200 }}
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
            render: (value: InvestigationStatus) => (
              <Typography.Text type={getTextStatus(value)}>
                {GetInvestigationStatusValues[value]}
              </Typography.Text>
            ),
            title: <FormattedMessage defaultMessage="Status" />,
          },
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string) => moment(value).format('DD/MM/YYYY'),
            title: <FormattedMessage defaultMessage="Date Opened" />,
          },
          {
            dataIndex: 'closedAt',
            key: 'closedAt',
            // eslint-disable-next-line
            render: (value: string) =>
              value ? moment(value).format('DD/MM/YYYY') : undefined,
            title: <FormattedMessage defaultMessage="Date Closed" />,
          },
          {
            dataIndex: 'groups',
            key: 'groups',
            render: (value, item) => (
              <div>
                <FormattedList
                  type="unit"
                  value={item.groups.map((group) => group.name)}
                />
              </div>
            ),
            title: <FormattedMessage defaultMessage="Groups" />,
          },
          {
            dataIndex: 'description',
            key: 'description',
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
          defaultPageSize: 50,
          hideOnSinglePage: true,
          // current: currentPage,
          onChange: onPaginationChange,
          // pageSize: currentPageSize,
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
