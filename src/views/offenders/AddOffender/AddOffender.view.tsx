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
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';

const { Title, Text } = Typography;

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
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader onBack={() => window.history.back()} title="Add Offender" />

    <Card>
      <Form onFinish={onSubmit}>
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
            <Form.Item
              name="groups"
              label="Groups"
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
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
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
                    placeholder="Enter the information source of the offender's date of birth range of the offender ."
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
                onPreview={onPreview}
                beforeUpload={beforeUpload}
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
            {bansData && bansData.length > 0 && (
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
