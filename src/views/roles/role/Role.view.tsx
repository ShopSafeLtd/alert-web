import type { RoleQuery } from '#/views/roles/graphql/queries/__generated__/role.generated';
import type { FormInstance } from 'antd';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { PermissionMethod, PermissionModel, Role } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { DataType } from '../types';
import type { FormValues } from './useRole';

import { ViewRequired, availableCheckBoxes } from '../types';
import ViewRoleSidelist from './ViewRole.Sidelist';
import useStyles from './ViewRole.styles';

interface Props {
  changed: boolean;
  create: boolean;
  data: RoleQuery | undefined;
  form: FormInstance<FormValues>;
  id?: string;
  loading: boolean;
  onFinish: (values: FormValues) => void;
  roleName: string | undefined;
  setChanged: (changed: boolean) => void;
  submitting: boolean;
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
  changed,
  create,
  data,
  form,
  id,
  loading,
  onFinish,
  roleName,
  setChanged,
  submitting,
}: Props) => {
  const navigate = useNavigate();

  const intl = useIntl();
  const formatMessage = intl.formatMessage.bind(intl);
  const classes = useStyles();
  const users = data?.role.users || [];
  const CheckboxComponent: Methods = {
    [PermissionMethod.Approve]: (
      <Checkbox value={PermissionMethod.Approve}>
        {formatMessage({
          defaultMessage: 'Approve',
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
    [PermissionMethod.Edit]: (
      <Checkbox value={PermissionMethod.Edit}>
        {formatMessage({
          defaultMessage: 'Edit',
        })}
      </Checkbox>
    ),
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
  };

  const labels: Labels = {
    ACTIVITIES: formatMessage({
      defaultMessage: 'Activities',
    }),
    ARTICLES: formatMessage({
      defaultMessage: 'Bulletins',
    }),
    BRANDS: formatMessage({
      defaultMessage: 'Brands',
    }),
    BUSINESSES: formatMessage({
      defaultMessage: 'Businesses',
    }),
    CHAT: formatMessage({
      defaultMessage: 'Chat',
    }),
    CHAT_GROUPS: formatMessage({
      defaultMessage: 'Chat Groups',
    }),
    CHECKLIST: formatMessage({
      defaultMessage: 'Checklist',
    }),
    CRIME_GROUPS: formatMessage({
      defaultMessage: 'Crime Groups',
    }),
    DASHBOARD: formatMessage({
      defaultMessage: 'Dashboard',
    }),
    DASHBOARDS: formatMessage({
      defaultMessage: 'Dashboard Settings',
    }),
    DATA_EXPORT: formatMessage({
      defaultMessage: 'Data Export',
    }),
    DATA_IMPORT: formatMessage({
      defaultMessage: 'Data Import',
    }),
    DOCUMENTS: formatMessage({
      defaultMessage: 'Documents',
    }),
    EVIDENCE: formatMessage({
      defaultMessage: 'Evidence',
    }),
    GENERAL_SETTINGS: formatMessage({
      defaultMessage: 'General Settings',
    }),
    GROUPS: formatMessage({
      defaultMessage: 'Groups',
    }),
    INCIDENT_OPTIONS: formatMessage({
      defaultMessage: 'Incident Options',
    }),
    INCIDENTS: formatMessage({
      defaultMessage: 'Incidents',
    }),
    INVESTIGATIONS: formatMessage({
      defaultMessage: 'Investigations',
    }),
    OFFENDER_GALLERIES: formatMessage({
      defaultMessage: 'Offender Galleries',
    }),
    OFFENDER_WARNINGS: formatMessage({
      defaultMessage: 'Offender Warnings',
    }),
    OFFENDERS: formatMessage({
      defaultMessage: 'Offenders',
    }),
    RECYCLE_BIN: formatMessage({
      defaultMessage: 'Recycle Bin',
    }),
    REPORTS: formatMessage({
      defaultMessage: 'Reports',
    }),
    ROLES: formatMessage({
      defaultMessage: 'Roles',
    }),
    SETTINGS: formatMessage({
      defaultMessage: 'Settings',
    }),
    SHARING_SETTINGS: formatMessage({
      defaultMessage: 'Sharing Settings',
    }),
    SINGLE_SHOE: formatMessage({
      defaultMessage: 'Single Shoe',
    }),
    STATEMENT_TEMPLATES: formatMessage({
      defaultMessage: 'Statement Templates',
    }),
    TASKS: formatMessage({
      defaultMessage: 'Tasks',
    }),
    TERMS: formatMessage({
      defaultMessage: 'Terms',
    }),
    USERS: formatMessage({
      defaultMessage: 'Users',
    }),
    VEHICLES: formatMessage({
      defaultMessage: 'Vehicles',
    }),
    WORKFLOWS: formatMessage({
      defaultMessage: 'Workflows',
    }),
  };

  const createFormItem = (dataType: DataType) => (
    <Form.Item
      label={labels[dataType]}
      labelAlign="left"
      labelCol={{ span: 4 }}
      name={dataType}
    >
      <Checkbox.Group
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
        style={{ width: '100%' }}
      >
        <Row>
          {availableCheckBoxes[dataType].map((item) => (
            <Col key={item} span={6}>
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
        <Col className={classes.borderLeft} flex={1}>
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
                          autoComplete="off"
                          form={form}
                          initialValues={{
                            'Dashboard.Group': [PermissionMethod.Read],
                          }}
                          layout="horizontal"
                          name="checklist_form"
                          onChange={() => {
                            setChanged(true);
                          }}
                          onFinish={onFinish}
                        >
                          <>
                            {create && (
                              <>
                                <Form.Item
                                  label={formatMessage({
                                    defaultMessage: 'Name',
                                  })}
                                  labelAlign="left"
                                  labelCol={{ span: 4 }}
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
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  label={formatMessage({
                                    defaultMessage: 'Type',
                                  })}
                                  labelAlign="left"
                                  labelCol={{ span: 4 }}
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
                      </Collapse.Panel>
                      <Collapse.Panel
                        disabled={create}
                        header={formatMessage({
                          defaultMessage: 'Users',
                        })}
                        key="2"
                      >
                        <Table
                          columns={[
                            {
                              dataIndex: 'name',
                              key: 'name',
                              title: formatMessage({
                                defaultMessage: 'Name',
                              }),
                            },
                            {
                              dataIndex: 'email',
                              key: 'email',
                              title: formatMessage({
                                defaultMessage: 'Email',
                              }),
                            },
                          ]}
                          dataSource={users.map(({ user }) => ({
                            email: user?.email,
                            key: user?.id,
                            name: user?.fullName,
                          }))}
                          pagination={{
                            defaultPageSize: 10,
                            hideOnSinglePage: true,
                            total: data?.role.usersCount || 0,
                          }}
                        />
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                  <Col span={1} />
                  <Col>
                    {!create && (
                      <Statistic
                        className={classes.stats}
                        loading={loading}
                        prefix={
                          <FontAwesomeIcon
                            className={classes.prefixIcon}
                            icon={faUser}
                          />
                        }
                        title={formatMessage({
                          defaultMessage: 'Total Users',
                        })}
                        value={data?.role.usersCount || 0}
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
