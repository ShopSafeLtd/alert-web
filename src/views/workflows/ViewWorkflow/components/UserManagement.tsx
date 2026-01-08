import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import UsersManySelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import {
  Card,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { Model } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { LabelValue } from '../useWorkflowForm';

interface UserManagementProps {
  groups: LabelValue[];
  saving: boolean;
  schemeId: string;
  sendEmailCheck: boolean;
  sendNotificationCheck: boolean;
  taskOutcome: boolean;
  typeWatch: string;
  workflowTypeWatch: Model | null | undefined;
}

const UserManagement: React.FC<UserManagementProps> = ({
  groups,
  saving,
  schemeId,
  sendEmailCheck,
  sendNotificationCheck,
  taskOutcome,
  typeWatch,
  workflowTypeWatch,
}) => {
  const intl = useIntl();

  if (!taskOutcome && !sendEmailCheck && !sendNotificationCheck) {
    return null;
  }

  return (
    <Card>
      <Row wrap={false}>
        <Col flex={1}>
          <Typography.Title level={4}>
            <FormattedMessage defaultMessage="User Management" />
          </Typography.Title>
          <Typography.Text type="secondary">
            <FormattedMessage defaultMessage="Define who should be assigned to workflow outcomes." />
          </Typography.Text>

          {/* Section 1: Specific Users */}
          <div style={{ marginBottom: 24, marginTop: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 4 }}>
              <FormattedMessage defaultMessage="Specific Users" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="These users will always be included." />
            </Typography.Text>
            <Form.Item name="userManagementUsers">
              <UsersManySelect
                allowClear
                disabled={saving}
                mode={'multiple'}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for users...',
                })}
                showSearch
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          {/* Section 2: Groups */}
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 4 }}>
              <FormattedMessage defaultMessage="Groups" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Users from any selected group will be included." />
            </Typography.Text>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Groups" />}
                  name="userManagementGroups"
                >
                  <Select
                    mode="multiple"
                    optionFilterProp="label"
                    options={groups}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Select groups...',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Admin Groups" />}
                  name="userManagementAdminGroups"
                >
                  <Select
                    mode="multiple"
                    optionFilterProp="label"
                    options={groups}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Select admin groups...',
                    })}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Dynamic Groups (only for triggered workflows) */}
            {typeWatch !== 'scheduled' &&
              workflowTypeWatch &&
              workflowTypeWatch !== Model.Checklist && (
                <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
                  <Col span={12}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Use trigger model groups',
                      })}
                      name="useDynamicGroups"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'Include users from groups on the triggering item',
                      })}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Use trigger model admin groups',
                      })}
                      name="useDynamicAdminGroups"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'Include admins of groups on the triggering item',
                      })}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              )}

            {/* Role Filter - visually nested under Groups */}
            <div
              style={{
                borderLeft: '3px solid #d9d9d9',
                marginTop: 16,
                paddingLeft: 16,
              }}
            >
              <Typography.Text
                style={{ display: 'block', marginBottom: 8 }}
                type="secondary"
              >
                <FormattedMessage defaultMessage="When set, only group members with these roles are included." />
              </Typography.Text>
              <Form.Item
                label={<FormattedMessage defaultMessage="Filter by Roles" />}
                name="userManagementRoles"
                style={{ marginBottom: 0 }}
              >
                <RoleSelect multi schemeId={schemeId} />
              </Form.Item>
            </div>
          </div>

          {/* Section 3: Workflow Trigger (only for triggered workflows) */}
          {typeWatch !== 'scheduled' && (
            <div style={{ marginBottom: 24 }}>
              <Typography.Title level={5} style={{ marginBottom: 4 }}>
                <FormattedMessage defaultMessage="Workflow Trigger" />
              </Typography.Title>
              <Typography.Text
                style={{ display: 'block', marginBottom: 12 }}
                type="secondary"
              >
                <FormattedMessage defaultMessage="Include the user who triggered this workflow." />
              </Typography.Text>

              <Form.Item
                label={
                  <FormattedMessage defaultMessage="Created/completed by user" />
                }
                name="useCreatedBy"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          )}

          {/* Section 4: Final Filter */}
          <Divider />
          <div>
            <Typography.Title level={5} style={{ marginBottom: 4 }}>
              <FormattedMessage defaultMessage="Final Filter" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="When enabled, restricts all selections above to business users only." />
            </Typography.Text>

            <Form.Item
              label={<FormattedMessage defaultMessage="Business users only" />}
              name="useBusinessUsers"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default UserManagement;
