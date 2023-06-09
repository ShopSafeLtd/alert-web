import React from 'react';
import type {
  CreateTagMutation,
  EditIncidentQuery,
  ImagePosition,
  ListGoodsTypesQuery,
  ListOffendersQuery,
} from 'graphql/generated';
import { CrimeType } from 'graphql/generated';

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
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddCrimeType';

import moment from 'moment';

import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import type { UploadChangeParam } from 'antd/lib/upload';
import type {
  OffenderData as OffenderDataGlobal,
  VehicleData,
} from 'types/DataType';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Title, Paragraph } = Typography;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  policeNo?: string;
  goods: {
    id: string;
    goodsType?: string;
    value?: number;
    recoveredValue: number;
  }[];
  business?: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tagsCrimeTypes: string[];
  tagsInvolved: string[];
  tagsImpact: string[];
  images: [{ id: string; url: string; optimised: string }];
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
}

interface EditImagePayload extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
  position: ImagePosition;
}

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface OffenderData extends OffenderDataGlobal {
  new: boolean;
  existing: boolean;
  edited: boolean;
  deleted: boolean;
}

interface Props {
  addIncidentTag: boolean;
  addRecentOffender: Offender | null;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderDataGlobal[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  data: EditIncidentQuery | undefined;
  fileList: Image[];
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  loading: boolean;
  newImage: Image | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onPreview: (value: Image) => void;
  onReject: () => void;
  onSubmit: (value: FormData) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  reviewed: boolean;
  saving: boolean;
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setAssignToImage: (image: Image) => void;
  setSearchOffenders: (value: string) => void;
  crimeTypes: { value: string; label: string }[];
  involvedTags: { value: string; label: string }[];
  impactTags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  vehiclesData: VehicleData[];
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onAddOffender: (offender: OffenderDataGlobal, existing: boolean) => void;
  onEditOffender: (offender: OffenderDataGlobal) => void;
  onRemoveOffender: (offenderId: string) => void;
  onEditImage: (value: EditImagePayload) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onEditVehicle: (data: VehicleData) => void;
  onRemoveVehicle: (vehicleId: string) => void;
}

const EditIncident = ({
  addIncidentTag,
  addRecentOffender,
  assignOffendersToImages,
  beforeUpload,
  data,
  fileList,
  goodsTypesData,
  groups,
  groupsLoading,
  imgChange,
  loading,
  newImage,
  offenderImgChange,
  offendersData,
  onCancelNewImage,
  onPreview,
  onReject,
  onSearchBusiness,
  onSubmit,
  recentOffenderData,
  recentOffenderLoading,
  removeImage,
  removeImageFromOffender,
  reviewed,
  saving,
  searchOffenders,
  setAddRecentOffender,
  setAssignToImage,
  setSearchOffenders,
  crimeTypes,
  involvedTags,
  impactTags,
  tagsLoading,
  toggleAddIncidentTag,
  updateIncidentTag,
  vehiclesData,
  onAddOffender,
  onEditOffender,
  onRemoveOffender,
  onEditImage,
  onAddVehicle,
  onEditVehicle,
  onRemoveVehicle,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={reviewed ? 'Review Incident' : 'Edit Incident'}
    />
    {loading ? (
      <Skeleton />
    ) : (
      <Form<FormData>
        onFinish={onSubmit}
        layout="vertical"
        initialValues={{
          subject: data?.incident?.subject,
          description: data?.incident?.description,
          date: moment(data?.incident?.date, 'YYYY-MM-DD,HH:mm:ss'),
          business: {
            label: data?.incident?.business?.name,
            value: data?.incident?.business?.id,
          },
          goods: data?.incident?.incidentItems.map((item) => ({
            id: item.id,
            goodsType: item.goodsType.id,
            value: item.value,
            recoveredValue: item.recoveredValue,
          })),
          policeInvolved: data?.incident?.policeInvolved || false,
          policeRef: data?.incident?.policeRef,
          policeNo: data?.incident?.policeNo,
          policeReported: data?.incident?.policeReported || false,
          building: data?.incident?.location?.building,
          street: data?.incident?.location?.street,
          townCity: data?.incident?.location?.townCity,
          county: data?.incident?.location?.county,
          postcode: data?.incident?.location?.postcode,
          groups:
            data?.incident?.groups && data?.incident?.groups.length > 0
              ? data?.incident?.groups.map(({ id }) => id)
              : [],
          tagsCrimeTypes:
            data?.incident?.crimeTypes && data?.incident?.crimeTypes.length > 0
              ? data?.incident?.crimeTypes.map(({ id }) => id)
              : [],
          tagsInvolved:
            data?.incident?.involvedTags &&
            data?.incident?.involvedTags.length > 0
              ? data?.incident?.involvedTags.map(({ id }) => id)
              : [],
          tagsImpact:
            data?.incident?.impactTags && data?.incident?.impactTags.length > 0
              ? data?.incident?.impactTags.map(({ id }) => id)
              : [],
        }}
      >
        <Card style={{ marginBottom: 10 }}>
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Incident Details
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col flex={1}>
              <Form.Item
                name="tagsCrimeTypes"
                label="Incident Type"
                tooltip="Select the relevant crime types for this incident, these help to categorise the incident,"
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
                  placeholder="Search for a crime type..."
                >
                  {crimeTypes.map((tag) => (
                    <Select.Option value={tag.value}>{tag.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item name="tagsInvolved" label="Aggravating Factors">
                <Select
                  loading={tagsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder="Search for a crime type..."
                >
                  {involvedTags.map((tag) => (
                    <Select.Option value={tag.value}>{tag.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item name="tagsImpact" label="Incident Impact">
                <Select
                  loading={tagsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder="Search for a crime type..."
                >
                  {impactTags.map((tag) => (
                    <Select.Option value={tag.value}>{tag.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <Form.Item name="subject" label="Subject">
                <Input style={{ width: 500 }} disabled={saving} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Time &amp; Date"
                tooltip="The date and time that the incident occurred."
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
                  format="HH:mm - DD/MM/YY"
                  showTime={{ showSecond: false, showNow: true }}
                  placeholder="Set Date &amp; Time"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            tooltip="A more detailed description of the incident."
            rules={[
              {
                required: true,
                message: 'Please enter a description for the incident.',
              },
            ]}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                2.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Location
              </Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item name="business" label="Business">
                <DebounceSelect
                  showSearch
                  allowClear
                  disabled={saving}
                  placeholder="Search for a business..."
                  fetchOptions={onSearchBusiness}
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4}>Address</Title>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="building" label="Building">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="street"
                label="Street"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a street for the incident.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="townCity"
                label="Town/City"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a town/city for the incident.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="county" label="County">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="postcode"
                label="Postcode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a postcode for the incident.',
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
                <Title style={{ marginBottom: 0 }} level={4}>
                  3.
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  What goods were involved?
                </Title>
              </Col>
            </Row>
            <Form.List
              name="goods"
              rules={[
                {
                  validator: async (rule, value) => {
                    if (value.length === 0) throw new Error('Something wrong!');
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Row key={key} gutter={8}>
                      {/* <Form.Item
                          // eslint-disable-next-line
                          {...restField}
                          style={{  display: 'none' }}
                          name={[name, 'id']}
                        >
                          <Input />
                        </Form.Item> */}
                      <Col>
                        <Form.Item
                          // eslint-disable-next-line
                          {...restField}
                          label={index ? '' : 'Type of Goods'}
                          name={[name, 'goodsType']}
                          rules={[
                            {
                              required: index === 0,
                              message: 'Please enter a type',
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select goods..."
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
                          // eslint-disable-next-line
                          {...restField}
                          name={[name, 'value']}
                          label={index ? '' : 'Value'}
                          rules={[
                            {
                              required: index === 0,
                              message: 'Please enter a value',
                            },
                          ]}
                          tooltip="The value of the goods involved in the incident, both lost and recovered."
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
                          // eslint-disable-next-line
                          {...restField}
                          name={[name, 'recoveredValue']}
                          label={index ? '' : 'Value Recovered'}
                          rules={[
                            {
                              required: index === 0,
                              message: 'Please enter a value',
                            },
                          ]}
                          tooltip="The value of the goods that were recovered."
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
                          Add Item
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
              <Title style={{ marginBottom: 0 }} level={4}>
                4.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Police involvement
              </Title>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col>
              <Form.Item
                name="policeReported"
                tooltip="The incident has been reported to the police"
                label="Was this incident reported to the police?"
              >
                <Radio.Group
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  optionType="button"
                  disabled={saving}
                />
              </Form.Item>
              <Form.Item
                name="policeInvolved"
                tooltip="The police have been involved in the incident."
                label="Were the police involved in this incident?"
              >
                <Radio.Group
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  optionType="button"
                  disabled={saving}
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="policeRef"
                label="Crime Ref No."
                tooltip="The crime reference number provided by the police."
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item
                name="policeNo"
                label="Officer Collar No."
                tooltip="The collar number of the officer(s) involved."
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Profiles
            offenderImgChange={offenderImgChange}
            offendersData={offendersData}
            recentOffenderData={recentOffenderData}
            recentOffenderLoading={recentOffenderLoading}
            removeOffender={onRemoveOffender}
            saving={saving}
            searchOffenders={searchOffenders}
            setSearchOffenders={setSearchOffenders}
            titleOrder={5}
            updateOffender={onEditOffender}
            onAddOffender={onAddOffender}
            onAddVehicle={onAddVehicle}
            onEditVehicle={onEditVehicle}
            onRemoveVehicle={onRemoveVehicle}
            vehiclesData={vehiclesData}
          />
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <ImageSection
            titleOrder={6}
            imgChange={imgChange}
            fileList={fileList}
            beforeUpload={beforeUpload}
            setAssignToImage={setAssignToImage}
            removeImageFromOffender={removeImageFromOffender}
            removeImage={removeImage}
            onPreview={onPreview}
            onEditImage={onEditImage}
          />
        </Card>
        {/* {groups.length > 1 && ( */}
        <Card style={{ marginBottom: 10 }}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                7.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Who is it visible to?
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Please select the groups that this incident is for.
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="groups"
                label="Groups"
                tooltip="Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups."
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
        </Card>
        {/* )} */}
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button
                disabled={saving}
                onClick={() => (reviewed ? onReject() : window.history.back())}
              >
                {reviewed ? 'Reject' : 'Cancel'}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {reviewed ? 'Approve' : 'Save'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
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
    <Modal
      onCancel={() => setAddRecentOffender(null)}
      visible={addRecentOffender !== null}
      onOk={() => {
        if (addRecentOffender) onAddOffender(addRecentOffender, true);
        setAddRecentOffender(null);
      }}
      okText="Add to incident"
      title={`Are you sure you want to add ${addRecentOffender?.name}?`}
      bodyStyle={{
        padding: 0,
      }}
    >
      <Row>
        {addRecentOffender && addRecentOffender.images.length > 0 && (
          <Col span={8}>
            <div
              style={{
                width: 180,
                height: 200,
              }}
            >
              <WatermarkImage url={addRecentOffender?.images[0]?.optimised} />
            </div>
          </Col>
        )}
        <Col span={16} style={{ padding: '10px 20px' }}>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Age">
              {getOffenderAge(addRecentOffender?.age)}
            </Descriptions.Item>
            <Descriptions.Item label="Build">
              {getOffenderBuild(addRecentOffender?.build) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Ethnicity">
              {getOffenderRace(addRecentOffender?.race)}
            </Descriptions.Item>
            <Descriptions.Item label="Sex">
              {getOffenderGender(addRecentOffender?.gender) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Hair">
              {addRecentOffender?.hair || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Peculiarities">
              {addRecentOffender?.peculiarities || 'Unknown'}
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

export default EditIncident;
