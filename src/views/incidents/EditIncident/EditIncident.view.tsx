import React from 'react';
import {
  ViewIncidentQuery,
  Age,
  Gender,
  Race,
  Build,
  CreateTagMutation,
  ListOffendersQuery,
} from 'graphql/generated';

import {
  Card,
  Skeleton,
  Typography,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  PageHeader,
  Drawer,
  DatePicker,
  Table,
  // Empty,
  // Divider,
  Popconfirm,
  Spin,
  Tooltip,
  Descriptions,
  Modal,
} from 'antd';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  calcAge,
} from 'utils/offender/get-offender-desc';
import type { RcFile, UploadProps, UploadFile } from 'antd/es/upload/interface';

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

import moment from 'moment';
import AddOffender from 'components/form-components/incident/offender/AddNewOffender';
import AddExistingOffender from 'components/form-components/incident/offender/AddExisitingOffender';
import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import { UploadChangeParam } from 'antd/lib/upload';

const { Title, Paragraph, Text } = Typography;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  // time: Moment;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  groups: string[];
  tags: string[];
  images?: [{ id: string; url: string; optimised: string }];
}
interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
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

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];
interface Props {
  onSubmit: (value: FormData) => void;
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
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
  updateOffendersList: (value: OffenderData) => void;
  offendersData: OffenderData[];
  reviewed: boolean;
  onReject: () => void;
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
  listOffendersData: ListOffendersQuery | undefined;
  adminRights: boolean;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
}

const EditIncident = ({
  onSubmit,
  data,
  loading,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
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
  updateOffendersList,
  offendersData,
  reviewed,
  onReject,
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
  listOffendersData,
  adminRights,
  offenderImgChange,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={reviewed ? 'Review Incident' : 'Edit Incident'}
    />
    {loading ? (
      <Skeleton />
    ) : (
      <Card>
        <Form
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{
            subject: data?.incident?.subject,
            description: data?.incident?.description,
            date: moment(data?.incident?.date, 'YYYY-MM-DD,HH:mm:ss'),
            // time: moment(data?.incident?.time, 'HH:mm:ss'),
            building: data?.incident?.location?.building || '',
            street: data?.incident?.location?.street || '',
            townCity: data?.incident?.location?.townCity,
            county: data?.incident?.location?.county || '',
            postcode: data?.incident?.location?.postcode || '',
            groups:
              data?.incident?.groups && data?.incident?.groups.length > 0
                ? data?.incident?.groups.map(({ id }) => id)
                : [],
            tags:
              data?.incident?.crimeTypes &&
              data?.incident?.crimeTypes.length > 0
                ? data?.incident?.crimeTypes.map(({ id }) => id)
                : [],
          }}
        >
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
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
          <Row gutter={50}>
            <Col span={8}>
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
                      current && current.valueOf() > Date.now()
                    }
                    format="HH:mm - DD/MM/YY"
                    showTime={{ showSecond: false, showNow: true }}
                    placeholder="Set Date &amp; Time"
                  />
                </Form.Item>
              </Row>
            </Col>

            {groups.length > 1 && (
              <Col span={8}>
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
          <Row>
            <Col span={14}>
              <Row gutter={5} align="middle" wrap={false}>
                <Col flex={1}>
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
                        <Select.Option value={tag.value}>
                          {tag.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {adminRights && (
                  <Col>
                    <Button
                      disabled={saving}
                      loading={saving}
                      style={{ color: 'red', padding: 8 }}
                      onClick={toggleAddIncidentTag}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Add Crime Type
                    </Button>{' '}
                  </Col>
                )}
              </Row>
            </Col>
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
          <Row align="bottom" style={{ marginTop: 50, marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                2.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Location
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Please complete the address details for the incident&apos;s
                the Location.
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={50}>
            <Col span={8}>
              <Form.Item
                name="building"
                label="Building"
                tooltip="Please enter a building name for the incident's location."
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="street"
                label="Street"
                tooltip="Please enter a street name for the incident's location."
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter a street name for the incident's location.",
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="townCity"
                label="Town/City"
                tooltip="Please enter a town/city name for the incident's location."
                rules={[
                  {
                    required: true,
                    message: `Please enter a town/city for the incident's location.`,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={8}>
              <Form.Item
                name="county"
                label="County"
                tooltip="Please enter a county name for the incident's location."
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="postcode"
                label="Postcode"
                tooltip="Please enter a postcode for the incident's location."
                rules={[
                  {
                    required: true,
                    message: `Please enter a postcode for the incident's location.`,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginTop: 70, marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                3.{' '}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Offenders
              </Title>
            </Col>
            <Col style={{ marginRight: 30 }}>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Please add the offenders that were involved in the incident.
              </Paragraph>
            </Col>

            {listOffendersData?.listOffenders &&
              listOffendersData.listOffenders?.total > 0 && (
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
          </Row>
          <Row gutter={20} style={{ marginTop: 10 }}>
            <Col flex={1}>
              {offendersData && offendersData.length > 0 ? (
                <Table
                  size="small"
                  loading={loading}
                  pagination={{
                    defaultPageSize: 20,
                    pageSize: 20,
                  }}
                  columns={[
                    {
                      key: 'images',
                      title: '',
                      dataIndex: 'images',
                      width: 150,
                      render: (_, record) => {
                        if (record.images && record.images.length) {
                          return (
                            <img
                              style={{ width: 80 }}
                              key={record.images[0]?.id || ''}
                              src={record.images[0]?.optimised || ''}
                              alt={record.images[0]?.optimised || ''}
                            />
                          );
                        }
                        return (
                          <Upload
                            action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                            onChange={(info) =>
                              offenderImgChange(info, record.key)
                            }
                            accept=".png,.jpeg,.webp"
                            showUploadList={false}
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
                      // width: 350,
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
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
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
                        style={{ width: 600 }}
                        placeholder="Search all existing offenders... "
                        value={searchOffenders}
                        onChange={(e) => setSearchOffenders(e.target.value)}
                      />
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
                      style={{
                        overflow: 'auto',
                        flexWrap: 'nowrap',
                        marginBottom: 20,
                      }}
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
                                className="incident-form-offender-card"
                                bodyStyle={{
                                  backgroundImage: `url(${offender.images[0]?.optimised})`,
                                  width: 120,
                                  height: 120,
                                  position: 'relative',
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
                                  className="incident-form-offender-Paragraph"
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
                // <Row justify="start" style={{ marginLeft: 20 }}>
                //   <Empty
                //     image={Empty.PRESENTED_IMAGE_SIMPLE}
                //     description="There are no offenders on this incident."
                //   />
                //   <Divider />
                // </Row>
              )}
            </Col>
          </Row>
          <Row gutter={20} style={{ marginTop: 50 }}>
            <Col>
              <Row align="middle" style={{ marginBottom: 20 }}>
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    4.{' '}
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
                  itemRender={(el, file: Image) => (
                    <div className="image-card" key={el.key}>
                      {file.url === undefined && (
                        <div className="image-card-loading">
                          <Spin />
                        </div>
                      )}
                      <div
                        className="image-card-image"
                        style={{
                          backgroundImage: `url(${
                            file.optimised || file.url || file.thumbUrl
                          })`,
                        }}
                      >
                        <div className="image-remove-button">
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
                              icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                      <div className="image-card-offenders">
                        <Text strong>Offenders:</Text>
                        {file.offenders && file.offenders.length === 0 && (
                          <Paragraph>
                            You have not assigned any offender to this image.
                          </Paragraph>
                        )}
                        {file.offenders?.map((offender) => (
                          <div
                            className="image-card-offender"
                            key={offender.id}
                          >
                            <Text className="image-card-offender-text">
                              {offender.name}
                            </Text>
                            <Popconfirm
                              placement="topLeft"
                              title="Remove the image from the offender?"
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
                          type="primary"
                          style={{ marginTop: 10 }}
                          onClick={() => setAssignToImage(file)}
                          icon={
                            <FontAwesomeIcon
                              icon={faUsers}
                              style={{ marginRight: 5 }}
                            />
                          }
                        >
                          Assign Offenders
                        </Button>
                      </div>
                    </div>
                  )}
                >
                  {fileList.length < 10 && '+ Upload'}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={10} justify="end">
              <Col>
                <Button
                  disabled={saving}
                  onClick={() =>
                    reviewed ? onReject() : window.history.back()
                  }
                >
                  {reviewed ? 'Reject' : 'Cancel'}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  {reviewed ? 'Approve' : 'Save'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    )}
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
      title="Add New Offender"
      visible={addOffender}
      width="600"
      onClose={toggleAddOffender}
    >
      {addOffender ? (
        <AddOffender update={updateOffendersList} onClose={toggleAddOffender} />
      ) : (
        <div />
      )}
    </Drawer>

    <Drawer
      title="Add Existing Offenders"
      visible={addExistingOffender}
      width="800"
      onClose={toggleAddExistingOffender}
    >
      {addExistingOffender ? (
        <AddExistingOffender
          update={updateOffendersList}
          offenderIds={offendersData.map(({ id }) => id)}
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
        if (addRecentOffender) updateOffendersList(addRecentOffender);
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
              {getOffenderAge(addRecentOffender?.age)}
            </Descriptions.Item>
            <Descriptions.Item label="Build">
              {getOffenderBuild(addRecentOffender?.build) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Ethnicity">
              {getOffenderRace(addRecentOffender?.race)}
            </Descriptions.Item>
            <Descriptions.Item label="Sex">
              {getOffenderGender(addRecentOffender?.gender) || 'Unknown'}
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
