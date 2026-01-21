import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';
import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SuggestedCrimeGroupMembersQuery } from 'graphql/crime-groups/queries/__generated__/suggested-memebrs.generated';
import type { CrimeGroupQuery } from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { VehicleData } from 'types/DataType';

import AddAlias from '#/components/form-components/CrimeGroupSelect/crimeGroup/Alias';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import AddExistingOffender from '#/components/form-components/offender/AddExistingOffender';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import {
  faBell,
  faBellSlash,
  faChevronLeft,
  faChevronRight,
  faCompass,
  faEdit,
  faFileAlt,
  faFileDownload,
  faHistory,
  faListAlt,
  faMagnifyingGlass,
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
  Input,
  Menu,
  Modal,
  Row,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import UpdateBar from 'components/MessageInput/UpdateBar';
import IntelSection from 'components/ViewPage/IntelSection';
import SuggestedMembers from 'components/crimeGroups/SuggestedMembers/SuggestedMembers.view';
import CrimeGroupSideList from 'components/crimeGroups/sidelist';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import AddNewOffenderSimple from 'components/form-components/offender/AddNewOffenderSimple';
import { IncidentMapContainer } from 'components/map/IncidentMap';
import EvidenceTable from 'components/tables/EvidenceTable';
import { IncidentTableContainer } from 'components/tables/IncidentTable';
import InvestigationTable from 'components/tables/InvestigationTable';
import VehicleGrid, {
  VehicleSortSelect,
  useVehicleSort,
} from 'components/vehicles/VehicleGrid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { calcAge } from 'utils';
import {
  getOffenderAge,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

dayjs.extend(relativeTime);
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';

import { CrimeGroupFlowContainer as CrimeGroupFlow } from '../../../../components/crime-groups/CrimeGroupFlow';
import { OffenderGridContainer } from '../../../../components/offenders/OffenderGrid';
import './ViewCrimeGroup.print.v2.styles.css';
import useStyles from './ViewCrimeGroup.styles';

const { Title } = Typography;
const { confirm } = Modal;

interface Props {
  addAlias: boolean;
  addDocument: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addInvestigation: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  confirmDeleteUpdate: (updateId: string) => void;
  crimeGroupId: string;
  data: CrimeGroupQuery | undefined;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  handleAddSuggestion: (id: string) => void;
  handleEditUpdate: () => void;
  loadMore: boolean;
  loading: boolean;
  offenderIds: string[];
  onCompletedAddOffender: () => void;
  onDeleteCrimeGroup: () => void;
  onDisconnectOffender?: (offenderId: string) => void;
  onDisconnectVehicle?: (vehicleId: string) => void;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
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
  submitNewVehicle: (value: VehicleData) => void;
  submitOffender: (value: OffenderSearchDetailsFragment[]) => void;
  submitVehicle: (value: string) => void;
  suggestedData: SuggestedCrimeGroupMembersQuery | undefined;
  toggleAddAlias: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddInvestigation: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  toggleSubscribe: () => void;
  toggleViewSuggested: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  userId: string;
  vehicleIds: string[];
  viewSuggestedOpen: boolean;
}

import ViewTodo from 'components/form-components/Todos/ViewTodo/Todo.container';

const ViewCrimeGroup = ({
  addAlias,
  addDocument,
  addExistingOffender,
  addExistingVehicle,
  addInvestigation,
  addNewVehicle,
  addOffender,
  confirmDeleteUpdate,
  crimeGroupId,
  data,
  editRights,
  editUpdate,
  editUpdateInput,
  handleAddSuggestion,
  handleEditUpdate,
  loadMore,
  loading,
  offenderIds,
  onCompletedAddOffender,
  onDeleteCrimeGroup,
  onDisconnectOffender,
  onDisconnectVehicle,
  optionRowShow,
  replyTo,
  saving,
  scrolledToTop,
  setEditUpdate,
  setEditUpdateInput,
  setOptionRowShow,
  setReplyTo,
  submitNewVehicle,
  submitOffender,
  submitVehicle,
  suggestedData,
  toggleAddAlias,
  toggleAddDocument,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddInvestigation,
  toggleAddNewVehicle,
  toggleAddOffender,
  toggleSubscribe,
  toggleViewSuggested,
  updateAddOffenderList,
  updateDeleteDocument,
  updateDocumentList,
  updateInvestigationList,
  userId,
  vehicleIds,
  viewSuggestedOpen,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const currency = useAtomValue(currencyAtom);
  const { setSortBy: setVehicleSortBy, sortBy: vehicleSortBy } =
    useVehicleSort('registration');

  const [sidebarSection, setSidebarSection] = useState<
    'activities' | 'history' | 'intel' | 'suggestions'
  >('intel');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarInitialized, setSidebarInitialized] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<null | string>(
    null
  );
  const [selectedActivity, setSelectedActivity] = useState<null | string>(null);
  const [_viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Track viewport width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect print mode
  useEffect(() => {
    const handleBeforePrint = () => {
      setIsPrintMode(true);
      // Add print mode class to body for CSS targeting
      document.body.classList.add('print-mode');
    };

    const handleAfterPrint = () => {
      setIsPrintMode(false);
      // Remove print mode class
      document.body.classList.remove('print-mode');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Also check media query
    const mediaQueryList = window.matchMedia('print');
    if (mediaQueryList.matches) {
      setIsPrintMode(true);
      document.body.classList.add('print-mode');
    }

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('print-mode');
    };
  }, []);

  // Force collapse the side list whenever the right sidebar is open
  // This ensures only one sidebar can be open at a time
  const shouldForceCollapse = sidebarExpanded;

  // Set sidebar defaults based on data when it loads
  useEffect(() => {
    if (!sidebarInitialized && (data || suggestedData)) {
      const hasSuggestions =
        suggestedData?.crimeGroup?.suggestedMembers &&
        suggestedData.crimeGroup.suggestedMembers.length > 0;

      const hasRecentUpdates =
        data?.crimeGroup?.updates &&
        data.crimeGroup.updates.some((update) => {
          const updateDate = dayjs(update.createdAt);
          const thirtyDaysAgo = dayjs().subtract(30, 'days');
          return updateDate.isAfter(thirtyDaysAgo);
        });

      // Priority: 1. Suggestions, 2. Recent updates (last 30 days), 3. Closed
      if (hasSuggestions) {
        setSidebarSection('suggestions');
        setSidebarExpanded(true);
      } else if (hasRecentUpdates) {
        setSidebarSection('intel');
        setSidebarExpanded(true);
      } else {
        setSidebarExpanded(false);
      }

      setSidebarInitialized(true);
    }
  }, [data, suggestedData, sidebarInitialized]);

  // const optionMenuItems = [
  //   {
  //     label: intl.formatMessage({ defaultMessage: 'Add Alias', id: 'KDH1mp' }),
  //     key: '1',
  //     icon: <FontAwesomeIcon size="3x" icon={faPlus} />,
  //     onClick: toggleAddAlias,
  //   },
  //   {
  //     label: intl.formatMessage({ defaultMessage: 'Delete', id: 'K3r6DQ' }),
  //     key: '2',
  //     icon: <FontAwesomeIcon icon={faTrash} />,
  //     onClick: () => {
  //       confirm({
  //         title: intl.formatMessage({
  //           defaultMessage: 'Do you want to delete the crime group?',
  //           id: 'sozjTX',
  //         }),
  //         content: intl.formatMessage({
  //           defaultMessage: 'This action cannot be undone.',
  //           id: 'JDJoIZ',
  //         }),
  //         onOk() {
  //           onDeleteCrimeGroup();
  //         },
  //       });
  //     },
  //   },
  // ];

  return (
    <div className="page-container" style={{ overflow: 'visible' }}>
      <Row style={{ overflow: 'visible' }} wrap={false}>
        <Col style={{ overflow: 'visible', position: 'relative', zIndex: 100 }}>
          <CrimeGroupSideList
            current={crimeGroupId}
            forceCollapsed={shouldForceCollapse}
            onExpandRequest={() => setSidebarExpanded(false)}
          />
        </Col>
        <Col
          className={`${classes.detailsContent} crime-group-details-content`}
          flex={1}
        >
          <Row
            align="middle"
            className={`${classes.headerBar} crime-group-header-bar`}
            justify="space-between"
          >
            <Col flex={1}>
              <div className={classes.pageHeader}>
                <Typography.Title
                  className={`${classes.pageTitle} crime-group-page-title`}
                  level={3}
                >
                  {data?.crimeGroup?.alias ||
                    intl.formatMessage(
                      { defaultMessage: 'Crime Group {reference}' },
                      { reference: data?.crimeGroup?.reference || '' }
                    )}
                </Typography.Title>
                {data?.crimeGroup?.alias && (
                  <Typography.Text
                    className={`${classes.pageSubtitle} crime-group-page-subtitle`}
                  >
                    {intl.formatMessage(
                      { defaultMessage: 'CG-{reference}' },
                      { reference: data?.crimeGroup?.reference || '' }
                    )}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col>
              <Tooltip
                title={
                  data?.crimeGroup?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Stop getting notified about updates.',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Get notified about updates.',
                      })
                }
              >
                <Button
                  color={data?.crimeGroup?.subscribed ? undefined : 'danger'}
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
                    className={classes.icon}
                    icon={data?.crimeGroup?.subscribed ? faBellSlash : faBell}
                    size="1x"
                  />
                  {data?.crimeGroup?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Un-follow',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Follow',
                      })}
                </Button>
              </Tooltip>
            </Col>
            {/* {editRights && (
              <Col>
                <Dropdown overlay={<Menu items={optionMenuItems} />}>
                  <Button type="text">
                    <Space>
                      {intl.formatMessage({
                        defaultMessage: 'Options',
                        id: 'NDV5Mq',
                      })}
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Space>
                  </Button>
                </Dropdown>
              </Col>
            )} */}
            {editRights && (
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Edit crime group',
                  })}
                >
                  <Button
                    className={classes.toolBtn}
                    onClick={toggleAddAlias}
                    type="ghost"
                  >
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faEdit}
                      size="1x"
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Edit',
                    })}
                  </Button>
                </Tooltip>
              </Col>
            )}
            {editRights && (
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Download crime group as PDF',
                  })}
                >
                  <Button
                    className={classes.toolBtn}
                    loading={isPrinting}
                    onClick={handlePrint}
                  >
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faFileDownload}
                      size="1x"
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Download',
                    })}
                  </Button>
                </Tooltip>
              </Col>
            )}
            {editRights && (
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Delete crime group',
                  })}
                >
                  <Button
                    onClick={() => {
                      confirm({
                        content: intl.formatMessage({
                          defaultMessage: 'This action cannot be undone.',
                        }),
                        onOk() {
                          onDeleteCrimeGroup();
                        },
                        title: intl.formatMessage({
                          defaultMessage:
                            'Do you want to delete the crime group?',
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
                      className={classes.icon}
                      icon={faTrash}
                      size="1x"
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Delete',
                    })}
                  </Button>
                </Tooltip>
              </Col>
            )}
          </Row>
          <div className={classes.content}>
            <div className={classes.details} ref={componentRef}>
              {/* Print-only title */}
              <div className="print-only-title" style={{ display: 'none' }}>
                <h1>
                  {data?.crimeGroup?.alias ||
                    intl.formatMessage(
                      { defaultMessage: 'Crime Group {reference}' },
                      { reference: data?.crimeGroup?.reference || '' }
                    )}
                </h1>
                {data?.crimeGroup?.alias && (
                  <p>
                    {intl.formatMessage(
                      { defaultMessage: 'CG-{reference}' },
                      { reference: data?.crimeGroup?.reference || '' }
                    )}
                  </p>
                )}
              </div>
              <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                <Col lg={4} md={8} sm={12} xs={24}>
                  <Card
                    className={`${classes.statsCard} crime-group-stats-card`}
                    loading={loading}
                    style={
                      isPrintMode
                        ? { backgroundColor: '#fff', boxShadow: 'none' }
                        : {}
                    }
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Incidents',
                      })}
                      value={data?.crimeGroup?.totalIncidents || 0}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card
                    className={`${classes.statsCard} crime-group-stats-card`}
                    loading={loading}
                    style={
                      isPrintMode
                        ? { backgroundColor: '#fff', boxShadow: 'none' }
                        : {}
                    }
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Offenders',
                      })}
                      value={data?.crimeGroup?.totalOffenders || 0}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card
                    className={`${classes.statsCard} crime-group-stats-card`}
                    loading={loading}
                    style={
                      isPrintMode
                        ? { backgroundColor: '#fff', boxShadow: 'none' }
                        : {}
                    }
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Loss',
                      })}
                      value={intl.formatNumber(
                        data?.crimeGroup?.totalValue || 0,
                        {
                          currency,
                          maximumFractionDigits: 0,
                          notation: 'compact',
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card
                    className={`${classes.statsCard} crime-group-stats-card`}
                    loading={loading}
                    style={
                      isPrintMode
                        ? { backgroundColor: '#fff', boxShadow: 'none' }
                        : {}
                    }
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Value Recovered',
                      })}
                      value={intl.formatNumber(
                        data?.crimeGroup?.totalRecoveredValue || 0,
                        {
                          currency,
                          maximumFractionDigits: 0,
                          notation: 'compact',
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
                <Col lg={5} md={8} sm={12} xs={24}>
                  <Card
                    className={`${classes.statsCard} crime-group-stats-card`}
                    loading={loading}
                    style={
                      isPrintMode
                        ? { backgroundColor: '#fff', boxShadow: 'none' }
                        : {}
                    }
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                      })}
                      value={`${
                        data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0
                      }%`}
                    />
                  </Card>
                </Col>
              </Row>

              {data?.crimeGroup?.totalOffenders &&
                data.crimeGroup.totalOffenders > 0 && (
                  <div className="crime-group-flow-container">
                    <CrimeGroupFlow
                      crimeGroupId={crimeGroupId}
                      key={crimeGroupId}
                      onOffenderClick={(offenderId) =>
                        window.open(
                          `/app/offenders/view/${offenderId}`,
                          '_blank'
                        )
                      }
                    />
                  </div>
                )}

              <Card loading={loading}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Offenders ({offenders})',
                        },
                        {
                          offenders: data?.crimeGroup.totalOffenders || 0,
                        }
                      )}
                    </Title>
                  </Col>
                  {suggestedData?.crimeGroup?.suggestedMembers &&
                    suggestedData.crimeGroup.suggestedMembers.length > 0 && (
                      <Col>
                        <Button
                          danger
                          onClick={toggleViewSuggested}
                          size="small"
                          type="ghost"
                        >
                          {suggestedData.crimeGroup.suggestedMembers.length}
                          {intl.formatMessage({
                            defaultMessage: 'Suggested Members',
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
                                  className={classes.icon}
                                  icon={faMagnifyingGlass}
                                />
                              ),
                              key: '1',
                              label: intl.formatMessage({
                                defaultMessage: 'Add Existing Offenders',
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
                          defaultMessage: 'Offenders',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                <OffenderGridContainer
                  canDisconnect={editRights}
                  crimeGroupId={crimeGroupId}
                  defaultSortBy="lastSeen"
                  onDisconnectOffender={onDisconnectOffender}
                  pageSize={12}
                />
              </Card>

              {data?.crimeGroup?.incidents &&
                data?.crimeGroup?.incidents.length > 0 && (
                  <IncidentMapContainer
                    crimeGroupId={crimeGroupId}
                    height={500}
                    width="100%"
                  />
                )}
              <Card loading={loading}>
                <Row align="middle" style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Vehicles',
                      })}
                    </Title>
                  </Col>
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
                                  className={classes.icon}
                                  icon={faMagnifyingGlass}
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
                                  className={classes.icon}
                                  icon={faPlus}
                                />
                              ),
                              key: '2',
                              label: intl.formatMessage({
                                defaultMessage: 'Create New Vehicle',
                              }),
                              onClick: () => toggleAddNewVehicle(),
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
                          defaultMessage: 'Vehicles',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.crimeGroup?.vehicles.length && !loading ? (
                  <div className="vehicle-grid-container">
                    <VehicleGrid
                      canDisconnect={editRights}
                      onDisconnectVehicle={onDisconnectVehicle}
                      sortBy={vehicleSortBy}
                      vehicles={data?.crimeGroup?.vehicles.map((vehicle) => ({
                        ...vehicle,
                        images: vehicle.images?.map((img) => ({
                          ...img,
                          position: img.position as unknown as number,
                        })),
                      }))}
                    />
                  </div>
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No vehicles for this crime group',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              <Card loading={loading}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </Title>
                <IncidentTableContainer
                  crimeGroupId={crimeGroupId}
                  hasNavigation
                  pageSize={20}
                  showFilters={true}
                />
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

                {data?.crimeGroup?.evidence.length && !loading ? (
                  <EvidenceTable
                    deleteRights={editRights}
                    evidence={data?.crimeGroup?.evidence}
                    title={ProfileUpdatedModel.Crime_Group}
                    update={updateDeleteDocument}
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No evidence for this crimeGroup',
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
                  {data?.crimeGroup?.investigations.length && !loading ? (
                    <InvestigationTable
                      investigations={data?.crimeGroup?.investigations}
                    />
                  ) : (
                    <Empty
                      description={intl.formatMessage({
                        defaultMessage:
                          'No investigations for this crime group',
                      })}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </Card>
              )}
            </div>

            <Modal
              okText={intl.formatMessage({
                defaultMessage: 'Save',
              })}
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
          </div>
        </Col>

        {/* Right Sidebar */}
        <Col className={classes.rightSidebar}>
          <div className={classes.sidebar}>
            {/* Toggle Button */}
            <div
              className={classes.sidebarToggle}
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <FontAwesomeIcon
                icon={sidebarExpanded ? faChevronRight : faChevronLeft}
              />
            </div>

            {/* Collapsed Menu */}
            <div className={classes.sidebarMenu}>
              <div
                className={`${classes.sidebarMenuItem} ${sidebarExpanded && sidebarSection === 'intel' ? classes.sidebarMenuItemActive : ''}`}
                onClick={() => {
                  setSidebarExpanded(true);
                  setSidebarSection('intel');
                }}
              >
                <FontAwesomeIcon icon={faMessages} />
                {data?.crimeGroup?.updates &&
                  data.crimeGroup.updates.length > 0 && (
                    <span className={classes.sidebarMenuBadge}>
                      {data.crimeGroup.updates.length}
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
                className={`${classes.sidebarMenuItem} ${sidebarExpanded && sidebarSection === 'suggestions' ? classes.sidebarMenuItemActive : ''}`}
                onClick={() => {
                  setSidebarExpanded(true);
                  setSidebarSection('suggestions');
                }}
              >
                <FontAwesomeIcon icon={faCompass} />
                {suggestedData?.crimeGroup?.suggestedMembers &&
                  suggestedData.crimeGroup.suggestedMembers.length > 0 && (
                    <span className={classes.sidebarMenuBadge}>
                      {suggestedData.crimeGroup.suggestedMembers.length}
                    </span>
                  )}
                <Tooltip
                  placement="left"
                  title={intl.formatMessage({
                    defaultMessage: 'Suggested Members',
                  })}
                >
                  <span className={classes.sidebarMenuLabel}>
                    {intl.formatMessage({ defaultMessage: 'Compass' })}
                  </span>
                </Tooltip>
              </div>

              <div
                className={`${classes.sidebarMenuItem} ${sidebarExpanded && sidebarSection === 'history' ? classes.sidebarMenuItemActive : ''}`}
                onClick={() => {
                  setSidebarExpanded(true);
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
                className={`${classes.sidebarMenuItem} ${sidebarExpanded && sidebarSection === 'activities' ? classes.sidebarMenuItemActive : ''}`}
                onClick={() => {
                  setSidebarExpanded(true);
                  setSidebarSection('activities');
                }}
              >
                <FontAwesomeIcon icon={faListAlt} />
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
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
              >
                <FontAwesomeIcon
                  icon={sidebarExpanded ? faChevronRight : faChevronLeft}
                />
                <Tooltip
                  placement="left"
                  title={
                    sidebarExpanded
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
            {sidebarExpanded && (
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
                        updates={data?.crimeGroup?.updates}
                        userId={userId}
                      />
                    </div>
                    <div className={classes.sidebarFooter}>
                      <UpdateBar
                        crimeGroupId={crimeGroupId}
                        replyTo={replyTo}
                        setOptionRowShow={setOptionRowShow}
                        setReplyTo={setReplyTo}
                        subscribed={data?.crimeGroup?.subscribed || false}
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
                    {suggestedData?.crimeGroup?.suggestedMembers &&
                    suggestedData.crimeGroup.suggestedMembers.length > 0 ? (
                      <div className={classes.sidebarSuggestions}>
                        <div className={classes.suggestionsHeader}>
                          <Typography.Text className={classes.suggestionsTitle}>
                            {intl.formatMessage({
                              defaultMessage: 'Suggested Members',
                            })}
                          </Typography.Text>
                          <Typography.Text
                            className={classes.suggestionsDescription}
                          >
                            {intl.formatMessage({
                              defaultMessage:
                                'Possible new crime group members based on shared incidents with existing members',
                            })}
                          </Typography.Text>
                        </div>
                        {suggestedData.crimeGroup.suggestedMembers.map(
                          (member) => (
                            <Card
                              className={classes.suggestionCard}
                              key={member.id}
                              onClick={() => setSelectedSuggestion(member.id)}
                              size="small"
                            >
                              <Row align="middle" gutter={12}>
                                <Col flex="0 0 100px">
                                  {member.images && member.images.length > 0 ? (
                                    <div className={classes.suggestionImage}>
                                      <img
                                        alt={member.name || ''}
                                        src={member.images[0].optimised || ''}
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className={
                                        classes.suggestionImagePlaceholder
                                      }
                                    >
                                      <FontAwesomeIcon icon={faUserClock} />
                                    </div>
                                  )}
                                </Col>
                                <Col flex="1">
                                  <Typography.Text
                                    className={classes.suggestionName}
                                    strong
                                  >
                                    {member.name}
                                  </Typography.Text>
                                  <Typography.Text
                                    className={classes.suggestionRef}
                                  >
                                    {member.reference}
                                  </Typography.Text>

                                  {/* Basic info row */}
                                  <div className={classes.suggestionInfo}>
                                    {member.gender && (
                                      <span>
                                        {getOffenderGender(member.gender)}
                                      </span>
                                    )}
                                    {(member.age || member.dateOfBirth) && (
                                      <span>
                                        {member.dateOfBirth
                                          ? calcAge(member.dateOfBirth)
                                          : getOffenderAge(member.age)}
                                      </span>
                                    )}
                                    {member.race && (
                                      <span>
                                        {getOffenderRace(member.race, false)}
                                      </span>
                                    )}
                                  </div>

                                  {/* Shared incidents details */}
                                  {member.totalAssociatedIncidents > 0 && (
                                    <div
                                      className={classes.suggestionIncidents}
                                    >
                                      <FontAwesomeIcon icon={faFileAlt} />
                                      <span>
                                        {intl.formatMessage(
                                          {
                                            defaultMessage:
                                              '{count} shared incidents',
                                          },
                                          {
                                            count:
                                              member.totalAssociatedIncidents,
                                          }
                                        )}
                                      </span>
                                    </div>
                                  )}

                                  {/* Show first incident type/value if available */}
                                  {member.associatedIncidents &&
                                    member.associatedIncidents.length > 0 && (
                                      <div
                                        className={
                                          classes.suggestionIncidentDetail
                                        }
                                      >
                                        <span
                                          className={
                                            classes.suggestionIncidentType
                                          }
                                        >
                                          {member.associatedIncidents[0]
                                            .crimeTypes?.[0]?.name ||
                                            intl.formatMessage({
                                              defaultMessage: 'Unknown',
                                            })}
                                        </span>
                                      </div>
                                    )}
                                </Col>
                              </Row>
                              <Row
                                className={classes.suggestionActions}
                                gutter={8}
                              >
                                <Col span={12}>
                                  <Button
                                    block
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSuggestion(member.id);
                                    }}
                                    size="small"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'View',
                                    })}
                                  </Button>
                                </Col>
                                <Col span={12}>
                                  <Button
                                    block
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddSuggestion(member.id);
                                    }}
                                    size="small"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Add',
                                    })}
                                  </Button>
                                </Col>
                              </Row>
                            </Card>
                          )
                        )}
                      </div>
                    ) : (
                      <Empty
                        description={intl.formatMessage({
                          defaultMessage: 'No suggested members',
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
                    {data?.crimeGroup?.activities &&
                    data.crimeGroup.activities.length > 0 ? (
                      <div className={classes.activitiesList}>
                        {data.crimeGroup.activities.map((activity) => (
                          <Card
                            className={classes.activityCard}
                            key={activity.id}
                            onClick={() => setSelectedActivity(activity.id)}
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
                                        {activity.name}
                                      </Typography.Text>
                                      {activity.reference && (
                                        <Typography.Text
                                          className={classes.activityReference}
                                        >
                                          {intl.formatMessage(
                                            { defaultMessage: '#{reference}' },
                                            { reference: activity.reference }
                                          )}
                                        </Typography.Text>
                                      )}
                                    </div>
                                  </Col>
                                  <Col>
                                    {activity.completed ? (
                                      <Tag
                                        className={classes.activityStatus}
                                        color="success"
                                      >
                                        {intl.formatMessage({
                                          defaultMessage: 'Completed',
                                        })}
                                      </Tag>
                                    ) : activity.dueDate &&
                                      dayjs(activity.dueDate).isBefore(
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

                              {activity.description && (
                                <Col span={24}>
                                  <Typography.Paragraph
                                    className={classes.activityDescription}
                                    ellipsis={{ expandable: true, rows: 2 }}
                                  >
                                    {activity.description}
                                  </Typography.Paragraph>
                                </Col>
                              )}

                              {activity.assignedUsers &&
                                activity.assignedUsers.length > 0 && (
                                  <Col span={24}>
                                    <div className={classes.activityAssignees}>
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
                                        {activity.assignedUsers.map((user) => (
                                          <Tooltip
                                            key={user.id}
                                            title={user.fullName}
                                          >
                                            <Avatar
                                              className={classes.activityAvatar}
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
                                    {activity.createdAt && (
                                      <Col>
                                        <div
                                          className={classes.activityDetailItem}
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
                                              {dayjs(activity.createdAt).format(
                                                'MMM D, YYYY'
                                              )}
                                            </Typography.Text>
                                          </div>
                                        </div>
                                      </Col>
                                    )}

                                    {activity.dueDate && (
                                      <Col>
                                        <div
                                          className={classes.activityDetailItem}
                                        >
                                          <FontAwesomeIcon
                                            className={
                                              classes.activityDetailIcon
                                            }
                                            icon={faUserClock}
                                            style={{
                                              color:
                                                activity.dueDate &&
                                                dayjs(
                                                  activity.dueDate
                                                ).isBefore(dayjs()) &&
                                                !activity.completed
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
                                              {dayjs(activity.dueDate).format(
                                                'MMM D, YYYY'
                                              )}
                                            </Typography.Text>
                                          </div>
                                        </div>
                                      </Col>
                                    )}

                                    {activity.completed &&
                                      activity.completedDate && (
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
                                                  activity.completedDate
                                                ).format('MMM D, YYYY')}
                                              </Typography.Text>
                                            </div>
                                          </div>
                                        </Col>
                                      )}

                                    {activity.completedBy && (
                                      <Col>
                                        <div
                                          className={classes.activityDetailItem}
                                        >
                                          <Avatar
                                            className={
                                              classes.activityDetailAvatar
                                            }
                                            size={20}
                                          >
                                            {activity.completedBy.fullName
                                              .split(' ')
                                              .map((n) => n[0])
                                              .join('')
                                              .toUpperCase()}
                                          </Avatar>
                                          <div>
                                            <Typography.Text
                                              className={
                                                classes.activityDetailLabel
                                              }
                                            >
                                              {intl.formatMessage({
                                                defaultMessage: 'Completed By',
                                              })}
                                            </Typography.Text>
                                            <Typography.Text
                                              className={
                                                classes.activityDetailValue
                                              }
                                            >
                                              {activity.completedBy.fullName}
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

      <Drawer
        onClose={toggleAddOffender}
        open={addOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
        })}
        width={700}
        zIndex={999}
      >
        {addOffender ? (
          <AddNewOffenderSimple
            crimeGroupId={data?.crimeGroup.id}
            groupsIds={data?.crimeGroup.groups.map(({ id }) => id)}
            images={[]}
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
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
            type={'multiple'}
            update={submitOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* vehicle */}
      <Drawer
        onClose={toggleAddNewVehicle}
        open={addNewVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        width={700}
        zIndex={999}
      >
        {addNewVehicle ? (
          <AddVehicle
            onClose={toggleAddNewVehicle}
            saving={saving}
            update={submitNewVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleAddExistingVehicle}
        open={addExistingVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        width={800}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            onClose={toggleAddExistingVehicle}
            update={(submitData) => submitVehicle(submitData.id)}
            vehicleIds={vehicleIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddAlias}
        open={addAlias}
        title={intl.formatMessage({
          defaultMessage: 'Add New Alias',
        })}
        width={400}
      >
        {addAlias ? <AddAlias onClose={toggleAddAlias} /> : <div />}
      </Drawer>
      <Drawer
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
        onClose={toggleViewSuggested}
        open={viewSuggestedOpen}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Group Members',
        })}
        width={900}
      >
        {viewSuggestedOpen && editRights && (
          <SuggestedMembers
            handleAddSuggestion={handleAddSuggestion}
            onClose={toggleViewSuggested}
            suggestedData={suggestedData}
          />
        )}
      </Drawer>

      {/* Individual Suggestion Detail */}
      <Drawer
        onClose={() => setSelectedSuggestion(null)}
        open={!!selectedSuggestion}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Member Details',
        })}
        width={800}
        zIndex={1002}
      >
        {selectedSuggestion && suggestedData?.crimeGroup?.suggestedMembers && (
          <SuggestedMembers
            handleAddSuggestion={(id) => {
              handleAddSuggestion(id);
              setSelectedSuggestion(null);
            }}
            onClose={() => setSelectedSuggestion(null)}
            suggestedData={{
              crimeGroup: {
                ...suggestedData.crimeGroup,
                suggestedMembers:
                  suggestedData.crimeGroup.suggestedMembers.filter(
                    (m) => m.id === selectedSuggestion
                  ),
              },
            }}
          />
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
            crimeGroupId={data?.crimeGroup?.id || ''}
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
            incidentId={data?.crimeGroup?.id || ''}
            onClose={toggleAddInvestigation}
            update={updateInvestigationList}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* View Activity Drawer */}
      {selectedActivity && (
        <Drawer
          onClose={() => setSelectedActivity(null)}
          open={true}
          title={intl.formatMessage({
            defaultMessage: 'View Activity',
          })}
          width={800}
          zIndex={1002}
        >
          <ViewTodo
            id={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            updateQuery={() => {
              // This would be used to update the cache after completing the activity
              // For now, we'll just close the drawer
              setSelectedActivity(null);
            }}
            updateTodo={() => {}}
          />
        </Drawer>
      )}
    </div>
  );
};

export default ViewCrimeGroup;
