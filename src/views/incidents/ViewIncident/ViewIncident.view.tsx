import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { LocationData } from 'types/DataType';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import MapCard from '#/components/map/LocatingCard/MapCard.view';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import Activities from '#/views/incidents/ViewIncident/components/Activities.view';
import AiDetails from '#/views/incidents/ViewIncident/components/AiDetails.view';
import IncidentAiDrawer from '#/views/incidents/ViewIncident/components/AiDrawer/AiDrawer.view';
import Answers from '#/views/incidents/ViewIncident/components/Answers.view';
import Approve from '#/views/incidents/ViewIncident/components/Approve.view';
import CctvRecords from '#/views/incidents/ViewIncident/components/CctvRecords.view';
import Evidence from '#/views/incidents/ViewIncident/components/Evidence.view';
import Images from '#/views/incidents/ViewIncident/components/Images.view';
import IncidentDetails from '#/views/incidents/ViewIncident/components/IncidentDetails.view';
import Intel from '#/views/incidents/ViewIncident/components/Intel.view';
import Investigations from '#/views/incidents/ViewIncident/components/Investigations.view';
import Items from '#/views/incidents/ViewIncident/components/Items.view';
import Offenders from '#/views/incidents/ViewIncident/components/Offenders.view';
import Police from '#/views/incidents/ViewIncident/components/Police.view';
import Vehicles from '#/views/incidents/ViewIncident/components/Vehicles.view';
import ViewIncidentToolBar from '#/views/incidents/ViewIncident/components/ViewIncidentToolBar.view';
import { Col, Row, Skeleton } from 'antd';
import IncidentSideList from 'components/incidents/IncidentSideList';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from './ViewIncident.styles';

interface Props {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editImages: boolean;
  editRights: boolean;
  hasApprovePermission: boolean;
  hideIncident: boolean;
  incidentId: string;
  loading: boolean;
  onEditAddress: (value: LocationData) => void;
  saving: boolean;
  setSaving: (value: boolean) => void;
  showAiDetails: boolean;
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
  loading,
  onEditAddress,
  saving,
  setSaving,
  showAiDetails,
  toggleEditAddress,
  toggleEditImages,
  toggleShowAiDetails,
  userId,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  if (hasApprovePermission && data?.incident?.approved === false) {
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
                            loading={loading}
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
                              model: PermissionModel.Activities,
                            }}
                            unauthorizedElement={<div />}
                          >
                            <Activities
                              data={data}
                              incidentId={incidentId}
                              loading={loading}
                              saving={saving}
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
              <Col className="no-print" span={8}>
                <Intel
                  data={data}
                  editRights={editRights}
                  incidentId={incidentId}
                  saving={saving}
                  setSaving={setSaving}
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
