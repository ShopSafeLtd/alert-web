/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx */
import React from 'react';
import type {
  AddressesQuery,
  CreateTagMutation,
  ListGoodsTypesQuery,
  ListOffendersQuery,
} from 'graphql/generated';
import { TagType } from 'graphql/generated';
import type {
  LocationData,
  OffenderData as GlobalOffenderData,
  VehicleData,
} from 'types/DataType';

import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  PageHeader,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddCrimeType';
import moment from 'moment';
import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import type { UploadChangeParam } from 'antd/lib/upload';
import IncidentDetails from 'components/incidents/IncidentForm/IncidentDetails';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import AddLocation from 'components/form-components/incident/location/AddLocation';
import { useIntl } from 'react-intl';
import useStyles from './AddIncident.styles';
import type { FormData, NewImage } from './useAddIncident';

const { Title, Paragraph, Text } = Typography;

interface OffenderData extends GlobalOffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
}

interface Props {
  addIncidentTag: boolean;
  assignOffendersToImages: (data: {
    image: NewImage;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: NewImage[];
  form: FormInstance<FormData>;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  isTheft: boolean;
  newImage: NewImage | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: {
    image: NewImage;
    offenderId: string;
  }) => void;
  removeOffender: (offenderId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAssignToImage: (image: NewImage) => void;
  setSearchOffenders: (value: string) => void;
  tags: { value: string; label: string; tooltip: string; type: TagType }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  onAddOffender: (value: GlobalOffenderData, existing: boolean) => void;
  vehiclesData: VehicleData[];
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  addNewAddress: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
  newAddressData: LocationData | undefined;
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  onEditImage: (value: NewImage) => void;
  onAddVehicle: (value: VehicleData, existing: boolean) => void;
  onEditVehicle: (value: VehicleData) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
}

const EditIncident = ({
  addIncidentTag,
  assignOffendersToImages,
  beforeUpload,
  fileList,
  form,
  formStages,
  goodsTypesData,
  groups,
  groupsLoading,
  imgChange,
  isTheft,
  newImage,
  offenderImgChange,
  offendersData,
  onCancelNewImage,
  onSearchBusiness,
  onSubmit,
  onValuesChange,
  primaryAddress,
  recentOffenderData,
  recentOffenderLoading,
  removeImage,
  removeImageFromOffender,
  removeOffender,
  saving,
  searchOffenders,
  setAssignToImage,
  setSearchOffenders,
  tags,
  tagsLoading,
  toggleAddIncidentTag,
  updateIncidentTag,
  onAddOffender,
  vehiclesData,
  addNewAddress,
  toggleAddNewAddress,
  updateNewAddressData,
  newAddressData,
  dontKnowGoods,
  goodsVisible,
  knowGoods,
  onEditImage,
  onAddVehicle,
  onRemoveVehicle,
  primaryImage,
  setPrimaryImage,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={intl.formatMessage({
          defaultMessage: 'Add Incident',
          id: 'kG1p3q',
        })}
      />
      <Form<FormData>
        form={form}
        initialValues={{
          fullAddress: primaryAddress?.full,
          date: moment(),
          involvedTags: [],
        }}
        onFinish={onSubmit}
        layout="vertical"
        onValuesChange={onValuesChange}
      >
        {/* Crime Types */}
        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage({
                  defaultMessage: 'What incident are you reporting?',
                  id: 'hyvrCv',
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
                    '- Select the types that apply to this incident.',
                  id: '1VKite',
                })}
              </Paragraph>
            </Col>
          </Row>
          <Form.Item
            name="tags"
            tooltip={intl.formatMessage({
              defaultMessage:
                'Select the relevant crime types for this incident, these help to categorize the incident.',
              id: 'KxHHjU',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please add at least one crime type.',
                  id: 'eSRsUW',
                }),
              },
            ]}
            label={intl.formatMessage({
              defaultMessage: 'Incident Type',
              id: '3OwM2P',
            })}
          >
            <CheckTags
              loading={tagsLoading}
              // mode="multiple"
              options={tags.filter(
                (item) => item.type === TagType.IncidentCrimeType
              )}
            />
          </Form.Item>
          <Form.Item
            name="involvedTags"
            tooltip={intl.formatMessage({
              defaultMessage:
                'Select the relevant crime types for this incident, these help to categorize the incident.',
              id: 'KxHHjU',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Did this incident involve any of the following?',
              id: 'cSg8/M',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select an option for this field',
                  id: '1f5eBz',
                }),
              },
            ]}
          >
            <CheckTags
              loading={tagsLoading}
              options={tags.filter(
                (item) => item.type === TagType.IncidentInvolved
              )}
            />
          </Form.Item>
          <Form.Item
            name="fellingTags"
            tooltip={intl.formatMessage({
              defaultMessage:
                'Select the relevant crime types for this incident, these help to categorize the incident.',
              id: 'KxHHjU',
            })}
            label={intl.formatMessage({
              defaultMessage: 'How did this make you feel?',
              id: '05xT64',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select an option for this field',
                  id: '1f5eBz',
                }),
              },
            ]}
          >
            <CheckTags
              loading={tagsLoading}
              options={tags.filter(
                (item) => item.type === TagType.IncidentImpact
              )}
            />
          </Form.Item>
        </Card>

        {/* Where Where */}
        <Card
          className={classes.card}
          style={{ opacity: formStages.where ? 1 : 0.7 }}
        >
          {!formStages.where && <div className={classes.cardOverlay} />}
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                {intl.formatMessage(
                  {
                    defaultMessage: '2.',
                    id: 'VLt5sV',
                  },
                  {}
                )}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage(
                  {
                    defaultMessage: 'Where & When did this incident happen?',
                    id: 'oY9x8s',
                  },
                  {}
                )}
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                {intl.formatMessage(
                  {
                    defaultMessage:
                      '- Select a the business that this incident relates to.',
                    id: 'hCXJmL',
                  },
                  {}
                )}
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Row gutter={64} align="middle">
                <Col>
                  <Row>
                    <Col>
                      <Form.Item
                        name="business"
                        label={intl.formatMessage(
                          { defaultMessage: 'Business', id: 'w1Fanr' },
                          {}
                        )}
                      >
                        <DebounceSelect
                          showSearch
                          allowClear
                          disabled={saving}
                          placeholder={intl.formatMessage(
                            {
                              defaultMessage: 'Search for a business...',
                              id: 'qaJxSS',
                            },
                            {}
                          )}
                          fetchOptions={onSearchBusiness}
                          style={{ width: 300 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button
                        style={{ color: 'red', marginLeft: 5, marginTop: 30 }}
                        onClick={toggleAddNewAddress}
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        {intl.formatMessage(
                          { defaultMessage: 'Enter Address', id: 'kGBG2S' },
                          {}
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Form.Item
                    name="date"
                    label={intl.formatMessage(
                      { defaultMessage: 'Time & Date', id: 'rXTgTq' },
                      {}
                    )}
                    tooltip={intl.formatMessage(
                      {
                        defaultMessage:
                          'The date and time that the incident occurred.',
                        id: '4eTajC',
                      },
                      {}
                    )}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage(
                          {
                            defaultMessage:
                              'Please select a date for the incident.',
                            id: 'Cgy3GX',
                          },
                          {}
                        ),
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
                      placeholder={intl.formatMessage(
                        { defaultMessage: 'Set Date & Time', id: 'hQHL0E' },
                        {}
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          {newAddressData && (
            <>
              <Row gutter={8}>
                <Col>
                  <Title level={4} style={{ fontSize: 15, marginTop: 5 }}>
                    {intl.formatMessage(
                      { defaultMessage: 'Location:', id: 'A5vVzY' },
                      {}
                    )}
                  </Title>
                </Col>
              </Row>
              <Row align="middle" gutter={16}>
                <Col>
                  <Text>
                    {newAddressData?.building &&
                      `${newAddressData?.building}, `}
                    {`${newAddressData?.street}, `}
                    {`${newAddressData?.townCity}, `}
                    {newAddressData?.county && `${newAddressData?.county}, `}
                    {newAddressData?.postcode}
                  </Text>
                </Col>
                <Col className={classes.clearButton}>
                  <Button
                    style={{ marginLeft: 5 }}
                    onClick={() => updateNewAddressData(undefined)}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                  />
                </Col>
              </Row>
            </>
          )}
        </Card>

        {/* Goods */}
        {isTheft && (
          <Card
            className={classes.card}
            style={{ opacity: formStages.goods ? 1 : 0.7 }}
          >
            {!formStages.goods && <div className={classes.cardOverlay} />}
            <Row align="bottom" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({ defaultMessage: '3.', id: 'LOHgf/' })}
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  {goodsVisible
                    ? intl.formatMessage({
                        defaultMessage: 'What goods were involved?',
                        id: '6L5/Qv',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Do you know what goods were involved?',
                        id: '+eY3nZ',
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
                      '- Please provide information about the lost/recovered goods.',
                    id: '3kptQz',
                  })}
                </Paragraph>
              </Col>
            </Row>
            {goodsVisible ? (
              <Form.List
                name="goods"
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value.length === 0)
                        throw new Error(
                          intl.formatMessage({
                            defaultMessage: 'Something wrong!',
                            id: 'QL7Ixv',
                          })
                        );
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Row key={key} gutter={8}>
                        <Col>
                          <Form.Item
                            {...restField}
                            label={
                              index
                                ? ''
                                : intl.formatMessage({
                                    defaultMessage: 'Type of Goods',
                                    id: 'awr2tc',
                                  })
                            }
                            name={[name, 'goodsType']}
                            rules={[
                              {
                                required: index === 0,
                                message: intl.formatMessage({
                                  defaultMessage: 'Please enter a type',
                                  id: 'pd8FHc',
                                }),
                              },
                            ]}
                          >
                            <Select
                              placeholder={intl.formatMessage({
                                defaultMessage: 'Select goods...',
                                id: 'p4Hiyr',
                              })}
                              style={{ width: 300 }}
                              allowClear
                              options={goodsTypesData?.listGoodsTypes.goodsTypes.map(
                                (goodsType) => ({
                                  value: goodsType.id,
                                  label: goodsType.name,
                                })
                              )}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            label={
                              index
                                ? ''
                                : intl.formatMessage({
                                    defaultMessage: 'Value',
                                    id: 'GufXy5',
                                  })
                            }
                            rules={[
                              {
                                required: index === 0,
                                message: intl.formatMessage({
                                  defaultMessage: 'Please enter a value',
                                  id: 'Umf5pG',
                                }),
                              },
                            ]}
                            tooltip={intl.formatMessage({
                              defaultMessage:
                                'The value of the goods involved in the incident, both lost and recovered.',
                              id: 'MPzA66',
                            })}
                          >
                            <InputNumber
                              style={{ width: 150 }}
                              prefix="£"
                              precision={2}
                              min={0}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            {...restField}
                            name={[name, 'recoveredValue']}
                            label={
                              index
                                ? ''
                                : intl.formatMessage({
                                    defaultMessage: 'Value Recovered',
                                    id: 'FqEGSY',
                                  })
                            }
                            rules={[
                              {
                                required: index === 0,
                                message: intl.formatMessage({
                                  defaultMessage: 'Please enter a value',
                                  id: 'Umf5pG',
                                }),
                              },
                            ]}
                            tooltip={intl.formatMessage({
                              defaultMessage:
                                'The value of the goods that were recovered.',
                              id: 'JuhI7q',
                            })}
                          >
                            <InputNumber
                              style={{ width: 150 }}
                              prefix="£"
                              precision={2}
                              min={0}
                            />
                          </Form.Item>
                        </Col>
                        {fields.length > 1 && (
                          <Col>
                            <Button
                              style={{ marginTop: index === 0 ? 30 : 0 }}
                              size="small"
                              onClick={() => remove(name)}
                            >
                              <FontAwesomeIcon size="lg" icon={faTrash} />
                            </Button>
                          </Col>
                        )}
                      </Row>
                    ))}
                    <Form.Item>
                      <Row justify="center">
                        <Col>
                          <Button
                            onClick={() =>
                              add({
                                recoveredValue: 0,
                              })
                            }
                            block
                            icon={
                              <FontAwesomeIcon
                                style={{ marginRight: 8 }}
                                icon={faPlus}
                              />
                            }
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Add Item',
                              id: 'kNLPWW',
                            })}
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            ) : (
              <div style={{ paddingTop: 10, paddingBottom: 20 }}>
                <Row gutter={16}>
                  <Col>
                    <Button onClick={knowGoods} danger>
                      {intl.formatMessage({
                        defaultMessage: 'I know the goods involved',
                        id: '5RSz8i',
                      })}
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={dontKnowGoods}>
                      {intl.formatMessage({
                        defaultMessage: "I don't know the goods involved",
                        id: 'Syf67T',
                      })}
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          </Card>
        )}

        {/* Profiles */}
        <Card
          className={classes.card}
          style={{ opacity: formStages.profiles ? 1 : 0.7 }}
        >
          {!formStages.profiles && <div className={classes.cardOverlay} />}
          <Form.Item name="profiles">
            <Profiles
              offenderImgChange={offenderImgChange}
              offendersData={offendersData}
              recentOffenderData={recentOffenderData}
              recentOffenderLoading={recentOffenderLoading}
              removeOffender={removeOffender}
              saving={saving}
              searchOffenders={searchOffenders}
              setSearchOffenders={setSearchOffenders}
              titleOrder={isTheft ? 4 : 3}
              updateOffender={() => {}}
              vehiclesData={vehiclesData}
              onAddOffender={onAddOffender}
              onAddVehicle={onAddVehicle}
              onRemoveVehicle={onRemoveVehicle}
            />
          </Form.Item>
        </Card>

        {/* Images */}
        <Card
          className={classes.card}
          style={{ opacity: formStages.images ? 1 : 0.7 }}
        >
          {!formStages.images && <div className={classes.cardOverlay} />}
          <ImageSection
            titleOrder={isTheft ? 5 : 4}
            imgChange={imgChange}
            fileList={fileList}
            beforeUpload={beforeUpload}
            setAssignToImage={setAssignToImage}
            removeImageFromOffender={removeImageFromOffender}
            removeImage={removeImage}
            disabled={saving}
            onEditImage={onEditImage}
            primaryImage={primaryImage}
            setPrimaryImage={setPrimaryImage}
          />
        </Card>

        {/* Police */}
        <Card
          className={classes.card}
          style={{ opacity: formStages.police ? 1 : 0.7 }}
        >
          {!formStages.police && <div className={classes.cardOverlay} />}
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                {isTheft ? '6.' : '5.'}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Police involvement',
                  id: 'eMpXMz',
                })}
              </Title>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col>
              <Form.Item
                name="policeReported"
                valuePropName="checked"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'The incident has been reported to the police',
                  id: 'hLeud7',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Was this incident reported to the police?',
                  id: 'dVzhQl',
                })}
              >
                <Radio.Group
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      }),
                      value: true,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      }),
                      value: false,
                    },
                  ]}
                  optionType="button"
                  disabled={saving}
                />
              </Form.Item>
              <Form.Item
                name="policeInvolved"
                valuePropName="checked"
                tooltip={intl.formatMessage({
                  defaultMessage: 'Did the police attend this incident.',
                  id: '367usW',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Did the police attend this incident?',
                  id: 'GV2eOn',
                })}
              >
                <Radio.Group
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      }),
                      value: true,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      }),
                      value: false,
                    },
                  ]}
                  optionType="button"
                  disabled={saving}
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="policeRef"
                label={intl.formatMessage({
                  defaultMessage: 'Crime Ref No.',
                  id: 'lXj6/P',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'The crime reference number provided by the police.',
                  id: 'tMiPZU',
                })}
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item
                name="policeNo"
                label={intl.formatMessage({
                  defaultMessage: 'Officer Collar No.',
                  id: '6gfZFu',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'The collar number of the officers involved in this incident.',
                  id: 'erIvhR',
                })}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Details */}
        <Card
          className={classes.card}
          style={{ opacity: formStages.details ? 1 : 0.7 }}
        >
          {!formStages.details && <div className={classes.cardOverlay} />}
          <IncidentDetails number={isTheft ? 7 : 6} saving={saving} />
        </Card>

        {/* Groups */}
        {groups.length > 1 && (
          <Card
            className={classes.card}
            style={{ opacity: formStages.groups ? 1 : 0.7 }}
          >
            {!formStages.groups && <div className={classes.cardOverlay} />}
            <>
              <Row align="bottom" style={{ marginBottom: 20 }}>
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    {isTheft ? '8.' : '7.'}
                  </Title>
                </Col>
                <Col>
                  <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Who is this incident relevant to?',
                      id: 'EeN7DX',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Paragraph
                    style={{ marginBottom: 1, marginLeft: 5 }}
                    type="secondary"
                    italic
                  >
                    -{' '}
                    {intl.formatMessage({
                      defaultMessage:
                        'Please select the groups that this incident is for.',
                      id: 'G+tr7D',
                    })}
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item
                    name="groups"
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups.',
                      id: 'vi+XKb',
                    })}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please add at least one group that you would like this incident to be visible to.',
                          id: 'ukeLzq',
                        }),
                      },
                    ]}
                  >
                    <Select
                      loading={groupsLoading}
                      disabled={saving}
                      mode="multiple"
                      maxTagCount={3}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select groups...',
                        id: 'aVKXev',
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
            </>
          </Card>
        )}

        {/* Buttons */}
        <Form.Item>
          <Row style={{ marginTop: 10 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={() => window.history.back()}>
                {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving || !formStages.details}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create Incident',
                  id: 'qbNNUK',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Type',
          id: 'OAVeBQ',
        })}
        open={addIncidentTag}
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
        title={intl.formatMessage({
          defaultMessage: 'Enter Address',
          id: 'kGBG2S',
        })}
        open={addNewAddress}
        width="600"
        onClose={toggleAddNewAddress}
      >
        {addNewAddress && (
          <AddLocation
            onClose={toggleAddNewAddress}
            update={updateNewAddressData}
          />
        )}
      </Drawer>

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
