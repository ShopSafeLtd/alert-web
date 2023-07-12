import React from 'react';
import { Button, Col, Row, Select, Typography } from 'antd';
import { UserStatus, Role } from 'graphql/generated';

import { UserSort } from 'types/enums/user_sort';
import { FormattedMessage, useIntl } from 'react-intl';
import { userStatusValues } from 'types/enums/user_status';
import useStyles from './UserFilter.styles';

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
            <FormattedMessage id="MsGXc3" defaultMessage="Clear Filters" />
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="Hw6crD" defaultMessage="Sort Order" />
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
            placeholder={intl.formatMessage({
              id: 'Hw6crD',
              defaultMessage: 'Sort Order',
            })}
          >
            <Select.Option value={UserSort.nameAsc}>
              <FormattedMessage id="9wooBl" defaultMessage="Name A-Z" />
            </Select.Option>
            <Select.Option value={UserSort.nameDesc}>
              <FormattedMessage id="egH4sY" defaultMessage="Name Z-A" />
            </Select.Option>
            <Select.Option value={UserSort.createdAtDesc}>
              <FormattedMessage id="dZYazP" defaultMessage="Newest First" />
            </Select.Option>
            <Select.Option value={UserSort.createdAtAsc}>
              <FormattedMessage id="FqI37D" defaultMessage="Oldest First" />
            </Select.Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="tzMNF3" defaultMessage="Status" />
          </Typography.Paragraph>
          <Select
            placeholder={intl.formatMessage({
              id: 'tzMNF3',
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
              <FormattedMessage id="3a5wL8" defaultMessage="Active" />
            </Select.Option>
            <Select.Option value={UserStatus.Inactive}>
              <FormattedMessage id="6Tps09" defaultMessage="Inactive" />
            </Select.Option>
            <Select.Option value={UserStatus.Invited}>
              <FormattedMessage id="qJje/s" defaultMessage="Invited" />
            </Select.Option>
            <Select.Option value={UserStatus.NotInvited}>
              <FormattedMessage id="kJwS9K" defaultMessage="NotInvited" />
            </Select.Option>
            <Select.Option value={UserStatus.Disabled}>
              <FormattedMessage id="tthToS" defaultMessage="Disabled" />
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="1ZgrhW" defaultMessage="Role" />
          </Typography.Paragraph>
          <Select
            allowClear
            placeholder={intl.formatMessage({
              id: '1ZgrhW',
              defaultMessage: 'Role',
            })}
            className={classes.select}
            value={userRole}
            onChange={setUserRole}
          >
            <Select.Option value={Role.User}>
              <FormattedMessage id="EwRIOm" defaultMessage="User" />
            </Select.Option>
            <Select.Option value={Role.ContentAdmin}>
              <FormattedMessage id="juchkY" defaultMessage="Content Admin" />
            </Select.Option>
            <Select.Option value={Role.SchemeAdmin}>
              <FormattedMessage id="ZENz1B" defaultMessage="Scheme Admin" />
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="hzmswI" defaultMessage="Groups" />
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              id: 'hzmswI',
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
