import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Form,
  Statistic,
  Table,
  Card,
  Checkbox,
  Collapse,
  Input,
  PageHeader,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';

import type { DataType } from '../types';
import { availableCheckBoxes, ViewRequired } from '../types';
import ViewRoleSidelist from './ViewRole.Sidelist';
import useStyles from './ViewRole.styles';
import type { FormValues } from './useRole';
import type { RoleQuery } from '#/views/roles/graphql/queries/role.generated';
import { PermissionMethod, PermissionModel, Role } from 'graphql/types';

interface Props {
  id?: string;
  create: boolean;
  form: FormInstance<FormValues>;
  changed: boolean;
  setChanged: (changed: boolean) => void;
  submitting: boolean;
  onFinish: (values: FormValues) => void;
  data: RoleQuery | undefined;
  roleName: string | undefined;
  loading: boolean;
}

type Fields = {
  [key in DataType]: JSX.Element;
};

type Labels = {
  [key in DataType]: string;
};

type Methods = {
  [key in PermissionMethod]: JSX.Element;
};

const RoleView = ({
  id,
  create,
  form,
  changed,
  setChanged,
  submitting,
  onFinish,
  data,
  roleName,
  loading,
}: Props) => {
  const navigate = useNavigate();

  const intl = useIntl();
  const formatMessage = intl.formatMessage.bind(intl);
  const classes = useStyles();
  const users = data?.role.users || [];
  const CheckboxComponent: Methods = {
    [PermissionMethod.Read]: (
      <Checkbox value={PermissionMethod.Read}>
        {formatMessage({
          defaultMessage: 'View',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Write]: (
      <Checkbox value={PermissionMethod.Write}>
        {formatMessage({
          defaultMessage: 'Create',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Edit]: (
      <Checkbox value={PermissionMethod.Edit}>
        {formatMessage({
          defaultMessage: 'Edit',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Delete]: (
      <Checkbox value={PermissionMethod.Delete}>
        {formatMessage({
          defaultMessage: 'Delete',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Approve]: (
      <Checkbox value={PermissionMethod.Approve}>
        {formatMessage({
          defaultMessage: 'Approve',
        })}
      </Checkbox>
    ),
  };

  const labels: Labels = {
    ARTICLES: formatMessage({
      defaultMessage: 'Bulletins',
    }),
    CRIME_GROUPS: formatMessage({
      defaultMessage: 'Crime Groups',
    }),
    DASHBOARD: formatMessage({
      defaultMessage: 'Dashboard',
    }),
    GROUPS: formatMessage({
      defaultMessage: 'Groups',
    }),
    INCIDENTS: formatMessage({
      defaultMessage: 'Incidents',
    }),
    INVESTIGATIONS: formatMessage({
      defaultMessage: 'Investigations',
    }),
    OFFENDERS: formatMessage({
      defaultMessage: 'Offenders',
    }),
    VEHICLES: formatMessage({
      defaultMessage: 'Vehicles',
    }),
    SETTINGS: formatMessage({
      defaultMessage: 'Settings',
    }),
    TASKS: formatMessage({
      defaultMessage: 'Tasks',
    }),
    CHAT: formatMessage({
      defaultMessage: 'Chat',
    }),
    CHECKLIST: formatMessage({
      defaultMessage: 'Checklist',
    }),
    DOCUMENTS: formatMessage({
      defaultMessage: 'Documents',
    }),
    REPORTS: formatMessage({
      defaultMessage: 'Reports',
    }),
    USERS: formatMessage({
      defaultMessage: 'Users',
    }),
    BUSINESSES: formatMessage({
      defaultMessage: 'Businesses',
    }),
    EVIDENCE: formatMessage({
      defaultMessage: 'Evidence',
    }),
  };

  const createFormItem = (dataType: DataType) => (
    <Form.Item
      name={dataType}
      label={labels[dataType]}
      labelAlign="left"
      labelCol={{ span: 4 }}
    >
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={(value: CheckboxValueType[]) => {
          if (ViewRequired.some((item) => value.includes(item))) {
            form.setFieldsValue({
              [dataType]: [
                ...(value as PermissionMethod[]),
                PermissionMethod.Read,
              ],
            });
          }
        }}
      >
        <Row>
          {availableCheckBoxes[dataType].map((item) => (
            <Col span={6} key={item}>
              {CheckboxComponent[item]}
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );

  // eslint-disable-next-line unicorn/no-array-reduce
  const fields: Fields = Object.keys(PermissionModel).reduce((acc, key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    acc[PermissionModel[key]] = createFormItem(PermissionModel[key]);
    return acc;
  }, {} as Fields);

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <ViewRoleSidelist current={id} />
        </Col>
        <Col flex={1} className={classes.borderLeft}>
          <PageHeader
            onBack={() => navigate('/app/scheme-settings/roles')}
            title={
              roleName ||
              formatMessage({
                defaultMessage: 'Roles',
              })
            }
          />
          <Row>
            <Col span={18}>
              <Card loading={loading}>
                <Row>
                  <Col span={20}>
                    <Collapse defaultActiveKey={create ? '1' : undefined}>
                      <Collapse.Panel
                        header={formatMessage({
                          defaultMessage: 'Permissions',
                        })}
                        key="1"
                      >
                        <Form<FormValues>
                          name="checklist_form"
                          onFinish={onFinish}
                          autoComplete="off"
                          layout="horizontal"
                          form={form}
                          initialValues={{
                            'Dashboard.Group': [PermissionMethod.Read],
                          }}
                          onChange={() => {
                            setChanged(true);
                          }}
                        >
                          <>
                            {create && (
                              <>
                                <Form.Item
                                  name="name"
                                  label={formatMessage({
                                    defaultMessage: 'Name',
                                  })}
                                  labelAlign="left"
                                  labelCol={{ span: 4 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: formatMessage({
                                        defaultMessage: 'Name',
                                      }),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name="type"
                                  label={formatMessage({
                                    defaultMessage: 'Type',
                                  })}
                                  labelAlign="left"
                                  labelCol={{ span: 4 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: intl.formatMessage({
                                        defaultMessage:
                                          'Please select a role for the user.',
                                      }),
                                    },
                                  ]}
                                >
                                  <Select>
                                    <Select.Option
                                      key={Role.User}
                                      value={Role.User}
                                    >
                                      <Typography.Text>
                                        {intl.formatMessage({
                                          defaultMessage: 'User',
                                        })}
                                      </Typography.Text>
                                      <Typography.Paragraph
                                        type="secondary"
                                        style={{
                                          fontSize: 13,
                                          margin: 0,
                                        }}
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
                                        type="secondary"
                                        style={{
                                          fontSize: 13,
                                          margin: 0,
                                          fontWeight: 400,
                                        }}
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
                                        type="secondary"
                                        style={{
                                          fontSize: 13,
                                          margin: 0,
                                          fontWeight: 400,
                                        }}
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
                                        type="secondary"
                                        style={{
                                          fontSize: 13,
                                          margin: 0,
                                        }}
                                      >
                                        {intl.formatMessage({
                                          defaultMessage:
                                            'A full administrator account with access to all settings.',
                                        })}
                                      </Typography.Paragraph>
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </>
                            )}
                            {Object.values(PermissionModel)
                              .sort()
                              .filter(
                                (item) => item !== PermissionModel.Checklist
                              )
                              .map((key) => fields[key as DataType])}

                            <Row>
                              <Col flex={1} />
                              <Space>
                                <Col>
                                  <Form.Item hidden={!changed}>
                                    <Button
                                      loading={loading || submitting}
                                      type="primary"
                                      htmlType="submit"
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
                      </Collapse.Panel>
                      <Collapse.Panel
                        header={formatMessage({
                          defaultMessage: 'Users',
                        })}
                        key="2"
                        disabled={create}
                      >
                        <Table
                          pagination={{
                            hideOnSinglePage: true,
                            total: data?.role.usersCount || 0,
                            defaultPageSize: 10,
                          }}
                          columns={[
                            {
                              title: formatMessage({
                                defaultMessage: 'Name',
                              }),
                              dataIndex: 'name',
                              key: 'name',
                            },
                            {
                              title: formatMessage({
                                defaultMessage: 'Email',
                              }),
                              dataIndex: 'email',
                              key: 'email',
                            },
                          ]}
                          dataSource={users.map(({ user }) => ({
                            key: user?.id,
                            name: user?.fullName,
                            email: user?.email,
                          }))}
                        />
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                  <Col span={1} />
                  <Col>
                    {!create && (
                      <Statistic
                        loading={loading}
                        className={classes.stats}
                        title={formatMessage({
                          defaultMessage: 'Total Users',
                        })}
                        value={data?.role.usersCount || 0}
                        prefix={
                          <FontAwesomeIcon
                            className={classes.prefixIcon}
                            icon={faUser}
                          />
                        }
                      />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RoleView;
