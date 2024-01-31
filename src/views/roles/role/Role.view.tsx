import React from 'react';
import type { FormInstance } from 'antd';
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
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import type { RoleQuery } from '../../../graphql/generated';
import {
  PermissionMethod,
  PermissionModel,
  Role,
} from '../../../graphql/generated';
import type { DataType } from '../types';
import { availableCheckBoxes, ViewRequired } from '../types';
import ViewRoleSidelist from './ViewRole.Sidelist';
import useStyles from './ViewRole.styles';
import type { FormValues } from './useRole';

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
          id: 'FgydNe',
          defaultMessage: 'View',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Write]: (
      <Checkbox value={PermissionMethod.Write}>
        {formatMessage({
          id: 'VzzYJk',
          defaultMessage: 'Create',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Edit]: (
      <Checkbox value={PermissionMethod.Edit}>
        {formatMessage({
          id: 'wEQDC6',
          defaultMessage: 'Edit',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Delete]: (
      <Checkbox value={PermissionMethod.Delete}>
        {formatMessage({
          id: 'K3r6DQ',
          defaultMessage: 'Delete',
        })}
      </Checkbox>
    ),
    [PermissionMethod.Approve]: (
      <Checkbox value={PermissionMethod.Approve}>
        {formatMessage({
          id: 'WCaf5C',
          defaultMessage: 'Approve',
        })}
      </Checkbox>
    ),
  };

  const labels: Labels = {
    ARTICLES: formatMessage({
      id: '3KNMbJ',
      defaultMessage: 'Articles',
    }),
    CRIME_GROUPS: formatMessage({
      id: 'a0aLil',
      defaultMessage: 'Crime Groups',
    }),
    DASHBOARD: formatMessage({
      id: 'hzSNj4',
      defaultMessage: 'Dashboard',
    }),
    GROUPS: formatMessage({
      id: 'hzmswI',
      defaultMessage: 'Groups',
    }),
    INCIDENTS: formatMessage({
      id: 'mtr3R4',
      defaultMessage: 'Incidents',
    }),
    INVESTIGATIONS: formatMessage({
      id: 'juQ8mz',
      defaultMessage: 'Investigations',
    }),
    OFFENDERS: formatMessage({
      id: 'xb54TN',
      defaultMessage: 'Offenders',
    }),
    VEHICLES: formatMessage({
      id: 'r6wuJ3',
      defaultMessage: 'Vehicles',
    }),
    SETTINGS: formatMessage({
      id: 'D3idYv',
      defaultMessage: 'Settings',
    }),
    TASKS: formatMessage({
      id: 'yhU1et',
      defaultMessage: 'Tasks',
    }),
    CHAT: formatMessage({
      id: 'WTrOy3',
      defaultMessage: 'Chat',
    }),
    CHECKLIST: formatMessage({
      id: 'soCLV+',
      defaultMessage: 'Checklist',
    }),
    DOCUMENTS: formatMessage({
      id: 'vBlT6y',
      defaultMessage: 'Documents',
    }),
    REPORTS: formatMessage({
      id: 'Ppx673',
      defaultMessage: 'Reports',
    }),
    USERS: formatMessage({
      id: 'YDMrKK',
      defaultMessage: 'Users',
    }),
    BUSINESSES: formatMessage({
      id: 'D0tMhW',
      defaultMessage: 'Businesses',
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
            onBack={() => navigate(`/app/scheme-settings/roles`)}
            title={
              roleName ||
              formatMessage({
                id: 'c35gM5',
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
                          id: 'SFuk1v',
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
                                    id: 'HAlOn1',
                                    defaultMessage: 'Name',
                                  })}
                                  labelAlign="left"
                                  labelCol={{ span: 4 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: formatMessage({
                                        id: 'HAlOn1',
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
                                    id: '+U6ozc',
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
                                        id: 'vJrE3G',
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
                                          id: 'EwRIOm',
                                        })}
                                      </Typography.Text>
                                      <Typography.Paragraph
                                        type="secondary"
                                        style={{ fontSize: 13, margin: 0 }}
                                      >
                                        {intl.formatMessage({
                                          defaultMessage:
                                            'A basic user account that can submit data but has no admin features.',
                                          id: 'CA2t76',
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
                                          id: 'juchkY',
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
                                          id: 'Cv0frO',
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
                                          id: 'UmJl0N',
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
                                          id: 'Y3CqF1',
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
                                          id: 'ZENz1B',
                                        })}
                                      </Typography.Text>
                                      <Typography.Paragraph
                                        type="secondary"
                                        style={{ fontSize: 13, margin: 0 }}
                                      >
                                        {intl.formatMessage({
                                          defaultMessage:
                                            'A full administrator account with access to all settings.',
                                          id: 'k5jo6H',
                                        })}
                                      </Typography.Paragraph>
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </>
                            )}
                            {Object.values(PermissionModel)
                              .sort()
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
                                        id: 'jvo0vs',
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
                          id: 'YDMrKK',
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
                                id: 'HAlOn1',
                              }),
                              dataIndex: 'name',
                              key: 'name',
                            },
                            {
                              title: formatMessage({
                                defaultMessage: 'Email',
                                id: 'sy+pv5',
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
                          id: '/VwiLT',
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
