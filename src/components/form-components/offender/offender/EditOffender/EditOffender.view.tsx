import React from 'react';
import type { ViewOffenderQuery } from 'graphql/generated';

import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Switch,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import {
  calcDuration,
  calcExpired,
} from 'utils/offender/get-offender-exclusion';

import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';

// import type { RangePickerProps } from 'antd/es/date-picker';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import type { TagData } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FormData } from './useEditOffender';

const { Title, Text, Paragraph } = Typography;

// interface FormData {
//   name: string;
//   age: Age;
//   gender: Gender;
//   race: Race;
//   build: Build;
//   hair: string;
//   peculiarities: string;
//   dateSource?: string;
//   dateOfBirth?: Date;
//   groups: string[];
//   tags: string[];
//   images?: [{ id: string; url: string; optimised: string }];
// }

interface BanData {
  id: string;
  title?: string | null | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description?: string | null | undefined;
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
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateNewOffenderTagData: (values: TagData) => void;

  updateExclusion: (value: BanData) => void;
  bansData: BanData[];
  banData: BanData | null;
  setBanData: (value: BanData | null) => void;
  deleteConfirm: (value: string) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  onClose: () => void;
  adminRights: boolean;
  selectedItems: string[];
  setSelectedItems: (value: string[]) => void;
  form: FormInstance<FormData> | undefined;
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
  onPreview,
  beforeUpload,
  fileList,
  addOffenderTag,
  toggleAddOffenderTag,
  updateNewOffenderTagData,
  addExclusion,
  toggleAddExclusion,
  editExclusion,
  toggleEditExclusion,
  updateExclusion,
  banData,
  setBanData,
  bansData,
  deleteConfirm,
  ageCheck,
  setAgeCheck,
  onClose,
  selectedItems,
  setSelectedItems,
  form,
  adminRights,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Form
            onFinish={onSubmit}
            layout="vertical"
            form={form}
            initialValues={{
              name: data?.offender?.name || null,
              age: data?.offender?.age || null,
              gender: data?.offender?.gender || null,
              race: data?.offender?.race || null,
              build: data?.offender?.build || null,
              hair: data?.offender?.hair || null,
              ageCheck: !!data?.offender?.dateOfBirth,
              peculiarities: data?.offender?.peculiarities || null,
              dateOfBirth: data?.offender?.dateOfBirth
                ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
                : null,
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
            <Row align="bottom" style={{ marginBottom: 30 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({ defaultMessage: '1. ', id: 'UNK6Ao' })}
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Offender Details',
                    id: 'fQT6Wx',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Please complete the basic details for the offender.',
                    id: 'tY/jAs',
                  })}
                </Paragraph>
              </Col>
            </Row>
            <Row gutter={60}>
              <Col span={8}>
                <Form.Item
                  name="name"
                  label={intl.formatMessage({
                    defaultMessage: 'Name',
                    id: 'HAlOn1',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Enter the offenders name if you know it, if not leave this field blank.',
                    id: 'pYHIHH',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  name="build"
                  label={intl.formatMessage({
                    defaultMessage: 'Build',
                    id: 'RSctv1',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the build of the offender if known.',
                    id: 'f0WQZR',
                  })}
                >
                  <Select options={buildValues} disabled={saving} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="gender"
                  label={intl.formatMessage({
                    defaultMessage: 'Sex',
                    id: 'eWJHGp',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the gender of the offender if known.',
                    id: 'h04BWW',
                  })}
                >
                  <Select options={genderValues} disabled={saving} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={60}>
              <Col span={8}>
                <Form.Item
                  name="race"
                  label={intl.formatMessage({
                    defaultMessage: 'Ethnicity',
                    id: 'XtCAFo',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the ethnicity of the offender if known.',
                    id: 'Wv0puZ',
                  })}
                >
                  <Select options={raceValues} disabled={saving} />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  name="hair"
                  label={intl.formatMessage({
                    defaultMessage: 'Hair',
                    id: 'e4YBbX',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The style and colour of the offenders hair if known.',
                    id: 'bnOdvC',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Row gutter={5} align="middle">
                  <Col flex={1}>
                    <Form.Item
                      name="tags"
                      label={intl.formatMessage({
                        defaultMessage: 'Offender Warnings',
                        id: '1jRWJS',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'Select any warning labels that are relevant to this offender or add your own.',
                        id: 'DRvp89',
                      })}
                    >
                      <Select
                        loading={tagsLoading}
                        disabled={saving}
                        mode="multiple"
                        maxTagCount={3}
                        value={selectedItems}
                        onChange={setSelectedItems}
                        optionFilterProp="label"
                      >
                        {tags.map((tag) => (
                          <Select.Option value={tag.value} label={tag.label}>
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
                        style={{ color: 'red', padding: 8 }}
                        onClick={toggleAddOffenderTag}
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Label',
                          id: 'sKEGIM',
                        })}
                      </Button>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>

            <Row gutter={60}>
              <Col span={8}>
                <Form.Item
                  name="ageCheck"
                  label={intl.formatMessage({
                    defaultMessage: "Do you know the offender's date of birth?",
                    id: 'nRYjxK',
                  })}
                >
                  <Switch
                    style={{ width: 70, marginLeft: 10 }}
                    checked={ageCheck}
                    checkedChildren={intl.formatMessage({
                      defaultMessage: 'Yes',
                      id: 'a5msuh',
                    })}
                    unCheckedChildren={intl.formatMessage({
                      defaultMessage: 'No',
                      id: 'oUWADl',
                    })}
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
                      label={intl.formatMessage({
                        defaultMessage: 'Date of Birth',
                        id: 'e9Z+tg',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          "Enter the offender's date of birth if known.",
                        id: 'Yt1WCY',
                      })}
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
                      label={intl.formatMessage({
                        defaultMessage: 'Information Source',
                        id: 'LUqHSz',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          "Enter the information source of the offender's date of birth range of the offender.",
                        id: '3Jk/hp',
                      })}
                    >
                      <Input.TextArea disabled={saving} />
                    </Form.Item>
                  </Col>
                </>
              ) : (
                <Col span={7}>
                  <Form.Item
                    name="age"
                    label={intl.formatMessage({
                      defaultMessage: 'Age',
                      id: '9oNQSC',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select an estimated age range of the offender if known.',
                      id: 'w+tgOS',
                    })}
                  >
                    <Select options={ageValues} disabled={saving} />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={16}>
              <Col span={23}>
                <Form.Item
                  name="peculiarities"
                  label={intl.formatMessage({
                    defaultMessage: 'Peculiarities',
                    id: '9s+ZmX',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Enter any distinctive features of the offender.',
                    id: 'jISH3I',
                  })}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            </Row>

            {groups.length > 1 && (
              <Row>
                <Col span={8}>
                  <Form.Item
                    name="groups"
                    label={intl.formatMessage({
                      defaultMessage: 'Groups',
                      id: 'hzmswI',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select the groups that you would like this offender to be visible to.',
                      id: '/oJY/I',
                    })}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select at least one group for the offender.',
                          id: 'hK3zLA',
                        }),
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
            )}

            <Row align="middle" style={{ marginTop: 70, marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({ defaultMessage: '2.', id: 'VLt5sV' })}
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Exclusions',
                    id: 'jjBvFh',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 5 }}>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Create exclusions for this offender to exclusion them from areas or premises.',
                    id: 'nBsI+u',
                  })}
                </Paragraph>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  onClick={toggleAddExclusion}
                  style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Exclusion',
                    id: 'QPeZMN',
                  })}
                </Button>
              </Col>
            </Row>
            {bansData && bansData.length > 0 ? (
              <Row gutter={20}>
                <Col>
                  <Table
                    size="small"
                    pagination={{
                      hideOnSinglePage: true,
                      defaultPageSize: 20,
                      pageSize: 20,
                    }}
                    columns={[
                      {
                        key: 'duration',
                        title: intl.formatMessage({
                          defaultMessage: 'Duration',
                          id: 'IuFETn',
                        }),
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
                                {intl.formatMessage({
                                  defaultMessage: 'EXPIRED',
                                  id: 'GftNg3',
                                })}
                              </Tag>
                            )}
                          </>
                        ),
                      },
                      {
                        key: 'activeDay',
                        title: intl.formatMessage({
                          defaultMessage: 'Active Days',
                          id: 'YEneNi',
                        }),
                        dataIndex: 'activeDay',
                        width: 150,
                      },
                      {
                        key: 'location',
                        title: intl.formatMessage({
                          defaultMessage: 'Location',
                          id: 'rvirM2',
                        }),
                        dataIndex: 'location',
                        ellipsis: true,
                      },
                      {
                        key: 'description',
                        title: intl.formatMessage({
                          defaultMessage: 'Description',
                          id: 'Q8Qw5B',
                        }),
                        dataIndex: 'description',
                        ellipsis: true,
                      },
                      {
                        key: 'Options',
                        title: intl.formatMessage({
                          defaultMessage: 'Options',
                          id: 'NDV5Mq',
                        }),
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
                              icon={
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  style={{ marginRight: 5 }}
                                />
                              }
                            />
                            <Button
                              disabled={saving}
                              onClick={() => {
                                deleteConfirm(record.key || '');
                              }}
                              icon={
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ marginRight: 5 }}
                                />
                              }
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
              <>
                <Row justify="start">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={intl.formatMessage({
                      defaultMessage:
                        'There are no exclusions for this offender.',
                      id: '4J6DZ4',
                    })}
                  />
                </Row>
                {/* <Divider /> */}
              </>
            )}
            <Row style={{ marginTop: 70 }}>
              <Col>
                <Row align="middle" style={{ marginBottom: 20 }}>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Title style={{ marginBottom: 0 }} level={4}>
                      3.
                    </Title>
                  </Col>
                  <Col>
                    <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Images',
                        id: 'Fip4H8',
                      })}
                    </Title>
                  </Col>
                  <Col>
                    <Paragraph
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
                      italic
                    >
                      {intl.formatMessage({
                        defaultMessage:
                          '- Please add any images that you have of the offender.',
                        id: 'REcCeM',
                      })}
                    </Paragraph>
                  </Col>
                  <Col style={{ marginLeft: 30 }}>
                    <Upload
                      action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
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
                        {intl.formatMessage({
                          defaultMessage: 'Upload Image',
                          id: 'MntrZe',
                        })}
                      </Button>
                    </Upload>
                  </Col>
                </Row>

                <Form.Item name="images">
                  <Upload
                    action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={imgChange}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                    accept=".png,.jpeg,.webp"
                  >
                    {fileList.length < 10 &&
                      intl.formatMessage({
                        defaultMessage: '+ Upload',
                        id: '3QJWLZ',
                      })}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Row style={{ marginTop: 30 }} gutter={10} justify="end">
                <Col>
                  <Button disabled={saving} onClick={onClose}>
                    {intl.formatMessage({
                      defaultMessage: 'Cancel',
                      id: '47FYwb',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    loading={saving}
                    type="primary"
                    htmlType="submit"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Save',
                      id: 'jvo0vs',
                    })}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Add Offender Warning',
              id: 'JQTlrb',
            })}
            visible={addOffenderTag}
            width="400"
            onClose={toggleAddOffenderTag}
          >
            {addOffenderTag ? (
              <AddOffenderTag
                update={updateNewOffenderTagData}
                onClose={toggleAddOffenderTag}
              />
            ) : (
              <div />
            )}
          </Drawer>
          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Add Exclusion',
              id: 'QPeZMN',
            })}
            visible={addExclusion}
            width="400"
            onClose={toggleAddExclusion}
          >
            {addExclusion ? (
              <AddExclusion
                update={updateExclusion}
                onClose={toggleAddExclusion}
              />
            ) : (
              <div />
            )}
          </Drawer>
          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Edit Exclusion',
              id: '22olP0',
            })}
            visible={editExclusion}
            width="400"
            onClose={toggleEditExclusion}
          >
            {editExclusion ? (
              <EditExclusion
                update={updateExclusion}
                onClose={toggleEditExclusion}
                banData={banData}
              />
            ) : (
              <div />
            )}
          </Drawer>
        </>
      )}
    </div>
  );
};
export default EditOffender;
