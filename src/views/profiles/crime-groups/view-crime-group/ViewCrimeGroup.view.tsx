import React from 'react';
import {
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
  Tooltip,
  Typography,
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faEdit,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { faMessages } from '@fortawesome/pro-solid-svg-icons';
import AddAlias from 'components/form-components/crimeGroup/Alias';
import UpdateBar from 'components/MessageInput/UpdateBar';
import type { VehicleData } from 'types/DataType';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import VehicleTable from 'components/tables/VehicleTable';
import IncidentTable from 'components/tables/IncidentTable';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import CrimeGroupSideList from 'components/crimeGroups/sidelist';
import SuggestedMembers from 'components/crimeGroups/SuggestedMembers/SuggestedMembers.view';
import MapCard from 'components/map/MapCard/MapCard.view';
import { useIntl } from 'react-intl';
import EvidenceTable from 'components/tables/EvidenceTable';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';
import AddDocument from 'components/form-components/documents/AddDocument';
import type { MutationUpdaterFn } from '@apollo/client';
import InvestigationTable from 'components/tables/InvestigationTable';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import SelectedOffenders from 'components/form-components/linkOptions/SelectOffenders';
import IntelSection from 'components/ViewPage/IntelSection';
import AddNewOffenderSimple from '#/components/form-components/offender/offender/AddNewOffenderSimple';
import OffenderGrid from '../../../../components/offenders/OffenderGrid';
import useStyles from './ViewCrimeGroup.styles';
import type { CrimeGroupQuery } from 'graphql/crime-groups/queries/view-crime-group.generated';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/create-document.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';
import type { SuggestedCrimeGroupMembersQuery } from 'graphql/crime-groups/queries/suggested-memebrs.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/create-simple-offender.generated';

const { Title } = Typography;
const { confirm } = Modal;

interface Props {
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  saving: boolean;
  offenderIds: string[];
  vehicleIds: string[];
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  onDeleteCrimeGroup: () => void;
  addAlias: boolean;
  toggleAddAlias: () => void;
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
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  editRights: boolean;
  toggleSubscribe: () => void;
  crimeGroupId: string;
  submitNewVehicle: (value: VehicleData) => void;
  submitOffender: (value: string[]) => void;
  submitVehicle: (value: string) => void;
  suggestedData: SuggestedCrimeGroupMembersQuery | undefined;
  viewSuggestedOpen: boolean;
  toggleViewSuggested: () => void;
  handleAddSuggestion: (id: string) => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  showIntel: boolean;
  toggleShowIntel: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  onCompletedAddOffender: () => void;
}

const ViewCrimeGroup = ({
  data,
  loading,
  saving,
  offenderIds,
  vehicleIds,
  addOffender,
  toggleAddOffender,
  addExistingOffender,
  toggleAddExistingOffender,
  addNewVehicle,
  addExistingVehicle,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  onDeleteCrimeGroup,
  addAlias,
  toggleAddAlias,
  editRights,
  optionRowShow,
  setOptionRowShow,
  userId,
  editUpdate,
  editUpdateInput,
  handleEditUpdate,
  replyTo,
  scrolledToTop,
  setEditUpdate,
  setEditUpdateInput,
  setReplyTo,
  loadMore,
  confirmDeleteUpdate,
  toggleSubscribe,
  crimeGroupId,
  submitNewVehicle,
  submitOffender,
  submitVehicle,
  suggestedData,
  toggleViewSuggested,
  viewSuggestedOpen,
  handleAddSuggestion,
  toggleAddDocument,
  addDocument,
  updateDocumentList,
  updateDeleteDocument,
  addInvestigation,
  toggleAddInvestigation,
  updateInvestigationList,
  showIntel,
  toggleShowIntel,
  updateAddOffenderList,
  onCompletedAddOffender,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
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
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <CrimeGroupSideList current={crimeGroupId} />
        </Col>
        <Col flex={1} className={classes.detailsContent}>
          <Row gutter={8} className={classes.headerBar} justify="end">
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
                  onClick={toggleSubscribe}
                  disabled={saving}
                  loading={saving}
                  type="ghost"
                  color={data?.crimeGroup?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.crimeGroup?.subscribed ? faBellSlash : faBell}
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
                <Button type="ghost" onClick={toggleAddAlias}>
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={faEdit}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Edit',
                  })}
                </Button>
              </Col>
            )}
            {editRights && (
              <Col>
                <Button
                  type="ghost"
                  onClick={() => {
                    confirm({
                      title: intl.formatMessage({
                        defaultMessage:
                          'Do you want to delete the crime group?',
                      }),
                      content: intl.formatMessage({
                        defaultMessage: 'This action cannot be undone.',
                      }),
                      onOk() {
                        onDeleteCrimeGroup();
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
                  })}
                </Button>
              </Col>
            )}
          </Row>
          <div className={classes.content}>
            <div className={classes.details}>
              <Card loading={loading}>
                <Title level={3}>
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {ref} {alias}',
                    },
                    {
                      ref: data?.crimeGroup?.reference || '',
                      alias: data?.crimeGroup?.alias
                        ? `(${data?.crimeGroup?.alias})`
                        : '',
                    }
                  )}
                </Title>
                <Row gutter={32}>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Incidents',
                      })}
                      value={data?.crimeGroup?.totalIncidents || 0}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Offenders',
                      })}
                      value={data?.crimeGroup?.totalOffenders || 0}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Loss',
                      })}
                      value={`£${
                        data?.crimeGroup?.totalValue?.toLocaleString() || 0
                      }`}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Value Recovered',
                      })}
                      value={`£${
                        data?.crimeGroup?.totalRecoveredValue?.toLocaleString() ||
                        0
                      }`}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                      })}
                      value={`${
                        data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0
                      }%`}
                    />
                  </Col>
                </Row>
              </Card>
              <Card loading={loading}>
                <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
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
                          onClick={toggleViewSuggested}
                          danger
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
                              label: intl.formatMessage({
                                defaultMessage: 'Add Existing Offenders',
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
                          defaultMessage: 'Offenders',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.crimeGroup?.offenders.length && !loading ? (
                  <OffenderGrid offenders={data?.crimeGroup?.offenders} />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No offenders for this crime group',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              {data?.crimeGroup?.incidents &&
                data?.crimeGroup?.incidents.length > 0 && (
                  <MapCard
                    width="100%"
                    height={500}
                    markers={
                      data?.crimeGroup?.incidents.map((incident) => ({
                        geoLat: incident?.location?.geoLat,
                        geoLng: incident?.location?.geoLng,
                      })) || []
                    }
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
                    <Dropdown
                      overlay={
                        <Menu
                          items={[
                            {
                              label: intl.formatMessage({
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
                                defaultMessage: 'Create New Vehicle',
                              }),
                              key: '2',
                              icon: (
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  style={{ marginRight: 5 }}
                                />
                              ),
                              onClick: () => toggleAddNewVehicle(),
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
                          defaultMessage: 'Vehicles',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.crimeGroup?.vehicles.length && !loading ? (
                  <VehicleTable
                    vehicles={data?.crimeGroup?.vehicles}
                    hasNavigation
                  />
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
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </Title>
                {data?.crimeGroup?.incidents &&
                data?.crimeGroup?.incidents.length > 0 &&
                !loading ? (
                  <IncidentTable // TODO
                    incidents={data?.crimeGroup?.incidents.filter(
                      (incident) => incident !== null
                    )}
                    hasNavigation
                    pageSize={20}
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No incidents for this crime group',
                    })}
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
                            style={{ marginRight: 5 }}
                          />
                        }
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
                    evidence={data?.crimeGroup?.evidence}
                    title={ProfileUpdatedModel.Crime_Group}
                    update={updateDeleteDocument}
                    deleteRights={editRights}
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
                  <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                    <Col flex={1}>
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Investigations',
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
                            style={{ marginRight: 5 }}
                          />
                        }
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
              title={intl.formatMessage({
                defaultMessage: 'Edit Update Content',
              })}
              open={editUpdate !== null}
              onOk={handleEditUpdate}
              onCancel={() => setEditUpdate(null)}
              okText={intl.formatMessage({
                defaultMessage: 'Save',
              })}
            >
              <Input
                value={editUpdateInput}
                onChange={(e) => setEditUpdateInput(e.target.value)}
              />
            </Modal>
          </div>
        </Col>
        <Col style={{ position: 'relative' }}>
          <Row className={classes.intelToggleButton} onClick={toggleShowIntel}>
            {/* <div className={classes.intelToggleButtonSection}> */}
            {/*  <FontAwesomeIcon icon={faSparkles} /> */}
            {/*  <div className={classes.intelToggleButtonBadge}>5</div> */}
            {/* </div> */}
            <div
              className={classes.intelToggleButtonSection}
              style={{ borderBottom: 0 }}
            >
              <FontAwesomeIcon icon={faMessages} />
              {/* <div className={classes.intelToggleButtonBadgeRead}>10</div> */}
            </div>
          </Row>
        </Col>
        <Col span={showIntel ? 6 : 0}>
          <div className={classes.updatesContainer}>
            <IntelSection
              updates={data?.crimeGroup?.updates}
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
              crimeGroupId={crimeGroupId}
              setReplyTo={setReplyTo}
              subscribed={data?.crimeGroup?.subscribed || false}
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>
      </Row>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
        })}
        open={addOffender}
        width={700}
        onClose={toggleAddOffender}
        zIndex={999}
      >
        {addOffender ? (
          <AddNewOffenderSimple
            onCompleted={onCompletedAddOffender}
            update={updateAddOffenderList}
            crimeGroupId={data?.crimeGroup.id}
            groupsIds={data?.crimeGroup.groups.map(({ id }) => id)}
            onClose={toggleAddOffender}
            images={[]}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
        })}
        open={addExistingOffender}
        width="1000"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <SelectedOffenders
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
            update={submitOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* vehicle */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        open={addNewVehicle}
        width={700}
        zIndex={999}
        onClose={toggleAddNewVehicle}
      >
        {addNewVehicle ? (
          <AddVehicle
            onClose={toggleAddNewVehicle}
            update={submitNewVehicle}
            saving={saving}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        open={addExistingVehicle}
        width={800}
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
        bodyStyle={{ overflow: 'hidden' }}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            update={(submitData) => submitVehicle(submitData.id)}
            onClose={toggleAddExistingVehicle}
            vehicleIds={vehicleIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Alias',
        })}
        open={addAlias}
        width={400}
        onClose={toggleAddAlias}
      >
        {addAlias ? <AddAlias onClose={toggleAddAlias} /> : <div />}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Group Members',
        })}
        open={viewSuggestedOpen}
        width={900}
        onClose={toggleViewSuggested}
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {viewSuggestedOpen && editRights && (
          <SuggestedMembers
            suggestedData={suggestedData}
            onClose={toggleViewSuggested}
            handleAddSuggestion={handleAddSuggestion}
          />
        )}
      </Drawer>
      {/* evidence */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        open={addDocument}
        width="600"
        onClose={toggleAddDocument}
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocument
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
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        open={addInvestigation}
        width="500"
        onClose={toggleAddInvestigation}
      >
        {addInvestigation ? (
          <AddInvestigation
            update={updateInvestigationList}
            incidentId={data?.crimeGroup?.id || ''}
            onClose={toggleAddInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewCrimeGroup;
