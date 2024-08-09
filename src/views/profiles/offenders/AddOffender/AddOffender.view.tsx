import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
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

import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import OffenderExclusions from 'components/offenders/OffenderForm/OffenderExclusions';
import OffenderImage from 'components/offenders/OffenderForm/OffenderImage';
import Profiles from 'components/offenders/OffenderForm/Profiles';
import PotentialOffenders from 'components/offenders/potentialOffenders';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddOffender';

const { Paragraph, Title } = Typography;

interface Props {
  addCustomGallery: boolean;
  addExclusion: boolean;
  addOffenderTag: boolean;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanData | null;
  bansData: BanData[];
  // onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  deleteConfirm: (value: string | undefined) => void;
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
  editExclusion: boolean;
  editImage: Image | null;
  fileList: UploadFile[];
  form: FormInstance<FormData> | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  listVehiclesData: ListVehiclesQuery | undefined;
  loading: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddVehicle: (value: VehicleData, existing: boolean) => void;
  onEditImage: (value: Image) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSearchOffender: () => void;
  onSubmit: (value: FormData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  potentialOffenders: OffenderData[];
  primaryImage: string;
  reportOnly: boolean;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanData | null) => void;
  setPrimaryImage: (value: string) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddCustomGallery: () => void;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;
  toggleViewPotentialOffenders: () => void;
  updateExclusion: (value: BanData) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
  vehiclesData: VehicleData[];
  viewPotentialOffenders: boolean;
}

const AddOffender = ({
  addCustomGallery,
  addExclusion,
  addOffenderTag,
  adminRights,
  ageCheck,
  banData,
  bansData,
  // onPreview,
  beforeUpload,
  crimeGroupsData,
  customGalleries,
  customGalleriesLoading,
  deleteConfirm,
  documentList,
  documentUploadProps,
  editExclusion,
  editImage,
  fileList,
  form,
  groups,
  groupsLoading,
  idVerified,
  imgChange,
  listVehiclesData,
  loading,
  needJustification,
  offenderSettings,
  onAddCrimeGroup,
  onAddVehicle,
  onEditImage,
  onRemoveCrimeGroup,
  onRemoveImage,
  onRemoveVehicle,
  onSearchOffender,
  onSubmit,
  onValuesChange,
  potentialOffenders,
  primaryImage,
  reportOnly,
  saving,
  setAgeCheck,
  setBanData,
  setPrimaryImage,
  tags,
  tagsLoading,
  toggleAddCustomGallery,
  toggleAddExclusion,
  toggleAddOffenderTag,
  toggleEditExclusion,
  toggleEditImage,
  toggleViewPotentialOffenders,
  updateExclusion,
  updateNewCustomGalleryData,
  updateNewOffenderTagData,
  vehiclesData,
  viewPotentialOffenders,
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
          initialValues={{
            idVerified: false,
          }}
          layout="vertical"
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
        >
          <Card>
            <OffenderDetails
              addCustomGallery={addCustomGallery}
              addOffenderTag={addOffenderTag}
              adminRights={adminRights}
              ageCheck={ageCheck}
              customGalleries={customGalleries}
              customGalleriesLoading={customGalleriesLoading}
              idVerified={idVerified}
              offenderSettings={offenderSettings}
              onSearchOffender={onSearchOffender}
              potentialOffenders={
                potentialOffenders ? potentialOffenders.length : 0
              }
              saving={saving}
              setAgeCheck={setAgeCheck}
              tags={tags}
              tagsLoading={tagsLoading}
              toggleAddCustomGallery={toggleAddCustomGallery}
              toggleAddOffenderTag={toggleAddOffenderTag}
              toggleViewPotentialOffenders={toggleViewPotentialOffenders}
              updateNewCustomGalleryData={updateNewCustomGalleryData}
              updateNewOffenderTagData={updateNewOffenderTagData}
            />
          </Card>
          <Card>
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({ defaultMessage: '2. ' })}
                </Title>
              </Col>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Addresses',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 10 }}>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
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
                  label={intl.formatMessage({
                    defaultMessage: 'Label',
                  })}
                  name="addressAlias"
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
                  label={intl.formatMessage({
                    defaultMessage: 'Building',
                  })}
                  name="building"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Street',
                  })}
                  name="street"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Town/City',
                  })}
                  name="townCity"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'County',
                  })}
                  name="county"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Postcode',
                  })}
                  name="postcode"
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
                crimeGroupsData={crimeGroupsData}
                listVehiclesData={listVehiclesData}
                onAddCrimeGroup={onAddCrimeGroup}
                onAddVehicle={onAddVehicle}
                onRemoveCrimeGroup={onRemoveCrimeGroup}
                onRemoveVehicle={onRemoveVehicle}
                saving={saving}
                titleNumber={3}
                vehiclesData={vehiclesData}
              />
            </Card>
          )}

          {adminRights && (
            <OffenderExclusions
              addExclusion={addExclusion}
              banData={banData}
              bansData={bansData}
              deleteConfirm={deleteConfirm}
              editExclusion={editExclusion}
              emptyDescription={intl.formatMessage({
                defaultMessage:
                  "You haven't added any outcomes for this offender yet.",
              })}
              onAddExclusion={updateExclusion}
              onUpdateExclusion={updateExclusion}
              saving={saving}
              setBanData={setBanData}
              titleOrder={4}
              toggleAddExclusion={toggleAddExclusion}
              toggleEditExclusion={toggleEditExclusion}
            />
          )}
          {offenderSettings.images && (
            <OffenderImage
              // onPreview={onPreview}
              beforeUpload={beforeUpload}
              documentList={documentList}
              documentUploadProps={documentUploadProps}
              editImage={editImage}
              fileList={fileList}
              imgChange={imgChange}
              onEditImage={onEditImage}
              onRemoveImage={onRemoveImage}
              primaryImage={primaryImage}
              setPrimaryImage={setPrimaryImage}
              titleOrder={adminRights ? 5 : 3}
              toggleEditImage={toggleEditImage}
            />
          )}
          {groups.length > 1 && (
            <Card>
              <>
                <Row align="bottom" style={{ marginBottom: 30 }}>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0 }}>
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
                      italic
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
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
                      label={intl.formatMessage({
                        defaultMessage: 'Content Groups',
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
                          'Select the content groups that you would like this offender to be visible to.',
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
              </>
            </Card>
          )}
          {needJustification && (
            <Card>
              <>
                <Row align="bottom" style={{ marginBottom: 30 }}>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0 }}>
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
                      italic
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
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
                      label={intl.formatMessage({
                        defaultMessage: 'Justification',
                      })}
                      name="justification"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage:
                              'Please enter a justification for the offender.',
                          }),
                          required: true,
                        },
                      ]}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          "Enter a justification to explain why this offender doesn't connect with an incident.",
                      })}
                    >
                      <Input.TextArea disabled={saving} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            </Card>
          )}
          <Form.Item>
            <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
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
                  htmlType="submit"
                  loading={saving}
                  type="primary"
                >
                  {intl.formatMessage({ defaultMessage: 'Save' })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
      <Drawer
        onClose={toggleViewPotentialOffenders}
        open={viewPotentialOffenders}
        title={intl.formatMessage({
          defaultMessage: 'Potential Offenders',
        })}
        width="900"
      >
        <PotentialOffenders
          onClose={toggleViewPotentialOffenders}
          suggestedData={potentialOffenders}
        />
      </Drawer>
    </div>
  );
};
export default AddOffender;
