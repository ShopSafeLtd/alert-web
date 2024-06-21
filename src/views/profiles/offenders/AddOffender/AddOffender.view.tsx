import React from 'react';

import type { FormInstance } from 'antd';
import {
  Skeleton,
  Drawer,
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
  Image,
  OffenderData,
  OffenderSettingsType,
  TagData,
  VehicleData,
} from 'types/DataType';
import Profiles from 'components/offenders/OffenderForm/Profiles';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import OffenderExclusions from 'components/offenders/OffenderForm/OffenderExclusions';
import OffenderImage from 'components/offenders/OffenderForm/OffenderImage';
import { useIntl } from 'react-intl';
import PotentialOffenders from 'components/offenders/potentialOffenders';
import type { FormData } from './useAddOffender';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/list-vehicles.generated';

const { Title, Paragraph } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  // onPreview: (value: UploadFile) => void;
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
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
  reportOnly: boolean;
  potentialOffenders: OffenderData[];
  viewPotentialOffenders: boolean;
  toggleViewPotentialOffenders: () => void;
  onSearchOffender: () => void;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType;
  loading: boolean;
}

const AddOffender = ({
  onSubmit,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  imgChange,
  // onPreview,
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
  documentList,
  documentUploadProps,
  reportOnly,
  potentialOffenders,
  viewPotentialOffenders,
  toggleViewPotentialOffenders,
  onSearchOffender,
  needJustification,
  offenderSettings,
  loading,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={reportOnly ? undefined : () => window.history.back()}
        title={intl.formatMessage({
          defaultMessage: 'Add Offender',
        })}
        // extra={[
        //   <Button
        //     key="1"
        //     type="primary"
        //     onClick={toggleViewPotentialOffenders}
        //     // disabled={saving}
        //   >
        //     {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
        //     {potentialOffenders ? potentialOffenders.length : 0}{' '}
        //     {intl.formatMessage({
        //       defaultMessage: 'Potential Offenders',
        //       id: 'KMCham',
        //     })}
        //   </Button>,
        // ]}
      />

      {loading ? (
        <Skeleton />
      ) : (
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
              potentialOffenders={
                potentialOffenders ? potentialOffenders.length : 0
              }
              toggleViewPotentialOffenders={toggleViewPotentialOffenders}
              onSearchOffender={onSearchOffender}
              offenderSettings={offenderSettings}
            />
          </Card>
          <Card>
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({ defaultMessage: '2. ' })}
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Addresses',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 10 }}>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- If there is a known address for the offender please enter it.',
                  })}
                </Paragraph>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item
                  name="addressAlias"
                  label={intl.formatMessage({
                    defaultMessage: 'Label',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'A friendly name for the address to identify it, such as home',
                  })}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="building"
                  label={intl.formatMessage({
                    defaultMessage: 'Building',
                  })}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="street"
                  label={intl.formatMessage({
                    defaultMessage: 'Street',
                  })}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="townCity"
                  label={intl.formatMessage({
                    defaultMessage: 'Town/City',
                  })}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item
                  name="county"
                  label={intl.formatMessage({
                    defaultMessage: 'County',
                  })}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="postcode"
                  label={intl.formatMessage({
                    defaultMessage: 'Postcode',
                  })}
                >
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
              emptyDescription={intl.formatMessage({
                defaultMessage:
                  "You haven't added any outcomes for this offender yet.",
              })}
            />
          )}
          {offenderSettings.images && (
            <OffenderImage
              titleOrder={adminRights ? 5 : 3}
              imgChange={imgChange}
              // onPreview={onPreview}
              beforeUpload={beforeUpload}
              fileList={fileList}
              editImage={editImage}
              onEditImage={onEditImage}
              toggleEditImage={toggleEditImage}
              onRemoveImage={onRemoveImage}
              primaryImage={primaryImage}
              setPrimaryImage={setPrimaryImage}
              documentList={documentList}
              documentUploadProps={documentUploadProps}
            />
          )}
          {groups.length > 1 && (
            <Card>
              <>
                <Row align="bottom" style={{ marginBottom: 30 }}>
                  <Col>
                    <Title style={{ marginBottom: 0 }} level={4}>
                      {adminRights
                        ? offenderSettings.images
                          ? // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                            '6.'
                          : // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                            '5.'
                        : offenderSettings.images
                        ? // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                          '4.'
                        : // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                          '3.'}
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
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
                      italic
                    >
                      {intl.formatMessage({
                        defaultMessage:
                          '- Please select the content groups that this offender is for',
                      })}
                    </Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      name="groups"
                      label={intl.formatMessage({
                        defaultMessage: 'Content Groups',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'Select the content groups that you would like this offender to be visible to.',
                      })}
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({
                            defaultMessage:
                              'Please select at least one group for the offender.',
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
              </>
            </Card>
          )}
          {needJustification && (
            <Card>
              <>
                <Row align="bottom" style={{ marginBottom: 30 }}>
                  <Col>
                    <Title style={{ marginBottom: 0 }} level={4}>
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {adminRights ? '7.' : '5.'}
                    </Title>
                  </Col>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                      {intl.formatMessage({
                        defaultMessage:
                          'Justification for adding the offender to Alert',
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
                          '- Please enter a justification for the offender',
                      })}
                    </Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <Form.Item
                      name="justification"
                      label={intl.formatMessage({
                        defaultMessage: 'Justification',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          "Enter a justification to explain why this offender doesn't connect with an incident.",
                      })}
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({
                            defaultMessage:
                              'Please enter a justification for the offender.',
                          }),
                        },
                      ]}
                    >
                      <Input.TextArea disabled={saving} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            </Card>
          )}
          <Form.Item>
            <Row style={{ marginTop: 10 }} gutter={10} justify="end">
              {!reportOnly && (
                <Col>
                  <Button
                    disabled={saving}
                    onClick={() => window.history.back()}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Cancel',
                    })}
                  </Button>
                </Col>
              )}
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  {intl.formatMessage({ defaultMessage: 'Save' })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Potential Offenders',
        })}
        open={viewPotentialOffenders}
        onClose={toggleViewPotentialOffenders}
        width="900"
      >
        <PotentialOffenders
          suggestedData={potentialOffenders}
          onClose={toggleViewPotentialOffenders}
        />
      </Drawer>
    </div>
  );
};
export default AddOffender;
