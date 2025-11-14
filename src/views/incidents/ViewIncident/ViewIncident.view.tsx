import type {
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { LocationData } from 'types/DataType';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import MapCard from '#/components/map/LocatingCard/MapCard.view';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import AiDetails from '#/views/incidents/ViewIncident/components/AiDetails.view';
import IncidentAiDrawer from '#/views/incidents/ViewIncident/components/AiDrawer/AiDrawer.view';
import Answers from '#/views/incidents/ViewIncident/components/Answers.view';
import Approve from '#/views/incidents/ViewIncident/components/Approve.view';
import CctvRecords from '#/views/incidents/ViewIncident/components/CctvRecords.view';
import Evidence from '#/views/incidents/ViewIncident/components/Evidence.view';
import Images from '#/views/incidents/ViewIncident/components/Images.view';
import IncidentDetails from '#/views/incidents/ViewIncident/components/IncidentDetails.view';
import IncidentSidebar from '#/views/incidents/ViewIncident/components/IncidentSidebar';
import Investigations from '#/views/incidents/ViewIncident/components/Investigations.view';
import Items from '#/views/incidents/ViewIncident/components/Items.view';
import Offenders from '#/views/incidents/ViewIncident/components/Offenders.view';
import Police from '#/views/incidents/ViewIncident/components/Police.view';
import Vehicles from '#/views/incidents/ViewIncident/components/Vehicles.view';
import ViewIncidentToolBar from '#/views/incidents/ViewIncident/components/ViewIncidentToolBar.view';
import { Col, Modal, Row, Skeleton } from 'antd';
import IncidentSideList from 'components/incidents/IncidentSideList';
import { useDeleteUpdateMutation } from 'graphql/mutations/__generated__/delete-update.generated';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import update from 'immutability-helper';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import useStyles from './ViewIncident.styles';

const { confirm } = Modal;

interface IncidentStatus {
  id: string;
  name: string;
  tooltip?: null | string;
}

interface Props {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editImages: boolean;
  editRights: boolean;
  hasApprovePermission: boolean;
  hideIncident: boolean;
  incidentId: string;
  incidentStatuses?: IncidentStatus[];
  loading: boolean;
  onEditAddress: (value: LocationData) => void;
  onStatusChange?: (statusId: string) => Promise<void>;
  saving: boolean;
  setSaving: (value: boolean) => void;
  showAiDetails: boolean;
  statusLoading?: boolean;
  toggleEditAddress: () => void;
  toggleEditImages: () => void;
  toggleShowAiDetails: () => void;
  userId: string;
}

const ViewIncident = ({
  data,
  deleteRights,
  editAddress,
  editImages,
  editRights,
  hasApprovePermission,
  hideIncident,
  incidentId,
  incidentStatuses = [],
  loading,
  onEditAddress,
  onStatusChange,
  saving,
  setSaving,
  showAiDetails,
  statusLoading = false,
  toggleEditAddress,
  toggleEditImages,
  toggleShowAiDetails,
  userId,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  // State for Intel sidebar
  const [replyTo, setReplyTo] = useState<{
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null>(null);
  const [_editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [deleteUpdate] = useDeleteUpdateMutation();

  const scrolledToTop = () => {
    setLoadMore(true);
  };

  const handleDeleteUpdate = (updateId: string) => {
    void deleteUpdate({
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          __typename: 'Update',
          id: updateId,
          replyToId: '',
        },
      },
      update: (store, result) => {
        if (result.data?.deleteUpdate) {
          const oldData = store.readQuery<
            ViewIncidentQuery,
            ViewIncidentQueryVariables
          >({
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });

          if (oldData?.incident)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.incident.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(
                  {
                    data: {
                      incident: {
                        ...oldData.incident,
                        updates: update(oldData.incident.updates, {
                          [oldData.incident.updates
                            .map((item) => item.id)
                            .indexOf(result.data.deleteUpdate.replyToId)]: {
                            replies: {
                              $set: updateItem.replies.filter(
                                (item) =>
                                  item.id !== result.data?.deleteUpdate?.id
                              ),
                            },
                          },
                        }),
                      },
                    },
                    query: ViewIncidentDocument,
                    variables: {
                      where: {
                        id: incidentId,
                      },
                    },
                  }
                );
              }
            } else {
              store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
                data: {
                  incident: {
                    ...oldData.incident,
                    updates: oldData.incident.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
                query: ViewIncidentDocument,
                variables: {
                  where: {
                    id: incidentId,
                  },
                },
              });
            }
        }
      },
      variables: {
        where: {
          id: updateId,
        },
      },
    });
  };

  const confirmDeleteUpdate = (updateId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'The update will be permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete' }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  if (!hasApprovePermission && data?.incident?.approved === false) {
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
            <Row className={classes.content} wrap={false}>
              <Col className={classes.detailsContainer} flex={1}>
                <Approve data={data} incidentId={incidentId} />
                <div className={classes.detailsContent}>
                  <ViewIncidentToolBar
                    data={data}
                    deleteRights={deleteRights}
                    editAddress={editAddress}
                    editRights={editRights}
                    handlePrint={handlePrint}
                    incidentId={incidentId}
                    isPrinting={isPrinting}
                    onEditAddress={onEditAddress}
                    saving={saving}
                    toggleEditAddress={toggleEditAddress}
                    toggleEditImages={toggleEditImages}
                  />
                  <div ref={componentRef}>
                    <Images
                      data={data}
                      editImages={editImages}
                      editRights={editRights}
                      incidentId={incidentId}
                      loading={loading}
                      saving={saving}
                      setSaving={setSaving}
                      toggleEditImages={toggleEditImages}
                    />
                    <div className={classes.details}>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <div className="incident-tab-content">
                          <IncidentDetails
                            data={data}
                            editAddress={editAddress}
                            editRights={editRights}
                            incidentStatuses={incidentStatuses}
                            loading={loading}
                            onStatusChange={onStatusChange}
                            statusLoading={statusLoading}
                          />
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Automations,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <AiDetails
                              data={data}
                              loading={loading}
                              toggleShowAiDetails={toggleShowAiDetails}
                            />
                          </PermissionCheckWrapper>
                          <Row gutter={16}>
                            {/* <Col xl={12} xs={24}>
                              <LocatingCard
                                height={194}
                                location={data?.incident?.location}
                                setLocation={onEditAddress}
                                width="100%"
                              />
                            </Col> */}
                            <Col xl={12} xs={24}>
                              <MapCard
                                height={194}
                                isPrinting={isPrinting}
                                viewport={{
                                  latitude:
                                    data?.incident?.location?.geoLat ?? 0,
                                  longitude:
                                    data?.incident?.location?.geoLng ?? 0,
                                }}
                                width="100%"
                              />
                            </Col>
                            <Col xl={12} xs={24}>
                              <Police data={data} loading={loading} />
                            </Col>
                          </Row>
                          <Items
                            currency={data?.incident?.business?.currency}
                            data={data}
                            deleteRights={deleteRights}
                            editRights={editRights}
                            incidentId={incidentId}
                            loading={loading}
                            saving={saving}
                            setSaving={setSaving}
                          />
                          <Answers
                            data={data}
                            editRights={editRights}
                            incidentId={incidentId}
                            isPrinting={isPrinting}
                            loading={loading}
                          />
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Offenders,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Offenders
                              data={data}
                              deleteRights={deleteRights}
                              editRights={editRights}
                              incidentId={incidentId}
                              loading={loading}
                              saving={saving}
                              setSaving={setSaving}
                            />
                          </PermissionCheckWrapper>

                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Vehicles,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Vehicles
                              data={data}
                              deleteRights={deleteRights}
                              editRights={editRights}
                              incidentId={incidentId}
                              loading={loading}
                              saving={saving}
                              setSaving={setSaving}
                            />
                          </PermissionCheckWrapper>

                          <CctvRecords data={data} loading={loading} />
                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Evidence,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Evidence
                              data={data}
                              deleteRights={deleteRights}
                              editRights={editRights}
                              incidentId={incidentId}
                              loading={loading}
                            />
                          </PermissionCheckWrapper>

                          <PermissionCheckWrapper
                            permission={{
                              method: PermissionMethod.Read,
                              model: PermissionModel.Investigations,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Investigations
                              data={data}
                              incidentId={incidentId}
                              loading={loading}
                            />
                          </PermissionCheckWrapper>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              {/* Right Sidebar */}
              <Col className={`${classes.rightSidebar} no-print`}>
                <IncidentSidebar
                  confirmDeleteUpdate={confirmDeleteUpdate}
                  data={data}
                  editRights={editRights}
                  incidentId={incidentId}
                  loadMore={loadMore}
                  optionRowShow={optionRowShow}
                  replyTo={replyTo}
                  saving={saving}
                  scrolledToTop={scrolledToTop}
                  setEditUpdate={setEditUpdate}
                  setOptionRowShow={setOptionRowShow}
                  setReplyTo={setReplyTo}
                  userId={userId}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <IncidentAiDrawer
        incidentId={incidentId}
        onClose={toggleShowAiDetails}
        visible={showAiDetails}
      />
    </div>
  );
};

export default ViewIncident;
