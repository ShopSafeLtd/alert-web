/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ViewIncidentQuery } from 'graphql/generated';
import { GoodsMode, UpdateType } from 'graphql/generated';
import {
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
  faBuilding,
  faClock,
  faEdit,
  faImage,
  faMagnifyingGlass,
  faPage,
  faPenToSquare,
  faPlus,
  faSirenOn,
  faTags,
  faTrash,
  faUsers,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import IncidentSideList from 'components/incidents/IncidentSideList';
import UpdateBar from 'components/MessageInput/UpdateBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import OffenderTable from 'components/tables/OffenderTable';
import VehicleTable from 'components/tables/VehicleTable';
import MapCard from 'components/map/MapCard/MapCard.view';
import { FormattedMessage, useIntl } from 'react-intl';
import moment from 'moment';
import type {
  EditFeedImage,
  GoodsData,
  ImageCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import AddNewOffenderSimple from 'components/form-components/offender/offender/AddNewOffenderSimple';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import AddGoods from 'components/form-components/incident/goods/AddGoods';
import EditVehicle from 'components/form-components/Vehicle/EditVehicleSimple';
import SimpleEditOffender from 'components/form-components/offender/offender/SimpleEditOffender';
import EditGoods from 'components/form-components/incident/goods/EditGoods';
import EditImageList from 'components/images/EditImageList';
import UpdateContent from './Update.view';
import useStyles from './ViewIncident.styles';
import EvidenceTable from '../../../components/tables/EvidenceTable';
import formatAnswer from '../../../utils/format-answer';

const { Title, Paragraph, Text } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  incidentId: string;
  editRights: boolean;
  deleteRights: boolean;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
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
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  closeAddImages: () => void;
  toggleSubscribe: () => void;
  toggleSelectImages: (id: string) => void;
  selectedImages: string[];
  confirmDeleteUpdate: (updateId: string) => void;
  editUpdate: { id: string; text: string } | null;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  editUpdateInput: string;
  handleEditUpdate: () => void;
  setEditUpdateInput: (value: string) => void;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  onDelete: (incidentId: string) => void;
  onReject: () => void;
  onApprove: () => void;
  approving: boolean;
  editIncident: boolean;
  toggleEditIncident: () => void;
  editImages: boolean;
  toggleEditImages: () => void;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  addOffender: boolean;
  addExistingOffender: boolean;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  editOffenderData: OffenderData | null;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  addVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleData: VehicleData | null;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  addGoods: boolean;
  toggleAddGoods: () => void;
  editGoodsData: GoodsData | null;
  setEditGoodsData: (value: GoodsData | null) => void;
  onDeleteGoods: (id: string) => void;
  onEditVehicle: (value: VehicleData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onAddExistingVehicle: (id: string) => void;
  onEditOffender: (value: OffenderData) => void;
  onAddOffender: (value: OffenderData) => void;
  onAddExistingOffender: (id: string) => void;
  onEditGoods: (value: GoodsData) => void;
  onAddGoods: (value: GoodsData) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  goodsMode: GoodsMode;
}

const ViewIncident = ({
  data,
  loading,
  saving,
  openLightbox,
  incidentId,
  deleteRights,
  editRights,
  linkOffender,
  toggleLinkOffender,
  updateOffendersList,
  loadMore,
  scrolledToTop,
  userId,
  replyTo,
  setReplyTo,
  confirmUpdateImages,
  addImages,
  addUpdateImages,
  closeAddImages,
  toggleSubscribe,
  selectedImages,
  toggleSelectImages,
  confirmDeleteUpdate,
  editUpdate,
  editUpdateInput,
  handleEditUpdate,
  setEditUpdate,
  setEditUpdateInput,
  lightboxElements,
  lightBoxOpen,
  optionRowShow,
  setOptionRowShow,
  onDelete,
  onReject,
  onApprove,
  approving,
  editIncident,
  toggleEditIncident,
  editImages,
  toggleEditImages,
  editImageData,
  setEditImageData,
  onDeleteImage,
  onEditImage,
  addOffender,
  addExistingOffender,
  editOffenderData,
  setEditOffenderData,
  onDeleteOffender,
  toggleAddOffender,
  toggleAddExistingOffender,
  addVehicle,
  addExistingVehicle,
  editVehicleData,
  setEditVehicleData,
  onDeleteVehicle,
  toggleAddVehicle,
  toggleAddExistingVehicle,
  addGoods,
  editGoodsData,
  setEditGoodsData,
  onDeleteGoods,
  toggleAddGoods,
  onEditGoods,
  onAddGoods,
  onEditOffender,
  onAddOffender,
  onAddExistingOffender,
  onEditVehicle,
  onAddVehicle,
  onAddExistingVehicle,
  onUpdateImages,
  goodsMode,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <IncidentSideList current={incidentId} />
        </Col>

        <Col flex={1}>
          <div className={classes.viewIncident}>
            <Row className={classes.content}>
              <Col span={16} className={classes.detailsContainer}>
                {data?.incident?.approved === false && (
                  <div className={classes.approveBar}>
                    <Row gutter={8} justify="end">
                      <Col>
                        <Button
                          type="ghost"
                          onClick={onReject}
                          disabled={approving}
                        >
                          <FormattedMessage
                            defaultMessage="Reject Incident"
                            id="O9bahm"
                          />
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type="primary"
                          onClick={onApprove}
                          disabled={approving}
                        >
                          <FormattedMessage
                            defaultMessage="Approve Incident"
                            id="Y6VB57"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
                <div className={classes.detailsContent}>
                  <Row gutter={8} className={classes.headerBar} justify="end">
                    <Col>
                      <Tooltip
                        title={
                          data?.incident?.subscribed
                            ? intl.formatMessage({
                                defaultMessage:
                                  'Stop getting notified about updates.',
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
                          color={
                            data?.incident?.subscribed ? undefined : 'danger'
                          }
                        >
                          <FontAwesomeIcon
                            size="1x"
                            style={{ marginRight: 8 }}
                            icon={
                              data?.incident?.subscribed ? faBellSlash : faBell
                            }
                          />
                          {data?.incident?.subscribed
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
                                    defaultMessage: 'Edit Incident',
                                    id: 'E6VJFN',
                                  }),
                                  onClick: () => toggleEditIncident(),
                                  icon: <FontAwesomeIcon icon={faEdit} />,
                                },
                                data?.incident?.totalImages &&
                                data?.incident.totalImages > 0
                                  ? {
                                      key: 1,
                                      label: intl.formatMessage({
                                        defaultMessage: 'Edit Images',
                                        id: 'Cs6iOM',
                                      }),
                                      onClick: () => toggleEditImages(),
                                      icon: <FontAwesomeIcon icon={faImage} />,
                                    }
                                  : null,
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
                        {/* <Link to={`/app/incidents/edit/${incidentId}`}>
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
                        </Link> */}
                      </Col>
                    )}
                    {data?.incident?.scheme.mg11Available && (
                      <Dropdown
                        overlay={
                          <Menu
                            items={[
                              {
                                label: intl.formatMessage({
                                  defaultMessage: 'Create MG11',
                                  id: 'CpvwMZ',
                                }),
                                key: '1',
                                icon: (
                                  <FontAwesomeIcon
                                    size="1x"
                                    style={{ marginRight: 8 }}
                                    icon={faPage}
                                  />
                                ),
                                // disabled: !listVehiclesData?.listVehicles.total,
                                onClick: () =>
                                  navigate(`/app/mg11/create/${incidentId}`),
                              },
                              {
                                label: intl.formatMessage({
                                  defaultMessage:
                                    'Create Business Impact Statement',
                                  id: 'PPTlxg',
                                }),
                                key: '3',
                                icon: (
                                  <FontAwesomeIcon
                                    size="1x"
                                    style={{ marginRight: 8 }}
                                    icon={faPage}
                                  />
                                ),
                                // disabled: !listVehiclesData?.listVehicles.total,
                                onClick: () =>
                                  navigate(
                                    `/app/mg11/create-bis/${incidentId || ''}`
                                  ),
                              },
                            ]}
                          />
                        }
                      >
                        <Button
                          key="2"
                          icon={
                            <FontAwesomeIcon
                              icon={faPlus}
                              style={{ marginRight: 5 }}
                            />
                          }
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Add Document',
                            id: 'r9vGqd',
                          })}
                        </Button>
                      </Dropdown>
                    )}
                    {deleteRights && (
                      <Col>
                        <Button
                          type="ghost"
                          onClick={() => onDelete(incidentId)}
                        >
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
                    <Skeleton />
                  ) : (
                    <Row
                      gutter={[8, 8]}
                      justify="start"
                      align="middle"
                      wrap
                      className={classes.images}
                      style={{
                        height:
                          data?.incident?.images &&
                          data?.incident?.images.length > 0
                            ? undefined
                            : 0,
                      }}
                    >
                      {data?.incident?.images.map((image, i) => (
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
                          {/* <Card
                            key={image.id}
                            bodyStyle={{
                              padding: 0,
                              overflow: 'hidden',
                              borderRadius: 10,
                            }}
                          >
                            <div style={{ height: 200, width: '100%' }}>
                              {editRights && (
                                <Dropdown
                                  overlay={
                                    <Menu
                                      style={{
                                        // position: 'absolute',
                                        zIndex: 1000,
                                        // padding: '6.5px 10px',
                                        // top: 5,
                                        // right: 5,
                                      }}
                                      items={[
                                        {
                                          key: 0,
                                          label: intl.formatMessage({
                                            defaultMessage: 'Edit',
                                            id: 'wEQDC6',
                                          }),
                                          icon: (
                                            <FontAwesomeIcon icon={faEdit} />
                                          ),
                                        },
                                        {
                                          key: 1,
                                          label: intl.formatMessage({
                                            defaultMessage: 'Delete',
                                            id: 'K3r6DQ',
                                          }),
                                          icon: (
                                            <FontAwesomeIcon icon={faEdit} />
                                          ),
                                        },
                                      ]}
                                    />
                                  }
                                  placement="topRight"
                                  arrow={{ pointAtCenter: true }}
                                >
                                  <Button
                                    size="small"
                                    style={{
                                      position: 'absolute',
                                      zIndex: 10,
                                      padding: '6.5px 10px',
                                      top: 5,
                                      right: 5,
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      // size="5x"
                                      style={{ height: '100%' }}
                                      icon={faEllipsisV}
                                    />
                                  </Button>
                                </Dropdown>
                              )}

                              <WatermarkImage
                                url={image.optimised}
                                rotation={image.rotation}
                                position={image.position}
                              />
                            </div>
                          </Card> */}
                        </Col>
                      ))}
                    </Row>
                  )}
                  <div className={classes.details}>
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <div className="incident-tab-content">
                        <Card>
                          <Title className={classes.headerTitle} level={4}>
                            {data?.incident?.subject}
                          </Title>
                          <Text>
                            {intl.formatMessage(
                              {
                                defaultMessage: 'Alert ID: {ref}',
                                id: 'umL9sI',
                              },
                              {
                                ref: data?.incident?.reference,
                              }
                            )}
                          </Text>
                          <Paragraph type="secondary" style={{ marginTop: 10 }}>
                            {data?.incident?.description}
                          </Paragraph>

                          <Descriptions column={1} className={classes.desc}>
                            <Descriptions.Item
                              className={classes.detail}
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className={classes.descIcon}
                                    icon={faBuilding}
                                  />
                                  {intl.formatMessage({
                                    defaultMessage: 'Business',
                                    id: 'w1Fanr',
                                  })}
                                </span>
                              }
                            >
                              {editRights ? (
                                <Link
                                  to={`/app/scheme-settings/business/view/${
                                    data?.incident?.business?.id || ''
                                  }`}
                                >
                                  {data?.incident?.business?.name}
                                </Link>
                              ) : (
                                data?.incident?.business?.name
                              )}
                            </Descriptions.Item>
                            <Descriptions.Item
                              className={classes.detail}
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className={classes.descIcon}
                                    icon={faClock}
                                  />
                                  {intl.formatMessage({
                                    defaultMessage: 'Date & Time',
                                    id: 'io/Qlk',
                                  })}
                                </span>
                              }
                            >
                              {data?.incident?.dayTime}
                            </Descriptions.Item>
                          </Descriptions>

                          <Descriptions column={1} className={classes.desc}>
                            <Descriptions.Item
                              className={classes.detailTag}
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
                                {data?.incident?.groups.map((group) => (
                                  <Tag key={group.id} className={classes.tag}>
                                    {group.name}
                                  </Tag>
                                ))}
                              </Row>
                            </Descriptions.Item>
                            <Descriptions.Item
                              className={classes.detailTag}
                              label={
                                <span className={classes.tagLabel}>
                                  <FontAwesomeIcon
                                    className={classes.descIcon}
                                    icon={faSirenOn}
                                  />
                                  {intl.formatMessage({
                                    defaultMessage: 'Crime Types',
                                    id: 'Piba4q',
                                  })}
                                </span>
                              }
                            >
                              <Row>
                                {data?.incident?.crimeTypes.map((tag) => (
                                  <Tag
                                    color="red"
                                    key={tag.id}
                                    className={classes.tag}
                                  >
                                    {tag.name}
                                  </Tag>
                                )) ||
                                  intl.formatMessage({
                                    defaultMessage: 'None',
                                    id: '450Fty',
                                  })}
                              </Row>
                            </Descriptions.Item>
                            {data?.incident &&
                              data.incident.involvedTags.length > 0 && (
                                <Descriptions.Item
                                  className={classes.detailTag}
                                  label={
                                    <span className={classes.tagLabel}>
                                      <FontAwesomeIcon
                                        className={classes.descIcon}
                                        icon={faTags}
                                      />
                                      {intl.formatMessage({
                                        defaultMessage: 'Involved Tags',
                                        id: 'hqB+1X',
                                      })}
                                    </span>
                                  }
                                >
                                  <Row>
                                    {data?.incident?.involvedTags.map((tag) => (
                                      <Tag
                                        color="red"
                                        key={tag.id}
                                        className={classes.tag}
                                      >
                                        {tag.name}
                                      </Tag>
                                    )) ||
                                      intl.formatMessage({
                                        defaultMessage: 'None',
                                        id: '450Fty',
                                      })}
                                  </Row>
                                </Descriptions.Item>
                              )}

                            {data?.incident &&
                              data.incident.impactTags.length > 0 && (
                                <Descriptions.Item
                                  className={classes.detailTag}
                                  label={
                                    <span className={classes.tagLabel}>
                                      <FontAwesomeIcon
                                        className={classes.descIcon}
                                        icon={faUserTag}
                                      />
                                      {intl.formatMessage({
                                        defaultMessage: 'Impact Tags',
                                        id: 'JZVMXj',
                                      })}
                                    </span>
                                  }
                                >
                                  <Row justify="start" align="middle">
                                    {data?.incident?.impactTags.map((tag) => (
                                      <Tag
                                        color="red"
                                        key={tag.id}
                                        className={classes.tag}
                                      >
                                        {tag.name}
                                      </Tag>
                                    )) ||
                                      intl.formatMessage({
                                        defaultMessage: 'None',
                                        id: '450Fty',
                                      })}
                                  </Row>
                                </Descriptions.Item>
                              )}
                          </Descriptions>
                        </Card>
                        <Row gutter={16}>
                          <Col xs={24} xl={12}>
                            <MapCard
                              width="100%"
                              height={194}
                              markers={[
                                {
                                  geoLat: data?.incident?.location?.geoLat,
                                  geoLng: data?.incident?.location?.geoLng,
                                },
                              ]}
                            />
                          </Col>
                          <Col xs={24} xl={12}>
                            <Card>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Police Information',
                                  id: 'bhVnhl',
                                })}
                              </Title>
                              <Descriptions
                                column={1}
                                style={{ marginTop: 10 }}
                                className={classes.desc}
                              >
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={
                                    <span>
                                      {intl.formatMessage({
                                        defaultMessage: 'Police Reported',
                                        id: 'KrBn25',
                                      })}
                                    </span>
                                  }
                                >
                                  {data?.incident?.policeReported
                                    ? intl.formatMessage({
                                        defaultMessage: 'Yes',
                                        id: 'a5msuh',
                                      })
                                    : intl.formatMessage({
                                        defaultMessage: 'No',
                                        id: 'oUWADl',
                                      })}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={
                                    <span>
                                      {intl.formatMessage({
                                        defaultMessage: 'Police Attenteded',
                                        id: 'qT9KAx',
                                      })}
                                    </span>
                                  }
                                >
                                  {data?.incident?.policeInvolved
                                    ? intl.formatMessage({
                                        defaultMessage: 'Yes',
                                        id: 'a5msuh',
                                      })
                                    : intl.formatMessage({
                                        defaultMessage: 'No',
                                        id: 'oUWADl',
                                      })}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={intl.formatMessage({
                                    defaultMessage: 'Crime Ref',
                                    id: '03pSDv',
                                  })}
                                >
                                  {data?.incident?.policeRef ||
                                    intl.formatMessage({
                                      defaultMessage: 'Not Provided',
                                      id: 'rVkCib',
                                    })}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={
                                    <span>
                                      {intl.formatMessage({
                                        defaultMessage: 'Officer Collar Number',
                                        id: 'r4EMV1',
                                      })}
                                    </span>
                                  }
                                >
                                  {data?.incident?.policeNo ||
                                    intl.formatMessage({
                                      defaultMessage: 'Not Provided',
                                      id: 'rVkCib',
                                    })}
                                </Descriptions.Item>
                              </Descriptions>
                            </Card>
                          </Col>
                        </Row>

                        {data?.incident?.incidentItems &&
                          data.incident.incidentItems.length > 0 && (
                            <Card style={{ marginBottom: 20 }}>
                              <Row
                                gutter={8}
                                align="middle"
                                style={{ marginBottom: 10 }}
                              >
                                <Col flex={1}>
                                  <Title level={4}>
                                    {intl.formatMessage({
                                      defaultMessage: 'Items',
                                      id: 'yNmV/R',
                                    })}
                                  </Title>
                                </Col>
                                <Col>
                                  <Button
                                    size="small"
                                    onClick={toggleAddGoods}
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: 5 }}
                                      />
                                    }
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Add Item',
                                      id: 'kNLPWW',
                                    })}
                                  </Button>
                                </Col>
                              </Row>

                              <Table
                                columns={
                                  goodsMode === GoodsMode.Generic
                                    ? [
                                        {
                                          title: intl.formatMessage({
                                            defaultMessage: 'Name',
                                            id: 'HAlOn1',
                                          }),
                                          dataIndex: 'name',
                                          key: 'name',
                                        },
                                        {
                                          title: intl.formatMessage({
                                            defaultMessage: 'Value',
                                            id: 'GufXy5',
                                          }),
                                          dataIndex: 'value',
                                          key: 'value',
                                          render: (value: number) =>
                                            `£${value.toFixed(2)}`,
                                        },
                                        {
                                          title: intl.formatMessage({
                                            defaultMessage: 'Recovered Value',
                                            id: 'bGwFFv',
                                          }),
                                          dataIndex: 'recoveredValue',
                                          key: 'recoveredValue',
                                          render: (value: number) =>
                                            `£${value.toFixed(2)}`,
                                        },
                                        {
                                          key: 'Options',
                                          title: '',
                                          dataIndex: 'Options',
                                          width: 100,
                                          render: (_, record) => (
                                            <Row gutter={8}>
                                              <Col>
                                                <Tooltip
                                                  title={intl.formatMessage({
                                                    defaultMessage: 'Edit Item',
                                                    id: 'Jm7MY5',
                                                  })}
                                                >
                                                  <Button
                                                    size="small"
                                                    disabled={saving}
                                                    onClick={() => {
                                                      setEditGoodsData(
                                                        record.item
                                                      );
                                                    }}
                                                    icon={
                                                      <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                      />
                                                    }
                                                  />
                                                </Tooltip>
                                              </Col>
                                              <Col>
                                                <Tooltip
                                                  title={intl.formatMessage({
                                                    defaultMessage:
                                                      'Remove Item',
                                                    id: 'BBWWVV',
                                                  })}
                                                >
                                                  <Popconfirm
                                                    placement="topLeft"
                                                    trigger="hover"
                                                    title={intl.formatMessage({
                                                      defaultMessage:
                                                        'Remove the item?',
                                                      id: 'NKL3Y8',
                                                    })}
                                                    onConfirm={() =>
                                                      onDeleteGoods(record.key)
                                                    }
                                                    okText={intl.formatMessage({
                                                      defaultMessage: 'Yes',
                                                      id: 'a5msuh',
                                                    })}
                                                    cancelText={intl.formatMessage(
                                                      {
                                                        defaultMessage: 'No',
                                                        id: 'oUWADl',
                                                      }
                                                    )}
                                                    overlayInnerStyle={{
                                                      padding: 10,
                                                    }}
                                                  >
                                                    <Button
                                                      size="small"
                                                      disabled={saving}
                                                      // onClick={() =>
                                                      //   onDeleteGoods(record.key)
                                                      // }
                                                      icon={
                                                        <FontAwesomeIcon
                                                          icon={faTrash}
                                                        />
                                                      }
                                                    />
                                                  </Popconfirm>
                                                </Tooltip>
                                              </Col>
                                            </Row>
                                          ),
                                        },
                                      ]
                                    : [
                                        {
                                          title: intl.formatMessage({
                                            defaultMessage: 'SKU',
                                            id: 'k4brJy',
                                          }),
                                          dataIndex: 'sku',
                                          key: 'name',
                                        },
                                        {
                                          title: intl.formatMessage({
                                            defaultMessage: 'Quantity',
                                            id: 'qVGRIE',
                                          }),
                                          dataIndex: 'quantity',
                                          key: 'quantity',
                                        },
                                        {
                                          title: intl.formatMessage({
                                            defaultMessage:
                                              'Recovered Quantity',
                                            id: '+30ZkY',
                                          }),
                                          dataIndex: 'recoveredQuantity',
                                          key: 'recoveredQuantity',
                                        },
                                      ]
                                }
                                dataSource={data?.incident?.incidentItems.map(
                                  (item) => ({
                                    key: item.id,
                                    name: item.name || '',
                                    value: item.value || 0,
                                    recoveredValue: item.recoveredValue || 0,
                                    sku: item.sku || '',
                                    quantity: item.quantity || 0,
                                    recoveredQuantity:
                                      item.recoveredQuantity || 0,
                                    item,
                                  })
                                )}
                                size="small"
                                pagination={false}
                                // TODO
                                // eslint-disable-next-line react/no-unstable-nested-components
                                summary={(tableData) => {
                                  const totalValue = tableData
                                    .map((item) => item.value || 0)
                                    .reduce((a, b) => a + b, 0);
                                  const totalRecovered = tableData
                                    .map((item) => item.recoveredValue || 0)
                                    .reduce((a, b) => a + b, 0);

                                  return (
                                    <Table.Summary.Row>
                                      <Table.Summary.Cell index={0}>
                                        {intl.formatMessage({
                                          defaultMessage: 'Total: ',
                                          id: 'ILhZuX',
                                        })}
                                      </Table.Summary.Cell>
                                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                      <Table.Summary.Cell index={1}>
                                        £{totalValue.toFixed(2)}
                                      </Table.Summary.Cell>
                                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                      <Table.Summary.Cell index={1}>
                                        £{totalRecovered.toFixed(2)}
                                      </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                  );
                                }}
                              />
                            </Card>
                          )}

                        {data?.incident && data.incident.answers.length > 0 && (
                          <Card>
                            <Title level={4}>
                              {intl.formatMessage({
                                defaultMessage: 'Incident Details',
                                id: 'Imc8gS',
                              })}
                            </Title>
                            <Descriptions>
                              {data.incident.answers.map((answer) => (
                                <Descriptions.Item
                                  label={answer.tagQuestion?.question.question}
                                >
                                  {formatAnswer(answer.answer, answer.type)}
                                </Descriptions.Item>
                              ))}
                            </Descriptions>
                          </Card>
                        )}

                        <Card>
                          <Row
                            gutter={8}
                            align="middle"
                            style={{ marginBottom: 10 }}
                          >
                            <Col flex={1}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Offenders',
                                  id: 'xb54TN',
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
                                          id: 'w4XD3a',
                                          defaultMessage:
                                            'Add Existing Offender',
                                        }),
                                        key: '1',
                                        icon: (
                                          <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            style={{ marginRight: 5 }}
                                          />
                                        ),
                                        onClick: () =>
                                          toggleAddExistingOffender(),
                                      },
                                      {
                                        label: intl.formatMessage({
                                          id: '58ir77',
                                          defaultMessage: 'Create New Offender',
                                        }),
                                        key: '2',
                                        icon: (
                                          <FontAwesomeIcon
                                            icon={faPlus}
                                            style={{ marginRight: 5 }}
                                          />
                                        ),
                                        onClick: () => toggleAddOffender(),
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
                                    defaultMessage: 'Offenders',
                                    id: 'xb54TN',
                                  })}
                                </Button>
                              </Dropdown>
                            </Col>
                          </Row>

                          {data?.incident?.offenders.length && !loading ? (
                            <OffenderTable
                              offenders={data?.incident?.offenders}
                              setEditOffenderData={setEditOffenderData}
                              onDeleteOffender={onDeleteOffender}
                              saving={saving}
                            />
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage:
                                  'No offenders for this incident',
                                id: '+qw0ns',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>

                        <Card style={{ marginTop: 20 }}>
                          <Row
                            gutter={8}
                            align="middle"
                            style={{ marginBottom: 10 }}
                          >
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
                                          defaultMessage:
                                            'Add Existing Vehicles',
                                          id: 'goP1s6',
                                        }),
                                        key: '1',
                                        icon: (
                                          <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            style={{ marginRight: 5 }}
                                          />
                                        ),
                                        onClick: () =>
                                          toggleAddExistingVehicle(),
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

                          {data?.incident?.vehicles.length && !loading ? (
                            <VehicleTable
                              vehicles={data?.incident?.vehicles}
                              setEditVehicleData={setEditVehicleData}
                              onDeleteVehicle={onDeleteVehicle}
                              saving={saving}
                            />
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage: 'No vehicles for this incident',
                                id: 'EOkcI5',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>
                        {data?.incident?.scheme.mg11Available && (
                          <Card style={{ marginTop: 20 }}>
                            <Title level={4}>
                              {intl.formatMessage({
                                defaultMessage: 'Evidence',
                                id: '6g7+6N',
                              })}
                            </Title>
                            {data?.incident?.evidence.length && !loading ? (
                              <EvidenceTable
                                evidence={data?.incident?.evidence}
                              />
                            ) : (
                              <Empty
                                description={intl.formatMessage({
                                  defaultMessage:
                                    'No evidence for this incident',
                                  id: 'GkZRlh',
                                })}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                              />
                            )}
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className={classes.updatesContainer}>
                  <InfiniteScroll
                    // height="calc(100vh - 225px)"
                    height={
                      optionRowShow
                        ? 'calc(100vh - 279px)'
                        : 'calc(100vh - 169px)'
                    }
                    className="update-scroll"
                    initialScrollY={0}
                    dataLength={data?.incident?.updates?.length || 0}
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
                    {data?.incident?.updates.map((update) => (
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
                                  reply.createdBy.id === userId
                                    ? 'left'
                                    : 'right'
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
                                  marginLeft:
                                    update.replies.length > 0 ? 48 : 0,
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
                                  marginLeft:
                                    update.replies.length > 0 ? 48 : 0,
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
                                  defaultMessage: 'Add Image to Incident',
                                  id: 'VN9g7W',
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
                    incidentId={incidentId}
                    setReplyTo={setReplyTo}
                    subscribed={data?.incident?.subscribed || false}
                    setOptionRowShow={setOptionRowShow}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Select Images To Add',
          id: 'eSO3MA',
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
          defaultMessage: 'Edit Update Content',
          id: '8sZeJM',
        })}
        open={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText={intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
          id: 'UhSUQG',
        })}
        open={linkOffender}
        width="800"
        onClose={toggleLinkOffender}
      >
        {linkOffender ? (
          <AddExistingOffender
            update={updateOffendersList}
            onClose={toggleLinkOffender}
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* incident details */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident',
          id: 'E6VJFN',
        })}
        visible={editIncident}
        width="600"
        onClose={toggleEditIncident}
      >
        {editIncident ? (
          <EditIncidentFeed
            onClose={toggleEditIncident}
            incidentId={data?.incident?.id || ''}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* offender */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
          id: 'V+RsEq',
        })}
        open={addOffender}
        width="700"
        zIndex={999}
        onClose={toggleAddOffender}
      >
        {addOffender ? (
          <AddNewOffenderSimple
            update={onAddOffender}
            onClose={toggleAddOffender}
            images={data?.incident?.images}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
          id: '1FbM4r',
        })}
        open={addExistingOffender}
        width="800"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            update={(value) => onAddExistingOffender(value.id)}
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
          id: '+OfJ4/',
        })}
        open={!!editOffenderData}
        width="700"
        onClose={() => setEditOffenderData(null)}
      >
        {editOffenderData ? (
          <SimpleEditOffender
            data={editOffenderData}
            onClose={() => setEditOffenderData(null)}
            update={onEditOffender}
            images={data?.incident?.images}
          />
        ) : (
          <div />
        )}
      </Drawer>
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
            vehicleIds={data?.incident?.vehicles.map(({ id }) => id)}
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
          defaultMessage: 'Edit Vehicle',
          id: 'X/6z9r',
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
            images={data?.incident?.images}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* goods */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Item',
          id: '4CZFEs',
        })}
        open={addGoods}
        width="400"
        zIndex={999}
        onClose={toggleAddGoods}
      >
        {addGoods ? (
          <AddGoods update={onAddGoods} onClose={toggleAddGoods} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Item',
          id: 'Jm7MY5',
        })}
        open={!!editGoodsData}
        width="400"
        zIndex={999}
        onClose={() => setEditGoodsData(null)}
      >
        {editGoodsData ? (
          <EditGoods
            update={onEditGoods}
            onClose={() => setEditGoodsData(null)}
            data={editGoodsData}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* images */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Images',
          id: 'BqhA0W',
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
            images={data?.incident?.images}
            title={intl.formatMessage({
              defaultMessage: 'incidnet',
              id: 'PjFIWc',
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
      <Lightbox
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
      />
    </div>
  );
};

export default ViewIncident;
