import type { TagData } from '#/types/DataType';
import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { ViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import type { BanType } from 'graphql/types';

import AddExclusion from '#/components/form-components/offender/exclusion/AddExclusion';
import EditExclusion from '#/components/form-components/offender/exclusion/EditExclusion';
// import type { RangePickerProps } from 'antd/es/date-picker';
import AddOffenderTag from '#/components/form-components/tags/offenderWarnings/AddOffenderWarning';
import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from '#/types/enums';
import {
  faPenToSquare,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  Typography,
  Upload,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditOffender';

import customRequest from '../../../../utils/custom-request';

const { Paragraph, Title } = Typography;

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
  description?: null | string | undefined;
  endDate?: Date;
  fineValue?: null | number | undefined;
  id: string;
  location?: string;
  months?: null | number | undefined;
  startDate?: Date;
  type?: BanType | null;
}

interface Props {
  addExclusion: boolean;
  addOffenderTag: boolean;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanData | null;
  bansData: BanData[];
  beforeUpload: (value: RcFile) => void;
  data: ViewOffenderQuery | undefined;
  deleteConfirm: (value: string) => void;
  editExclusion: boolean;
  fileList: UploadFile[];
  form: FormInstance<FormData> | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;

  saving: boolean;
  selectedItems: string[];
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanData | null) => void;
  setSelectedItems: (value: string[]) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditExclusion: () => void;
  updateExclusion: (value: BanData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
}

const EditOffender = ({
  addExclusion,
  addOffenderTag,
  adminRights,
  ageCheck,
  banData,
  bansData,
  beforeUpload,
  data,
  deleteConfirm,
  editExclusion,
  fileList,
  form,
  groups,
  groupsLoading,
  imgChange,
  loading,
  onClose,
  onSubmit,
  saving,
  selectedItems,
  setAgeCheck,
  setBanData,
  setSelectedItems,
  tags,
  tagsLoading,
  toggleAddExclusion,
  toggleAddOffenderTag,
  toggleEditExclusion,
  updateExclusion,
  updateNewOffenderTagData,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="list-view">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Form
            form={form}
            initialValues={{
              age: data?.offender?.age || null,
              ageCheck: !!data?.offender?.dateOfBirth,
              build: data?.offender?.build || null,
              dateOfBirth: data?.offender?.dateOfBirth
                ? moment
                    .utc(data.offender.dateOfBirth)
                    .set({ hour: 12, millisecond: 0, minute: 0, second: 0 })
                : null,
              dateSource: data?.offender?.dateSource || null,
              gender: data?.offender?.gender || null,
              groups:
                data?.offender?.groups && data?.offender?.groups.length > 0
                  ? data?.offender?.groups.map(({ id }) => id)
                  : [],
              hair: data?.offender?.hair || null,
              name: data?.offender?.name || null,
              peculiarities: data?.offender?.peculiarities || null,
              race: data?.offender?.race || null,
              tags:
                data?.offender?.tags && data?.offender?.tags.length > 0
                  ? data?.offender?.tags.map(({ id }) => id)
                  : [],
            }}
            layout="vertical"
            onFinish={onSubmit}
          >
            <Row align="bottom" style={{ marginBottom: 30 }}>
              <Col>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({ defaultMessage: '1. ' })}
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Offender Details',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Please complete the basic details for the offender.',
                  })}
                </Paragraph>
              </Col>
            </Row>
            <Row gutter={60}>
              <Col span={8}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Name',
                  })}
                  name="name"
                  tooltip={intl.formatMessage({
                    defaultMessage: 'Enter the offenders name if you know it.',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Build',
                  })}
                  name="build"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the build of the offender if known.',
                  })}
                >
                  <Select disabled={saving} options={buildValues} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Sex',
                  })}
                  name="gender"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the gender of the offender if known.',
                  })}
                >
                  <Select disabled={saving} options={genderValues} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={60}>
              <Col span={8}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Ethnicity',
                  })}
                  name="race"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the ethnicity of the offender if known.',
                  })}
                >
                  <Select disabled={saving} options={raceValues} />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Hair',
                  })}
                  name="hair"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The style and colour of the offenders hair if known.',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Row align="middle" gutter={5}>
                  <Col flex={1}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Offender Warnings',
                      })}
                      name="tags"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'Select any warning labels that are relevant to this offender or add your own.',
                      })}
                    >
                      <Select
                        disabled={saving}
                        loading={tagsLoading}
                        maxTagCount={3}
                        mode="multiple"
                        onChange={setSelectedItems}
                        optionFilterProp="label"
                        value={selectedItems}
                      >
                        {tags.map((tag) => (
                          <Select.Option label={tag.label} value={tag.value}>
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
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                        onClick={toggleAddOffenderTag}
                        style={{ color: 'red', padding: 8 }}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Label',
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
                  label={intl.formatMessage({
                    defaultMessage: "Do you know the offender's date of birth?",
                  })}
                  name="ageCheck"
                >
                  <Switch
                    checked={ageCheck}
                    checkedChildren={intl.formatMessage({
                      defaultMessage: 'Yes',
                    })}
                    onChange={() => {
                      setAgeCheck(!ageCheck);
                    }}
                    style={{ marginLeft: 10, width: 70 }}
                    unCheckedChildren={intl.formatMessage({
                      defaultMessage: 'No',
                    })}
                  />
                </Form.Item>
              </Col>

              {ageCheck ? (
                <>
                  <Col span={7}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Date of Birth',
                      })}
                      name="dateOfBirth"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          "Enter the offender's date of birth if known.",
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
                      label={intl.formatMessage({
                        defaultMessage: 'Information Source',
                      })}
                      name="dateSource"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          "Enter the information source of the offender's date of birth range of the offender.",
                      })}
                    >
                      <Input.TextArea disabled={saving} />
                    </Form.Item>
                  </Col>
                </>
              ) : (
                <Col span={7}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Age',
                    })}
                    name="age"
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select an estimated age range of the offender if known.',
                    })}
                  >
                    <Select disabled={saving} options={ageValues} />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={16}>
              <Col span={23}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Characteristics',
                  })}
                  name="peculiarities"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Enter any distinctive features of the offender.',
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
                    label={intl.formatMessage({
                      defaultMessage: 'Groups',
                    })}
                    name="groups"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select at least one group for the offender.',
                        }),
                        required: true,
                      },
                    ]}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select the groups that you would like this offender to be visible to.',
                    })}
                  >
                    <Select
                      disabled={saving}
                      loading={groupsLoading}
                      maxTagCount={3}
                      mode="multiple"
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

            <Row align="middle" style={{ marginBottom: 20, marginTop: 70 }}>
              <Col>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({ defaultMessage: '2.' })}
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Exclusions',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 5 }}>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Create exclusions for this offender to exclusion them from areas or premises.',
                  })}
                </Paragraph>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                  onClick={toggleAddExclusion}
                  style={{ color: 'red', marginLeft: 15, marginTop: -30 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Exclusion',
                  })}
                </Button>
              </Col>
            </Row>
            {bansData && bansData.length > 0 ? (
              <Row gutter={20}>
                <Col>
                  <Table
                    columns={[
                      {
                        dataIndex: 'location',
                        ellipsis: true,
                        key: 'location',
                        title: intl.formatMessage({
                          defaultMessage: 'Location',
                        }),
                      },
                      {
                        dataIndex: 'description',
                        ellipsis: true,
                        key: 'description',
                        title: intl.formatMessage({
                          defaultMessage: 'Description',
                        }),
                      },
                      {
                        dataIndex: 'Options',
                        key: 'Options',
                        render: (value, record) => (
                          <>
                            <Button
                              disabled={saving}
                              icon={
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  style={{ marginRight: 5 }}
                                />
                              }
                              onClick={() => {
                                setBanData(record.item);
                                toggleEditExclusion();
                              }}
                            />
                            <Button
                              disabled={saving}
                              icon={
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ marginRight: 5 }}
                                />
                              }
                              onClick={() => {
                                deleteConfirm(record.key || '');
                              }}
                            />
                          </>
                        ),
                        title: intl.formatMessage({
                          defaultMessage: 'Options',
                        }),
                        width: 100,
                      },
                    ]}
                    dataSource={bansData.map((ban) => ({
                      description: ban.description,
                      endDate: ban.endDate,
                      item: ban,
                      key: ban.id,
                      location: ban.location,
                    }))}
                    pagination={{
                      defaultPageSize: 20,
                      hideOnSinglePage: true,
                      pageSize: 20,
                    }}
                    size="small"
                  />
                </Col>
              </Row>
            ) : (
              <>
                <Row justify="start">
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage:
                        'There are no exclusions for this offender.',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
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
                    <Title level={4} style={{ marginBottom: 0 }}>
                      3.
                    </Title>
                  </Col>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                      {intl.formatMessage({
                        defaultMessage: 'Images',
                      })}
                    </Title>
                  </Col>
                  <Col>
                    <Paragraph
                      italic
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
                    >
                      {intl.formatMessage({
                        defaultMessage:
                          '- Please add any images that you have of the offender.',
                      })}
                    </Paragraph>
                  </Col>
                  <Col style={{ marginLeft: 30 }}>
                    <Upload
                      beforeUpload={beforeUpload}
                      customRequest={customRequest}
                      fileList={fileList}
                      onChange={imgChange}
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
                        })}
                      </Button>
                    </Upload>
                  </Col>
                </Row>

                <Form.Item name="images">
                  <Upload
                    accept=".png,.jpeg,.webp"
                    beforeUpload={beforeUpload}
                    customRequest={customRequest}
                    fileList={fileList}
                    listType="picture-card"
                    onChange={imgChange}
                  >
                    {fileList.length < 10 &&
                      intl.formatMessage({
                        defaultMessage: '+ Upload',
                      })}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
                <Col>
                  <Button disabled={saving} onClick={onClose}>
                    {intl.formatMessage({
                      defaultMessage: 'Cancel',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    htmlType="submit"
                    loading={saving}
                    type="primary"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Save',
                    })}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
          <Drawer
            onClose={toggleAddOffenderTag}
            open={addOffenderTag}
            title={intl.formatMessage({
              defaultMessage: 'Add Offender Warning',
            })}
            width="400"
          >
            {addOffenderTag ? (
              <AddOffenderTag
                onClose={toggleAddOffenderTag}
                update={updateNewOffenderTagData}
              />
            ) : (
              <div />
            )}
          </Drawer>
          <Drawer
            onClose={toggleAddExclusion}
            open={addExclusion}
            title={intl.formatMessage({
              defaultMessage: 'Add Exclusion',
            })}
            width="400"
          >
            {addExclusion ? (
              <AddExclusion
                onClose={toggleAddExclusion}
                update={updateExclusion}
              />
            ) : (
              <div />
            )}
          </Drawer>
          <Drawer
            onClose={toggleEditExclusion}
            open={editExclusion}
            title={intl.formatMessage({
              defaultMessage: 'Edit Exclusion',
            })}
            width="400"
          >
            {editExclusion ? (
              <EditExclusion
                banData={banData}
                onClose={toggleEditExclusion}
                update={updateExclusion}
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
