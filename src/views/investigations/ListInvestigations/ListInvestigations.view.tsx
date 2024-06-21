import React from 'react';
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

import { Link } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import GetInvestigationStatusValues from 'types/enums/investigation-status';
import moment from 'moment';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { useStoreActions, useStoreState } from '#/state';
import { FormattedList } from 'react-intl/lib';
import useStyles from './ListInvestigations.styles';
import AddInvestigation from '../../../components/form-components/Investigation/AddInvestigation';
import type { ListInvestigationsAllSchemesQuery } from 'graphql/investigations/queries/list-investigations-all-schemes.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';
import { InvestigationStatus } from 'graphql/types';

interface Props {
  data: ListInvestigationsAllSchemesQuery | undefined;
  loading: boolean;
  addInvestigation: boolean;
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
  data,
  loading,
  addInvestigation,
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
            placeholder={intl.formatMessage({
              defaultMessage: 'Search investigations...',
            })}
            style={{ width: 400 }}
            value={search}
            onChange={(e) => setInvestigationSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <GroupsSelect
            value={groupsFilter}
            onChange={setInvestigationGroupsFilter}
            allowClear
            style={{ minWidth: 200, maxWidth: 400 }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select groups...',
            })}
            mode="multiple"
            maxTagCount={1}
          />
        </Col>
        <Col>
          <Select
            allowClear
            value={statusFilter}
            onChange={setInvestigationStatusFilter}
            mode="multiple"
            style={{ width: 200 }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select status...',
            })}
            options={[
              {
                value: InvestigationStatus.Open,
                label: intl.formatMessage({
                  defaultMessage: 'Open',
                }),
              },
              {
                value: InvestigationStatus.Closed,
                label: intl.formatMessage({
                  defaultMessage: 'Closed',
                }),
              },
            ]}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button type="primary" onClick={toggleAddInvestigation}>
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
        dataSource={data?.listInvestigationsAllSchemes?.investigations.map(
          (investigation) => ({
            key: investigation.id,
            name: investigation.name,
            description: investigation.description || '',
            status: investigation.status || InvestigationStatus.Open,
            groups: investigation.groups || [],
            reference: investigation.reference,
            createdAt: investigation.createdAt,
            closedAt: investigation.closedAt,
          })
        )}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 50,
          // pageSize: currentPageSize,
          showSizeChanger: true,
          // current: currentPage,
          // onChange: onPaginationChange,
          total: data?.listInvestigationsAllSchemes?.total || 0,
          showTotal: (total) => `Total Investigations: ${total}`,
        }}
        size="small"
        onRow={(record) => ({
          onClick: () => navigate(`/app/investigations/view/${record.key}`),
        })}
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: <FormattedMessage defaultMessage="Name" />,
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'reference',
            dataIndex: 'reference',
            title: <FormattedMessage defaultMessage="Alert ID" />,
          },
          {
            key: 'status',
            dataIndex: 'status',
            title: <FormattedMessage defaultMessage="Status" />,
            render: (value: InvestigationStatus) => (
              <Typography.Text type={getTextStatus(value)}>
                {GetInvestigationStatusValues[value]}
              </Typography.Text>
            ),
          },
          {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: <FormattedMessage defaultMessage="Date Opened" />,
            render: (value: string) => moment(value).format('DD/MM/YYYY'),
          },
          {
            key: 'closedAt',
            dataIndex: 'closedAt',
            title: <FormattedMessage defaultMessage="Date Closed" />,
            render: (value: string) =>
              value ? moment(value).format('DD/MM/YYYY') : undefined,
          },
          {
            key: 'groups',
            dataIndex: 'groups',
            title: <FormattedMessage defaultMessage="Groups" />,
            render: (value, item) => (
              <div>
                <FormattedList
                  value={item.groups.map((group) => group.name)}
                  type="unit"
                />
              </div>
            ),
          },
          {
            key: 'description',
            dataIndex: 'description',
            title: <FormattedMessage defaultMessage="Description" />,
          },
        ]}
      />
      <Drawer
        title={<FormattedMessage defaultMessage="Add New Investigation" />}
        open={addInvestigation}
        width="500"
        onClose={toggleAddInvestigation}
      >
        {addInvestigation ? (
          <AddInvestigation
            update={updateInvestigationList}
            onClose={toggleAddInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListInvestigations;
