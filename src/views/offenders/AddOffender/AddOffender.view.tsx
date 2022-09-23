import React from 'react';
import { Age, Gender, Race, Build, CreateTagMutation } from 'graphql/generated';

import {
  Card,
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
  Divider,
} from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import {
  calcDuration,
  calcExpired,
} from 'utils/offender/get-offender-exclusion';
import AddExclusion from 'components/form-components/offender/addOffender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/addOffender/exclusion/EditExclusion';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';

const { Title, Text, Paragraph } = Typography;

interface FormData {
  name: string;
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource?: string;
  dateOfBirth?: Date;
  groups: string[];
  tags: string[];
  images?: [{ id: string; url: string; optimised: string }];
  bans?: [
    { endDate: Date; startDate: Date; location: string; description: string }
  ];
}
interface BanData {
  id?: string | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}
interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  banData: BanData | null;
  setBanData: (value: BanData | null) => void;
  deleteConfirm: (value: string | undefined) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  bansData: BanData[];
  updateAddExclusion: (value: BanData) => void;
  updateEditExclusion: (value: BanData) => void;
  adminRights: boolean;
}

const AddOffender = ({
  onSubmit,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  imgChange,
  onPreview,
  beforeUpload,
  fileList,
  addOffenderTag,
  toggleAddOffenderTag,
  updateOffenderTag,
  addExclusion,
  toggleAddExclusion,
  editExclusion,
  toggleEditExclusion,
  banData,
  setBanData,
  deleteConfirm,
  ageCheck,
  setAgeCheck,
  bansData,
  updateAddExclusion,
  updateEditExclusion,
  adminRights,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader onBack={() => window.history.back()} title="Add Offender" />
    <Card>
      <Form onFinish={onSubmit} layout="vertical">
        <Row align="bottom" style={{ marginBottom: 30 }}>
          <Col>
            <Title style={{ marginBottom: 0 }} level={4}>
              1.{' '}
            </Title>
          </Col>
          <Col>
            <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
              Offender Details
            </Title>
          </Col>
          <Col>
            <Paragraph
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
              italic
            >
              - Please complete the basic details for the offender.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={60}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Name"
              tooltip="Enter the offenders name if you know it, if not leave this field
                blank."
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              name="build"
              label="Build"
              tooltip="Select the build of the offender if known."
            >
              <Select options={buildValues} disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="gender"
              label="Sex"
              tooltip="Select the gender of the offender if known."
            >
              <Select options={genderValues} disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={60}>
          <Col span={8}>
            <Form.Item
              name="race"
              label="Ethnicity"
              tooltip="Select the ethnicity of the offender if known."
            >
              <Select options={raceValues} disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="hair"
              label="Hair"
              tooltip="The style and colour of the offenders hair if known."
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="groups"
              label="Groups"
              tooltip="Select the groups that you would like this offender to be visible to."
              rules={[
                {
                  required: true,
                  message: 'Please select at least one group for the offender.',
                },
              ]}
            >
              <Select
                loading={groupsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
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
        <Row gutter={10} align="middle">
          <Col span={12}>
            <Form.Item
              name="tags"
              label="Offender Warnings"
              tooltip="select any warning labels that are relevant to this offender or add your own."
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
          {adminRights && (
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                style={{ color: 'red', padding: 8 }}
                onClick={toggleAddOffenderTag}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Add Label
              </Button>
            </Col>
          )}
        </Row>
        <Row gutter={60}>
          <Col span={8}>
            <Form.Item
              name="ageCheck"
              label="Do you know the offender's date of birth?"
            >
              <Switch
                style={{ width: 70, height: 30, marginLeft: 10 }}
                checked={ageCheck}
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
              <Col span={7}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  tooltip="Enter the offender's date of birth if known."
                >
                  <DatePicker
                    disabled={saving}
                    disabledDate={(current) =>
                      current && current.valueOf() > Date.now()
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="dateSource"
                  label="Information Source"
                  tooltip="Enter the information source of the offender's date of birth range of the offender ."
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col span={7}>
              <Form.Item
                name="age"
                label="Age"
                tooltip="Select an estimated age range of the offender if known."
              >
                <Select options={ageValues} disabled={saving} />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="peculiarities"
              label="Peculiarities"
              tooltip="Enter any distinctive features of the offender."
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        {/* <Divider /> */}
        <Row gutter={5} style={{ marginTop: 50 }}>
          <Col flex={1}>
            <Row align="bottom" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  2.{' '}
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  Exclusions
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  - Create exclusions for this offender to exclusion them from
                  areas or premises.
                </Paragraph>
              </Col>
            </Row>
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
        {bansData && bansData.length > 0 ? (
          <Row gutter={20}>
            <Col>
              <Table
                size="small"
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
                    width: 150,
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
                            setBanData(record.item);
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
                dataSource={bansData.map((ban) => ({
                  endDate: ban.endDate,
                  key: ban.id,
                  item: ban,
                  duration: `${new Date(
                    ban?.startDate
                  ).toDateString()}  -->  ${new Date(
                    ban?.endDate
                  ).toDateString()}`,
                  activeDay: calcDuration(
                    new Date(ban?.startDate),
                    new Date(ban?.endDate)
                  ),
                  location: ban.location,
                  description: ban.description,
                }))}
              />
            </Col>
          </Row>
        ) : (
          <Divider />
        )}

        <Row style={{ marginTop: 50 }}>
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
                  - Please add any images that you have of the offender.
                </Paragraph>
              </Col>
              <Col style={{ marginLeft: 30 }}>
                <Upload
                  action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                  fileList={fileList}
                  onChange={imgChange}
                  beforeUpload={beforeUpload}
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
              <Upload
                action={process.env.REACT_APP_IMAGE_UPLOAD_ENDPOINT}
                listType="picture-card"
                fileList={fileList}
                onChange={imgChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
              >
                {fileList.length < 10 && '+ Upload'}
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
            update={updateAddExclusion}
            onClose={toggleAddExclusion}
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
          <EditExclusion
            update={updateEditExclusion}
            onClose={toggleEditExclusion}
            banData={banData}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </Card>
  </div>
);
export default AddOffender;
