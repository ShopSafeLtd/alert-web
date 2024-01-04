import React from 'react';
import type { ListVehiclesQuery } from 'graphql/generated';

import type { FormInstance } from 'antd';
import {
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
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={reportOnly ? undefined : () => window.history.back()}
        title={intl.formatMessage({
          defaultMessage: 'Add Offender',
          id: 'm3ChN4',
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
          />
        </Card>
        <Card>
          <Row align="middle" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                {intl.formatMessage({ defaultMessage: '2. ', id: 'Gi8z4T' })}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Addresses',
                  id: 'xBrtnx',
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
                  id: '0u8zRc',
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
                  id: '753yX5',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'A friendly name for the address to identify it, such as home',
                  id: 'YI+p4u',
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
                  id: 'oS/nae',
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
                  id: 'BaIwdV',
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
                  id: 'byaTQZ',
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
                  id: 'B+KJhc',
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
                  id: 'FJhjgz',
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
                "You haven't added any exclusion for this offender yet.",
              id: 'dE8QLQ',
            })}
          />
        )}
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
        {groups.length > 1 && (
          <Card>
            <>
              <Row align="bottom" style={{ marginBottom: 30 }}>
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    {adminRights ? '6.' : '4.'}
                  </Title>
                </Col>
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Who is it visible to?',
                      id: 'wvg3HJ',
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
                      id: '36xlXI',
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
                      id: '3lRewT',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select the content groups that you would like this offender to be visible to.',
                      id: 'cfTvTq',
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
                      id: '+66o7X',
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
                      id: 'Fraazv',
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
                      id: 'i0xkcf',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage: `Enter a justification to explain why this offender doesn't connect with an incident.`,
                      id: 'P7rUrU',
                    })}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter a justification for the offender.',
                          id: '11rxZC',
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
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: '47FYwb',
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
                {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Potential Offenders',
          id: 'KMCham',
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
