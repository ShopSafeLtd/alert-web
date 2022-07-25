import React from 'react';
import {
  ViewIncidentQuery,
  // Age,
  // Gender,
  // Race,
  // Build,
  // CreateBanMutation,
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
  // Tag,
  DatePicker,
  // Table,
  TimePicker,
} from 'antd';

import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
// import {
//   ageValues,
//   buildValues,
//   genderValues,
//   raceValues,
// } from 'utils/select-Incidents-desc/enums';
// import {
//   calcDuration,
//   calcExpired,
// } from 'utils/offender/get-offender-exclusion';
import { MutationUpdaterFn } from '@apollo/client';

// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddIncident';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
// import moment from 'moment';
import { Moment } from 'moment';

const { Title, Text } = Typography;

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
  images: [{ id: string; url: string; optimised: string }];
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

  addIncidentTag: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  // banId: string;
  // setBanId: (value: string) => void;
  // deleteConfirm: (value: string) => void;
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
  addIncidentTag,
  toggleAddIncidentTag,
  updateIncidentTag,
}: // editExclusion,
// toggleEditExclusion,
// updateExclusion,
// banId,
// setBanId,
// deleteConfirm,
// ageCheck,
// setAgeCheck,
Props): JSX.Element => {
  console.log('view');
  return (
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
              date: data?.incident?.date,
              time: data?.incident?.time,
              building: data?.incident?.location?.building || '',
              street: data?.incident?.location?.street || '',
              townCity: data?.incident?.location?.townCity || '',
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
                    // disabledDate={(current) =>
                    //   current && current.valueOf() > Date.now() - 3600 * 1000 * 24
                    // }
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
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
                  <TimePicker
                  // defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={11}>
                <Form.Item name="groups" label="Groups">
                  <Select
                    loading={groupsLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={2}
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
              <Col span={11}>
                <Row gutter={3}>
                  <Col flex={1}>
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
                        maxTagCount={2}
                      >
                        {tags.map((tag) => (
                          <Select.Option value={tag.value}>
                            {tag.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
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
                      Add
                    </Button>
                  </Col>
                </Row>
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
                  label="Town City"
                  rules={[
                    {
                      required: true,
                      message: `Please enter a town city for the incident's location.`,
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
              <Col flex={1} style={{ marginTop: 2 }}>
                <Text type="secondary">
                  Create exclusions for this offender to exclusion them from
                  areas or premises.
                </Text>
              </Col>

              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  // onClick={toggleAddExclusion}
                  style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                >
                  Add Offenders
                </Button>
              </Col>
            </Row>

            {/* <Row gutter={20}>
              <Col>
                {offenderData.listOffenders && data?.offender?.bans?.length > 0 ? (
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
                        width: 350,
                        
                      },

                      {
                        key: 'activeDay',
                        title: 'Active Days',
                        dataIndex: 'activeDay',
                        width: 100,
                      },
                      {
                        key: 'location',
                        title: 'Location',
                        dataIndex: 'location',
                        ellipsis: true,
                      },
                      {
                        key: 'description',
                        title: 'Description',
                        dataIndex: 'description',
                        ellipsis: true,
                      },
                      {
                        key: 'Options',
                        title: 'Options',
                        dataIndex: 'Options',
                        width: 100,
                        render: (value, record) => (
                          <>
                            <Button
                              disabled={saving}
                              onClick={() => {
                                setBanId(record.key);
                                toggleEditExclusion();
                              }}
                              icon={<EditOutlined />}
                            />
                            <Button
                              disabled={saving}
                              onClick={() => {
                                deleteConfirm(record.key);
                              }}
                              icon={<DeleteOutlined />}
                            />
                          </>
                        ),
                      },
                    ]}
                    dataSource={data?.offender?.bans.map((ban) => ({
                      endDate: ban.endDate,
                      key: ban.id,
                      duration: `${new Date(
                        ban?.startDate
                      ).toDateString()}  >  ${new Date(
                        ban?.endDate
                      ).toDateString()}`,
                      activeDay: calcDuration(
                        new Date(ban?.startDate),
                        new Date(ban?.endDate)
                      ),
                      location: ban.description,
                      description: ban.description,
                    }))}
                  />
                ) : (
                  <Paragraph type="secondary">
                    This offender does not have any exclusions.
                  </Paragraph>
                )}
              </Col>
            </Row> */}

            <Form.Item>
              <Row style={{ marginTop: 30 }} gutter={10} justify="end">
                <Col>
                  <Button
                    disabled={saving}
                    onClick={() => window.history.back()}
                  >
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
        </Card>
      )}
    </div>
  );
};

export default EditIncident;
