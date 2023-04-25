import React from 'react';
import {
  faCircleXmark,
  faClose,
  faImage,
  faSmile,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FormInstance } from 'antd';
import {
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
import {
  CrimeGroupMessageCard,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from '../MessageCard';

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
}: Props) => (
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
    >
      {replyTo && (
        <div className="reply-to">
          <Row align="middle">
            <Col className="reply-to-highlight" />
            <Col style={{ marginRight: 5 }}>
              <Text type="secondary" ellipsis>
                Replying to: {replyTo.createdBy}
              </Text>
            </Col>
            <Col flex={1}>
              <Text type="secondary" ellipsis>
                - {replyTo.text}
              </Text>
            </Col>
            <Col>
              <Button size="small" type="text" onClick={() => setReplyTo(null)}>
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
            action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
            accept=".png,.jpeg,.webp"
            listType="picture-card"
            fileList={updateFileList}
            onChange={onUpdateImageChange}
            onPreview={onUpdateImagePreview}
            beforeUpload={beforeUpdateImageUpload}
            // TODO
            // eslint-disable-next-line react/no-unstable-nested-components
            itemRender={(el, file) => (
              <div className="update-upload-card">
                <div>
                  <Popconfirm
                    placement="topLeft"
                    trigger="click"
                    title="Remove the image?"
                    onConfirm={() => removeUpdateImage(file.uid)}
                    okText="Yes"
                    cancelText="No"
                    overlayInnerStyle={{ padding: 10 }}
                  >
                    <Button
                      size="small"
                      className="info-remove-button"
                      shape="circle"
                      type="text"
                      icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
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
        {/* {updateIncidents?.map((incident) => (
          <Col key={incident.id}>
            <Card size="small" className="update-info-card">
              <Row gutter={5} wrap={false}>
                <Popconfirm
                  placement="topLeft"
                  trigger="click"
                  title="Remove the incident?"
                  onConfirm={() => removeUpdateIncident(incident.id)}
                  okText="Yes"
                  cancelText="No"
                  overlayInnerStyle={{ padding: 10 }}
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
                  {incident?.images && incident.images.length > 0 && (
                    <div style={{ height: 100, width: 100 }}>
                      <WatermarkImage url={incident.images[0].optimised} />
                    </div>
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
        ))} */}
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
                {fullName} ({businesses[0]?.name})
              </Option>
            ))}
          </Mentions>
        </Col>

        <Col style={{ height: '40px' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Row
        wrap={false}
        gutter={5}
        style={{ height: '45px', margin: '0 10px 10px', overflow: 'auto' }}
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
              // icon={<FontAwesomeIcon icon={faFaceSmile} size="lg" />}
            >
              <FontAwesomeIcon size="lg" icon={faSmile} />
            </Button>
          </Popover>
        </Col>

        <Col>
          <Upload
            action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
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
          <div>
            <Button
              onClick={toggleLinkUpdateOffender}
              disabled={
                saving ||
                (updateIncidents && updateIncidents.length > 0) ||
                (updateFileList && updateFileList.length > 0) ||
                (vehiclesData && vehiclesData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0)
              }
              style={{ paddingLeft: 10, paddingRight: 10 }}
              // icon={<FontAwesomeIcon className="button-icon" icon={faPlus} />}
            >
              Offender
            </Button>
          </div>
        </Col>
        <Col>
          <Button
            onClick={toggleLinkUpdateIncident}
            disabled={
              saving ||
              (updateFileList && updateFileList.length > 0) ||
              (updateOffenders && updateOffenders.length > 0) ||
              (vehiclesData && vehiclesData.length > 0) ||
              (crimeGroupsData && crimeGroupsData.length > 0)
            }
            style={{ paddingLeft: 10, paddingRight: 10 }}
            // icon={<FontAwesomeIcon className="button-icon" icon={faPlus} />}
          >
            Incident
          </Button>
        </Col>
        <Col>
          <Button
            onClick={toggleLinkCrimeGroup}
            disabled={
              saving ||
              (updateFileList && updateFileList.length > 0) ||
              (updateOffenders && updateOffenders.length > 0) ||
              (vehiclesData && vehiclesData.length > 0) ||
              (updateIncidents && updateIncidents.length > 0)
            }
            style={{ paddingLeft: 10, paddingRight: 10 }}
            // icon={<FontAwesomeIcon className="button-icon" icon={faPlus} />}
          >
            Crime Group
          </Button>
        </Col>
        <Col>
          <Button
            onClick={toggleLinkVehicle}
            disabled={
              saving ||
              (updateFileList && updateFileList.length > 0) ||
              (updateOffenders && updateOffenders.length > 0) ||
              (updateIncidents && updateIncidents.length > 0) ||
              (crimeGroupsData && crimeGroupsData.length > 0)
            }
            style={{ paddingLeft: 10, paddingRight: 10 }}
            // icon={<FontAwesomeIcon className="button-icon" icon={faPlus} />}
          >
            Vehicle
          </Button>
        </Col>
      </Row>
    </Form>

    <Drawer
      title="Link Offenders"
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
      title="Link Incidents"
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
  </>
);

export default UpdateBar;
