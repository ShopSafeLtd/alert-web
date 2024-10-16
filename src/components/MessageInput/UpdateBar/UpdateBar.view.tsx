import type { FormInstance } from 'antd';
import type {
  RcFile,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload/interface';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  OffenderData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';

import {
  faCar,
  faCircleXmark,
  faClose,
  faExclamationCircle,
  faImage,
  faNewspaper,
  faPeopleGroup,
  faSmile,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Form,
  Mentions,
  Menu,
  Popconfirm,
  Popover,
  Row,
  Typography,
  Upload,
} from 'antd';
import LinkArticle from 'components/form-components/linkOptions/LinkArticle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import LinkOffender from 'components/form-components/offender/AddExistingOffender';
import WatermarkImage from 'components/images/WatermarkImage.view';
import Picker from 'emoji-picker-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import customRequest from '../../../utils/custom-request';
import {
  ArticleMessageCard,
  CrimeGroupMessageCard,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from '../MessageCard';
import useStyles from './UpdatedBar.styles';

const { Option, getMentions } = Mentions;
const { Text } = Typography;

interface Props {
  adminRights: boolean;
  articlesData: ArticleData[];
  beforeUpdateImageUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  handleMarkAsRead: () => void;
  hideIncident: boolean;
  linkArticle: boolean;
  linkCrimeGroup: boolean;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  onSubmitUpdate: () => void;
  onUpdateImageChange: UploadProps['onChange'];
  onUpdateImagePreview: (value: UploadFile) => void;
  removeArticle: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeUpdateImage: (uid: string) => void;
  removeUpdateIncident: (value: string | undefined) => void;
  removeUpdateOffender: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  schemeUsers: Map<string, SchemeUserData> | undefined;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  setUpdateInput: (value: string) => void;
  showUpdatePicker: boolean;
  toggleLinkArticle: () => void;
  toggleLinkCrimeGroup: () => void;
  toggleLinkUpdateIncident: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleShowUpdatePicker: () => void;
  updateArticleList: (value: ArticleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  updateFileList: UploadFile[];
  updateForm: FormInstance<FormData>;
  updateIncidentList: (value: IncidentCardData) => void;
  updateIncidents: IncidentCardData[];
  updateInput: string;
  updateOffenders: OffenderData[];
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
}

const UpdateBar = ({
  adminRights,
  articlesData,
  beforeUpdateImageUpload,
  crimeGroupsData,
  handleMarkAsRead,
  hideIncident,
  linkArticle,
  linkCrimeGroup,
  linkIncident,
  linkOffender,
  linkVehicle,
  onSubmitUpdate,
  onUpdateImageChange,
  onUpdateImagePreview,
  removeArticle,
  removeCrimeGroup,
  removeUpdateImage,
  removeUpdateIncident,
  removeUpdateOffender,
  removeVehicle,
  replyTo,
  saving,
  schemeUsers,
  setMentionedUser,
  setReplyTo,
  setUpdateInput,
  showUpdatePicker,
  toggleLinkArticle,
  toggleLinkCrimeGroup,
  toggleLinkUpdateIncident,
  toggleLinkUpdateOffender,
  toggleLinkVehicle,
  toggleShowUpdatePicker,
  updateArticleList,
  updateCrimeGroupList,
  updateFileList,
  updateForm,
  updateIncidentList,
  updateIncidents,
  updateInput,
  updateOffenders,
  updateOffendersList,
  updateVehicleList,
  vehiclesData,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <>
      <Form
        className="update-bar"
        form={updateForm}
        onFinish={onSubmitUpdate}
        onFocus={() => {
          handleMarkAsRead();
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            updateForm.submit();
          }
        }}
        onMouseOver={() => {
          console.log('moused over');
        }}
        style={{}}
      >
        {replyTo && (
          <div className="reply-to">
            <Row align="middle">
              <Col className="reply-to-highlight" />
              <Col style={{ marginRight: 5 }}>
                <Text ellipsis type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Replying to: {createdBy}',
                    },
                    { createdBy: replyTo.createdBy }
                  )}
                </Text>
              </Col>
              <Col flex={1}>
                <Text ellipsis type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: '- {text}' },
                    { text: replyTo.text }
                  )}
                </Text>
              </Col>
              <Col>
                <Button
                  onClick={() => setReplyTo(null)}
                  size="small"
                  type="text"
                >
                  <FontAwesomeIcon icon={faClose} size="lg" />
                </Button>
              </Col>
            </Row>
          </div>
        )}
        <Row
          className="update-info-container"
          gutter={10}
          style={{
            height:
              (updateFileList && updateFileList.length > 0) ||
              (updateOffenders && updateOffenders.length > 0) ||
              (updateIncidents && updateIncidents.length > 0) ||
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
              beforeUpload={beforeUpdateImageUpload}
              customRequest={customRequest}
              fileList={updateFileList}
              // eslint-disable-next-line react/no-unstable-nested-components
              itemRender={(el, file) => (
                <div className="update-upload-card">
                  <div>
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => removeUpdateImage(file.uid)}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the image?',
                      })}
                      trigger="click"
                    >
                      <Button
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
              onChange={onUpdateImageChange}
              onPreview={onUpdateImagePreview}
            />
          </Col>

          {updateOffenders?.map((offender) => (
            <Col key={offender.id}>
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
                setUpdateInput(value);
                const mentions = getMentions(value);
                setMentionedUser(
                  mentions
                    .map((mention) => schemeUsers?.get(mention.value))
                    .map((item) => ({
                      id: item?.id || '',
                      value: item?.fullName || '',
                    }))
                    .filter((item) => item.value !== '')
                );
              }}
              prefix="@"
              style={{ height: 40 }}
              value={updateInput}
            >
              {schemeUsers &&
                [...schemeUsers.values()]?.map(
                  ({ businessesName, fullName, id }) => (
                    <Option key={id} value={fullName}>
                      {intl.formatMessage(
                        {
                          defaultMessage: '{fullName} ({businessName})',
                        },
                        {
                          businessName: businessesName,
                          fullName,
                        }
                      )}
                    </Option>
                  )
                )}
            </Mentions>
          </Col>

          <Col style={{ height: '40px' }}>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage defaultMessage="Send" />
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={5}
          style={{ height: '45px', margin: '0 10px', overflow: 'auto' }}
          wrap={false}
        >
          <Col>
            <Popover
              content={
                <Picker
                  onEmojiClick={(_e, emojiObject) => {
                    setUpdateInput(updateInput + emojiObject.emoji);
                    toggleShowUpdatePicker();
                  }}
                  pickerStyle={{ width: '100%' }}
                />
              }
              open={showUpdatePicker}
              overlayStyle={{ width: '50%' }}
              placement="topLeft"
              trigger="click"
            >
              <Button
                onClick={toggleShowUpdatePicker}
                style={{ padding: 0, width: '40px' }}
              >
                <FontAwesomeIcon icon={faSmile} size="lg" />
              </Button>
            </Popover>
          </Col>

          <Col>
            <Upload
              accept=".png,.jpeg,.webp"
              action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
              beforeUpload={beforeUpdateImageUpload}
              fileList={updateFileList}
              onChange={onUpdateImageChange}
              showUploadList={false}
            >
              <Button
                disabled={
                  saving ||
                  (updateIncidents && updateIncidents.length > 0) ||
                  (updateOffenders && updateOffenders.length > 0) ||
                  (vehiclesData && vehiclesData.length > 0) ||
                  (crimeGroupsData && crimeGroupsData.length > 0) ||
                  (articlesData && articlesData.length > 0) ||
                  (updateFileList && updateFileList.length > 3)
                }
                icon={<FontAwesomeIcon icon={faImage} size="lg" />}
              />
            </Upload>
          </Col>
          {adminRights && (
            <Col>
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        disabled:
                          saving ||
                          (updateFileList && updateFileList.length > 0) ||
                          (updateOffenders && updateOffenders.length > 0) ||
                          (vehiclesData && vehiclesData.length > 0) ||
                          (articlesData && articlesData.length > 0) ||
                          (crimeGroupsData && crimeGroupsData.length > 0) ||
                          (articlesData && articlesData.length > 0),
                        icon: (
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faExclamationCircle}
                          />
                        ),
                        key: '1',
                        label: intl.formatMessage({
                          defaultMessage: 'Link Incidents',
                        }),
                        onClick: () => toggleLinkUpdateIncident(),
                      },
                      {
                        disabled:
                          saving ||
                          (updateIncidents && updateIncidents.length > 0) ||
                          (updateFileList && updateFileList.length > 0) ||
                          (vehiclesData && vehiclesData.length > 0) ||
                          (crimeGroupsData && crimeGroupsData.length > 0) ||
                          (articlesData && articlesData.length > 0),
                        icon: (
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faUsers}
                          />
                        ),
                        key: '2',
                        label: intl.formatMessage({
                          defaultMessage: 'Link Offenders',
                        }),
                        onClick: () => toggleLinkUpdateOffender(),
                      },

                      {
                        disabled:
                          saving ||
                          (updateFileList && updateFileList.length > 0) ||
                          (updateOffenders && updateOffenders.length > 0) ||
                          (updateIncidents && updateIncidents.length > 0) ||
                          (crimeGroupsData && crimeGroupsData.length > 0) ||
                          (articlesData && articlesData.length > 0),
                        icon: (
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faCar}
                          />
                        ),
                        key: '3',
                        label: intl.formatMessage({
                          defaultMessage: 'Link Vehicles',
                        }),
                        onClick: () => toggleLinkVehicle(),
                      },
                      {
                        disabled:
                          saving ||
                          (updateFileList && updateFileList.length > 0) ||
                          (updateOffenders && updateOffenders.length > 0) ||
                          (vehiclesData && vehiclesData.length > 0) ||
                          (articlesData && articlesData.length > 0) ||
                          (updateIncidents && updateIncidents.length > 0),
                        icon: (
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faPeopleGroup}
                          />
                        ),
                        key: '4',
                        label: intl.formatMessage({
                          defaultMessage: 'Link Crime Groups',
                        }),
                        onClick: () => toggleLinkCrimeGroup(),
                      },

                      {
                        disabled:
                          saving ||
                          (updateFileList && updateFileList.length > 0) ||
                          (updateOffenders && updateOffenders.length > 0) ||
                          (vehiclesData && vehiclesData.length > 0) ||
                          (updateIncidents && updateIncidents.length > 0),
                        icon: (
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faNewspaper}
                          />
                        ),
                        key: '5',
                        label: intl.formatMessage({
                          defaultMessage: 'Link Bulletins',
                        }),
                        onClick: () => toggleLinkArticle(),
                      },
                    ].filter((item) => !(item.key === '1' && hideIncident))}
                  />
                }
              >
                <Button>
                  <FormattedMessage defaultMessage="Link" />
                </Button>
              </Dropdown>
            </Col>
          )}
        </Row>
      </Form>

      <Drawer
        onClose={toggleLinkUpdateOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={updateOffenders.map(({ id }) => id)}
            onClose={toggleLinkUpdateOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkUpdateIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
        })}
        width="1000"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={updateIncidents?.map(({ id }) => id)}
            onClose={toggleLinkUpdateIncident}
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
          defaultMessage: 'Link CrimeGroups',
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
    </>
  );
};

export default UpdateBar;
