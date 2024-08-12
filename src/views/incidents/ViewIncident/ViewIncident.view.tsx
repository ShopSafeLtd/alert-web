import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/__generated__/create-document.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { ViewIncidentQuery } from 'graphql/incidents/queries/__generated__/view-incident.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type {
  EditFeedImage,
  GoodsData,
  ImageCardData,
  LocationData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import ShareData from '#/components/form-components/ShareData/ShareData';
import CctvRecords from '#/views/incidents/ViewIncident/components/CctvRecords.view';
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
  faUserTag,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import UpdateBar from 'components/MessageInput/UpdateBar';
import ImagesList from 'components/ViewPage/ImagesList';
import IntelSection from 'components/ViewPage/IntelSection';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import AddTodo from 'components/form-components/Todos/AddTodo';
import AddVehicleSimple from 'components/form-components/Vehicle/AddVehicleSimple';
import EditVehicleSimple from 'components/form-components/Vehicle/EditVehicleSimple';
import AddLocation from 'components/form-components/addresses/AddLocation';
import AddDocument from 'components/form-components/documents/AddDocument';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import AddGoods from 'components/form-components/incident/goods/AddGoods';
import EditGoods from 'components/form-components/incident/goods/EditGoods';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import OffenderTile from 'components/form-components/linkOptions/SelectOffenders/OffenderTile';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import AddNewOffenderSimple from 'components/form-components/offender/offender/AddNewOffenderSimple';
import SimpleEditOffender from 'components/form-components/offender/offender/SimpleEditOffender';
import EditImageList from 'components/images/EditImageList';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentSideList from 'components/incidents/IncidentSideList';
import LocatingCard from 'components/map/LocatingCard';
import ActivityTable from 'components/tables/ActivityTable';
import InvestigationTable from 'components/tables/InvestigationTable';
import OffenderTable from 'components/tables/OffenderTable';
import VehicleTable from 'components/tables/VehicleTable';
import { GoodsMode, IncidentPriority, Role } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';

import ViewTodo from '../../../components/form-components/Todos/ViewTodo/Todo.container';
import IncidentPriorityTag from '../../../components/incidents/IncidentPriority/IncidentPriorityTag.view';
import EvidenceTable from '../../../components/tables/EvidenceTable';
import formatAnswer from '../../../utils/format-answer';
import useStyles from './ViewIncident.styles';

const { Paragraph, Text, Title } = Typography;

interface Props {
  addDocument: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addGoods: boolean;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  addInvestigation: boolean;

  addOffender: boolean;
  addTodo: boolean;
  addVehicle: boolean;
  approving: boolean;
  closeAddImages: () => void;
  completeTodoVisible: null | string;
  confirmDeleteUpdate: (updateId: string) => void;
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editGoodsData: GoodsData | null;
  editImageData: EditFeedImage | null;
  editImages: boolean;
  editIncident: boolean;
  editOffenderData: OffenderData | null;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  editVehicleData: VehicleData | null;
  facialDetection: boolean;
  goodsMode: GoodsMode;
  handleEditUpdate: () => void;
  hasConnectedSchemes: boolean;
  hideIncident: boolean;
  incidentId: string;
  // showOriginal: boolean;
  languageCount: number;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  linkOffender: boolean;
  loadMore: boolean;
  loading: boolean;
  // onAddOffender: (value: OffenderData) => void;
  onAddExistingOffender: (id: string) => void;
  onAddExistingVehicle: (id: string) => void;
  onAddGoods: (value: GoodsData) => void;
  onAddUpdateImages: (
    images: { id: string; url: string }[],
    addToOffender?: boolean
  ) => void;
  onAddUpdateImagesToOffender: (id: string) => void;
  onAddVehicle: (value: VehicleData) => void;
  onApprove: () => void;
  onCompletedAddOffender: () => void;
  onCompletedEditOffender: () => void;
  onDelete: (incidentId: string) => void;
  onDeleteGoods: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onEditAddress: (value: LocationData) => void;
  onEditGoods: (value: GoodsData) => void;
  onEditImage: (id: EditFeedImage) => void;
  onEditVehicle: (value: VehicleData) => void;
  onReject: () => void;
  onSelectUpdateImages: () => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  openLightbox: (index: number) => void;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  selectedImages: string[];
  selectedOffenderId: string;
  // onEditOffender: (value: OffenderData) => void;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditGoodsData: (value: GoodsData | null) => void;
  setEditImageData: (value: EditFeedImage | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setEditUpdateInput: (value: string) => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  setOptionRowShow: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  setSelectedOffenderId: (id: string) => void;
  setViewTodoVisible: (value: null | string) => void;
  shareOpen: boolean;
  showOffenderOptions: boolean;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  toggleAddDocument: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddGoods: () => void;
  toggleAddInvestigation: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleEditAddress: () => void;
  toggleEditImages: () => void;
  toggleEditIncident: () => void;
  toggleLinkOffender: () => void;
  toggleSelectImages: (id: string) => void;
  toggleShareOpen: () => void;
  toggleShowOffenderOptions: () => void;
  toggleShowOriginalDescription: () => void;
  toggleSubscribe: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  updateOffendersList: (value: OffenderData) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  userId: string;
  userRole: Role;
  viewTodoVisible: null | string;
}

const ViewIncident = ({
  addDocument,
  addExistingOffender,
  addExistingVehicle,
  addGoods,
  addImages,
  addInvestigation,
  addOffender,
  addTodo,
  addVehicle,
  approving,
  closeAddImages,
  completeTodoVisible,
  confirmDeleteUpdate,
  data,
  deleteRights,
  editAddress,
  editGoodsData,
  editImageData,
  editImages,
  editIncident,
  editOffenderData,
  editRights,
  editUpdate,
  editUpdateInput,
  editVehicleData,
  facialDetection,
  goodsMode,
  handleEditUpdate,
  hasConnectedSchemes,
  hideIncident,
  incidentId,
  // showOriginal,
  languageCount,
  lightBoxOpen,
  lightboxElements,
  linkOffender,
  loadMore,
  loading,
  // onAddOffender,
  onAddExistingOffender,
  onAddExistingVehicle,
  onAddGoods,
  onAddUpdateImages,
  onAddUpdateImagesToOffender,
  onAddVehicle,
  onApprove,
  onCompletedAddOffender,
  onCompletedEditOffender,
  onDelete,
  onDeleteGoods,
  onDeleteImage,
  onDeleteOffender,
  onDeleteVehicle,
  onEditAddress,
  onEditGoods,
  onEditImage,
  onEditVehicle,
  onReject,
  onSelectUpdateImages,
  onUpdateImages,
  openLightbox,
  optionRowShow,
  replyTo,
  saving,
  scrolledToTop,
  // onEditOffender,
  selectedImages,
  selectedOffenderId,
  setCompleteTodoVisible,
  setEditGoodsData,
  setEditImageData,
  setEditOffenderData,
  setEditUpdate,
  setEditUpdateInput,
  setEditVehicleData,
  setOptionRowShow,
  setReplyTo,
  setSelectedOffenderId,
  setViewTodoVisible,
  shareOpen,
  showOffenderOptions,
  templatesData,
  templatesLoading,
  toggleAddDocument,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddGoods,
  toggleAddInvestigation,
  toggleAddOffender,
  toggleAddTodo,
  toggleAddVehicle,
  toggleEditAddress,
  toggleEditImages,
  toggleEditIncident,
  toggleLinkOffender,
  toggleSelectImages,
  toggleShareOpen,
  toggleShowOffenderOptions,
  toggleShowOriginalDescription,
  toggleSubscribe,
  updateAddOffenderList,
  updateDeleteDocument,
  updateDocumentList,
  updateEditOffenderList,
  updateInvestigationList,
  updateOffendersList,
  updateTodo,
  updateTodoList,
  userId,
  userRole,
  viewTodoVisible,
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
              <Col className={classes.detailsContainer} span={16}>
                {data?.incident?.approved === false &&
                  userRole !== Role.User && (
                    <div className={classes.approveBar}>
                      <Row gutter={8} justify="end">
                        <Col>
                          <Button
                            disabled={approving}
                            onClick={onReject}
                            type="ghost"
                          >
                            <FormattedMessage defaultMessage="Reject Incident" />
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            disabled={approving}
                            onClick={onApprove}
                            type="primary"
                          >
                            <FormattedMessage defaultMessage="Approve Incident" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )}
                <div className={classes.detailsContent}>
                  <Row className={classes.headerBar} gutter={8} justify="end">
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
                          color={
                            data?.incident?.subscribed ? undefined : 'danger'
                          }
                          disabled={saving}
                          loading={saving}
                          onClick={toggleSubscribe}
                          type="ghost"
                        >
                          <FontAwesomeIcon
                            icon={
                              data?.incident?.subscribed ? faBellSlash : faBell
                            }
                            size="1x"
                            style={{ marginRight: 8 }}
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
                            icon={faShareNodes}
                            size="1x"
                            style={{ marginRight: 8 }}
                          />
                          <FormattedMessage defaultMessage="Share" />
                        </Button>
                      </Col>
                    )}
                    {editRights && (
                      <Col>
                        <Dropdown
                          arrow={{ pointAtCenter: true }}
                          overlay={
                            <Menu
                              items={[
                                {
                                  icon: <FontAwesomeIcon icon={faEdit} />,
                                  key: 0,
                                  label: intl.formatMessage({
                                    defaultMessage: 'Edit Details',
                                  }),
                                  onClick: () => toggleEditIncident(),
                                },
                                {
                                  icon: <FontAwesomeIcon icon={faImage} />,
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
                                },
                                {
                                  icon: (
                                    <FontAwesomeIcon icon={faLocationDot} />
                                  ),
                                  key: 2,
                                  label: intl.formatMessage({
                                    defaultMessage: 'Edit Address',
                                  }),
                                  onClick: () => toggleEditAddress(),
                                },
                              ]}
                            />
                          }
                          placement="bottomRight"
                        >
                          <Button type="ghost">
                            <FontAwesomeIcon
                              icon={faEdit}
                              size="1x"
                              style={{ marginRight: 8 }}
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
                          onClick={() => onDelete(incidentId)}
                          type="ghost"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="1x"
                            style={{ marginRight: 8 }}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Delete',
                          })}
                        </Button>
                      </Col>
                    )}
                  </Row>
                  <ImagesList
                    editImageData={editImageData}
                    editRights={editRights}
                    hasImages={
                      !!(
                        data?.incident?.images &&
                        data?.incident?.images.length > 0
                      )
                    }
                    imagesData={data?.incident?.images}
                    lightBoxOpen={lightBoxOpen}
                    lightboxElements={lightboxElements}
                    loading={loading}
                    onDeleteImage={onDeleteImage}
                    onEditImage={onEditImage}
                    openLightbox={openLightbox}
                    saving={saving}
                    setEditImageData={setEditImageData}
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
                          <Paragraph style={{ marginTop: 10 }} type="secondary">
                            {/* // TODO fix this back to originalDescription/description */}
                            {/* {showOriginal */}
                            {/*   ? data?.incident.originalDescription */}
                            {/*   : data?.incident?.description} */}
                            {data?.incident?.description}
                            {languageCount > 1 && (
                              <Tooltip
                                title={intl.formatMessage({
                                  defaultMessage: 'Translate',
                                })}
                              >
                                <FontAwesomeIcon
                                  color="lightblue"
                                  icon={faLanguage}
                                  // eslint-disable-next-line no-void
                                  onClick={() =>
                                    toggleShowOriginalDescription()
                                  }
                                  style={{
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                  }}
                                />
                              </Tooltip>
                            )}
                          </Paragraph>

                          <Descriptions className={classes.desc} column={1}>
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

                          <Descriptions className={classes.desc} column={1}>
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
                                  <Tag className={classes.tag} key={group.id}>
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
                                    defaultMessage: 'Incident Types',
                                  })}
                                </span>
                              }
                            >
                              <Row>
                                {data?.incident?.crimeTypes.map((tag) => (
                                  <Tag
                                    className={classes.tag}
                                    color="red"
                                    key={tag.id}
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
                                        className={classes.tag}
                                        color="red"
                                        key={tag.id}
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
                                  <Row align="middle" justify="start">
                                    {data?.incident?.impactTags.map((tag) => (
                                      <Tag
                                        className={classes.tag}
                                        color="red"
                                        key={tag.id}
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
                          <Col xl={12} xs={24}>
                            <LocatingCard
                              height={194}
                              location={data?.incident?.location}
                              setLocation={onEditAddress}
                              width="100%"
                            />
                          </Col>
                          <Col xl={12} xs={24}>
                            <Card loading={loading}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Police Information',
                                })}
                              </Title>
                              <Descriptions
                                className={classes.desc}
                                column={1}
                                style={{ marginTop: 10 }}
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
                            align="middle"
                            gutter={8}
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
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                  onClick={toggleAddGoods}
                                  size="small"
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
                              columns={
                                goodsMode === GoodsMode.Generic
                                  ? [
                                      {
                                        dataIndex: 'name',
                                        key: 'name',
                                        title: intl.formatMessage({
                                          defaultMessage: 'Name',
                                        }),
                                      },
                                      {
                                        dataIndex: 'value',
                                        key: 'value',
                                        render: (value: number) =>
                                          `£${value.toFixed(2)}`,
                                        title: intl.formatMessage({
                                          defaultMessage: 'Value',
                                        }),
                                      },
                                      {
                                        dataIndex: 'recoveredValue',
                                        key: 'recoveredValue',
                                        render: (value: number) =>
                                          `£${value.toFixed(2)}`,
                                        title: intl.formatMessage({
                                          defaultMessage: 'Recovered Value',
                                        }),
                                      },
                                      {
                                        dataIndex: 'itemTotal',
                                        key: 'itemTotal',
                                        render: (value: number) =>
                                          `£${value.toFixed(2)}`,
                                        title: intl.formatMessage({
                                          defaultMessage: 'Item Total',
                                        }),
                                      },
                                      {
                                        dataIndex: 'Options',
                                        key: 'Options',
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
                                                    disabled={saving}
                                                    icon={
                                                      <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                      />
                                                    }
                                                    onClick={() => {
                                                      setEditGoodsData(
                                                        record.item
                                                      );
                                                    }}
                                                    size="small"
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
                                                    cancelText={intl.formatMessage(
                                                      {
                                                        defaultMessage: 'No',
                                                      }
                                                    )}
                                                    okText={intl.formatMessage({
                                                      defaultMessage: 'Yes',
                                                    })}
                                                    onConfirm={() =>
                                                      onDeleteGoods(record.key)
                                                    }
                                                    overlayInnerStyle={{
                                                      padding: 10,
                                                    }}
                                                    placement="topLeft"
                                                    title={intl.formatMessage({
                                                      defaultMessage:
                                                        'Remove the item?',
                                                    })}
                                                    trigger="hover"
                                                  >
                                                    <Button
                                                      disabled={saving}
                                                      // }
                                                      icon={
                                                        <FontAwesomeIcon
                                                          icon={faTrash}
                                                        />
                                                      }
                                                      // onClick={() =>
                                                      //   onDeleteGoods(record.key)
                                                      size="small"
                                                    />
                                                  </Popconfirm>
                                                </Tooltip>
                                              </Col>
                                            )}
                                          </Row>
                                        ),
                                        title: '',
                                        width: 100,
                                      },
                                    ]
                                  : [
                                      {
                                        dataIndex: 'name',
                                        key: 'name',
                                        render: (value: string) => (
                                          <Tooltip title={value}>
                                            <Paragraph
                                              ellipsis={{ rows: 1 }}
                                              style={{
                                                marginBottom: 0,
                                                width: 200,
                                              }}
                                            >
                                              {value}
                                            </Paragraph>
                                          </Tooltip>
                                        ),
                                        title: intl.formatMessage({
                                          defaultMessage: 'Name',
                                        }),
                                      },
                                      {
                                        dataIndex: 'sku',
                                        key: 'sku',
                                        title: intl.formatMessage({
                                          defaultMessage: 'SKU',
                                        }),
                                      },
                                      {
                                        dataIndex: 'value',
                                        key: 'value',
                                        render: (value: number) =>
                                          `£${value.toFixed(2)}`,
                                        title: intl.formatMessage({
                                          defaultMessage: 'Item Value',
                                        }),
                                      },
                                      {
                                        dataIndex: 'quantity',
                                        key: 'quantity',
                                        title: intl.formatMessage({
                                          defaultMessage: 'Quantity',
                                        }),
                                      },
                                      {
                                        dataIndex: 'recoveredQuantity',
                                        key: 'recoveredQuantity',
                                        title: intl.formatMessage({
                                          defaultMessage: 'Recovered',
                                        }),
                                      },
                                      {
                                        dataIndex: 'itemTotal',
                                        key: 'itemTotal',
                                        render: (value: number) =>
                                          `£${value.toFixed(2)}`,
                                        title: intl.formatMessage({
                                          defaultMessage: 'Item Total',
                                        }),
                                      },
                                    ]
                              }
                              dataSource={data?.incident?.incidentItems.map(
                                (item) => ({
                                  item,
                                  itemTotal:
                                    goodsMode === GoodsMode.Generic
                                      ? (item.value ?? 0) -
                                        (item.recoveredQuantity ?? 0)
                                      : (item.value ?? 0) *
                                          (item.quantity ?? 0) -
                                        (item.value ?? 0) *
                                          (item.recoveredQuantity ?? 0),
                                  key: item.id ?? '',
                                  name: item.name ?? '',
                                  quantity: item.quantity ?? 0,
                                  recoveredQuantity:
                                    item.recoveredQuantity ?? 0,
                                  recoveredValue: item.recoveredValue ?? 0,
                                  sku: item.sku ?? '',
                                  value: item.value ?? 0,
                                })
                              )}
                              pagination={{
                                hideOnSinglePage: true,
                                pageSize: 100,
                              }}
                              size="small"
                              // TODO
                              // eslint-disable-next-line react/no-unstable-nested-components
                              summary={(tableData) => {
                                const value = tableData
                                  .map((item) => item.value || 0)
                                  .reduce((a, b) => a + b, 0);
                                const totalRecoveredValue = tableData
                                  .map((item) => item.recoveredValue || 0)
                                  .reduce((a, b) => a + b, 0);
                                const totalQnty = tableData
                                  .map((item) => item.quantity || 0)
                                  .reduce((a, b) => a + b, 0);
                                const totalRecoveredQnty = tableData
                                  .map((item) => item.recoveredQuantity || 0)
                                  .reduce((a, b) => a + b, 0);
                                const totalValue = tableData
                                  .map((item) => item.itemTotal || 0)
                                  .reduce((a, b) => a + b, 0);

                                return goodsMode === GoodsMode.Generic ? (
                                  <Table.Summary.Row>
                                    <Table.Summary.Cell index={2}>
                                      {intl.formatMessage({
                                        defaultMessage: 'Totals: ',
                                      })}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>
                                      <FormattedMessage defaultMessage="£" />
                                      {value.toFixed(2)}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4}>
                                      <FormattedMessage defaultMessage="£" />
                                      {totalRecoveredValue.toFixed(2)}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5}>
                                      <FormattedMessage defaultMessage="£" />
                                      {totalValue.toFixed(2)}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5} />
                                  </Table.Summary.Row>
                                ) : (
                                  <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} />
                                    <Table.Summary.Cell index={1} />
                                    <Table.Summary.Cell index={2}>
                                      {intl.formatMessage({
                                        defaultMessage: 'Total: ',
                                      })}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>
                                      {totalQnty}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4}>
                                      {totalRecoveredQnty}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5}>
                                      <FormattedMessage defaultMessage="£" />
                                      {totalValue.toFixed(2)}
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
                                  key={answer.tagQuestion?.question.id}
                                  label={answer.tagQuestion?.question.question}
                                >
                                  {formatAnswer(answer.answer, answer.type)}
                                </Descriptions.Item>
                              ))}
                            </Descriptions>
                          </Card>
                        )}

                        <Card loading={loading}>
                          <Row
                            align="middle"
                            gutter={8}
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
                                          icon: (
                                            <FontAwesomeIcon
                                              icon={faMagnifyingGlass}
                                              style={{ marginRight: 5 }}
                                            />
                                          ),
                                          key: '1',
                                          label: intl.formatMessage({
                                            defaultMessage:
                                              'Add Existing Offender',
                                          }),
                                          onClick: () =>
                                            toggleAddExistingOffender(),
                                        },
                                        {
                                          icon: (
                                            <FontAwesomeIcon
                                              icon={faPlus}
                                              style={{ marginRight: 5 }}
                                            />
                                          ),
                                          key: '2',
                                          label: intl.formatMessage({
                                            defaultMessage:
                                              'Create New Offender',
                                          }),
                                          onClick: () => toggleAddOffender(),
                                        },
                                      ]}
                                    />
                                  }
                                >
                                  <Button
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: 5 }}
                                      />
                                    }
                                    size="small"
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
                              deleteRights={deleteRights}
                              editRights={editRights}
                              hasNavigation
                              offenders={data?.incident?.offenders}
                              onDeleteOffender={onDeleteOffender}
                              saving={saving}
                              setEditOffenderData={setEditOffenderData}
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
                            align="middle"
                            gutter={8}
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
                                          icon: (
                                            <FontAwesomeIcon
                                              icon={faMagnifyingGlass}
                                              style={{ marginRight: 5 }}
                                            />
                                          ),
                                          key: '1',
                                          label: intl.formatMessage({
                                            defaultMessage:
                                              'Add Existing Vehicles',
                                          }),
                                          onClick: () =>
                                            toggleAddExistingVehicle(),
                                        },
                                        {
                                          icon: (
                                            <FontAwesomeIcon
                                              icon={faPlus}
                                              style={{ marginRight: 5 }}
                                            />
                                          ),
                                          key: '2',
                                          label: intl.formatMessage({
                                            defaultMessage:
                                              'Create New Vehicle',
                                          }),
                                          onClick: () => toggleAddVehicle(),
                                        },
                                      ]}
                                    />
                                  }
                                >
                                  <Button
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: 5 }}
                                      />
                                    }
                                    size="small"
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
                              deleteRights={deleteRights}
                              editRights={editRights}
                              hasNavigation
                              onDeleteVehicle={onDeleteVehicle}
                              saving={saving}
                              setEditVehicleData={setEditVehicleData}
                              vehicles={data?.incident?.vehicles}
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

                        {data?.incident &&
                        data.incident.cctvRecords.length > 0 ? (
                          <CctvRecords
                            data={data.incident.cctvRecords.map((item) => ({
                              cameraNumber: item.cameraNumber,
                              endTime: item.endTime,
                              key: item.id,
                              showFace: item.showFace,
                              showIncident: item.showIncident,
                              startTime: item.startTime,
                            }))}
                            loading={loading}
                          />
                        ) : (
                          <div />
                        )}

                        <Card loading={loading}>
                          <Row
                            align="middle"
                            gutter={8}
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
                                            icon: (
                                              <FontAwesomeIcon
                                                icon={faPage}
                                                size="1x"
                                                style={{ marginRight: 8 }}
                                              />
                                            ),
                                            key: '1',
                                            label: intl.formatMessage({
                                              defaultMessage: 'Create MG11',
                                            }),
                                            // disabled: !listVehiclesData?.listVehicles.total,
                                            onClick: () =>
                                              navigate(
                                                `/app/mg11/create/${incidentId}`
                                              ),
                                          },
                                          {
                                            icon: (
                                              <FontAwesomeIcon
                                                icon={faPage}
                                                size="1x"
                                                style={{ marginRight: 8 }}
                                              />
                                            ),
                                            key: '2',
                                            label: intl.formatMessage({
                                              defaultMessage:
                                                'Create Business Impact Statement',
                                            }),
                                            // disabled: !listVehiclesData?.listVehicles.total,
                                            onClick: () =>
                                              navigate(
                                                `/app/mg11/create-bis/${
                                                  incidentId || ''
                                                }`
                                              ),
                                          },
                                          {
                                            icon: (
                                              <FontAwesomeIcon
                                                icon={faUpload}
                                                size="1x"
                                                style={{ marginRight: 8 }}
                                              />
                                            ),
                                            key: '3',
                                            label: intl.formatMessage({
                                              defaultMessage: 'Upload',
                                            }),
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
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: 5 }}
                                      />
                                    }
                                    onClick={toggleAddDocument}
                                    size="small"
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
                              deleteRights={deleteRights}
                              evidence={data?.incident?.evidence}
                              title={ProfileUpdatedModel.Incident}
                              update={updateDeleteDocument}
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
                              align="middle"
                              gutter={8}
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
                                  disabled={templatesLoading}
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                  loading={templatesLoading}
                                  onClick={toggleAddTodo}
                                  size="small"
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Add Activity',
                                  })}
                                </Button>
                              </Col>
                            </Row>
                            {data?.incident?.todos.length && !loading ? (
                              <ActivityTable
                                saving={saving || loading}
                                setCompleteTodoVisible={setCompleteTodoVisible}
                                setViewTodoVisible={setViewTodoVisible}
                                todos={data?.incident?.todos}
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
                              align="middle"
                              gutter={8}
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
                                  icon={
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                  onClick={toggleAddInvestigation}
                                  size="small"
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
              <Col className="no-print" span={8}>
                <div className={classes.updatesContainer}>
                  <IntelSection
                    confirmDeleteUpdate={confirmDeleteUpdate}
                    editRights={editRights}
                    loadMore={loadMore}
                    onAddToIncident={(value) => onAddUpdateImages(value)}
                    onAddToOffender={
                      data?.incident.offenders &&
                      data?.incident.offenders.length > 0
                        ? (value) => onAddUpdateImages(value, true)
                        : undefined
                    }
                    optionRowShow={optionRowShow}
                    saving={saving}
                    scrolledToTop={scrolledToTop}
                    setEditUpdate={setEditUpdate}
                    setReplyTo={setReplyTo}
                    updates={data?.incident?.updates}
                    userId={userId}
                  />

                  <UpdateBar
                    incidentId={incidentId}
                    replyTo={replyTo}
                    setOptionRowShow={setOptionRowShow}
                    setReplyTo={setReplyTo}
                    subscribed={data?.incident?.subscribed || false}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Modal
        okText={intl.formatMessage({
          defaultMessage: 'Add Images',
        })}
        onCancel={closeAddImages}
        onOk={() => {
          if (selectedImages && selectedImages.length > 0)
            onSelectUpdateImages();
        }}
        open={addImages !== null}
        title={intl.formatMessage({
          defaultMessage: 'Select Images To Add',
        })}
        width={addImages ? addImages.length * 250 : 400}
      >
        <Row gutter={8} justify="center">
          {addImages?.map((image) => (
            <Col className={classes.selectCard} key={image.id}>
              <Checkbox
                checked={selectedImages.includes(image.id)}
                className={classes.checkBox}
                onChange={() => toggleSelectImages(image.id)}
              />
              <div style={{ height: 200, marginBottom: 10, width: 200 }}>
                <WatermarkImage url={image.url} />
              </div>
            </Col>
          ))}
        </Row>
      </Modal>
      <Modal
        okText={intl.formatMessage({
          defaultMessage: 'Add Offender',
        })}
        onCancel={() => {
          toggleShowOffenderOptions();
          closeAddImages();
          setSelectedOffenderId('');
        }}
        onOk={() => {
          if (selectedOffenderId)
            onAddUpdateImagesToOffender(selectedOffenderId);
        }}
        open={showOffenderOptions}
        title={intl.formatMessage({
          defaultMessage: 'Select an offender to add the update images',
        })}
        width={700}
      >
        <Row gutter={8}>
          {data?.incident.offenders?.map((offender) => (
            <Col
              className={classes.selectCard}
              key={offender.id}
              span={offender.images && offender.images.length > 0 ? 12 : 6}
            >
              <Checkbox
                checked={offender.id === selectedOffenderId}
                className={classes.checkBox}
                onChange={() => setSelectedOffenderId(offender.id)}
                value={offender.id}
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
        okText={intl.formatMessage({ defaultMessage: 'Save' })}
        onCancel={() => setEditUpdate(null)}
        onOk={handleEditUpdate}
        open={editUpdate !== null}
        title={intl.formatMessage({
          defaultMessage: 'Edit Update Content',
        })}
      >
        <Input
          onChange={(e) => setEditUpdateInput(e.target.value)}
          value={editUpdateInput}
        />
      </Modal>

      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="1000"
      >
        {linkOffender ? (
          <AddExistingOffender
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* incident details */}
      <Drawer
        onClose={toggleEditIncident}
        open={editIncident}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Details',
        })}
        width="600"
      >
        {editIncident ? (
          <EditIncidentFeed
            incidentId={data?.incident?.id || ''}
            onClose={toggleEditIncident}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* images */}
      <Drawer
        onClose={toggleEditImages}
        open={editImages}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Images',
        })}
        width="800"
        zIndex={999}
      >
        {editImages ? (
          <EditImageList
            facialDet={facialDetection}
            images={data?.incident?.images}
            onClose={toggleEditImages}
            saving={saving}
            title={intl.formatMessage({
              defaultMessage: 'Incident',
            })}
            update={onUpdateImages}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* offender */}
      <Drawer
        onClose={() => setEditOffenderData(null)}
        open={!!editOffenderData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
        })}
        width="700"
      >
        {editOffenderData ? (
          <SimpleEditOffender
            data={editOffenderData}
            images={data?.incident?.images}
            incidentBusinessId={data?.incident.business?.id}
            onClose={() => setEditOffenderData(null)}
            onCompleted={onCompletedEditOffender}
            update={updateEditOffenderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddOffender}
        open={addOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
        })}
        width="700"
        zIndex={999}
      >
        {addOffender ? (
          <AddNewOffenderSimple
            groupsIds={data?.incident.groups.map(({ id }) => id)}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            incidentBusinessId={data?.incident.business?.id}
            incidentId={data?.incident.id}
            onClose={toggleAddOffender}
            onCompleted={onCompletedAddOffender}
            update={updateAddOffenderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddExistingOffender}
        open={addExistingOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
        })}
        width="1000"
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOffender}
            update={(value) => onAddExistingOffender(value.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* vehicle */}
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleAddExistingVehicle}
        open={addExistingVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        width="800"
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            onClose={toggleAddExistingVehicle}
            update={(value) => onAddExistingVehicle(value.id)}
            vehicleIds={data?.incident?.vehicles.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddVehicle}
        open={addVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        width="700"
        zIndex={999}
      >
        {addVehicle ? (
          <AddVehicleSimple
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            onClose={toggleAddVehicle}
            update={onAddVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditVehicleData(null)}
        open={!!editVehicleData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle',
        })}
        width="800"
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicleSimple
            editData={editVehicleData}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            onClose={() => setEditVehicleData(null)}
            update={onEditVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* goods */}
      <Drawer
        onClose={toggleAddGoods}
        open={addGoods}
        title={intl.formatMessage({
          defaultMessage: 'Add New Item',
        })}
        width="1000"
        zIndex={999}
      >
        {addGoods ? (
          <AddGoods onClose={toggleAddGoods} update={onAddGoods} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditGoodsData(null)}
        open={!!editGoodsData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Item',
        })}
        width="400"
        zIndex={999}
      >
        {editGoodsData ? (
          <EditGoods
            data={editGoodsData}
            onClose={() => setEditGoodsData(null)}
            saving={false}
            update={onEditGoods}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* todo */}
      <Drawer
        onClose={toggleAddTodo}
        open={addTodo}
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        width="600"
      >
        {addTodo ? (
          <AddTodo
            incidentId={data?.incident?.id}
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
            onClose={toggleAddTodo}
            update={updateTodoList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setCompleteTodoVisible(null)}
        open={completeTodoVisible !== null}
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        width={800}
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
        onClose={() => setViewTodoVisible(null)}
        open={!!viewTodoVisible}
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        width={800}
      >
        {viewTodoVisible ? (
          <ViewTodo
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
            })}
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* evidence */}
      <Drawer
        onClose={toggleAddDocument}
        open={addDocument}
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        width="600"
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
        onClose={toggleAddInvestigation}
        open={addInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        width="500"
      >
        {addInvestigation ? (
          <AddInvestigation
            incidentId={data?.incident?.id || ''}
            onClose={toggleAddInvestigation}
            update={updateInvestigationList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* address */}
      <Drawer
        onClose={toggleEditAddress}
        open={editAddress}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Address',
        })}
        width="600"
        zIndex={999}
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
        bodyStyle={{ padding: 0 }}
        onClose={toggleShareOpen}
        title={intl.formatMessage({
          defaultMessage: 'Share Incident',
        })}
        visible={shareOpen}
        width={700}
      >
        {shareOpen && (
          <ShareData incidentId={incidentId} onClose={toggleShareOpen} />
        )}
      </Drawer>
    </div>
  );
};

export default ViewIncident;
