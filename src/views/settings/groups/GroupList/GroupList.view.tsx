import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';

import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import AddGroup from 'components/form-components/group/AddGroup';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
  addGroup: boolean;
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
}

const GroupList = ({
  addGroup,
  data,
  loading,
  search,
  setSearch,
  toggleAddGroup,
  updateGroupList,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a group...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddGroup}
            type="primary"
          >
            <FormattedMessage defaultMessage="New Content Group" />
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
              <Link to={`/app/scheme-settings/groups/view/${record.key}`}>
                {value}
              </Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            width: 300,
          },
          {
            dataIndex: 'description',
            ellipsis: true,
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
          },
        ]}
        dataSource={data?.groups.map((group) => ({
          description: group.description,
          key: group.id,
          name: group.name,
        }))}
        loading={loading}
        pagination={
          data?.groups && data.groups.length > 50
            ? {
                defaultPageSize: 20,
                pageSize: 20,
              }
            : false
        }
        size="small"
      />

      <Drawer
        onClose={toggleAddGroup}
        open={addGroup}
        title={intl.formatMessage({
          defaultMessage: 'Create New Content Group',
        })}
        width="400"
      >
        {addGroup ? (
          <AddGroup onClose={toggleAddGroup} update={updateGroupList} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default GroupList;
