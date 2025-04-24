import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';
import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SuggestedCrimeGroupMembersQuery } from 'graphql/crime-groups/queries/__generated__/suggested-memebrs.generated';
import type { CrimeGroupQuery } from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { VehicleData } from 'types/DataType';

import AddDocuments from '#/components/form-components/documents/AddDocuments';
import AddExistingOffender from '#/components/form-components/offender/AddExistingOffender';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
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
import { faMessages } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import UpdateBar from 'components/MessageInput/UpdateBar';
import IntelSection from 'components/ViewPage/IntelSection';
import SuggestedMembers from 'components/crimeGroups/SuggestedMembers/SuggestedMembers.view';
import CrimeGroupSideList from 'components/crimeGroups/sidelist';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import AddAlias from 'components/form-components/crimeGroup/Alias';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import AddNewOffenderSimple from 'components/form-components/offender/AddNewOffenderSimple';
import MapCard from 'components/map/MapCard/MapCard.view';
import EvidenceTable from 'components/tables/EvidenceTable';
import IncidentTable from 'components/tables/IncidentTable';
import InvestigationTable from 'components/tables/InvestigationTable';
import VehicleTable from 'components/tables/VehicleTable';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { ProfileUpdatedModel } from 'types/enums/profile-update-type';

import OffenderGrid from '../../../../components/offenders/OffenderGrid';
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
  showIntel: boolean;
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
  toggleShowIntel: () => void;
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
  optionRowShow,
  replyTo,
  saving,
  scrolledToTop,
  setEditUpdate,
  setEditUpdateInput,
  setOptionRowShow,
  setReplyTo,
  showIntel,
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
  toggleShowIntel,
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
        <Col className={classes.detailsContent} flex={1}>
          <Row className={classes.headerBar} justify="end">
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
                    <FontAwesomeIcon icon={faEdit} size="1x" />
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
                    <FontAwesomeIcon icon={faFileDownload} size="1x" />
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
                    <FontAwesomeIcon icon={faTrash} size="1x" />
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
              <Card loading={loading}>
                <Title level={3}>
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {ref} {alias}',
                    },
                    {
                      alias: data?.crimeGroup?.alias
                        ? `(${data?.crimeGroup?.alias})`
                        : '',
                      ref: data?.crimeGroup?.reference || '',
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
                      value={intl.formatNumber(
                        data?.crimeGroup?.totalValue || 0,
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
                        data?.crimeGroup?.totalRecoveredValue || 0,
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
                        data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0
                      }%`}
                    />
                  </Col>
                </Row>
              </Card>
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
                                  icon={faMagnifyingGlass}
                                  style={{ marginRight: 5 }}
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
                    height={500}
                    markers={
                      data?.crimeGroup?.incidents.map((incident) => ({
                        geoLat: incident?.location?.geoLat,
                        geoLng: incident?.location?.geoLng,
                      })) || []
                    }
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
                              onClick: () => toggleAddNewVehicle(),
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
                          defaultMessage: 'Vehicles',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.crimeGroup?.vehicles.length && !loading ? (
                  <VehicleTable
                    hasNavigation
                    vehicles={data?.crimeGroup?.vehicles}
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
                    hasNavigation
                    incidents={data?.crimeGroup?.incidents.filter(
                      (incident) => incident !== null
                    )}
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
            <UpdateBar
              crimeGroupId={crimeGroupId}
              replyTo={replyTo}
              setOptionRowShow={setOptionRowShow}
              setReplyTo={setReplyTo}
              subscribed={data?.crimeGroup?.subscribed || false}
            />
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
    </div>
  );
};

export default ViewCrimeGroup;
