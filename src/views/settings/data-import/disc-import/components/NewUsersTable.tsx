/* eslint-disable @typescript-eslint/no-misused-promises */
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';

import {
  faClose,
  faTrash,
  faUserMagnifyingGlass,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { Role } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';

import type { NewBusiness, NewUser } from '../DiscImport.types';

const { Text } = Typography;

const useStyles = createUseStyles(() => ({
  cell: {},
  headerCell: {},
  headerRow: {
    borderTopLeftRadius: 10,
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  row: {
    paddingLeft: 7,
  },
}));

interface NewUserRowProps {
  groupsData: SchemeGroupsQuery | undefined;
  newBusinesses: NewBusiness[];
  onDelete: (id: string) => void;
  onUpdateUser: (data: NewUser) => void;
  user: NewUser;
}

const NewUserRow = React.memo(
  ({
    groupsData,
    newBusinesses,
    onDelete,
    onUpdateUser,
    user,
  }: NewUserRowProps) => {
    const [form] = Form.useForm<NewUser>();
    const currentSchemeId = useStoreState((state) => state.scheme.id);
    const [link, setLink] = useState(false);

    const classes = useStyles();

    const { data } = useListSchemeUsersQuery({
      variables: {
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
            email: existing.email ?? '',
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
        business: '',
        existing: undefined,
        groups: undefined,
        role: undefined,
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
      <Form className={classes.row} form={form} onValuesChange={onValuesChange}>
        <Row gutter={8}>
          <Col className={classes.cell} span={4}>
            <Form.Item
              name="fullName"
              rules={[{ message: 'Enter a name', required: true }]}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <Input disabled={link} onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={4}>
            <Form.Item
              name="email"
              rules={[{ message: 'Enter an email', required: true }]}
            >
              <Input disabled={link} onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} style={{ width: 160 }}>
            <Form.Item
              name="role"
              rules={[{ message: 'Choose a role', required: true }]}
            >
              <Select
                onBlur={onBlur}
                options={[
                  {
                    label: 'User',
                    value: Role.User,
                  },
                  {
                    label: 'Content Admin',
                    value: Role.ContentAdmin,
                  },
                  {
                    label: 'Scheme Admin',
                    value: Role.SchemeAdmin,
                  },
                ]}
                style={{ width: 150 }}
              />
            </Form.Item>
          </Col>
          <Col className={classes.cell} flex={1} style={{ maxWidth: 250 }}>
            <Form.Item
              name="business"
              rules={[{ message: 'Choose a business', required: true }]}
            >
              <Select
                disabled={link}
                onBlur={onBlur}
                options={newBusinesses.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col className={classes.cell} flex={1} style={{ maxWidth: 250 }}>
            <Form.Item
              name="groups"
              rules={[{ message: 'Choose at least one group', required: true }]}
            >
              <Select
                disabled={link}
                mode="multiple"
                onBlur={onBlur}
                options={groupsData?.groups?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
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
                <Button onClick={() => setLink(true)} size="small">
                  <FontAwesomeIcon icon={faUserMagnifyingGlass} />
                </Button>
              </Tooltip>
            )}
            {link && (
              <Row gutter={8}>
                <Col>
                  <Form.Item
                    name="existing"
                    rules={[{ message: 'Select a business', required: true }]}
                  >
                    <Select
                      onBlur={onBlur}
                      options={data?.users.map((item) => ({
                        label: item.fullName,
                        value: item.id,
                      }))}
                      style={{ width: 160 }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Clear Link',
                    })}
                  >
                    <Button onClick={clearLink} size="small">
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Popconfirm
              onConfirm={() => onDelete(user.id)}
              overlayInnerStyle={{ padding: 10 }}
              title={intl.formatMessage({
                defaultMessage: 'Are you sure you want to remove this user?',
              })}
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
  newBusinesses: NewBusiness[];
  newUsers: NewUser[];
  onAdd: () => void;
  onUpdateUser: (data: NewUser) => void;
}

const NewUsersTable = ({
  groupsData,
  newBusinesses,
  newUsers,
  onAdd,
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
      extra={
        <Button onClick={onAdd} style={{ marginBottom: 16 }} type="primary">
          <FormattedMessage defaultMessage="Add User" />
        </Button>
      }
      title={intl.formatMessage({
        defaultMessage: 'Users',
      })}
    >
      <Row
        className={classes.headerRow}
        gutter={8}
        style={{ marginBottom: 10 }}
      >
        <Col
          className={classes.headerCell}
          span={4}
          style={{ borderTopLeftRadius: 10 }}
        >
          <Text strong style={{ paddingLeft: 5 }}>
            <FormattedMessage defaultMessage="Name" />
          </Text>
        </Col>
        <Col className={classes.headerCell} span={4}>
          <Text strong style={{ paddingLeft: 5 }}>
            <FormattedMessage defaultMessage="Email" />
          </Text>
        </Col>
        <Col className={classes.headerCell} style={{ width: 160 }}>
          <Text strong style={{ paddingLeft: 5 }}>
            <FormattedMessage defaultMessage="Role" />
          </Text>
        </Col>
        <Col className={classes.headerCell} flex={1} style={{ maxWidth: 250 }}>
          <Text strong style={{ paddingLeft: 5 }}>
            <FormattedMessage defaultMessage="Business" />
          </Text>
        </Col>
        <Col className={classes.headerCell} flex={1} style={{ maxWidth: 250 }}>
          <Text strong style={{ paddingLeft: 5 }}>
            <FormattedMessage defaultMessage="Groups" />
          </Text>
        </Col>
      </Row>

      {activeUsers.map((user) => (
        <NewUserRow
          groupsData={groupsData}
          key={user.id}
          newBusinesses={newBusinesses}
          onDelete={() => {}}
          onUpdateUser={onUpdateUser}
          user={user}
        />
      ))}

      <Pagination
        current={currentPage}
        hideOnSinglePage
        onChange={setCurrentPage}
        pageSizeOptions={[10]}
        showTotal={(total) => `Total Users: ${total}`}
        total={newUsers.length}
      />
    </Card>
  );
};

export default React.memo(NewUsersTable);
