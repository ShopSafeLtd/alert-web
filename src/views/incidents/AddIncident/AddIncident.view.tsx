import React from 'react';
import type {
  AddressesQuery,
  CreateTagMutation,
  ListGoodsTypesQuery,
  ListOffendersQuery,
} from 'graphql/generated';
import { TagType } from 'graphql/generated';
import type {
  CrimeGroupData,
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
import useStyles from './AddIncident.styles';

const { Title, Paragraph, Text } = Typography;

interface OffenderData extends GlobalOffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
}

interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeNo?: string;
  policeRef?: string;
  business: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tags: string[];
  images?: { id: string; url: string; optimised: string }[];
  goods: {
    goodsType?: string;
    value?: number;
    recoveredValue: number;
  }[];
  profiles: OffenderData[];
  involvedTags: [];
  fellingTags: [];
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
    new?: boolean;
  }[];
}

interface Props {
  addIncidentTag: boolean;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  fileList: Image[];
  form: FormInstance<FormData>;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  isTheft: boolean;
  newImage: Image | null;
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
  removeCrimeGroup: (crimeGroupId: string) => void;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAssignToImage: (image: Image) => void;
  setSearchOffenders: (value: string) => void;
  tags: { value: string; label: string; tooltip: string; type: TagType }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  onAddOffender: (value: GlobalOffenderData, existing: boolean) => void;
  updateVehiclesData: (value: VehicleData) => void;
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
}

const EditIncident = ({
  addIncidentTag,
  assignOffendersToImages,
  beforeUpload,
  crimeGroupsData,
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
  removeCrimeGroup,
  removeImage,
  removeImageFromOffender,
  removeOffender,
  removeVehicle,
  saving,
  searchOffenders,
  setAssignToImage,
  setSearchOffenders,
  tags,
  tagsLoading,
  toggleAddIncidentTag,
  updateCrimeGroupsData,
  updateIncidentTag,
  onAddOffender,
  updateVehiclesData,
  vehiclesData,
  addNewAddress,
  toggleAddNewAddress,
  updateNewAddressData,
  newAddressData,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="page-view">
      <PageHeader onBack={() => window.history.back()} title="Add Incident" />
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
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                What incident are you reporting?
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Select a the types that apply to this incident.
              </Paragraph>
            </Col>
          </Row>
          <Form.Item
            name="tags"
            tooltip="Select the relevant crime types for this incident, these help to categorise the incident."
            rules={[
              {
                required: true,
                message: 'Please add at least one crime type.',
              },
            ]}
            label="Incident Type"
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
            tooltip="Select the relevant crime types for this incident, these help to categorise the incident,"
            label="Did this incident involve any of the following?"
            rules={[
              {
                required: true,
                message: 'Please select an option for this field',
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
            tooltip="Select the relevant crime types for this incident, these help to categorise the incident,"
            label="How did this make you feel?"
            rules={[
              {
                required: true,
                message: 'Please select an option for this field',
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
                2.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Where & When did this incident happen?
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Select a the business that this incident relates to.
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Row gutter={64} align="middle">
                <Col>
                  <Form.Item
                    name="business"
                    label="Business"
                    rules={[
                      {
                        required: !newAddressData,
                        message: 'Please select a business for the incident.',
                      },
                    ]}
                  >
                    <DebounceSelect
                      showSearch
                      allowClear
                      disabled={saving}
                      placeholder="Search for a business..."
                      fetchOptions={onSearchBusiness}
                      style={{ width: 300 }}
                    />
                    <Button
                      style={{ color: 'red', marginLeft: 5 }}
                      onClick={toggleAddNewAddress}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Enter Address
                    </Button>
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
            </Col>
          </Row>
          {newAddressData && (
            <>
              <Row gutter={8}>
                <Col>
                  <Title level={4} style={{ fontSize: 15, marginTop: 5 }}>
                    Location:
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
                    style={{ color: 'red', marginLeft: 5 }}
                    onClick={() => updateNewAddressData(undefined)}
                    icon={
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Clear Address
                  </Button>
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
                  3.
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  What goods were involved?
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  - Please provide information about the lost/recovered goods.
                </Paragraph>
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

        {/* Profiles */}
        <Card
          className={classes.card}
          style={{ opacity: formStages.profiles ? 1 : 0.7 }}
        >
          {!formStages.profiles && <div className={classes.cardOverlay} />}
          <Form.Item name="profiles">
            <Profiles
              crimeGroupsData={crimeGroupsData}
              offenderImgChange={offenderImgChange}
              offendersData={offendersData}
              recentOffenderData={recentOffenderData}
              recentOffenderLoading={recentOffenderLoading}
              removeCrimeGroup={removeCrimeGroup}
              removeOffender={removeOffender}
              removeVehicle={removeVehicle}
              saving={saving}
              searchOffenders={searchOffenders}
              setSearchOffenders={setSearchOffenders}
              titleOrder={isTheft ? 4 : 3}
              updateCrimeGroupsData={updateCrimeGroupsData}
              updateOffender={() => {}}
              updateVehiclesData={updateVehiclesData}
              vehiclesData={vehiclesData}
              onAddOffender={onAddOffender}
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
                {isTheft ? 6 : 5}.
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
                valuePropName="checked"
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
                valuePropName="checked"
                tooltip="Did the police attend this incident."
                label="Did the police attend this incident?"
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
                tooltip="The collar number of the officers involved in this incident."
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
                    {isTheft ? 8 : 7}.
                  </Title>
                </Col>
                <Col>
                  <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                    Who is this incident relevant to?
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
                      placeholder="Select groups..."
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
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving || !formStages.details}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Create Incident
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title="Add Crime Type"
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
        title="Enter Address"
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
