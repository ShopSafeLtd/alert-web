import type { CreateDashboardMutationVariables } from '#/views/dashboard-management/graphql/mutations/__generated__/dashboard.generated';
import type { AvailRolesQuery } from '#/views/dashboard-management/graphql/queries/__generated__/available-roles.generated';
import type { DashboardTemplatesQuery } from '#/views/dashboard-management/graphql/queries/__generated__/dashboard-templates.generated';

import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './ListDashboards.styles';

interface Props {
  addDashboard: boolean;
  createDashboard: (data: CreateDashboardMutationVariables) => void;
  data: DashboardTemplatesQuery | undefined;
  deleteDashboard: (id: string) => void;
  editDashboard: string | undefined;
  loading: boolean;
  rolesData: AvailRolesQuery | undefined;
  schemeId: string;
  toggleCreateDashboard: () => void;
  toggleEditDashboard: (arg: string | undefined) => void;
  updateDashboard: ({
    defaultAdmin,
    defaultUser,
    id,
    name,
    roles,
  }: {
    defaultAdmin?: boolean;
    defaultUser?: boolean;
    id: string;
    name?: string;
    roles?: string[];
  }) => void;
}

interface FormData {
  defaultAdmin: boolean;
  defaultUser: boolean;
  name: string;
  roles: string[];
}

const generateDefaultText = (
  arg0?: {
    defaultAdmin?: boolean | null;
    defaultUser?: boolean | null;
  } | null
) => {
  if (!arg0) return '';
  let text = '';
  if (arg0.defaultAdmin) {
    text = 'Admin';
  }
  if (arg0.defaultUser) {
    text = text === 'Admin' ? 'Admin & User' : 'User';
  }
  return text;
};

const Dashboards = ({
  addDashboard,
  createDashboard,
  data,
  deleteDashboard,
  editDashboard,
  loading,
  rolesData,
  schemeId,
  toggleCreateDashboard,
  toggleEditDashboard,
  updateDashboard,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [form] = Form.useForm();

  const getInitForForm = () => {
    const found = data?.dashboards.edges.find(
      ({ node }) => node.id === editDashboard
    );
    console.log(found?.node.roles?.map(({ id }) => id) || []);
    if (found) {
      form.setFieldsValue({
        defaultAdmin: !!found.node.defaultAdmin,
        defaultUser: !!found.node.defaultUser,
        name: found.node.name,
        roles: found.node.roles?.map(({ id }) => id) || [],
      });

      return {
        defaultAdmin: !!found.node.defaultAdmin,
        defaultUser: !!found.node.defaultUser,
        name: found.node.name,
        roles: found.node.roles?.map(({ id }) => id) || [],
      };
    }
    form.setFieldsValue({
      defaultAdmin: false,
      defaultUser: false,
      name: '',
      roles: [],
    });
    return {
      defaultAdmin: false,
      defaultUser: false,
      name: '',
      roles: [],
    };
  };
  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col>
          <Button onClick={toggleCreateDashboard} type="primary">
            <FormattedMessage defaultMessage="Create New Dashboard" />
          </Button>
        </Col>
        <Col flex={1} />
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
              <Link to={`edit/${record.key}`}> {name} </Link>
            ),
            title: <FormattedMessage defaultMessage="Name" />,
          },
          {
            dataIndex: 'default',
            key: 'default',
            title: <FormattedMessage defaultMessage="Default For" />,
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <Row>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit',
                    })}
                  >
                    <Button
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        toggleEditDashboard(record.key || '');
                      }}
                      size="small"
                      style={{ marginRight: 5 }}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Delete dashboad',
                    })}
                  >
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => {
                        deleteDashboard(record.key);
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Delete the dashboard?',
                      })}
                    >
                      <Button
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        size="small"
                        type="primary"
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>
            ),
            width: 150,
          },
        ]}
        dataSource={data?.dashboards.edges?.map((dashboard) => ({
          default: generateDefaultText(dashboard?.node),
          key: dashboard.node.id,
          name: dashboard.node.name,
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
        }}
        size="small"
      />
      <Drawer
        onClose={() => {
          toggleCreateDashboard();
          form.setFieldsValue({
            defaultAdmin: false,
            defaultUser: false,
            name: '',
            roles: [],
          });
          form.resetFields();
        }}
        open={addDashboard}
        title={<FormattedMessage defaultMessage="Create New Dashboard" />}
        width="500"
      >
        <Form<FormData>
          form={form}
          initialValues={{ defaultAdmin: false, defaultUser: false }}
          onFinish={({ defaultAdmin, defaultUser, name, roles }) =>
            createDashboard({
              data: {
                defaultAdmin,
                defaultUser,
                name,
                roles:
                  roles && roles.length > 0
                    ? { connect: roles.map((role) => ({ id: role })) }
                    : undefined,
                runningBanner: '',
                scheme: { connect: { id: schemeId } },
              },
            })
          }
        >
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name',
                }),
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Roles',
            })}
            name="roles"
          >
            <Select mode="multiple">
              {rolesData?.roles?.edges?.map(({ node: role }) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="defaultAdmin" valuePropName="checked">
            <Checkbox name="defaultAdmin">
              {intl.formatMessage({
                defaultMessage: 'Default for admins',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item name="defaultUser" valuePropName="checked">
            <Checkbox name="defaultUser">
              {intl.formatMessage({
                defaultMessage: 'Default for users',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button htmlType="submit" type="primary">
              {intl.formatMessage({
                defaultMessage: 'Submit',
              })}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        onClose={() => {
          toggleEditDashboard(undefined);
          form.setFieldsValue({
            defaultAdmin: false,
            defaultUser: false,
            name: '',
            roles: [],
          });
          form.resetFields();
        }}
        open={!!editDashboard}
        title={<FormattedMessage defaultMessage="Edit Dashboard" />}
        width="500"
      >
        <Form<FormData>
          form={form}
          initialValues={getInitForForm()}
          onFinish={({ defaultAdmin, defaultUser, name, roles }) =>
            updateDashboard({
              defaultAdmin,
              defaultUser,
              id: editDashboard || '',
              name,
              roles: roles && roles.length > 0 ? roles : undefined,
            })
          }
        >
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            name="name"
            rules={[{ message: 'Please a name!', required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Roles',
            })}
            name="roles"
          >
            <Select mode="multiple">
              {rolesData?.roles?.edges?.map(({ node: role }) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="defaultAdmin" valuePropName="checked">
            <Checkbox name="defaultAdmin">
              {intl.formatMessage({
                defaultMessage: 'Default for admins',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item name="defaultUser" valuePropName="checked">
            <Checkbox name="defaultUser">
              {intl.formatMessage({
                defaultMessage: 'Default for users',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button htmlType="submit" type="primary">
              {intl.formatMessage({
                defaultMessage: 'Submit',
              })}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Dashboards;
