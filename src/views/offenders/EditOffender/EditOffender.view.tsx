import React from 'react';
import {
  ViewOffenderQuery,
  Age,
  Gender,
  Race,
  Build,
  CreateBanMutation,
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
  Tag,
  Switch,
  DatePicker,
  Table,
} from 'antd';

import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ageValues, buildValues, genderValues, raceValues } from 'utils/enums';
import {
  calcDuration,
  calcExpired,
} from 'utils/offender/get-offender-exclusion';
import { MutationUpdaterFn } from '@apollo/client';
import AddExclusion from 'components/form-components/offender/editOffender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/editOffender/exclusion/EditExclusion';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import type { RangePickerProps } from 'antd/es/date-picker';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

interface FormData {
  name: string;
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  tags: string[];
  images: [{ id: string; url: string; optimised: string }];
}

interface Props {
  onSubmit: (value: FormData) => void;
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];

  fileList: UploadFile[];
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  updateExclusion: MutationUpdaterFn<CreateBanMutation>;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  banId: string;
  setBanId: (value: string) => void;
  deleteConfirm: (value: string) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
}

const EditOffender = ({
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
  addOffenderTag,
  toggleAddOffenderTag,
  updateOffenderTag,
  addExclusion,
  toggleAddExclusion,
  editExclusion,
  toggleEditExclusion,
  updateExclusion,
  banId,
  setBanId,
  deleteConfirm,
  ageCheck,
  setAgeCheck,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader onBack={() => window.history.back()} title="Edit Offender" />
    {loading ? (
      <Skeleton />
    ) : (
      <Card>
        <Form
          onFinish={onSubmit}
          initialValues={{
            name: data?.offender?.name || null,
            age: data?.offender?.age || null,
            gender: data?.offender?.gender || null,
            race: data?.offender?.race || null,
            build: data?.offender?.build || null,
            hair: data?.offender?.hair || null,
            ageCheck: !!data?.offender?.dateOfBirth,
            peculiarities: data?.offender?.peculiarities || null,
            dateOfBirth: moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD'),
            dateSource: data?.offender?.dateSource || null,
            groups:
              data?.offender?.groups && data?.offender?.groups.length > 0
                ? data?.offender?.groups.map(({ id }) => id)
                : [],
            tags:
              data?.offender?.tags && data?.offender?.tags.length > 0
                ? data?.offender?.tags.map(({ id }) => id)
                : [],
          }}
        >
          <Row gutter={20} style={{ marginBottom: 30 }}>
            <Col>
              <Title level={4}>Offender Details</Title>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item name="name" label="Name">
                <Input
                  disabled={saving}
                  placeholder="Enter the offenders name if you know it, if not leave this field
                blank."
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item name="build" label="Build">
                <Select
                  options={buildValues}
                  disabled={saving}
                  placeholder="Select the build of the offender if known."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item name="gender" label="Sex">
                <Select
                  options={genderValues}
                  disabled={saving}
                  placeholder="Select the gender of the offender if known."
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="race" label="Ethnicity">
                <Select
                  options={raceValues}
                  disabled={saving}
                  placeholder="Select the ethnicity of the offender if known."
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={50}>
            <Col span={11}>
              <Form.Item name="hair" label="Hair">
                <Input
                  disabled={saving}
                  placeholder="The style and colour of the offenders hair if known."
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="peculiarities" label="Peculiarities">
                <Input
                  disabled={saving}
                  placeholder="Anything distinctive features of the offender."
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
                  maxTagCount={3}
                  placeholder="Select the groups that you would like this offender to be visible to."
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
                  <Form.Item name="tags" label="Offender Warnings">
                    <Select
                      loading={tagsLoading}
                      disabled={saving}
                      mode="multiple"
                      maxTagCount={3}
                      placeholder="select any warning labels that are relevant to this offender or add your own."
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
                    onClick={toggleAddOffenderTag}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Add Label
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item
                name="ageCheck"
                label="Do you know the offender's date of birth?"
                valuePropName="checked"
              >
                <Switch
                  style={{ width: 70, height: 30, marginLeft: 10 }}
                  checked={ageCheck}
                  // defaultChecked={!!data?.offender?.dateOfBirth}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  onChange={() => {
                    setAgeCheck(!ageCheck);
                  }}
                />
              </Form.Item>
            </Col>
            {ageCheck ? (
              <>
                <Col span={11}>
                  <Form.Item name="dateOfBirth" label="Date of Birth">
                    <DatePicker
                      disabled={saving}
                      disabledDate={(current) =>
                        current && current.valueOf() > Date.now()
                      }
                    />
                  </Form.Item>
                  <Form.Item name="dateSource" label="Information Source">
                    <Input
                      disabled={saving}
                      placeholder="Enter the information source of the
                      offender's date of birth."
                    />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <Col span={11}>
                <Form.Item name="age" label="Age">
                  <Select
                    placeholder="Select an estimated age range of the offender if known."
                    options={ageValues}
                    disabled={saving}
                  />
                </Form.Item>
              </Col>
            )}
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
            <Col>
              <Title level={4}>Exclusions:</Title>
            </Col>
            <Col flex={1} style={{ marginTop: 2 }}>
              <Text type="secondary">
                Create exclusions for this offender to exclusion them from areas
                or premises.
              </Text>
            </Col>

            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={toggleAddExclusion}
                style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Add Exclusion
              </Button>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col>
              {data?.offender?.bans && data?.offender?.bans?.length > 0 ? (
                <Table
                  size="small"
                  loading={loading}
                  pagination={{
                    defaultPageSize: 20,
                    pageSize: 20,
                  }}
                  columns={[
                    {
                      key: 'duration',
                      title: 'Duration',
                      dataIndex: 'duration',
                      width: 350,
                      render: (value, record) => (
                        <>
                          <Text>{value}</Text>
                          {calcExpired(new Date(record.endDate)) && (
                            <Tag
                              color="red"
                              style={{
                                marginLeft: 10,
                              }}
                            >
                              EXPIRED
                            </Tag>
                          )}
                        </>
                      ),
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
        <Drawer
          title="Add Offender Warning"
          visible={addOffenderTag}
          width="400"
          onClose={toggleAddOffenderTag}
        >
          {addOffenderTag ? (
            <AddOffenderTag
              update={updateOffenderTag}
              onClose={toggleAddOffenderTag}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          title="Add Exclusion"
          visible={addExclusion}
          width="400"
          onClose={toggleAddExclusion}
        >
          {addExclusion ? (
            <AddExclusion
              update={updateExclusion}
              onClose={toggleAddExclusion}
              offenderId={data?.offender?.id}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          title="Edit Exclusion"
          visible={editExclusion}
          width="400"
          onClose={toggleEditExclusion}
        >
          {editExclusion ? (
            <EditExclusion onClose={toggleEditExclusion} banId={banId} />
          ) : (
            <div />
          )}
        </Drawer>
      </Card>
    )}
  </div>
);
export default EditOffender;
