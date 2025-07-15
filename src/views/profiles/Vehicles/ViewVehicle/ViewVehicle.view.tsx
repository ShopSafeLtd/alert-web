import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { VehicleQuery } from 'graphql/vehicles/queries/__generated__/view-vehicle.generated';
import type {
  EditFeedImage,
  ImageCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import AddDocuments from '#/components/form-components/documents/AddDocuments';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import {
  faBell,
  faBellSlash,
  faEdit,
  faFileDownload,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Input,
  Menu,
  Modal,
  Row,
  Skeleton,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import UpdateBar from 'components/MessageInput/UpdateBar';
import ImagesList from 'components/ViewPage/ImagesList';
import IntelSection from 'components/ViewPage/IntelSection';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import EditVehicle from 'components/form-components/Vehicle/EditVehicle';
import AddExistingOffender from 'components/form-components/offender/AddExistingOffender';
import AddNewOffenderSimple from 'components/form-components/offender/AddNewOffenderSimple';
import SimpleEditOffender from 'components/form-components/offender/SimpleEditOffender';
import EditImageList from 'components/images/EditImageList';
import MapCard from 'components/map/MapCard';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import EvidenceTable from 'components/tables/EvidenceTable';
import IncidentTable from 'components/tables/IncidentTable';
import InvestigationTable from 'components/tables/InvestigationTable';
import OffenderTable from 'components/tables/OffenderTable';
import VehicleSideList from 'components/vehicles/VehicleSideList';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ViewVehicle.styles';

const { Title } = Typography;
const { confirm } = Modal;

interface Props {
  addDocument: boolean;
  addExistingOffender: boolean;
  addInvestigation: boolean;
  addOffender: boolean;
  confirmDeleteUpdate: (updateId: string) => void;
  data: VehicleQuery | undefined;
  editImageData: EditFeedImage | null;
  editImages: boolean;
  editOffenderData: OffenderData | null;
  // optionMenuItems: ItemType[];
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;

  editUpdateInput: string;
  editVehicle: boolean;
  handleEditUpdate: () => void;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loadMore: boolean;
  loading: boolean;
  onAddExistingOffender: (id: string) => void;
  onCompletedAddOffender: () => void;
  onCompletedEditOffender: () => void;
  onDeleteImage: (id: string) => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: () => void;
  onEditImage: (id: EditFeedImage) => void;
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
  setEditImageData: (value: EditFeedImage | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setEditUpdateInput: (value: string) => void;
  setOptionRowShow: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  submitEditVehicle: (value: VehicleData) => void;
  toggleAddDocument: () => void;
  toggleAddExistingOffender: () => void;

  toggleAddInvestigation: () => void;
  toggleAddOffender: () => void;
  toggleEditImages: () => void;
  toggleEditVehicle: () => void;
  toggleSubscribe: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  userId: string;
  vehicleId: string;
}

const ViewVehicle = ({
  addDocument,
  addExistingOffender,
  addInvestigation,
  addOffender,
  confirmDeleteUpdate,
  data,
  editImageData,
  editImages,
  editOffenderData,
  editRights,
  editUpdate,
  editUpdateInput,
  editVehicle,
  handleEditUpdate,
  lightBoxOpen,
  lightboxElements,
  loadMore,
  loading,
  onAddExistingOffender,
  onCompletedAddOffender,
  onCompletedEditOffender,
  onDeleteImage,
  onDeleteOffender,
  onDeleteVehicle,
  onEditImage,
  onUpdateImages,
  openLightbox,
  optionRowShow,
  replyTo,
  saving,
  scrolledToTop,
  setEditImageData,
  setEditOffenderData,
  setEditUpdate,
  setEditUpdateInput,
  setOptionRowShow,
  setReplyTo,
  submitEditVehicle,
  toggleAddDocument,
  toggleAddExistingOffender,
  toggleAddInvestigation,
  toggleAddOffender,
  toggleEditImages,
  toggleEditVehicle,
  toggleSubscribe,
  updateAddOffenderList,
  updateDeleteDocument,
  updateDocumentList,
  updateEditOffenderList,
  updateInvestigationList,
  userId,
  vehicleId,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
  });

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <VehicleSideList current={vehicleId} />
        </Col>
        <Col className={classes.content} flex={1}>
          <Row className={classes.headerBar} justify="end">
            <Col>
              <Tooltip
                title={
                  data?.vehicle?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Stop getting notified about updates.',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Get notified about updates.',
                      })
                }
              >
                <Button
                  color={data?.vehicle?.subscribed ? undefined : 'danger'}
                  disabled={saving}
                  loading={saving}
                  onClick={toggleSubscribe}
                  style={{
                    borderBottomRightRadius: editRights ? 0 : 10,
                    borderTopRightRadius: editRights ? 0 : 10,
                    padding: '8.5px .9rem',
                  }}
                  type="ghost"
                >
                  <FontAwesomeIcon
                    icon={data?.vehicle?.subscribed ? faBellSlash : faBell}
                    size="1x"
                  />
                </Button>
              </Tooltip>
            </Col>
            {editRights && (
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Edit vehicle',
                  })}
                >
                  <Button
                    className={classes.toolBtn}
                    onClick={toggleEditVehicle}
                    type="ghost"
                  >
                    <FontAwesomeIcon icon={faEdit} size="1x" />
                  </Button>
                </Tooltip>

                {/* <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          key: 0,
                          label: intl.formatMessage({
                            defaultMessage: 'Edit Details',
                            id: 'A2fHI3',
                          }),
                          onClick: () => toggleEditVehicle(),
                          icon: <FontAwesomeIcon icon={faEdit} />,
                        },
                        {
                          key: 1,
                          label:
                            data?.vehicle?.totalImages &&
                            data?.vehicle.totalImages > 0
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
                </Dropdown> */}
              </Col>
            )}
            {editRights && (
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Download vehicle as PDF',
                  })}
                >
                  <Button
                    className={classes.toolBtn}
                    loading={isPrinting}
                    onClick={handlePrint}
                  >
                    <FontAwesomeIcon icon={faFileDownload} size="1x" />
                  </Button>
                </Tooltip>
              </Col>
            )}
            {editRights && (
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Delete vehicle',
                  })}
                >
                  <Button
                    onClick={() => {
                      confirm({
                        content: intl.formatMessage({
                          defaultMessage: 'This action cannot be undone.',
                        }),
                        onOk() {
                          onDeleteVehicle();
                        },
                        title: intl.formatMessage({
                          defaultMessage: 'Do you want to delete the vehicle?',
                        }),
                      });
                    }}
                    style={{
                      borderBottomLeftRadius: 0,
                      borderLeft: 'none',
                      borderTopLeftRadius: 0,
                      marginRight: 10,
                      padding: '8.5px .9rem',
                    }}
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
                </Tooltip>
              </Col>
            )}
          </Row>
          <div ref={componentRef}>
            <ImagesList
              editImageData={editImageData}
              editRights={editRights}
              hasImages={
                !!(data?.vehicle?.images && data?.vehicle?.images.length > 0)
              }
              imagesData={data?.vehicle?.images}
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
                <Row>
                  <Col flex={1}>
                    <Card loading={loading}>
                      <Row gutter={[8, 8]}>
                        <Col span={12}>
                          <Descriptions column={1}>
                            <Descriptions.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Alert ID',
                              })}
                            >
                              {data?.vehicle?.reference}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Registration',
                              })}
                            >
                              {data?.vehicle?.registration || unknown}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Make',
                              })}
                            >
                              {data?.vehicle?.make || unknown}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Model',
                              })}
                            >
                              {data?.vehicle?.model || unknown}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Colour',
                              })}
                            >
                              {data?.vehicle?.colour || unknown}
                            </Descriptions.Item>

                            {data?.vehicle?.updatedAt && (
                              <Descriptions.Item
                                label={intl.formatMessage({
                                  defaultMessage: 'Updated At',
                                })}
                                span={2}
                              >
                                {FormatCalendar(data.vehicle.updatedAt, intl)}
                              </Descriptions.Item>
                            )}
                          </Descriptions>
                        </Col>
                        <Col span={12}>
                          {data?.vehicle?.incidents &&
                          data?.vehicle?.incidents.length > 0 ? (
                            <MapCard
                              height={301}
                              markers={
                                data?.vehicle?.incidents.map((incident) => ({
                                  ...incident,
                                  geoLat: incident.location?.geoLat,
                                  geoLng: incident.location?.geoLng,
                                })) || []
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
                    </Card>
                  </Col>
                </Row>
              )}
              {loading ? (
                <Skeleton />
              ) : (
                <Row>
                  <Col flex={1}>
                    <Card loading={loading}>
                      <Row gutter={64}>
                        <Col>
                          <Statistic
                            title={
                              <FormattedMessage defaultMessage="Total Incidents" />
                            }
                            value={data?.vehicle?.totalIncidents || 0}
                          />
                        </Col>
                        <Col>
                          <Statistic
                            title={
                              <FormattedMessage defaultMessage="Total Offenders" />
                            }
                            value={data?.vehicle?.totalOffenders || 0}
                          />
                        </Col>
                        <Col>
                          <Statistic
                            title={
                              <FormattedMessage defaultMessage="Total Crime Groups" />
                            }
                            value={data?.vehicle?.totalCrimeGroups || 0}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              )}
              <Card loading={loading}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
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
                                    className={classes.icon}
                                    icon={faMagnifyingGlass}
                                  />
                                ),
                                key: '1',
                                label: intl.formatMessage({
                                  defaultMessage: 'Add Existing Offender',
                                }),
                                onClick: () => toggleAddExistingOffender(),
                              },
                              {
                                icon: (
                                  <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={faPlus}
                                  />
                                ),
                                key: '2',
                                label: intl.formatMessage({
                                  defaultMessage: 'Create New Offender',
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
                              className={classes.icon}
                              icon={faPlus}
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
                {data?.vehicle?.offenders.length && !loading ? (
                  <OffenderTable
                    deleteRights={editRights}
                    editRights={editRights}
                    hasNavigation
                    offenders={data?.vehicle?.offenders}
                    onDeleteOffender={onDeleteOffender}
                    saving={saving}
                    setEditOffenderData={setEditOffenderData}
                  />
                ) : (
                  <Empty
                    description={
                      <FormattedMessage defaultMessage="No offenders for this vehicle" />
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              <Card loading={loading}>
                <Title level={4}>
                  <FormattedMessage defaultMessage="Incidents" />
                </Title>
                {data?.vehicle?.incidents.length && !loading ? (
                  <IncidentTable
                    hasNavigation
                    incidents={data?.vehicle?.incidents}
                  />
                ) : (
                  <Empty
                    description={
                      <FormattedMessage defaultMessage="No incidents for this vehicle" />
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              <Card loading={loading}>
                <Title level={4}>
                  <FormattedMessage defaultMessage="Crime Groups" />
                </Title>
                {data?.vehicle?.crimeGroup.length && !loading ? (
                  <CrimeGroupTable
                    crimeGroups={data?.vehicle?.crimeGroup}
                    hasNavigation
                  />
                ) : (
                  <Empty
                    description={
                      <FormattedMessage defaultMessage="No crime groups for this vehicle" />
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>

              <Card loading={loading}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Evidence',
                      })}
                    </Title>
                  </Col>
                  {editRights && (
                    <Col>
                      <Button
                        icon={
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faPlus}
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

                {data?.vehicle?.evidence.length && !loading ? (
                  <EvidenceTable
                    deleteRights={editRights}
                    evidence={data?.vehicle?.evidence}
                    title={ProfileUpdatedModel.Vehicle}
                    update={updateDeleteDocument}
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No evidence for this vehicle',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              {editRights && (
                <Card loading={loading}>
                  <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
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
                            className={classes.icon}
                            icon={faPlus}
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
                  {data?.vehicle?.investigations.length && !loading ? (
                    <InvestigationTable
                      investigations={data?.vehicle?.investigations}
                    />
                  ) : (
                    <Empty
                      description={intl.formatMessage({
                        defaultMessage: 'No investigations for this vehicle',
                      })}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </Card>
              )}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={classes.updatesContainer}>
            <IntelSection
              confirmDeleteUpdate={confirmDeleteUpdate}
              editRights={editRights}
              loadMore={loadMore}
              optionRowShow={optionRowShow}
              saving={saving}
              scrolledToTop={scrolledToTop}
              setEditUpdate={setEditUpdate}
              setReplyTo={setReplyTo}
              updates={data?.vehicle?.updates}
              userId={userId}
            />
            <UpdateBar
              replyTo={replyTo}
              setOptionRowShow={setOptionRowShow}
              setReplyTo={setReplyTo}
              subscribed={data?.vehicle?.subscribed || false}
              vehicleId={vehicleId}
            />
          </div>
        </Col>

        <Drawer
          onClose={toggleEditVehicle}
          open={editVehicle}
          title={<FormattedMessage defaultMessage="Edit Vehicle Details" />}
          width={700}
          zIndex={999}
        >
          {editVehicle ? (
            <EditVehicle
              editData={{
                ...data?.vehicle,
                crimeGroup: data?.vehicle?.crimeGroup.map(({ id }) => id || ''),
                customGalleries: data?.vehicle?.customGalleries.map(
                  ({ id }) => id || ''
                ),
                groups: data?.vehicle?.groups.map(({ id }) => id || ''),
                id: data?.vehicle?.id || '',
                images: data?.vehicle?.images.map((el) => ({
                  ...el,
                  policeImage: el.policeImage || false,
                  primary: el.primary || false,
                })),
                incidents: data?.vehicle?.incidents,
                offenders: data?.vehicle?.offenders,
              }}
              onClose={toggleEditVehicle}
              showGroups
              update={submitEditVehicle}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Modal
          okText={<FormattedMessage defaultMessage="Save" />}
          onCancel={() => setEditUpdate(null)}
          onOk={handleEditUpdate}
          open={editUpdate !== null}
          title={<FormattedMessage defaultMessage="Edit Update Content" />}
        >
          <Input
            onChange={(e) => setEditUpdateInput(e.target.value)}
            value={editUpdateInput}
          />
        </Modal>
      </Row>
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
            onClose={toggleAddDocument}
            update={updateDocumentList}
            vehicleId={data?.vehicle?.id || ''}
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
            incidentId={data?.vehicle?.id || ''}
            onClose={toggleAddInvestigation}
            update={updateInvestigationList}
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
          defaultMessage: 'Edit Vehicle Images',
        })}
        width="800"
        zIndex={999}
      >
        {editImages ? (
          <EditImageList
            images={data?.vehicle?.images}
            onClose={toggleEditImages}
            saving={saving}
            title={intl.formatMessage({
              defaultMessage: 'vehicle',
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
            images={data?.vehicle?.images}
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
            groupsIds={data?.vehicle.groups.map(({ id }) => id)}
            images={data?.vehicle?.images.map((el) => ({ ...el, uid: el.id }))}
            onClose={toggleAddOffender}
            onCompleted={onCompletedAddOffender}
            update={updateAddOffenderList}
            vehicleId={data?.vehicle.id}
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
            offenderIds={data?.vehicle?.offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOffender}
            update={(value) => onAddExistingOffender(value.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewVehicle;
