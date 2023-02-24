import React from 'react';
import {
  faCircleXmark,
  faClose,
  faImage,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Form,
  FormInstance,
  Image,
  Mentions,
  Popconfirm,
  Popover,
  Row,
  Typography,
  Upload,
} from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import {
  Age,
  Build,
  Gender,
  ListIncidentsQuery,
  Race,
} from 'graphql/generated';
import moment from 'moment';
import Picker from 'emoji-picker-react';
import LinkOffender from 'components/form-components/incident/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/offender/LinkIncident';

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

interface SchemeUserData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}

interface Props {
  updateForm: FormInstance<FormData>;
  onSubmitUpdate: () => void;
  updateFileList: UploadFile[];
  onUpdateImageChange: UploadProps['onChange'];
  onUpdateImagePreview: (value: UploadFile) => void;
  beforeUpdateImageUpload: (value: RcFile) => void;
  removeUpdateImage: (uid: string) => void;
  updateOffenders: OffenderData[];
  removeUpdateOffender: (value: string | undefined) => void;
  updateIncidents:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents']
    | undefined;
  removeUpdateIncident: (value: string | undefined) => void;
  updateInput: string;
  setUpdateInput: (vaule: string) => void;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  schemeUsers: SchemeUserData[] | undefined;
  showUpdatePicker: boolean;
  toggleShowUpdatePicker: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleLinkUpdateIncident: () => void;
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
  updateIncidentList: (value: string) => void;
  updateOffendersList: (value: OffenderData) => void;
  linkIncident: boolean;
  linkOffender: boolean;
}

const UpdateBar = ({
  updateForm,
  onSubmitUpdate,
  updateFileList,
  onUpdateImageChange,
  onUpdateImagePreview,
  beforeUpdateImageUpload,
  removeUpdateImage,
  updateOffenders,
  removeUpdateOffender,
  updateIncidents,
  removeUpdateIncident,
  updateInput,
  setUpdateInput,
  setMentionedUser,
  schemeUsers,
  showUpdatePicker,
  toggleShowUpdatePicker,
  toggleLinkUpdateOffender,
  toggleLinkUpdateIncident,
  replyTo,
  setReplyTo,
  linkIncident,
  linkOffender,
  updateIncidentList,
  updateOffendersList,
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
            (updateIncidents && updateIncidents.length > 0)
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
            fileList={updateFileList}
            onChange={onUpdateImageChange}
            onPreview={onUpdateImagePreview}
            beforeUpload={beforeUpdateImageUpload}
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
                <Image
                  width={100}
                  height={100}
                  src={file.url || file.thumbUrl}
                />
              </div>
            )}
          />
        </Col>
        {updateOffenders?.map((offender) => (
          <Col key={offender.id}>
            <Card size="small" className="update-info-card">
              <Row gutter={5} wrap={false}>
                <Popconfirm
                  placement="topLeft"
                  trigger="click"
                  title="Remove the offender?"
                  onConfirm={() => removeUpdateOffender(offender.id)}
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
        {updateIncidents?.map((incident) => (
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
            {schemeUsers?.map(({ id, fullName, organisation }) => (
              <Option key={id} value={fullName}>
                {fullName} ({organisation})
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

      <Row gutter={5} style={{ height: '45px', margin: '0 10px 10px' }}>
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
            fileList={updateFileList}
            onChange={onUpdateImageChange}
            beforeUpload={beforeUpdateImageUpload}
            showUploadList={false}
          >
            <Button
              disabled={
                (updateIncidents && updateIncidents.length > 0) ||
                (updateOffenders && updateOffenders.length > 0) ||
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
                (updateIncidents && updateIncidents.length > 0) ||
                (updateFileList && updateFileList.length > 0)
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
        <Col>
          <Button
            onClick={toggleLinkUpdateIncident}
            disabled={
              (updateFileList && updateFileList.length > 0) ||
              (updateOffenders && updateOffenders.length > 0)
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
  </>
);

export default UpdateBar;
