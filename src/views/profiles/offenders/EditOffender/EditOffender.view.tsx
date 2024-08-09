import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { ViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  Image,
  TagData,
  VehicleData,
} from 'types/DataType';

import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Form,
  PageHeader,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import EditOffenderAddress from 'components/form-components/addresses/EditOffenderAddress';
// import ProfileDrawer from 'components/offenders/OffenderForm/ProfileDrawer';
import NewOffenderAddress from 'components/form-components/addresses/NewOffenderAddress';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import OffenderExclusions from 'components/offenders/OffenderForm/OffenderExclusions';
import OffenderImage from 'components/offenders/OffenderForm/OffenderImage';
import Profiles from 'components/offenders/OffenderForm/Profiles';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

import type { BanType, FormData } from './useEditOffender';

const { Paragraph, Title } = Typography;

interface AddressForm {
  alias: string;
  building: string;
  county: string;
  postcode: string;
  street: string;
  townCity: string;
}

interface AddressesData {
  alias: string;
  building: string;
  county: string;
  id: string;
  postcode: string;
  street: string;
  townCity: string;
}

interface EditAddressForm {
  alias: string;
  building: string;
  county: string;
  id: string;
  postcode: string;
  street: string;
  townCity: string;
}

interface Props {
  addAddress: boolean;
  addCustomGallery: boolean;
  addExclusion: boolean;
  addOffenderTag: boolean;
  addressesData: AddressesData[] | null;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanType | null;
  bansData: BanType[];
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  data: ViewOffenderQuery | undefined;
  deleteConfirm: (value: string) => void;
  editAddress: null | string;
  editExclusion: boolean;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData> | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  listVehiclesData: ListVehiclesQuery | undefined;
  loading: boolean;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddExclusion: (value: BanData) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onDeleteAddress: (addressId: string) => void;
  onEditAddress: (data: EditAddressForm) => void;
  onEditImage: (value: Image) => void;
  onReject: () => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSubmit: (value: FormData) => void;
  onSubmitAddress: (data: AddressForm) => void;
  onUpdateExclusion: (value: BanData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  primaryImage: string;
  reviewed: boolean;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanType) => void;
  setPrimaryImage: (value: string) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddAddress: () => void;
  toggleAddCustomGallery: () => void;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditAddress: (value: null | string) => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
  vehiclesData: VehicleData[];
}

const EditOffender = ({
  addAddress,
  addCustomGallery,
  addExclusion,
  addOffenderTag,
  addressesData,
  adminRights,
  ageCheck,
  banData,
  bansData,
  beforeUpload,
  crimeGroupsData,
  customGalleries,
  customGalleriesLoading,
  data,
  deleteConfirm,
  editAddress,
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
  onAddCrimeGroup,
  onAddExclusion,
  onAddVehicle,
  onDeleteAddress,
  onEditAddress,
  onEditImage,
  onReject,
  onRemoveCrimeGroup,
  onRemoveImage,
  onRemoveVehicle,
  onSubmit,
  onSubmitAddress,
  onUpdateExclusion,
  onValuesChange,
  primaryImage,
  reviewed,
  saving,
  setAgeCheck,
  setBanData,
  setPrimaryImage,
  tags,
  tagsLoading,
  toggleAddAddress,
  toggleAddCustomGallery,
  toggleAddExclusion,
  toggleAddOffenderTag,
  toggleEditAddress,
  toggleEditExclusion,
  toggleEditImage,
  updateNewCustomGalleryData,
  updateNewOffenderTagData,
  vehiclesData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={
          reviewed
            ? intl.formatMessage({
                defaultMessage: 'Review Offender',
              })
            : intl.formatMessage({
                defaultMessage: 'Edit Offender',
              })
        }
      />
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Form
            form={form}
            initialValues={{
              age: data?.offender?.age || null,
              ageCheck: !!data?.offender?.dateOfBirth,
              alias: data?.offender?.alias || [],
              build: data?.offender?.build || null,
              customGalleries:
                data?.offender?.customGalleries &&
                data.offender.customGalleries.length > 0
                  ? data.offender.customGalleries.map(({ id }) => id)
                  : [],
              dateOfBirth: data?.offender?.dateOfBirth
                ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
                : null,
              dateSource: data?.offender?.dateSource || null,
              gender: data?.offender?.gender || null,
              groups:
                data?.offender?.groups && data?.offender?.groups.length > 0
                  ? data?.offender?.groups.map(({ id }) => id)
                  : [],
              hair: data?.offender?.hair || null,
              height: data?.offender?.height || null,
              idSource: data?.offender?.idSource,
              idVerified: data?.offender?.idVerified || false,
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
                offenderSettings={{
                  age: true,
                  alias: true,
                  build: true,
                  comment: true,
                  dateOfBirth: true,
                  dateOfBirthSource: true,
                  ethnicity: true,
                  gender: true,
                  hair: true,
                  height: true,
                  idVerified: true,
                  images: true,
                  name: true,
                  peculiarities: true,
                }}
                onSearchOffender={() => {}}
                potentialOffenders={0}
                saving={saving}
                setAgeCheck={setAgeCheck}
                tags={tags}
                tagsLoading={tagsLoading}
                toggleAddCustomGallery={toggleAddCustomGallery}
                toggleAddOffenderTag={toggleAddOffenderTag}
                toggleViewPotentialOffenders={() => {}}
                updateNewCustomGalleryData={updateNewCustomGalleryData}
                updateNewOffenderTagData={updateNewOffenderTagData}
              />
            </Card>
            {adminRights && (
              <Card>
                <Row align="middle" style={{ marginBottom: 20 }}>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Title level={4} style={{ marginBottom: 0 }}>
                      2.
                    </Title>
                  </Col>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                      {intl.formatMessage({
                        defaultMessage: 'Addresses',
                      })}
                    </Title>
                  </Col>
                  {adminRights && (
                    <>
                      <Col style={{ marginRight: 5 }}>
                        <Paragraph
                          italic
                          style={{ marginBottom: 1, marginLeft: 5 }}
                          type="secondary"
                        >
                          {intl.formatMessage({
                            defaultMessage:
                              '                          - Add any of the known addresses for the offender.',
                          })}
                        </Paragraph>
                      </Col>
                      <Col>
                        <Button
                          disabled={saving}
                          icon={
                            <FontAwesomeIcon
                              icon={faPlus}
                              style={{ marginRight: 5 }}
                            />
                          }
                          onClick={toggleAddAddress}
                          style={{
                            color: 'red',
                            marginLeft: 15,
                            marginTop: -30,
                          }}
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Add Address',
                          })}
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
                {addressesData && addressesData.length > 0 ? (
                  <Table
                    columns={[
                      {
                        dataIndex: 'alias',
                        key: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Label',
                        }),
                      },
                      {
                        dataIndex: 'street',
                        key: 'street',
                        title: intl.formatMessage({
                          defaultMessage: 'Street',
                        }),
                      },
                      {
                        dataIndex: 'townCity',
                        key: 'townCity',
                        title: intl.formatMessage({
                          defaultMessage: 'City',
                        }),
                      },
                      {
                        dataIndex: 'county',
                        key: 'county',
                        title: intl.formatMessage({
                          defaultMessage: 'County',
                        }),
                      },
                      {
                        dataIndex: 'postcode',
                        key: 'postcode',
                        title: intl.formatMessage({
                          defaultMessage: 'Postcode',
                        }),
                      },
                      {
                        dataIndex: 'Edit',
                        key: 'Edit',
                        render: (_, record) => (
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => toggleEditAddress(record.key)}
                          />
                        ),
                        title: intl.formatMessage({
                          defaultMessage: 'Edit',
                        }),
                        width: 50,
                      },
                      {
                        dataIndex: 'Delete',
                        key: 'Delete',
                        render: (_, record) => (
                          <Popconfirm
                            okText={intl.formatMessage({
                              defaultMessage: 'Delete',
                            })}
                            onConfirm={() => onDeleteAddress(record.key)}
                            overlayInnerStyle={{ padding: 10 }}
                            title={intl.formatMessage({
                              defaultMessage: 'Are you sure?',
                            })}
                          >
                            <Button
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                          </Popconfirm>
                        ),
                        title: intl.formatMessage({
                          defaultMessage: 'Delete',
                        }),
                        width: 60,
                      },
                    ]}
                    dataSource={
                      addressesData?.map((address) => ({
                        alias: address.alias,
                        county: address.county,
                        key: address.id,
                        postcode: address.postcode,
                        street: address.street,
                        townCity: address.townCity,
                      })) || []
                    }
                    pagination={{
                      defaultPageSize: 20,
                      hideOnSinglePage: true,
                      pageSize: 20,
                    }}
                    size="small"
                  />
                ) : (
                  <Row justify="start">
                    <Empty
                      description={intl.formatMessage({
                        defaultMessage:
                          'There are no addresses for this offender.',
                      })}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      style={{ marginLeft: 150 }}
                    />
                  </Row>
                )}
              </Card>
            )}
            {adminRights && (
              <Card>
                <Profiles
                  crimeGroupsData={crimeGroupsData}
                  listVehiclesData={listVehiclesData}
                  onAddCrimeGroup={onAddCrimeGroup}
                  onAddVehicle={onAddVehicle}
                  onRemoveCrimeGroup={onRemoveCrimeGroup}
                  onRemoveVehicle={onRemoveVehicle}
                  saving={saving}
                  // titleNumber={adminRights ? 3 : 2}
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
                    "You haven't added any exclusion for this offender yet.",
                })}
                onAddExclusion={onAddExclusion}
                onUpdateExclusion={onUpdateExclusion}
                saving={saving}
                setBanData={setBanData}
                titleOrder={4}
                toggleAddExclusion={toggleAddExclusion}
                toggleEditExclusion={toggleEditExclusion}
              />
            )}
            <OffenderImage
              beforeUpload={beforeUpload}
              // TODO: add document upload
              documentList={[]}
              editImage={editImage}
              fileList={fileList}
              imgChange={imgChange}
              onEditImage={onEditImage}
              onRemoveImage={onRemoveImage}
              primaryImage={primaryImage}
              setPrimaryImage={setPrimaryImage}
              titleOrder={adminRights ? 5 : 2}
              toggleEditImage={toggleEditImage}
            />

            <Card>
              <>
                <Row align="bottom">
                  <Col>
                    <Title level={4} style={{ marginBottom: 0 }}>
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {adminRights ? '6.' : '3.'}
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
                          '- Please select the content groups that this incident is for',
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
              </>
            </Card>

            <Form.Item>
              <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
                <Col>
                  <Button
                    disabled={saving}
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

          <Drawer
            onClose={toggleAddAddress}
            open={addAddress}
            title={intl.formatMessage({
              defaultMessage: 'Add Address',
            })}
            width="600"
          >
            {addAddress && (
              <NewOffenderAddress
                onClose={toggleAddAddress}
                onSubmit={onSubmitAddress}
              />
            )}
          </Drawer>
          <Drawer
            onClose={() => toggleEditAddress(null)}
            open={editAddress !== null}
            title={intl.formatMessage({
              defaultMessage: 'Edit Address',
            })}
            width="600"
          >
            {editAddress && (
              <EditOffenderAddress
                data={addressesData?.find(({ id }) => id === editAddress)}
                onClose={() => toggleEditAddress(null)}
                onSubmit={onEditAddress}
              />
            )}
          </Drawer>
        </>
      )}
    </div>
  );
};
export default EditOffender;
