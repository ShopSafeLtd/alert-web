import React from 'react';
import type { ListVehiclesQuery } from 'graphql/generated';

import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Typography,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  TagData,
  VehicleData,
} from 'types/DataType';
import Profiles from 'components/offenders/OffenderForm/Profiles';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import OffenderExclusions from 'components/offenders/OffenderForm/OffenderExclusions';
import OffenderImage from 'components/offenders/OffenderForm/OffenderImage';

import type { FormData, Image } from './useAddOffender';

const { Title, Paragraph } = Typography;

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
  updateNewOffenderTagData: (values: TagData) => void;
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
  onRemoveImage: (imageId: string) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
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
  updateNewOffenderTagData,
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
  primaryImage,
  setPrimaryImage,
  customGalleries,
  customGalleriesLoading,
  addCustomGallery,
  toggleAddCustomGallery,
  updateNewCustomGalleryData,
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
          tags={tags}
          tagsLoading={tagsLoading}
          saving={saving}
          ageCheck={ageCheck}
          setAgeCheck={setAgeCheck}
          adminRights={adminRights}
          toggleAddOffenderTag={toggleAddOffenderTag}
          idVerified={idVerified}
          customGalleries={customGalleries}
          customGalleriesLoading={customGalleriesLoading}
          toggleAddCustomGallery={toggleAddCustomGallery}
          addOffenderTag={addOffenderTag}
          updateNewOffenderTagData={updateNewOffenderTagData}
          addCustomGallery={addCustomGallery}
          updateNewCustomGalleryData={updateNewCustomGalleryData}
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
            <Form.Item
              name="addressAlias"
              label="Label"
              tooltip="A friendly name for the address to identify it, such as home"
            >
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
        <OffenderExclusions
          addExclusion={addExclusion}
          toggleAddExclusion={toggleAddExclusion}
          onAddExclusion={updateExclusion}
          editExclusion={editExclusion}
          toggleEditExclusion={toggleEditExclusion}
          onUpdateExclusion={updateExclusion}
          bansData={bansData}
          banData={banData}
          setBanData={setBanData}
          deleteConfirm={deleteConfirm}
          saving={saving}
          titleOrder={4}
          emptyDescription={
            "You haven't add any exclusion for this offender yet."
          }
        />
      )}
      <OffenderImage
        titleOrder={adminRights ? 5 : 3}
        imgChange={imgChange}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        fileList={fileList}
        editImage={editImage}
        onEditImage={onEditImage}
        toggleEditImage={toggleEditImage}
        onRemoveImage={onRemoveImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
      />
      {groups.length > 1 && (
        <Card>
          <>
            <Row align="bottom" style={{ marginBottom: 30 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {adminRights ? 6 : 4}.
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
                  - Please select the groups that this offender is for
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
  </div>
);
export default AddOffender;
