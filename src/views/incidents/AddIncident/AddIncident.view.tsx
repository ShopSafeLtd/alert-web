import React from 'react';
import {
  Age,
  Gender,
  Race,
  Build,
  CreateTagMutation,
  AddressesQuery,
  ListOffendersQuery,
} from 'graphql/generated';

import {
  Card,
  Typography,
  Button,
  Form,
  FormInstance,
  Input,
  Select,
  Row,
  Col,
  Upload,
  PageHeader,
  Drawer,
  DatePicker,
  // TimePicker,
  Table,
  Skeleton,
  Modal,
  Divider,
  Tooltip,
  Descriptions,
  Spin,
  Popconfirm,
} from 'antd';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  calcAge,
} from 'utils/offender/get-offender-desc';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { MutationUpdaterFn } from '@apollo/client';

import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddCrimeType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faUpload,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';

import moment, { Moment } from 'moment';
import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import AddOffender from 'components/form-components/incident/offender/AddOffender';
import AddExistingOffender from 'components/form-components/incident/offender/AddExisitingOffender';
import AddNewLocation from 'components/form-components/incident/location/AddLocation';
import AddPreviousLocation from 'components/form-components/incident/location/AddPreviousLocation';
import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';

const { Title, Paragraph, Text } = Typography;

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface FormData {
  subject: string;
  description: string;
  date: Date;
  time: Moment;
  fullAddress: string;
  groups: string[];
  tags: string[];
  images: { id: string; url: string; optimised: string }[];
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}

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
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}
interface LocationData {
  building?: string | null;
  street: string;
  townCity: string;
  county?: string | null;
  postcode: string;
}
interface Props {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  addressLoading: boolean;
  imgChange: UploadProps['onChange'];
  onPreview: (value: Image) => void;
  fileList: Image[];
  beforeUpload: (value: RcFile) => void;
  addIncidentTag: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: OffenderData[] | undefined) => void;
  offendersData: OffenderData[] | undefined;
  addPreviousLocation: boolean;
  toggleAddPreviousLocation: () => void;
  updatePreviousLocation: (value: string | undefined) => void;
  addNewLocation: boolean;
  toggleAddNewLocation: () => void;
  updateNewLocation: (value: LocationData | undefined) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  addRecentOffender: Offender | null;
  setAddRecentOffender: (value: Offender | null) => void;
  searchOffenders: string;
  setSearchOffenders: (value: string) => void;
  newImage: Image | null;
  onCancelNewImage: () => void;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  setAssignToImage: (image: Image) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeImage: (uid: string) => void;
  removeOffender: (offenderId: string) => void;
}

const EditIncident = ({
  onSubmit,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  primaryAddress,
  // addressData,
  addressLoading,
  imgChange,
  onPreview,
  fileList,
  beforeUpload,
  addIncidentTag,
  toggleAddIncidentTag,
  updateIncidentTag,
  addOffender,
  toggleAddOffender,
  addExistingOffender,
  toggleAddExistingOffender,
  updateOffenderList,
  offendersData,
  addPreviousLocation,
  toggleAddPreviousLocation,
  updatePreviousLocation,
  addNewLocation,
  toggleAddNewLocation,
  updateNewLocation,
  form,
  recentOffenderData,
  recentOffenderLoading,
  addRecentOffender,
  setAddRecentOffender,
  searchOffenders,
  setSearchOffenders,
  newImage,
  onCancelNewImage,
  assignOffendersToImages,
  setAssignToImage,
  removeImageFromOffender,
  removeImage,
  removeOffender,
}: Props): JSX.Element => (
  <div className="page-view">
    <PageHeader onBack={() => window.history.back()} title="Add Incident" />

    <Card>
      <Form<FormData>
        form={form}
        initialValues={{
          fullAddress: primaryAddress?.full || '',
          date: moment(),
        }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <div>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                1.{' '}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Incident Details
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Please complete the basic details for the incident.
              </Paragraph>
            </Col>
          </Row>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="subject"
              label="Subject"
              tooltip='A short caption for the incident that briefly explains what it is about, for example "Theft of earphones".'
              rules={[
                {
                  required: true,
                  message: 'Please enter a subject for the incident.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col>
            <Row>
              <Form.Item
                name="date"
                label="Time &amp; Date"
                tooltip="The date and time that the incident occurred."
                rules={[
                  {
                    required: true,
                    message: 'Please select a date for the incident.',
                  },
                ]}
              >
                <DatePicker
                  disabled={saving}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now() - 3600 * 1000 * 24
                  }
                  format="HH:mm - DD/MM/YY"
                  showTime={{ showSecond: false, showNow: true }}
                  placeholder="Set Date &amp; Time"
                />
              </Form.Item>
              {/* <Col span={12}>
                <Form.Item
                  name="time"
                  label="Time"
                  rules={[
                    {
                      required: true,
                      message:
                        'Please select a start date for the new exclusion.',
                    },
                  ]}
                >
                  <TimePicker />
                </Form.Item>
              </Col> */}
            </Row>
          </Col>
          <Col span={8}>
            <Form.Item
              name="tags"
              label="Crime Types"
              tooltip="Select the relevant crime types for this incident, these help to categorise the incident,"
              rules={[
                {
                  required: true,
                  message: 'Please add at least one crime type.',
                },
              ]}
            >
              <Select
                loading={tagsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
              >
                {tags.map((tag) => (
                  <Select.Option value={tag.value}>{tag.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* <Col span={11}>
                <Button
                  disabled={saving}
                  loading={saving}
                  style={{ color: 'red', padding: 8 }}
                  onClick={toggleAddIncidentTag}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                >
                  Add Crime Type
                </Button>
              </Col> */}
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              tooltip="A more detailed description of the incident."
              rules={[
                {
                  required: true,
                  message: 'Please enter a description for the incident.',
                },
              ]}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          {addressLoading ? (
            <Skeleton />
          ) : (
            <Col
              // flex={1}
              span={11}
            >
              <Form.Item
                name="fullAddress"
                label="Location"
                tooltip="The location of the incident, you default location is pre-populated but you can select from previous locations or add a new one."
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message:
                      'Please select or add a new location for the incident.',
                  },
                ]}
              >
                <Input disabled={saving} readOnly bordered={false} />
              </Form.Item>
              <Row gutter={8}>
                <Col>
                  <Button
                    disabled={saving}
                    size="small"
                    loading={saving}
                    onClick={toggleAddPreviousLocation}
                    style={{ color: 'red' }}
                    icon={
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Use Previous Locations
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    loading={saving}
                    size="small"
                    onClick={toggleAddNewLocation}
                    style={{ color: 'red' }}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Add New Location
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
          {groups.length > 1 && (
            <Col span={11}>
              <Form.Item
                name="groups"
                label="Groups"
                tooltip="Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups."
                rules={[
                  {
                    required: true,
                    message:
                      'Please add at least one group that you would like this incident to be visible to.',
                  },
                ]}
              >
                <Select
                  loading={groupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder="Select the groups that you would like this incident to be visible to."
                >
                  {groups.map((group) => (
                    <Select.Option key={group.value} value={group.value}>
                      {group.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>

        <Divider />
        <Row gutter={5} style={{ marginTop: 20 }}>
          <Col flex={1}>
            <Row align="bottom" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  2.{' '}
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  Offenders
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  - Please add the offenders that were involved in the incident.
                </Paragraph>
              </Col>
            </Row>
          </Col>
          {offendersData && offendersData.length > 0 && (
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={toggleAddExistingOffender}
                style={{ color: 'red' }}
                icon={
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ marginRight: 5 }}
                  />
                }
              >
                Add Existing Offenders
              </Button>
            </Col>
          )}
          {offendersData && offendersData.length > 0 && (
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={toggleAddOffender}
                style={{ color: 'red' }}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Create New Offender
              </Button>
            </Col>
          )}
        </Row>

        <Row gutter={20} style={{ marginTop: 10 }}>
          <Col flex={1}>
            {offendersData && offendersData.length > 0 ? (
              <Table
                size="small"
                pagination={{
                  defaultPageSize: 20,
                  pageSize: 20,
                }}
                columns={[
                  {
                    key: 'images',
                    title: '',
                    dataIndex: 'images',
                    render: (images?: { id: string; optimised: string }[]) => {
                      if (images) {
                        return (
                          <img
                            style={{ width: 80 }}
                            key={images[0]?.id || ''}
                            src={images[0]?.optimised || ''}
                            alt={images[0]?.optimised}
                          />
                        );
                      }
                      return (
                        <Upload
                          action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                          fileList={fileList}
                          onChange={imgChange}
                          beforeUpload={beforeUpload}
                          accept=".png,.jpeg,.webp"
                          showUploadList={false}
                          // onDownload={() =>
                          //   confirm({
                          //     title: 'Assign Offenders',
                          //     content:
                          //       'Do you Want to assign this image to any offenders shown in them?',
                          //     okText: 'Yes',
                          //     onOk() {
                          //       toggleAssignImage();
                          //     },
                          //   })
                          // }
                          // itemRender={(file) => <Button>{file.key}</Button>}
                        >
                          <Button
                            icon={
                              <FontAwesomeIcon
                                icon={faUpload}
                                style={{ marginRight: 5 }}
                              />
                            }
                            style={{ color: 'red' }}
                          >
                            Upload Image
                          </Button>
                        </Upload>
                      );
                    },
                  },
                  {
                    key: 'name',
                    title: 'Name',
                    dataIndex: 'name',
                  },
                  {
                    key: 'age',
                    title: 'Age',
                    dataIndex: 'age',
                  },
                  {
                    key: 'build',
                    title: 'Build',
                    dataIndex: 'build',
                  },
                  {
                    key: 'gender',
                    title: 'Sex',
                    dataIndex: 'gender',
                  },
                  {
                    key: 'race',
                    title: 'Ethnicity',
                    dataIndex: 'race',
                  },

                  {
                    key: 'delete',
                    title: 'Delete',
                    dataIndex: 'delete',
                    width: 100,
                    render: (_, record) => (
                      <Popconfirm
                        placement="topLeft"
                        title="Remove the offender?"
                        onConfirm={() => removeOffender(record.key)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button disabled={saving} icon={<DeleteOutlined />} />
                      </Popconfirm>
                    ),
                  },
                ]}
                dataSource={offendersData.map((offender) => ({
                  key: offender.id,
                  name: offender.name,
                  age: offender?.dateOfBirth
                    ? calcAge(offender?.dateOfBirth)
                    : getOffenderAge(offender?.age),
                  gender: getOffenderGender(offender.gender),
                  build: getOffenderBuild(offender.build),
                  race: getOffenderRace(offender.race),
                  images: offender.images,
                }))}
              />
            ) : (
              <div>
                <Row gutter={8} style={{ marginBottom: 15 }}>
                  <Col>
                    <Input
                      style={{ width: 400 }}
                      placeholder="Search all existing offenders... "
                      value={searchOffenders}
                      onChange={(e) => setSearchOffenders(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button
                      disabled={saving}
                      loading={saving}
                      onClick={toggleAddOffender}
                      style={{ color: 'red' }}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Create New Offender
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      disabled={saving}
                      loading={saving}
                      onClick={toggleAddExistingOffender}
                      style={{ color: 'red' }}
                      icon={
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Add Existing Offenders
                    </Button>
                  </Col>
                </Row>
                {searchOffenders.length === 0 && (
                  <Paragraph
                    style={{ fontSize: 14, fontWeight: 500 }}
                    type="secondary"
                  >
                    Add Recently Active Offenders
                  </Paragraph>
                )}
                {recentOffenderLoading ? (
                  <Row gutter={8}>
                    {[1, 2, 3, 4].map((key) => (
                      <Col key={key}>
                        <Skeleton.Avatar
                          active
                          shape="square"
                          style={{
                            height: 120,
                            width: 120,
                            borderRadius: '0.625rem',
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Row
                    gutter={8}
                    style={{ overflow: 'auto', flexWrap: 'nowrap' }}
                  >
                    {recentOffenderData?.listOffenders?.offenders.map(
                      (offender) => (
                        <Col key={offender.id}>
                          <Tooltip
                            placement="bottom"
                            title={`Add ${offender.name} to incident`}
                          >
                            <Card
                              onClick={() => setAddRecentOffender(offender)}
                              bodyStyle={{
                                width: 120,
                                height: 120,
                                position: 'relative',
                                backgroundImage: `url(${offender.images[0]?.optimised})`,
                                backgroundSize: 'cover',
                                padding: 0,
                                borderRadius: '0.625rem',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              {offender.images.length === 0 && (
                                <FontAwesomeIcon
                                  style={{ color: 'rgb(114, 132, 154)' }}
                                  icon={faUser}
                                  size="3x"
                                />
                              )}
                              <Paragraph
                                style={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  background: 'rgba(0,0,0,.5)',
                                  color: '#FFF',
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  margin: 0,
                                  padding: '3px 10px 3px',
                                }}
                              >
                                {offender.name}
                              </Paragraph>
                            </Card>
                          </Tooltip>
                        </Col>
                      )
                    )}
                  </Row>
                )}
              </div>
            )}
          </Col>
        </Row>

        <Divider />
        <Row gutter={20}>
          <Col>
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  3.{' '}
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  Images
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  - Please add any images that you have of the incident.
                </Paragraph>
              </Col>
              <Col style={{ marginLeft: 30 }}>
                <Upload
                  action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                  fileList={fileList}
                  onChange={imgChange}
                  beforeUpload={beforeUpload}
                  accept=".png,.jpeg,.webp"
                  showUploadList={false}
                  // onDownload={() =>
                  //   confirm({
                  //     title: 'Assign Offenders',
                  //     content:
                  //       'Do you Want to assign this image to any offenders shown in them?',
                  //     okText: 'Yes',
                  //     onOk() {
                  //       toggleAssignImage();
                  //     },
                  //   })
                  // }
                  // itemRender={(file) => <Button>{file.key}</Button>}
                >
                  <Button
                    icon={
                      <FontAwesomeIcon
                        icon={faUpload}
                        style={{ marginRight: 5 }}
                      />
                    }
                    style={{ color: 'red' }}
                  >
                    Upload Image
                  </Button>
                </Upload>
              </Col>
            </Row>
            <Form.Item name="images">
              <Upload<Image>
                action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                className="incident-form-images"
                listType="picture-card"
                fileList={fileList}
                onChange={imgChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                accept=".png,.jpeg,.webp"
                showUploadList={{
                  showDownloadIcon: true,
                  downloadIcon: <UserAddOutlined />,
                }}
                itemRender={(el, file: Image) => (
                  <div className="image-card" key={el.key}>
                    {file.url === undefined && (
                      <div className="image-card-loading">
                        <Spin />
                      </div>
                    )}
                    <div className="image-remove-button">
                      <Popconfirm
                        placement="topLeft"
                        title="Remove the image?"
                        onConfirm={() => removeImage(file.uid)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          size="small"
                          icon={<FontAwesomeIcon icon={faTrash} />}
                        />
                      </Popconfirm>
                    </div>
                    <div
                      className="image-card-image"
                      style={{
                        backgroundImage: `url(${file.url || file.thumbUrl})`,
                      }}
                    />
                    <div className="image-card-offenders">
                      <Text strong>Offenders:</Text>
                      {file.offenders && file.offenders.length === 0 && (
                        <Paragraph>
                          You have not assigned any offender to this image.
                        </Paragraph>
                      )}
                      {file.offenders?.map((offender) => (
                        <div className="image-card-offender" key={offender.id}>
                          <Text className="image-card-offender-text">
                            {offender.name}
                          </Text>
                          <Popconfirm
                            placement="topLeft"
                            title="Are you sure?"
                            onConfirm={() => {
                              removeImageFromOffender({
                                image: file,
                                offenderId: offender.id,
                              });
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              size="small"
                              icon={<FontAwesomeIcon icon={faTrash} />}
                              style={{ color: 'red' }}
                            />
                          </Popconfirm>
                        </div>
                      ))}
                      <Button
                        size="small"
                        onClick={() => setAssignToImage(file)}
                      >
                        Assign Offenders
                      </Button>
                    </div>
                  </div>
                )}
              >
                {fileList.length < 10 && '+ Upload'}
                {/* <Button>a</Button> */}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={() => window.history.back()}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Create Incident
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>

    <Drawer
      title="Add Crime Type"
      visible={addIncidentTag}
      width="400"
      onClose={toggleAddIncidentTag}
    >
      {addIncidentTag ? (
        <AddIncidentTag
          update={updateIncidentTag}
          onClose={toggleAddIncidentTag}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add New Location"
      visible={addNewLocation}
      width="600"
      onClose={toggleAddNewLocation}
    >
      {addNewLocation ? (
        <AddNewLocation
          update={updateNewLocation}
          onClose={toggleAddNewLocation}
        />
      ) : (
        <div />
      )}
    </Drawer>

    <Drawer
      title="Select Previous Locations"
      visible={addPreviousLocation}
      width="600"
      onClose={toggleAddPreviousLocation}
    >
      {addPreviousLocation ? (
        <AddPreviousLocation
          update={updatePreviousLocation}
          onClose={toggleAddPreviousLocation}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add New Offender"
      visible={addOffender}
      width="600"
      onClose={toggleAddOffender}
      zIndex={1001}
    >
      {addOffender ? (
        <AddOffender update={updateOffenderList} onClose={toggleAddOffender} />
      ) : (
        <div />
      )}
    </Drawer>

    <Drawer
      title="Add Existing Offenders"
      visible={addExistingOffender}
      width="800"
      onClose={toggleAddExistingOffender}
      zIndex={1001}
    >
      {addExistingOffender ? (
        <AddExistingOffender
          update={updateOffenderList}
          onClose={toggleAddExistingOffender}
        />
      ) : (
        <div />
      )}
    </Drawer>

    <Modal
      onCancel={() => setAddRecentOffender(null)}
      visible={addRecentOffender !== null}
      onOk={() => {
        if (addRecentOffender) updateOffenderList([addRecentOffender]);
        setAddRecentOffender(null);
      }}
      okText="Add to incident"
      title={`Are you sure you want to add ${addRecentOffender?.name}?`}
      bodyStyle={{
        padding: 0,
      }}
    >
      <Row>
        {addRecentOffender && addRecentOffender.images.length > 0 && (
          <Col span={8}>
            <div
              style={{
                backgroundImage: `url(${addRecentOffender?.images[0]?.optimised})`,
                width: 180,
                height: 200,
                backgroundSize: 'cover',
              }}
            />
          </Col>
        )}
        <Col span={16} style={{ padding: '10px 20px' }}>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Age">
              {getOffenderAge(addRecentOffender?.age) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Build">
              {getOffenderBuild(addRecentOffender?.build) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Ethnicity">
              {getOffenderRace(addRecentOffender?.race)}
            </Descriptions.Item>
            <Descriptions.Item label="Sex">
              {getOffenderGender(addRecentOffender?.gender) ||
                'Unknown' ||
                'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Hair">
              {addRecentOffender?.hair || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Peculiarities">
              {addRecentOffender?.peculiarities || 'Unknown'}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Modal>

    <AssignImageOffender
      image={newImage || undefined}
      offenderData={offendersData || []}
      onCancel={onCancelNewImage}
      onSubmit={assignOffendersToImages}
    />
  </div>
);
export default EditIncident;
