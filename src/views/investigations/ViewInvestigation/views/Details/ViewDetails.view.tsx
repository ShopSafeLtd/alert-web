import React from 'react';
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
import type {
  InvestigationSuggestionsQuery,
  ViewInvestigationQuery,
} from 'graphql/generated';
import { InvestigationStatus } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';

import { useNavigate } from 'react-router';
import OffenderTable from 'components/tables/OffenderTable/OffenderTable.view';
import MapCard from 'components/map/MapCard/MapCard.view';
import SuggestedOffenders from 'components/investigations/SuggestedOffenders';
import SuggestedVehicles from 'components/investigations/SuggestedVehicles';
import SuggestedIncidents from 'components/investigations/SuggestedIncidents';
import { useIntl } from 'react-intl';
import GetInvestigationStatusValues from 'types/enums/investigation-status';
import ActivityTable from 'components/tables/ActivityTable';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import IncidentTable from 'components/tables/IncidentTable';
import VehicleTable from 'components/tables/VehicleTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import IntelSection from 'components/ViewPage/IntelSection';
import useStyles from './ViewDetails.styles';

import UpdateBar from '../../../../../components/MessageInput/UpdateBar';
import TabContent from '../../../../../components/TabContent';

const { Title, Paragraph } = Typography;

interface Props {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;

  loadMore: boolean;
  scrolledToTop: () => void;
  editRights: boolean;
  userId: string;
  saving: boolean;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  investigationId: string;
  handleEditUpdate: () => void;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
  viewSuggestedOffenders: boolean;
  toggleViewSuggestedOffenders: () => void;
  handleConnectOffender: (id: string) => void;
  handleConnectIncident: (id: string) => void;
  handleConnectVehicle: (id: string) => void;
  viewSuggestedIncidents: boolean;
  toggleViewSuggestedIncidents: () => void;
  viewSuggestedVehicles: boolean;
  toggleViewSuggestedVehicles: () => void;
  templatesLoading: boolean;
  toggleAddTodo: () => void;
  setViewTodoVisible: (value: string | null) => void;
  setCompleteTodoVisible: (value: string | null) => void;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  toggleAddCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  onDeleteCrimeGroup: (id: string) => void;
  toggleAddExistingIncident: () => void;
  onDeleteIncident: (id: string) => void;
  editIncidentId: string;
  setEditIncidentId: (value: string) => void;
  toggleEditInvestigation: () => void;
}
const getTextStatus = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'green';
  if (value === InvestigationStatus.Closed) return 'red';
  if (value === InvestigationStatus.Paused) return 'orange';
  return 'green';
};
const ViewInvestigation = ({
  data,
  loading,
  scrolledToTop,
  loadMore,
  userId,
  editRights,
  replyTo,
  setEditUpdate,
  confirmDeleteUpdate,
  setReplyTo,
  investigationId,
  handleEditUpdate,
  setEditUpdateInput,
  editUpdateInput,
  editUpdate,
  optionRowShow,
  setOptionRowShow,
  suggestedData,
  toggleViewSuggestedOffenders,
  viewSuggestedOffenders,
  handleConnectIncident,
  handleConnectOffender,
  handleConnectVehicle,
  toggleViewSuggestedIncidents,
  toggleViewSuggestedVehicles,
  viewSuggestedIncidents,
  viewSuggestedVehicles,
  templatesLoading,
  setViewTodoVisible,
  setCompleteTodoVisible,
  toggleAddTodo,
  toggleAddOffender,
  toggleAddExistingOffender,
  setEditOffenderData,
  onDeleteOffender,
  toggleAddVehicle,
  toggleAddExistingVehicle,
  setEditVehicleData,
  onDeleteVehicle,
  toggleAddCrimeGroup,
  toggleAddExistingCrimeGroup,
  setEditCrimeGroupData,
  onDeleteCrimeGroup,
  toggleAddExistingIncident,
  onDeleteIncident,
  editIncidentId,
  setEditIncidentId,
  saving,
  toggleEditInvestigation,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
  return (
    <>
      <TabContent>
        <Row className={classes.content}>
          <Col span={18} className={classes.detailsContainer}>
            <Card>
              <Row gutter={8} align="middle">
                <Col flex={1}>
                  <Title className={classes.headerTitle} level={4}>
                    {data?.investigation?.name}
                    <Tag
                      color={getTextStatus(
                        data?.investigation?.status || InvestigationStatus.Open
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
                        style={{ marginRight: 5 }}
                        size="lg"
                        icon={faPenToSquare}
                      />
                    }
                    onClick={toggleEditInvestigation}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Edit Details',
                      id: 'A2fHI3',
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
                      id: 'pUlxda',
                    })}
                    value={data?.investigation?.totalIncidents || 0}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Offenders',
                      id: 'Pyo0l3',
                    })}
                    value={data?.investigation?.totalOffenders || 0}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Loss',
                      id: 'LPr3Nh',
                    })}
                    value={`£${
                      data?.investigation?.totalValue?.toLocaleString() || 0
                    }`}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Value Recovered',
                      id: 't+iLve',
                    })}
                    value={`£${
                      data?.investigation?.totalRecoveredValue?.toLocaleString() ||
                      0
                    }`}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Loss Rate',
                      id: 'mQPFSj',
                    })}
                    value={`${
                      data?.investigation?.totalTheftSuccess?.toFixed(0) || 0
                    }%`}
                  />
                </Col>
              </Row>
            </Card>
            <Card loading={loading}>
              <Row gutter={8} align="middle">
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders',
                      id: 'xb54TN',
                    })}
                  </Title>
                </Col>
                {suggestedData?.investigation?.suggestedOffenders &&
                  suggestedData?.investigation?.suggestedOffenders.length >
                    0 && (
                    <Col>
                      <Button
                        disabled={saving}
                        size="small"
                        danger
                        type="ghost"
                        onClick={toggleViewSuggestedOffenders}
                      >
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {suggestedData.investigation?.suggestedOffenders.length}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'Suggested Offenders',
                          id: '5UuihT',
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
                            label: intl.formatMessage({
                              id: 'w4XD3a',
                              defaultMessage: 'Add Existing Offender',
                            }),
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
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
                        id: 'KaNxum',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <div className={classes.table}>
                <OffenderTable
                  offenders={data?.investigation?.offenders || []}
                  deleteRights
                  onDeleteOffender={onDeleteOffender}
                  setEditOffenderData={setEditOffenderData}
                  hasNavigation
                />
              </div>
            </Card>
            <Card loading={loading}>
              <Row align="middle" gutter={8}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents',
                      id: 'mtr3R4',
                    })}
                  </Title>
                </Col>
                {suggestedData?.investigation?.suggestedIncidents &&
                  suggestedData.investigation.suggestedIncidents.length > 0 && (
                    <Col>
                      <Button
                        disabled={saving}
                        danger
                        size="small"
                        onClick={toggleViewSuggestedIncidents}
                      >
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {suggestedData.investigation.suggestedIncidents.length}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'Suggested Incidents',
                          id: 'CKS/s0',
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
                            label: intl.formatMessage({
                              defaultMessage: 'Add Existing Incidents',
                              id: 'Ppof3h',
                            }),
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddExistingIncident(),
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Create New Incident',
                              id: 'eyw+JQ',
                            }),
                            key: '2',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () =>
                              navigate(`/app/incidents/add/${investigationId}`),
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
                        defaultMessage: 'Add Incidents',
                        id: 'kKj7sq',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <div className={classes.table}>
                <IncidentTable
                  // className={classes.table}
                  setEditData={setEditIncidentId}
                  incidents={data?.investigation?.incidents}
                  deleteRights
                  onDelete={onDeleteIncident}
                  hasNavigation
                />
              </div>
            </Card>
            {data?.investigation?.incidents &&
              data?.investigation?.incidents.length > 0 && (
                <MapCard
                  width="100%"
                  height={500}
                  markers={
                    data?.investigation?.incidents.map((incident) => ({
                      geoLat: incident?.location?.geoLat,
                      geoLng: incident?.location?.geoLng,
                    })) || []
                  }
                />
              )}
            <Card loading={loading}>
              <Row align="middle" gutter={8}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Vehicles',
                      id: 'r6wuJ3',
                    })}
                  </Title>
                </Col>
                {suggestedData?.investigation?.suggestedVehicles &&
                  suggestedData.investigation.suggestedVehicles.length > 0 && (
                    <Col>
                      <Button
                        disabled={saving}
                        danger
                        size="small"
                        onClick={toggleViewSuggestedVehicles}
                      >
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {suggestedData.investigation.suggestedVehicles.length}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'Suggested Vehicles',
                          id: 'fzU5Bx',
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
                            label: intl.formatMessage({
                              id: 'goP1s6',
                              defaultMessage: 'Add Existing Vehicles',
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
                              id: 'xiAZxN',
                              defaultMessage: 'Create New Vehicle',
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
                      disabled={saving}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      {intl.formatMessage({
                        id: 'iKGwyV',
                        defaultMessage: 'Add Vehicles',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <div className={classes.table}>
                <VehicleTable
                  vehicles={data?.investigation?.vehicles}
                  setEditVehicleData={setEditVehicleData}
                  onDeleteVehicle={onDeleteVehicle}
                  saving={saving}
                  editRights
                  deleteRights
                  hasNavigation
                />
              </div>
            </Card>

            <Card loading={loading}>
              <Row align="middle" gutter={8}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Crime Groups',
                      id: 'a0aLil',
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
                              id: '3HDZC+',
                              defaultMessage: 'Add Existing Crime Groups',
                            }),
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddExistingCrimeGroup(),
                          },
                          {
                            label: intl.formatMessage({
                              id: 'zYHO7w',
                              defaultMessage: 'Create New Crime Group',
                            }),
                            key: '2',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 5 }}
                              />
                            ),
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
                        id: 'mYgStg',
                        defaultMessage: 'Add Crime Groups',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <div className={classes.table}>
                <CrimeGroupTable
                  crimeGroups={data?.investigation?.crimeGroups}
                  setEditData={setEditCrimeGroupData}
                  onDelete={onDeleteCrimeGroup}
                  saving={saving}
                  deleteRights
                  hasNavigation
                />
              </div>
            </Card>
            <Card loading={loading}>
              <Row align="middle" gutter={8}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Activities',
                      id: 'UmEsZF',
                    })}
                  </Title>
                </Col>

                <Col>
                  <Button
                    disabled={templatesLoading}
                    key="3"
                    size="small"
                    onClick={toggleAddTodo}
                    loading={templatesLoading}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Activity',
                      id: 'VOiupa',
                    })}
                  </Button>
                </Col>
              </Row>
              <div className={classes.table}>
                <ActivityTable
                  todos={data?.investigation?.todos}
                  saving={saving || loading}
                  setViewTodoVisible={setViewTodoVisible}
                  setCompleteTodoVisible={setCompleteTodoVisible}
                />
              </div>
            </Card>
          </Col>
          <Col
            span={6}
            style={{ display: 'hidden', height: 'calc(100vh - 65px)' }}
          >
            <div className={classes.updatesContainer}>
              <IntelSection
                updates={data?.investigation?.updates}
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
                investigationId={investigationId}
                setReplyTo={setReplyTo}
                subscribed={data?.investigation?.subscribed || false}
                setOptionRowShow={setOptionRowShow}
              />
            </div>
          </Col>
        </Row>
      </TabContent>
      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Edit Update Content',
          id: '8sZeJM',
        })}
        visible={editUpdate !== null}
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
          defaultMessage: 'Suggested Offenders',
          id: '5UuihT',
        })}
        open={viewSuggestedOffenders}
        onClose={toggleViewSuggestedOffenders}
        width="900"
      >
        <SuggestedOffenders
          suggestedData={suggestedData}
          onClose={toggleViewSuggestedOffenders}
          handleAddSuggestion={handleConnectOffender}
        />
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Incidents',
          id: 'CKS/s0',
        })}
        open={viewSuggestedIncidents}
        onClose={toggleViewSuggestedIncidents}
        width="900"
      >
        <SuggestedIncidents
          suggestedData={suggestedData}
          onClose={toggleViewSuggestedIncidents}
          handleAddSuggestion={handleConnectIncident}
        />
      </Drawer>
      {/* vehicle */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Vehicles',
          id: 'fzU5Bx',
        })}
        open={viewSuggestedVehicles}
        onClose={toggleViewSuggestedVehicles}
        width="900"
      >
        <SuggestedVehicles
          suggestedData={suggestedData}
          handleAddSuggestion={handleConnectVehicle}
        />
      </Drawer>

      {/* incident */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident',
          id: 'E6VJFN',
        })}
        visible={!!editIncidentId}
        width="600"
        onClose={() => setEditIncidentId('')}
      >
        {editIncidentId ? (
          <EditIncidentFeed
            onClose={() => setEditIncidentId('null')}
            incidentId={editIncidentId}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default ViewInvestigation;
