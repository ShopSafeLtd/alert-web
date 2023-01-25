/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picker from 'emoji-picker-react';

import {
  Row,
  Col,
  Button,
  Form,
  FormInstance,
  Popover,
  Tag,
  PageHeader,
  Divider,
  Drawer,
  Upload,
  Mentions,
  Descriptions,
  Card,
  Typography,
  Popconfirm,
  Image,
  // Empty,
  Skeleton,
  Spin,
} from 'antd';
import moment, { Moment } from 'moment';
import { faImage, faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChatQuery,
  ListIncidentsQuery,
  Age,
  Gender,
  Race,
  Build,
} from 'graphql/generated';
import { faCircleXmark, faUser } from '@fortawesome/pro-solid-svg-icons';
import AddUserChat from 'components/form-components/userChat/ManageChatMember';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import LinkOffender from 'components/form-components/incident/offender/AddExisitingOffender';
import LinkIncident from 'components/form-components/offender/LinkIncident';
import Content from '../Message/Message.view';
// import ViewMessageSkeleton from './ViewMessageSkeleton';

const { Option, getMentions } = Mentions;
const { Title, Paragraph, Text } = Typography;
interface OffenderData {
  id: string;
  updatedAt?: Date;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}
interface DatedMessages {
  day: string;
  messages: {
    id: string;
    from?: { id: string; fullName: string; organisation: string };
    messages: {
      id?: string;
      sameUser?: boolean | null;
      sent?: boolean | null;
      content?: string;
      createdAt?: Moment;
      from?: { id: string; fullName: string; organisation: string };
      chat?: { id: string; name: string };
      images?: { id: string; optimised?: string | null; url?: string | null }[];
      incidents?: {
        id: string;
        subject?: string | null;
        description: string;
        dayTime?: string | null;
        images?: {
          id: string;
          optimised?: string | null;
          url?: string | null;
        }[];
      }[];
      offenders?: {
        id: string;
        updatedAt?: Date;
        age?: Age | null;
        build?: Build | null;
        dateOfBirth?: Date | null;
        name?: string | null;
        race?: Race | null;
        gender?: Gender | null;
        images?: {
          id: string;
          optimised?: string | null;
          url?: string | null;
        }[];
      }[];
    }[];
  }[];
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
  loading: boolean;
  chatData: ChatQuery | undefined;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[] | null;
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
  updateOffendersList: (value: OffenderData) => void;
  offendersData: OffenderData[];
  incidentsData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents']
    | undefined;
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateIncidentList: (value: string) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
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
  membersData,
  inputStr,
  setInputStr,
  showPicker,
  toggleShowPicker,
  imgChange,
  onPreview,
  beforeUpload,
  fileList,
  offendersData,
  incidentsData,
  linkIncident,
  linkOffender,
  toggleLinkIncident,
  toggleLinkOffender,
  updateIncidentList,
  updateOffendersList,
  removeOffender,
  removeIncident,
  removeImage,
  setMentionedUser,
  deleteImageConfirm,
  deleteOffenderConfirm,
  deleteIncidentConfirm,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  console.log(loadMore, userId, deleteMessageConfirm, loading);
  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [datedMessages]);
  if (chatId === '1') {
    deleteImageConfirm('1', '1');
    deleteOffenderConfirm('1', '1');
    deleteIncidentConfirm('1', '1');
  }

  return (
    <div className="view-message-container">
      <PageHeader
        style={{ padding: '4px 24px 1px' }}
        title={
          chatData?.chat?.name || (
            <Skeleton.Input
              active
              style={{
                borderRadius: 5,
                marginLeft: 20,
                height: 35,
                marginTop: 10,
              }}
            />
          )
        }
        subTitle={
          <Tag
            color="red"
            style={{ cursor: 'pointer' }}
            onClick={toggleManageChat}
          >
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
              key="1"
              disabled={saving}
              onClick={deleteChatConfirm}
              type="text"
              size="small"
              icon={
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              Delete Chat
            </Button>,
          ]
        }
      />
      <Divider style={{ margin: 0 }} />

      {/* <InfiniteScroll
        height={
          (fileList && fileList.length > 0) ||
          (offendersData && offendersData.length > 0) ||
          (incidentsData && incidentsData.length > 0)
            ? 'calc(100vh - 349px)'
            : 'calc(100vh - 239px)'
        }
        height={200}
        className="message-container"
        initialScrollY={0}
        dataLength={100}
        next={() => console.log('next')}
        hasMore
        inverse
        style={{
          justifyContent: 'end',
          // display: 'flex',
          flexDirection: 'column',
        }}
        loader={
          <div className="message-date">
            <div className="date-line" />
            <div className="date">Loading...</div>
            <div className="date-line" />
          </div>
        }
        loader="Loading"
      >
        {!datedMessages && <ViewMessageSkeleton />}
        {!datedMessages || (loading && <ViewMessageSkeleton />)}
        {!loading && datedMessages?.length === 0 && (
          <Empty description="This is an empty chat group, type the first message below." />
        )}
        {[{ day: 3}, { day: 2 }, { day: 1 }, { day: 0 }].map((message) => (
            <div key={message.day} style={{ height: 200 }}>
              <div className="message-date">
                <div className="date-line" />
                <Text className="date" type="secondary">
                  {message.day}
                </Text>
                <div className="date-line" />
              </div>
              {message.messages.map((user) => (
                <div className="message-content" key={user.id}>
                  {user.messages.map((m, index) => (
                    <Row
                      justify={m.from?.id === userId ? 'end' : 'start'}
                      style={{ marginBottom: 5 }}
                      key={m.id}
                    >
                      <Col>
                        {adminRights ? (
                          <Popover
                            trigger="click"
                            placement={m.from?.id === userId ? 'left' : 'right'}
                            overlayClassName="message-popover"
                            content={
                              adminRights && (
                                <Button
                                  type="text"
                                  disabled={saving}
                                  icon={
                                    <FontAwesomeIcon
                                      style={{ marginRight: 5 }}
                                      icon={faTrash}
                                      size="lg"
                                    />
                                  }
                                  onClick={() => {
                                    deleteMessageConfirm(m.id || '');
                                  }}
                                  size="small"
                                >
                                  Delete Message
                                </Button>
                              )
                            }
                          >
                            <div>
                              <Content
                                id={m.id}
                                content={m.content}
                                from={m.from}
                                images={m.images}
                                incidents={m.incidents}
                                offenders={m.offenders}
                                userId={userId}
                                showUser={m.from?.id === userId}
                                showDate={index === 0}
                                createdAt={m.createdAt}
                              />
                            </div>
                          </Popover>
                        ) : (
                          <Content
                            id={m.id}
                            content={m.content}
                            from={m.from}
                            images={m.images}
                            incidents={m.incidents}
                            offenders={m.offenders}
                            showUser={m.from?.id === userId}
                            showDate={index === 0}
                            userId={userId}
                            createdAt={m.createdAt}
                          />
                        )}
                      </Col>
                    </Row>
                  ))}
                </div>
              ))}
            </div>
          ))}

      </InfiniteScroll> */}

      <InfiniteScroll
        dataLength={datedMessages?.length || 0}
        next={scrolledToTop}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse
        hasMore
        loader={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        }
        initialScrollY={0}
        height={
          (fileList && fileList.length > 0) ||
          (offendersData && offendersData.length > 0) ||
          (incidentsData && incidentsData.length > 0)
            ? 'calc(100vh - 349px)'
            : 'calc(100vh - 239px)'
        }
        className="message-container"
      >
        <div ref={ref} />
        {datedMessages?.map((group) => (
          <div key={group.day}>
            <div className="message-date">
              <div className="date-line" />
              <Text className="date" type="secondary">
                {group.day}
              </Text>
              <div className="date-line" />
            </div>
            {group.messages.map((user) => (
              <div className="message-content" key={user.id}>
                {user.messages.map((m, index) => (
                  <Row
                    justify={m.from?.id === userId ? 'end' : 'start'}
                    style={{ marginBottom: 5 }}
                    key={m.id}
                  >
                    <Col>
                      {adminRights ? (
                        <Popover
                          trigger="click"
                          placement={m.from?.id === userId ? 'left' : 'right'}
                          overlayClassName="message-popover"
                          content={
                            adminRights && (
                              <Button
                                type="text"
                                disabled={saving}
                                icon={
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faTrash}
                                    size="lg"
                                  />
                                }
                                onClick={() => {
                                  deleteMessageConfirm(m.id || '');
                                }}
                                size="small"
                              >
                                Delete Message
                              </Button>
                            )
                          }
                        >
                          <div>
                            <Content
                              id={m.id}
                              content={m.content}
                              from={m.from}
                              images={m.images}
                              incidents={m.incidents}
                              offenders={m.offenders}
                              userId={userId}
                              showUser={m.from?.id === userId}
                              showDate={index === 0}
                              createdAt={m.createdAt}
                            />
                          </div>
                        </Popover>
                      ) : (
                        <Content
                          id={m.id}
                          content={m.content}
                          from={m.from}
                          images={m.images}
                          incidents={m.incidents}
                          offenders={m.offenders}
                          showUser={m.from?.id === userId}
                          showDate={index === 0}
                          userId={userId}
                          createdAt={m.createdAt}
                        />
                      )}
                    </Col>
                  </Row>
                ))}
              </div>
            ))}
          </div>
        ))}
      </InfiniteScroll>

      <Form
        form={form}
        onFinish={onSubmit}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            form.submit();
          }
        }}
      >
        <Row
          wrap={false}
          gutter={10}
          className="info-container"
          style={{
            height:
              (fileList && fileList.length > 0) ||
              (offendersData && offendersData.length > 0) ||
              (incidentsData && incidentsData.length > 0)
                ? '110px'
                : '0',
            margin: 0,
            marginBottom: 5,
            overflowX: 'auto',
          }}
        >
          <Col style={{ marginLeft: 10, marginRight: -8 }}>
            <Upload
              action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
              accept=".png,.jpeg,.webp"
              listType="picture-card"
              fileList={fileList}
              onChange={imgChange}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
              itemRender={(el, file) => (
                <div className="message-upload-card">
                  <div>
                    <Popconfirm
                      placement="topLeft"
                      trigger="click"
                      title="Remove the image?"
                      onConfirm={() => removeImage(file.uid)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        className="info-remove-button"
                        shape="circle"
                        type="text"
                        icon={
                          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                        }
                      />
                    </Popconfirm>
                  </div>
                  {/* <div
                    className="message-image"
                    style={{
                      backgroundImage: `url(${file.url || file.thumbUrl})`,
                    }}
                  /> */}
                  <Image
                    width={100}
                    height={100}
                    src={file.url || file.thumbUrl}
                  />
                </div>
              )}
            />
          </Col>
          {offendersData?.map((offender) => (
            <Col key={offender.id}>
              <Card size="small" className="message-card">
                <Row gutter={5} wrap={false}>
                  <Popconfirm
                    placement="topLeft"
                    trigger="click"
                    title="Remove the offender?"
                    onConfirm={() => removeOffender(offender.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      className="info-remove-button"
                      shape="circle"
                      type="text"
                      icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
                    />
                  </Popconfirm>

                  <Col>
                    {offender.images && offender.images.length > 0 && (
                      <Image
                        width={100}
                        height={100}
                        src={offender.images[0].optimised || ''}
                      />
                    )}
                  </Col>

                  <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
                    <Title level={4}> {offender.name}</Title>
                    <Descriptions size="small">
                      <Descriptions.Item label="Last Active">
                        {moment(offender.updatedAt || moment()).format(
                          `ddd MMM DD YYYY - HH:mm`
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          {incidentsData?.map((incident) => (
            <Col key={incident.id}>
              <Card size="small" className="message-card">
                <Row gutter={5} wrap={false}>
                  <Popconfirm
                    placement="topLeft"
                    trigger="click"
                    title="Remove the incident?"
                    onConfirm={() => removeIncident(incident.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      className="info-remove-button"
                      shape="circle"
                      type="text"
                      icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
                    />
                  </Popconfirm>

                  <Col>
                    {incident?.images && incident.images.length > 0 && (
                      <Image
                        width={100}
                        height={100}
                        src={incident.images[0].optimised || ''}
                      />
                    )}
                  </Col>
                  <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
                    <Paragraph
                      strong
                      ellipsis
                      style={{
                        marginBottom: '0.5rem',
                        fontSize: 15,
                      }}
                    >
                      {incident.subject}
                    </Paragraph>
                    <Descriptions size="small">
                      <Descriptions.Item label="Created At">
                        {incident.dayTime}
                      </Descriptions.Item>
                    </Descriptions>
                    <Paragraph
                      type="secondary"
                      ellipsis
                      style={{
                        marginBottom: '0.5rem',
                      }}
                    >
                      {incident.description}
                    </Paragraph>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={5} style={{ height: '45px', margin: '0px 10px' }}>
          <Col flex={1} style={{ height: '40px' }}>
            <Mentions
              autoFocus
              style={{ height: 40 }}
              value={inputStr}
              onChange={(value) => {
                setInputStr(value);
                const mentions = getMentions(value);
                setMentionedUser(
                  mentions
                    .map((mention) =>
                      membersData?.find(
                        (member) => mention.value === member.fullName
                      )
                    )
                    .map((item) => ({
                      id: item?.id || '',
                      value: item?.fullName || '',
                    }))
                    .filter((item) => item.value !== '')
                );
              }}
              prefix="@"
            >
              {membersData?.map(({ id, fullName, organisation }) => (
                <Option key={id} value={fullName.replace(' ', '_')}>
                  {fullName} ({organisation})
                </Option>
              ))}
            </Mentions>
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

        <Row gutter={5} style={{ height: '45px', margin: '0 10px 10px' }}>
          <Col>
            <Popover
              placement="topLeft"
              trigger="click"
              visible={showPicker}
              overlayStyle={{ width: '50%' }}
              content={
                <Picker
                  pickerStyle={{ width: '100%' }}
                  onEmojiClick={(_e, emojiObject) => {
                    setInputStr(inputStr + emojiObject.emoji);
                    toggleShowPicker();
                  }}
                />
              }
            >
              <Button
                disabled={saving}
                onClick={toggleShowPicker}
                style={{ width: '40px' }}
                // icon={<FontAwesomeIcon icon={faFaceSmile} size="lg" />}
              >
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
              action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
              accept=".png,.jpeg,.webp"
              fileList={fileList}
              onChange={imgChange}
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              <Button
                disabled={
                  saving ||
                  (incidentsData && incidentsData.length > 0) ||
                  (offendersData && offendersData.length > 0) ||
                  (fileList && fileList.length > 3)
                }
                icon={<FontAwesomeIcon icon={faImage} size="lg" />}
              />
            </Upload>
          </Col>

          {adminRights && (
            <Col>
              <div>
                <Button
                  onClick={toggleLinkOffender}
                  disabled={
                    saving ||
                    (incidentsData && incidentsData.length > 0) ||
                    (fileList && fileList.length > 0)
                  }
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                >
                  Link Offender
                </Button>
              </div>
            </Col>
          )}
          {adminRights && (
            <Col>
              <Button
                onClick={toggleLinkIncident}
                disabled={
                  saving ||
                  (fileList && fileList.length > 0) ||
                  (offendersData && offendersData.length > 0)
                }
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
              >
                Link Incident
              </Button>
            </Col>
          )}
        </Row>
      </Form>

      <Drawer
        title="Manage Chat Members"
        visible={manageChat}
        width="600"
        onClose={toggleManageChat}
      >
        {manageChat ? (
          <AddUserChat onClose={toggleManageChat} chatId={chatId} />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title="Link Offenders"
        visible={linkOffender}
        width="800"
        onClose={toggleLinkOffender}
      >
        {linkOffender ? (
          <LinkOffender
            update={updateOffendersList}
            onClose={toggleLinkOffender}
            offenderIds={offendersData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Link Incidents"
        visible={linkIncident}
        width="800"
        onClose={toggleLinkIncident}
      >
        {linkIncident ? (
          <LinkIncident
            update={updateIncidentList}
            onClose={toggleLinkIncident}
            incidentIds={incidentsData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewMessges;
