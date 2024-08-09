import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { faTrash, faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Empty,
  Form,
  List,
  Popconfirm,
  Row,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import AddUserToChat from 'components/form-components/userChat/AddUserToChat';
import React from 'react';
import { useIntl } from 'react-intl';

import type { MemberData } from './useManageChatMember';

const { Title } = Typography;

interface FormData {
  user: string[];
}

interface Props {
  addMember: boolean;
  addMemberUpdate: (value: FormData) => void;
  deleteConfirm: (value: string) => void;
  loading: boolean;
  membersData: MemberData[] | undefined;
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  toggleAddMember: () => void;
  usersData:
    | Exclude<ListSchemeUsersQuery['users'], null | undefined>
    | null
    | undefined;
}

const EditChat = ({
  addMember,
  addMemberUpdate,
  deleteConfirm,
  loading,
  membersData,
  onClose,
  onSubmit,
  saving,
  toggleAddMember,
  usersData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return !usersData && loading ? (
    <Skeleton />
  ) : (
    <div>
      <Form layout="vertical" onFinish={onSubmit}>
        {membersData && membersData.length > 0 ? (
          <List
            dataSource={membersData}
            itemLayout="horizontal"
            loading={loading}
            renderItem={({
              // fullName,
              businesses,
              id,
              // firstLetter,
              origFirstLetter,
              origName,
            }) => (
              <List.Item
                // className={chatId === id ? 'chat-item current' : 'chat-item'}
                key={id}
                style={{ marginTop: -10 }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: '#fde3cf',
                        color: '#f56a00',
                        // marginLeft: 15,
                      }}
                    >
                      {origFirstLetter}
                    </Avatar>
                  }
                  title={
                    <Row align="middle" gutter={5}>
                      <Col style={{ marginTop: 9 }}>
                        <Title level={4}>{origName}</Title>
                      </Col>
                      <Col flex={1}>
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        <Tag color="red" style={{ padding: 3 }}>
                          -- {businesses[0]?.name}
                        </Tag>
                      </Col>
                      <Col>
                        <Popconfirm
                          cancelText={intl.formatMessage({
                            defaultMessage: 'No',
                          })}
                          okText={intl.formatMessage({
                            defaultMessage: 'Yes',
                          })}
                          onConfirm={() => deleteConfirm(id)}
                          overlayInnerStyle={{ padding: 10 }}
                          placement="left"
                          title={intl.formatMessage({
                            defaultMessage: 'Remove this member from the chat?',
                          })}
                          trigger="click"
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} size="lg" />}
                            style={{ color: 'red' }}
                          />
                        </Popconfirm>
                      </Col>
                    </Row>
                  }
                />
              </List.Item>
            )}
            split={false}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <Divider style={{ marginBottom: 15 }} />
        {usersData && usersData.length > 0 && (
          <Row gutter={16} justify="center" style={{ marginTop: 0 }}>
            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddMember}
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Chat Members',
                })}
              </Button>
            </Col>
          </Row>
        )}
        <Form.Item>
          <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({ defaultMessage: 'Save' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        onClose={toggleAddMember}
        open={addMember}
        title={intl.formatMessage({
          defaultMessage: 'Add Chat Members',
        })}
        width="400"
      >
        {addMember ? (
          <AddUserToChat
            addMemberUpdate={addMemberUpdate}
            membersData={membersData}
            onClose={toggleAddMember}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default EditChat;
