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
} from 'antd';
import { Moment } from 'moment';
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
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  calcAge,
} from 'utils/offender/get-offender-desc';

const { Option, getMentions } = Mentions;
const { Paragraph } = Typography;
interface OffenderData {
  id: string;
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
  setMentionedUser: (id: string[]) => void;
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
              disabled={loading}
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
              Delete Chat0
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
              ? 'calc(100vh - 370px)'
              : 'calc(100vh - 280px)'
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
                  {type === MessageType.message && content && (
                    <Row
                      key={id}
                      justify={from?.id === userId ? 'end' : 'start'}
                      style={{ marginBottom: 10 }}
                    >
                      <div
                        className={
                          from?.id === userId
                            ? 'message-content-bubble currentUser'
                            : 'message-content-bubble'
                        }
                      >
                        <Col>
                          {adminRights ? (
                            <Popover
                              // placement="topLeft"
                              // visible={adminRights}
                              title="Options"
                              content={
                                adminRights && (
                                  <Button
                                    type="primary"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        size="lg"
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

                  {type === MessageType.message && images && images.length > 0 && (
                    <Row
                      justify={from?.id === userId ? 'end' : 'start'}
                      style={{ marginBottom: 10 }}
                    >
                      {images.map((image) => (
                        <Col key={image.id}>
                          <div className="message-upload-card">
                            <div>
                              {adminRights ? (
                                <Popover
                                  title="Options"
                                  content={
                                    adminRights && (
                                      <Button
                                        type="primary"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            size="lg"
                                          />
                                        }
                                        onClick={() => {
                                          deleteImageConfirm(
                                            id || '',
                                            image.id
                                          );
                                        }}
                                      />
                                    )
                                  }
                                >
                                  <div
                                    className="message-image"
                                    style={{
                                      backgroundImage: `url(${image.optimised})`,
                                    }}
                                  />
                                </Popover>
                              ) : (
                                <div
                                  className="message-image"
                                  style={{
                                    backgroundImage: `url(${image.optimised})`,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                  {type === MessageType.message &&
                    offenders &&
                    offenders.length > 0 &&
                    offenders.map((offender) => (
                      <Row
                        key={offender.id}
                        justify={from?.id === userId ? 'end' : 'start'}
                        style={{ marginBottom: 10 }}
                      >
                        <Col key={offender.id}>
                          <Card size="small" className="message-card">
                            {adminRights ? (
                              <Popover
                                title="Options"
                                content={
                                  adminRights && (
                                    <Button
                                      type="primary"
                                      icon={
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          size="lg"
                                        />
                                      }
                                      onClick={() => {
                                        deleteOffenderConfirm(
                                          id || '',
                                          offender.id
                                        );
                                      }}
                                    />
                                  )
                                }
                              >
                                <Row gutter={5} wrap={false}>
                                  <Col>
                                    {offender.images &&
                                    offender.images.length > 0 ? (
                                      <div
                                        className="message-image"
                                        style={{
                                          backgroundImage: `url(${offender.images[0].optimised})`,
                                        }}
                                      />
                                    ) : (
                                      <Skeleton.Image className="message-image-skeleton" />
                                    )}
                                  </Col>

                                  <Col flex={1} style={{ marginTop: 10 }}>
                                    <Descriptions size="small" column={2}>
                                      <Descriptions.Item
                                        label="Offender"
                                        span={2}
                                      >
                                        {offender.name}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Gender">
                                        {getOffenderGender(offender.gender)}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Build">
                                        {getOffenderBuild(offender.build)}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Age">
                                        {offender.dateOfBirth
                                          ? calcAge(offender.dateOfBirth)
                                          : getOffenderAge(offender.age)}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Ethnicity">
                                        {getOffenderRace(offender.race, true)}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </Col>
                                </Row>
                              </Popover>
                            ) : (
                              <Row gutter={5} wrap={false}>
                                <Col>
                                  {offender.images &&
                                  offender.images.length > 0 ? (
                                    <div
                                      className="message-image"
                                      style={{
                                        backgroundImage: `url(${offender.images[0].optimised})`,
                                      }}
                                    />
                                  ) : (
                                    <Skeleton.Image className="message-image-skeleton" />
                                  )}
                                </Col>

                                <Col flex={1} style={{ marginTop: 10 }}>
                                  <Descriptions size="small" column={2}>
                                    <Descriptions.Item
                                      label="Offender"
                                      span={2}
                                    >
                                      {offender.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Gender">
                                      {getOffenderGender(offender.gender)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Build">
                                      {getOffenderBuild(offender.build)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Age">
                                      {offender.dateOfBirth
                                        ? calcAge(offender.dateOfBirth)
                                        : getOffenderAge(offender.age)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ethnicity">
                                      {getOffenderRace(offender.race, true)}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                              </Row>
                            )}
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
                        justify={from?.id === userId ? 'end' : 'start'}
                        style={{ marginBottom: 10 }}
                      >
                        <Col key={incident.id}>
                          <Card size="small" className="message-card">
                            {adminRights ? (
                              <Popover
                                title="Options"
                                content={
                                  adminRights && (
                                    <Button
                                      type="primary"
                                      icon={
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          size="lg"
                                        />
                                      }
                                      onClick={() => {
                                        deleteIncidentConfirm(
                                          id || '',
                                          incident.id
                                        );
                                      }}
                                    />
                                  )
                                }
                              >
                                <Row gutter={5} wrap={false}>
                                  <Col>
                                    {incident?.images &&
                                      incident.images.length > 0 && (
                                        <div
                                          className="message-image"
                                          style={{
                                            backgroundImage: `url(${incident.images[0].optimised})`,
                                          }}
                                        />
                                      )}
                                  </Col>
                                  <Col flex={1} style={{ marginTop: 10 }}>
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

                                    <Paragraph
                                      type="secondary"
                                      ellipsis
                                      style={{ marginBottom: '0.5rem' }}
                                    >
                                      {incident.description}
                                    </Paragraph>
                                    <Paragraph
                                      type="secondary"
                                      ellipsis
                                      style={{ marginBottom: '0.5rem' }}
                                    >
                                      {incident.dayTime}
                                    </Paragraph>
                                  </Col>
                                </Row>
                              </Popover>
                            ) : (
                              <Row gutter={5} wrap={false}>
                                <Col>
                                  {incident?.images &&
                                    incident.images.length > 0 && (
                                      <div
                                        className="message-image"
                                        style={{
                                          backgroundImage: `url(${incident.images[0].optimised})`,
                                        }}
                                      />
                                    )}
                                </Col>
                                <Col flex={1} style={{ marginTop: 10 }}>
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

                                  <Paragraph
                                    type="secondary"
                                    ellipsis
                                    style={{ marginBottom: '0.5rem' }}
                                  >
                                    {incident.description}
                                  </Paragraph>
                                  <Paragraph
                                    type="secondary"
                                    ellipsis
                                    style={{ marginBottom: '0.5rem' }}
                                  >
                                    {incident.dayTime}
                                  </Paragraph>
                                </Col>
                              </Row>
                            )}
                          </Card>
                        </Col>
                      </Row>
                    ))}
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
                ? 'calc(100vh - 370px)'
                : 'calc(100vh - 280px)',
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
            maxHeight: '110px',
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
                      trigger="hover"
                      title="Remove the image?"
                      onConfirm={() => removeImage(file.uid)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        size="small"
                        className="info-remove-button"
                        shape="circle"
                        type="text"
                        icon={
                          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                        }
                      />
                    </Popconfirm>
                  </div>
                  <div
                    className="message-image"
                    style={{
                      backgroundImage: `url(${file.url || file.thumbUrl})`,
                    }}
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
                    trigger="hover"
                    title="Remove the offender?"
                    onConfirm={() => removeOffender(offender.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      className="info-remove-button"
                      shape="circle"
                      type="text"
                      icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
                    />
                  </Popconfirm>

                  <Col>
                    {offender.images && offender.images.length > 0 ? (
                      <div
                        className="message-image"
                        style={{
                          backgroundImage: `url(${offender.images[0].optimised})`,
                        }}
                      />
                    ) : (
                      <Skeleton.Image className="message-image-skeleton" />
                    )}
                  </Col>

                  <Col flex={1} style={{ marginTop: 10 }}>
                    <Descriptions size="small" column={2}>
                      <Descriptions.Item label="Offender" span={2}>
                        {offender.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender">
                        {getOffenderGender(offender.gender)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Build">
                        {getOffenderBuild(offender.build)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Age">
                        {offender.dateOfBirth
                          ? calcAge(offender.dateOfBirth)
                          : getOffenderAge(offender.age)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ethnicity">
                        {getOffenderRace(offender.race, true)}
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
                    trigger="hover"
                    title="Remove the incident?"
                    onConfirm={() => removeIncident(incident.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      className="info-remove-button"
                      shape="circle"
                      type="text"
                      icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
                    />
                  </Popconfirm>

                  <Col style={{ padding: -10 }}>
                    {incident?.images && incident.images.length > 0 && (
                      <div
                        className="message-image"
                        style={{
                          backgroundImage: `url(${incident.images[0].optimised})`,
                        }}
                      />
                    )}
                  </Col>
                  <Col flex={1} style={{ marginTop: 10 }}>
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

                    <Paragraph
                      type="secondary"
                      ellipsis
                      style={{ marginBottom: '0.5rem' }}
                    >
                      {incident.description}
                    </Paragraph>
                    <Paragraph
                      type="secondary"
                      ellipsis
                      style={{ marginBottom: '0.5rem' }}
                    >
                      {incident.dayTime}
                    </Paragraph>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        {/* <Row style={{ margin: '0 10px' }}>
          <Upload
            action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
            className="upload-images"
            listType="picture-card"
            fileList={fileList}
            onChange={imgChange}
            onPreview={onPreview}
            beforeUpload={beforeUpload}
            style={{ width: '50%', height: '50%' }}
          />
        </Row> */}

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
              autoFocus
              style={{ height: 40 }}
              value={inputStr}
              onChange={(value) => {
                // setInputStr(value);
                const newMesage = value.split('$')[0];
                const newMetioned = value.split('$')[1];
                console.log('newMesage', newMesage);
                console.log('newMetioned', newMetioned);

                // console.log('value1', value);
                setMentionedUser([value.split('$')[1]]);
                setMentionedUser(
                  getMentions(value, { prefix: '$' }).map(
                    (mention) => mention.value
                  )
                );
                setInputStr(value.split('$')[0]);

                // console.log('value', value);
                // console.log('getMentions', getMentions(value, { prefix: '@' }));
                // console.log('0', value.split('$')[0]);
                // console.log('1', value.split('$'));
              }}
              onSelect={(value) => {
                // setInputStr(value.split('$')[0]);
                // setMentionedUser(value);
                console.log('selectValue', value);
              }}
              prefix="@"
            >
              {membersData?.map(({ id, fullName }) => (
                <Option key={id} value={`${fullName}$${id}`}>
                  {/* value={`${fullName}$${id}`} */}
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
            <Popover
              placement="topLeft"
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
                loading={saving}
                onClick={toggleShowPicker}
                style={{ width: '40px' }}
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
                disabled={saving}
                loading={saving}
                icon={<FontAwesomeIcon icon={faImage} size="lg" />}
              />
            </Upload>
          </Col>

          {adminRights && (
            <Col>
              <div>
                <Button
                  onClick={toggleLinkOffender}
                  disabled={saving}
                  loading={saving}
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
                disabled={saving}
                loading={saving}
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
