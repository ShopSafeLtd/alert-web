import React from 'react';
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
  faExclamationCircle,
  faImage,
  faLanguage,
  faLocationDot,
  faMagnifyingGlass,
  faPage,
  faPenToSquare,
  faPlus,
  faShareNodes,
  faSirenOn,
  faTags,
  faTrash,
  faUpload,
  faUser,
  faUsers,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import IncidentSideList from 'components/incidents/IncidentSideList';
import UpdateBar from 'components/MessageInput/UpdateBar';
import WatermarkImage from 'components/images/WatermarkImage.view';
import OffenderTable from 'components/tables/OffenderTable';
import VehicleTable from 'components/tables/VehicleTable';
import { FormattedMessage, useIntl } from 'react-intl';
import type {
  EditFeedImage,
  GoodsData,
  ImageCardData,
  LocationData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import AddNewOffenderSimple from 'components/form-components/offender/offender/AddNewOffenderSimple';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import AddGoods from 'components/form-components/incident/goods/AddGoods';
import SimpleEditOffender from 'components/form-components/offender/offender/SimpleEditOffender';
import EditGoods from 'components/form-components/incident/goods/EditGoods';
import EditImageList from 'components/images/EditImageList';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import AddDocument from 'components/form-components/documents/AddDocument';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';
import AddVehicleSimple from 'components/form-components/Vehicle/AddVehicleSimple';
import EditVehicleSimple from 'components/form-components/Vehicle/EditVehicleSimple';
import ActivityTable from 'components/tables/ActivityTable';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import InvestigationTable from 'components/tables/InvestigationTable';
import AddLocation from 'components/form-components/addresses/AddLocation';
import LocatingCard from 'components/map/LocatingCard';
import ImagesList from 'components/ViewPage/ImagesList';
import IntelSection from 'components/ViewPage/IntelSection';
import OffenderTile from 'components/form-components/linkOptions/SelectOffenders/OffenderTile';
import ShareData from '#/components/form-components/ShareData/ShareData';
import useStyles from './ViewIncident.styles';
import EvidenceTable from '../../../components/tables/EvidenceTable';
import formatAnswer from '../../../utils/format-answer';
import ViewTodo from '../../../components/form-components/Todos/ViewTodo/Todo.container';
import IncidentPriorityTag from '../../../components/incidents/IncidentPriority/IncidentPriorityTag.view';
import type { ViewIncidentQuery } from 'graphql/incidents/queries/view-incident.generated';
import { GoodsMode, IncidentPriority, Role } from 'graphql/types';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/create-document.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/delete-document.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/update-todo.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/update-simple-offender.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/create-simple-offender.generated';

const { Title, Paragraph, Text } = Typography;

interface Props {
  incidentId: string;
  userRole: Role;
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;

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
  // onEditOffender: (value: OffenderData) => void;
  // onAddOffender: (value: OffenderData) => void;
  onAddExistingOffender: (id: string) => void;
  onEditGoods: (value: GoodsData) => void;
  onAddGoods: (value: GoodsData) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  goodsMode: GoodsMode;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  hideIncident: boolean;
  translateText: () => Promise<void>;
  isTranslated: string | null;
  languageCount: number;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  viewTodoVisible: string | null;
  setViewTodoVisible: (value: string | null) => void;
  completeTodoVisible: string | null;
  setCompleteTodoVisible: (value: string | null) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  editAddress: boolean;
  toggleEditAddress: () => void;
  onEditAddress: (value: LocationData) => void;
  onAddUpdateImages: (
    images: { id: string; url: string }[],
    addToOffender?: boolean
  ) => void;
  onSelectUpdateImages: () => void;
  showOffenderOptions: boolean;
  toggleShowOffenderOptions: () => void;
  onAddUpdateImagesToOffender: (id: string) => void;
  selectedOffenderId: string;
  setSelectedOffenderId: (id: string) => void;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  onCompletedEditOffender: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  onCompletedAddOffender: () => void;
  hasConnectedSchemes: boolean;
  shareOpen: boolean;
  toggleShareOpen: () => void;
  facialDetection: boolean;
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
  addImages,
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
  // onEditOffender,
  // onAddOffender,
  onAddExistingOffender,
  onEditVehicle,
  onAddVehicle,
  onAddExistingVehicle,
  onUpdateImages,
  goodsMode,
  addTodo,
  toggleAddTodo,
  updateTodoList,
  toggleAddDocument,
  addDocument,
  updateDocumentList,
  updateDeleteDocument,
  hideIncident,
  userRole,
  translateText,
  isTranslated,
  languageCount,
  templatesLoading,
  templatesData,
  setViewTodoVisible,
  viewTodoVisible,
  setCompleteTodoVisible,
  completeTodoVisible,
  updateTodo,
  addInvestigation,
  toggleAddInvestigation,
  updateInvestigationList,
  editAddress,
  toggleEditAddress,
  onEditAddress,
  onSelectUpdateImages,
  showOffenderOptions,
  toggleShowOffenderOptions,
  onAddUpdateImagesToOffender,
  selectedOffenderId,
  setSelectedOffenderId,
  onAddUpdateImages,
  updateEditOffenderList,
  onCompletedEditOffender,
  updateAddOffenderList,
  onCompletedAddOffender,
  hasConnectedSchemes,
  toggleShareOpen,
  shareOpen,
  facialDetection,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();

  if (userRole === Role.User && data?.incident?.approved === false) {
    navigate('/app/incidents');
    return <div />;
  }

  return (
    <div className="page-container">
      <Row wrap={false}>
        {!hideIncident && (
          <Col className="no-print">
            <IncidentSideList current={incidentId} />
          </Col>
        )}

        <Col flex={1}>
          <div className={classes.viewIncident}>
            <Row className={classes.content}>
              <Col span={16} className={classes.detailsContainer}>
                {data?.incident?.approved === false &&
                  userRole !== Role.User && (
                    <div className={classes.approveBar}>
                      <Row gutter={8} justify="end">
                        <Col>
                          <Button
                            type="ghost"
                            onClick={onReject}
                            disabled={approving}
                          >
                            <FormattedMessage defaultMessage="Reject Incident" />
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            type="primary"
                            onClick={onApprove}
                            disabled={approving}
                          >
                            <FormattedMessage defaultMessage="Approve Incident" />
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
                              })
                            : intl.formatMessage({
                                defaultMessage: 'Get notified about updates.',
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
                              })
                            : intl.formatMessage({
                                defaultMessage: 'Follow',
                              })}
                        </Button>
                      </Tooltip>
                    </Col>
                    {editRights && hasConnectedSchemes && (
                      <Col>
                        <Button onClick={toggleShareOpen}>
                          <FontAwesomeIcon
                            size="1x"
                            style={{ marginRight: 8 }}
                            icon={faShareNodes}
                          />
                          <FormattedMessage defaultMessage="Share" />
                        </Button>
                      </Col>
                    )}
                    {editRights && (
                      <Col>
                        <Dropdown
                          overlay={
                            <Menu
                              items={[
                                {
                                  key: 0,
                                  label: intl.formatMessage({
                                    defaultMessage: 'Edit Details',
                                  }),
                                  onClick: () => toggleEditIncident(),
                                  icon: <FontAwesomeIcon icon={faEdit} />,
                                },
                                {
                                  key: 1,
                                  label:
                                    data?.incident?.totalImages &&
                                    data?.incident.totalImages > 0
                                      ? intl.formatMessage({
                                          defaultMessage: 'Edit Images',
                                        })
                                      : intl.formatMessage({
                                          defaultMessage: 'Add Images',
                                        }),
                                  onClick: () => toggleEditImages(),
                                  icon: <FontAwesomeIcon icon={faImage} />,
                                },
                                {
                                  key: 2,
                                  label: intl.formatMessage({
                                    defaultMessage: 'Edit Address',
                                  }),
                                  onClick: () => toggleEditAddress(),
                                  icon: (
                                    <FontAwesomeIcon icon={faLocationDot} />
                                  ),
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
                            })}
                          </Button>
                        </Dropdown>
                      </Col>
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
                          })}
                        </Button>
                      </Col>
                    )}
                  </Row>
                  <ImagesList
                    imagesData={data?.incident?.images}
                    loading={loading}
                    saving={saving}
                    editRights={editRights}
                    openLightbox={openLightbox}
                    lightBoxOpen={lightBoxOpen}
                    lightboxElements={lightboxElements}
                    editImageData={editImageData}
                    setEditImageData={setEditImageData}
                    onDeleteImage={onDeleteImage}
                    onEditImage={onEditImage}
                    hasImages={
                      !!(
                        data?.incident?.images &&
                        data?.incident?.images.length > 0
                      )
                    }
                  />
                  <div className={classes.details}>
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <div className="incident-tab-content">
                        <Card loading={loading}>
                          <Title className={classes.headerTitle} level={4}>
                            {data?.incident?.subject}
                          </Title>
                          <Text>
                            {intl.formatMessage(
                              {
                                defaultMessage: 'Alert ID: {ref}',
                              },
                              {
                                ref: data?.incident?.reference,
                              }
                            )}
                          </Text>
                          <Paragraph type="secondary" style={{ marginTop: 10 }}>
                            {isTranslated ?? data?.incident?.description}
                            {languageCount > 1 && (
                              <Tooltip
                                title={intl.formatMessage({
                                  defaultMessage: 'Translate',
                                })}
                              >
                                <FontAwesomeIcon
                                  icon={faLanguage}
                                  color="lightblue"
                                  // eslint-disable-next-line no-void
                                  onClick={() => void translateText()}
                                  style={{
                                    marginLeft: '10px',
                                    cursor: 'pointer',
                                  }}
                                />
                              </Tooltip>
                            )}
                          </Paragraph>

                          <Descriptions column={1} className={classes.desc}>
                            {data?.incident.priority ===
                            IncidentPriority.Normal ? undefined : (
                              <Descriptions.Item
                                className={classes.detail}
                                label={
                                  <span>
                                    <FontAwesomeIcon
                                      className={classes.descIcon}
                                      icon={faExclamationCircle}
                                    />
                                    {intl.formatMessage({
                                      defaultMessage: 'Priority',
                                    })}
                                  </span>
                                }
                              >
                                <IncidentPriorityTag
                                  value={
                                    data?.incident?.priority ||
                                    IncidentPriority.Normal
                                  }
                                />
                              </Descriptions.Item>
                            )}

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
                                  })}
                                </span>
                              }
                            >
                              {editRights ? (
                                <Link
                                  to={`/app/scheme-settings/businesses/view/${
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
                                    icon={faUser}
                                  />
                                  {intl.formatMessage({
                                    defaultMessage: 'Created By',
                                  })}
                                </span>
                              }
                            >
                              {data?.incident?.createdBy.fullName}
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
                                      })}
                                  </Row>
                                </Descriptions.Item>
                              )}
                          </Descriptions>
                        </Card>
                        <Row gutter={16}>
                          <Col xs={24} xl={12}>
                            <LocatingCard
                              width="100%"
                              height={194}
                              location={data?.incident?.location}
                              setLocation={onEditAddress}
                            />
                          </Col>
                          <Col xs={24} xl={12}>
                            <Card loading={loading}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Police Information',
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
                                      })}
                                    </span>
                                  }
                                >
                                  {data?.incident?.policeReported
                                    ? intl.formatMessage({
                                        defaultMessage: 'Yes',
                                      })
                                    : intl.formatMessage({
                                        defaultMessage: 'No',
                                      })}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={
                                    <span>
                                      {intl.formatMessage({
                                        defaultMessage: 'Police Attended',
                                      })}
                                    </span>
                                  }
                                >
                                  {data?.incident?.policeInvolved
                                    ? intl.formatMessage({
                                        defaultMessage: 'Yes',
                                      })
                                    : intl.formatMessage({
                                        defaultMessage: 'No',
                                      })}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={intl.formatMessage({
                                    defaultMessage: 'Crime Ref',
                                  })}
                                >
                                  {data?.incident?.policeRef ||
                                    intl.formatMessage({
                                      defaultMessage: 'Not Provided',
                                    })}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  className={classes.detail}
                                  label={
                                    <span>
                                      {intl.formatMessage({
                                        defaultMessage: 'Officer Collar Number',
                                      })}
                                    </span>
                                  }
                                >
                                  {data?.incident?.policeNo ||
                                    intl.formatMessage({
                                      defaultMessage: 'Not Provided',
                                    })}
                                </Descriptions.Item>
                              </Descriptions>
                            </Card>
                          </Col>
                        </Row>

                        <Card loading={loading}>
                          <Row
                            gutter={8}
                            align="middle"
                            style={{ marginBottom: 10 }}
                          >
                            <Col flex={1}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Items',
                                })}
                              </Title>
                            </Col>
                            {editRights && (
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
                                  })}
                                </Button>
                              </Col>
                            )}
                          </Row>
                          {data?.incident?.incidentItems.length && !loading ? (
                            <Table
                              pagination={{
                                hideOnSinglePage: true,
                                pageSize: 5,
                              }}
                              columns={
                                goodsMode === GoodsMode.Generic
                                  ? [
                                      {
                                        title: intl.formatMessage({
                                          defaultMessage: 'Name',
                                        }),
                                        dataIndex: 'name',
                                        key: 'name',
                                      },
                                      {
                                        title: intl.formatMessage({
                                          defaultMessage: 'Value',
                                        }),
                                        dataIndex: 'value',
                                        key: 'value',
                                        render: (value: number) =>
                                          `£${value.toFixed(2)}`,
                                      },
                                      {
                                        title: intl.formatMessage({
                                          defaultMessage: 'Recovered Value',
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
                                            {editRights && (
                                              <Col>
                                                <Tooltip
                                                  title={intl.formatMessage({
                                                    defaultMessage: 'Edit Item',
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
                                            )}
                                            {deleteRights && (
                                              <Col>
                                                <Tooltip
                                                  title={intl.formatMessage({
                                                    defaultMessage:
                                                      'Remove Item',
                                                  })}
                                                >
                                                  <Popconfirm
                                                    placement="topLeft"
                                                    trigger="hover"
                                                    title={intl.formatMessage({
                                                      defaultMessage:
                                                        'Remove the item?',
                                                    })}
                                                    onConfirm={() =>
                                                      onDeleteGoods(record.key)
                                                    }
                                                    okText={intl.formatMessage({
                                                      defaultMessage: 'Yes',
                                                    })}
                                                    cancelText={intl.formatMessage(
                                                      {
                                                        defaultMessage: 'No',
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
                                            )}
                                          </Row>
                                        ),
                                      },
                                    ]
                                  : [
                                      {
                                        title: intl.formatMessage({
                                          defaultMessage: 'SKU',
                                        }),
                                        dataIndex: 'sku',
                                        key: 'name',
                                      },
                                      {
                                        title: intl.formatMessage({
                                          defaultMessage: 'Quantity',
                                        }),
                                        dataIndex: 'quantity',
                                        key: 'quantity',
                                      },
                                      {
                                        title: intl.formatMessage({
                                          defaultMessage: 'Recovered Quantity',
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
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage: 'No items for this incident',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>

                        {data?.incident && data.incident.answers.length > 0 && (
                          <Card loading={loading}>
                            <Title level={4}>
                              {intl.formatMessage({
                                defaultMessage: 'Incident Details',
                              })}
                            </Title>
                            <Descriptions column={1}>
                              {data.incident.answers.map((answer) => (
                                <Descriptions.Item
                                  label={answer.tagQuestion?.question.question}
                                  key={answer.tagQuestion?.question.id}
                                >
                                  {formatAnswer(answer.answer, answer.type)}
                                </Descriptions.Item>
                              ))}
                            </Descriptions>
                          </Card>
                        )}

                        <Card loading={loading}>
                          <Row
                            gutter={8}
                            align="middle"
                            style={{ marginBottom: 10 }}
                          >
                            <Col flex={1}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Offenders',
                                })}
                              </Title>
                            </Col>
                            {editRights && (
                              <Col>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      items={[
                                        {
                                          label: intl.formatMessage({
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
                                            defaultMessage:
                                              'Create New Offender',
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
                                      defaultMessage: 'Add Offenders',
                                    })}
                                  </Button>
                                </Dropdown>
                              </Col>
                            )}
                          </Row>

                          {data?.incident?.offenders.length && !loading ? (
                            <OffenderTable
                              offenders={data?.incident?.offenders}
                              setEditOffenderData={setEditOffenderData}
                              onDeleteOffender={onDeleteOffender}
                              saving={saving}
                              editRights={editRights}
                              deleteRights={deleteRights}
                              hasNavigation
                            />
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage:
                                  'No offenders for this incident',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>

                        <Card loading={loading}>
                          <Row
                            gutter={8}
                            align="middle"
                            style={{ marginBottom: 10 }}
                          >
                            <Col flex={1}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Vehicles',
                                })}
                              </Title>
                            </Col>
                            {editRights && (
                              <Col>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      items={[
                                        {
                                          label: intl.formatMessage({
                                            defaultMessage:
                                              'Add Existing Vehicles',
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
                                            defaultMessage:
                                              'Create New Vehicle',
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
                                      defaultMessage: 'Add Vehicles',
                                    })}
                                  </Button>
                                </Dropdown>
                              </Col>
                            )}
                          </Row>

                          {data?.incident?.vehicles.length && !loading ? (
                            <VehicleTable
                              vehicles={data?.incident?.vehicles}
                              setEditVehicleData={setEditVehicleData}
                              onDeleteVehicle={onDeleteVehicle}
                              saving={saving}
                              editRights={editRights}
                              deleteRights={deleteRights}
                              hasNavigation
                            />
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage: 'No vehicles for this incident',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>

                        <Card loading={loading}>
                          <Row
                            gutter={8}
                            align="middle"
                            style={{ marginBottom: 10 }}
                          >
                            <Col flex={1}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Evidence',
                                })}
                              </Title>
                            </Col>
                            {editRights && (
                              <Col>
                                {data?.incident?.scheme.mg11Available ? (
                                  <Dropdown
                                    overlay={
                                      <Menu
                                        items={[
                                          {
                                            label: intl.formatMessage({
                                              defaultMessage: 'Create MG11',
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
                                              navigate(
                                                `/app/mg11/create/${incidentId}`
                                              ),
                                          },
                                          {
                                            label: intl.formatMessage({
                                              defaultMessage:
                                                'Create Business Impact Statement',
                                            }),
                                            key: '2',
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
                                                `/app/mg11/create-bis/${
                                                  incidentId || ''
                                                }`
                                              ),
                                          },
                                          {
                                            label: intl.formatMessage({
                                              defaultMessage: 'Upload',
                                            }),
                                            key: '3',
                                            icon: (
                                              <FontAwesomeIcon
                                                size="1x"
                                                style={{ marginRight: 8 }}
                                                icon={faUpload}
                                              />
                                            ),
                                            // disabled: !listVehiclesData?.listVehicles.total,
                                            onClick: () => toggleAddDocument(),
                                          },
                                        ]}
                                      />
                                    }
                                  >
                                    <Button
                                      // key="2"
                                      icon={
                                        <FontAwesomeIcon
                                          icon={faPlus}
                                          style={{ marginRight: 5 }}
                                        />
                                      }
                                    >
                                      {intl.formatMessage({
                                        defaultMessage: 'Add Evidence',
                                      })}
                                    </Button>
                                  </Dropdown>
                                ) : (
                                  <Button
                                    size="small"
                                    onClick={toggleAddDocument}
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: 5 }}
                                      />
                                    }
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Add Evidence',
                                    })}
                                  </Button>
                                )}
                              </Col>
                            )}
                            {/* {editRights && (
                              <Col>
                                <Button
                                  size="small"
                                  onClick={toggleAddDocument}
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Add Evidence',
                                    id: 'vgVasT',
                                  })}
                                </Button>
                              </Col>
                            )} */}
                          </Row>

                          {data?.incident?.evidence.length && !loading ? (
                            <EvidenceTable
                              evidence={data?.incident?.evidence}
                              title={ProfileUpdatedModel.Incident}
                              update={updateDeleteDocument}
                              deleteRights={deleteRights}
                            />
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage: 'No evidence for this incident',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>

                        {editRights && (
                          <Card loading={loading}>
                            <Row
                              gutter={8}
                              align="middle"
                              style={{ marginBottom: 10 }}
                            >
                              <Col flex={1}>
                                <Title level={4}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Activities',
                                  })}
                                </Title>
                              </Col>

                              <Col>
                                <Button
                                  size="small"
                                  onClick={toggleAddTodo}
                                  loading={templatesLoading}
                                  disabled={templatesLoading}
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Add Activity',
                                  })}
                                </Button>
                              </Col>
                            </Row>
                            {data?.incident?.todos.length && !loading ? (
                              <ActivityTable
                                todos={data?.incident?.todos}
                                saving={saving || loading}
                                setViewTodoVisible={setViewTodoVisible}
                                setCompleteTodoVisible={setCompleteTodoVisible}
                              />
                            ) : (
                              <Empty
                                description={intl.formatMessage({
                                  defaultMessage:
                                    'No activities for this incident',
                                })}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                              />
                            )}
                          </Card>
                        )}

                        {editRights && (
                          <Card loading={loading}>
                            <Row
                              gutter={8}
                              align="middle"
                              style={{ marginBottom: 10 }}
                            >
                              <Col flex={1}>
                                <Title level={4}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Investigations',
                                  })}
                                </Title>
                              </Col>

                              <Col>
                                <Button
                                  size="small"
                                  onClick={toggleAddInvestigation}
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Add Investigation',
                                  })}
                                </Button>
                              </Col>
                            </Row>
                            {data?.incident?.investigations.length &&
                            !loading ? (
                              <InvestigationTable
                                investigations={data?.incident?.investigations}
                              />
                            ) : (
                              <Empty
                                description={intl.formatMessage({
                                  defaultMessage:
                                    'No investigations for this incident',
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
              <Col span={8} className="no-print">
                <div className={classes.updatesContainer}>
                  <IntelSection
                    updates={data?.incident?.updates}
                    scrolledToTop={scrolledToTop}
                    loadMore={loadMore}
                    saving={saving}
                    editRights={editRights}
                    userId={userId}
                    confirmDeleteUpdate={confirmDeleteUpdate}
                    setEditUpdate={setEditUpdate}
                    setReplyTo={setReplyTo}
                    onAddToIncident={(value) => onAddUpdateImages(value)}
                    onAddToOffender={
                      data?.incident.offenders &&
                      data?.incident.offenders.length > 0
                        ? (value) => onAddUpdateImages(value, true)
                        : undefined
                    }
                    optionRowShow={optionRowShow}
                  />

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
        })}
        open={addImages !== null}
        onOk={() => {
          if (selectedImages && selectedImages.length > 0)
            onSelectUpdateImages();
        }}
        onCancel={closeAddImages}
        width={addImages ? addImages.length * 250 : 400}
        okText={intl.formatMessage({
          defaultMessage: 'Add Images',
        })}
      >
        <Row justify="center" gutter={8}>
          {addImages?.map((image) => (
            <Col key={image.id} className={classes.selectCard}>
              <Checkbox
                onChange={() => toggleSelectImages(image.id)}
                checked={selectedImages.includes(image.id)}
                className={classes.checkBox}
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
          defaultMessage: 'Select an offender to add the update images',
        })}
        open={showOffenderOptions}
        onOk={() => {
          if (selectedOffenderId)
            onAddUpdateImagesToOffender(selectedOffenderId);
        }}
        onCancel={() => {
          toggleShowOffenderOptions();
          closeAddImages();
          setSelectedOffenderId('');
        }}
        width={700}
        okText={intl.formatMessage({
          defaultMessage: 'Add Offender',
        })}
      >
        <Row gutter={8}>
          {data?.incident.offenders?.map((offender) => (
            <Col
              className={classes.selectCard}
              key={offender.id}
              span={offender.images && offender.images.length > 0 ? 12 : 6}
            >
              <Checkbox
                value={offender.id}
                checked={offender.id === selectedOffenderId}
                onChange={() => setSelectedOffenderId(offender.id)}
                className={classes.checkBox}
              />

              <OffenderTile
                offender={offender}
                onClick={() => setSelectedOffenderId(offender.id)}
              />
            </Col>
          ))}
        </Row>
      </Modal>
      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Edit Update Content',
        })}
        open={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText={intl.formatMessage({ defaultMessage: 'Save' })}
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        open={linkOffender}
        width="1000"
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
          defaultMessage: 'Edit Incident Details',
        })}
        open={editIncident}
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
      {/* images */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Images',
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
            })}
            saving={saving}
            facialDet={facialDetection}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* offender */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
        })}
        open={!!editOffenderData}
        width="700"
        onClose={() => setEditOffenderData(null)}
      >
        {editOffenderData ? (
          <SimpleEditOffender
            data={editOffenderData}
            onClose={() => setEditOffenderData(null)}
            update={updateEditOffenderList}
            images={data?.incident?.images}
            onCompleted={onCompletedEditOffender}
            incidentBusinessId={data?.incident.business?.id}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
        })}
        open={addOffender}
        width="700"
        zIndex={999}
        onClose={toggleAddOffender}
      >
        {addOffender ? (
          <AddNewOffenderSimple
            onCompleted={onCompletedAddOffender}
            update={updateAddOffenderList}
            incidentId={data?.incident.id}
            groupsIds={data?.incident.groups.map(({ id }) => id)}
            onClose={toggleAddOffender}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            incidentBusinessId={data?.incident.business?.id}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
        })}
        open={addExistingOffender}
        width="1000"
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

      {/* vehicle */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        open={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
        bodyStyle={{ overflow: 'hidden' }}
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
        })}
        open={addVehicle}
        width="700"
        zIndex={999}
        onClose={toggleAddVehicle}
      >
        {addVehicle ? (
          <AddVehicleSimple
            update={onAddVehicle}
            onClose={toggleAddVehicle}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle',
        })}
        open={!!editVehicleData}
        width="800"
        onClose={() => setEditVehicleData(null)}
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicleSimple
            editData={editVehicleData}
            update={onEditVehicle}
            onClose={() => setEditVehicleData(null)}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* goods */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Item',
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

      {/* todo */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        open={addTodo}
        width="600"
        onClose={toggleAddTodo}
      >
        {addTodo ? (
          <AddTodo
            update={updateTodoList}
            onClose={toggleAddTodo}
            incidentId={data?.incident?.id}
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        open={completeTodoVisible !== null}
        width={800}
        onClose={() => setCompleteTodoVisible(null)}
      >
        {completeTodoVisible ? (
          <ViewTodo
            id={completeTodoVisible}
            onClose={() => setCompleteTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        open={!!viewTodoVisible}
        width={800}
        onClose={() => setViewTodoVisible(null)}
      >
        {viewTodoVisible ? (
          <ViewTodo
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
            })}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* evidence */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        open={addDocument}
        width="600"
        onClose={toggleAddDocument}
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocument
            incidentId={data?.incident?.id || ''}
            onClose={toggleAddDocument}
            update={updateDocumentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* investigation */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        open={addInvestigation}
        width="500"
        onClose={toggleAddInvestigation}
      >
        {addInvestigation ? (
          <AddInvestigation
            update={updateInvestigationList}
            incidentId={data?.incident?.id || ''}
            onClose={toggleAddInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* address */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Address',
        })}
        open={editAddress}
        width="600"
        zIndex={999}
        onClose={toggleEditAddress}
      >
        {editAddress ? (
          <AddLocation
            locationData={data?.incident?.location ?? undefined}
            onClose={toggleEditAddress}
            update={onEditAddress}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Share Incident',
        })}
        bodyStyle={{ padding: 0 }}
        visible={shareOpen}
        width={700}
        onClose={toggleShareOpen}
      >
        {shareOpen && (
          <ShareData incidentId={incidentId} onClose={toggleShareOpen} />
        )}
      </Drawer>
    </div>
  );
};

export default ViewIncident;
