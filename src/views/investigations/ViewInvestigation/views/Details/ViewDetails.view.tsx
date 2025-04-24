import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';
import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { RefObject } from 'react';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Modal,
  Row,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import IntelSection from 'components/ViewPage/IntelSection';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import SuggestedIncidents from 'components/investigations/SuggestedIncidents';
import SuggestedOffenders from 'components/investigations/SuggestedOffenders';
import SuggestedVehicles from 'components/investigations/SuggestedVehicles';
import MapCard from 'components/map/MapCard/MapCard.view';
import ActivityTable from 'components/tables/ActivityTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import IncidentTable from 'components/tables/IncidentTable';
import OffenderTable from 'components/tables/OffenderTable/OffenderTable.view';
import VehicleTable from 'components/tables/VehicleTable';
import { InvestigationStatus } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import GetInvestigationStatusValues from 'types/enums/investigation-status';

import UpdateBar from '../../../../../components/MessageInput/UpdateBar';
import TabContent from '../../../../../components/TabContent';
import useStyles from './ViewDetails.styles';

const { Paragraph, Title } = Typography;

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  confirmDeleteUpdate: (updateId: string) => void;

  data: ViewInvestigationQuery | undefined;
  editIncidentId: string;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  handleConnectIncident: (id: string) => void;
  handleConnectOffender: (id: string) => void;
  handleConnectVehicle: (id: string) => void;
  handleEditUpdate: () => void;
  investigationId: string;
  loadMore: boolean;
  loading: boolean;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteIncident: (id: string) => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  setEditIncidentId: (value: string) => void;
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
  setViewTodoVisible: (value: null | string) => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
  templatesLoading: boolean;
  toggleAddCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleEditInvestigation: () => void;
  toggleViewSuggestedIncidents: () => void;
  toggleViewSuggestedOffenders: () => void;
  toggleViewSuggestedVehicles: () => void;
  userId: string;
  viewSuggestedIncidents: boolean;
  viewSuggestedOffenders: boolean;
  viewSuggestedVehicles: boolean;
}
const getTextStatus = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'green';
  if (value === InvestigationStatus.Closed) return 'red';
  if (value === InvestigationStatus.Paused) return 'orange';
  return 'green';
};
const ViewInvestigation = ({
  componentRef,
  confirmDeleteUpdate,
  data,
  editIncidentId,
  editRights,
  editUpdate,
  editUpdateInput,
  handleConnectIncident,
  handleConnectOffender,
  handleConnectVehicle,
  handleEditUpdate,
  investigationId,
  loadMore,
  loading,
  onDeleteCrimeGroup,
  onDeleteIncident,
  onDeleteOffender,
  onDeleteVehicle,
  optionRowShow,
  replyTo,
  saving,
  scrolledToTop,
  setCompleteTodoVisible,
  setEditCrimeGroupData,
  setEditIncidentId,
  setEditOffenderData,
  setEditUpdate,
  setEditUpdateInput,
  setEditVehicleData,
  setOptionRowShow,
  setReplyTo,
  setViewTodoVisible,
  suggestedData,
  templatesLoading,
  toggleAddCrimeGroup,
  toggleAddExistingCrimeGroup,
  toggleAddExistingIncident,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddOffender,
  toggleAddTodo,
  toggleAddVehicle,
  toggleEditInvestigation,
  toggleViewSuggestedIncidents,
  toggleViewSuggestedOffenders,
  toggleViewSuggestedVehicles,
  userId,
  viewSuggestedIncidents,
  viewSuggestedOffenders,
  viewSuggestedVehicles,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  return (
    <>
      <TabContent>
        <Row className={classes.content}>
          <Col className={classes.detailsContainer} span={18}>
            <div ref={componentRef}>
              <Card>
                <Row align="middle" gutter={8}>
                  <Col flex={1}>
                    <Title className={classes.headerTitle} level={4}>
                      {data?.investigation?.name}
                      <Tag
                        color={getTextStatus(
                          data?.investigation?.status ||
                            InvestigationStatus.Open
                        )}
                        style={{ marginLeft: 10, marginTop: -10 }}
                      >
                        {
                          GetInvestigationStatusValues[
                            data?.investigation?.status ||
                              InvestigationStatus.Open
                          ]
                        }
                      </Tag>
                    </Title>
                  </Col>
                  <Col>
                    <Button
                      disabled={saving}
                      icon={
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          size="lg"
                          style={{ marginRight: 5 }}
                        />
                      }
                      onClick={toggleEditInvestigation}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Edit Details',
                      })}
                    </Button>
                  </Col>
                </Row>

                <Paragraph
                  style={{ margin: 0, marginBottom: 10, marginTop: -15 }}
                >
                  {data?.investigation?.description}
                </Paragraph>
                <Row gutter={32}>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Incidents',
                      })}
                      value={data?.investigation?.totalIncidents || 0}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Offenders',
                      })}
                      value={data?.investigation?.totalOffenders || 0}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Loss',
                      })}
                      value={intl.formatNumber(
                        data?.investigation?.totalValue || 0,
                        {
                          currency,
                          style: 'currency',
                        }
                      )}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Value Recovered',
                      })}
                      value={intl.formatNumber(
                        data?.investigation?.totalRecoveredValue || 0,
                        {
                          currency,
                          style: 'currency',
                        }
                      )}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                      })}
                      value={`${
                        data?.investigation?.totalTheftSuccess?.toFixed(0) || 0
                      }%`}
                    />
                  </Col>
                </Row>
              </Card>
              <Card loading={loading}>
                <Row align="middle" gutter={8}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Offenders',
                      })}
                    </Title>
                  </Col>
                  {suggestedData?.investigation?.suggestedOffenders &&
                    suggestedData?.investigation?.suggestedOffenders.length >
                      0 && (
                      <Col>
                        <Button
                          danger
                          disabled={saving}
                          onClick={toggleViewSuggestedOffenders}
                          size="small"
                          type="ghost"
                        >
                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                          {
                            suggestedData.investigation?.suggestedOffenders
                              .length
                          }
                          {intl.formatMessage({
                            defaultMessage: ' Suggested Offenders',
                          })}
                        </Button>
                      </Col>
                    )}
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
                                defaultMessage: 'Add Existing Offender',
                              }),
                              onClick: () => toggleAddExistingOffender(),
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
                </Row>
                <div className={classes.table}>
                  <OffenderTable
                    deleteRights={editRights}
                    editRights={editRights}
                    hasNavigation
                    offenders={data?.investigation?.offenders || []}
                    onDeleteOffender={onDeleteOffender}
                    saving={saving}
                    setEditOffenderData={setEditOffenderData}
                  />
                </div>
              </Card>
              <Card loading={loading}>
                <Row align="middle" gutter={8}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Incidents',
                      })}
                    </Title>
                  </Col>
                  {suggestedData?.investigation?.suggestedIncidents &&
                    suggestedData.investigation.suggestedIncidents.length >
                      0 && (
                      <Col>
                        <Button
                          danger
                          disabled={saving}
                          onClick={toggleViewSuggestedIncidents}
                          size="small"
                        >
                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                          {
                            suggestedData.investigation.suggestedIncidents
                              .length
                          }
                          {intl.formatMessage({
                            defaultMessage: ' Suggested Incidents',
                          })}
                        </Button>
                      </Col>
                    )}

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
                                defaultMessage: 'Add Existing Incidents',
                              }),
                              onClick: () => toggleAddExistingIncident(),
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
                                defaultMessage: 'Create New Incident',
                              }),
                              onClick: () =>
                                navigate(
                                  `/app/incidents/add/${investigationId}`
                                ),
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
                          defaultMessage: 'Add Incidents',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
                <div className={classes.table}>
                  <IncidentTable
                    deleteRights={editRights}
                    hasNavigation
                    incidents={data?.investigation?.incidents}
                    onDelete={onDeleteIncident}
                    // className={classes.table}
                    setEditData={setEditIncidentId}
                  />
                </div>
              </Card>
              {data?.investigation?.incidents &&
                data?.investigation?.incidents.length > 0 && (
                  <MapCard
                    height={500}
                    markers={
                      data?.investigation?.incidents.map((incident) => ({
                        geoLat: incident?.location?.geoLat,
                        geoLng: incident?.location?.geoLng,
                      })) || []
                    }
                    width="100%"
                  />
                )}
              <Card loading={loading}>
                <Row align="middle" gutter={8}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Vehicles',
                      })}
                    </Title>
                  </Col>
                  {suggestedData?.investigation?.suggestedVehicles &&
                    suggestedData.investigation.suggestedVehicles.length >
                      0 && (
                      <Col>
                        <Button
                          danger
                          disabled={saving}
                          onClick={toggleViewSuggestedVehicles}
                          size="small"
                        >
                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                          {suggestedData.investigation.suggestedVehicles.length}{' '}
                          {intl.formatMessage({
                            defaultMessage: 'Suggested Vehicles',
                          })}
                        </Button>
                      </Col>
                    )}

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
                                defaultMessage: 'Add Existing Vehicles',
                              }),
                              onClick: () => toggleAddExistingVehicle(),
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
                                defaultMessage: 'Create New Vehicle',
                              }),
                              onClick: () => toggleAddVehicle(),
                            },
                          ]}
                        />
                      }
                    >
                      <Button
                        disabled={saving}
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
                </Row>
                <div className={classes.table}>
                  <VehicleTable
                    deleteRights={editRights}
                    editRights={editRights}
                    hasNavigation
                    onDeleteVehicle={onDeleteVehicle}
                    saving={saving}
                    setEditVehicleData={setEditVehicleData}
                    vehicles={data?.investigation?.vehicles}
                  />
                </div>
              </Card>

              <Card loading={loading}>
                <Row align="middle" gutter={8}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Crime Groups',
                      })}
                    </Title>
                  </Col>

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
                                defaultMessage: 'Add Existing Crime Groups',
                              }),
                              onClick: () => toggleAddExistingCrimeGroup(),
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
                                defaultMessage: 'Create New Crime Group',
                              }),
                              onClick: () => toggleAddCrimeGroup(),
                            },
                          ]}
                        />
                      }
                    >
                      <Button
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Crime Groups',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
                <div className={classes.table}>
                  <CrimeGroupTable
                    crimeGroups={data?.investigation?.crimeGroups}
                    deleteRights={editRights}
                    hasNavigation
                    onDelete={onDeleteCrimeGroup}
                    saving={saving}
                    setEditData={setEditCrimeGroupData}
                  />
                </div>
              </Card>
              <Card loading={loading}>
                <Row align="middle" gutter={8}>
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
                      key="3"
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
                <div className={classes.table}>
                  <ActivityTable
                    saving={saving || loading}
                    setCompleteTodoVisible={setCompleteTodoVisible}
                    setViewTodoVisible={setViewTodoVisible}
                    todos={data?.investigation?.todos}
                  />
                </div>
              </Card>
            </div>
          </Col>
          <Col
            span={6}
            style={{ display: 'hidden', height: 'calc(100vh - 65px)' }}
          >
            <div className={classes.updatesContainer}>
              <IntelSection
                confirmDeleteUpdate={confirmDeleteUpdate}
                editRights={editRights}
                heightOffset={83}
                loadMore={loadMore}
                optionRowShow={optionRowShow}
                saving={saving}
                scrolledToTop={scrolledToTop}
                setEditUpdate={setEditUpdate}
                setReplyTo={setReplyTo}
                updates={data?.investigation?.updates}
                userId={userId}
              />
              <UpdateBar
                investigationId={investigationId}
                replyTo={replyTo}
                setOptionRowShow={setOptionRowShow}
                setReplyTo={setReplyTo}
                subscribed={data?.investigation?.subscribed || false}
              />
            </div>
          </Col>
        </Row>
      </TabContent>
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
        onClose={toggleViewSuggestedOffenders}
        open={viewSuggestedOffenders}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Offenders',
        })}
        width="900"
      >
        <SuggestedOffenders
          handleAddSuggestion={handleConnectOffender}
          onClose={toggleViewSuggestedOffenders}
          suggestedData={suggestedData}
        />
      </Drawer>

      <Drawer
        onClose={toggleViewSuggestedIncidents}
        open={viewSuggestedIncidents}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Incidents',
        })}
        width="900"
      >
        <SuggestedIncidents
          handleAddSuggestion={handleConnectIncident}
          onClose={toggleViewSuggestedIncidents}
          suggestedData={suggestedData}
        />
      </Drawer>
      {/* vehicle */}
      <Drawer
        onClose={toggleViewSuggestedVehicles}
        open={viewSuggestedVehicles}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Vehicles',
        })}
        width="900"
      >
        <SuggestedVehicles
          handleAddSuggestion={handleConnectVehicle}
          suggestedData={suggestedData}
        />
      </Drawer>

      {/* incident */}
      <Drawer
        onClose={() => setEditIncidentId('')}
        open={!!editIncidentId}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident',
        })}
        width="600"
      >
        {editIncidentId ? (
          <EditIncidentFeed
            incidentId={editIncidentId}
            onClose={() => setEditIncidentId('null')}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default ViewInvestigation;
