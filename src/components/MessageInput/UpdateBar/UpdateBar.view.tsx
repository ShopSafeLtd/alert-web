import React from 'react';
import {
  faCar,
  faCircleXmark,
  faClose,
  faExclamationCircle,
  faImage,
  faPeopleGroup,
  faSmile,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FormInstance } from 'antd';
import {
  Dropdown,
  Menu,
  Button,
  Col,
  Drawer,
  Form,
  Mentions,
  Popconfirm,
  Popover,
  Row,
  Typography,
  Upload,
} from 'antd';
import type {
  RcFile,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload/interface';
import Picker from 'emoji-picker-react';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type {
  CrimeGroupData,
  IncidentCardData,
  OffenderData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  CrimeGroupMessageCard,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from '../MessageCard';
import customRequest from '../../../utils/custom-request';

const { Option, getMentions } = Mentions;
const { Text } = Typography;

interface Props {
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  beforeUpdateImageUpload: (value: RcFile) => void;
  onSubmitUpdate: () => void;
  onUpdateImageChange: UploadProps['onChange'];
  onUpdateImagePreview: (value: UploadFile) => void;
  removeUpdateImage: (uid: string) => void;
  removeUpdateIncident: (value: string | undefined) => void;
  removeUpdateOffender: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  schemeUsers: SchemeUserData[] | undefined;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setUpdateInput: (value: string) => void;
  showUpdatePicker: boolean;
  toggleLinkUpdateIncident: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleShowUpdatePicker: () => void;
  toggleLinkVehicle: () => void;
  toggleLinkCrimeGroup: () => void;
  updateFileList: UploadFile[];
  updateForm: FormInstance<FormData>;
  updateIncidents: IncidentCardData[];
  updateInput: string;
  updateIncidentList: (value: IncidentCardData) => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  linkCrimeGroup: boolean;
  updateOffenders: OffenderData[];
  crimeGroupsData: CrimeGroupData[];
  vehiclesData: VehicleData[];
  saving: boolean;
  handleMarkAsRead: () => void;
  hideIncident: boolean;
}

const UpdateBar = ({
  replyTo,
  setReplyTo,
  beforeUpdateImageUpload,
  onSubmitUpdate,
  onUpdateImageChange,
  onUpdateImagePreview,
  removeUpdateImage,
  removeUpdateIncident,
  removeUpdateOffender,
  removeCrimeGroup,
  removeVehicle,
  schemeUsers,
  setMentionedUser,
  setUpdateInput,
  showUpdatePicker,
  toggleLinkUpdateIncident,
  toggleLinkUpdateOffender,
  toggleShowUpdatePicker,
  toggleLinkVehicle,
  toggleLinkCrimeGroup,
  updateFileList,
  updateForm,
  updateIncidents,
  updateInput,
  updateIncidentList,
  updateOffendersList,
  updateVehicleList,
  updateCrimeGroupList,
  linkIncident,
  linkOffender,
  linkVehicle,
  linkCrimeGroup,
  updateOffenders,
  crimeGroupsData,
  vehiclesData,
  saving,
  handleMarkAsRead,
  hideIncident,
}: Props) => {
  const intl = useIntl();
  return (
    <>
      <Form
        form={updateForm}
        onFinish={onSubmitUpdate}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            updateForm.submit();
          }
        }}
        className="update-bar"
        style={{}}
        onFocus={() => handleMarkAsRead()}
      >
        {replyTo && (
          <div className="reply-to">
            <Row align="middle">
              <Col className="reply-to-highlight" />
              <Col style={{ marginRight: 5 }}>
                <Text type="secondary" ellipsis>
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Replying to: {createdBy}',
                      id: 'wrBzdH',
                    },
                    { createdBy: replyTo.createdBy }
                  )}
                </Text>
              </Col>
              <Col flex={1}>
                <Text type="secondary" ellipsis>
                  {intl.formatMessage(
                    { defaultMessage: '- {text}', id: 'HyaDMq' },
                    { text: replyTo.text }
                  )}
                </Text>
              </Col>
              <Col>
                <Button
                  size="small"
                  type="text"
                  onClick={() => setReplyTo(null)}
                >
                  <FontAwesomeIcon size="lg" icon={faClose} />
                </Button>
              </Col>
            </Row>
          </div>
        )}
        <Row
          wrap={false}
          gutter={10}
          className="update-info-container"
          style={{
            height:
              (updateFileList && updateFileList.length > 0) ||
              (updateOffenders && updateOffenders.length > 0) ||
              (updateIncidents && updateIncidents.length > 0) ||
              (vehiclesData && vehiclesData.length > 0) ||
              (crimeGroupsData && crimeGroupsData.length > 0)
                ? '120px'
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
              fileList={updateFileList}
              onChange={onUpdateImageChange}
              onPreview={onUpdateImagePreview}
              beforeUpload={beforeUpdateImageUpload}
              // eslint-disable-next-line react/no-unstable-nested-components
              itemRender={(el, file) => (
                <div className="update-upload-card">
                  <div>
                    <Popconfirm
                      placement="topLeft"
                      trigger="click"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the image?',
                        id: 'bRha+v',
                      })}
                      onConfirm={() => removeUpdateImage(file.uid)}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
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
                  <div style={{ height: 100, width: 100 }}>
                    <WatermarkImage url={file.url || file.thumbUrl} />
                  </div>
                </div>
              )}
            />
          </Col>

          {updateOffenders?.map((offender) => (
            <Col key={offender.id} style={{ width: 370 }}>
              <OffenderMessageCard
                offender={offender}
                removeOffender={removeUpdateOffender}
                saving={saving}
              />
            </Col>
          ))}
          {updateIncidents?.map((incident) => (
            <Col key={incident.id}>
              <IncidentMessageCard
                incident={incident}
                removeIncident={removeUpdateIncident}
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
              value={updateInput}
              onChange={(value) => {
                setUpdateInput(value);
                const mentions = getMentions(value);
                setMentionedUser(
                  mentions
                    .map((mention) =>
                      schemeUsers?.find(
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
              {schemeUsers?.map(({ id, fullName, businesses }) => (
                <Option key={id} value={fullName}>
                  {intl.formatMessage(
                    {
                      id: 'hK8+eV',
                      defaultMessage: '{fullName} ({businessName})',
                    },
                    {
                      fullName,
                      businessName: businesses[0]?.name,
                    }
                  )}
                </Option>
              ))}
            </Mentions>
          </Col>

          <Col style={{ height: '40px' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="9WRlF4" defaultMessage="Send" />
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row
          wrap={false}
          gutter={5}
          style={{ height: '45px', margin: '0 10px', overflow: 'auto' }}
        >
          <Col>
            <Popover
              placement="topLeft"
              trigger="click"
              visible={showUpdatePicker}
              overlayStyle={{ width: '50%' }}
              content={
                <Picker
                  pickerStyle={{ width: '100%' }}
                  onEmojiClick={(_e, emojiObject) => {
                    setUpdateInput(updateInput + emojiObject.emoji);
                    toggleShowUpdatePicker();
                  }}
                />
              }
            >
              <Button
                onClick={toggleShowUpdatePicker}
                style={{ width: '40px', padding: 0 }}
              >
                <FontAwesomeIcon size="lg" icon={faSmile} />
              </Button>
            </Popover>
          </Col>

          <Col>
            <Upload
              action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT_GO}
              accept=".png,.jpeg,.webp"
              fileList={updateFileList}
              onChange={onUpdateImageChange}
              beforeUpload={beforeUpdateImageUpload}
              showUploadList={false}
            >
              <Button
                disabled={
                  saving ||
                  (updateIncidents && updateIncidents.length > 0) ||
                  (updateOffenders && updateOffenders.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0) ||
                  (updateFileList && updateFileList.length > 3)
                }
                icon={<FontAwesomeIcon icon={faImage} size="lg" />}
              />
            </Upload>
          </Col>
          <Col>
            <Dropdown
              overlay={
                <Menu
                  items={
                    hideIncident
                      ? [
                          {
                            label: intl.formatMessage({
                              id: 'UhSUQG',
                              defaultMessage: 'Link Offenders',
                            }),
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faUsers}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateIncidents && updateIncidents.length > 0) ||
                              (updateFileList && updateFileList.length > 0) ||
                              (vehiclesData && vehiclesData.length > 0) ||
                              (crimeGroupsData && crimeGroupsData.length > 0),
                            onClick: () => toggleLinkUpdateOffender(),
                          },
                          {
                            label: intl.formatMessage({
                              id: 'rmI5oX',
                              defaultMessage: 'Link Vehicles',
                            }),
                            key: '3',
                            icon: (
                              <FontAwesomeIcon
                                icon={faCar}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateFileList && updateFileList.length > 0) ||
                              (updateOffenders && updateOffenders.length > 0) ||
                              (updateIncidents && updateIncidents.length > 0) ||
                              (crimeGroupsData && crimeGroupsData.length > 0),
                            onClick: () => toggleLinkVehicle(),
                          },
                          {
                            label: intl.formatMessage({
                              id: 'nsggw+',
                              defaultMessage: 'Link Crime Groups',
                            }),
                            key: '4',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPeopleGroup}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateFileList && updateFileList.length > 0) ||
                              (updateOffenders && updateOffenders.length > 0) ||
                              (vehiclesData && vehiclesData.length > 0) ||
                              (updateIncidents && updateIncidents.length > 0),
                            onClick: () => toggleLinkCrimeGroup(),
                          },
                        ]
                      : [
                          {
                            label: intl.formatMessage({
                              id: 'UhSUQG',
                              defaultMessage: 'Link Offenders',
                            }),
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faUsers}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateIncidents && updateIncidents.length > 0) ||
                              (updateFileList && updateFileList.length > 0) ||
                              (vehiclesData && vehiclesData.length > 0) ||
                              (crimeGroupsData && crimeGroupsData.length > 0),
                            onClick: () => toggleLinkUpdateOffender(),
                          },
                          {
                            label: intl.formatMessage({
                              id: '1Vs3Qr',
                              defaultMessage: 'Link Incidents',
                            }),
                            key: '2',
                            icon: (
                              <FontAwesomeIcon
                                icon={faExclamationCircle}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateFileList && updateFileList.length > 0) ||
                              (updateOffenders && updateOffenders.length > 0) ||
                              (vehiclesData && vehiclesData.length > 0) ||
                              (crimeGroupsData && crimeGroupsData.length > 0),
                            onClick: () => toggleLinkUpdateIncident(),
                          },
                          {
                            label: intl.formatMessage({
                              id: 'rmI5oX',
                              defaultMessage: 'Link Vehicles',
                            }),
                            key: '3',
                            icon: (
                              <FontAwesomeIcon
                                icon={faCar}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateFileList && updateFileList.length > 0) ||
                              (updateOffenders && updateOffenders.length > 0) ||
                              (updateIncidents && updateIncidents.length > 0) ||
                              (crimeGroupsData && crimeGroupsData.length > 0),
                            onClick: () => toggleLinkVehicle(),
                          },
                          {
                            label: intl.formatMessage({
                              id: 'nsggw+',
                              defaultMessage: 'Link Crime Groups',
                            }),
                            key: '4',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPeopleGroup}
                                style={{ marginRight: 10 }}
                              />
                            ),
                            disabled:
                              saving ||
                              (updateFileList && updateFileList.length > 0) ||
                              (updateOffenders && updateOffenders.length > 0) ||
                              (vehiclesData && vehiclesData.length > 0) ||
                              (updateIncidents && updateIncidents.length > 0),
                            onClick: () => toggleLinkCrimeGroup(),
                          },
                        ]
                  }
                />
              }
            >
              <Button>
                <FormattedMessage id="JBWS0c" defaultMessage="Link" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
          id: 'UhSUQG',
        })}
        visible={linkOffender}
        width="800"
        onClose={toggleLinkUpdateOffender}
      >
        {linkOffender ? (
          <LinkOffender
            update={updateOffendersList}
            onClose={toggleLinkUpdateOffender}
            offenderIds={updateOffenders.map(({ id }) => id)}
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
        onClose={toggleLinkUpdateIncident}
      >
        {linkIncident ? (
          <LinkIncident
            update={updateIncidentList}
            onClose={toggleLinkUpdateIncident}
            incidentIds={updateIncidents?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link CrimeGroups',
          id: 'S+q256',
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
    </>
  );
};

export default UpdateBar;
