import type { CreateBlurFacesMutation } from '#/components/ViewPage/ImagesList/graphql/__generated__/create_blur_faces.generated';
import type { AddVehicleData } from '#/components/form-components/Vehicle/AddVehicleSimple/useAddVehicleSimple';
import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { ViewOffenderQuery } from '#/graphql/offenders/queries/__generated__/view-offender.generated';
import type { OffenderIncidentsQuery } from '#/views/profiles/offenders/ViewOffender/__graphql__/queries/__generated__/list-incidents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { AssociatedOffendersQuery } from 'graphql/offenders/queries/__generated__/associated-offenders.generated';
import type {
  BanData,
  EditFeedImage,
  ImageCardData,
  LocationData,
  VehicleData,
} from 'types/DataType';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import ShareData from '#/components/form-components/ShareData/ShareData';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import IncidentTable from '#/components/tables/IncidentTable';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import AiDetailsView from '#/views/profiles/offenders/ViewOffender/components/AiDetails.view';
import OffenderAiDrawer from '#/views/profiles/offenders/ViewOffender/components/AiDrawer/AiDrawer.view';
import OffenderVision from '#/views/profiles/offenders/ViewOffender/components/OffenderVision/OffenderVision.view';
import {
  faBell,
  faBellSlash,
  faCartShopping,
  faCircleInfo,
  faClock,
  faComment,
  faEarth,
  faEdit,
  faFileDownload,
  faHeadSide,
  faImage,
  faMagnifyingGlass,
  faMarsAndVenus,
  faMemoCircleInfo,
  faNotebook,
  faPassport,
  faPenToSquare,
  faPlus,
  faShareNodes,
  faSirenOn,
  faTrash,
  faUser,
  faUserClock,
  faUserHair,
  faUserTag,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AddVehicleSimple from 'components/form-components/Vehicle/AddVehicleSimple';
import EditVehicleSimple from 'components/form-components/Vehicle/EditVehicleSimple';
import AddLocation from 'components/form-components/addresses/AddLocation';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import CopyOffender from 'components/form-components/offender/CopyOffender';
import EditOffenderFeed from 'components/form-components/offender/EditOffenderFeed';
import KnowOffender from 'components/form-components/offender/KnowOffender';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';
import EditImageAnalyseList from 'components/images/EditImageAnalyseList';
import LightBox from 'components/images/LightBox/LightBox.container';
import WatermarkImage from 'components/images/WatermarkImage.view';
import MapCard from 'components/map/MapCard/MapCard.view';
import AssociatedOffender from 'components/offenders/AssociatedOffender';
import OffenderSideList from 'components/offenders/OffenderSideList';
import OffenderMatches from 'components/rekognition/OffenderMatches/OffenderMatches.container';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import EvidenceTable from 'components/tables/EvidenceTable';
import InvestigationTable from 'components/tables/InvestigationTable';
import VehicleTable from 'components/tables/VehicleTable';
import dayjs from 'dayjs';
import { BanType, PermissionMethod, PermissionModel } from 'graphql/types';
import React, { type Dispatch } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';
import { calcDuration } from 'utils';
import FormatCalendar from 'utils/format-calendar-24h';
import {
  getBanType,
  getIdSource,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderHeight,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { calcExpired } from 'utils/offender/get-offender-exclusion';

import type {
  PaginationAction,
  PaginationState,
  ViewAssociate,
} from './useViewOffender';

import TranslateButton from '../../../../components/util-components/TranslateButton';
import useStyles from './ViewOffender.styles';

const { Paragraph, Text, Title } = Typography;

interface TableItem {
  activeDay?: string | undefined;
  description: null | string | undefined;
  endDate: Date;
  location?: string | undefined;
}

interface Props {
  addAddress: boolean;
  addBan: boolean;
  addCrimeGroup: boolean;
  addDocument: boolean;
  addExistingVehicle: boolean;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  addInvestigation: boolean;
  addVehicle: boolean;
  approving: boolean;
  associateFilters: (string | undefined)[];
  associatesData: AssociatedOffendersQuery | undefined;
  associatesLoading: boolean;
  closeAddImages: () => void;
  confirmDeleteUpdate: (updateId: string) => void;
  copyOffender: boolean;
  data: ViewOffenderQuery | undefined;
  deleteRights: boolean;
  editAddressData: LocationData | null;
  editBanData: BanData | null;

  editImageData: EditFeedImage | null;
  editImages: boolean;
  editOffender: boolean;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  editVehicleData: VehicleData | null;
  handleEditUpdate: () => void;
  hasConnectedSchemes: boolean;
  incidents: OffenderIncidentsQuery['offender']['incidents'] | null;
  incidentsLoading: boolean;
  incidentsPagination: PaginationState;
  incidentsPaginationDispatch: Dispatch<PaginationAction>;
  knowOffender: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  linkIncident: boolean;
  loadMore: boolean;
  loading: boolean;
  offenderId: string;
  onAddAddress: (value: LocationData) => void;
  onAddBan: (value: BanData) => void;
  onAddCrimeGroup: (value: string) => void;
  onAddExistingVehicle: (id: string) => void;
  onAddUpdateImages: (
    images: { id: string; url: string }[],
    addToIncident?: boolean
  ) => void;
  onAddUpdateImagesToIncident: (id: string) => void;
  onAddVehicle: (value: AddVehicleData) => void;
  onApprove: () => void;
  onAssociateFilterChange: (value: string[]) => void;
  onDelete: (offenderId: string) => void;
  onDeleteAddress: (id: string) => void;
  onDeleteBan: (id: string) => void;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onEditAddress: (value: LocationData) => void;
  onEditBan: (value: BanData) => void;
  onEditImage: (id: EditFeedImage) => void;
  onEditVehicle: (value: VehicleData) => void;
  onReject: () => void;
  onSelect: (item: { key: string }) => void;
  onSelectUpdateImages: () => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  openLightbox: (index: number) => void;
  optionRowShow: boolean;
  publicOffenderDOB: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  selectedImages: string[];
  selectedIncidentId: string;
  setEditAddressData: (value: LocationData | null) => void;
  setEditBanData: (value: BanData | null) => void;
  setEditImageData: (value: EditFeedImage | null) => void;
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
  shareOpen: boolean;
  showAiDrawer: boolean;
  showIncidentOptions: boolean;
  toggleAddAddress: () => void;
  toggleAddBan: () => void;
  toggleAddCrimeGroup: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddInvestigation: () => void;
  toggleAddVehicle: () => void;
  toggleAiDrawer: () => void;
  toggleCopyOffender: () => void;
  toggleEditImages: () => void;
  toggleEditOffender: () => void;
  toggleKnowOffender: () => void;
  toggleLinkIncident: () => void;
  toggleSelectImages: (id: string) => void;
  toggleShareOpen: () => void;
  toggleShowIncidentOptions: () => void;
  toggleSubscribe: () => void;
  toggleViewAssociate: (value: ViewAssociate | null) => void;
  toggleViewMatches: (offenderId: null | string) => void;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateImagesList: MutationUpdaterFn<CreateBlurFacesMutation>;
  updateIncidentList: (value: string) => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  userId: string;
  viewAssociate: ViewAssociate | null;
  viewMatches: null | string;
}

const ViewOffender = ({
  addAddress,
  addBan,
  addCrimeGroup,
  addDocument,
  addExistingVehicle,
  addImages,
  addInvestigation,
  addVehicle,
  approving,
  associateFilters,
  associatesData,
  associatesLoading,
  closeAddImages,
  confirmDeleteUpdate,
  copyOffender,
  data,
  deleteRights,
  editAddressData,
  editBanData,
  editImageData,
  editImages,
  editOffender,
  editRights,
  editUpdate,
  editUpdateInput,
  editVehicleData,
  handleEditUpdate,
  hasConnectedSchemes,
  incidents,
  // incidentsLoading,
  // incidentsPagination,
  // incidentsPaginationDispatch,
  knowOffender,
  lightBoxOpen,
  linkIncident,
  loadMore,
  loading,
  offenderId,
  onAddAddress,
  onAddBan,
  onAddCrimeGroup,
  onAddExistingVehicle,
  onAddUpdateImages,
  onAddUpdateImagesToIncident,
  onAddVehicle,
  onApprove,
  onAssociateFilterChange,
  onDelete,
  onDeleteAddress,
  onDeleteBan,
  onDeleteCrimeGroup,
  onDeleteImage,
  onDeleteVehicle,
  onEditAddress,
  onEditBan,
  onEditImage,
  onEditVehicle,
  onReject,
  onSelect,
  onSelectUpdateImages,
  onUpdateImages,
  openLightbox,
  optionRowShow,
  publicOffenderDOB,
  replyTo,
  saving,
  scrolledToTop,
  selectedImages,
  selectedIncidentId,
  setEditAddressData,
  setEditBanData,
  setEditImageData,
  setEditUpdate,
  setEditUpdateInput,
  setEditVehicleData,
  setOptionRowShow,
  setReplyTo,
  shareOpen,
  showAiDrawer,
  showIncidentOptions,
  toggleAddAddress,
  toggleAddBan,
  toggleAddCrimeGroup,
  toggleAddDocument,
  toggleAddExistingVehicle,
  toggleAddInvestigation,
  toggleAddVehicle,
  toggleAiDrawer,
  toggleCopyOffender,
  toggleEditImages,
  toggleEditOffender,
  toggleKnowOffender,
  toggleLinkIncident,
  toggleSelectImages,
  toggleShareOpen,
  toggleShowIncidentOptions,
  toggleSubscribe,
  toggleViewAssociate,
  toggleViewMatches,
  updateDeleteDocument,
  updateDocumentList,
  updateImagesList,
  updateIncidentList,
  updateInvestigationList,
  userId,
  viewAssociate,
  viewMatches,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigate();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, margin: 0, padding: 0 }}>
      {intl.formatMessage(
        {
          defaultMessage: ' Description: {description}',
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

        <Col flex={1}>
          <div className={classes.viewOffender}>
            <Row className={classes.content}>
              <Col className={classes.detailsContainer} span={16}>
                {data?.offender?.approved === false && (
                  <div className={classes.approveBar}>
                    <Row gutter={8} justify="end">
                      <Col>
                        <Button
                          disabled={approving}
                          onClick={onReject}
                          type="ghost"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Reject Offender',
                          })}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          disabled={approving}
                          onClick={onApprove}
                          type="primary"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Approve Offender',
                          })}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
                <div className={classes.detailsContent}>
                  <Row className={classes.headerBar} gutter={8} justify="end">
                    {data?.offender?.searchedMatches &&
                      data?.offender?.searchedMatches.length > 0 && (
                        <PermissionCheckWrapper
                          permission={{
                            method: PermissionMethod.Edit,
                            model: PermissionModel.Offenders,
                          }}
                          unauthorizedElement={<div />}
                        >
                          <Col>
                            <Button
                              danger
                              onClick={() => toggleViewMatches(offenderId)}
                            >
                              {intl.formatMessage(
                                {
                                  defaultMessage:
                                    '{itemCount} {itemCount, plural, one {Face ID Match} other {Face ID Matches}}',
                                },
                                {
                                  itemCount:
                                    data.offender.searchedMatches.length,
                                }
                              )}
                            </Button>
                          </Col>
                        </PermissionCheckWrapper>
                      )}
                    <Col>
                      <Row>
                        <Col>
                          <Tooltip
                            title={
                              data?.offender?.subscribed
                                ? intl.formatMessage({
                                    defaultMessage:
                                      'Stop getting notified about updates.',
                                  })
                                : intl.formatMessage({
                                    defaultMessage:
                                      'Get notified about updates.',
                                  })
                            }
                          >
                            <Button
                              color={
                                data?.offender?.subscribed
                                  ? undefined
                                  : 'danger'
                              }
                              disabled={saving}
                              loading={saving}
                              onClick={toggleSubscribe}
                              style={{
                                borderBottomRightRadius:
                                  deleteRights || editRights ? 0 : 10,
                                borderTopRightRadius:
                                  deleteRights || editRights ? 0 : 10,
                                padding: '8.5px .9rem',
                              }}
                              type="ghost"
                            >
                              <FontAwesomeIcon
                                icon={
                                  data?.offender?.subscribed
                                    ? faBellSlash
                                    : faBell
                                }
                                size="1x"
                              />
                            </Button>
                          </Tooltip>
                        </Col>
                        {editRights && hasConnectedSchemes && (
                          <Col>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Share offender with a scheme',
                              })}
                            >
                              <Button
                                onClick={toggleShareOpen}
                                style={{
                                  borderLeft: 'none',
                                  borderRadius: 0,
                                  padding: '8.5px .9rem',
                                }}
                                type="ghost"
                              >
                                <FontAwesomeIcon
                                  icon={faShareNodes}
                                  size="1x"
                                />
                              </Button>
                            </Tooltip>
                          </Col>
                        )}

                        {editRights && (
                          <Col>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Compare offender',
                              })}
                            >
                              <Button
                                onClick={() =>
                                  navigate(
                                    `/app/offenders/compare/${
                                      data?.offender?.id || ''
                                    }`
                                  )
                                }
                                style={{
                                  borderBottomLeftRadius: 0,
                                  borderBottomRightRadius: deleteRights
                                    ? 0
                                    : 10,
                                  borderLeft: 'none',
                                  borderTopLeftRadius: 0,
                                  borderTopRightRadius: deleteRights ? 0 : 10,
                                  marginRight: deleteRights ? 0 : 10,
                                  padding: '8.5px .9rem',
                                }}
                                type="ghost"
                              >
                                <FontAwesomeIcon icon={faUsers} size="1x" />
                              </Button>
                            </Tooltip>
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
                                      onClick: () => toggleEditOffender(),
                                    },
                                    {
                                      icon: <FontAwesomeIcon icon={faImage} />,
                                      key: 1,
                                      label:
                                        data?.offender?.totalImages &&
                                        data?.offender.totalImages > 0
                                          ? intl.formatMessage({
                                              defaultMessage: 'Edit Images',
                                            })
                                          : intl.formatMessage({
                                              defaultMessage: 'Add Images',
                                            }),
                                      onClick: () => toggleEditImages(),
                                    },
                                  ]}
                                />
                              }
                              placement="bottomRight"
                            >
                              <Button
                                style={{
                                  borderLeft: 'none',
                                  borderRadius: 0,
                                  padding: '8.5px .9rem',
                                }}
                                type="ghost"
                              >
                                <FontAwesomeIcon icon={faEdit} size="1x" />
                              </Button>
                            </Dropdown>
                          </Col>
                        )}
                        {editRights && (
                          <Col>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Download offender as PDF',
                              })}
                            >
                              <Button
                                loading={isPrinting}
                                onClick={handlePrint}
                                style={{
                                  borderLeft: 'none',
                                  borderRadius: 0,
                                  padding: '8.5px .9rem',
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faFileDownload}
                                  size="1x"
                                />
                              </Button>
                            </Tooltip>
                          </Col>
                        )}
                        {deleteRights && (
                          <Col>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Recycle offender',
                              })}
                            >
                              <Button
                                onClick={() => onDelete(offenderId)}
                                style={{
                                  borderBottomLeftRadius: 0,
                                  borderLeft: 'none',
                                  borderTopLeftRadius: 0,
                                  marginRight: 10,
                                  padding: '8.5px .9rem',
                                }}
                                type="ghost"
                              >
                                <FontAwesomeIcon icon={faTrash} size="1x" />
                              </Button>
                            </Tooltip>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <div ref={componentRef}>
                    <ImagesList
                      // lightboxElements={lightboxElements}
                      editImageData={editImageData}
                      editRights={editRights}
                      hasImages={
                        !!(
                          data?.offender?.images &&
                          data?.offender?.images.length > 0
                        )
                      }
                      imagesData={data?.offender?.images}
                      loading={loading}
                      // lightBoxOpen={lightBoxOpen}
                      onDeleteImage={onDeleteImage}
                      onEditImage={onEditImage}
                      openLightbox={openLightbox}
                      saving={saving}
                      setEditImageData={setEditImageData}
                      updateImagesList={updateImagesList}
                    />

                    <div className={classes.details}>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <div>
                          <Row gutter={[16, 16]}>
                            <Col xl={12} xs={24}>
                              <Card
                                loading={loading}
                                style={{ marginBottom: 0 }}
                              >
                                <Row align="middle" gutter={10}>
                                  <Col>
                                    <Title level={3} style={{ margin: 0 }}>
                                      {data?.offender?.name}
                                    </Title>
                                  </Col>
                                  <Col>
                                    <Text>
                                      {intl.formatMessage(
                                        {
                                          defaultMessage: 'Alert ID: {ref}',
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
                                      <Tag className={classes.tag} color="red">
                                        {tag.name}
                                      </Tag>
                                    </Col>
                                  ))}
                                </Row>

                                <Descriptions
                                  column={1}
                                  style={{ marginTop: 10 }}
                                >
                                  {data?.offender?.alias &&
                                    data.offender.alias.length > 0 && (
                                      <Descriptions.Item
                                        className={classes.descItem}
                                        label={
                                          <span className={classes.tagLabel}>
                                            <FontAwesomeIcon
                                              className={classes.descIcon}
                                              icon={faUser}
                                            />
                                            {intl.formatMessage({
                                              defaultMessage: 'Alias',
                                            })}
                                          </span>
                                        }
                                      >
                                        <Row>
                                          {data?.offender?.alias.map(
                                            (el, i) => (
                                              // eslint-disable-next-line react/no-array-index-key
                                              <Tag
                                                className={classes.tag}
                                                key={i}
                                              >
                                                {el}
                                              </Tag>
                                            )
                                          )}
                                        </Row>
                                      </Descriptions.Item>
                                    )}
                                  {data?.offender?.infoSource && (
                                    <Descriptions.Item
                                      className={classes.descItem}
                                      label={
                                        <span>
                                          <FontAwesomeIcon
                                            className={classes.descIcon}
                                            icon={faMemoCircleInfo}
                                          />
                                          {intl.formatMessage({
                                            defaultMessage:
                                              'Information Source',
                                          })}
                                        </span>
                                      }
                                    >
                                      <Typography.Text>
                                        {data.offender.infoSource}
                                      </Typography.Text>
                                    </Descriptions.Item>
                                  )}
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faPassport}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Verified ID',
                                        })}
                                      </span>
                                    }
                                  >
                                    {data?.offender?.idVerified ? (
                                      <Typography.Text type="success">
                                        {intl.formatMessage(
                                          {
                                            defaultMessage: 'Verified{source}',
                                          },
                                          {
                                            source: getIdSource(
                                              data?.offender.idSource
                                            ),
                                          }
                                        )}
                                      </Typography.Text>
                                    ) : (
                                      <Typography.Text type="warning">
                                        {intl.formatMessage({
                                          defaultMessage: 'Not Verified',
                                        })}
                                      </Typography.Text>
                                    )}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faClock}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Last updated',
                                        })}
                                      </span>
                                    }
                                  >
                                    {FormatCalendar(
                                      data?.offender?.updatedAt || dayjs(),
                                      intl
                                    )}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span className={classes.tagLabel}>
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
                                    <Row>
                                      {data?.offender?.createdBy.fullName}
                                    </Row>
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    className={classes.descItem}
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
                                      {data?.offender?.groups?.map((group) => (
                                        <Tag
                                          className={classes.tag}
                                          key={group.id}
                                        >
                                          {group.name}
                                        </Tag>
                                      ))}
                                    </Row>
                                  </Descriptions.Item>

                                  {data?.offender?.targetedGoods &&
                                    data?.offender?.targetedGoods.length >
                                      0 && (
                                      <Descriptions.Item
                                        className={classes.descItem}
                                        label={
                                          <span className={classes.tagLabel}>
                                            <FontAwesomeIcon
                                              className={classes.descIcon}
                                              icon={faCartShopping}
                                            />
                                            {intl.formatMessage({
                                              defaultMessage: 'Targeted Goods',
                                            })}
                                          </span>
                                        }
                                      >
                                        <Row>
                                          {data?.offender?.targetedGoods?.map(
                                            (el) => (
                                              <Tag
                                                className={classes.tag}
                                                key={el}
                                              >
                                                {el}
                                              </Tag>
                                            )
                                          )}
                                        </Row>
                                      </Descriptions.Item>
                                    )}
                                  {data?.offender?.knownFor &&
                                    data?.offender?.knownFor.length > 0 && (
                                      <Descriptions.Item
                                        className={classes.descItem}
                                        label={
                                          <span className={classes.tagLabel}>
                                            <FontAwesomeIcon
                                              className={classes.descIcon}
                                              icon={faSirenOn}
                                            />
                                            {intl.formatMessage({
                                              defaultMessage: 'Known For',
                                            })}
                                          </span>
                                        }
                                      >
                                        <Row>
                                          {data?.offender?.knownFor?.map(
                                            (el) => (
                                              <Tag
                                                className={classes.tag}
                                                key={el}
                                              >
                                                {el}
                                              </Tag>
                                            )
                                          )}
                                        </Row>
                                      </Descriptions.Item>
                                    )}
                                  <Descriptions column={1}>
                                    {data?.offender?.justification && (
                                      <Descriptions.Item
                                        className={classes.descItem}
                                        label={
                                          <span>
                                            <FontAwesomeIcon
                                              className={classes.descIcon}
                                              icon={faNotebook}
                                            />
                                            {intl.formatMessage({
                                              defaultMessage: 'Justification',
                                            })}
                                          </span>
                                        }
                                      >
                                        {data?.offender?.justification}
                                      </Descriptions.Item>
                                    )}
                                  </Descriptions>
                                </Descriptions>
                              </Card>
                            </Col>
                            <Col xl={12} xs={24}>
                              <Card
                                loading={loading}
                                style={{ height: '100%', marginBottom: 0 }}
                              >
                                <Title level={4} style={{ marginBottom: 10 }}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Physical Description',
                                  })}
                                </Title>
                                <Descriptions column={1}>
                                  {!data?.offender?.dateOfBirth && (
                                    <Descriptions.Item
                                      className={classes.descItem}
                                      label={
                                        <span>
                                          <FontAwesomeIcon
                                            className={classes.descIcon}
                                            icon={faUserClock}
                                          />
                                          {intl.formatMessage({
                                            defaultMessage: 'Age',
                                          })}
                                        </span>
                                      }
                                    >
                                      {getOffenderAge(data?.offender?.age)}
                                    </Descriptions.Item>
                                  )}
                                  {publicOffenderDOB &&
                                    data?.offender?.dateOfBirth && (
                                      <Descriptions.Item
                                        className={classes.descItem}
                                        label={
                                          <span>
                                            <FontAwesomeIcon
                                              className={classes.descIcon}
                                              icon={faUserClock}
                                            />
                                            {intl.formatMessage({
                                              defaultMessage: 'Date of Birth',
                                            })}
                                          </span>
                                        }
                                      >
                                        {dayjs(
                                          data?.offender?.dateOfBirth
                                        ).format('DD/MM/YYYY')}
                                      </Descriptions.Item>
                                    )}
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faMarsAndVenus}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Sex',
                                        })}
                                      </span>
                                    }
                                  >
                                    {getOffenderGender(data?.offender?.gender)}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faUserTag}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Build',
                                        })}
                                      </span>
                                    }
                                  >
                                    {getOffenderBuild(data?.offender?.build)}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faHeadSide}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Height',
                                        })}
                                      </span>
                                    }
                                  >
                                    {getOffenderHeight(data?.offender?.height)}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    className={classes.descItem}
                                    label={
                                      <span>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faEarth}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Ethnicity',
                                        })}
                                      </span>
                                    }
                                  >
                                    {getOffenderRace(
                                      data?.offender?.race,
                                      false
                                    )}
                                  </Descriptions.Item>
                                  {data?.offender?.hair && (
                                    <Descriptions.Item
                                      className={classes.descItem}
                                      label={
                                        <span>
                                          <FontAwesomeIcon
                                            className={classes.descIcon}
                                            icon={faUserHair}
                                          />
                                          {intl.formatMessage({
                                            defaultMessage: 'Hair',
                                          })}
                                        </span>
                                      }
                                    >
                                      {data?.offender?.hair}
                                    </Descriptions.Item>
                                  )}
                                </Descriptions>
                                {data?.offender?.peculiarities && (
                                  <div style={{ marginBottom: 10 }}>
                                    <div>
                                      <Text>
                                        <FontAwesomeIcon
                                          className={classes.descIcon}
                                          icon={faCircleInfo}
                                        />
                                        {intl.formatMessage({
                                          defaultMessage: 'Characteristics:',
                                        })}
                                      </Text>
                                    </div>
                                    <TranslateButton
                                      text={data?.offender?.peculiarities || ''}
                                    />
                                  </div>
                                )}
                              </Card>
                            </Col>
                            <PermissionCheckWrapper
                              permission={{
                                method: PermissionMethod.Read,
                                model: PermissionModel.Automations,
                              }}
                              unauthorizedElement={<div />}
                            >
                              <Col xl={24} xs={24}>
                                <AiDetailsView
                                  data={data}
                                  loading={loading}
                                  toggleAiDrawer={toggleAiDrawer}
                                />
                              </Col>
                            </PermissionCheckWrapper>

                            {data?.offender?.comment ? (
                              <Col span={24}>
                                <Card>
                                  {data?.offender?.comment && (
                                    <div>
                                      <div>
                                        <Text>
                                          <FontAwesomeIcon
                                            className={classes.descIcon}
                                            icon={faComment}
                                          />
                                          {intl.formatMessage({
                                            defaultMessage: 'Comment:',
                                          })}
                                        </Text>
                                      </div>
                                      <TranslateButton
                                        text={data?.offender?.comment || ''}
                                      />
                                    </div>
                                  )}
                                </Card>
                              </Col>
                            ) : undefined}
                            <Col span={24}>
                              {data?.offender?.incidents &&
                              data?.offender?.incidents.length > 0 ? (
                                <MapCard
                                  height={301}
                                  isPrinting={isPrinting}
                                  markers={
                                    data?.offender?.incidents.map(
                                      (incident) => ({
                                        geoLat: incident.location?.geoLat,
                                        geoLng: incident.location?.geoLng,
                                      })
                                    ) || []
                                  }
                                  width="100%"
                                />
                              ) : (
                                <Card
                                  loading={loading}
                                  style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    height: 'calc(100% - 20px)',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Empty
                                    description={intl.formatMessage({
                                      defaultMessage: 'No incidents found',
                                    })}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                  />
                                </Card>
                              )}
                            </Col>
                          </Row>
                          <Card loading={loading}>
                            <Row align="middle" style={{ marginBottom: 20 }}>
                              <Col>
                                <Title
                                  level={4}
                                  style={{ marginBottom: 0, marginRight: 20 }}
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Known Associates',
                                  })}
                                </Title>
                              </Col>
                              <Col>
                                <CheckTags
                                  className="no-print"
                                  onChange={onAssociateFilterChange}
                                  options={[
                                    {
                                      label: intl.formatMessage({
                                        defaultMessage: 'Linked Incidents',
                                      }),
                                      value: 'LINKED_INCIDENTS',
                                    },
                                    {
                                      label: intl.formatMessage({
                                        defaultMessage: 'Linked OCG',
                                      }),
                                      value: 'LINKED_OCG',
                                    },
                                  ]}
                                  value={associateFilters as string[]}
                                />
                              </Col>
                            </Row>
                            <Row
                              className={classes.offenderRow}
                              gutter={[8, 8]}
                              wrap={false}
                            >
                              {associatesLoading &&
                                Array.from({ length: 12 }).map((_, index) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <Col key={index}>
                                    <Skeleton.Avatar
                                      active
                                      shape="square"
                                      style={{
                                        borderRadius: '0.625rem',
                                        height: 200,
                                        width: 150,
                                      }}
                                    />
                                  </Col>
                                ))}
                              {associatesData?.offender?.knownAssociates &&
                                associatesData.offender.knownAssociates
                                  .length === 0 && (
                                  <Row
                                    justify="center"
                                    style={{ width: '100%' }}
                                  >
                                    <Col>
                                      <Empty
                                        description={intl.formatMessage({
                                          defaultMessage:
                                            'No known associates found',
                                        })}
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      />
                                    </Col>
                                  </Row>
                                )}
                              {associatesData?.offender?.knownAssociates?.map(
                                (associate) => (
                                  <Col key={associate.id}>
                                    <Card
                                      bodyStyle={{
                                        alignItems: 'center',
                                        backgroundColor: 'rgb(59, 73, 98)',
                                        borderRadius: '0.625rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        height: 200,
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        padding: 0,
                                        position: 'relative',
                                        width: 150,
                                      }}
                                      loading={loading}
                                      onClick={() =>
                                        toggleViewAssociate(associate)
                                      }
                                      // onClick={() => setAddRecentOffender(offender)}
                                      style={{ border: 0 }}
                                    >
                                      <Row
                                        className={classes.offenderBadge}
                                        gutter={8}
                                      >
                                        <Col>
                                          <Badge
                                            color="basic"
                                            count={
                                              associate.totalAssociatedIncidents
                                                ? intl.formatMessage(
                                                    {
                                                      defaultMessage:
                                                        'Incidents: {totalAssociatedIncidents}',
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
                                          position={
                                            associate.images[0]?.position
                                          }
                                          url={associate.images[0]?.optimised}
                                        />
                                      )}
                                      {associate.images.length === 0 && (
                                        <FontAwesomeIcon
                                          icon={faUser}
                                          size="3x"
                                          style={{
                                            color: 'rgb(114, 132, 154)',
                                          }}
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
                                )
                              )}
                            </Row>
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
                                    defaultMessage: 'Outcomes',
                                  })}
                                </Title>
                              </Col>
                              {editRights && (
                                <Col>
                                  <Button
                                    className="no-print"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: 5 }}
                                      />
                                    }
                                    onClick={toggleAddBan}
                                    size="small"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Add Outcome',
                                    })}
                                  </Button>
                                </Col>
                              )}
                            </Row>
                            {data?.offender?.bans.length && !loading ? (
                              <Table
                                columns={[
                                  {
                                    dataIndex: 'type',
                                    ellipsis: true,
                                    key: 'type',
                                    title: intl.formatMessage({
                                      defaultMessage: 'Type',
                                    }),
                                  },
                                  {
                                    dataIndex: 'duration',
                                    key: 'duration',
                                    // render: (value, row) =>
                                    //   [
                                    //     BanType.Cbo,
                                    //     BanType.CommunityBan,
                                    //     BanType.Cpn,
                                    //     BanType.Cpw,
                                    //     BanType.Other,
                                    //     BanType.PrisonSentence,
                                    //     BanType.Pspo,
                                    //     BanType.Wip,
                                    //   ].includes(row.typeEnum as BanType) && (
                                    //     <Text>{value}</Text>
                                    //   ),
                                    title: intl.formatMessage({
                                      defaultMessage: 'Duration',
                                    }),
                                    width: 110,
                                  },
                                  {
                                    dataIndex: 'status',
                                    key: 'status',
                                    render: (value, record) =>
                                      [
                                        BanType.Cbo,
                                        BanType.CommunityBan,
                                        BanType.Cpn,
                                        BanType.Cpw,
                                        BanType.Other,
                                        BanType.Pspo,
                                        BanType.Wip,
                                      ].includes(
                                        record.typeEnum as BanType
                                      ) && (
                                        <div>
                                          {calcExpired(
                                            new Date(record.endDate)
                                          ) ? (
                                            <Tag color="red">
                                              {intl.formatMessage({
                                                defaultMessage: 'EXPIRED',
                                              })}
                                            </Tag>
                                          ) : (
                                            <Tag color="success">
                                              {intl.formatMessage({
                                                defaultMessage: 'ACTIVE',
                                              })}
                                            </Tag>
                                          )}
                                        </div>
                                      ),
                                    title: intl.formatMessage({
                                      defaultMessage: 'Status',
                                    }),
                                  },
                                  {
                                    dataIndex: 'fineValue',
                                    ellipsis: true,
                                    key: 'fineValue',
                                    title: intl.formatMessage({
                                      defaultMessage: 'Fine Value',
                                    }),
                                  },
                                  {
                                    dataIndex: 'Options',
                                    key: 'Options',
                                    // width: 100,
                                    render: (_, record) => (
                                      <Row className="no-print" gutter={8}>
                                        {editRights && (
                                          <Col>
                                            <Tooltip
                                              title={intl.formatMessage({
                                                defaultMessage:
                                                  'Edit Exclusion',
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
                                                  setEditBanData(record.ban);
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
                                                  'Remove Exclusion',
                                              })}
                                            >
                                              <Popconfirm
                                                cancelText={intl.formatMessage({
                                                  defaultMessage: 'No',
                                                })}
                                                okText={intl.formatMessage({
                                                  defaultMessage: 'Yes',
                                                })}
                                                onConfirm={() =>
                                                  onDeleteBan(record.key)
                                                }
                                                overlayInnerStyle={{
                                                  padding: 10,
                                                }}
                                                placement="topLeft"
                                                title={intl.formatMessage({
                                                  defaultMessage:
                                                    'Remove the exclusion?',
                                                })}
                                                trigger="hover"
                                              >
                                                <Button
                                                  disabled={saving}
                                                  icon={
                                                    <FontAwesomeIcon
                                                      icon={faTrash}
                                                    />
                                                  }
                                                  size="small"
                                                />
                                              </Popconfirm>
                                            </Tooltip>
                                          </Col>
                                        )}
                                      </Row>
                                    ),
                                    title: '',
                                  },
                                ]}
                                dataSource={data?.offender?.bans.map((ban) => ({
                                  activeDay: calcDuration(
                                    new Date(ban?.startDate),
                                    new Date(ban?.endDate)
                                  ),
                                  ban,
                                  description: ban.description,
                                  duration: ban.duration,
                                  // duration: [
                                  //   BanType.Cbo,
                                  //   BanType.PrisonSentence,
                                  //   BanType.SuspendedSentence,
                                  // ].includes(ban.type as BanType)
                                  //   ? intl.formatMessage(
                                  //       {
                                  //         defaultMessage: '{months} {b}',
                                  //       },
                                  //       {
                                  //         b:
                                  //           BanType.Cbo === (ban.type as BanType)
                                  //             ? 'months'
                                  //             : 'weeks',
                                  //         months: ban.months,
                                  //       }
                                  //     )
                                  //   : `${FormatCalendar(
                                  //       ban?.startDate,
                                  //       true
                                  //     )}  ->  ${FormatCalendar(
                                  //       ban?.endDate,
                                  //       true
                                  //     )}`,
                                  endDate: ban.endDate,
                                  fineValue:
                                    ban.fineValue === 0
                                      ? ''
                                      : intl.formatNumber(ban.fineValue || 0, {
                                          currency: 'GBP',
                                          style: 'currency',
                                        }),
                                  key: ban.id,
                                  location: ban.location,
                                  status: `${new Date(
                                    ban?.startDate
                                  ).toDateString()}  -->  ${new Date(
                                    ban?.endDate
                                  ).toDateString()}`,
                                  type: getBanType(ban.type),
                                  typeEnum: ban.type,
                                }))}
                                expandable={{
                                  expandedRowRender,
                                  rowExpandable: (record) =>
                                    !!record.description,
                                }}
                                loading={loading}
                                pagination={
                                  data?.offender?.bans &&
                                  data.offender.bans.length > 5
                                    ? {
                                        pageSize: 5,
                                      }
                                    : false
                                }
                                size="small"
                              />
                            ) : (
                              <Empty
                                description={intl.formatMessage({
                                  defaultMessage:
                                    'No exclusions for this offender',
                                })}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                              />
                            )}
                          </Card>
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Incidents,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Card loading={loading}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Incidents',
                                })}
                              </Title>
                              {data?.offender?.incidents.length && !loading ? (
                                <IncidentTable
                                  hasNavigation
                                  incidents={data?.offender?.incidents || []}
                                />
                              ) : (
                                <Empty
                                  description={intl.formatMessage({
                                    defaultMessage:
                                      'No incidents for this offender',
                                  })}
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                              )}
                            </Card>
                          </PermissionCheckWrapper>
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.VisionAi,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <OffenderVision offenderId={offenderId} />
                          </PermissionCheckWrapper>
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
                                      defaultMessage: 'Addresses',
                                    })}
                                  </Title>
                                </Col>
                                {editRights && (
                                  <Col className="no-print">
                                    <Button
                                      icon={
                                        <FontAwesomeIcon
                                          icon={faPlus}
                                          style={{ marginRight: 5 }}
                                        />
                                      }
                                      onClick={toggleAddAddress}
                                      size="small"
                                    >
                                      {intl.formatMessage({
                                        defaultMessage: 'Add Address',
                                      })}
                                    </Button>
                                  </Col>
                                )}
                              </Row>
                              {data?.offender?.addresses.length && !loading ? (
                                <Table
                                  className={classes.exclusions}
                                  columns={[
                                    {
                                      dataIndex: 'alias',
                                      key: 'alias',
                                      title: intl.formatMessage({
                                        defaultMessage: 'Alias',
                                      }),
                                    },
                                    {
                                      dataIndex: 'full',
                                      key: 'full',
                                      title: intl.formatMessage({
                                        defaultMessage: 'Full Address',
                                      }),
                                    },
                                    {
                                      dataIndex: 'Options',
                                      key: 'options',
                                      render: (_, record) => (
                                        <Row className="no-print" gutter={8}>
                                          {editRights && (
                                            <Col>
                                              <Tooltip
                                                title={intl.formatMessage({
                                                  defaultMessage:
                                                    'Edit Address',
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
                                                    setEditAddressData(
                                                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                      // @ts-ignore
                                                      record.address
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
                                                    'Remove Address',
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
                                                    onDeleteAddress(record.key)
                                                  }
                                                  overlayInnerStyle={{
                                                    padding: 10,
                                                  }}
                                                  placement="topLeft"
                                                  title={intl.formatMessage({
                                                    defaultMessage:
                                                      'Remove the Address?',
                                                  })}
                                                  trigger="hover"
                                                >
                                                  <Button
                                                    disabled={saving}
                                                    icon={
                                                      <FontAwesomeIcon
                                                        icon={faTrash}
                                                      />
                                                    }
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
                                  ]}
                                  dataSource={data?.offender?.addresses.map(
                                    (address) => ({
                                      address,
                                      alias: address.alias,
                                      full: address.full,
                                      key: address.id,
                                    })
                                  )}
                                  loading={loading}
                                  pagination={
                                    data?.offender?.addresses &&
                                    data.offender.addresses.length > 10
                                      ? {
                                          pageSize: 10,
                                        }
                                      : false
                                  }
                                  size="small"
                                />
                              ) : (
                                <Empty
                                  description={intl.formatMessage({
                                    defaultMessage:
                                      'No addresses for this offender',
                                  })}
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                              )}
                            </Card>
                          )}
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Vehicles,
                            }}
                            unauthorizedElement={<div />}
                          >
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
                                <PermissionCheckWrapper
                                  permission={{
                                    method: PermissionMethod.Write,
                                    model: PermissionModel.Vehicles,
                                  }}
                                  unauthorizedElement={<div />}
                                >
                                  <Col className="no-print">
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
                                </PermissionCheckWrapper>
                              </Row>

                              {data?.offender?.vehicles?.length && !loading ? (
                                <VehicleTable
                                  deleteRights={deleteRights}
                                  editRights={editRights}
                                  hasNavigation
                                  onDeleteVehicle={onDeleteVehicle}
                                  saving={saving}
                                  setEditVehicleData={setEditVehicleData}
                                  vehicles={data?.offender?.vehicles}
                                />
                              ) : (
                                <Empty
                                  description={intl.formatMessage({
                                    defaultMessage:
                                      'No vehicles for this offender',
                                  })}
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                              )}
                            </Card>
                          </PermissionCheckWrapper>
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Offenders,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Card loading={loading}>
                              <Title level={4}>
                                {intl.formatMessage({
                                  defaultMessage: 'Crime Groups',
                                })}
                              </Title>
                              {data?.offender?.crimeGroups.length &&
                              !loading ? (
                                <CrimeGroupTable
                                  crimeGroups={
                                    data?.offender?.crimeGroups || []
                                  }
                                  deleteRights={deleteRights}
                                  hasNavigation
                                  onDelete={onDeleteCrimeGroup}
                                  saving={saving}
                                />
                              ) : (
                                <Empty
                                  description={intl.formatMessage({
                                    defaultMessage:
                                      'No crime groups for this offender',
                                  })}
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                              )}
                            </Card>
                          </PermissionCheckWrapper>

                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Evidence,
                            }}
                            unauthorizedElement={<div />}
                          >
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
                                  <Col className="no-print">
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
                                  </Col>
                                )}
                              </Row>

                              {data?.offender?.evidence &&
                              data.offender.evidence.length > 0 &&
                              !loading ? (
                                <EvidenceTable
                                  deleteRights={deleteRights}
                                  evidence={data?.offender?.evidence}
                                  title={ProfileUpdatedModel.Offender}
                                  update={updateDeleteDocument}
                                />
                              ) : (
                                <Empty
                                  description={intl.formatMessage({
                                    defaultMessage:
                                      'No evidence for this offender',
                                  })}
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                              )}
                            </Card>
                          </PermissionCheckWrapper>
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Investigations,
                            }}
                            unauthorizedElement={<div />}
                          >
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

                                <PermissionCheckWrapper
                                  permission={{
                                    method: PermissionMethod.Write,
                                    model: PermissionModel.Investigations,
                                  }}
                                  unauthorizedElement={<div />}
                                >
                                  <Col className="no-print">
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
                                </PermissionCheckWrapper>
                              </Row>
                              {data?.offender?.investigations.length &&
                              !loading ? (
                                <InvestigationTable
                                  investigations={
                                    data?.offender?.investigations
                                  }
                                />
                              ) : (
                                <Empty
                                  description={intl.formatMessage({
                                    defaultMessage:
                                      'No investigations for this offender',
                                  })}
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                              )}
                            </Card>
                          </PermissionCheckWrapper>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="no-print" span={8}>
                <div className={classes.updatesContainer}>
                  <IntelSection
                    confirmDeleteUpdate={confirmDeleteUpdate}
                    editRights={editRights}
                    loadMore={loadMore}
                    onAddToIncident={
                      incidents && incidents.length > 0
                        ? (value) => onAddUpdateImages(value, true)
                        : undefined
                    }
                    onAddToOffender={(value) => onAddUpdateImages(value)}
                    optionRowShow={optionRowShow}
                    saving={saving}
                    scrolledToTop={scrolledToTop}
                    setEditUpdate={setEditUpdate}
                    setReplyTo={setReplyTo}
                    updates={data?.offender?.updates}
                    userId={userId}
                  />
                  {/* <InfiniteScroll
                    height={
                      optionRowShow
                        ? 'calc(100vh - 279px)'
                        : 'calc(100vh - 169px)'
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
                              <Dropdown
                                overlay={
                                  <Menu
                                    items={[
                                      {
                                        key: 0,
                                        label: intl.formatMessage({
                                          defaultMessage:
                                            'Add Image to Incident',
                                          id: 'VN9g7W',
                                        }),
                                        onClick: () => {
                                          onAddUpdateImages(
                                            update.images.map(
                                              ({ id, optimised }) => ({
                                                id,
                                                url: optimised || '',
                                              })
                                            ),
                                            true
                                          );
                                        },
                                        icon: <FontAwesomeIcon icon={faEdit} />,
                                      },
                                      {
                                        key: 1,
                                        label: intl.formatMessage({
                                          defaultMessage:
                                            'Add Image to Offender',
                                          id: 'dy/65U',
                                        }),
                                        onClick: () =>
                                          onAddUpdateImages(
                                            update.images.map(
                                              ({ id, optimised }) => ({
                                                id,
                                                url: optimised || '',
                                              })
                                            )
                                          ),
                                        icon: <FontAwesomeIcon icon={faEdit} />,
                                      },
                                    ]}
                                  />
                                }
                                placement="bottomRight"
                                arrow={{ pointAtCenter: true }}
                              >
                                <Button
                                  style={{
                                    marginLeft:
                                      update.replies.length > 0 ? 48 : 0,
                                  }}
                                  type="text"
                                  danger
                                  size="small"
                                  onClick={() =>
                                    onAddUpdateImages(
                                      update.images.map(
                                        ({ id, optimised }) => ({
                                          id,
                                          url: optimised || '',
                                        })
                                      )
                                    )
                                  }
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Add Image',
                                    id: 'u1ETNe',
                                  })}
                                </Button>
                              </Dropdown>
                            </Col>
                          )}
                        </Row>
                      </div>
                    ))}
                  </InfiniteScroll> */}
                  <UpdateBar
                    offenderId={offenderId}
                    replyTo={replyTo}
                    setOptionRowShow={setOptionRowShow}
                    setReplyTo={setReplyTo}
                    subscribed={data?.offender?.subscribed || false}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incident',
        })}
        width="800"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={data?.offender?.incidents.map(({ id }) => id) || []}
            onClose={toggleLinkIncident}
            update={(value) => updateIncidentList(value.id || '')}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={() => toggleViewAssociate(null)}
        open={viewAssociate !== null}
        title={intl.formatMessage({
          defaultMessage: 'Associate Offender',
        })}
        width="800"
      >
        {viewAssociate && (
          <AssociatedOffender
            offender={viewAssociate}
            onClose={() => toggleViewAssociate(null)}
          />
        )}
      </Drawer>

      <Modal
        okText={intl.formatMessage({
          defaultMessage: 'Add Images',
        })}
        onCancel={closeAddImages}
        onOk={() => {
          if (selectedImages && selectedImages.length > 0) {
            onSelectUpdateImages();
          }
        }}
        open={addImages !== null}
        title={intl.formatMessage({
          defaultMessage: 'Select images to add',
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
          defaultMessage: 'Add Incident',
        })}
        onCancel={() => {
          toggleShowIncidentOptions();
          closeAddImages();
        }}
        onOk={() => {
          if (selectedIncidentId) {
            onAddUpdateImagesToIncident(selectedIncidentId);
          }
        }}
        open={showIncidentOptions}
        title={intl.formatMessage({
          defaultMessage: 'Select an incident to add the updated images',
        })}
        width={600}
      >
        <Table
          columns={[
            {
              dataIndex: 'reference',
              key: 'reference',
              title: intl.formatMessage({
                defaultMessage: 'Alert ID',
              }),
              width: 65,
            },
            {
              dataIndex: 'subject',
              ellipsis: {
                showTitle: false,
              },
              key: 'subject',
              render: (subject: string) => (
                <Tooltip placement="topLeft" title={subject}>
                  {subject}
                </Tooltip>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Subject',
              }),
            },
            {
              dataIndex: 'date',
              ellipsis: {
                showTitle: false,
              },
              key: 'date',
              render: (date: string) => (
                <Tooltip placement="topLeft" title={date}>
                  {date}
                </Tooltip>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Date',
              }),
            },
          ]}
          dataSource={
            incidents
              ? incidents.map((incident) => ({
                  date: incident.dayTime,
                  incidentId: incident.id,
                  // location: incident.business?.name || incident.location?.full,
                  key: incident.id,
                  reference: incident.reference,
                  subject: incident.subject,
                }))
              : []
          }
          pagination={{
            defaultPageSize: 8,
            hideOnSinglePage: true,
          }}
          rowSelection={{
            onSelect,
            type: 'radio',
          }}
          size="small"
        />
      </Modal>
      <Modal
        okText={intl.formatMessage({
          defaultMessage: 'Save',
        })}
        onCancel={() => setEditUpdate(null)}
        onOk={handleEditUpdate}
        open={editUpdate !== null}
        title={intl.formatMessage({
          defaultMessage: 'Edit update content',
        })}
      >
        <Input
          onChange={(e) => setEditUpdateInput(e.target.value)}
          value={editUpdateInput}
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
        close={() => openLightbox(0)}
        images={data?.offender?.images}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
      />

      <Drawer
        onClose={() => toggleViewMatches(null)}
        open={viewMatches !== null}
        title={intl.formatMessage({
          defaultMessage: 'View face AI matches',
        })}
        width={800}
      >
        {viewMatches && <OffenderMatches offenderId={viewMatches} />}
      </Drawer>
      <Drawer
        onClose={toggleEditOffender}
        open={editOffender}
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender Details',
        })}
        width="600"
      >
        {editOffender ? (
          <EditOffenderFeed
            offenderId={data?.offender?.id || ''}
            onClose={toggleEditOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleKnowOffender}
        open={knowOffender}
        title={intl.formatMessage({
          defaultMessage: 'Know This Offender',
        })}
        width="400"
      >
        {knowOffender ? (
          <KnowOffender
            offenderId={data?.offender?.id || ''}
            onClose={toggleKnowOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleCopyOffender}
        open={copyOffender}
        title={intl.formatMessage({
          defaultMessage: 'Copy Offender To Another Scheme',
        })}
        width="600"
      >
        {copyOffender ? (
          <CopyOffender
            offenderId={data?.offender?.id || ''}
            onClose={toggleCopyOffender}
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
          defaultMessage: 'Edit Offender Images',
        })}
        width="800"
        zIndex={999}
      >
        {editImages ? (
          <EditImageAnalyseList
            images={data?.offender?.images}
            onClose={toggleEditImages}
            saving={saving}
            title={intl.formatMessage({
              defaultMessage: 'offender',
            })}
            update={onUpdateImages}
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
            vehicleIds={data?.offender?.vehicles.map(({ id }) => id)}
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
            images={data?.offender?.images.map((el) => ({ ...el, uid: el.id }))}
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
          defaultMessage: 'Update Vehicle',
        })}
        width="800"
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicleSimple
            editData={editVehicleData}
            images={data?.offender?.images.map((el) => ({ ...el, uid: el.id }))}
            onClose={() => setEditVehicleData(null)}
            update={onEditVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* crime group */}
      <Drawer
        onClose={toggleAddCrimeGroup}
        open={addCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Groups',
        })}
        width="800"
        zIndex={1001}
      >
        {addCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={data?.offender?.crimeGroups.map(({ id }) => id)}
            onClose={toggleAddCrimeGroup}
            update={(value) => onAddCrimeGroup(value.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* Address  */}
      {/* <Drawer
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
            onSubmit={(value) =>
              onAddAddress({ ...value, id: `${Math.random()}` })
            }
          />
        )}
      </Drawer> */}
      <Drawer
        onClose={toggleAddAddress}
        open={addAddress}
        title={intl.formatMessage({
          defaultMessage: 'Add Address',
        })}
        width="600"
      >
        {addAddress ? (
          <AddLocation
            onClose={toggleAddAddress}
            showAlias
            update={(value) =>
              onAddAddress({ ...value, id: `${Math.random()}` })
            }
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditAddressData(null)}
        open={!!editAddressData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Address',
        })}
        width="600"
      >
        {editAddressData && (
          // <EditOffenderAddress
          //   onClose={() => setEditAddressData(null)}
          //   onSubmit={onEditAddress}
          //   data={editAddressData}
          // />
          <AddLocation
            locationData={editAddressData}
            onClose={() => setEditAddressData(null)}
            showAlias
            update={(value) =>
              onEditAddress({ ...value, id: editAddressData.id })
            }
          />
        )}
      </Drawer>
      {/* exclusion */}
      <Drawer
        onClose={toggleAddBan}
        open={addBan}
        title={intl.formatMessage({
          defaultMessage: 'Add Outcome',
        })}
        width="400"
      >
        {addBan ? (
          <AddExclusion onClose={toggleAddBan} update={onAddBan} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditBanData(null)}
        open={!!editBanData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Outcome',
        })}
        width="400"
      >
        {editBanData ? (
          <EditExclusion
            banData={editBanData}
            onClose={() => setEditBanData(null)}
            update={onEditBan}
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
          <AddDocuments
            offenderId={data?.offender?.id || ''}
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
            offenderId={data?.offender?.id || ''}
            onClose={toggleAddInvestigation}
            update={updateInvestigationList}
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
          <ShareData offenderId={offenderId} onClose={toggleShareOpen} />
        )}
      </Drawer>

      <OffenderAiDrawer
        offenderId={offenderId}
        onClose={toggleAiDrawer}
        visible={showAiDrawer}
      />
    </div>
  );
};

export default ViewOffender;
