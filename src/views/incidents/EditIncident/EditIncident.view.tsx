/* eslint-disable react/jsx-props-no-spreading */
import type { MutationUpdaterFn } from '@apollo/client';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { EditIncidentQuery } from 'graphql/incidents/queries/__generated__/edit-incident.generated';
import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import type { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import type {
  OffenderData as OffenderDataGlobal,
  VehicleData,
} from 'types/DataType';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  PageHeader,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddCrimeType';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { CrimeType } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import type { EditImage } from './useEditIncident';

const { Paragraph, Title } = Typography;

interface FormData {
  building: string;
  business?: {
    label: React.ReactNode;
    value: string;
  };
  county: string;
  date: Date;
  description: string;
  goods: {
    goodsType?: string;
    id: string;
    recoveredValue: number;
    value?: number;
  }[];
  groups: string[];
  images: [{ id: string; optimised: string; url: string }];
  policeInvolved?: boolean;
  policeNo?: string;
  policeRef?: string;
  policeReported?: boolean;
  postcode: string;
  recoveredValue?: number;
  street: string;
  subject: string;
  tagsCrimeTypes: string[];
  tagsImpact: string[];
  tagsInvolved: string[];
  townCity: string;
  value?: number;
}

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface OffenderData extends OffenderDataGlobal {
  deleted: boolean;
  edited: boolean;
  existing: boolean;
  new: boolean;
}

interface Props {
  addIncidentTag: boolean;
  addRecentOffender: Offender | null;
  assignOffendersToImages: (data: {
    image: EditImage;
    offenders: OffenderDataGlobal[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  crimeTypes: { label: string; value: string }[];
  data: EditIncidentQuery | undefined;
  fileList: EditImage[];
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  impactTags: { label: string; value: string }[];
  involvedTags: { label: string; value: string }[];
  loading: boolean;
  newImage: EditImage | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  // ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onAddOffender: (offender: OffenderDataGlobal, existing: boolean) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onCancelNewImage: () => void;
  onEditImage: (value: EditImage) => void;
  onEditOffender: (offender: OffenderDataGlobal) => void;
  onEditVehicle: (data: VehicleData) => void;
  onReject: () => void;
  onRemoveOffender: (offenderId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: {
    image: EditImage;
    offenderId: string;
  }) => void;
  reviewed: boolean;
  saving: boolean;
  // onSearchBusiness: (
  //   value: string
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setAssignToImage: (image: EditImage) => void;
  setPrimaryImage: (value: string) => void;
  setSearchOffenders: (value: string) => void;
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  vehiclesData: VehicleData[];
}

const EditIncident = ({
  addIncidentTag,
  addRecentOffender,
  assignOffendersToImages,
  crimeTypes,
  data,
  goodsTypesData,
  groups,
  groupsLoading,
  impactTags,
  involvedTags,
  loading,
  newImage,
  offendersData,
  onAddOffender,
  onCancelNewImage,
  onReject,
  // onSearchBusiness,
  onSubmit,
  reviewed,
  saving,
  setAddRecentOffender,
  tagsLoading,
  toggleAddIncidentTag,
  updateIncidentTag,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={
          reviewed
            ? intl.formatMessage({
                defaultMessage: 'Review Incident',
              })
            : intl.formatMessage({
                defaultMessage: 'Edit Incident',
              })
        }
      />
      {loading ? (
        <Skeleton />
      ) : (
        <Form<FormData>
          initialValues={{
            building: data?.incident?.location?.building,
            business: {
              label: data?.incident?.business?.name,
              value: data?.incident?.business?.id,
            },
            county: data?.incident?.location?.county,
            date: moment(data?.incident?.date, 'YYYY-MM-DD,HH:mm:ss'),
            description: data?.incident?.description,
            goods: data?.incident?.incidentItems.map((item) => ({
              // TODO: fix this
              goodsType: item.goodsType?.id || '',
              id: item.id,
              recoveredValue: item.recoveredValue,
              value: item.value,
            })),
            groups:
              data?.incident?.groups && data?.incident?.groups.length > 0
                ? data?.incident?.groups.map(({ id }) => id)
                : [],
            policeInvolved: data?.incident?.policeInvolved || false,
            policeNo: data?.incident?.policeNo,
            policeRef: data?.incident?.policeRef,
            policeReported: data?.incident?.policeReported || false,
            postcode: data?.incident?.location?.postcode,
            street: data?.incident?.location?.street,
            subject: data?.incident?.subject,
            tagsCrimeTypes:
              data?.incident?.crimeTypes &&
              data?.incident?.crimeTypes.length > 0
                ? data?.incident?.crimeTypes.map(({ id }) => id)
                : [],
            tagsImpact:
              data?.incident?.impactTags &&
              data?.incident?.impactTags.length > 0
                ? data?.incident?.impactTags.map(({ id }) => id)
                : [],
            tagsInvolved:
              data?.incident?.involvedTags &&
              data?.incident?.involvedTags.length > 0
                ? data?.incident?.involvedTags.map(({ id }) => id)
                : [],
            townCity: data?.incident?.location?.townCity,
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Card style={{ marginBottom: 10 }}>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Title level={4} style={{ marginBottom: 0 }}>
                  1.
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Incident Details',
                  })}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Incident Type',
                  })}
                  name="tagsCrimeTypes"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please add at least one incident type.',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the relevant incident types for this incident, these help to categorise the incident.',
                  })}
                >
                  <Select
                    disabled={saving}
                    loading={tagsLoading}
                    maxTagCount={3}
                    mode="multiple"
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a incident type...',
                    })}
                  >
                    {crimeTypes.map((tag) => (
                      <Select.Option key={tag.value} value={tag.value}>
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Aggravating Factors',
                  })}
                  name="tagsInvolved"
                >
                  <Select
                    disabled={saving}
                    loading={tagsLoading}
                    maxTagCount={3}
                    mode="multiple"
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a incident type...',
                    })}
                  >
                    {involvedTags.map((tag) => (
                      <Select.Option key={tag.value} value={tag.value}>
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Incident Impact',
                  })}
                  name="tagsImpact"
                >
                  <Select
                    disabled={saving}
                    loading={tagsLoading}
                    maxTagCount={3}
                    mode="multiple"
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a incident type...',
                    })}
                  >
                    {impactTags.map((tag) => (
                      <Select.Option key={tag.value} value={tag.value}>
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Subject',
                  })}
                  name="subject"
                >
                  <Input disabled={saving} style={{ width: 500 }} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Time & Date',
                  })}
                  name="date"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select a date for the incident.',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The date and time that the incident occurred.',
                  })}
                >
                  <DatePicker
                    disabled={saving}
                    disabledDate={(current) =>
                      current && current.valueOf() > Date.now()
                    }
                    format="HH:mm - DD/MM/YY"
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Set Date & Time',
                    })}
                    showTime={{ showNow: true, showSecond: false }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
              name="description"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please enter a description for the incident.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'A more detailed description of the incident.',
              })}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Title level={4} style={{ marginBottom: 0 }}>
                  2.
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Location',
                  })}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Business',
                  })}
                  name="business"
                >
                  <BusinessesSelect
                    allowClear
                    disabled={saving}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a business...',
                    })}
                    showSearch
                    style={{ width: 300 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Address',
              })}
            </Title>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Building',
                  })}
                  name="building"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Street',
                  })}
                  name="street"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a street for the incident.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Town/City',
                  })}
                  name="townCity"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a town/city for the incident.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'County',
                  })}
                  name="county"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Postcode',
                  })}
                  name="postcode"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a postcode for the incident.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {data?.incident?.crimeTypes
            .map((item) => item.crimeType)
            .includes(CrimeType.TheftHandling) && (
            <Card style={{ marginBottom: 10 }}>
              <Row align="bottom" style={{ marginBottom: 20 }}>
                <Col>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <Title level={4} style={{ marginBottom: 0 }}>
                    3.
                  </Title>
                </Col>
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                    {intl.formatMessage({
                      defaultMessage: 'What goods were involved?',
                    })}
                  </Title>
                </Col>
              </Row>
              <Form.List
                name="goods"
                rules={[
                  {
                    // eslint-disable-next-line
                    validator: async (rule, value) => {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      if (value.length === 0)
                        throw new Error(
                          intl.formatMessage({
                            defaultMessage: 'Something wrong!',
                          })
                        );
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Row gutter={8} key={key}>
                        <Col>
                          <Form.Item
                            {...restField}
                            label={
                              index
                                ? ''
                                : intl.formatMessage({
                                    defaultMessage: 'Type of Goods',
                                  })
                            }
                            name={[name, 'goodsType']}
                            rules={[
                              {
                                message: intl.formatMessage({
                                  defaultMessage: 'Please enter a type',
                                }),
                                required: index === 0,
                              },
                            ]}
                          >
                            <Select
                              allowClear
                              options={goodsTypesData?.listGoodsTypes.goodsTypes.map(
                                (goodsType) => ({
                                  label: goodsType.name,
                                  value: goodsType.id,
                                })
                              )}
                              placeholder={intl.formatMessage({
                                defaultMessage: 'Select goods...',
                              })}
                              style={{ width: 300 }}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            {...restField}
                            label={
                              index
                                ? ''
                                : intl.formatMessage({
                                    defaultMessage: 'Value',
                                  })
                            }
                            name={[name, 'value']}
                            rules={[
                              {
                                message: intl.formatMessage({
                                  defaultMessage: 'Please enter a value',
                                }),
                                required: index === 0,
                              },
                            ]}
                            tooltip={intl.formatMessage({
                              defaultMessage:
                                'The value of the goods involved in the incident, both lost and recovered.',
                            })}
                          >
                            <InputNumber
                              min={0}
                              precision={2}
                              prefix="£"
                              style={{ width: 150 }}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            {...restField}
                            label={
                              index
                                ? ''
                                : intl.formatMessage({
                                    defaultMessage: 'Value Recovered',
                                  })
                            }
                            name={[name, 'recoveredValue']}
                            rules={[
                              {
                                message: intl.formatMessage({
                                  defaultMessage: 'Please enter a value',
                                }),
                                required: index === 0,
                              },
                            ]}
                            tooltip={intl.formatMessage({
                              defaultMessage:
                                'The value of the goods that were recovered.',
                            })}
                          >
                            <InputNumber
                              min={0}
                              precision={2}
                              prefix="£"
                              style={{ width: 150 }}
                            />
                          </Form.Item>
                        </Col>
                        {fields.length > 1 && (
                          <Col>
                            <Button
                              onClick={() => remove(name)}
                              size="small"
                              style={{ marginTop: index === 0 ? 30 : 0 }}
                            >
                              <FontAwesomeIcon icon={faTrash} size="lg" />
                            </Button>
                          </Col>
                        )}
                      </Row>
                    ))}
                    <Form.Item>
                      <Row justify="center">
                        <Col>
                          <Button
                            block
                            icon={
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 8 }}
                              />
                            }
                            onClick={() =>
                              add({
                                recoveredValue: 0,
                              })
                            }
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Add Item',
                            })}
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
          )}
          <Card style={{ marginBottom: 10 }}>
            <Row align="bottom" style={{ marginBottom: 20 }}>
              <Col>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Title level={4} style={{ marginBottom: 0 }}>
                  4.
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Police involvement',
                  })}
                </Title>
              </Col>
            </Row>
            <Row gutter={50}>
              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Was this incident reported to the police?',
                  })}
                  name="policeReported"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The incident has been reported to the police',
                  })}
                >
                  <Radio.Group
                    disabled={saving}
                    optionType="button"
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Yes',
                        }),
                        value: true,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'No',
                        }),
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Were the police involved in this incident?',
                  })}
                  name="policeInvolved"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The police have been involved in the incident.',
                  })}
                >
                  <Radio.Group
                    disabled={saving}
                    optionType="button"
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Yes',
                        }),
                        value: true,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'No',
                        }),
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Crime Ref No.',
                  })}
                  name="policeRef"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The crime reference number provided by the police.',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Officer Collar No.',
                  })}
                  name="policeNo"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The collar number of the officer(s) involved.',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Row align="bottom" style={{ marginBottom: 20 }}>
              <Col>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Title level={4} style={{ marginBottom: 0 }}>
                  7.
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Who is it visible to?',
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
                      '- Please select the groups that this incident is for.',
                  })}
                </Paragraph>
              </Col>
            </Row>
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
                          'Please add at least one group that you would like this incident to be visible to.',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups.',
                  })}
                >
                  <Select
                    disabled={saving}
                    loading={groupsLoading}
                    maxTagCount={3}
                    mode="multiple"
                    placeholder={intl.formatMessage({
                      defaultMessage:
                        'Select the groups that you would like this incident to be visible to.',
                    })}
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
          </Card>
          <Form.Item>
            <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button
                  disabled={saving}
                  // eslint-disable-next-line
                  onClick={() =>
                    reviewed ? onReject() : window.history.back()
                  }
                >
                  {reviewed
                    ? intl.formatMessage({
                        defaultMessage: 'Reject',
                      })
                    : intl.formatMessage({
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
                  {reviewed
                    ? intl.formatMessage({
                        defaultMessage: 'Approve',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Save',
                      })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
      <Drawer
        onClose={toggleAddIncidentTag}
        open={addIncidentTag}
        title={intl.formatMessage({
          defaultMessage: 'Add Incident Type',
        })}
        width="400"
      >
        {addIncidentTag ? (
          <AddIncidentTag
            onClose={toggleAddIncidentTag}
            update={updateIncidentTag}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Modal
        bodyStyle={{
          padding: 0,
        }}
        okText={intl.formatMessage({
          defaultMessage: 'Add to incident',
        })}
        onCancel={() => setAddRecentOffender(null)}
        onOk={() => {
          // TODO fix this
          if (addRecentOffender)
            onAddOffender(
              {
                ...addRecentOffender,
                images: addRecentOffender.images.map((image) => ({
                  ...image,
                  policeImage: !!image.policeImage,
                  primary: !!image.primary,
                })),
              },
              true
            );
          setAddRecentOffender(null);
        }}
        open={addRecentOffender !== null}
        title={intl.formatMessage(
          {
            defaultMessage: 'Are you sure you want to add {name}?',
          },
          {
            name: addRecentOffender?.name,
          }
        )}
      >
        <Row>
          {addRecentOffender && addRecentOffender.images.length > 0 && (
            <Col span={8}>
              <div
                style={{
                  height: 200,
                  width: 180,
                }}
              >
                <WatermarkImage url={addRecentOffender?.images[0]?.optimised} />
              </div>
            </Col>
          )}
          <Col span={16} style={{ padding: '10px 20px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Age',
                })}
              >
                {getOffenderAge(addRecentOffender?.age)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Build',
                })}
              >
                {getOffenderBuild(addRecentOffender?.build) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Ethnicity',
                })}
              >
                {getOffenderRace(addRecentOffender?.race)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Sex',
                })}
              >
                {getOffenderGender(addRecentOffender?.gender) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Hair',
                })}
              >
                {addRecentOffender?.hair ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Characteristics',
                })}
              >
                {addRecentOffender?.peculiarities ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
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
};

export default EditIncident;
