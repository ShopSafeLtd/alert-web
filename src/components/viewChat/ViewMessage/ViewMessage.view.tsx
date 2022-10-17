/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picker from 'emoji-picker-react';

import {
  Row,
  Col,
  Avatar,
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
  Descriptions,
  Card,
  Typography,
  Popconfirm,
  Image,
} from 'antd';
import moment, { Moment } from 'moment';
import { MessageType } from 'types';
import {
  faImage,
  faPlus,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChatQuery,
  MessagesQuery,
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

const { Option, getMentions } = Mentions;
const { Title, Paragraph } = Typography;
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
  type: string;
  date?: string;
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
    images?: { id: string; optimised?: string | null; url?: string | null }[];
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
    images?: { id: string; optimised?: string | null; url?: string | null }[];
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

  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
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

  return !data && loading ? (
    <Skeleton active />
  ) : (
    <div className="view-message-container">
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
              disabled={saving}
              onClick={toggleManageChat}
              icon={
                <FontAwesomeIcon
                  icon={faUsers}
                  size="lg"
                  style={{ marginRight: 5 }}
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

      {datedMessages && datedMessages.length > 0 ? (
        <InfiniteScroll
          height={
            (fileList && fileList.length > 0) ||
            (offendersData && offendersData.length > 0) ||
            (incidentsData && incidentsData.length > 0)
              ? 'calc(100vh - 365px)'
              : 'calc(100vh - 255px)'
          }
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
        >
          {datedMessages.map(
            ({
              type,
              date,
              id,
              content,
              sameUser,
              from,
              images,
              incidents,
              offenders,
            }) => (
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
                            from?.id === userId
                              ? 'currentUser'
                              : 'message-avatar'
                          }
                        >
                          {from?.fullName[0]}
                        </Avatar>
                      </Col>
                      <Col>{from?.fullName}</Col>
                    </Row>
                  )}

                  <Row
                    justify={from?.id === userId ? 'end' : 'start'}
                    style={{ marginBottom: 5 }}
                  >
                    <Col>
                      {adminRights ? (
                        <Popover
                          title="Options"
                          trigger="click"
                          placement={from?.id === userId ? 'left' : 'right'}
                          content={
                            adminRights && (
                              <Button
                                type="primary"
                                disabled={saving}
                                icon={
                                  <FontAwesomeIcon icon={faTrash} size="lg" />
                                }
                                onClick={() => {
                                  deleteMessageConfirm(id || '');
                                }}
                              />
                            )
                          }
                        >
                          <div
                            className={
                              from?.id === userId
                                ? 'message-content-card currentUser-card'
                                : 'message-content-card'
                            }
                          >
                            {type === MessageType.message &&
                              images &&
                              images.length > 0 && (
                                <Row style={{ margin: 5 }}>
                                  {images.map((image) => (
                                    <Col key={image.id}>
                                      <div className="message-upload-card">
                                        {/* <div
                                          className="message-image"
                                          style={{
                                            backgroundImage: `url(${image.optimised})`,
                                          }}
                                        /> */}
                                        <Image
                                          width={100}
                                          height={100}
                                          src={image.optimised || ''}
                                        />
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              )}
                            {type === MessageType.message &&
                              offenders &&
                              offenders.length > 0 &&
                              offenders.map((offender) => (
                                <Row key={offender.id} style={{ margin: 5 }}>
                                  <Col key={offender.id}>
                                    <Card size="small" className="message-card">
                                      <Row gutter={5} wrap={false}>
                                        <Col>
                                          {offender.images &&
                                            offender.images.length > 0 && (
                                              //   <div
                                              //     className="message-image"
                                              //     style={{
                                              //       backgroundImage: `url(${offender.images[0].optimised})`,
                                              //     }}
                                              // />
                                              <Image
                                                width={100}
                                                height={100}
                                                src={
                                                  offender.images[0]
                                                    .optimised || ''
                                                }
                                              />
                                            )}
                                        </Col>

                                        <Col
                                          flex={1}
                                          style={{
                                            marginTop: 10,
                                            marginLeft: 5,
                                          }}
                                        >
                                          <Title level={4}>
                                            {' '}
                                            {offender.name}
                                          </Title>
                                          <Descriptions size="small">
                                            {/* <Descriptions.Item
                                                  label="Offender"
                                                  span={2}
                                                >
                                                  {offender.name}
                                                </Descriptions.Item> */}
                                            <Descriptions.Item label="Last Active">
                                              {moment(
                                                offender.updatedAt || moment()
                                              ).format(
                                                `ddd MMM DD YYYY - HH:mm`
                                              )}
                                            </Descriptions.Item>
                                          </Descriptions>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </Col>
                                </Row>
                              ))}
                            {type === MessageType.message &&
                              incidents &&
                              incidents.length > 0 &&
                              incidents.map((incident) => (
                                <Row
                                  key={incident.id}
                                  justify={
                                    from?.id === userId ? 'end' : 'start'
                                  }
                                  style={{ margin: 5 }}
                                >
                                  <Col key={incident.id}>
                                    <Card size="small" className="message-card">
                                      <Row gutter={5} wrap={false}>
                                        <Col>
                                          {incident?.images &&
                                            incident.images.length > 0 && (
                                              <Image
                                                width={100}
                                                height={100}
                                                src={
                                                  incident.images[0]
                                                    .optimised || ''
                                                }
                                              />
                                            )}
                                        </Col>
                                        <Col
                                          flex={1}
                                          style={{
                                            marginTop: 10,
                                            marginLeft: 5,
                                          }}
                                        >
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
                                </Row>
                              ))}
                            {type === MessageType.message && content && (
                              <Row key={id}>
                                <div className="message-content-bubble">
                                  <Col>{content}</Col>
                                </div>
                              </Row>
                            )}
                          </div>
                        </Popover>
                      ) : (
                        <Content
                          type={type}
                          id={id}
                          content={content}
                          from={from}
                          images={images}
                          incidents={incidents}
                          offenders={offenders}
                          userId={userId}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            )
          )}

          <div ref={ref} />
        </InfiniteScroll>
      ) : (
        <div
          className="message-container"
          style={{
            height:
              (fileList && fileList.length > 0) ||
              (offendersData && offendersData.length > 0) ||
              (incidentsData && incidentsData.length > 0)
                ? 'calc(100vh - 365px)'
                : 'calc(100vh - 255px)',
          }}
        >
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
        <Row gutter={5} style={{ height: '45px', margin: '0 10px' }}>
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
                <Option key={id} value={fullName}>
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

        <Row gutter={5} style={{ height: '45px', margin: '0 10px' }}>
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
                  offendersData.length > 0 ||
                  fileList.length > 3
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
                    fileList.length > 0
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
                  saving || fileList.length > 0 || offendersData.length > 0
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
