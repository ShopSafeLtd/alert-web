/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type {
  AssociatedOffendersQuery,
  ViewOffenderQuery,
} from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Skeleton,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faCircleInfo,
  faClock,
  faComment,
  faEarth,
  faEdit,
  faHeadSide,
  faImage,
  faMagnifyingGlass,
  faMarsAndVenus,
  faPassport,
  faPenToSquare,
  faPlus,
  faTrash,
  faUser,
  faUserClock,
  faUserHair,
  faUsers,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  calcAge,
  getIdSource,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderHeight,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { calcExpired } from 'utils/offender/get-offender-exclusion';
import OffenderSideList from 'components/offenders/OffenderSideList';
import moment from 'moment';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import UpdateBar from 'components/MessageInput/UpdateBar';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentTable from 'components/tables/IncidentTable';
import VehicleTable from 'components/tables/VehicleTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import MapCard from 'components/map/MapCard/MapCard.view';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import AssociatedOffender from 'components/offenders/AssociatedOffender';
import { calcDuration } from 'utils';
import LightBox from 'components/images/LightBox/LightBox.container';
import OffenderMatches from 'components/rekognition/OffenderMatches/OffenderMatches.container';
import formatCalendar from 'utils/format-calendar-24h';
import { useIntl } from 'react-intl';
import type {
  BanData,
  EditFeedImage,
  ImageCardData,
  LocationData,
  VehicleData,
} from 'types/DataType';
import EditImageList from 'components/images/EditImageList';
import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import EditVehicle from 'components/form-components/Vehicle/EditVehicleSimple';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import NewOffenderAddress from 'components/form-components/addresses/NewOffenderAddress';
import EditOffenderAddress from 'components/form-components/addresses/EditOffenderAddress';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import EditOffenderFeed from 'components/form-components/offender/EditOffenderFeed';
import type { ViewAssociate } from './useViewOffender';
import useStyles from './ViewOffender.styles';

const { Title, Text, Paragraph } = Typography;
interface TableItem {
  description: string | null | undefined;
  endDate: Date;
  location?: string | undefined;
  activeDay?: string | undefined;
}
interface Props {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  linkIncident: boolean;
  toggleLinkIncident: () => void;
  updateIncidentList: (value: string) => void;
  toggleSubscribe: () => void;
  scrolledToTop: () => void;
  loadMore: boolean;
  userId: string;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  editUpdate: { id: string; text: string } | null;
  selectedImages: string[];
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  toggleSelectImages: (id: string) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  closeAddImages: () => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  publicOffenderDOB: boolean;
  onDelete: (offenderId: string) => void;
  associatesData: AssociatedOffendersQuery | undefined;
  onAssociateFilterChange: (value: string[]) => void;
  associateFilters: (string | undefined)[];
  associatesLoading: boolean;
  viewAssociate: ViewAssociate | null;
  toggleViewAssociate: (value: ViewAssociate | null) => void;
  viewMatches: string | null;
  toggleViewMatches: (offenderId: string | null) => void;
  editOffender: boolean;
  toggleEditOffender: () => void;
  addVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleData: VehicleData | null;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  onEditVehicle: (value: VehicleData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onAddExistingVehicle: (id: string) => void;
  addCrimeGroup: boolean;
  toggleAddCrimeGroup: () => void;
  onDeleteCrimeGroup: (id: string) => void;
  onAddCrimeGroup: (value: string) => void;
  addAddress: boolean;
  toggleAddAddress: () => void;
  editAddressData: LocationData | null;
  setEditAddressData: (value: LocationData | null) => void;
  onDeleteAddress: (id: string) => void;
  onEditAddress: (value: LocationData) => void;
  onAddAddress: (value: LocationData) => void;
  addBan: boolean;
  toggleAddBan: () => void;
  editBanData: BanData | null;
  setEditBanData: (value: BanData | null) => void;
  onDeleteBan: (id: string) => void;
  onEditBan: (value: BanData) => void;
  onAddBan: (value: BanData) => void;
  editImages: boolean;
  toggleEditImages: () => void;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
}

const ViewOffender = ({
  data,
  loading,
  saving,
  openLightbox,
  offenderId,
  deleteRights,
  editRights,
  linkIncident,
  toggleLinkIncident,
  updateIncidentList,
  toggleSubscribe,
  scrolledToTop,
  loadMore,
  userId,
  setEditUpdate,
  confirmDeleteUpdate,
  setReplyTo,
  confirmUpdateImages,
  replyTo,
  addImages,
  editUpdate,
  selectedImages,
  editUpdateInput,
  handleEditUpdate,
  setEditUpdateInput,
  addUpdateImages,
  closeAddImages,
  toggleSelectImages,
  lightBoxOpen,
  optionRowShow,
  setOptionRowShow,
  publicOffenderDOB,
  onDelete,
  associatesData,
  onAssociateFilterChange,
  associateFilters,
  associatesLoading,
  toggleViewAssociate,
  viewAssociate,
  toggleViewMatches,
  viewMatches,
  editOffender,
  toggleEditOffender,
  editImages,
  toggleEditImages,
  editImageData,
  setEditImageData,
  onDeleteImage,
  onEditImage,
  onUpdateImages,
  addVehicle,
  addExistingVehicle,
  editVehicleData,
  setEditVehicleData,
  onDeleteVehicle,
  toggleAddVehicle,
  toggleAddExistingVehicle,
  onEditVehicle,
  onAddVehicle,
  onAddExistingVehicle,
  addCrimeGroup,
  onDeleteCrimeGroup,
  toggleAddCrimeGroup,
  onAddCrimeGroup,
  addAddress,
  editAddressData,
  setEditAddressData,
  onDeleteAddress,
  toggleAddAddress,
  onEditAddress,
  onAddAddress,
  addBan,
  editBanData,
  setEditBanData,
  onDeleteBan,
  toggleAddBan,
  onEditBan,
  onAddBan,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
      {intl.formatMessage(
        {
          defaultMessage: ' Description: {description}',
          id: 'b/Uf3s',
        },
        {
          description: record.description,
        }
      )}
    </Text>
  );
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <OffenderSideList current={offenderId} />
        </Col>

        <Col flex={1} className={classes.detailsContent}>
          <Row gutter={8} className={classes.headerBar} justify="end">
            {data?.offender?.searchedMatches &&
              data?.offender?.searchedMatches.length > 0 && (
                <Col>
                  <Button danger onClick={() => toggleViewMatches(offenderId)}>
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          '{itemCount} {itemCount, plural, one {Face ID Match} other {Face ID Matches}}',
                        id: '0ZRYJ5',
                      },
                      {
                        itemCount: data.offender.searchedMatches.length,
                      }
                    )}
                  </Button>
                </Col>
              )}
            <Col>
              <Tooltip
                title={
                  data?.offender?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Stop getting notified about updates.',
                        id: 'WpTY6U',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Get notified about updates.',
                        id: 'icr+Hj',
                      })
                }
              >
                <Button
                  onClick={toggleSubscribe}
                  disabled={saving}
                  loading={saving}
                  type="ghost"
                  color={data?.offender?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.offender?.subscribed ? faBellSlash : faBell}
                  />
                  {data?.offender?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Un-follow',
                        id: 'U9yypY',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Follow',
                        id: 'ieGrWo',
                      })}
                </Button>
              </Tooltip>
            </Col>
            {editRights && (
              <Col>
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          key: 0,
                          label: intl.formatMessage({
                            defaultMessage: 'Edit Offender',
                            id: '+OfJ4/',
                          }),
                          onClick: () => toggleEditOffender(),
                          icon: <FontAwesomeIcon icon={faEdit} />,
                        },
                        {
                          key: 1,
                          label:
                            data?.offender?.totalImages &&
                            data?.offender.totalImages > 0
                              ? intl.formatMessage({
                                  defaultMessage: 'Edit Images',
                                  id: 'Cs6iOM',
                                })
                              : intl.formatMessage({
                                  defaultMessage: 'Add Images',
                                  id: 'b4GGYZ',
                                }),
                          onClick: () => toggleEditImages(),
                          icon: <FontAwesomeIcon icon={faImage} />,
                        },
                      ]}
                    />
                  }
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <Button type="ghost">
                    <FontAwesomeIcon
                      size="1x"
                      style={{ marginRight: 8 }}
                      icon={faEdit}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Edit',
                      id: 'wEQDC6',
                    })}
                  </Button>
                </Dropdown>
              </Col>
            )}
            {deleteRights && (
              <Col>
                <Button type="ghost" onClick={() => onDelete(offenderId)}>
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={faTrash}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Delete',
                    id: 'K3r6DQ',
                  })}
                </Button>
              </Col>
            )}
          </Row>
          {loading ? (
            <Row style={{ width: '100%', marginBottom: 20, marginLeft: 10 }}>
              <Row gutter={8} className={classes.offenderRow}>
                {Array.from({ length: 4 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Col key={index}>
                    <Skeleton.Avatar
                      active
                      shape="square"
                      style={{
                        height: 200,
                        width: 150,
                        borderRadius: '0.625rem',
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Row>
          ) : (
            <Row
              gutter={[8, 8]}
              justify="start"
              align="middle"
              wrap={false}
              className={classes.images}
              style={{
                height:
                  data?.offender?.images && data?.offender?.images.length > 0
                    ? undefined
                    : 0,
              }}
            >
              {data?.offender?.images.map((image, i) => (
                <Col key={image.id}>
                  <Popover
                    trigger="hover"
                    placement="left"
                    content={
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Button
                          type="text"
                          disabled={saving}
                          icon={
                            <FontAwesomeIcon
                              style={{ marginRight: 5 }}
                              icon={faEdit}
                              size="lg"
                            />
                          }
                          onClick={() => setEditImageData(image)}
                          size="small"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Edit Image',
                            id: '9UlLIw',
                          })}
                        </Button>
                        <Popconfirm
                          placement="topLeft"
                          title={intl.formatMessage({
                            defaultMessage: 'Remove the image?',
                            id: 'bRha+v',
                          })}
                          onConfirm={() => onDeleteImage(image.id)}
                          okText={intl.formatMessage({
                            defaultMessage: 'Yes',
                            id: 'a5msuh',
                          })}
                          cancelText={intl.formatMessage({
                            defaultMessage: 'No',
                            id: 'oUWADl',
                          })}
                          overlayInnerStyle={{ padding: 10 }}
                        >
                          <Button
                            type="text"
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                style={{ marginRight: 5 }}
                                icon={faTrash}
                                size="lg"
                              />
                            }
                            // onClick={() => onDeleteImage(image.id)}
                            size="small"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Delete Image',
                              id: 'u5uVrC',
                            })}
                          </Button>
                        </Popconfirm>
                      </div>
                    }
                  >
                    <div
                      onClick={() => openLightbox(i)}
                      className={classes.image}
                    >
                      <WatermarkImage
                        url={image.optimised}
                        rotation={image.rotation}
                        position={image.position}
                      />
                    </div>
                  </Popover>
                </Col>
              ))}
            </Row>
          )}

          <div className={classes.content}>
            <Card>
              <Row align="middle" gutter={10}>
                <Col>
                  <Title style={{ margin: 0 }} level={3}>
                    {data?.offender?.name}
                  </Title>
                </Col>
                <Col>
                  <Text>
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Alert ID: {ref}',
                        id: 'umL9sI',
                      },
                      {
                        ref: data?.offender?.reference,
                      }
                    )}
                  </Text>
                </Col>
              </Row>

              <Row style={{ marginTop: 5 }}>
                {data?.offender?.tags.map((tag) => (
                  <Col key={tag.id}>
                    <Tag color="red" className={classes.tag}>
                      {tag.name}
                    </Tag>
                  </Col>
                ))}
              </Row>

              <Descriptions column={1} style={{ marginTop: 10 }}>
                {data?.offender?.alias && data.offender.alias.length > 0 && (
                  <Descriptions.Item
                    label={
                      <span className={classes.tagLabel}>
                        <FontAwesomeIcon
                          className={classes.descIcon}
                          icon={faUser}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Alias',
                          id: 'Ri9jA7',
                        })}
                      </span>
                    }
                  >
                    <Row>
                      {data?.offender?.alias.map((el, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Tag key={i} className={classes.tag}>
                          {el}
                        </Tag>
                      ))}
                    </Row>
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label={
                    <span>
                      <FontAwesomeIcon
                        className={classes.descIcon}
                        icon={faPassport}
                      />
                      {intl.formatMessage({
                        defaultMessage: 'Verified',
                        id: 'Z8971h',
                      })}
                    </span>
                  }
                >
                  {data?.offender?.idVerified ? (
                    <Typography.Text type="success">
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Verified {source}',
                          id: 'OBOA6I',
                        },
                        {
                          source: getIdSource(data?.offender.idSource),
                        }
                      )}
                    </Typography.Text>
                  ) : (
                    <Typography.Text type="warning">
                      {intl.formatMessage({
                        defaultMessage: 'Not Verified',
                        id: 'r+TWun',
                      })}
                    </Typography.Text>
                  )}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      <FontAwesomeIcon
                        className={classes.descIcon}
                        icon={faClock}
                      />
                      {intl.formatMessage({
                        defaultMessage: 'Last updated',
                        id: '0ICwq5',
                      })}
                    </span>
                  }
                >
                  {formatCalendar(data?.offender?.updatedAt || moment())}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span className={classes.tagLabel}>
                      <FontAwesomeIcon
                        className={classes.descIcon}
                        icon={faUsers}
                      />
                      {intl.formatMessage({
                        defaultMessage: 'Groups',
                        id: 'hzmswI',
                      })}
                    </span>
                  }
                >
                  <Row>
                    {data?.offender?.groups?.map((group) => (
                      <Tag key={group.id} className={classes.tag}>
                        {group.name}
                      </Tag>
                    ))}
                  </Row>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span className={classes.tagLabel}>
                      <FontAwesomeIcon
                        className={classes.descIcon}
                        icon={faUser}
                      />
                      {intl.formatMessage({
                        defaultMessage: 'Created By',
                        id: 'uAfuJA',
                      })}
                    </span>
                  }
                >
                  <Row>{data?.offender?.createdBy.fullName}</Row>
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Title level={4} style={{ marginBottom: 10 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Physical Description',
                      id: 'rXybms',
                    })}
                  </Title>
                  <Descriptions column={1}>
                    {(publicOffenderDOB || editRights) && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className={classes.descIcon}
                              icon={faUserClock}
                            />
                            {intl.formatMessage({
                              defaultMessage: 'Age',
                              id: '9oNQSC',
                            })}
                          </span>
                        }
                      >
                        {data?.offender?.dateOfBirth
                          ? calcAge(data?.offender?.dateOfBirth)
                          : getOffenderAge(data?.offender?.age)}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className={classes.descIcon}
                            icon={faMarsAndVenus}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Sex',
                            id: 'eWJHGp',
                          })}
                        </span>
                      }
                    >
                      {getOffenderGender(data?.offender?.gender)}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className={classes.descIcon}
                            icon={faUserTag}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Build',
                            id: 'RSctv1',
                          })}
                        </span>
                      }
                    >
                      {getOffenderBuild(data?.offender?.build)}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className={classes.descIcon}
                            icon={faHeadSide}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Height',
                            id: 'teLZyZ',
                          })}
                        </span>
                      }
                    >
                      {getOffenderHeight(data?.offender?.height)}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className={classes.descIcon}
                            icon={faEarth}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Ethnicity',
                            id: 'XtCAFo',
                          })}
                        </span>
                      }
                    >
                      {getOffenderRace(data?.offender?.race, false)}
                    </Descriptions.Item>
                    {data?.offender?.hair && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className={classes.descIcon}
                              icon={faUserHair}
                            />
                            {intl.formatMessage({
                              defaultMessage: 'Hair',
                              id: 'e4YBbX',
                            })}
                          </span>
                        }
                      >
                        {data?.offender?.hair}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  <Descriptions column={1}>
                    {data?.offender?.peculiarities && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className={classes.descIcon}
                              icon={faCircleInfo}
                            />
                            {intl.formatMessage({
                              defaultMessage: 'Additional information',
                              id: 'gh/lBJ',
                            })}
                          </span>
                        }
                      >
                        {data?.offender?.peculiarities}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  <Descriptions column={1}>
                    {data?.offender?.comment && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className={classes.descIcon}
                              icon={faComment}
                            />
                            {intl.formatMessage({
                              defaultMessage: 'Comment',
                              id: 'LgbKvU',
                            })}
                          </span>
                        }
                      >
                        {data?.offender?.comment}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                {data?.offender?.incidents &&
                data?.offender?.incidents.length > 0 ? (
                  <MapCard
                    width="100%"
                    height={301}
                    markers={
                      data?.offender?.incidents.map((incident) => ({
                        geoLat: incident.location?.geoLat,
                        geoLng: incident.location?.geoLng,
                      })) || []
                    }
                  />
                ) : (
                  <Card
                    style={{
                      height: 'calc(100% - 20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={intl.formatMessage({
                        defaultMessage: 'No incidents found',
                        id: '312q4w',
                      })}
                    />
                  </Card>
                )}
              </Col>
            </Row>
            <Card>
              <Row style={{ marginBottom: 20 }} align="middle">
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginRight: 20 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Known Associates',
                      id: 'Nnl9rH',
                    })}
                  </Title>
                </Col>
                <Col>
                  <CheckTags
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Linked Incidents',
                          id: 'RDsV4v',
                        }),
                        value: 'LINKED_INCIDENTS',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Linked OCG',
                          id: 'qhTnhR',
                        }),
                        value: 'LINKED_OCG',
                      },
                    ]}
                    onChange={onAssociateFilterChange}
                    value={associateFilters as string[]}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]} className={classes.offenderRow} wrap={false}>
                {associatesLoading && (
                  <Row gutter={8} className={classes.offenderRow}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Col key={index}>
                        <Skeleton.Avatar
                          active
                          shape="square"
                          style={{
                            height: 200,
                            width: 150,
                            borderRadius: '0.625rem',
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
                {associatesData?.offender?.knownAssociates &&
                  associatesData.offender.knownAssociates.length === 0 && (
                    <Row justify="center" style={{ width: '100%' }}>
                      <Col>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={intl.formatMessage({
                            defaultMessage: 'No known associates found',
                            id: '835oG/',
                          })}
                        />
                      </Col>
                    </Row>
                  )}
                {associatesData?.offender?.knownAssociates?.map((associate) => (
                  <Col key={associate.id}>
                    <Card
                      // onClick={() => setAddRecentOffender(offender)}
                      style={{ border: 0 }}
                      bodyStyle={{
                        width: 150,
                        height: 200,
                        position: 'relative',
                        padding: 0,
                        borderRadius: '0.625rem',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleViewAssociate(associate)}
                    >
                      <Row gutter={8} className={classes.offenderBadge}>
                        <Col>
                          <Badge
                            color="basic"
                            count={
                              associate.totalAssociatedIncidents
                                ? intl.formatMessage(
                                    {
                                      defaultMessage:
                                        'Incidents: {totalAssociatedIncidents}',
                                      id: 'r4UaZo',
                                    },
                                    {
                                      totalAssociatedIncidents:
                                        associate.totalAssociatedIncidents,
                                    }
                                  )
                                : undefined
                            }
                          />
                        </Col>
                        <Col>
                          <Badge
                            color="basic"
                            count={
                              associate.totalAssociatedCrimeGroups
                                ? 'OCG'
                                : undefined
                            }
                          />
                        </Col>
                      </Row>
                      {associate.images.length > 0 && (
                        <WatermarkImage
                          url={associate.images[0]?.optimised}
                          position={associate.images[0]?.position}
                        />
                      )}
                      {associate.images.length === 0 && (
                        <FontAwesomeIcon
                          style={{ color: 'rgb(114, 132, 154)' }}
                          icon={faUser}
                          size="3x"
                        />
                      )}
                      <Paragraph
                        className={classes.offenderParagraph}
                        style={{
                          bottom: 9,
                          paddingBottom: 0,
                        }}
                      >
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Alert Id: {ref}',
                            id: '9GD9D0',
                          },
                          {
                            ref: associate.reference,
                          }
                        )}
                      </Paragraph>
                      <Paragraph
                        className={classes.offenderParagraph}
                        style={{
                          bottom: -15,
                          paddingTop: 0,
                        }}
                      >
                        {associate.name}
                      </Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
            <Card>
              <Title level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Incidents',
                  id: 'mtr3R4',
                })}
              </Title>
              <IncidentTable
                incidents={data?.offender?.incidents || []}
                hasNavigation
              />
            </Card>
            <Card>
              <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Exclusions',
                      id: 'jjBvFh',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Button
                    size="small"
                    onClick={toggleAddBan}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Exclusion',
                      id: 'QPeZMN',
                    })}
                  </Button>
                </Col>
              </Row>
              <Table
                size="small"
                loading={loading}
                pagination={
                  data?.offender?.bans && data.offender.bans.length > 5
                    ? {
                        pageSize: 5,
                      }
                    : false
                }
                expandable={{
                  expandedRowRender,
                  rowExpandable: (record) => !!record.description,
                }}
                columns={[
                  {
                    key: 'duration',
                    title: intl.formatMessage({
                      defaultMessage: 'Duration',
                      id: 'IuFETn',
                    }),
                    dataIndex: 'duration',
                    width: 110,
                    render: (value) => <Text>{value}</Text>,
                  },
                  {
                    key: 'activeDay',
                    title: intl.formatMessage({
                      defaultMessage: 'Active Days',
                      id: 'YEneNi',
                    }),
                    dataIndex: 'activeDay',
                  },
                  {
                    key: 'status',
                    title: intl.formatMessage({
                      defaultMessage: 'Status',
                      id: 'tzMNF3',
                    }),
                    dataIndex: 'status',
                    render: (value, record) =>
                      calcExpired(new Date(record.endDate)) ? (
                        <Tag color="red">
                          {intl.formatMessage({
                            defaultMessage: 'EXPIRED',
                            id: 'GftNg3',
                          })}
                        </Tag>
                      ) : (
                        <Tag color="success">
                          {intl.formatMessage({
                            defaultMessage: 'ACTIVE',
                            id: 'LQPOVs',
                          })}
                        </Tag>
                      ),
                  },
                  {
                    key: 'location',
                    title: intl.formatMessage({
                      defaultMessage: 'Location',
                      id: 'rvirM2',
                    }),
                    dataIndex: 'location',
                    ellipsis: true,
                  },

                  {
                    key: 'type',
                    title: intl.formatMessage({
                      defaultMessage: 'Type',
                      id: '+U6ozc',
                    }),
                    dataIndex: 'type',
                    ellipsis: true,
                  },
                  {
                    key: 'Options',
                    title: '',
                    dataIndex: 'Options',
                    // width: 100,
                    render: (_, record) => (
                      <Row gutter={8}>
                        <Col>
                          <Tooltip
                            title={intl.formatMessage({
                              defaultMessage: 'Edit Exclusion',
                              id: '22olP0',
                            })}
                          >
                            <Button
                              size="small"
                              disabled={saving}
                              onClick={() => {
                                setEditBanData(record.ban);
                              }}
                              icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            />
                          </Tooltip>
                        </Col>
                        <Col>
                          <Tooltip
                            title={intl.formatMessage({
                              defaultMessage: 'Remove Exclusion',
                              id: '8y70Xm',
                            })}
                          >
                            <Popconfirm
                              placement="topLeft"
                              trigger="hover"
                              title={intl.formatMessage({
                                defaultMessage: 'Remove the exclusion?',
                                id: 'Dc7IO/',
                              })}
                              onConfirm={() => onDeleteBan(record.key)}
                              okText={intl.formatMessage({
                                defaultMessage: 'Yes',
                                id: 'a5msuh',
                              })}
                              cancelText={intl.formatMessage({
                                defaultMessage: 'No',
                                id: 'oUWADl',
                              })}
                              overlayInnerStyle={{
                                padding: 10,
                              }}
                            >
                              <Button
                                size="small"
                                disabled={saving}
                                icon={<FontAwesomeIcon icon={faTrash} />}
                              />
                            </Popconfirm>
                          </Tooltip>
                        </Col>
                      </Row>
                    ),
                  },
                ]}
                dataSource={data?.offender?.bans.map((ban) => ({
                  key: ban.id,
                  endDate: ban.endDate,
                  duration: `${formatCalendar(
                    ban?.startDate,
                    true
                  )}  ->  ${formatCalendar(ban?.endDate, true)}`,
                  activeDay: calcDuration(
                    new Date(ban?.startDate),
                    new Date(ban?.endDate)
                  ),
                  status: `${new Date(
                    ban?.startDate
                  ).toDateString()}  -->  ${new Date(
                    ban?.endDate
                  ).toDateString()}`,
                  location: ban.location,
                  description: ban.description,
                  type: ban.type,
                  ban,
                }))}
              />
            </Card>
            {editRights && (
              <Card>
                <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Addresses',
                        id: 'xBrtnx',
                      })}
                    </Title>
                  </Col>
                  <Col>
                    <Button
                      size="small"
                      onClick={toggleAddAddress}
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
                </Row>
                {data?.offender?.addresses.length && !loading ? (
                  <Table
                    size="small"
                    loading={loading}
                    pagination={
                      data?.offender?.addresses &&
                      data.offender.addresses.length > 10
                        ? {
                            pageSize: 10,
                          }
                        : false
                    }
                    className={classes.exclusions}
                    columns={[
                      {
                        key: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Alias',
                          id: 'Ri9jA7',
                        }),
                        dataIndex: 'alias',
                      },
                      {
                        key: 'full',
                        title: intl.formatMessage({
                          defaultMessage: 'Full Address',
                          id: 'RbRvWj',
                        }),
                        dataIndex: 'full',
                      },
                      {
                        key: 'options',
                        title: '',
                        dataIndex: 'Options',
                        width: 100,
                        render: (_, record) => (
                          <Row gutter={8}>
                            <Col>
                              <Tooltip
                                title={intl.formatMessage({
                                  defaultMessage: 'Edit Address',
                                  id: 'uSpe21',
                                })}
                              >
                                <Button
                                  size="small"
                                  disabled={saving}
                                  onClick={() => {
                                    setEditAddressData(record.address);
                                  }}
                                  icon={
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  }
                                />
                              </Tooltip>
                            </Col>
                            <Col>
                              <Tooltip
                                title={intl.formatMessage({
                                  defaultMessage: 'Remove Address',
                                  id: 'r3DjS/',
                                })}
                              >
                                <Popconfirm
                                  placement="topLeft"
                                  trigger="hover"
                                  title={intl.formatMessage({
                                    defaultMessage: 'Remove the Address?',
                                    id: 'y/xSXA',
                                  })}
                                  onConfirm={() => onDeleteAddress(record.key)}
                                  okText={intl.formatMessage({
                                    defaultMessage: 'Yes',
                                    id: 'a5msuh',
                                  })}
                                  cancelText={intl.formatMessage({
                                    defaultMessage: 'No',
                                    id: 'oUWADl',
                                  })}
                                  overlayInnerStyle={{
                                    padding: 10,
                                  }}
                                >
                                  <Button
                                    size="small"
                                    disabled={saving}
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                  />
                                </Popconfirm>
                              </Tooltip>
                            </Col>
                          </Row>
                        ),
                      },
                    ]}
                    dataSource={data?.offender?.addresses.map((address) => ({
                      key: address.id,
                      alias: address.alias,
                      full: address.full,
                      address,
                    }))}
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No addresses for this offender',
                      id: 'UFKxSJ',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            )}
            <Card>
              <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Vehicles',
                      id: 'r6wuJ3',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Add Existing Vehicles',
                              id: 'goP1s6',
                            }),
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddExistingVehicle(),
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Create New Vehicle',
                              id: 'xiAZxN',
                            }),
                            key: '2',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddVehicle(),
                          },
                        ]}
                      />
                    }
                  >
                    <Button
                      size="small"
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Vehicles',
                        id: 'r6wuJ3',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>

              {data?.offender?.vehicles.length && !loading ? (
                <VehicleTable
                  vehicles={data?.offender?.vehicles}
                  setEditVehicleData={setEditVehicleData}
                  onDeleteVehicle={onDeleteVehicle}
                  saving={saving}
                />
              ) : (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage: 'No vehicles for this offender',
                    id: 'mc7u7d',
                  })}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
            <Card>
              <Title level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Crime Groups',
                  id: 'a0aLil',
                })}
              </Title>
              {data?.offender?.vehicles.length && !loading ? (
                <CrimeGroupTable
                  crimeGroups={data?.offender?.crimeGroups || []}
                  onDelete={onDeleteCrimeGroup}
                  saving={saving}
                />
              ) : (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage: 'No crime groups for this offender',
                    id: 'BIRzsQ',
                  })}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
          </div>
        </Col>
        <Col span={8}>
          <div className={classes.updatesContainer}>
            <InfiniteScroll
              height={
                optionRowShow ? 'calc(100vh - 279px)' : 'calc(100vh - 169px)'
              }
              className="update-scroll"
              initialScrollY={0}
              dataLength={data?.offender?.updates?.length || 0}
              next={scrolledToTop}
              hasMore={loadMore}
              inverse
              style={{
                justifyContent: 'end',
                // display: 'flex',
                flexDirection: 'column',
              }}
              loader={
                <div className="message-date">
                  <div className="date-line" />
                  <div className="date">
                    {intl.formatMessage({
                      defaultMessage: 'Loading...',
                      id: 'gjBiyj',
                    })}
                  </div>
                  <div className="date-line" />
                </div>
              }
            >
              {data?.offender?.updates.map((update) => (
                <div key={update.id} className="update-wrapper">
                  {editRights && update.type !== UpdateType.System ? (
                    <Popover
                      trigger="click"
                      placement={
                        update.createdBy.id === userId ? 'left' : 'right'
                      }
                      overlayClassName="message-popover"
                      content={
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Button
                            type="text"
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                style={{ marginRight: 5 }}
                                icon={faEdit}
                                size="lg"
                              />
                            }
                            onClick={() => {
                              setEditUpdate({
                                id: update.id,
                                text: update.text || '',
                              });
                            }}
                            size="small"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Edit Update',
                              id: 'pCzvx3',
                            })}
                          </Button>
                          <Button
                            type="text"
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                style={{ marginRight: 5 }}
                                icon={faTrash}
                                size="lg"
                              />
                            }
                            onClick={() => {
                              confirmDeleteUpdate(update.id);
                            }}
                            size="small"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Delete Update',
                              id: 'ef1dfd',
                            })}
                          </Button>
                        </div>
                      }
                    >
                      <div>
                        <UpdateContent
                          userId={userId}
                          content={update.text}
                          createdAt={moment(update.createdAt)}
                          from={update.createdBy}
                          id={update.id}
                          images={update.images}
                          incidents={update.linkedIncidents}
                          offenders={update.linkedOffenders}
                          vehicles={update.linkedVehicles}
                          crimeGroups={update.linkedCrimeGroups}
                          showDate
                          showUser
                        />
                      </div>
                    </Popover>
                  ) : (
                    <UpdateContent
                      userId={userId}
                      content={update.text}
                      createdAt={moment(update.createdAt)}
                      from={update.createdBy}
                      id={update.id}
                      images={update.images}
                      incidents={update.linkedIncidents}
                      offenders={update.linkedOffenders}
                      vehicles={update.linkedVehicles}
                      crimeGroups={update.linkedCrimeGroups}
                      showDate
                      showUser
                    />
                  )}
                  {update.replies.map((reply) => (
                    <div className="update-reply">
                      {editRights ? (
                        <Popover
                          trigger="click"
                          placement={
                            reply.createdBy.id === userId ? 'left' : 'right'
                          }
                          overlayClassName="message-popover"
                          content={
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <Button
                                type="text"
                                disabled={saving}
                                icon={
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faEdit}
                                    size="lg"
                                  />
                                }
                                onClick={() => {
                                  setEditUpdate({
                                    id: reply.id,
                                    text: reply.text || '',
                                  });
                                }}
                                size="small"
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Edit Update',
                                  id: 'pCzvx3',
                                })}
                              </Button>
                              <Button
                                type="text"
                                disabled={saving}
                                icon={
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faTrash}
                                    size="lg"
                                  />
                                }
                                onClick={() => {
                                  confirmDeleteUpdate(reply.id);
                                }}
                                size="small"
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Delete Update',
                                  id: 'ef1dfd',
                                })}
                              </Button>
                            </div>
                          }
                        >
                          <div>
                            <UpdateContent
                              userId={userId}
                              content={reply.text}
                              createdAt={moment(reply.createdAt)}
                              from={reply.createdBy}
                              id={reply.id}
                              images={reply.images}
                              incidents={reply.linkedIncidents}
                              offenders={reply.linkedOffenders}
                              vehicles={update.linkedVehicles}
                              crimeGroups={update.linkedCrimeGroups}
                              showDate
                              showUser
                            />
                          </div>
                        </Popover>
                      ) : (
                        <UpdateContent
                          userId={userId}
                          content={reply.text}
                          createdAt={moment(reply.createdAt)}
                          from={reply.createdBy}
                          id={reply.id}
                          images={reply.images}
                          incidents={reply.linkedIncidents}
                          offenders={reply.linkedOffenders}
                          vehicles={update.linkedVehicles}
                          crimeGroups={update.linkedCrimeGroups}
                          showDate
                          showUser
                        />
                      )}
                    </div>
                  ))}
                  <Row>
                    {update.type !== UpdateType.System && (
                      <Col>
                        <Button
                          style={{
                            marginLeft: update.replies.length > 0 ? 48 : 0,
                          }}
                          type="text"
                          danger
                          size="small"
                          onClick={() =>
                            setReplyTo({
                              createdAt: update.createdAt.toString(),
                              createdBy:
                                userId === update.createdBy.id
                                  ? intl.formatMessage({
                                      defaultMessage: 'You',
                                      id: 'kJ5W29',
                                    })
                                  : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                              id: update.id,
                              text: update.text || '',
                            })
                          }
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Reply',
                            id: '9HU8vw',
                          })}
                        </Button>
                      </Col>
                    )}
                    {update.type === UpdateType.Image && editRights && (
                      <Col>
                        <Button
                          style={{
                            marginLeft: update.replies.length > 0 ? 48 : 0,
                          }}
                          type="text"
                          danger
                          size="small"
                          onClick={() =>
                            confirmUpdateImages(
                              update.images.map(({ id, optimised }) => ({
                                id,
                                url: optimised || '',
                              }))
                            )
                          }
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Add Image To Incident',
                            id: 'N6jrgc',
                          })}
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              ))}
            </InfiniteScroll>
            <UpdateBar
              replyTo={replyTo}
              offenderId={offenderId}
              setReplyTo={setReplyTo}
              subscribed={data?.offender?.subscribed || false}
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>
      </Row>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Incident',
          id: '4sHDoC',
        })}
        open={linkIncident}
        width="800"
        onClose={toggleLinkIncident}
      >
        {linkIncident ? (
          <LinkIncident
            update={(value) => updateIncidentList(value.id || '')}
            onClose={toggleLinkIncident}
            incidentIds={data?.offender?.incidents.map(({ id }) => id) || []}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Associate Offender',
          id: 'O0iq2y',
        })}
        onClose={() => toggleViewAssociate(null)}
        width="800"
        open={viewAssociate !== null}
      >
        {viewAssociate && (
          <AssociatedOffender
            offender={viewAssociate}
            onClose={() => toggleViewAssociate(null)}
          />
        )}
      </Drawer>

      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Select images to add',
          id: 'AmI4Rg',
        })}
        open={addImages !== null}
        onOk={() => addUpdateImages(selectedImages.map((id) => ({ id })))}
        onCancel={closeAddImages}
        width={addImages ? addImages.length * 250 : 400}
        okText={intl.formatMessage({
          defaultMessage: 'Add Images',
          id: 'b4GGYZ',
        })}
      >
        <Row justify="center" gutter={8}>
          {addImages?.map((image) => (
            <Col
              key={image.id}
              style={{
                position: 'relative',
              }}
            >
              <Checkbox
                onChange={() => toggleSelectImages(image.id)}
                checked={selectedImages.includes(image.id)}
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 10,
                  zIndex: 100,
                }}
              />
              <div style={{ width: 200, height: 200, marginBottom: 10 }}>
                <WatermarkImage url={image.url} />
              </div>
            </Col>
          ))}
        </Row>
      </Modal>

      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Edit update content',
          id: 'rgtCL5',
        })}
        open={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText={intl.formatMessage({
          defaultMessage: 'Save',
          id: 'jvo0vs',
        })}
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>
      {/* <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      /> */}

      <LightBox
        images={data?.offender?.images}
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        index={lightBoxOpen.index}
      />

      <Drawer
        open={viewMatches !== null}
        onClose={() => toggleViewMatches(null)}
        title={intl.formatMessage({
          defaultMessage: 'View face AI matches',
          id: 'VDl5h/',
        })}
        width={800}
      >
        {viewMatches && <OffenderMatches offenderId={viewMatches} />}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender Details',
          id: 'DomujL',
        })}
        visible={editOffender}
        width="600"
        onClose={toggleEditOffender}
      >
        {editOffender ? (
          <EditOffenderFeed
            onClose={toggleEditOffender}
            offenderId={data?.offender?.id || ''}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* images */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender Images',
          id: 'd7OJx8',
        })}
        open={editImages}
        width="800"
        zIndex={999}
        onClose={toggleEditImages}
      >
        {editImages ? (
          <EditImageList
            update={onUpdateImages}
            onClose={toggleEditImages}
            images={data?.offender?.images}
            title={intl.formatMessage({
              defaultMessage: 'offender',
              id: 'ZkfGxM',
            })}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <FeedImageEditor
        submitImage={onEditImage}
        onClose={() => setEditImageData(null)}
        open={!!editImageData}
        image={editImageData}
      />
      {/* vehicle */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
          id: 'goP1s6',
        })}
        open={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            update={(value) => onAddExistingVehicle(value.id)}
            vehicleIds={data?.offender?.vehicles.map(({ id }) => id)}
            onClose={toggleAddExistingVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
          id: 'cHbTr7',
        })}
        open={addVehicle}
        width="700"
        zIndex={999}
        onClose={toggleAddVehicle}
      >
        {addVehicle ? (
          <AddVehicle
            update={onAddVehicle}
            onClose={toggleAddVehicle}
            fromIncident
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Update Vehicle',
          id: 'BBPVid',
        })}
        open={!!editVehicleData}
        width="800"
        onClose={() => setEditVehicleData(null)}
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicle
            update={onEditVehicle}
            onClose={() => setEditVehicleData(null)}
            editData={editVehicleData}
            images={data?.offender?.images.map((el) => ({ ...el, uid: el.id }))}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* crime group */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Groups',
          id: 'mYgStg',
        })}
        open={addCrimeGroup}
        width="800"
        onClose={toggleAddCrimeGroup}
        zIndex={1001}
      >
        {addCrimeGroup ? (
          <LinkCrimeGroup
            update={(value) => onAddCrimeGroup(value.id)}
            crimeGroupIds={data?.offender?.crimeGroups.map(({ id }) => id)}
            onClose={toggleAddCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* Address  */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Address',
          id: 'xg14pg',
        })}
        visible={addAddress}
        width="600"
        onClose={toggleAddAddress}
      >
        {addAddress && (
          <NewOffenderAddress
            onClose={toggleAddAddress}
            onSubmit={(value) =>
              onAddAddress({ ...value, id: `${Math.random()}` })
            }
          />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Address',
          id: 'uSpe21',
        })}
        visible={!!editAddressData}
        width="600"
        onClose={() => setEditAddressData(null)}
      >
        {editAddressData && (
          <EditOffenderAddress
            onClose={() => setEditAddressData(null)}
            onSubmit={onEditAddress}
            data={editAddressData}
          />
        )}
      </Drawer>
      {/* exclusion */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Exclusion',
          id: 'QPeZMN',
        })}
        visible={addBan}
        width="400"
        onClose={toggleAddBan}
      >
        {addBan ? (
          <AddExclusion update={onAddBan} onClose={toggleAddBan} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Exclusion',
          id: '22olP0',
        })}
        visible={!!editBanData}
        width="400"
        onClose={() => setEditBanData(null)}
      >
        {editBanData ? (
          <EditExclusion
            update={onEditBan}
            onClose={() => setEditBanData(null)}
            banData={editBanData}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewOffender;
