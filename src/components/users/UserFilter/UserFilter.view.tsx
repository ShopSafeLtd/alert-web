import React from 'react';
import { Button, Col, Row, Select, Typography } from 'antd';
import { Role } from 'graphql/generated';
import type { UserStatus } from 'types/enums/user_status';
import { userStatusValues } from 'types/enums/user_status';
import type { UserSort } from 'types/enums/user_sort';
import { userSortValues } from 'types/enums/user_sort';
import useStyles from './UserFilter.styles';

interface Props {
  order: UserSort;
  setOrder: (value: UserSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  userStatus: UserStatus | undefined;
  setUserStatus: (value: UserStatus) => void;
  userRole: Role | undefined;
  setUserRole: (value: Role) => void;
}

const UserFilter = ({
  clearFilters,
  order,
  setOrder,
  groups,
  groupsLoading,
  groupsFilter,
  setGroupsFilter,
  userStatus,
  setUserStatus,
  userRole,
  setUserRole,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Row justify="end">
        <Col>
          <Button type="text" danger onClick={clearFilters}>
            Clear Filters
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Sort Order
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
            placeholder="Sort Order"
            options={userSortValues}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Status
          </Typography.Paragraph>
          <Select
            placeholder="Status"
            className={classes.select}
            allowClear
            value={userStatus}
            onChange={setUserStatus}
            options={userStatusValues}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Role
          </Typography.Paragraph>
          <Select
            allowClear
            placeholder="Role"
            className={classes.select}
            value={userRole}
            onChange={setUserRole}
          >
            <Select.Option value={Role.User}>User</Select.Option>
            <Select.Option value={Role.ContentAdmin}>
              ContentAdmin
            </Select.Option>
            <Select.Option value={Role.SchemeAdmin}>SchemeAdmin</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Groups
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder="Groups"
            mode="multiple"
            size="small"
            maxTagCount={2}
            allowClear
            loading={groupsLoading}
            onChange={setGroupsFilter}
            value={groupsFilter}
          >
            {groups.map((group) => (
              <Select.Option value={group.value}>{group.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </>
  );
};

export default UserFilter;
