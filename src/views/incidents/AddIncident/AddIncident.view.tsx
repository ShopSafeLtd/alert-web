import React from 'react';
import {
  Age,
  Gender,
  Race,
  Build,
  CreateTagMutation,
  AddressesQuery,
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
  TimePicker,
  Table,
  Skeleton,
  Modal,
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
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';

import { Moment } from 'moment';
import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import AddOffender from 'components/form-components/incident/offender/AddOffender';
import AddExistingOffender from 'components/form-components/incident/offender/AddExisitingOffender';
import AddNewLocation from 'components/form-components/incident/location/AddLocation';
import AddPreviousLocation from 'components/form-components/incident/location/AddPreviousLocation';
import AssignImageToOffender from 'components/form-components/incident/offender/AssignImageToOffender';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;
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
  // primaryAddress:
  //   | Exclude<AddressesQuery['addresses'], undefined | null>[0]
  //   | undefined;
  addressData: AddressesQuery | undefined;
  addressLoading: boolean;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  fileList: UploadFile[];
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
  deleteConfirm: (value: string | undefined) => void;
  addPreviousLocation: boolean;
  toggleAddPreviousLocation: () => void;
  updatePreviousLocation: (value: string | undefined) => void;
  addNewLocation: boolean;
  toggleAddNewLocation: () => void;
  updateNewLocation: (value: LocationData | undefined) => void;
  assignImage: boolean;
  toggleAssignImage: () => void;
  updateAssignImage: (value: string[] | undefined) => void;
}

const EditIncident = ({
  onSubmit,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  // primaryAddress,
  addressData,
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
  deleteConfirm,
  addPreviousLocation,
  toggleAddPreviousLocation,
  updatePreviousLocation,
  addNewLocation,
  toggleAddNewLocation,
  updateNewLocation,
  form,
  assignImage,
  toggleAssignImage,
  updateAssignImage,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader onBack={() => window.history.back()} title="Add Incident" />

    <Card>
      <Form<FormData>
        form={form}
        initialValues={{
          fullAddress: addressData?.addresses.find((el) => el.primary)?.full,
        }}
        onFinish={onSubmit}
      >
        <Row gutter={20} style={{ marginBottom: 30 }}>
          <Col>
            <Title level={4}>Incident Details</Title>
          </Col>
        </Row>

        <Row gutter={50}>
          <Col span={11}>
            <Form.Item
              name="subject"
              label="Subject"
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
          <Col span={11}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter a description for the incident.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={50}>
          <Col span={11}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Date"
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
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
          </Col>

          <Col span={11}>
            <Form.Item
              name="groups"
              label="Groups"
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
        </Row>

        <Row gutter={5}>
          <Col span={11}>
            <Form.Item
              name="tags"
              label="Crime Types"
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
          <Col span={11}>
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
          </Col>
        </Row>
        {addressLoading ? (
          <Skeleton />
        ) : (
          <Row gutter={10}>
            <Col
              // flex={1}
              span={11}
            >
              <Form.Item
                name="fullAddress"
                label="Location"
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
            </Col>
            {addressData &&
              addressData?.addresses.filter((el) => !el.primary).length > 0 && (
                <Col>
                  <Button
                    disabled={saving}
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
              )}

            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={toggleAddNewLocation}
                style={{ color: 'red' }}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Add New Location
              </Button>
            </Col>
          </Row>
        )}

        <Row gutter={5} style={{ marginTop: 20 }}>
          <Col flex={1}>
            <Title level={4}>Offenders</Title>
          </Col>
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
              Find Offenders
            </Button>
          </Col>
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
              Add New Offender
            </Button>
          </Col>
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
                    render: (value, record) => (
                      <Button
                        disabled={saving}
                        onClick={() => {
                          deleteConfirm(record.key || undefined);
                        }}
                        icon={<DeleteOutlined />}
                      />
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
                }))}
              />
            ) : (
              <Paragraph type="secondary" style={{ marginBottom: 50 }}>
                You have not add any offenders on this incident.
              </Paragraph>
            )}
          </Col>
        </Row>
        <Row gutter={20}>
          <Col>
            <Title level={4}>Images</Title>
            <Form.Item name="images">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
                onDownload={() =>
                  confirm({
                    title: 'Assign Offenders',
                    content:
                      'Do you Want to assign this image to any offenders shown in them?',
                    okText: 'Yes',
                    onOk() {
                      toggleAssignImage();
                    },
                  })
                }
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
      width="600"
      onClose={toggleAddExistingOffender}
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
    <Drawer
      title="Assigned offenders"
      visible={assignImage}
      width="600"
      onClose={toggleAssignImage}
    >
      {assignImage ? (
        <AssignImageToOffender
          update={updateAssignImage}
          onClose={toggleAssignImage}
          data={offendersData}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </div>
);
export default EditIncident;
