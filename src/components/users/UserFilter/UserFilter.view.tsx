import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import { Button, Col, Row, Select, Typography } from 'antd';
import { UserStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { UserSort } from 'types/enums/user_sort';
import { userStatusValues } from 'types/enums/user_status';

import useStyles from './UserFilter.styles';

interface Props {
  clearFilters: () => void;
  groups: { label: string; value: string }[];
  groupsFilter: string[];
  groupsLoading: boolean;
  order: UserSort;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: UserSort) => void;
  setUserRole: (value: string[]) => void;
  setUserStatus: (value: UserStatus[]) => void;
  userRole: string[];
  userStatus: UserStatus[] | undefined;
}

const UserFilter = ({
  clearFilters,
  groups,
  groupsFilter,
  groupsLoading,
  order,
  setGroupsFilter,
  setOrder,
  setUserRole,
  setUserStatus,
  userRole,
  userStatus,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Row justify="end">
        <Col>
          <Button danger onClick={clearFilters} type="text">
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
            onChange={setOrder}
            placeholder={intl.formatMessage({
              defaultMessage: 'Sort Order',
            })}
            size="small"
            value={order}
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
            allowClear
            className={classes.select}
            mode="multiple"
            onChange={setUserStatus}
            options={userStatusValues.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
            placeholder={intl.formatMessage({
              defaultMessage: 'Status',
            })}
            value={userStatus}
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
          <RolesSelect
            allowClear
            className={classes.select}
            onChange={setUserRole}
            placeholder={intl.formatMessage({
              defaultMessage: 'Role',
            })}
            value={userRole}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage defaultMessage="Groups" />
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            loading={groupsLoading}
            maxTagCount={2}
            mode="multiple"
            onChange={setGroupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            size="small"
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
