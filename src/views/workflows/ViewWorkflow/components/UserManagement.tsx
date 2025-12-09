import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import UsersManySelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import {
  Alert,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Switch,
  Tag,
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
            <FormattedMessage defaultMessage="Define who should be assigned to workflow outcomes. Users from all selected sources will be included." />
          </Typography.Text>

          {/* Logic Explanation Alert */}
          <Alert
            description={
              <FormattedMessage defaultMessage="At least one source must be selected. If multiple sources are chosen, users matching ANY of the criteria will be included in the assignment." />
            }
            message={
              <FormattedMessage defaultMessage="Users are selected from ALL sources below (combined with OR logic)" />
            }
            showIcon
            style={{ marginBottom: 20, marginTop: 16 }}
            type="info"
          />

          {/* Section 1: Specific Users */}
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 8 }}>
              <FormattedMessage defaultMessage="Specific Users (Optional)" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Select individual users by name. Example: John Smith, Jane Doe will both be assigned." />
            </Typography.Text>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="Select Specific Users" />
              }
              name="userManagementUsers"
              tooltip={
                <FormattedMessage defaultMessage="Search and select individual users to be directly assigned to the outcomes" />
              }
            >
              <UsersManySelect
                allowClear
                disabled={saving}
                mode={'multiple'}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a user...',
                })}
                showSearch
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          {/* OR Divider */}
          <Divider style={{ marginBottom: 24, marginTop: 24 }}>
            <Tag color="blue">
              <FormattedMessage defaultMessage="OR" />
            </Tag>
          </Divider>

          {/* Section 2: Role-Based Selection */}
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 8 }}>
              <FormattedMessage defaultMessage="Role-Based Selection (Optional)" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Select roles to include all users with those roles. Example: All users with 'Manager' role will be assigned." />
            </Typography.Text>
            <Form.Item
              label={<FormattedMessage defaultMessage="Roles" />}
              name="userManagementRoles"
              tooltip={
                <FormattedMessage defaultMessage="All users who have any of the selected roles will be assigned to the outcomes" />
              }
            >
              <RoleSelect multi schemeId={schemeId} />
            </Form.Item>
          </div>

          {/* OR Divider */}
          <Divider style={{ marginBottom: 24, marginTop: 24 }}>
            <Tag color="blue">
              <FormattedMessage defaultMessage="OR" />
            </Tag>
          </Divider>

          {/* Section 3: Group-Based Selection */}
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 8 }}>
              <FormattedMessage defaultMessage="Group-Based Selection (Optional)" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Select groups or use dynamic groups from the triggering model. All users in selected groups will be included." />
            </Typography.Text>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Select Groups" />}
                  name="userManagementGroups"
                  tooltip={
                    <FormattedMessage defaultMessage="All users who are members of any selected group will be assigned. Example: Everyone in 'Sales Team' group." />
                  }
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
                  label={
                    <FormattedMessage defaultMessage="Select Admin Groups" />
                  }
                  name="userManagementAdminGroups"
                  tooltip={
                    <FormattedMessage defaultMessage="All users who are admins of any selected group will be assigned. Admin groups give users elevated permissions." />
                  }
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
                <>
                  <Typography.Text
                    style={{ display: 'block', marginBottom: 12, marginTop: 8 }}
                    type="secondary"
                  >
                    <FormattedMessage defaultMessage="Dynamic options: Automatically use groups from the item that triggered this workflow" />
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Use trigger model groups',
                        })}
                        name="useDynamicGroups"
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            "Automatically include users from groups associated with the triggering item (e.g., if an incident triggers this workflow, use that incident's groups)",
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
                            'Automatically include users who are admins of groups associated with the triggering item',
                        })}
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
          </div>

          {/* OR Divider */}
          <Divider style={{ marginBottom: 24, marginTop: 24 }}>
            <Tag color="blue">
              <FormattedMessage defaultMessage="OR" />
            </Tag>
          </Divider>

          {/* Section 4: Dynamic User Selection */}
          <div style={{ marginBottom: 0 }}>
            <Typography.Title level={5} style={{ marginBottom: 8 }}>
              <FormattedMessage defaultMessage="Dynamic User Selection (Optional)" />
            </Typography.Title>
            <Typography.Text
              style={{ display: 'block', marginBottom: 12 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Include users based on their relationship to the workflow trigger or business status." />
            </Typography.Text>

            {typeWatch !== 'scheduled' && (
              <Form.Item
                label={
                  <FormattedMessage defaultMessage="Use created/completed by user" />
                }
                name="useCreatedBy"
                tooltip={
                  <FormattedMessage defaultMessage="Include the user who created or completed the item that triggered this workflow. Example: Assign back to the incident creator." />
                }
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            )}
            <Form.Item
              label={<FormattedMessage defaultMessage="Use Business Users" />}
              name="useBusinessUsers"
              tooltip={
                <FormattedMessage defaultMessage="Restrict the selection to only business users (users with business accounts). This filters the results from all other selections above." />
              }
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
