/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picker from 'emoji-picker-react';
import {
  Row,
  Col,
  Avatar,
  Input,
  Button,
  Form,
  FormInstance,
  Popover,
  Skeleton,
  Tag,
  PageHeader,
  Divider,
  Drawer,
  Upload,
} from 'antd';
import { Moment } from 'moment';
import { MessageType } from 'types';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { faTrash, faUsers } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatQuery } from 'graphql/generated';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import AddUserChat from 'components/form-components/userChat/ManageChatMember';

interface DatedMessages {
  type: string;
  date?: string;
  id?: string;
  sameUser?: boolean | null;
  sent?: boolean | null;
  content?: string;
  createdAt?: Moment;
  from?: { id: string; fullName: string; organisation: string };
  chat?: { id: string; name: string };
}
interface FormData {
  newMessage: string;
}
interface Props {
  onSubmit: (value: FormData) => void;
  loading: boolean;
  chatData: ChatQuery | undefined;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
  deleteMessageConfirm: (value: string) => void;
  adminRights: boolean;
  deleteChatConfirm: () => void;
  manageChat: boolean;
  toggleManageChat: () => void;
  chatId: string;
  // ref: React.MutableRefObject<HTMLDivElement | null>;
}

const ViewMessges = ({
  onSubmit,
  loading,
  chatData,
  form,
  saving,
  scrolledToTop,
  datedMessages,
  userId,
  loadMore,
  deleteMessageConfirm,
  adminRights,
  deleteChatConfirm,
  manageChat,
  toggleManageChat,
  chatId,
}: // ref,
Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [datedMessages]);
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  return loading ? (
    <Skeleton active />
  ) : (
    <div className="view-message">
      <PageHeader
        title={chatData?.chat?.name}
        subTitle={
          <Tag color="red">
            <FontAwesomeIcon
              size="lg"
              icon={faUser}
              style={{
                marginRight: 8,
                color: 'rgb(222, 68, 54)',
              }}
            />
            <span style={{ fontSize: '16px' }}>
              {chatData?.chat?.members.map((el) => el.user).length}
            </span>
          </Tag>
        }
        extra={
          adminRights && [
            <Button
              key="2"
              type="primary"
              disabled={saving}
              onClick={toggleManageChat}
              icon={
                <FontAwesomeIcon
                  icon={faUsers}
                  size="lg"
                  style={{ marginRight: 10 }}
                />
              }
            >
              Manage Chat Members
            </Button>,
            <Button
              key="1"
              disabled={saving}
              onClick={deleteChatConfirm}
              type="primary"
              icon={
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ marginRight: 10 }}
                />
              }
            >
              Delete Chat
            </Button>,
          ]
        }
      />
      <Divider style={{ margin: 0 }} />
      {datedMessages && datedMessages.length > 0 ? (
        <InfiniteScroll
          className="message-container"
          initialScrollY={0}
          dataLength={datedMessages.length}
          next={scrolledToTop}
          hasMore={loadMore}
          inverse
          loader={
            <div className="message-date">
              <div className="date-line" />
              <div className="date">Loading...</div>
              <div className="date-line" />
            </div>
          }
          height="calc(100vh - 275px)"
        >
          {datedMessages.map(({ type, date, id, content, sameUser, from }) => (
            <div key={id}>
              {type === MessageType.date && (
                <div className="message-date">
                  <div className="date-line" />
                  <div className="date">{date}</div>
                  <div className="date-line" />
                </div>
              )}

              <div className="message-content" key={id}>
                {type === MessageType.message && !sameUser && (
                  <Row
                    justify={from?.id === userId ? 'end' : 'start'}
                    className="message-avatar-row"
                  >
                    <Col>
                      <Avatar
                        style={{
                          marginRight: 5,
                        }}
                        className={
                          from?.id === userId ? 'current' : 'message-avatar'
                        }
                      >
                        {from?.fullName[0]}
                      </Avatar>
                    </Col>
                    <Col>{from?.fullName}</Col>
                  </Row>
                )}
                {type === MessageType.message && (
                  <Row key={id} justify={from?.id === userId ? 'end' : 'start'}>
                    <div
                      className={
                        from?.id === userId
                          ? 'message-content-bubble current'
                          : 'message-content-bubble'
                      }
                    >
                      <Col>
                        {adminRights ? (
                          <Popover
                            // placement="topLeft"
                            title="Options"
                            content={
                              adminRights && (
                                <Button
                                  type="primary"
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    deleteMessageConfirm(id || '');
                                  }}
                                />
                              )
                            }
                          >
                            {content}
                          </Popover>
                        ) : (
                          content
                        )}
                      </Col>
                    </div>
                  </Row>
                )}
              </div>
            </div>
          ))}
          <div ref={ref} />
        </InfiniteScroll>
      ) : (
        <div className="message-container">
          <div className="message-date">
            <div className="date-line" />
            <div className="date">No messages in this chat.</div>
            <div className="date-line" />
          </div>
        </div>
      )}
      <Form
        form={form}
        onFinish={onSubmit}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            form.submit();
          }
        }}
      >
        <Form.Item
          name="newMessage"
          label=""
          rules={[
            {
              required: true,
              message: 'The message cannot be empty!',
            },
          ]}
          style={{ margin: '0 15px' }}
        >
          <Row gutter={5} style={{ height: '45px' }}>
            <Col flex={1} style={{ height: '40px' }}>
              <Input
                disabled={saving}
                placeholder="Type a message"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value)}
              />
            </Col>

            <Col style={{ height: '40px' }}>
              <Form.Item>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Button
                onClick={() => setShowPicker((val) => !val)}
                style={{ width: '40px' }}
              >
                <img
                  style={{ marginLeft: -8 }}
                  className="emoji-icon"
                  alt="emoji picker"
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                />
              </Button>
              {showPicker && (
                <Picker
                  pickerStyle={{ width: '100%' }}
                  onEmojiClick={(e, emojiObject) => {
                    console.log(e);
                    setInputStr((prevInput) => prevInput + emojiObject.emoji);
                    setShowPicker(false);
                  }}
                />
              )}
            </Col>
            <Col>
              <Upload>
                <Button icon={<UploadOutlined />} />
              </Upload>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title="Manage Chat Members"
        visible={manageChat}
        width="400"
        onClose={toggleManageChat}
      >
        {manageChat ? (
          <AddUserChat onClose={toggleManageChat} chatId={chatId} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewMessges;
