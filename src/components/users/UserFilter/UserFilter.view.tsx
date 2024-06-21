import React from 'react';
import { Button, Col, Row, Select, Typography } from 'antd';

import { UserSort } from 'types/enums/user_sort';
import { FormattedMessage, useIntl } from 'react-intl';
import { userStatusValues } from 'types/enums/user_status';
import useStyles from './UserFilter.styles';
import { Role, UserStatus } from 'graphql/types';

interface Props {
  order: UserSort;
  setOrder: (value: UserSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  userStatus: UserStatus[] | undefined;
  setUserStatus: (value: UserStatus[]) => void;
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
  const intl = useIntl();

  return (
    <>
      <Row justify="end">
        <Col>
          <Button type="text" danger onClick={clearFilters}>
            <FormattedMessage defaultMessage="Clear Filters" />
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage defaultMessage="Sort Order" />
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
            placeholder={intl.formatMessage({
              defaultMessage: 'Sort Order',
            })}
          >
            <Select.Option value={UserSort.nameAsc}>
              <FormattedMessage defaultMessage="Name A-Z" />
            </Select.Option>
            <Select.Option value={UserSort.nameDesc}>
              <FormattedMessage defaultMessage="Name Z-A" />
            </Select.Option>
            <Select.Option value={UserSort.createdAtDesc}>
              <FormattedMessage defaultMessage="Newest First" />
            </Select.Option>
            <Select.Option value={UserSort.createdAtAsc}>
              <FormattedMessage defaultMessage="Oldest First" />
            </Select.Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage defaultMessage="Status" />
          </Typography.Paragraph>
          <Select
            placeholder={intl.formatMessage({
              defaultMessage: 'Status',
            })}
            mode="multiple"
            className={classes.select}
            allowClear
            value={userStatus}
            onChange={setUserStatus}
            options={userStatusValues.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
          >
            <Select.Option value={UserStatus.Active}>
              <FormattedMessage defaultMessage="Active" />
            </Select.Option>
            <Select.Option value={UserStatus.Inactive}>
              <FormattedMessage defaultMessage="Inactive" />
            </Select.Option>
            <Select.Option value={UserStatus.Invited}>
              <FormattedMessage defaultMessage="Invited" />
            </Select.Option>
            <Select.Option value={UserStatus.NotInvited}>
              <FormattedMessage defaultMessage="NotInvited" />
            </Select.Option>
            <Select.Option value={UserStatus.Disabled}>
              <FormattedMessage defaultMessage="Disabled" />
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage defaultMessage="Role" />
          </Typography.Paragraph>
          <Select
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Role',
            })}
            className={classes.select}
            value={userRole}
            onChange={setUserRole}
          >
            <Select.Option value={Role.User}>
              <FormattedMessage defaultMessage="User" />
            </Select.Option>
            <Select.Option value={Role.ContentAdmin}>
              <FormattedMessage defaultMessage="Content Admin" />
            </Select.Option>
            <Select.Option value={Role.GroupAdmin}>
              <FormattedMessage defaultMessage="Group Admin" />
            </Select.Option>
            <Select.Option value={Role.SchemeAdmin}>
              <FormattedMessage defaultMessage="Scheme Admin" />
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage defaultMessage="Groups" />
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            mode="multiple"
            size="small"
            maxTagCount={2}
            allowClear
            loading={groupsLoading}
            onChange={setGroupsFilter}
            value={groupsFilter}
          >
            {groups.map((group) => (
              <Select.Option key={group.value} value={group.value}>
                {group.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </>
  );
};

export default UserFilter;
