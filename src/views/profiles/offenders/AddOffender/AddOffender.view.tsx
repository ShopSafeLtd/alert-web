import React from 'react';
import type {
  CreateTagMutation,
  ImagePosition,
  ListVehiclesQuery,
} from 'graphql/generated';

import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {
  calcDuration,
  calcExpired,
} from 'utils/offender/get-offender-exclusion';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faPenToSquare,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/pro-light-svg-icons';
import type { MutationUpdaterFn } from '@apollo/client';

import type { BanData, CrimeGroupData, VehicleData } from 'types/DataType';
import Profiles from 'components/offenders/OffenderForm/Profiles';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import type { FormData } from './useAddOffender';

const { Title, Text, Paragraph } = Typography;

interface Image extends UploadFile {
  position?: ImagePosition;
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
  updateExclusion: (value: BanData) => void;
  adminRights: boolean;
  selectedItems: string[];
  setSelectedItems: (value: string[]) => void;
  form: FormInstance<FormData> | undefined;
  listVehiclesData: ListVehiclesQuery | undefined;
  vehiclesData: VehicleData[];
  crimeGroupsData: CrimeGroupData[];
  idVerified: boolean;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  onEditImage: (value: Image) => void;
  toggleEditImage: (value?: Image) => void;
  editImage: Image | null;
  onAddVehicle: (value: VehicleData, existing: boolean) => void;
  onEditVehicle: (value: VehicleData) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (value: UploadFile) => void;
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
  updateExclusion,
  adminRights,
  selectedItems,
  setSelectedItems,
  form,
  vehiclesData,
  crimeGroupsData,
  listVehiclesData,
  idVerified,
  onValuesChange,
  editImage,
  onEditImage,
  toggleEditImage,
  onAddCrimeGroup,
  onAddVehicle,
  onEditVehicle,
  onRemoveCrimeGroup,
  onRemoveVehicle,
  onRemoveImage,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader onBack={() => window.history.back()} title="Add Offender" />
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      onValuesChange={onValuesChange}
      initialValues={{
        idVerified: false,
      }}
    >
      <Card>
        <OffenderDetails
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          tags={tags}
          tagsLoading={tagsLoading}
          saving={saving}
          ageCheck={ageCheck}
          setAgeCheck={setAgeCheck}
          adminRights={adminRights}
          toggleAddOffenderTag={toggleAddOffenderTag}
          idVerified={idVerified}
        />
      </Card>
      <Card>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title style={{ marginBottom: 0 }} level={4}>
              2.{' '}
            </Title>
          </Col>
          <Col>
            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
              Addresses
            </Title>
          </Col>
          <Col style={{ marginRight: 10 }}>
            <Paragraph
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
              italic
            >
              - If there is a known address for the offender please enter it.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item name="addressAlias" label="Alias">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="building" label="Building">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="street" label="Street">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="townCity" label="Town/City">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item name="county" label="County">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="postcode" label="Postcode">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {adminRights && (
        <Card>
          {/* <Divider /> */}
          <Profiles
            saving={saving}
            vehiclesData={vehiclesData}
            crimeGroupsData={crimeGroupsData}
            listVehiclesData={listVehiclesData}
            titleNumber={3}
            onAddCrimeGroup={onAddCrimeGroup}
            onAddVehicle={onAddVehicle}
            onEditVehicle={onEditVehicle}
            onRemoveCrimeGroup={onRemoveCrimeGroup}
            onRemoveVehicle={onRemoveVehicle}
          />
        </Card>
      )}
      {adminRights && (
        <Card>
          {/* <Row gutter={5} style={{ marginTop: 50 }}>
          <Col flex={1}> */}
          <Row align="middle" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                4.{' '}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Exclusions
              </Title>
            </Col>
            <Col style={{ marginRight: 10 }}>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                - Create exclusions for this offender to exclusion them from
                areas or premises.
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
                    hideOnSinglePage: true,
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
                      key: 'type',
                      title: 'Type',
                      dataIndex: 'type',
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
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                          />
                          <Button
                            disabled={saving}
                            onClick={() => {
                              deleteConfirm(record.key);
                            }}
                            icon={<FontAwesomeIcon icon={faTrash} />}
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
                    type: ban.type,
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
                  description="You haven't add any exclusion for this offender yet."
                  style={{ marginLeft: 50 }}
                />
              </Row>
              {/* <Divider /> */}
            </>
          )}
        </Card>
      )}
      <Card>
        <Row>
          <Col>
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  5.{' '}
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
                  accept=".png,.jpeg,.webp"
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
                    Upload Image
                  </Button>
                </Upload>
              </Col>
            </Row>

            <Form.Item name="images">
              <Upload
                accept=".png,.jpeg,.webp"
                action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                listType="picture-card"
                fileList={fileList}
                onChange={imgChange}
                onPreview={onPreview}
                onRemove={onRemoveImage}
                beforeUpload={beforeUpload}
                // TODO
                // eslint-disable-next-line react/no-unstable-nested-components
                itemRender={(el, file: Image) => (
                  <Card
                    key={el.key}
                    bodyStyle={{
                      padding: 0,
                      overflow: 'hidden',
                      borderRadius: 10,
                    }}
                  >
                    <div style={{ height: 200, width: '100%' }}>
                      <Button
                        size="small"
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          padding: '6.5px 10px',
                          top: 5,
                          left: 5,
                        }}
                        onClick={() => toggleEditImage(file)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <WatermarkImage
                        position={file.position}
                        url={file.url || file.thumbUrl}
                      />
                    </div>
                  </Card>
                )}
              >
                {fileList.length < 10 && '+ Upload'}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {groups.length > 1 && (
        <Card>
          <>
            <Row align="bottom" style={{ marginBottom: 30 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  6.{' '}
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  Who is it visible to?
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  - Please select the groups that this incident is for
                </Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  name="groups"
                  label="Groups"
                  tooltip="Select the groups that you would like this offender to be visible to."
                  rules={[
                    {
                      required: true,
                      message:
                        'Please select at least one group for the offender.',
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
          </>
        </Card>
      )}

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
        <AddExclusion update={updateExclusion} onClose={toggleAddExclusion} />
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
          update={updateExclusion}
          onClose={toggleEditExclusion}
          banData={banData}
        />
      ) : (
        <div />
      )}
    </Drawer>

    <ImageEditor
      submitImage={onEditImage}
      onClose={() => toggleEditImage()}
      open={!!editImage}
      image={editImage}
    />
  </div>
);
export default AddOffender;
