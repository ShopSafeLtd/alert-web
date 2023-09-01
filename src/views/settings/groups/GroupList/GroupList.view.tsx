import React from 'react';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import type { CreateGroupMutation, SchemeGroupsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import AddGroup from 'components/form-components/group/AddGroup';
import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addGroup: boolean;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
}

const GroupList = ({
  data,
  loading,
  search,
  setSearch,
  addGroup,
  toggleAddGroup,
  updateGroupList,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a group...',
              id: 'UaavNU',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type="primary"
            onClick={toggleAddGroup}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="New Content Group" id="EjgE/i" />
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        loading={loading}
        pagination={
          data?.groups && data.groups.length > 50
            ? {
                defaultPageSize: 20,
                pageSize: 20,
              }
            : false
        }
        columns={[
          {
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
            dataIndex: 'name',
            width: 300,
            render: (value, record) => (
              <Link to={`/app/scheme-settings/groups/view/${record.key}`}>
                {value}
              </Link>
            ),
          },
          {
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            }),
            dataIndex: 'description',
            ellipsis: true,
          },
        ]}
        dataSource={data?.groups.map((group) => ({
          key: group.id,
          name: group.name,
          description: group.description,
        }))}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Create New Content Group',
          id: 'pTLcTT',
        })}
        visible={addGroup}
        width="400"
        onClose={toggleAddGroup}
      >
        {addGroup ? (
          <AddGroup update={updateGroupList} onClose={toggleAddGroup} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default GroupList;
