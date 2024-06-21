/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';

import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faTrash,
  faUserMagnifyingGlass,
} from '@fortawesome/pro-light-svg-icons';
import { useStoreState } from 'state';
import { FormattedMessage, useIntl } from 'react-intl';
import type { NewBusiness, NewUser } from '../DiscImport.types';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/scheme-groups.generated';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { Role } from 'graphql/types';

const { Text } = Typography;

const useStyles = createUseStyles(() => ({
  cell: {},
  row: {
    paddingLeft: 7,
  },
  headerRow: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
    borderTopLeftRadius: 10,
  },
  headerCell: {},
}));

interface NewUserRowProps {
  groupsData: SchemeGroupsQuery | undefined;
  newBusinesses: NewBusiness[];
  user: NewUser;
  onDelete: (id: string) => void;
  onUpdateUser: (data: NewUser) => void;
}

const NewUserRow = React.memo(
  ({
    groupsData,
    newBusinesses,
    user,
    onDelete,
    onUpdateUser,
  }: NewUserRowProps) => {
    const [form] = Form.useForm<NewUser>();
    const currentSchemeId = useStoreState((state) => state.scheme.id);
    const [link, setLink] = useState(false);

    const classes = useStyles();

    const { data } = useListSchemeUsersQuery({
      variables: {
        where: {
          schemes: {
            some: {
              scheme: {
                id: {
                  equals: currentSchemeId,
                },
              },
            },
          },
        },
        groupWhere: {
          scheme: {
            id: {
              equals: currentSchemeId,
            },
          },
        },
        schemesWhere: {
          scheme: {
            id: {
              equals: currentSchemeId,
            },
          },
        },
      },
    });

    useEffect(() => {
      if (user.existing) setLink(true);
    }, []);

    useEffect(() => {
      form.setFieldsValue({
        ...user,
      });
      void form.validateFields();
    }, [user]);

    const onValuesChange = (changedValues: NewBusiness) => {
      if (changedValues.existing) {
        const existing = data?.users.find(
          (item) => item.id === changedValues.existing
        );
        if (existing)
          form.setFieldsValue({
            business: existing.businesses[0]?.id,
            email: existing.email,
            fullName: existing.fullName,
            groups: existing.groups.map((item) => item.id),
            role: existing.schemes.find(
              (item) => item.scheme.id === currentSchemeId
            )?.role,
          });
      }
    };

    const clearLink = () => {
      form.setFieldsValue({
        existing: undefined,
        business: '',
        role: undefined,
        groups: undefined,
      });
      void form.validateFields();
      setLink(false);
    };

    const onBlur = () => {
      const values = form.getFieldsValue();
      onUpdateUser({ ...user, ...values });
    };

    const intl = useIntl();
    return (
      <Form form={form} className={classes.row} onValuesChange={onValuesChange}>
        <Row gutter={8}>
          <Col span={4} className={classes.cell}>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Enter a name' }]}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <Input disabled={link} onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col span={4} className={classes.cell}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Enter an email' }]}
            >
              <Input onBlur={onBlur} disabled={link} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} style={{ width: 160 }}>
            <Form.Item
              name="role"
              rules={[{ required: true, message: 'Choose a role' }]}
            >
              <Select
                style={{ width: 150 }}
                onBlur={onBlur}
                options={[
                  {
                    value: Role.User,
                    label: 'User',
                  },
                  {
                    value: Role.ContentAdmin,
                    label: 'Content Admin',
                  },
                  {
                    value: Role.SchemeAdmin,
                    label: 'Scheme Admin',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col flex={1} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="business"
              rules={[{ required: true, message: 'Choose a business' }]}
            >
              <Select
                disabled={link}
                onBlur={onBlur}
                options={newBusinesses.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col flex={1} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="groups"
              rules={[{ required: true, message: 'Choose at least one group' }]}
            >
              <Select
                disabled={link}
                onBlur={onBlur}
                options={groupsData?.groups?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                mode="multiple"
              />
            </Form.Item>
          </Col>
          <Col>
            {!link && (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Link to an existing user',
                })}
              >
                <Button size="small" onClick={() => setLink(true)}>
                  <FontAwesomeIcon icon={faUserMagnifyingGlass} />
                </Button>
              </Tooltip>
            )}
            {link && (
              <Row gutter={8}>
                <Col>
                  <Form.Item
                    name="existing"
                    rules={[{ required: true, message: 'Select a business' }]}
                  >
                    <Select
                      style={{ width: 160 }}
                      onBlur={onBlur}
                      options={data?.users.map((item) => ({
                        value: item.id,
                        label: item.fullName,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Clear Link',
                    })}
                  >
                    <Button size="small" onClick={clearLink}>
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Popconfirm
              overlayInnerStyle={{ padding: 10 }}
              title={intl.formatMessage({
                defaultMessage: 'Are you sure you want to remove this user?',
              })}
              onConfirm={() => onDelete(user.id)}
            >
              <Button size="small">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  groupsData: SchemeGroupsQuery | undefined;
  onAdd: () => void;
  newUsers: NewUser[];
  newBusinesses: NewBusiness[];
  onUpdateUser: (data: NewUser) => void;
}

const NewUsersTable = ({
  groupsData,
  onAdd,
  newUsers,
  newBusinesses,
  onUpdateUser,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeUsers, setActiveUsers] = useState<NewUser[]>(
    newUsers.slice(0, 10)
  );

  useEffect(() => {
    setActiveUsers(newUsers.slice((currentPage - 1) * 10, 10 * currentPage));
  }, [currentPage]);

  return (
    <Card
      title={intl.formatMessage({
        defaultMessage: 'Users',
      })}
      extra={
        <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
          <FormattedMessage defaultMessage="Add User" />
        </Button>
      }
    >
      <Row
        gutter={8}
        style={{ marginBottom: 10 }}
        className={classes.headerRow}
      >
        <Col
          span={4}
          className={classes.headerCell}
          style={{ borderTopLeftRadius: 10 }}
        >
          <Text style={{ paddingLeft: 5 }} strong>
            <FormattedMessage defaultMessage="Name" />
          </Text>
        </Col>
        <Col span={4} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            <FormattedMessage defaultMessage="Email" />
          </Text>
        </Col>
        <Col style={{ width: 160 }} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            <FormattedMessage defaultMessage="Role" />
          </Text>
        </Col>
        <Col flex={1} className={classes.headerCell} style={{ maxWidth: 250 }}>
          <Text style={{ paddingLeft: 5 }} strong>
            <FormattedMessage defaultMessage="Business" />
          </Text>
        </Col>
        <Col flex={1} className={classes.headerCell} style={{ maxWidth: 250 }}>
          <Text style={{ paddingLeft: 5 }} strong>
            <FormattedMessage defaultMessage="Groups" />
          </Text>
        </Col>
      </Row>

      {activeUsers.map((user) => (
        <NewUserRow
          key={user.id}
          user={user}
          newBusinesses={newBusinesses}
          groupsData={groupsData}
          onDelete={() => {}}
          onUpdateUser={onUpdateUser}
        />
      ))}

      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        total={newUsers.length}
        showTotal={(total) => `Total Users: ${total}`}
        pageSizeOptions={[10]}
        hideOnSinglePage
      />
    </Card>
  );
};

export default React.memo(NewUsersTable);
