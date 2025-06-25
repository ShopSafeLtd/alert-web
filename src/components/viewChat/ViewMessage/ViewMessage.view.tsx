/* eslint-disable formatjs/no-literal-string-in-jsx */

import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { Theme } from 'configs/ThemeConfig';
import type { ChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';
import type { ChatMessagesQuery } from 'graphql/messages/queries/__generated__/chat-messages.generated';
import type { Age, Build, Gender, Race } from 'graphql/types';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';

import {
  faCar,
  faExclamationCircle,
  faImage,
  faNewspaper,
  faPeopleGroup,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { faCircleXmark } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Mentions,
  Popconfirm,
  Popover,
  Row,
  Spin,
  Upload,
} from 'antd';
import {
  ArticleMessageCard,
  CrimeGroupMessageCard,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';
import LinkArticle from 'components/form-components/linkOptions/LinkArticle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import LinkOffender from 'components/form-components/offender/AddExistingOffender';
import AddUserChat from 'components/form-components/userChat/ManageChatMember';
import WatermarkImage from 'components/images/WatermarkImage.view';
import Picker from 'emoji-picker-react';
import { MessageItemType } from 'graphql/types';
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import customRequest from '../../../utils/custom-request';
import Content from '../Message/Message.view';

const { Option, getMentions } = Mentions;

const useStyles = createUseStyles((theme: Theme) => ({
  actionBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    '&:hover': {
      borderColor: theme.primary,
      color: theme.primary,
      transform: 'translateY(-1px)',
    },
    borderRadius: 8,
    fontSize: 13,
    height: 36,
    transition: 'all 0.2s ease',
  },
  attachmentPreview: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.01)',
    borderRadius: 12,
    marginBottom: 8,
    padding: 8,
  },
  dateSeparator: {
    '& .date-text': {
      backgroundColor: theme.componentBackground,
      color: theme.secondaryText,
      fontSize: 12,
      fontWeight: 500,
      padding: '0 16px',
    },
    '&::before, &::after': {
      backgroundColor: theme.borderColor,
      content: '""',
      flex: 1,
      height: 1,
    },
    alignItems: 'center',

    display: 'flex',

    margin: '24px 0',
  },
  floatingToolbar: {
    '& .ant-dropdown-menu': {
      borderRadius: 12,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 8px 30px rgba(0, 0, 0, 0.4)'
          : '0 8px 30px rgba(0, 0, 0, 0.12)',
      padding: 8,
    },
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1000,
  },
  inputContainer: {
    backgroundColor: theme.componentBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    padding: '12px 16px',
  },
  messageAvatar: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.06)',
    color: theme.headerColor,
    flexShrink: 0,
  },
  messageBubble: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.02)',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 16,
    maxWidth: '70%',
    padding: '12px 16px',
    position: 'relative',
    wordWrap: 'break-word',
  },
  messageBubbleCurrent: {
    '& .ant-typography': {
      color: '#fff !important',
    },
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(74, 144, 226, 0.6)'
        : 'rgba(74, 144, 226, 0.7)',
    borderColor:
      theme.colorScheme === 'dark'
        ? 'rgba(74, 144, 226, 0.4)'
        : 'rgba(74, 144, 226, 0.5)',

    color: '#fff',
    opacity: 0.9,
  },
  messageContainer: {
    backgroundColor: theme.componentBackground,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  messageContent: {
    color: theme.colorScheme === 'dark' ? '#fff' : theme.headerColor,
    fontSize: 14,
    lineHeight: 1.4,
    margin: 0,
  },
  messageHeader: {
    alignItems: 'center',
    display: 'flex',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  messageHeaderCurrent: {
    justifyContent: 'flex-end',
  },
  messageInput: {
    '& .ant-mentions': {
      '&:focus-within': {
        borderColor: theme.primary,
        boxShadow: `0 0 0 2px ${theme.primary}20`,
      },
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.04)'
          : 'rgba(0, 0, 0, 0.02)',
      border: `1px solid ${theme.borderColor}`,
      borderRadius: 12,
      minHeight: 44,
      padding: '10px 16px',

      transition: 'all 0.2s ease',
    },
  },
  messageItem: {
    '&:last-child': {
      marginBottom: 0,
    },

    marginBottom: 16,
  },
  messageSender: {
    color: theme.colorScheme === 'dark' ? '#fff' : theme.headerColor,
    fontSize: 14,
    fontWeight: 600,
  },
  messageTime: {
    color:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.6)'
        : theme.secondaryText,
    fontSize: 12,
  },
  messageWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 12,
  },
  messageWrapperCurrent: {
    flexDirection: 'row-reverse',
  },
  messagesArea: {
    '& .message-container': {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'flex-end',
      minHeight: '100%',
    },
    flex: 1,
    overflow: 'auto',
    padding: '16px',
  },
  sendButton: {
    '&:hover': {
      backgroundColor: theme.primary,
      opacity: 0.9,
      transform: 'scale(1.02)',
    },
    backgroundColor: theme.primary,
    border: 'none',
    borderRadius: 12,
    height: 44,

    minWidth: 80,
  },
  toolbarButton: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
      transform: 'scale(1.02)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0, 0, 0, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.06)',
    height: 36,
    transition: 'all 0.2s ease',
    width: 36,
  },
}));

interface OffenderData {
  age?: Age | null;
  approved?: boolean | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  hair?: null | string;
  id: string;
  imageUid?: string[] | undefined;
  images?: {
    fileName?: null | string;
    id: string;
    new?: boolean;
    optimised?: null | string;
    type?: null | string;
    url?: null | string;
  }[];
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  updatedAt?: Date;
}

// interface FormData {
//   newMessage: string;
// }

interface Props {
  adminRights: boolean;
  articlesData: ArticleData[];
  beforeUpload: (value: RcFile) => void;
  // loading: boolean;
  chatData: ChatQuery | undefined;
  chatId: string;
  crimeGroupsData: CrimeGroupData[];
  data: ChatMessagesQuery | undefined;
  deleteChatConfirm: () => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
  deleteMessageConfirm: (value: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  imgChange: UploadProps['onChange'];
  incidentsData: IncidentCardData[];
  inputStr: string;
  linkArticle: boolean;
  linkCrimeGroup: boolean;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  manageChat: boolean;
  membersData: SchemeUserData[] | undefined;
  messageSent: boolean;
  offendersData: OffenderData[];
  onPreview: (value: UploadFile) => void;
  onSubmit: () => void;
  removeArticle: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  removeIncident: (value: string | undefined) => void;
  removeOffender: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  restrictIncidentAccess: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  setInputStr: (value: string) => void;
  // mentionedUser: { id: string; value: string }[];
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setMessageSent: (value: boolean) => void;
  showPicker: boolean;
  toggleLinkArticle: () => void;
  toggleLinkCrimeGroup: () => void;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleManageChat: () => void;
  toggleShowPicker: () => void;
  totalChats: number;
  updateArticleList: (value: ArticleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  userId: string | undefined;
  vehiclesData: VehicleData[];
}

const ViewMessages = ({
  adminRights,
  articlesData,
  beforeUpload,
  chatId,
  crimeGroupsData,
  data,
  deleteChatConfirm,
  deleteImageConfirm,
  deleteIncidentConfirm,
  deleteMessageConfirm,
  deleteOffenderConfirm,
  fileList,
  form,
  imgChange,
  incidentsData,
  inputStr,
  linkArticle,
  linkCrimeGroup,
  linkIncident,
  linkOffender,
  linkVehicle,
  manageChat,
  membersData,
  messageSent,
  offendersData,
  onSubmit,
  removeArticle,
  removeCrimeGroup,
  removeImage,
  removeIncident,
  removeOffender,
  removeVehicle,
  restrictIncidentAccess,
  saving,
  scrolledToTop,
  setInputStr,
  setMentionedUser,
  setMessageSent,
  showPicker,
  toggleLinkArticle,
  toggleLinkCrimeGroup,
  toggleLinkIncident,
  toggleLinkOffender,
  toggleLinkVehicle,
  toggleManageChat,
  toggleShowPicker,
  totalChats,
  updateArticleList,
  updateCrimeGroupList,
  updateIncidentList,
  updateOffendersList,
  updateVehicleList,
  userId,
  vehiclesData,
}: Props): JSX.Element => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages first load
  useEffect(() => {
    if (ref.current && data?.chatMessages && data.chatMessages.length > 0) {
      ref.current.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [data?.chatMessages?.length]);

  // Scroll to bottom when new message is sent
  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView && messageSent) {
      ref.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
      setMessageSent(false);
    }
  }, [messageSent]);
  if (chatId === '1') {
    deleteImageConfirm('1', '1');
    deleteOffenderConfirm('1', '1');
    deleteIncidentConfirm('1', '1');
  }
  const intl = useIntl();

  const chatsWoDate =
    data?.chatMessages?.filter((chat) => chat?.type !== 'DATE').length || 0;

  return (
    <div className={classes.messageContainer}>
      {adminRights && (
        <div className={classes.floatingToolbar}>
          <Button
            className={classes.toolbarButton}
            disabled={saving}
            icon={<FontAwesomeIcon icon={faUsers} />}
            onClick={toggleManageChat}
            size="small"
            title={intl.formatMessage({ defaultMessage: 'Manage Members' })}
            type="text"
          />
          <Button
            className={classes.toolbarButton}
            disabled={saving}
            icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={deleteChatConfirm}
            size="small"
            style={{ marginLeft: 8 }}
            title={intl.formatMessage({ defaultMessage: 'Delete Chat' })}
            type="text"
          />
        </div>
      )}

      <div className={classes.messagesArea}>
        <InfiniteScroll
          className="message-container"
          dataLength={data?.chatMessages.length || 0}
          hasMore={chatsWoDate < totalChats && data?.chatMessages.length !== 0}
          height="100%"
          inverse
          loader={
            <div
              style={{ display: 'flex', justifyContent: 'center', padding: 16 }}
            >
              <Spin />
            </div>
          }
          next={scrolledToTop}
          scrollableTarget={classes.messagesArea}
        >
          <div ref={ref} />
          {data?.chatMessages?.map((item) =>
            item.type === MessageItemType.Date ? (
              <div className={classes.messageItem} key={item.id}>
                <div className={classes.dateSeparator}>
                  <span className="date-text">{item.content}</span>
                </div>
              </div>
            ) : (
              <div className={classes.messageItem} key={item.id}>
                <div
                  className={`${classes.messageWrapper} ${item.from?.id === userId ? classes.messageWrapperCurrent : ''}`}
                >
                  {item.showUser && item.from?.id !== userId && (
                    <Avatar className={classes.messageAvatar} size={32}>
                      {item.from?.origFirstLetter}
                    </Avatar>
                  )}

                  <div style={{ maxWidth: '70%', width: 'fit-content' }}>
                    {/* Move name and time outside of message bubble */}
                    {(item.showUser || item.from?.id === userId) && (
                      <div
                        className={`${classes.messageHeader} ${item.from?.id === userId ? classes.messageHeaderCurrent : ''}`}
                        style={{ marginBottom: 4 }}
                      >
                        {item.from?.id !== userId && (
                          <span className={classes.messageSender}>
                            {item.from?.fullName}
                            {item.from?.businesses?.[0]?.fullName &&
                              ` (${item.from.businesses[0].fullName})`}
                          </span>
                        )}
                        <span className={classes.messageTime}>
                          {item.formattedDateTime}
                        </span>
                      </div>
                    )}

                    <div
                      className={`${classes.messageBubble} ${item.from?.id === userId ? classes.messageBubbleCurrent : ''}`}
                      style={{ maxWidth: '100%' }}
                    >
                      {/* Render content using existing Content component but styled differently */}
                      {adminRights ? (
                        <Popover
                          content={
                            <Button
                              disabled={saving}
                              icon={
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ paddingRight: 6 }}
                                />
                              }
                              onClick={() =>
                                deleteMessageConfirm(item.id || '')
                              }
                              size="small"
                              type="text"
                            >
                              {intl.formatMessage({
                                defaultMessage: 'Delete Message',
                              })}
                            </Button>
                          }
                          placement={
                            item.from?.id === userId ? 'left' : 'right'
                          }
                          trigger={['contextMenu']}
                        >
                          <div>
                            <Content
                              articles={item.articles}
                              content={item.content}
                              crimeGroups={item.crimeGroups}
                              currentUser={item.currentUser}
                              date={null}
                              from={item.from}
                              images={item.images}
                              incidents={item.incidents}
                              offenders={item.offenders}
                              paddingTop={false}
                              showUser={false}
                              vehicles={item.vehicles}
                            />
                          </div>
                        </Popover>
                      ) : (
                        <Content
                          articles={item.articles}
                          content={item.content}
                          crimeGroups={item.crimeGroups}
                          currentUser={item.currentUser}
                          date={null}
                          from={item.from}
                          images={item.images}
                          incidents={item.incidents}
                          offenders={item.offenders}
                          paddingTop={false}
                          showUser={false}
                          vehicles={item.vehicles}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>

      <div className={classes.inputContainer}>
        {((fileList && fileList.length > 0) ||
          (offendersData && offendersData.length > 0) ||
          (incidentsData && incidentsData.length > 0) ||
          (vehiclesData && vehiclesData.length > 0) ||
          (crimeGroupsData && crimeGroupsData.length > 0) ||
          (articlesData && articlesData.length > 0)) && (
          <div className={classes.attachmentPreview}>
            <Row gutter={8} style={{ overflowX: 'auto' }} wrap={false}>
              {fileList &&
                fileList.map((file) => (
                  <Col key={file.uid} style={{ marginRight: 8 }}>
                    <div className="message-upload-card">
                      <Popconfirm
                        cancelText={intl.formatMessage({
                          defaultMessage: 'No',
                        })}
                        okText={intl.formatMessage({ defaultMessage: 'Yes' })}
                        onConfirm={() => removeImage(file.uid)}
                        placement="topLeft"
                        title={intl.formatMessage({
                          defaultMessage: 'Remove the image?',
                        })}
                        trigger="click"
                      >
                        <Button
                          disabled={saving}
                          icon={
                            <FontAwesomeIcon icon={faCircleXmark} size="sm" />
                          }
                          shape="circle"
                          size="small"
                          style={{
                            position: 'absolute',
                            right: -5,
                            top: -5,
                            zIndex: 100,
                          }}
                          type="text"
                        />
                      </Popconfirm>
                      <div style={{ height: 60, width: 60 }}>
                        <WatermarkImage url={file.url || file.thumbUrl} />
                      </div>
                    </div>
                  </Col>
                ))}
              {offendersData?.map((offender) => (
                <Col key={offender.id}>
                  <OffenderMessageCard
                    offender={offender}
                    removeOffender={removeOffender}
                    saving={saving}
                  />
                </Col>
              ))}
              {incidentsData?.map((incident) => (
                <Col key={incident.id}>
                  <IncidentMessageCard
                    incident={incident}
                    removeIncident={removeIncident}
                    saving={saving}
                  />
                </Col>
              ))}
              {vehiclesData?.map((vehicle) => (
                <Col key={vehicle.id}>
                  <VehicleMessageCard
                    removeVehicle={removeVehicle}
                    saving={saving}
                    vehicle={vehicle}
                  />
                </Col>
              ))}
              {crimeGroupsData?.map((crimeGroup) => (
                <Col key={crimeGroup.id}>
                  <CrimeGroupMessageCard
                    crimeGroup={crimeGroup}
                    removeCrimeGroup={removeCrimeGroup}
                    saving={saving}
                  />
                </Col>
              ))}
              {articlesData?.map((article) => (
                <Col key={article.id}>
                  <ArticleMessageCard
                    article={article}
                    removeArticle={removeArticle}
                    saving={saving}
                  />
                </Col>
              ))}
            </Row>
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
          <Row align="middle" gutter={12}>
            <Col flex={1}>
              <div className={classes.messageInput}>
                <Mentions
                  autoFocus
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
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type a message...',
                  })}
                  prefix="@"
                  value={inputStr}
                >
                  {membersData?.map(({ businesses, fullName, id }) => (
                    <Option key={id} value={fullName.replace(' ', '_')}>
                      {fullName} (
                      {businesses && businesses.length > 0
                        ? businesses[0]?.name || ''
                        : '-'}
                      )
                    </Option>
                  ))}
                </Mentions>
              </div>
            </Col>

            <Col>
              <Popover
                content={
                  <Picker
                    onEmojiClick={(_e, emojiObject) => {
                      setInputStr(inputStr + emojiObject.emoji);
                      toggleShowPicker();
                    }}
                    pickerStyle={{ width: '100%' }}
                  />
                }
                open={showPicker}
                placement="topLeft"
                trigger="click"
              >
                <Button
                  className={classes.actionButton}
                  disabled={saving}
                  icon={
                    <img
                      alt="emoji picker"
                      src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                      style={{ height: 16, width: 16 }}
                    />
                  }
                  onClick={toggleShowPicker}
                  size="large"
                />
              </Popover>
            </Col>

            <Col>
              <Upload
                accept=".png,.jpeg,.webp"
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                fileList={fileList}
                onChange={imgChange}
                showUploadList={false}
              >
                <Button
                  className={classes.actionButton}
                  disabled={saving || (fileList && fileList.length > 3)}
                  icon={<FontAwesomeIcon icon={faImage} />}
                  size="large"
                />
              </Upload>
            </Col>

            <Col>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  className={classes.sendButton}
                  disabled={saving}
                  htmlType="submit"
                  loading={saving}
                  type="primary"
                >
                  {intl.formatMessage({ defaultMessage: 'Send' })}
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <div className={classes.actionBar}>
            <Button
              className={classes.actionButton}
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (vehiclesData && vehiclesData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ||
                (articlesData && articlesData.length > 0)
              }
              icon={
                <FontAwesomeIcon icon={faUsers} style={{ paddingRight: 8 }} />
              }
              onClick={toggleLinkOffender}
              size="small"
            >
              {intl.formatMessage({ defaultMessage: 'Offender' })}
            </Button>

            {!restrictIncidentAccess && (
              <Button
                className={classes.actionButton}
                disabled={
                  saving ||
                  (fileList && fileList.length > 0) ||
                  (offendersData && offendersData.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0) ||
                  (articlesData && articlesData.length > 0)
                }
                icon={
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    style={{ paddingRight: 8 }}
                  />
                }
                onClick={toggleLinkIncident}
                size="small"
              >
                {intl.formatMessage({ defaultMessage: 'Incident' })}
              </Button>
            )}

            <Button
              className={classes.actionButton}
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (vehiclesData && vehiclesData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (articlesData && articlesData.length > 0)
              }
              icon={
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  style={{ paddingRight: 8 }}
                />
              }
              onClick={toggleLinkCrimeGroup}
              size="small"
            >
              {intl.formatMessage({ defaultMessage: 'Crime Group' })}
            </Button>

            <Button
              className={classes.actionButton}
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ||
                (articlesData && articlesData.length > 0)
              }
              icon={
                <FontAwesomeIcon icon={faCar} style={{ paddingRight: 8 }} />
              }
              onClick={toggleLinkVehicle}
              size="small"
            >
              {intl.formatMessage({ defaultMessage: 'Vehicle' })}
            </Button>

            <Button
              className={classes.actionButton}
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ||
                (vehiclesData && vehiclesData.length > 0)
              }
              icon={
                <FontAwesomeIcon
                  icon={faNewspaper}
                  style={{ paddingRight: 8 }}
                />
              }
              onClick={toggleLinkArticle}
              size="small"
            >
              {intl.formatMessage({ defaultMessage: 'Bulletins' })}
            </Button>
          </div>
        </Form>
      </div>

      <Drawer
        onClose={toggleManageChat}
        open={manageChat}
        title={intl.formatMessage({
          defaultMessage: 'Manage Chat Members',
        })}
        width="600"
      >
        {manageChat ? (
          <AddUserChat chatId={chatId} onClose={toggleManageChat} />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={offendersData.map(({ id }) => id)}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
        })}
        width="1000"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={incidentsData?.map(({ id }) => id)}
            onClose={toggleLinkIncident}
            update={updateIncidentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkCrimeGroup}
        open={linkCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Link Crime Groups',
        })}
        width="800"
      >
        {linkCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={crimeGroupsData?.map(({ id }) => id)}
            onClose={toggleLinkCrimeGroup}
            update={updateCrimeGroupList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleLinkVehicle}
        open={linkVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Link Vehicles',
        })}
        width="800"
      >
        {linkVehicle ? (
          <LinkVehicle
            onClose={toggleLinkVehicle}
            update={updateVehicleList}
            vehicleIds={vehiclesData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={toggleLinkArticle}
        open={linkArticle}
        title={intl.formatMessage({
          defaultMessage: 'Link Bulletins',
        })}
        width="1000"
      >
        {linkArticle ? (
          <LinkArticle
            articleIds={articlesData?.map(({ id }) => id)}
            onClose={toggleLinkArticle}
            update={updateArticleList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewMessages;
