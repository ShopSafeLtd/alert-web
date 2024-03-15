import React from 'react';
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
import type {
  AvailRolesQuery,
  CreateDashboardMutationVariables,
  DashboardTemplatesQuery,
} from 'graphql/generated';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import useStyles from './ListDashboards.styles';

interface Props {
  data: DashboardTemplatesQuery | undefined;
  loading: boolean;
  addDashboard: boolean;
  toggleCreateDashboard: () => void;
  editDashboard: string | undefined;
  toggleEditDashboard: (arg: string | undefined) => void;
  createDashboard: (data: CreateDashboardMutationVariables) => void;
  deleteDashboard: (id: string) => void;
  updateDashboard: ({
    defaultAdmin,
    defaultUser,
    name,
    roles,
    id,
  }: {
    defaultAdmin?: boolean;
    defaultUser?: boolean;
    name?: string;
    roles?: string[];
    id: string;
  }) => void;
  rolesData: AvailRolesQuery | undefined;
  schemeId: string;
}

interface FormData {
  name: string;
  defaultAdmin: boolean;
  defaultUser: boolean;
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
  data,
  loading,
  deleteDashboard,
  addDashboard,
  updateDashboard,
  createDashboard,
  toggleCreateDashboard,
  editDashboard,
  toggleEditDashboard,
  rolesData,
  schemeId,
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
        name: found.node.name,
        defaultAdmin: !!found.node.defaultAdmin,
        defaultUser: !!found.node.defaultUser,
        roles: found.node.roles?.map(({ id }) => id) || [],
      });

      return {
        name: found.node.name,
        defaultAdmin: !!found.node.defaultAdmin,
        defaultUser: !!found.node.defaultUser,
        roles: found.node.roles?.map(({ id }) => id) || [],
      };
    }
    form.setFieldsValue({
      name: '',
      defaultAdmin: false,
      defaultUser: false,
      roles: [],
    });
    return {
      name: '',
      defaultAdmin: false,
      defaultUser: false,
      roles: [],
    };
  };
  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col>
          <Button type="primary" onClick={toggleCreateDashboard}>
            <FormattedMessage
              defaultMessage="Create New Dashboard"
              id="Zb2QC0"
            />
          </Button>
        </Col>
        <Col flex={1} />
      </Row>
      <Table
        dataSource={data?.dashboards.edges?.map((dashboard) => ({
          key: dashboard.node.id,
          name: dashboard.node.name,
          default: generateDefaultText(dashboard?.node),
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
        }}
        size="small"
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: <FormattedMessage defaultMessage="Name" id="HAlOn1" />,
            render: (name, record) => (
              <Link to={`edit/${record.key}`}> {name} </Link>
            ),
          },
          {
            key: 'default',
            dataIndex: 'default',
            title: (
              <FormattedMessage defaultMessage="Default For" id="cPPe3q" />
            ),
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
              <Row>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit',
                      id: 'wEQDC6',
                    })}
                  >
                    <Button
                      size="small"
                      onClick={() => {
                        toggleEditDashboard(record.key || '');
                      }}
                      style={{ marginRight: 5 }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Delete dashboad',
                      id: '54NZUH',
                    })}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Delete the dashboard?',
                        id: 'CEKS4i',
                      })}
                      onConfirm={() => {
                        deleteDashboard(record.key);
                      }}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        size="small"
                        type="primary"
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
      />
      <Drawer
        title={
          <FormattedMessage defaultMessage="Create New Dashboard" id="Zb2QC0" />
        }
        open={addDashboard}
        width="500"
        onClose={() => {
          toggleCreateDashboard();
          form.setFieldsValue({
            name: '',
            defaultAdmin: false,
            defaultUser: false,
            roles: [],
          });
          form.resetFields();
        }}
      >
        <Form<FormData>
          form={form}
          onFinish={({ name, roles, defaultAdmin, defaultUser }) =>
            createDashboard({
              data: {
                name,
                roles:
                  roles && roles.length > 0
                    ? { connect: roles.map((role) => ({ id: role })) }
                    : undefined,
                defaultAdmin,
                defaultUser,
                runningBanner: '',
                scheme: { connect: { id: schemeId } },
              },
            })
          }
          initialValues={{ defaultAdmin: false, defaultUser: false }}
        >
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            })}
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name',
                  id: 'PVXd+T',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Roles',
              id: 'c35gM5',
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
                id: 'l2pmuP',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item name="defaultUser" valuePropName="checked">
            <Checkbox name="defaultUser">
              {intl.formatMessage({
                defaultMessage: 'Default for users',
                id: '1ioG68',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({
                defaultMessage: 'Submit',
                id: 'wSZR47',
              })}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title={<FormattedMessage defaultMessage="Edit Dashboard" id="UleMJU" />}
        open={!!editDashboard}
        width="500"
        onClose={() => {
          toggleEditDashboard(undefined);
          form.setFieldsValue({
            name: '',
            defaultAdmin: false,
            defaultUser: false,
            roles: [],
          });
          form.resetFields();
        }}
      >
        <Form<FormData>
          form={form}
          onFinish={({ name, roles, defaultAdmin, defaultUser }) =>
            updateDashboard({
              name,
              roles: roles && roles.length > 0 ? roles : undefined,
              defaultAdmin,
              defaultUser,
              id: editDashboard || '',
            })
          }
          initialValues={getInitForForm()}
        >
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            })}
            name="name"
            rules={[{ required: true, message: 'Please a name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Roles',
              id: 'c35gM5',
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
                id: 'l2pmuP',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item name="defaultUser" valuePropName="checked">
            <Checkbox name="defaultUser">
              {intl.formatMessage({
                defaultMessage: 'Default for users',
                id: '1ioG68',
              })}
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({
                defaultMessage: 'Submit',
                id: 'wSZR47',
              })}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Dashboards;
