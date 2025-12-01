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
            <FormattedMessage defaultMessage="Select specific users for the outcomes or define roles, and groups to search for the users to be assigned to the outcomes." />
          </Typography.Text>
          <Form.Item
            label={<FormattedMessage defaultMessage="Select Specific Users" />}
            name="userManagementUsers"
            style={{ marginTop: 14 }}
            tooltip={
              <FormattedMessage defaultMessage="Select users to be assigned to the outcomes" />
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
          <Divider style={{ marginBottom: 26, marginTop: 26 }} />
          <Typography.Paragraph style={{ fontWeight: 500, marginBottom: 14 }}>
            <FormattedMessage defaultMessage="Use the following fields to define criteria for assigning users to the outcomes." />
          </Typography.Paragraph>
          <Form.Item
            label={<FormattedMessage defaultMessage="Roles" />}
            name="userManagementRoles"
            tooltip={
              <FormattedMessage defaultMessage="Select roles which would be used to assign users to the outcomes" />
            }
          >
            <RoleSelect multi schemeId={schemeId} />
          </Form.Item>
          {typeWatch !== 'scheduled' && (
            <Form.Item
              label={
                <FormattedMessage defaultMessage="Use created/completed by user" />
              }
              name="useCreatedBy"
              tooltip={
                <FormattedMessage defaultMessage="Include the user who created or completed the triggering model" />
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
              <FormattedMessage defaultMessage="Include only business users in the selection" />
            }
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Row gutter={[32, 16]}>
            {typeWatch !== 'scheduled' &&
              workflowTypeWatch &&
              workflowTypeWatch !== Model.Checklist && (
                <>
                  <Col>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Use trigger model groups',
                      })}
                      name="useDynamicGroups"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'If parent groups is true will use the parent models groups to get the users from.',
                      })}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Use trigger model admin groups',
                      })}
                      name="useDynamicAdminGroups"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'If parent admin is true will get the users with that group as an admin group.',
                      })}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </>
              )}
            <Col flex={1}>
              <Form.Item
                label={<FormattedMessage defaultMessage="Select Groups" />}
                name="userManagementGroups"
                tooltip={
                  <FormattedMessage defaultMessage="Will use all users who are in this group." />
                }
              >
                <Select
                  mode="multiple"
                  optionFilterProp="label"
                  options={groups}
                />
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item
                label={
                  <FormattedMessage defaultMessage="Select Admin Groups" />
                }
                name="userManagementAdminGroups"
                tooltip={
                  <FormattedMessage defaultMessage="Will use all users who are in this group." />
                }
              >
                <Select
                  mode="multiple"
                  optionFilterProp="label"
                  options={groups}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default UserManagement;
