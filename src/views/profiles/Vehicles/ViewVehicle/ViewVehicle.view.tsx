import React from 'react';
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
import type {
  CreateDocumentMutation,
  CreateInvestigationMutation,
  DeleteDocumentMutation,
  VehicleQuery,
} from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faEdit,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import EditVehicle from 'components/form-components/Vehicle/EditVehicle';

import UpdateBar from 'components/MessageInput/UpdateBar';
import OffenderTable from 'components/tables/OffenderTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import IncidentTable from 'components/tables/IncidentTable';
import type {
  EditFeedImage,
  ImageCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import { FormattedMessage, useIntl } from 'react-intl';
import type { MutationUpdaterFn } from '@apollo/client';
import EvidenceTable from 'components/tables/EvidenceTable';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';
import AddDocument from 'components/form-components/documents/AddDocument';
import InvestigationTable from 'components/tables/InvestigationTable';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import VehicleSideList from 'components/vehicles/VehicleSideList';
import FormatCalendar from 'utils/format-calendar-24h';
import EditImageList from 'components/images/EditImageList';
import MapCard from 'components/map/MapCard';
import SimpleEditOffender from 'components/form-components/offender/offender/SimpleEditOffender';
import AddNewOffenderSimple from 'components/form-components/offender/offender/AddNewOffenderSimple';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import ImagesList from 'components/ViewPage/ImagesList';
import IntelSection from 'components/ViewPage/IntelSection';
import useStyles from './ViewVehicle.styles';

const { Title } = Typography;
const { confirm } = Modal;

interface Props {
  data: VehicleQuery | undefined;
  loading: boolean;
  editVehicle: boolean;
  toggleEditVehicle: () => void;
  saving: boolean;
  onDeleteVehicle: () => void;
  loadMore: boolean;
  scrolledToTop: () => void;
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

  confirmDeleteUpdate: (updateId: string) => void;
  editUpdate: { id: string; text: string } | null;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  // optionMenuItems: ItemType[];
  editRights: boolean;
  vehicleId: string;
  toggleSubscribe: () => void;
  submitEditVehicle: (value: VehicleData) => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  editImages: boolean;
  toggleEditImages: () => void;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  onEditOffender: (value: OffenderData) => void;
  onAddOffender: (value: OffenderData) => void;
  onAddExistingOffender: (id: string) => void;
  addOffender: boolean;
  addExistingOffender: boolean;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  editOffenderData: OffenderData | null;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
}

const ViewVehicle = ({
  data,
  loading,
  saving,
  editVehicle,
  toggleEditVehicle,
  onDeleteVehicle,
  editRights,
  optionRowShow,
  setOptionRowShow,
  userId,
  openLightbox,
  lightBoxOpen,
  editUpdate,
  editUpdateInput,
  handleEditUpdate,
  lightboxElements,
  replyTo,
  scrolledToTop,
  setEditUpdate,
  setEditUpdateInput,
  setReplyTo,
  loadMore,
  confirmDeleteUpdate,
  vehicleId,
  toggleSubscribe,
  submitEditVehicle,
  toggleAddDocument,
  addDocument,
  updateDocumentList,
  updateDeleteDocument,
  addInvestigation,
  toggleAddInvestigation,
  updateInvestigationList,
  editImages,
  toggleEditImages,
  editImageData,
  setEditImageData,
  onDeleteImage,
  onEditImage,
  onUpdateImages,
  addOffender,
  addExistingOffender,
  editOffenderData,
  setEditOffenderData,
  onDeleteOffender,
  toggleAddOffender,
  toggleAddExistingOffender,
  onEditOffender,
  onAddOffender,
  onAddExistingOffender,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
    id: '5jeq8P',
  });

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <VehicleSideList current={vehicleId} />
        </Col>
        <Col flex={1} className={classes.content}>
          <Row gutter={8} className={classes.headerBar} justify="end">
            <Col>
              <Tooltip
                title={
                  data?.vehicle?.subscribed
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
                  color={data?.vehicle?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.vehicle?.subscribed ? faBellSlash : faBell}
                  />
                  {data?.vehicle?.subscribed
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
                <Button type="ghost">
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    onClick={toggleEditVehicle}
                    icon={faEdit}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Edit',
                    id: 'wEQDC6',
                  })}
                </Button>
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
                <Button
                  type="ghost"
                  onClick={() => {
                    confirm({
                      title: intl.formatMessage({
                        defaultMessage: 'Do you want to delete the vehicle?',
                        id: 'dZ4nD4',
                      }),
                      content: intl.formatMessage({
                        defaultMessage: 'This action cannot be undone.',
                        id: 'JDJoIZ',
                      }),
                      onOk() {
                        onDeleteVehicle();
                      },
                    });
                  }}
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
          <ImagesList
            imagesData={data?.vehicle?.images}
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
              !!(data?.vehicle?.images && data?.vehicle?.images.length > 0)
            }
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
                              id: 'k8ZNgH',
                            })}
                          >
                            {data?.vehicle?.reference}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Registration',
                              id: 'qv7ied',
                            })}
                          >
                            {data?.vehicle?.registration || unknown}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Make',
                              id: '6AAM0P',
                            })}
                          >
                            {data?.vehicle?.make || unknown}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Model',
                              id: 'rhSI1/',
                            })}
                          >
                            {data?.vehicle?.model || unknown}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Colour',
                              id: '+e8vAT',
                            })}
                          >
                            {data?.vehicle?.colour || unknown}
                          </Descriptions.Item>

                          {data?.vehicle?.updatedAt && (
                            <Descriptions.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Updated At',
                                id: 'ECx6bx',
                              })}
                              span={2}
                            >
                              {FormatCalendar(data.vehicle.updatedAt)}
                            </Descriptions.Item>
                          )}
                        </Descriptions>
                      </Col>
                      <Col span={12}>
                        {data?.vehicle?.incidents &&
                        data?.vehicle?.incidents.length > 0 ? (
                          <MapCard
                            width="100%"
                            height={301}
                            markers={
                              data?.vehicle?.incidents.map((incident) => ({
                                geoLat: incident.location?.geoLat,
                                geoLng: incident.location?.geoLng,
                              })) || []
                            }
                          />
                        ) : (
                          <Card
                            loading={loading}
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
                            <FormattedMessage
                              defaultMessage="Total Incidents"
                              id="pUlxda"
                            />
                          }
                          value={data?.vehicle?.totalIncidents || 0}
                        />
                      </Col>
                      <Col>
                        <Statistic
                          title={
                            <FormattedMessage
                              defaultMessage="Total Offenders"
                              id="Pyo0l3"
                            />
                          }
                          value={data?.vehicle?.totalOffenders || 0}
                        />
                      </Col>
                      <Col>
                        <Statistic
                          title={
                            <FormattedMessage
                              defaultMessage="Total Crime Groups"
                              id="PwRU00"
                            />
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
              <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders',
                      id: 'xb54TN',
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
                                id: 'w4XD3a',
                                defaultMessage: 'Add Existing Offender',
                              }),
                              key: '1',
                              icon: (
                                <FontAwesomeIcon
                                  icon={faMagnifyingGlass}
                                  className={classes.icon}
                                />
                              ),
                              onClick: () => toggleAddExistingOffender(),
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
                                  className={classes.icon}
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
                            className={classes.icon}
                          />
                        }
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Offenders',
                          id: 'KaNxum',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                )}
              </Row>
              {data?.vehicle?.offenders.length && !loading ? (
                <OffenderTable
                  offenders={data?.vehicle?.offenders}
                  setEditOffenderData={setEditOffenderData}
                  onDeleteOffender={onDeleteOffender}
                  saving={saving}
                  editRights={editRights}
                  deleteRights={editRights}
                  hasNavigation
                />
              ) : (
                <Empty
                  description={
                    <FormattedMessage
                      defaultMessage="No offenders for this vehicle"
                      id="R72ORA"
                    />
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
            <Card loading={loading}>
              <Title level={4}>
                <FormattedMessage defaultMessage="Incidents" id="mtr3R4" />
              </Title>
              {data?.vehicle?.incidents.length && !loading ? (
                <IncidentTable
                  incidents={data?.vehicle?.incidents}
                  hasNavigation
                />
              ) : (
                <Empty
                  description={
                    <FormattedMessage
                      defaultMessage="No incidents for this vehicle"
                      id="eMIzkc"
                    />
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
            <Card loading={loading}>
              <Title level={4}>
                <FormattedMessage defaultMessage="Crime Groups" id="a0aLil" />
              </Title>
              {data?.vehicle?.crimeGroup.length && !loading ? (
                <CrimeGroupTable
                  crimeGroups={data?.vehicle?.crimeGroup}
                  hasNavigation
                />
              ) : (
                <Empty
                  description={
                    <FormattedMessage
                      defaultMessage="No crime groups for this vehicle"
                      id="yhLYu7"
                    />
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>

            <Card loading={loading}>
              <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Evidence',
                      id: '6g7+6N',
                    })}
                  </Title>
                </Col>
                {editRights && (
                  <Col>
                    <Button
                      size="small"
                      onClick={toggleAddDocument}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          className={classes.icon}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add Evidence',
                        id: 'vgVasT',
                      })}
                    </Button>
                  </Col>
                )}
              </Row>

              {data?.vehicle?.evidence.length && !loading ? (
                <EvidenceTable
                  evidence={data?.vehicle?.evidence}
                  title={ProfileUpdatedModel.Vehicle}
                  update={updateDeleteDocument}
                  deleteRights={editRights}
                />
              ) : (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage: 'No evidence for this vehicle',
                    id: 'Ca6r3Z',
                  })}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
            {editRights && (
              <Card loading={loading}>
                <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Investigations',
                        id: 'juQ8mz',
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
                          className={classes.icon}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add Investigation',
                        id: 'U5+v9Y',
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
                      id: 'Dcp2gy',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            )}
          </div>
        </Col>
        <Col span={6}>
          <div className={classes.updatesContainer}>
            <IntelSection
              updates={data?.vehicle?.updates}
              scrolledToTop={scrolledToTop}
              loadMore={loadMore}
              saving={saving}
              editRights={editRights}
              userId={userId}
              confirmDeleteUpdate={confirmDeleteUpdate}
              setEditUpdate={setEditUpdate}
              setReplyTo={setReplyTo}
              optionRowShow={optionRowShow}
            />
            <UpdateBar
              replyTo={replyTo}
              vehicleId={vehicleId}
              setReplyTo={setReplyTo}
              subscribed={data?.vehicle?.subscribed || false}
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>

        <Drawer
          title={
            <FormattedMessage
              defaultMessage="Edit Vehicle Details"
              id="AWN+hV"
            />
          }
          visible={editVehicle}
          width={700}
          zIndex={999}
          onClose={toggleEditVehicle}
        >
          {editVehicle ? (
            <EditVehicle
              onClose={toggleEditVehicle}
              update={submitEditVehicle}
              editData={{
                ...data?.vehicle,
                id: data?.vehicle?.id || '',
                crimeGroup: data?.vehicle?.crimeGroup.map(({ id }) => id || ''),
                incidents: data?.vehicle?.incidents,
                offenders: data?.vehicle?.offenders,
                customGalleries: data?.vehicle?.customGalleries.map(
                  ({ id }) => id || ''
                ),
                groups: data?.vehicle?.groups.map(({ id }) => id || ''),
                images: data?.vehicle?.images.map((el) => ({
                  ...el,
                  policeImage: el.policeImage || false,
                  primary: el.primary || false,
                })),
              }}
              showGroups
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Modal
          title={
            <FormattedMessage
              defaultMessage="Edit Update Content"
              id="8sZeJM"
            />
          }
          visible={editUpdate !== null}
          onOk={handleEditUpdate}
          onCancel={() => setEditUpdate(null)}
          okText={<FormattedMessage defaultMessage="Save" id="jvo0vs" />}
        >
          <Input
            value={editUpdateInput}
            onChange={(e) => setEditUpdateInput(e.target.value)}
          />
        </Modal>
      </Row>
      {/* evidence */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
          id: 'vgVasT',
        })}
        visible={addDocument}
        width="600"
        onClose={toggleAddDocument}
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocument
            vehicleId={data?.vehicle?.id || ''}
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
          id: 'QaKS9A',
        })}
        visible={addInvestigation}
        width="500"
        onClose={toggleAddInvestigation}
      >
        {addInvestigation ? (
          <AddInvestigation
            update={updateInvestigationList}
            incidentId={data?.vehicle?.id || ''}
            onClose={toggleAddInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* images */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle Images',
          id: 'd9vpDB',
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
            images={data?.vehicle?.images}
            title={intl.formatMessage({
              defaultMessage: 'vehicle',
              id: 'qcNaCj',
            })}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* offender */}
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
            images={data?.vehicle?.images}
          />
        ) : (
          <div />
        )}
      </Drawer>
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
            images={data?.vehicle?.images.map((el) => ({ ...el, uid: el.id }))}
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
        width="1000"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            update={(value) => onAddExistingOffender(value.id)}
            offenderIds={data?.vehicle?.offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewVehicle;
