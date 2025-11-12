import type { FormData } from '#/views/vision/detection-configs/ViewConfig/useDetectionConfigForm';
import type { FormInstance } from 'antd';

import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import UsersManySelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import { Card, Col, Divider, Form, Row, Switch, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface UserManagementProps {
  form: FormInstance<FormData>;
  saving: boolean;
  schemeId: string;
}

const UserManagement: React.FC<UserManagementProps> = ({
  form,
  saving,
  schemeId,
}) => {
  const intl = useIntl();
  const outcomeType = Form.useWatch('outcomeType', form);

  // Only show if an outcome type is selected
  if (!outcomeType) {
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
          <Row gutter={[32, 16]}>
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
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default UserManagement;
