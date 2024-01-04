import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picker from 'emoji-picker-react';

import type { FormInstance } from 'antd';
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
  faCar,
  faExclamationCircle,
  faImage,
  faNewspaper,
  faPeopleGroup,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type {
  Age,
  Build,
  ChatMessagesQuery,
  ChatQuery,
  Gender,
  Race,
} from 'graphql/generated';
import { MessageItemType } from 'graphql/generated';
import { faCircleXmark, faUser } from '@fortawesome/pro-solid-svg-icons';
import AddUserChat from 'components/form-components/userChat/ManageChatMember';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';

import {
  ArticleMessageCard,
  CrimeGroupMessageCard,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';
import { useIntl } from 'react-intl';
import LinkArticle from 'components/form-components/linkOptions/LinkArticle';
import Content from '../Message/Message.view';
import customRequest from '../../../utils/custom-request';

const { Option, getMentions } = Mentions;
const { Text } = Typography;

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

// interface FormData {
//   newMessage: string;
// }

interface Props {
  chatId: string;
  onSubmit: () => void;
  data: ChatMessagesQuery | undefined;
  // loading: boolean;
  chatData: ChatQuery | undefined;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  userId: string | undefined;
  messageSent: boolean;
  deleteMessageConfirm: (value: string) => void;
  adminRights: boolean;
  deleteChatConfirm: () => void;
  manageChat: boolean;
  toggleManageChat: () => void;
  membersData: SchemeUserData[] | undefined;
  inputStr: string;
  setInputStr: (value: string) => void;
  showPicker: boolean;
  toggleShowPicker: () => void;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  offendersData: OffenderData[];
  incidentsData: IncidentCardData[];
  crimeGroupsData: CrimeGroupData[];
  vehiclesData: VehicleData[];
  articlesData: ArticleData[];
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  linkCrimeGroup: boolean;
  linkArticle: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleLinkCrimeGroup: () => void;
  toggleLinkArticle: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateVehicleList: (value: VehicleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  updateArticleList: (value: ArticleData) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  removeArticle: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  // mentionedUser: { id: string; value: string }[];
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
  setMessageSent: (value: boolean) => void;
  totalChats: number;
  restrictIncidentAccess: boolean;
}

const ViewMessages = ({
  onSubmit,
  chatData,
  totalChats,
  form,
  saving,
  scrolledToTop,
  userId,
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
  crimeGroupsData,
  vehiclesData,
  linkIncident,
  linkOffender,
  linkVehicle,
  linkCrimeGroup,
  toggleLinkIncident,
  toggleLinkOffender,
  toggleLinkVehicle,
  toggleLinkCrimeGroup,
  updateIncidentList,
  updateOffendersList,
  updateVehicleList,
  updateCrimeGroupList,
  removeOffender,
  removeIncident,
  removeImage,
  removeCrimeGroup,
  removeVehicle,
  setMentionedUser,
  deleteImageConfirm,
  deleteOffenderConfirm,
  deleteIncidentConfirm,
  data,
  messageSent,
  setMessageSent,
  restrictIncidentAccess,
  articlesData,
  linkArticle,
  toggleLinkArticle,
  updateArticleList,
  removeArticle,
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
              {intl.formatMessage({
                defaultMessage: 'Delete Chat',
                id: 'NMr04q',
              })}
            </Button>,
          ]
        }
      />
      <Divider style={{ margin: 0 }} />
      <InfiniteScroll
        dataLength={data?.chatMessages.length || 0}
        next={scrolledToTop}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse
        hasMore={chatsWoDate < totalChats && data?.chatMessages.length !== 0}
        loader={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        }
        initialScrollY={0}
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
        className="message-container"
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
                style={{ marginBottom: 5 }}
                key={item.id}
              >
                <Col>
                  {adminRights ? (
                    <Popover
                      trigger="click"
                      placement={item.from?.id === userId ? 'left' : 'right'}
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
                              deleteMessageConfirm(item.id || '');
                            }}
                            size="small"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Delete Message',
                              id: 'TwEM4f',
                            })}
                          </Button>
                        )
                      }
                    >
                      <div>
                        <Content
                          id={item.id}
                          content={item.content}
                          from={item.from}
                          images={item.images}
                          incidents={item.incidents}
                          offenders={item.offenders}
                          vehicles={item.vehicles}
                          articles={item.articles}
                          crimeGroups={item.crimeGroups}
                          showUser={item.showUser}
                          currentUser={item.currentUser}
                          date={item.formattedDateTime}
                          paddingTop={item.paddingTop}
                        />
                      </div>
                    </Popover>
                  ) : (
                    <Content
                      id={item.id}
                      content={item.content}
                      from={item.from}
                      images={item.images}
                      incidents={item.incidents}
                      offenders={item.offenders}
                      vehicles={item.vehicles}
                      crimeGroups={item.crimeGroups}
                      articles={item.articles}
                      showUser={item.showUser}
                      currentUser={item.currentUser}
                      date={item.formattedDateTime}
                      paddingTop={item.paddingTop}
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
          wrap={false}
          gutter={10}
          className="info-container"
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
        >
          <Col style={{ marginLeft: 10, marginRight: -8 }}>
            <Upload
              customRequest={customRequest}
              accept=".png,.jpeg,.webp"
              listType="picture-card"
              fileList={fileList}
              onChange={imgChange}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
              // TODO
              // eslint-disable-next-line react/no-unstable-nested-components
              itemRender={(el, file) => (
                <div className="message-upload-card">
                  <div>
                    <Popconfirm
                      placement="topLeft"
                      trigger="click"
                      title={intl.formatMessage({
                        id: 'bRha+v',
                        defaultMessage: 'Remove the image?',
                      })}
                      onConfirm={() => removeImage(file.uid)}
                      okText={intl.formatMessage({
                        id: 'a5msuh',
                        defaultMessage: 'Yes',
                      })}
                      cancelText={intl.formatMessage({
                        id: 'oUWADl',
                        defaultMessage: 'No',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        style={{
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          zIndex: 100,
                        }}
                        shape="circle"
                        type="text"
                        icon={
                          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                        }
                      />
                    </Popconfirm>
                  </div>
                  <div style={{ height: 100, width: 100 }}>
                    <WatermarkImage url={file.url || file.thumbUrl} />
                  </div>
                </div>
              )}
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
                vehicle={vehicle}
                removeVehicle={removeVehicle}
                saving={saving}
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
              style={{ height: 40 }}
              value={inputStr}
              onKeyPress={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
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
              {membersData?.map(({ id, fullName, businesses }) => (
                <Option key={id} value={fullName.replace(' ', '_')}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  {fullName} ({businesses[0]?.name})
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
                {intl.formatMessage({
                  id: '9WRlF4',
                  defaultMessage: 'Send',
                })}
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
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                  alt="emoji picker"
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                />
              </Button>
            </Popover>
          </Col>

          <Col>
            <Upload
              customRequest={customRequest}
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
                onClick={toggleLinkOffender}
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
              >
                {intl.formatMessage({
                  defaultMessage: 'Offender',
                  id: 'AN7Aru',
                })}
              </Button>
            </div>
          </Col>
          {!restrictIncidentAccess && (
            <Col>
              <Button
                onClick={toggleLinkIncident}
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
              >
                {intl.formatMessage({
                  defaultMessage: 'Incident',
                  id: 'zaYxwd',
                })}
              </Button>
            </Col>
          )}

          <Col>
            <Button
              onClick={toggleLinkCrimeGroup}
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
            >
              {intl.formatMessage({
                defaultMessage: 'Crime Group',
                id: 'FY/YfT',
              })}
            </Button>
          </Col>

          <Col>
            <Button
              onClick={toggleLinkVehicle}
              disabled={
                saving ||
                (fileList && fileList.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (incidentsData && incidentsData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ||
                (articlesData && articlesData.length > 0)
              }
              icon={<FontAwesomeIcon className="button-icon" icon={faCar} />}
            >
              {intl.formatMessage({
                defaultMessage: 'Vehicle',
                id: '4T7son',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              onClick={toggleLinkArticle}
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
            >
              {intl.formatMessage({
                defaultMessage: 'Bulletins',
                id: 'tgD5sa',
              })}
            </Button>
          </Col>
        </Row>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Manage Chat Members',
          id: 'eVn+j4',
        })}
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
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
          id: 'UhSUQG',
        })}
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
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
          id: '1Vs3Qr',
        })}
        visible={linkIncident}
        width="1000"
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
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Crime Groups',
          id: 'nsggw+',
        })}
        visible={linkCrimeGroup}
        width="800"
        onClose={toggleLinkCrimeGroup}
      >
        {linkCrimeGroup ? (
          <LinkCrimeGroup
            update={updateCrimeGroupList}
            onClose={toggleLinkCrimeGroup}
            crimeGroupIds={crimeGroupsData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Vehicles',
          id: 'rmI5oX',
        })}
        visible={linkVehicle}
        width="800"
        onClose={toggleLinkVehicle}
        bodyStyle={{ overflow: 'hidden' }}
      >
        {linkVehicle ? (
          <LinkVehicle
            update={updateVehicleList}
            onClose={toggleLinkVehicle}
            vehicleIds={vehiclesData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Bulletins',
          id: '5KxsaV',
        })}
        visible={linkArticle}
        width="1000"
        onClose={toggleLinkArticle}
      >
        {linkArticle ? (
          <LinkArticle
            update={updateArticleList}
            onClose={toggleLinkArticle}
            articleIds={articlesData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewMessages;
