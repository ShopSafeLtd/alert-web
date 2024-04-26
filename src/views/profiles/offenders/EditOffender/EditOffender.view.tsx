import React from 'react';
import type { ListVehiclesQuery, ViewOffenderQuery } from 'graphql/generated';
import type { FormInstance } from 'antd';
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
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  Image,
  TagData,
  VehicleData,
} from 'types/DataType';
import Profiles from 'components/offenders/OffenderForm/Profiles';
// import ProfileDrawer from 'components/offenders/OffenderForm/ProfileDrawer';
import NewOffenderAddress from 'components/form-components/addresses/NewOffenderAddress';
import EditOffenderAddress from 'components/form-components/addresses/EditOffenderAddress';
import OffenderExclusions from 'components/offenders/OffenderForm/OffenderExclusions';
import OffenderImage from 'components/offenders/OffenderForm/OffenderImage';
import { useIntl } from 'react-intl';
import type { BanType, FormData } from './useEditOffender';

const { Title, Paragraph } = Typography;

interface AddressForm {
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface AddressesData {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface EditAddressForm {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onUpdateExclusion: (value: BanData) => void;
  onAddExclusion: (value: BanData) => void;
  setBanData: (value: BanType) => void;
  bansData: BanType[];
  banData: BanType | null;
  addressesData: AddressesData[] | null;
  deleteConfirm: (value: string) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  reviewed: boolean;
  onReject: () => void;
  adminRights: boolean;
  form: FormInstance<FormData> | undefined;
  listVehiclesData: ListVehiclesQuery | undefined;
  vehiclesData: VehicleData[];
  onRemoveVehicle: (vehicleId: string) => void;
  crimeGroupsData: CrimeGroupData[];
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  idVerified: boolean;
  onSubmitAddress: (data: AddressForm) => void;
  addAddress: boolean;
  toggleAddAddress: () => void;
  editAddress: string | null;
  toggleEditAddress: (value: string | null) => void;
  onEditAddress: (data: EditAddressForm) => void;
  onDeleteAddress: (addressId: string) => void;
  onEditImage: (value: Image) => void;
  toggleEditImage: (value?: Image) => void;
  editImage: Image | null;
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
  updateNewOffenderTagData: (values: TagData) => void;
}

const EditOffender = ({
  onSubmit,
  data,
  loading,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  imgChange,
  beforeUpload,
  fileList,
  addOffenderTag,
  toggleAddOffenderTag,
  addExclusion,
  toggleAddExclusion,
  editExclusion,
  toggleEditExclusion,
  banData,
  bansData,
  onAddExclusion,
  onUpdateExclusion,
  setBanData,
  deleteConfirm,
  ageCheck,
  setAgeCheck,
  reviewed,
  onReject,
  onAddVehicle,
  form,
  adminRights,
  vehiclesData,
  onRemoveVehicle,
  crimeGroupsData,
  listVehiclesData,
  onValuesChange,
  idVerified,
  addAddress,
  toggleAddAddress,
  onSubmitAddress,
  addressesData,
  editAddress,
  toggleEditAddress,
  onDeleteAddress,
  onEditAddress,
  editImage,
  onEditImage,
  toggleEditImage,
  onAddCrimeGroup,
  onRemoveCrimeGroup,
  onRemoveImage,
  primaryImage,
  setPrimaryImage,
  customGalleries,
  customGalleriesLoading,
  toggleAddCustomGallery,
  updateNewOffenderTagData,
  addCustomGallery,
  updateNewCustomGalleryData,
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
                id: 'i7Qzld',
              })
            : intl.formatMessage({
                defaultMessage: 'Edit Offender',
                id: '+OfJ4/',
              })
        }
      />
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Form
            onFinish={onSubmit}
            onValuesChange={onValuesChange}
            layout="vertical"
            form={form}
            initialValues={{
              name: data?.offender?.name || null,
              alias: data?.offender?.alias || [],
              age: data?.offender?.age || null,
              gender: data?.offender?.gender || null,
              race: data?.offender?.race || null,
              build: data?.offender?.build || null,
              height: data?.offender?.height || null,
              hair: data?.offender?.hair || null,
              ageCheck: !!data?.offender?.dateOfBirth,
              peculiarities: data?.offender?.peculiarities || null,
              dateOfBirth: data?.offender?.dateOfBirth
                ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
                : null,
              dateSource: data?.offender?.dateSource || null,
              groups:
                data?.offender?.groups && data?.offender?.groups.length > 0
                  ? data?.offender?.groups.map(({ id }) => id)
                  : [],
              tags:
                data?.offender?.tags && data?.offender?.tags.length > 0
                  ? data?.offender?.tags.map(({ id }) => id)
                  : [],
              customGalleries:
                data?.offender?.customGalleries &&
                data.offender.customGalleries.length > 0
                  ? data.offender.customGalleries.map(({ id }) => id)
                  : [],
              idVerified: data?.offender?.idVerified || false,
              idSource: data?.offender?.idSource,
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
                onSearchOffender={() => {}}
                potentialOffenders={0}
                toggleViewPotentialOffenders={() => {}}
                offenderSettings={{
                  name: true,
                  alias: true,
                  ethnicity: true,
                  gender: true,
                  build: true,
                  height: true,
                  hair: true,
                  age: true,
                  dateOfBirth: true,
                  dateOfBirthSource: true,
                  idVerified: true,
                  peculiarities: true,
                  comment: true,
                  images: true,
                }}
              />
            </Card>
            {adminRights && (
              <Card>
                <Row align="middle" style={{ marginBottom: 20 }}>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Title style={{ marginBottom: 0 }} level={4}>
                      2.
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
                  {adminRights && (
                    <>
                      <Col style={{ marginRight: 5 }}>
                        <Paragraph
                          style={{ marginBottom: 1, marginLeft: 5 }}
                          type="secondary"
                          italic
                        >
                          {intl.formatMessage({
                            defaultMessage:
                              '                          - Add any of the known addresses for the offender.',
                            id: '2Us/IK',
                          })}
                        </Paragraph>
                      </Col>
                      <Col>
                        <Button
                          disabled={saving}
                          onClick={toggleAddAddress}
                          style={{
                            marginTop: -30,
                            marginLeft: 15,
                            color: 'red',
                          }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPlus}
                              style={{ marginRight: 5 }}
                            />
                          }
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Add Address',
                            id: 'xg14pg',
                          })}
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
                {addressesData && addressesData.length > 0 ? (
                  <Table
                    size="small"
                    pagination={{
                      hideOnSinglePage: true,
                      defaultPageSize: 20,
                      pageSize: 20,
                    }}
                    columns={[
                      {
                        key: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Label',
                          id: '753yX5',
                        }),
                        dataIndex: 'alias',
                      },
                      {
                        key: 'street',
                        title: intl.formatMessage({
                          defaultMessage: 'Street',
                          id: 'BaIwdV',
                        }),
                        dataIndex: 'street',
                      },
                      {
                        key: 'townCity',
                        title: intl.formatMessage({
                          defaultMessage: 'City',
                          id: 'TE4fIS',
                        }),
                        dataIndex: 'townCity',
                      },
                      {
                        key: 'county',
                        title: intl.formatMessage({
                          defaultMessage: 'County',
                          id: 'B+KJhc',
                        }),
                        dataIndex: 'county',
                      },
                      {
                        key: 'postcode',
                        title: intl.formatMessage({
                          defaultMessage: 'Postcode',
                          id: 'FJhjgz',
                        }),
                        dataIndex: 'postcode',
                      },
                      {
                        key: 'Edit',
                        title: intl.formatMessage({
                          defaultMessage: 'Edit',
                          id: 'wEQDC6',
                        }),
                        width: 50,
                        dataIndex: 'Edit',
                        render: (_, record) => (
                          <Button
                            disabled={saving}
                            onClick={() => toggleEditAddress(record.key)}
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                          />
                        ),
                      },
                      {
                        key: 'Delete',
                        title: intl.formatMessage({
                          defaultMessage: 'Delete',
                          id: 'K3r6DQ',
                        }),
                        dataIndex: 'Delete',
                        width: 60,
                        render: (_, record) => (
                          <Popconfirm
                            title={intl.formatMessage({
                              defaultMessage: 'Are you sure?',
                              id: '2oCaym',
                            })}
                            okText={intl.formatMessage({
                              defaultMessage: 'Delete',
                              id: 'K3r6DQ',
                            })}
                            onConfirm={() => onDeleteAddress(record.key)}
                            overlayInnerStyle={{ padding: 10 }}
                          >
                            <Button
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                          </Popconfirm>
                        ),
                      },
                    ]}
                    dataSource={
                      addressesData?.map((address) => ({
                        key: address.id,
                        alias: address.alias,
                        street: address.street,
                        townCity: address.townCity,
                        county: address.county,
                        postcode: address.postcode,
                      })) || []
                    }
                  />
                ) : (
                  <Row justify="start">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={intl.formatMessage({
                        defaultMessage:
                          'There are no addresses for this offender.',
                        id: 'k/Rta7',
                      })}
                      style={{ marginLeft: 150 }}
                    />
                  </Row>
                )}
              </Card>
            )}
            {adminRights && (
              <Card>
                <Profiles
                  saving={saving}
                  vehiclesData={vehiclesData}
                  onRemoveVehicle={onRemoveVehicle}
                  onRemoveCrimeGroup={onRemoveCrimeGroup}
                  crimeGroupsData={crimeGroupsData}
                  listVehiclesData={listVehiclesData}
                  // titleNumber={adminRights ? 3 : 2}
                  titleNumber={3}
                  onAddVehicle={onAddVehicle}
                  onAddCrimeGroup={onAddCrimeGroup}
                />
              </Card>
            )}
            {adminRights && (
              <OffenderExclusions
                addExclusion={addExclusion}
                toggleAddExclusion={toggleAddExclusion}
                onAddExclusion={onAddExclusion}
                editExclusion={editExclusion}
                toggleEditExclusion={toggleEditExclusion}
                onUpdateExclusion={onUpdateExclusion}
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
              titleOrder={adminRights ? 5 : 2}
              imgChange={imgChange}
              beforeUpload={beforeUpload}
              fileList={fileList}
              editImage={editImage}
              onEditImage={onEditImage}
              toggleEditImage={toggleEditImage}
              onRemoveImage={onRemoveImage}
              primaryImage={primaryImage}
              setPrimaryImage={setPrimaryImage}
              // TODO: add document upload
              documentList={[]}
            />

            <Card>
              <>
                <Row align="bottom">
                  <Col>
                    <Title style={{ marginBottom: 0 }} level={4}>
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {adminRights ? '6.' : '3.'}
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
                          '- Please select the content groups that this incident is for',
                        id: 'dx+dmJ',
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
                          'Select the groups that you would like this offender to be visible to.',
                        id: '/oJY/I',
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

            <Form.Item>
              <Row style={{ marginTop: 30 }} gutter={10} justify="end">
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
                          id: 'VzIOKf',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Cancel',
                          id: '47FYwb',
                        })}
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    loading={saving}
                    type="primary"
                    htmlType="submit"
                  >
                    {reviewed
                      ? intl.formatMessage({
                          defaultMessage: 'Approve',
                          id: 'WCaf5C',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Save',
                          id: 'jvo0vs',
                        })}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>

          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Add Address',
              id: 'xg14pg',
            })}
            open={addAddress}
            width="600"
            onClose={toggleAddAddress}
          >
            {addAddress && (
              <NewOffenderAddress
                onClose={toggleAddAddress}
                onSubmit={onSubmitAddress}
              />
            )}
          </Drawer>
          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Edit Address',
              id: 'uSpe21',
            })}
            open={editAddress !== null}
            width="600"
            onClose={() => toggleEditAddress(null)}
          >
            {editAddress && (
              <EditOffenderAddress
                onClose={() => toggleEditAddress(null)}
                onSubmit={onEditAddress}
                data={addressesData?.find(({ id }) => id === editAddress)}
              />
            )}
          </Drawer>
        </>
      )}
    </div>
  );
};
export default EditOffender;
