import React from 'react';
import { Button, Col, Drawer, Row, Table, Typography } from 'antd';
import type {
  CreateInvestigationMutation,
  ListInvestigationsAllSchemesQuery,
} from 'graphql/generated';
import { InvestigationStatus } from 'graphql/generated';
import { Link } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import GetInvestigationStatusValues from 'types/enums/investigation-status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/pro-light-svg-icons';
import useStyles from './ListInvestigations.styles';
import AddInvestigation from '../../../components/form-components/Investigation/AddInvestigation';

interface Props {
  data: ListInvestigationsAllSchemesQuery | undefined;
  loading: boolean;
  addInvestigation: boolean;
  toggleAddInvestigation: () => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  takeAllSchemes: boolean;
  setTakeAllSchemes: (value: boolean) => void;
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
  takeAllSchemes,
  setTakeAllSchemes,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col>
          <Button type="primary" onClick={toggleAddInvestigation}>
            <FormattedMessage
              defaultMessage="Add New Investigation"
              id="QaKS9A"
            />
          </Button>
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type={takeAllSchemes ? 'text' : 'primary'}
            onClick={() => setTakeAllSchemes(false)}
            // disabled={saving}
          >
            {intl.formatMessage({
              defaultMessage: 'Current Scheme',
              id: 'qWFImB',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            type={takeAllSchemes ? 'primary' : 'text'}
            onClick={() => setTakeAllSchemes(true)}
          >
            {intl.formatMessage({
              defaultMessage: 'All Schemes',
              id: '4zN3gE',
            })}
          </Button>
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Button
            type="default"
            onClick={() => setTakeAllSchemes(!takeAllSchemes)}
            icon={<FontAwesomeIcon icon={faRotate} size="10x" />}
          />
        </Col>
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
            title: <FormattedMessage defaultMessage="Name" id="HAlOn1" />,
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'status',
            dataIndex: 'status',
            // width: 100,
            // title: intl.formatMessage({
            //   defaultMessage: 'Status',
            //   id: 'tzMNF3',
            // }),
            title: <FormattedMessage defaultMessage="Status" id="tzMNF3" />,
            render: (value: InvestigationStatus) => (
              <Typography.Text type={getTextStatus(value)}>
                {GetInvestigationStatusValues[value]}
              </Typography.Text>
            ),
          },
          {
            key: 'description',
            dataIndex: 'description',
            title: (
              <FormattedMessage defaultMessage="Description" id="Q8Qw5B" />
            ),
          },
        ]}
      />
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add New Investigation"
            id="QaKS9A"
          />
        }
        visible={addInvestigation}
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
