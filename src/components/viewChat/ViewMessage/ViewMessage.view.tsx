/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picker from 'emoji-picker-react';

import {
  Row,
  Col,
  Avatar,
  // Input,
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
  Mentions,
} from 'antd';
import { Moment } from 'moment';
import { MessageType } from 'types';
import {
  // faImage,
  faTrash,
  faUpload,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatQuery, MessagesQuery } from 'graphql/generated';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import AddUserChat from 'components/form-components/userChat/ManageChatMember';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Option } = Mentions;
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
// interface FormData {
//   newMessage: string;
// }
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}
interface Props {
  onSubmit: () => void;
  data: MessagesQuery | undefined;
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
  membersData: MemberData[] | undefined;
  inputStr: string;
  setInputStr: (value: string) => void;
  showPicker: boolean;
  toggleShowPicker: () => void;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
}

const ViewMessges = ({
  onSubmit,
  data,
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
  membersData,
  inputStr,
  setInputStr,
  showPicker,
  toggleShowPicker,
  imgChange,
  onPreview,
  beforeUpload,
  fileList,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const uploadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [datedMessages]);
  useEffect(() => {
    if (
      uploadRef.current &&
      uploadRef.current.scrollIntoView &&
      fileList &&
      fileList.length > 0
    ) {
      uploadRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [fileList]);

  return !data && loading ? (
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
              {chatData?.chat?.totalMembers}
            </span>
          </Tag>
        }
        extra={
          adminRights && [
            <Button
              key="2"
              type="primary"
              disabled={loading}
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
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      size="lg"
                                      // style={{ marginRight: 10 }}
                                    />
                                  }
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

      {/* <Row gutter={5} style={{ height: '45px' }}>
        <Col flex={1} style={{ height: '40px' }}>
          <Input
            disabled={saving}
            placeholder="Type a message"
            value={inputStr}
            onChange={(e) => {
              setInputStr(e.target.value);
            }}
          />
        </Col>

        <Col style={{ height: '40px' }}>
          <Button
            disabled={saving}
            loading={saving}
            type="primary"
            onClick={() => inputStr && onSubmit({ newMessage: inputStr })}
          >
            Send
          </Button>
        </Col>
      </Row> */}

      <Form
        form={form}
        onFinish={onSubmit}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            form.submit();
          }
        }}
      >
        <Row gutter={5} style={{ height: '45px', margin: '0 10px' }}>
          <Col flex={1} style={{ height: '40px' }}>
            {/* <Form.Item
              name="newMessage"
              label=""
              // rules={[
              //   {
              //     required: true,
              //     message: 'The message cannot be empty!',
              //   },
              // ]}
            > */}
            {/* <Input
                disabled={saving}
                placeholder="Type a message"
                value={inputStr}
                onChange={(e) => {
                  setInputStr(e.target.value);
                }}
              /> */}
            <Mentions
              // rows={1}
              style={{ height: 40 }}
              value={inputStr}
              onChange={(value) => {
                setInputStr(value);
                console.log('value', value);
              }}
              prefix="@@"
            >
              {membersData?.map(({ id, fullName }) => (
                <Option key={id} value={fullName}>
                  {fullName}
                </Option>
              ))}
            </Mentions>
            {/* </Form.Item> */}
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
        <Row gutter={5} style={{ height: '45px', margin: '0 10px' }}>
          <Col>
            <Row className="emoji-container" style={{ marginBottom: 5 }}>
              <Col>
                <Popover
                  visible={showPicker}
                  style={{ width: '50%' }}
                  content={
                    <Picker
                      pickerStyle={{ width: '100%' }}
                      onEmojiClick={(_e, emojiObject) => {
                        setInputStr(inputStr + emojiObject.emoji);
                        toggleShowPicker();
                      }}
                    />
                  }
                  title="Title"
                >
                  <Button onClick={toggleShowPicker} style={{ width: '40px' }}>
                    <img
                      style={{ marginLeft: -8 }}
                      className="emoji-icon"
                      alt="emoji picker"
                      src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    />
                  </Button>
                </Popover>
              </Col>
              <Col>
                <Upload
                  accept=".png,.jpeg,.webp"
                  action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                  fileList={fileList}
                  onChange={imgChange}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  <Button
                    icon={<FontAwesomeIcon icon={faUpload} size="lg" />}
                  />
                </Upload>
              </Col>
            </Row>
            <Form.Item name="images">
              <Upload
                accept=".png,.jpeg,.webp"
                action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                listType="picture-card"
                fileList={fileList}
                onChange={imgChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                // accept=".png,.jpeg,.webp"
              >
                {/* <Button icon={<FontAwesomeIcon icon={faImage} size="lg" />} /> */}
              </Upload>
              <div ref={uploadRef}> </div>
            </Form.Item>
          </Col>
        </Row>
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
