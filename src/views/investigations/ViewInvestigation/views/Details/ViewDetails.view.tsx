import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';
import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { RefObject } from 'react';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import type { CascadeOptions } from 'types/investigations';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faBell,
  faBellSlash,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faCompass,
  faDiagramProject,
  faDownload,
  faEdit,
  faFileDownload,
  faHistory,
  faListAlt,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
  faUserClock,
} from '@fortawesome/pro-light-svg-icons';
import { faMessages } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Image,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Spin,
  Statistic,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import IntelSection from 'components/ViewPage/IntelSection';
import Toolbar from 'components/common/Toolbar/Toolbar';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import ConnectOffenderModal from 'components/investigations/ConnectOffenderModal';
import SuggestedIncidents from 'components/investigations/SuggestedIncidents';
import SuggestedOffenders from 'components/investigations/SuggestedOffenders';
import SuggestedVehicles from 'components/investigations/SuggestedVehicles';
import { IncidentMapContainer } from 'components/map/IncidentMap';
import {
  OffenderGridContainer,
  OffenderSortSelect,
  useOffenderSort,
} from 'components/offenders/OffenderGrid';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import { IncidentTableContainer } from 'components/tables/IncidentTable';
import VehicleGrid, {
  VehicleSortSelect,
  useVehicleSort,
} from 'components/vehicles/VehicleGrid';
import dayjs from 'dayjs';
import { InvestigationStatus } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useOutletContext } from 'react-router';
import GetInvestigationStatusValues from 'types/enums/investigation-status';

import UpdateBar from '../../../../../components/MessageInput/UpdateBar';
import TabContent from '../../../../../components/TabContent';
import useStyles from './ViewDetails.styles';

const { Paragraph, Title } = Typography;
const { confirm } = Modal;

interface Props {
  _setCompleteTodoVisible: (value: null | string) => void;
  _setEditOffenderData: (value: OffenderData | null) => void;

  _setEditVehicleData: (value: VehicleData | null) => void;
  _templatesLoading: boolean;
  _toggleAddTodo: () => void;
  componentRef: RefObject<HTMLDivElement>;
  confirmConnectOffender: (cascadeOptions: CascadeOptions) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  data: ViewInvestigationQuery | undefined;
  demId: null | string | undefined;
  editIncidentId: string;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  handleConnectIncident: (id: string) => void;
  handleConnectOffender: (id: string) => void;
  handleConnectVehicle: (id: string) => void;
  handleEditUpdate: () => void;
  handlePrint: () => void;
  investigationId: string;
  isPrinting: boolean;
  loadMore: boolean;
  loading: boolean;
  onCloseInvestigation: () => void;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onDeleteIncident: (id: string) => void;
  onDeleteInvestigation: () => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onReopenInvestigation: () => void;
  optionRowShow: boolean;
  pendingOffenderConnection: {
    id: string;
    name: string;
    reference?: number;
  } | null;
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
  setPendingOffenderConnection: (
    value: { id: string; name: string; reference?: number } | null
  ) => void;
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
  toggleAddDemDocument: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleEditInvestigation: () => void;
  toggleSubscribe: () => void;
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

const isImage = (url: string) => {
  const ext = url.split('.').pop();
  return ext === 'jpg' || ext === 'png' || ext === 'jpeg';
};
const ViewInvestigation = ({
  _setCompleteTodoVisible,
  _setEditOffenderData,
  _setEditVehicleData,
  _templatesLoading,
  _toggleAddTodo,
  componentRef,
  confirmConnectOffender,
  confirmDeleteUpdate,
  data,
  demId,
  editIncidentId,
  editRights,
  editUpdate,
  editUpdateInput,
  handleConnectIncident,
  handleConnectOffender,
  handleConnectVehicle,
  handleEditUpdate,
  handlePrint,
  investigationId,
  isPrinting,
  loadMore,
  loading,
  onCloseInvestigation,
  onDeleteCrimeGroup,
  onDeleteDocument,
  onDeleteIncident,
  onDeleteInvestigation,
  onDeleteOffender,
  onDeleteVehicle,
  onReopenInvestigation,
  optionRowShow,
  pendingOffenderConnection,
  replyTo,
  saving,
  scrolledToTop,
  setEditCrimeGroupData,
  setEditIncidentId,
  setEditUpdate,
  setEditUpdateInput,
  setOptionRowShow,
  setPendingOffenderConnection,
  setReplyTo,
  setViewTodoVisible,
  suggestedData,
  toggleAddCrimeGroup,
  toggleAddDemDocument,
  toggleAddDocument,
  toggleAddExistingCrimeGroup,
  toggleAddExistingIncident,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddOffender,
  toggleAddVehicle,
  toggleEditInvestigation,
  toggleSubscribe,
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
  const { setSortBy: setVehicleSortBy, sortBy: vehicleSortBy } =
    useVehicleSort('registration');
  const { setSortBy: setOffenderSortBy, sortBy: offenderSortBy } =
    useOffenderSort('lastSeen');
  const [sidebarSection, setSidebarSection] = useState<
    'activities' | 'history' | 'intel' | 'suggestions'
  >('intel');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Get outlet context for sidebar state management
  const outletContext = useOutletContext<{
    rightSidebarOpen: boolean;
    setRightSidebarOpen: (open: boolean) => void;
  }>();

  // Use outlet context if available, otherwise fall back to local state
  const rightSidebarOpen = outletContext?.rightSidebarOpen ?? sidebarExpanded;
  const setRightSidebarOpen =
    outletContext?.setRightSidebarOpen ?? setSidebarExpanded;

  return (
    <>
      <TabContent>
        <Row className={classes.content} wrap={false}>
          <Col className={classes.detailsContainer} flex="1">
            <div ref={componentRef} style={{ padding: '0 24px' }}>
              <div style={{ padding: '20px 0' }}>
                <Row align="middle" gutter={16}>
                  <Col flex={1}>
                    <Title
                      className={classes.investigationTitle}
                      level={3}
                      style={{ marginBottom: 8 }}
                    >
                      {data?.investigation?.name}
                      <Tag
                        color={getTextStatus(
                          data?.investigation?.status ||
                            InvestigationStatus.Open
                        )}
                        style={{ marginLeft: 12, verticalAlign: 'middle' }}
                      >
                        {
                          GetInvestigationStatusValues[
                            data?.investigation?.status ||
                              InvestigationStatus.Open
                          ]
                        }
                      </Tag>
                    </Title>
                    {data?.investigation?.description && (
                      <Paragraph
                        className={classes.investigationDescription}
                        style={{ marginBottom: 0 }}
                      >
                        {data.investigation.description}
                      </Paragraph>
                    )}
                  </Col>
                  <Col>
                    <Toolbar
                      buttons={[
                        {
                          children: (
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Edit investigation details',
                              })}
                            >
                              <span
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                }}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </span>
                            </Tooltip>
                          ),
                          disabled: saving,
                          key: 'edit',
                          onClick: toggleEditInvestigation,
                          style: { padding: '4px 12px' },
                        },
                        {
                          children: (
                            <Tooltip
                              title={
                                data?.investigation?.subscribed
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
                              <span
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    data?.investigation?.subscribed
                                      ? faBellSlash
                                      : faBell
                                  }
                                />
                              </span>
                            </Tooltip>
                          ),
                          key: 'subscribe',
                          onClick: toggleSubscribe,
                          style: { padding: '4px 12px' },
                        },
                        {
                          children: (
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Download investigation as PDF',
                              })}
                            >
                              <span
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                }}
                              >
                                {isPrinting ? (
                                  <Spin size="small" />
                                ) : (
                                  <FontAwesomeIcon icon={faFileDownload} />
                                )}
                              </span>
                            </Tooltip>
                          ),
                          disabled: isPrinting,
                          key: 'download',
                          onClick: handlePrint,
                          style: { padding: '4px 12px' },
                        },
                        {
                          children: (
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Flow Map',
                              })}
                            >
                              <span
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                }}
                              >
                                <FontAwesomeIcon icon={faDiagramProject} />
                              </span>
                            </Tooltip>
                          ),
                          key: 'flow',
                          onClick: () =>
                            navigate(
                              `/app/investigations/view/${data?.investigation?.id}/flow`
                            ),
                          style: { padding: '4px 12px' },
                        },
                        {
                          children: (
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Delete investigation',
                              })}
                            >
                              <span
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </span>
                            </Tooltip>
                          ),
                          key: 'delete',
                          onClick: () => {
                            confirm({
                              content: intl.formatMessage({
                                defaultMessage: 'This action cannot be undone.',
                              }),
                              onOk() {
                                onDeleteInvestigation();
                              },
                              title: intl.formatMessage({
                                defaultMessage:
                                  'Do you want to delete the investigation?',
                              }),
                            });
                          },
                          style: { padding: '4px 12px' },
                        },
                        ...(data?.investigation?.status ===
                        InvestigationStatus.Open
                          ? [
                              {
                                children: (
                                  <Tooltip
                                    title={intl.formatMessage({
                                      defaultMessage: 'Close Investigation',
                                    })}
                                  >
                                    <span
                                      style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        height: '100%',
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                  </Tooltip>
                                ),
                                key: 'close',
                                onClick: () => {
                                  confirm({
                                    onOk() {
                                      onCloseInvestigation();
                                    },
                                    title: intl.formatMessage({
                                      defaultMessage:
                                        'Do you want to close the investigation?',
                                    }),
                                  });
                                },
                                style: { padding: '4px 12px' },
                              },
                            ]
                          : []),
                        ...(data?.investigation?.status ===
                        InvestigationStatus.Closed
                          ? [
                              {
                                children: (
                                  <Tooltip
                                    title={intl.formatMessage({
                                      defaultMessage: 'Reopen Investigation',
                                    })}
                                  >
                                    <span
                                      style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        height: '100%',
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                  </Tooltip>
                                ),
                                key: 'reopen',
                                onClick: () => {
                                  confirm({
                                    onOk() {
                                      onReopenInvestigation();
                                    },
                                    title: intl.formatMessage({
                                      defaultMessage:
                                        'Do you want to reopen the investigation?',
                                    }),
                                  });
                                },
                                style: { padding: '4px 12px' },
                              },
                            ]
                          : []),
                      ]}
                    />
                  </Col>
                </Row>
              </div>

              <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                <Col lg={4} md={8} sm={12} xs={24}>
                  <Card className={classes.statsCard} loading={loading}>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Incidents',
                      })}
                      value={data?.investigation?.totalIncidents || 0}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card className={classes.statsCard} loading={loading}>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Offenders',
                      })}
                      value={data?.investigation?.totalOffenders || 0}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card className={classes.statsCard} loading={loading}>
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
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card className={classes.statsCard} loading={loading}>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Value Recovered',
                      })}
                      value={intl.formatNumber(
                        data?.investigation?.totalRecoveredValue || 0,
                        {
                          currency,
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card className={classes.statsCard} loading={loading}>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                      })}
                      value={`${
                        data?.investigation?.totalTheftSuccess?.toFixed(0) || 0
                      }%`}
                    />
                  </Card>
                </Col>
              </Row>

              <Card loading={loading} style={{ marginBottom: 20 }}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Offenders ({offenders})',
                        },
                        {
                          offenders: data?.investigation?.totalOffenders || 0,
                        }
                      )}
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
                          {intl.formatMessage(
                            {
                              defaultMessage: '{count} Suggested Offenders',
                            },
                            {
                              count:
                                suggestedData.investigation?.suggestedOffenders
                                  .length || 0,
                            }
                          )}
                        </Button>
                      </Col>
                    )}
                  <Col>
                    <OffenderSortSelect
                      onChange={setOffenderSortBy}
                      value={offenderSortBy}
                    />
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

                <OffenderGridContainer
                  canDisconnect={editRights}
                  defaultSortBy="lastSeen"
                  disconnectLabel={intl.formatMessage({
                    defaultMessage: 'Disconnect from Investigation',
                  })}
                  investigationId={investigationId}
                  onDisconnectOffender={onDeleteOffender}
                  pageSize={12}
                  sortBy={offenderSortBy}
                />
              </Card>

              <Card loading={loading} style={{ marginBottom: 20 }}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
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
                          {intl.formatMessage(
                            {
                              defaultMessage: '{count} Suggested Incidents',
                            },
                            {
                              count:
                                suggestedData.investigation.suggestedIncidents
                                  .length || 0,
                            }
                          )}
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
                  <IncidentTableContainer
                    deleteRights={editRights}
                    hasNavigation
                    investigationId={investigationId}
                    onDelete={onDeleteIncident}
                    setEditData={setEditIncidentId}
                    showFilters={true}
                  />
                </div>
              </Card>
              <IncidentMapContainer
                height={500}
                investigationId={investigationId}
                showEmptyState={false}
                width="100%"
              />
              <Card loading={loading}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
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
                    <VehicleSortSelect
                      onChange={setVehicleSortBy}
                      value={vehicleSortBy}
                    />
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
                        size="small"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Vehicles',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.investigation?.vehicles &&
                data.investigation.vehicles.length > 0 &&
                !loading ? (
                  <VehicleGrid
                    canDisconnect={editRights}
                    onDisconnectVehicle={onDeleteVehicle}
                    sortBy={vehicleSortBy}
                    vehicles={data.investigation.vehicles}
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No vehicles for this investigation',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
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

              {/* Evidence Card */}
              <Card loading={loading} style={{ marginBottom: 20 }}>
                <Row align="middle" style={{ marginBottom: 20 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Evidence',
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
                                defaultMessage: 'Add Evidence',
                              }),
                              onClick: toggleAddDocument,
                            },
                            {
                              disabled: !demId,
                              icon: (
                                <FontAwesomeIcon
                                  icon={faMagnifyingGlass}
                                  style={{ marginRight: 5 }}
                                />
                              ),
                              key: '2',
                              label: intl.formatMessage({
                                defaultMessage: 'Import DEM Evidence',
                              }),
                              onClick: toggleAddDemDocument,
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
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Documents',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.investigation?.documents &&
                data.investigation.documents.length > 0 ? (
                  <Table<{
                    fileUrl: string;
                    key: string;
                    name: string;
                    tags: { text: string; value: string }[];
                    thumbnail?: string;
                  }>
                    columns={[
                      {
                        dataIndex: 'thumbnail',
                        key: 'thumbnail',
                        render: (thumbnail: null | string | undefined) =>
                          thumbnail ? (
                            <Image
                              alt="thumbnail"
                              src={thumbnail}
                              width={120}
                            />
                          ) : (
                            <Skeleton.Image style={{ width: 120 }} />
                          ),
                        title: intl.formatMessage({
                          defaultMessage: 'Thumbnail',
                        }),
                        width: 140,
                      },
                      {
                        dataIndex: 'name',
                        key: 'name',
                        title: intl.formatMessage({
                          defaultMessage: 'Name',
                        }),
                      },
                      {
                        dataIndex: 'tags',
                        filters: [
                          ...new Set(
                            data.investigation.documents?.flatMap((doc) =>
                              doc.tags.map((tag) => tag.name)
                            ) || []
                          ),
                        ].map((tag) => ({
                          text: tag,
                          value: tag,
                        })),
                        key: 'tags',
                        onFilter: (
                          value: boolean | number | string,
                          record: {
                            fileUrl: string;
                            key: string;
                            name: string;
                            tags: { text: string; value: string }[];
                            thumbnail?: string;
                          }
                        ) => record.tags.some((tag) => tag.text === value),
                        render: (origTags: { text: string; value: string }[]) =>
                          origTags.map((tag) => tag.text).join(', '),
                        title: intl.formatMessage({
                          defaultMessage: 'Tags',
                        }),
                      },
                      {
                        dataIndex: 'fileUrl',
                        key: 'actions',
                        render: (
                          fileUrl: string,
                          item: { key: string; name: string }
                        ) => (
                          <Row gutter={8}>
                            <Col>
                              <Button
                                onClick={() => {
                                  void (async () => {
                                    try {
                                      // Fetch the file from Azure Blob Storage
                                      const response = await fetch(fileUrl);
                                      const blob = await response.blob();

                                      // Create a temporary URL for the blob
                                      const blobUrl =
                                        window.URL.createObjectURL(blob);

                                      // Create a temporary anchor element and trigger download
                                      const link = document.createElement('a');
                                      link.href = blobUrl;
                                      link.download = item.name || 'download';
                                      document.body.append(link);
                                      link.click();

                                      // Clean up
                                      link.remove();
                                      window.URL.revokeObjectURL(blobUrl);
                                    } catch (error) {
                                      console.error('Download failed:', error);
                                      // Fallback to opening in new tab
                                      window.open(fileUrl, '_blank');
                                    }
                                  })();
                                }}
                                size="small"
                              >
                                <FontAwesomeIcon icon={faDownload} />
                              </Button>
                            </Col>
                            <Col>
                              <Popconfirm
                                onConfirm={() => onDeleteDocument(item.key)}
                                overlayInnerStyle={{ padding: 10 }}
                                title={intl.formatMessage({
                                  defaultMessage: 'Are you sure?',
                                })}
                              >
                                <Button size="small">
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </Popconfirm>
                            </Col>
                          </Row>
                        ),
                        title: '',
                        width: 120,
                      },
                    ]}
                    dataSource={
                      data.investigation.documents?.map((document) => ({
                        fileUrl: document.url,
                        key: document.id,
                        name: document.name,
                        tags: document.tags.map((tag) => ({
                          text: tag.name,
                          value: tag.name,
                        })),
                        thumbnail:
                          document.thumbnailUrl ||
                          (isImage(document.url) ? document.url : undefined),
                      })) || []
                    }
                    size="small"
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No evidence found',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            </div>
          </Col>
          {/* Right Sidebar */}
          <Col className={classes.rightSidebar}>
            <div className={classes.sidebar}>
              {/* Toggle Button */}
              <div
                className={classes.sidebarToggle}
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              >
                <FontAwesomeIcon
                  icon={rightSidebarOpen ? faChevronRight : faChevronLeft}
                />
              </div>

              {/* Collapsed Menu */}
              <div className={classes.sidebarMenu}>
                <div
                  className={`${classes.sidebarMenuItem} ${rightSidebarOpen && sidebarSection === 'intel' ? classes.sidebarMenuItemActive : ''}`}
                  onClick={() => {
                    setRightSidebarOpen(true);
                    setSidebarSection('intel');
                  }}
                >
                  <FontAwesomeIcon icon={faMessages} />
                  {data?.investigation?.updates &&
                    data.investigation.updates.length > 0 && (
                      <span className={classes.sidebarMenuBadge}>
                        {data.investigation.updates.length}
                      </span>
                    )}
                  <Tooltip
                    placement="left"
                    title={intl.formatMessage({
                      defaultMessage: 'Intel Updates',
                    })}
                  >
                    <span className={classes.sidebarMenuLabel}>
                      {intl.formatMessage({ defaultMessage: 'Intel' })}
                    </span>
                  </Tooltip>
                </div>

                <div
                  className={`${classes.sidebarMenuItem} ${rightSidebarOpen && sidebarSection === 'suggestions' ? classes.sidebarMenuItemActive : ''}`}
                  onClick={() => {
                    setRightSidebarOpen(true);
                    setSidebarSection('suggestions');
                  }}
                >
                  <FontAwesomeIcon icon={faCompass} />
                  {((suggestedData?.investigation?.suggestedOffenders &&
                    suggestedData.investigation.suggestedOffenders.length >
                      0) ||
                    (suggestedData?.investigation?.suggestedVehicles &&
                      suggestedData.investigation.suggestedVehicles.length >
                        0) ||
                    (suggestedData?.investigation?.suggestedIncidents &&
                      suggestedData.investigation.suggestedIncidents.length >
                        0)) && (
                    <span className={classes.sidebarMenuBadge}>
                      {(suggestedData?.investigation?.suggestedOffenders
                        ?.length || 0) +
                        (suggestedData?.investigation?.suggestedVehicles
                          ?.length || 0) +
                        (suggestedData?.investigation?.suggestedIncidents
                          ?.length || 0)}
                    </span>
                  )}
                  <Tooltip
                    placement="left"
                    title={intl.formatMessage({
                      defaultMessage: 'Suggestions',
                    })}
                  >
                    <span className={classes.sidebarMenuLabel}>
                      {intl.formatMessage({ defaultMessage: 'Compass' })}
                    </span>
                  </Tooltip>
                </div>

                <div
                  className={`${classes.sidebarMenuItem} ${rightSidebarOpen && sidebarSection === 'history' ? classes.sidebarMenuItemActive : ''}`}
                  onClick={() => {
                    setRightSidebarOpen(true);
                    setSidebarSection('history');
                  }}
                >
                  <FontAwesomeIcon icon={faHistory} />
                  <Tooltip
                    placement="left"
                    title={intl.formatMessage({
                      defaultMessage: 'Activity History',
                    })}
                  >
                    <span className={classes.sidebarMenuLabel}>
                      {intl.formatMessage({ defaultMessage: 'History' })}
                    </span>
                  </Tooltip>
                </div>

                <div
                  className={`${classes.sidebarMenuItem} ${rightSidebarOpen && sidebarSection === 'activities' ? classes.sidebarMenuItemActive : ''}`}
                  onClick={() => {
                    setRightSidebarOpen(true);
                    setSidebarSection('activities');
                  }}
                >
                  <FontAwesomeIcon icon={faListAlt} />
                  {data?.investigation?.todos &&
                    data.investigation.todos.length > 0 && (
                      <span className={classes.sidebarMenuBadge}>
                        {data.investigation.todos.length}
                      </span>
                    )}
                  <Tooltip
                    placement="left"
                    title={intl.formatMessage({
                      defaultMessage: 'Activities',
                    })}
                  >
                    <span className={classes.sidebarMenuLabel}>
                      {intl.formatMessage({ defaultMessage: 'Activities' })}
                    </span>
                  </Tooltip>
                </div>

                <div className={classes.sidebarMenuDivider} />

                <div
                  className={classes.sidebarMenuItem}
                  onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                >
                  <FontAwesomeIcon
                    icon={rightSidebarOpen ? faChevronRight : faChevronLeft}
                  />
                  <Tooltip
                    placement="left"
                    title={
                      rightSidebarOpen
                        ? intl.formatMessage({ defaultMessage: 'Collapse' })
                        : intl.formatMessage({ defaultMessage: 'Expand' })
                    }
                  >
                    <span className={classes.sidebarMenuLabel}>
                      {sidebarExpanded
                        ? intl.formatMessage({ defaultMessage: 'Collapse' })
                        : intl.formatMessage({ defaultMessage: 'Expand' })}
                    </span>
                  </Tooltip>
                </div>
              </div>

              {/* Expanded Content */}
              {rightSidebarOpen && (
                <div className={classes.sidebarContent}>
                  {sidebarSection === 'intel' && (
                    <>
                      <div
                        style={{
                          flex: 1,
                          height: '100%',
                          overflow: 'auto',
                          padding: '16px',
                        }}
                      >
                        <IntelSection
                          confirmDeleteUpdate={confirmDeleteUpdate}
                          editRights={editRights}
                          loadMore={loadMore}
                          optionRowShow={optionRowShow}
                          saving={saving}
                          scrolledToTop={scrolledToTop}
                          setEditUpdate={setEditUpdate}
                          setReplyTo={setReplyTo}
                          updates={data?.investigation?.updates}
                          userId={userId}
                        />
                      </div>
                      <div className={classes.sidebarFooter}>
                        <UpdateBar
                          investigationId={investigationId}
                          replyTo={replyTo}
                          setOptionRowShow={setOptionRowShow}
                          setReplyTo={setReplyTo}
                          subscribed={data?.investigation?.subscribed || false}
                        />
                      </div>
                    </>
                  )}

                  {sidebarSection === 'suggestions' && (
                    <div
                      style={{
                        height: '100%',
                        overflow: 'auto',
                        padding: '16px',
                      }}
                    >
                      <Typography.Title level={5} style={{ marginBottom: 16 }}>
                        {intl.formatMessage({ defaultMessage: 'Suggestions' })}
                      </Typography.Title>

                      {suggestedData?.investigation?.suggestedOffenders &&
                        suggestedData.investigation.suggestedOffenders.length >
                          0 && (
                          <div style={{ marginBottom: 24 }}>
                            <Row
                              align="middle"
                              gutter={8}
                              style={{ marginBottom: 12 }}
                            >
                              <Col flex="1">
                                <Typography.Text strong>
                                  {intl.formatMessage({
                                    defaultMessage: 'Suggested Offenders',
                                  })}
                                </Typography.Text>
                              </Col>
                              <Col>
                                <Button
                                  onClick={toggleViewSuggestedOffenders}
                                  size="small"
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'View All',
                                  })}
                                </Button>
                              </Col>
                            </Row>
                            <Typography.Text type="secondary">
                              {intl.formatMessage(
                                {
                                  defaultMessage:
                                    '{count} offenders found with similar characteristics',
                                },
                                {
                                  count:
                                    suggestedData.investigation
                                      .suggestedOffenders.length,
                                }
                              )}
                            </Typography.Text>
                          </div>
                        )}

                      {suggestedData?.investigation?.suggestedVehicles &&
                        suggestedData.investigation.suggestedVehicles.length >
                          0 && (
                          <div style={{ marginBottom: 24 }}>
                            <Row
                              align="middle"
                              gutter={8}
                              style={{ marginBottom: 12 }}
                            >
                              <Col flex="1">
                                <Typography.Text strong>
                                  {intl.formatMessage({
                                    defaultMessage: 'Suggested Vehicles',
                                  })}
                                </Typography.Text>
                              </Col>
                              <Col>
                                <Button
                                  onClick={toggleViewSuggestedVehicles}
                                  size="small"
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'View All',
                                  })}
                                </Button>
                              </Col>
                            </Row>
                            <Typography.Text type="secondary">
                              {intl.formatMessage(
                                {
                                  defaultMessage:
                                    '{count} vehicles found with similar details',
                                },
                                {
                                  count:
                                    suggestedData.investigation
                                      .suggestedVehicles.length,
                                }
                              )}
                            </Typography.Text>
                          </div>
                        )}

                      {suggestedData?.investigation?.suggestedIncidents &&
                        suggestedData.investigation.suggestedIncidents.length >
                          0 && (
                          <div style={{ marginBottom: 24 }}>
                            <Row
                              align="middle"
                              gutter={8}
                              style={{ marginBottom: 12 }}
                            >
                              <Col flex="1">
                                <Typography.Text strong>
                                  {intl.formatMessage({
                                    defaultMessage: 'Suggested Incidents',
                                  })}
                                </Typography.Text>
                              </Col>
                              <Col>
                                <Button
                                  onClick={toggleViewSuggestedIncidents}
                                  size="small"
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'View All',
                                  })}
                                </Button>
                              </Col>
                            </Row>
                            <Typography.Text type="secondary">
                              {intl.formatMessage(
                                {
                                  defaultMessage:
                                    '{count} related incidents found',
                                },
                                {
                                  count:
                                    suggestedData.investigation
                                      .suggestedIncidents.length,
                                }
                              )}
                            </Typography.Text>
                          </div>
                        )}

                      {(!suggestedData ||
                        (!suggestedData.investigation?.suggestedOffenders
                          ?.length &&
                          !suggestedData.investigation?.suggestedVehicles
                            ?.length &&
                          !suggestedData.investigation?.suggestedIncidents
                            ?.length)) && (
                        <Empty
                          description={intl.formatMessage({
                            defaultMessage: 'No suggestions available',
                          })}
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  )}

                  {sidebarSection === 'history' && (
                    <div style={{ padding: '16px' }}>
                      <Empty
                        description={intl.formatMessage({
                          defaultMessage: 'Activity history coming soon',
                        })}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    </div>
                  )}

                  {sidebarSection === 'activities' && (
                    <div
                      style={{
                        height: '100%',
                        overflow: 'auto',
                        padding: '16px',
                      }}
                    >
                      {data?.investigation?.todos &&
                      data.investigation.todos.length > 0 ? (
                        <div className={classes.activitiesList}>
                          {data.investigation.todos.map((todo) => (
                            <Card
                              className={classes.activityCard}
                              key={todo.id}
                              onClick={() => setViewTodoVisible(todo.id)}
                              size="small"
                              style={{ cursor: 'pointer' }}
                            >
                              <Row gutter={[12, 12]}>
                                <Col span={24}>
                                  <Row align="middle" gutter={8}>
                                    <Col flex="1">
                                      <div>
                                        <Typography.Text
                                          className={classes.activityName}
                                        >
                                          {todo.name}
                                        </Typography.Text>
                                        {todo.reference && (
                                          <Typography.Text
                                            className={
                                              classes.activityReference
                                            }
                                          >
                                            {intl.formatMessage(
                                              {
                                                defaultMessage: '#{reference}',
                                              },
                                              { reference: todo.reference }
                                            )}
                                          </Typography.Text>
                                        )}
                                      </div>
                                    </Col>
                                    <Col>
                                      {todo.completed ? (
                                        <Tag
                                          className={classes.activityStatus}
                                          color="success"
                                        >
                                          {intl.formatMessage({
                                            defaultMessage: 'Completed',
                                          })}
                                        </Tag>
                                      ) : todo.dueDate &&
                                        dayjs(todo.dueDate).isBefore(
                                          dayjs()
                                        ) ? (
                                        <Tag
                                          className={classes.activityStatus}
                                          color="error"
                                        >
                                          {intl.formatMessage({
                                            defaultMessage: 'Overdue',
                                          })}
                                        </Tag>
                                      ) : (
                                        <Tag
                                          className={classes.activityStatus}
                                          color="processing"
                                        >
                                          {intl.formatMessage({
                                            defaultMessage: 'Pending',
                                          })}
                                        </Tag>
                                      )}
                                    </Col>
                                  </Row>
                                </Col>

                                {todo.assignedUsers &&
                                  todo.assignedUsers.length > 0 && (
                                    <Col span={24}>
                                      <div
                                        className={classes.activityAssignees}
                                      >
                                        <Typography.Text
                                          className={classes.activityLabel}
                                        >
                                          {intl.formatMessage({
                                            defaultMessage: 'Assigned to:',
                                          })}
                                        </Typography.Text>
                                        <Avatar.Group
                                          maxCount={3}
                                          maxStyle={{
                                            backgroundColor: '#fde3cf',
                                            color: '#f56a00',
                                            cursor: 'pointer',
                                          }}
                                          size="small"
                                        >
                                          {todo.assignedUsers.map((user) => (
                                            <Tooltip
                                              key={user.id}
                                              title={user.fullName}
                                            >
                                              <Avatar
                                                className={
                                                  classes.activityAvatar
                                                }
                                              >
                                                {user.fullName
                                                  .split(' ')
                                                  .map((n) => n[0])
                                                  .join('')
                                                  .toUpperCase()}
                                              </Avatar>
                                            </Tooltip>
                                          ))}
                                        </Avatar.Group>
                                      </div>
                                    </Col>
                                  )}

                                <Col span={24}>
                                  <div className={classes.activityDetails}>
                                    <Row gutter={[16, 8]}>
                                      {todo.createdAt && (
                                        <Col>
                                          <div
                                            className={
                                              classes.activityDetailItem
                                            }
                                          >
                                            <FontAwesomeIcon
                                              className={
                                                classes.activityDetailIcon
                                              }
                                              icon={faPlus}
                                            />
                                            <div>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailLabel
                                                }
                                              >
                                                {intl.formatMessage({
                                                  defaultMessage: 'Created',
                                                })}
                                              </Typography.Text>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailValue
                                                }
                                              >
                                                {dayjs(todo.createdAt).format(
                                                  'MMM D, YYYY'
                                                )}
                                              </Typography.Text>
                                            </div>
                                          </div>
                                        </Col>
                                      )}

                                      {todo.dueDate && (
                                        <Col>
                                          <div
                                            className={
                                              classes.activityDetailItem
                                            }
                                          >
                                            <FontAwesomeIcon
                                              className={
                                                classes.activityDetailIcon
                                              }
                                              icon={faUserClock}
                                              style={{
                                                color:
                                                  todo.dueDate &&
                                                  dayjs(todo.dueDate).isBefore(
                                                    dayjs()
                                                  ) &&
                                                  !todo.completed
                                                    ? '#ff4d4f'
                                                    : undefined,
                                              }}
                                            />
                                            <div>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailLabel
                                                }
                                              >
                                                {intl.formatMessage({
                                                  defaultMessage: 'Due Date',
                                                })}
                                              </Typography.Text>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailValue
                                                }
                                              >
                                                {dayjs(todo.dueDate).format(
                                                  'MMM D, YYYY'
                                                )}
                                              </Typography.Text>
                                            </div>
                                          </div>
                                        </Col>
                                      )}

                                      {todo.completed && todo.completedDate && (
                                        <Col>
                                          <div
                                            className={
                                              classes.activityDetailItem
                                            }
                                          >
                                            <FontAwesomeIcon
                                              className={
                                                classes.activityDetailIcon
                                              }
                                              icon={faEdit}
                                              style={{ color: '#52c41a' }}
                                            />
                                            <div>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailLabel
                                                }
                                              >
                                                {intl.formatMessage({
                                                  defaultMessage: 'Completed',
                                                })}
                                              </Typography.Text>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailValue
                                                }
                                              >
                                                {dayjs(
                                                  todo.completedDate
                                                ).format('MMM D, YYYY')}
                                              </Typography.Text>
                                            </div>
                                          </div>
                                        </Col>
                                      )}

                                      {todo.completed && todo.createdBy && (
                                        <Col>
                                          <div
                                            className={
                                              classes.activityDetailItem
                                            }
                                          >
                                            <Avatar
                                              className={
                                                classes.activityDetailAvatar
                                              }
                                              size={20}
                                            >
                                              {todo.createdBy.fullName
                                                ?.split(' ')
                                                ?.map((n: string) => n[0])
                                                ?.join('')
                                                ?.toUpperCase() || ''}
                                            </Avatar>
                                            <div>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailLabel
                                                }
                                              >
                                                {intl.formatMessage({
                                                  defaultMessage:
                                                    'Completed By',
                                                })}
                                              </Typography.Text>
                                              <Typography.Text
                                                className={
                                                  classes.activityDetailValue
                                                }
                                              >
                                                {todo.createdBy?.fullName || ''}
                                              </Typography.Text>
                                            </div>
                                          </div>
                                        </Col>
                                      )}
                                    </Row>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Empty
                          description={intl.formatMessage({
                            defaultMessage: 'No activities found',
                          })}
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
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

      {/* Connect Offender Modal */}
      <ConnectOffenderModal
        loading={false}
        offender={pendingOffenderConnection}
        onCancel={() => setPendingOffenderConnection(null)}
        onConfirm={confirmConnectOffender}
        visible={!!pendingOffenderConnection}
      />
    </>
  );
};

export default ViewInvestigation;
