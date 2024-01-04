import React from 'react';
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
import { faTrash, faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddUserToChat from 'components/form-components/userChat/AddUserToChat';
import type { ListSchemeUsersQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
import type { MemberData } from './useManageChatMember';

const { Title } = Typography;

interface FormData {
  user: string[];
}

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  addMemberUpdate: (value: FormData) => void;
  loading: boolean;
  usersData:
    | Exclude<ListSchemeUsersQuery['users'], undefined | null>
    | null
    | undefined;
  saving: boolean;
  addMember: boolean;
  toggleAddMember: () => void;
  membersData: MemberData[] | undefined;
  deleteConfirm: (value: string) => void;
}

const EditChat = ({
  onSubmit,
  onClose,
  addMemberUpdate,
  loading,
  usersData,
  saving,
  addMember,
  toggleAddMember,
  membersData,
  deleteConfirm,
}: Props): JSX.Element => {
  const intl = useIntl();
  return !usersData && loading ? (
    <Skeleton />
  ) : (
    <div>
      <Form layout="vertical" onFinish={onSubmit}>
        {membersData && membersData.length > 0 ? (
          <List
            itemLayout="horizontal"
            loading={loading}
            split={false}
            dataSource={membersData}
            renderItem={({
              id,
              // fullName,
              businesses,
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
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
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
                          placement="left"
                          trigger="click"
                          title={intl.formatMessage({
                            defaultMessage: 'Remove this member from the chat?',
                            id: 'DbUQdV',
                          })}
                          onConfirm={() => deleteConfirm(id)}
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
                            disabled={saving}
                            style={{ color: 'red' }}
                            icon={<FontAwesomeIcon icon={faTrash} size="lg" />}
                          />
                        </Popconfirm>
                      </Col>
                    </Row>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <Divider style={{ marginBottom: 15 }} />
        {usersData && usersData.length > 0 && (
          <Row style={{ marginTop: 0 }} gutter={16} justify="center">
            <Col>
              <Button
                disabled={saving}
                onClick={toggleAddMember}
                style={{ color: 'red' }}
                icon={
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 5 }} />
                }
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Chat Members',
                  id: '74pOam',
                })}
              </Button>
            </Col>
          </Row>
        )}
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Chat Members',
          id: '74pOam',
        })}
        visible={addMember}
        width="400"
        onClose={toggleAddMember}
      >
        {addMember ? (
          <AddUserToChat
            onClose={toggleAddMember}
            addMemberUpdate={addMemberUpdate}
            membersData={membersData}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default EditChat;
