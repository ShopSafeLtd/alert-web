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
  Row,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import { faTrash, faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddUserToChat from 'components/form-components/userChat/AddUserToChat';

const { Title } = Typography;

interface FormData {
  user: string[];
}
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  addMemberUpdate: (value: FormData) => void;
  loading: boolean;
  usersData: MemberData[] | undefined;
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
}: Props): JSX.Element =>
  !usersData && loading ? (
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
            renderItem={({ id, fullName, organisation, firstLetter }) => (
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
                      {firstLetter}
                    </Avatar>
                  }
                  title={
                    <Row align="middle" gutter={5}>
                      <Col style={{ marginTop: 9 }}>
                        <Title level={4}>{fullName}</Title>
                      </Col>
                      <Col flex={1}>
                        <Tag color="red" style={{ padding: 3 }}>
                          --{organisation}
                        </Tag>
                      </Col>
                      <Col>
                        <Button
                          disabled={saving}
                          onClick={() => deleteConfirm(id || '')}
                          style={{ color: 'red' }}
                          // type="primary"
                          icon={<FontAwesomeIcon icon={faTrash} size="lg" />}
                        />
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
                Add Chat Members
              </Button>
            </Col>
          </Row>
        )}
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title="Add Chat Members"
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

export default EditChat;
