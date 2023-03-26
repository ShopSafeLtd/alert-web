import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picker from 'emoji-picker-react';

import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  FormInstance,
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
  faPeopleGroup,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Age,
  Build,
  ChatQuery,
  Gender,
  Race,
  ChatMessagesQuery,
  MessageItemType,
} from 'graphql/generated';
import { faCircleXmark, faUser } from '@fortawesome/pro-solid-svg-icons';
import AddUserChat from 'components/form-components/userChat/ManageChatMember';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import LinkOffender from 'components/form-components/incident/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { CrimeGroupData, IncidentsData, VehicleData } from 'types/DataType';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';

import {
  CrimeGroupMessageCard,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';
import Content from '../Message/Message.view';

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
interface MemberData {
  id: string;
  fullName: string;
  businesses: { id: string; name: string }[];
  firstLetter?: string | null;
}

interface Props {
  onSubmit: () => void;
  chatData: ChatQuery | undefined;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  data: ChatMessagesQuery | undefined;
  userId: string | undefined;
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
  offendersData: OffenderData[];
  incidentsData: IncidentsData;
  crimeGroupsData: CrimeGroupData[];
  vehiclesData: VehicleData[];
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  linkCrimeGroup: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleLinkCrimeGroup: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: string) => void;
  updateVehicleList: (value: VehicleData) => void;
  updateCrimeGroupList: (value: string) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
  messageSent: boolean;
  setMessageSent: (value: boolean) => void;
}

const ViewMessages = ({
  onSubmit,
  chatData,
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
      <InfiniteScroll
        dataLength={data?.chatMessages.length || 0}
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
          (incidentsData && incidentsData.length > 0) ||
          (vehiclesData && vehiclesData.length > 0) ||
          (crimeGroupsData && crimeGroupsData.length > 0)
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
                            Delete Message
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
              (crimeGroupsData && crimeGroupsData.length > 0)
                ? '110px'
                : '0',
            margin: 0,
            marginBottom: 5,
            overflowX: 'auto',
          }}
        >
          <Col style={{ marginLeft: 10, marginRight: -8 }}>
            <Upload
              action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
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
                      overlayInnerStyle={{ padding: 10 }}
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
              action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
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
                    (fileList && fileList.length > 0) ||
                    (vehiclesData && vehiclesData.length > 0) ||
                    (crimeGroupsData && crimeGroupsData.length > 0)
                  }
                  icon={
                    <FontAwesomeIcon className="button-icon" icon={faUsers} />
                  }
                >
                  Offender
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
                  (offendersData && offendersData.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0)
                }
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faExclamationCircle}
                  />
                }
              >
                Incident
              </Button>
            </Col>
          )}
          {adminRights && (
            <Col>
              <Button
                onClick={toggleLinkCrimeGroup}
                disabled={
                  saving ||
                  (fileList && fileList.length > 0) ||
                  (offendersData && offendersData.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (incidentsData && incidentsData.length > 0)
                }
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPeopleGroup}
                  />
                }
              >
                Crime Group
              </Button>
            </Col>
          )}
          {adminRights && (
            <Col>
              <Button
                onClick={toggleLinkVehicle}
                disabled={
                  saving ||
                  (fileList && fileList.length > 0) ||
                  (offendersData && offendersData.length > 0) ||
                  (incidentsData && incidentsData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0)
                }
                icon={<FontAwesomeIcon className="button-icon" icon={faCar} />}
              >
                Vehicle
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
        title="Link CrimeGroups"
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
        title="Link Vehicles"
        visible={linkVehicle}
        width="800"
        onClose={toggleLinkVehicle}
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
    </div>
  );
};

export default ViewMessages;
