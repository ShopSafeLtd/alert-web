import React from 'react';
import {
  ViewIncidentQuery,
  Age,
  Gender,
  Race,
  Build,
  CreateTagMutation,
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
  TimePicker,
  Table,
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
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';

import moment, { Moment } from 'moment';
import { DeleteOutlined } from '@ant-design/icons';
import AddOffender from 'components/form-components/incident/offender/AddOffender';
import AddExistingOffender from 'components/form-components/incident/offender/AddExisitingOffender';

const { Title, Paragraph } = Typography;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  time: Moment;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  groups: string[];
  tags: string[];
  images?: [{ id: string; url: string; optimised: string }];
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
}
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
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader onBack={() => window.history.back()} title="Edit Incident" />
    {loading ? (
      <Skeleton />
    ) : (
      <Card>
        <Form
          onFinish={onSubmit}
          initialValues={{
            subject: data?.incident?.subject,
            description: data?.incident?.description,
            date: moment(data?.incident?.date, 'YYYY-MM-DD'),
            time: moment(data?.incident?.time, 'HH:mm:ss'),
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
                        current &&
                        current.valueOf() > Date.now() - 3600 * 1000 * 24
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
                      'Please select at least one group that you would like this incident to be visible to.',
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
                    message:
                      'Please add at least one crime type for the incident.',
                  },
                ]}
              >
                <Select
                  loading={tagsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={2}
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
          <Row gutter={20} style={{ marginBottom: 30 }}>
            <Col>
              <Title level={4}>Location</Title>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item name="building" label="Building">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="street"
                label="Street"
                rules={[
                  {
                    required: true,
                    message: `Please enter a street name for the incident's location.`,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item
                name="townCity"
                label="Town/City"
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
            <Col span={11}>
              <Form.Item name="county" label="County">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item
                name="postcode"
                label="Postcode"
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

          <Row gutter={20}>
            <Col>
              <Title level={4}>Images</Title>
              <Form.Item name="images">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={imgChange}
                  beforeUpload={beforeUpload}
                  accept=".png,.jpeg"
                  multiple
                >
                  {fileList.length < 10 && '+ Upload'}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={5}>
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
                  loading={loading}
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
                <Paragraph type="secondary">
                  There are no offenders on this incident.
                </Paragraph>
              )}
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
                  Save
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
  </div>
);

export default EditIncident;
