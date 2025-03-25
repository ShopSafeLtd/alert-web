import type { RoleQuery } from '#/views/roles/graphql/queries/__generated__/role.generated';
import type { FormInstance } from 'antd';

import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import { roleItems, settings } from '#/views/roles/types';
import {
  faCheckSquare,
  faSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { faWarning } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Space,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { PermissionMethod, PermissionModel, Role } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { DeleteFormValues, FormValues } from './useRole';

import ViewRoleSidelist from './ViewRole.Sidelist';
import useStyles from './ViewRole.styles';

interface Props {
  changed: boolean;
  clearAll: () => void;
  create: boolean;
  data: RoleQuery | undefined;
  form: FormInstance<FormValues>;
  id?: string;
  loading: boolean;
  onDelete: (values: DeleteFormValues) => void;
  onFinish: (values: FormValues) => void;
  onSettingsToggle: (value: boolean) => void;
  roleName: string | undefined;
  setAll: () => void;
  setChanged: (changed: boolean) => void;
  showDelete: boolean;
  submitting: boolean;
  toggleShowDelete: () => void;
}

const RoleView = ({
  clearAll,
  form,
  id,
  loading,
  onDelete,
  onFinish,
  onSettingsToggle,
  roleName,
  setAll,
  showDelete,
  submitting,
  toggleShowDelete,
}: Props) => {
  const navigate = useNavigate();

  const intl = useIntl();
  const formatMessage = intl.formatMessage.bind(intl);
  const classes = useStyles();

  const settingsEnabled = Form.useWatch(
    `${PermissionModel.Settings}:${PermissionMethod.Read}`,
    form
  ) as boolean;

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <ViewRoleSidelist current={id} />
        </Col>
        <Col className={classes.borderLeft} flex={1}>
          <Row align="middle">
            <Col flex={1}>
              <PageHeader
                onBack={() => navigate('/app/scheme-settings/roles')}
                title={
                  roleName ||
                  formatMessage({
                    defaultMessage: 'Roles',
                  })
                }
              />
            </Col>
            <Col>
              <Button
                disabled={loading}
                onClick={setAll}
                style={{
                  borderBottomRightRadius: 0,
                  borderRightWidth: 0,
                  borderTopRightRadius: 0,
                }}
              >
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  style={{ marginRight: 10 }}
                />
                <FormattedMessage defaultMessage="Select All" />
              </Button>
            </Col>
            <Col>
              <Button
                disabled={loading}
                onClick={clearAll}
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRightWidth: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                <FontAwesomeIcon icon={faSquare} style={{ marginRight: 10 }} />
                <FormattedMessage defaultMessage="Clear All" />
              </Button>
            </Col>
            <Col style={{ paddingRight: 20 }}>
              <Button
                disabled={loading}
                onClick={toggleShowDelete}
                style={{
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                }}
              >
                <FontAwesomeIcon icon={faTrash} style={{ marginRight: 10 }} />
                <FormattedMessage defaultMessage="Delete Role" />
              </Button>
            </Col>
          </Row>

          <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
            <Col span={24}>
              <div>
                <Form<FormValues>
                  autoComplete="off"
                  form={form}
                  initialValues={{
                    'Dashboard.Group': [PermissionMethod.Read],
                  }}
                  layout="vertical"
                  name="checklist_form"
                  onChange={() => {
                    console.log(true);
                  }}
                  onFinish={onFinish}
                >
                  <>
                    <Card>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label={formatMessage({
                              defaultMessage: 'Name',
                            })}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                            name="name"
                            rules={[
                              {
                                message: formatMessage({
                                  defaultMessage: 'Name',
                                }),
                                required: true,
                              },
                            ]}
                          >
                            <Input disabled={loading} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label={formatMessage({
                              defaultMessage: 'Type',
                            })}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                            name="type"
                            rules={[
                              {
                                message: intl.formatMessage({
                                  defaultMessage:
                                    'Please select a role for the user.',
                                }),
                                required: true,
                              },
                            ]}
                          >
                            <Select disabled={loading}>
                              <Select.Option key={Role.User} value={Role.User}>
                                <Typography.Text>
                                  {intl.formatMessage({
                                    defaultMessage: 'User',
                                  })}
                                </Typography.Text>
                                <Typography.Paragraph
                                  style={{
                                    fontSize: 13,
                                    margin: 0,
                                  }}
                                  type="secondary"
                                >
                                  {intl.formatMessage({
                                    defaultMessage:
                                      'A basic user account that can submit data but has no admin features.',
                                  })}
                                </Typography.Paragraph>
                              </Select.Option>
                              <Select.Option
                                key={Role.ContentAdmin}
                                value={Role.ContentAdmin}
                              >
                                <Typography.Text>
                                  {intl.formatMessage({
                                    defaultMessage: 'Content Admin',
                                  })}
                                </Typography.Text>
                                <Typography.Paragraph
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 400,
                                    margin: 0,
                                  }}
                                  type="secondary"
                                >
                                  {intl.formatMessage({
                                    defaultMessage:
                                      'An account that allows for submitting and administering data but has no access to settings.',
                                  })}
                                </Typography.Paragraph>
                              </Select.Option>
                              <Select.Option
                                key={Role.GroupAdmin}
                                value={Role.GroupAdmin}
                              >
                                <Typography.Text>
                                  {intl.formatMessage({
                                    defaultMessage: 'Group Admin',
                                  })}
                                </Typography.Text>
                                <Typography.Paragraph
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 400,
                                    margin: 0,
                                  }}
                                  type="secondary"
                                >
                                  {intl.formatMessage({
                                    defaultMessage:
                                      'An account that allows for submitting and administering data and limited access to settings within their group.',
                                  })}
                                </Typography.Paragraph>
                              </Select.Option>

                              <Select.Option
                                key={Role.SchemeAdmin}
                                value={Role.SchemeAdmin}
                              >
                                <Typography.Text>
                                  {intl.formatMessage({
                                    defaultMessage: 'Scheme Admin',
                                  })}
                                </Typography.Text>
                                <Typography.Paragraph
                                  style={{
                                    fontSize: 13,
                                    margin: 0,
                                  }}
                                  type="secondary"
                                >
                                  {intl.formatMessage({
                                    defaultMessage:
                                      'A full administrator account with access to all settings.',
                                  })}
                                </Typography.Paragraph>
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label={formatMessage({
                              defaultMessage: 'Can see data awaiting approval',
                            })}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                            name="approvalAllowed"
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                      {roleItems.map((item) => (
                        <Col key={item.key} span={12}>
                          <Card style={{ marginBottom: 0 }}>
                            <Row gutter={8}>
                              <Col>
                                <FontAwesomeIcon icon={item.icon} size="xl" />
                              </Col>
                              <Col flex={1}>
                                <Typography.Title
                                  level={4}
                                  style={{ marginBottom: 2 }}
                                >
                                  {item.title}
                                </Typography.Title>
                              </Col>
                            </Row>
                            <Typography.Paragraph>
                              {item.description}
                            </Typography.Paragraph>
                            <Row gutter={32}>
                              {item.methods.map((method) => (
                                <Col key={method.key}>
                                  <Tooltip
                                    placement="bottom"
                                    title={method.tooltip}
                                  >
                                    <Row align="middle" gutter={6}>
                                      <Col>
                                        <Form.Item
                                          name={`${item.key}:${method.key}`}
                                          style={{ marginBottom: 0 }}
                                          valuePropName="checked"
                                        >
                                          <Switch
                                            disabled={loading || item.disabled}
                                            loading={loading}
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col>
                                        <Typography.Text>
                                          {method.name}
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Tooltip>
                                </Col>
                              ))}
                            </Row>
                          </Card>
                        </Col>
                      ))}
                      <Col />
                    </Row>
                    <Row gutter={[16, 16]}>
                      {settings.map((item) => (
                        <Col key={item.key} span={24}>
                          <Card style={{ marginBottom: 0 }}>
                            <Row
                              gutter={16}
                              style={{ width: '100%' }}
                              wrap={false}
                            >
                              <Col flex={1}>
                                <Row gutter={8}>
                                  <Col>
                                    <FontAwesomeIcon
                                      icon={item.icon}
                                      size="xl"
                                    />
                                  </Col>
                                  <Col flex={1}>
                                    <Typography.Title
                                      level={4}
                                      style={{ marginBottom: 2 }}
                                    >
                                      {item.title}
                                    </Typography.Title>
                                  </Col>
                                </Row>
                                <Typography.Paragraph>
                                  {item.description}
                                </Typography.Paragraph>
                              </Col>
                              <Col>
                                <Form.Item
                                  name={`${PermissionModel.Settings}:${PermissionMethod.Read}`}
                                  style={{ marginBottom: 0 }}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    disabled={loading}
                                    loading={loading}
                                    onChange={() =>
                                      onSettingsToggle(settingsEnabled)
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            {settingsEnabled && (
                              <Row gutter={16}>
                                {item.children?.map((child) => (
                                  <Col
                                    key={child.key}
                                    span={12}
                                    style={{ marginBottom: 4 }}
                                  >
                                    <Typography.Text strong>
                                      {child.title}
                                    </Typography.Text>
                                    <Row gutter={16}>
                                      {child.methods.map((method) => (
                                        <Col
                                          key={method.key}
                                          style={{ marginTop: 4 }}
                                        >
                                          <Row align="middle" gutter={6}>
                                            <Col>
                                              <Form.Item
                                                name={`${child.key}:${method.key}`}
                                                style={{ marginBottom: 0 }}
                                                valuePropName="checked"
                                              >
                                                <Switch
                                                  disabled={loading}
                                                  loading={loading}
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col>
                                              <Typography.Text>
                                                {method.name}
                                              </Typography.Text>
                                            </Col>
                                          </Row>
                                        </Col>
                                      ))}
                                    </Row>
                                  </Col>
                                ))}
                              </Row>
                            )}
                          </Card>
                        </Col>
                      ))}
                      <Col />
                    </Row>

                    <Row>
                      <Col flex={1} />
                      <Space>
                        <Col>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              loading={loading || submitting}
                              type="primary"
                            >
                              {formatMessage({
                                defaultMessage: 'Save',
                              })}
                            </Button>
                          </Form.Item>
                        </Col>
                      </Space>
                    </Row>
                  </>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        onClose={toggleShowDelete}
        title={formatMessage({ defaultMessage: 'Delete Role' })}
        visible={showDelete}
      >
        {showDelete && (
          <Form layout="vertical" onFinish={onDelete}>
            <Typography.Paragraph strong>
              <FormattedMessage defaultMessage="Are you sure you want to do this? Once done this cannot be undone, all users will be moved to the new role." />
            </Typography.Paragraph>
            <Form.Item
              label={formatMessage({ defaultMessage: 'New Role' })}
              name="newRoleId"
              rules={[
                {
                  message: formatMessage({
                    defaultMessage:
                      'Please choose a new role for the existing users.',
                  }),
                  required: true,
                },
              ]}
              tooltip={formatMessage({
                defaultMessage: 'All users will be moved to this role.',
              })}
            >
              <RolesSelect excludeIds={id ? [id] : []} />
            </Form.Item>
            <Row gutter={8}>
              <Col flex={1} />
              <Col>
                <Form.Item>
                  <Button onClick={toggleShowDelete}>
                    {formatMessage({
                      defaultMessage: 'Cancel',
                    })}
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    loading={loading || submitting}
                    type="primary"
                  >
                    <FontAwesomeIcon
                      icon={faWarning}
                      style={{ marginRight: 8 }}
                    />
                    {formatMessage({
                      defaultMessage: 'Delete Role',
                    })}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default RoleView;
