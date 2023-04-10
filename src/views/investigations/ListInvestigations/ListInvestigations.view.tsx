import React from 'react';
import { Button, Col, Drawer, Row, Table } from 'antd';
import type {
  CreateInvestigationMutation,
  ListInvestigationsQuery,
} from 'graphql/generated';
import { Link } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import useStyles from './ListInvestigations.styles';
import AddInvestigation from '../../../components/form-components/Investigation/AddInvestigation';

interface Props {
  data: ListInvestigationsQuery | undefined;
  loading: boolean;
  addInvestigation: boolean;
  toggleAddInvestigation: () => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
}

const listInvestigations = ({
  data,
  loading,
  addInvestigation,
  toggleAddInvestigation,
  updateInvestigationList,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        {/*  <Col flex={1}> */}
        {/*    <Input */}
        {/*      value={search} */}
        {/*      onChange={(event) => setSearch(event.target.value)} */}
        {/*      allowClear */}
        {/*      className={classes.searchInput} */}
        {/*      placeholder="Search vehicles..." */}
        {/*    /> */}
        {/*  </Col> */}
        <Col>
          <Button type="primary" onClick={toggleAddInvestigation}>
            Add New Investigation
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={data?.listInvestigations?.investigations.map(
          (investigation) => ({
            key: investigation.id,
            name: investigation.name,
            description: investigation.description || '',
          })
        )}
        loading={loading}
        size="small"
        onRow={(record) => ({
          onClick: () => navigate(`/app/investigations/view/${record.key}`),
        })}
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },

          {
            key: 'description',
            dataIndex: 'description',
            title: 'Description',
          },
        ]}
      />
      <Drawer
        title="Add New Investigation"
        visible={addInvestigation}
        width="600"
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

export default listInvestigations;
