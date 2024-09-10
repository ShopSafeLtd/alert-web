/* eslint-disable formatjs/no-literal-string-in-jsx */

import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
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
import { faCircleXmark, faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Mentions,
  PageHeader,
  Popconfirm,
  Popover,
  Row,
  Skeleton,
  Spin,
  Tag,
  Typography,
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

import customRequest from '../../../utils/custom-request';
import Content from '../Message/Message.view';

const { Option, getMentions } = Mentions;
const { Text } = Typography;

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
  chatData,
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
  onPreview,
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
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView && messageSent) {
      ref.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
      setMessageSent(false);
    }
  }, [data]);
  if (chatId === '1') {
    deleteImageConfirm('1', '1');
    deleteOffenderConfirm('1', '1');
    deleteIncidentConfirm('1', '1');
  }
  const intl = useIntl();

  const chatsWoDate =
    data?.chatMessages?.filter((chat) => chat?.type !== 'DATE').length || 0;

  return (
    <div className="view-message-container">
      <PageHeader
        extra={
          adminRights && [
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              key="1"
              onClick={deleteChatConfirm}
              size="small"
              type="text"
            >
              {intl.formatMessage({
                defaultMessage: 'Delete Chat',
              })}
            </Button>,
          ]
        }
        style={{ padding: '4px 24px 1px' }}
        subTitle={
          <Tag
            color="red"
            onClick={toggleManageChat}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              style={{
                color: 'rgb(222, 68, 54)',
                marginRight: 8,
              }}
            />
            <span style={{ fontSize: '16px' }}>
              {chatData?.chat?.totalMembers}
            </span>
          </Tag>
        }
        title={
          chatData?.chat?.name || (
            <Skeleton.Input
              active
              style={{
                borderRadius: 5,
                height: 35,
                marginLeft: 20,
                marginTop: 10,
              }}
            />
          )
        }
      />
      <Divider style={{ margin: 0 }} />
      <InfiniteScroll
        className="message-container"
        dataLength={data?.chatMessages.length || 0}
        hasMore={chatsWoDate < totalChats && data?.chatMessages.length !== 0}
        height={
          (fileList && fileList.length > 0) ||
          (offendersData && offendersData.length > 0) ||
          (incidentsData && incidentsData.length > 0) ||
          (vehiclesData && vehiclesData.length > 0) ||
          (crimeGroupsData && crimeGroupsData.length > 0) ||
          (articlesData && articlesData.length > 0)
            ? 'calc(100vh - 279px)'
            : 'calc(100vh - 169px)'
        }
        initialScrollY={0}
        inverse
        loader={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        }
        next={scrolledToTop}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        <div ref={ref} />
        {data?.chatMessages?.map((item) =>
          item.type === MessageItemType.Date ? (
            <div key={item.id}>
              <div className="message-date" style={{ marginBottom: 15 }}>
                <div className="date-line" />
                <Text className="date" type="secondary">
                  {item.content}
                </Text>
                <div className="date-line" />
              </div>
            </div>
          ) : (
            <div className="message-content" key={item.id}>
              <Row
                justify={item.from?.id === userId ? 'end' : 'start'}
                key={item.id}
                style={{ marginBottom: 5 }}
              >
                <Col>
                  {adminRights ? (
                    <Popover
                      content={
                        adminRights && (
                          <Button
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                                style={{ marginRight: 5 }}
                              />
                            }
                            onClick={() => {
                              deleteMessageConfirm(item.id || '');
                            }}
                            size="small"
                            type="text"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Delete Message',
                            })}
                          </Button>
                        )
                      }
                      overlayClassName="message-popover"
                      placement={item.from?.id === userId ? 'left' : 'right'}
                      trigger="click"
                    >
                      <div>
                        <Content
                          articles={item.articles}
                          content={item.content}
                          crimeGroups={item.crimeGroups}
                          currentUser={item.currentUser}
                          date={item.formattedDateTime}
                          from={item.from}
                          id={item.id}
                          images={item.images}
                          incidents={item.incidents}
                          offenders={item.offenders}
                          paddingTop={item.paddingTop}
                          showUser={item.showUser}
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
                      date={item.formattedDateTime}
                      from={item.from}
                      id={item.id}
                      images={item.images}
                      incidents={item.incidents}
                      offenders={item.offenders}
                      paddingTop={item.paddingTop}
                      showUser={item.showUser}
                      vehicles={item.vehicles}
                    />
                  )}
                </Col>
              </Row>
            </div>
          )
        )}
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
          className="info-container"
          gutter={10}
          style={{
            height:
              (fileList && fileList.length > 0) ||
              (offendersData && offendersData.length > 0) ||
              (incidentsData && incidentsData.length > 0) ||
              (vehiclesData && vehiclesData.length > 0) ||
              (crimeGroupsData && crimeGroupsData.length > 0) ||
              (articlesData && articlesData.length > 0)
                ? '100px'
                : '0',
            margin: 0,
            marginBottom: 5,
            overflowX: 'auto',
          }}
          wrap={false}
        >
          <Col style={{ marginLeft: 10, marginRight: -8 }}>
            <Upload
              accept=".png,.jpeg,.webp"
              beforeUpload={beforeUpload}
              customRequest={customRequest}
              fileList={fileList}
              // eslint-disable-next-line react/no-unstable-nested-components
              itemRender={(el, file) => (
                <div className="message-upload-card">
                  <div>
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => removeImage(file.uid)}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the image?',
                      })}
                      trigger="click"
                    >
                      <Button
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
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
                  </div>
                  <div style={{ height: 100, width: 100 }}>
                    <WatermarkImage url={file.url || file.thumbUrl} />
                  </div>
                </div>
              )}
              listType="picture-card"
              onChange={imgChange}
              // TODO
              onPreview={onPreview}
            />
          </Col>
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
        <Row gutter={5} style={{ height: '45px', margin: '0px 10px' }}>
          <Col flex={1} style={{ height: '40px' }}>
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
              prefix="@"
              style={{ height: 40 }}
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
          </Col>

          <Col style={{ height: '40px' }}>
            <Form.Item>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Send',
                })}
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={5} style={{ height: '45px', margin: '0 10px 10px' }}>
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
              overlayStyle={{ width: '50%' }}
              placement="topLeft"
              trigger="click"
            >
              <Button
                disabled={saving}
                onClick={toggleShowPicker}
                style={{ width: '40px' }}
                // icon={<FontAwesomeIcon icon={faFaceSmile} size="lg" />}
              >
                <img
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                  alt="emoji picker"
                  className="emoji-icon"
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                  style={{ marginLeft: -8 }}
                />
              </Button>
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
                disabled={
                  saving ||
                  (incidentsData && incidentsData.length > 0) ||
                  (offendersData && offendersData.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0) ||
                  (articlesData && articlesData.length > 0) ||
                  (fileList && fileList.length > 3)
                }
                icon={<FontAwesomeIcon icon={faImage} size="lg" />}
              />
            </Upload>
          </Col>

          <Col>
            <div>
              <Button
                disabled={
                  saving ||
                  (incidentsData && incidentsData.length > 0) ||
                  (fileList && fileList.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0) ||
                  (articlesData && articlesData.length > 0)
                }
                icon={
                  <FontAwesomeIcon className="button-icon" icon={faUsers} />
                }
                onClick={toggleLinkOffender}
              >
                {intl.formatMessage({
                  defaultMessage: 'Offender',
                })}
              </Button>
            </div>
          </Col>
          {!restrictIncidentAccess && (
            <Col>
              <Button
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
                    className="button-icon"
                    icon={faExclamationCircle}
                  />
                }
                onClick={toggleLinkIncident}
              >
                {intl.formatMessage({
                  defaultMessage: 'Incident',
                })}
              </Button>
            </Col>
          )}

          <Col>
            <Button
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (vehiclesData && vehiclesData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (articlesData && articlesData.length > 0)
              }
              icon={
                <FontAwesomeIcon className="button-icon" icon={faPeopleGroup} />
              }
              onClick={toggleLinkCrimeGroup}
            >
              {intl.formatMessage({
                defaultMessage: 'Crime Group',
              })}
            </Button>
          </Col>

          <Col>
            <Button
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ||
                (articlesData && articlesData.length > 0)
              }
              icon={<FontAwesomeIcon className="button-icon" icon={faCar} />}
              onClick={toggleLinkVehicle}
            >
              {intl.formatMessage({
                defaultMessage: 'Vehicle',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ||
                (vehiclesData && vehiclesData.length > 0)
              }
              icon={
                <FontAwesomeIcon className="button-icon" icon={faNewspaper} />
              }
              onClick={toggleLinkArticle}
            >
              {intl.formatMessage({
                defaultMessage: 'Bulletins',
              })}
            </Button>
          </Col>
        </Row>
      </Form>

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
