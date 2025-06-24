import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import AddCrimeGroup from '#/components/form-components/CrimeGroupSelect/crimeGroup/AddCrimeGroup';
import EditCrimeGroup from '#/components/form-components/CrimeGroupSelect/crimeGroup/EditCrimeGroup';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import AddExistingOffender from '#/components/form-components/offender/AddExistingOffender';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import {
  faBell,
  faBellSlash,
  faCheckCircle,
  faFileDownload,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Col,
  Drawer,
  Modal,
  Row,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import EditInvestigation from 'components/form-components/Investigation/EditInvestigation';
import AddTodo from 'components/form-components/Todos/AddTodo';
import ViewTodo from 'components/form-components/Todos/ViewTodo/Todo.container';
import AddVehicleSimple from 'components/form-components/Vehicle/AddVehicleSimple';
import EditVehicleSimple from 'components/form-components/Vehicle/EditVehicleSimple';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import SelectIncidents from 'components/form-components/linkOptions/SelectIncidents';
import AddNewOffenderSimple from 'components/form-components/offender/AddNewOffenderSimple';
import SimpleEditOffender from 'components/form-components/offender/SimpleEditOffender';
import MultiSelectOffenders from 'components/investigations/MultiSelectOffenders';
import MultiSelectVehicles from 'components/investigations/MultiSelectVehicles';
import { InvestigationStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import AddEvidence from '../../../components/form-components/documents/AddEvidence';
import ViewDetails from './views/Details';
import DocumentsContainer from './views/Documents/Documents.container';
import Flow from './views/Flow/Flow.container';

const { confirm } = Modal;

interface Props {
  addCrimeGroup: boolean;
  addDemDocument: boolean;
  addDocument: boolean;
  addExistingCrimeGroup: boolean;
  addExistingIncident: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addOffender: boolean;
  addTodo: boolean;
  addVehicle: boolean;
  completeTodoVisible: null | string;
  crimeGroupIds: string[];
  data: ViewInvestigationQuery | undefined;
  demId: null | string | undefined;
  editCrimeGroupData: CrimeGroupCardData | null;
  editInvestigation: boolean;
  editOffenderData: OffenderData | null;
  editVehicleData: VehicleData | null;
  incidentIds: string[];
  loading: boolean;
  offenderIds: string[];
  onAddCrimeGroup: (value: CrimeGroupCardData) => void;
  onAddExistingCrimeGroup: (value: string) => void;
  onAddExistingIncident: (value: string[]) => void;
  onAddExistingOffender: (value: OffenderSearchDetailsFragment[]) => void;
  onAddExistingOffenders: (value: string[]) => void;
  onAddExistingVehicle: (value: string) => void;
  onAddExistingVehicles: (value: string[]) => void;
  onAddVehicle: (value: VehicleData) => void;
  onCloseInvestigation: () => void;
  onCompletedAddOffender: () => void;
  onCompletedEditOffender: () => void;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onDeleteIncident: (id: string) => void;
  onDeleteInvestigation: () => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onEditCrimeGroup: (value: CrimeGroupCardData) => void;
  onEditVehicle: (value: VehicleData) => void;
  onReopenInvestigation: () => void;
  saving: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  setViewTodoVisible: (value: null | string) => void;
  showSuggestedOffenders: boolean;
  showSuggestedVehicles: boolean;
  suggestedOffenders: OffenderData[] | undefined;
  suggestedVehicles: VehicleData[] | undefined;
  takeAllSchemes: boolean;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
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
  toggleCloseSuggestedOffenders: () => void;
  toggleCloseSuggestedVehicles: () => void;
  toggleEditInvestigation: () => void;
  toggleShowSuggestedOffenders: () => void;
  toggleShowSuggestedVehicles: () => void;
  toggleSubscribe: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  vehicleIds: string[];
  viewTodoVisible: null | string;
}

const useStyles = createUseStyles({
  sideListContent: {
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    marginRight: 0,
    paddingRight: 0,
    // paddingTop: 10,
    width: '100%',
  },
});

const ViewInvestigation = ({
  addCrimeGroup,
  addDemDocument,
  addDocument,
  addExistingCrimeGroup,
  addExistingIncident,
  addExistingOffender,
  addExistingVehicle,
  addOffender,
  addTodo,
  addVehicle,
  completeTodoVisible,
  crimeGroupIds,
  data,
  demId,
  editCrimeGroupData,
  editInvestigation,
  editOffenderData,
  editVehicleData,
  incidentIds,
  loading,
  offenderIds,
  onAddCrimeGroup,
  onAddExistingCrimeGroup,
  onAddExistingIncident,
  onAddExistingOffender,
  onAddExistingOffenders,
  onAddExistingVehicle,
  onAddExistingVehicles,
  onAddVehicle,
  onCloseInvestigation,
  onCompletedAddOffender,
  onCompletedEditOffender,
  onDeleteCrimeGroup,
  onDeleteDocument,
  onDeleteIncident,
  onDeleteInvestigation,
  onDeleteOffender,
  onDeleteVehicle,
  onEditCrimeGroup,
  onEditVehicle,
  onReopenInvestigation,
  saving,
  setCompleteTodoVisible,
  setEditCrimeGroupData,
  setEditOffenderData,
  setEditVehicleData,
  setViewTodoVisible,
  showSuggestedOffenders,
  showSuggestedVehicles,
  suggestedOffenders,
  suggestedVehicles,
  takeAllSchemes,
  templatesData,
  templatesLoading,
  toggleAddCrimeGroup,
  toggleAddDemDocument,
  toggleAddDocument,
  toggleAddExistingCrimeGroup,
  toggleAddExistingIncident,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddOffender,
  toggleAddTodo,
  toggleAddVehicle,
  toggleCloseSuggestedOffenders,
  toggleCloseSuggestedVehicles,
  toggleEditInvestigation,
  toggleShowSuggestedOffenders,
  toggleShowSuggestedVehicles,
  toggleSubscribe,
  updateAddOffenderList,
  updateEditOffenderList,
  updateTodo,
  updateTodoList,
  vehicleIds,
  viewTodoVisible,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  return (
    <div style={{ height: '100vh' }}>
      <div className={classes.sideListContent}>
        <Tabs
          tabBarExtraContent={
            <Row style={{ margin: 6 }}>
              <Col>
                <Tooltip
                  title={
                    data?.investigation?.subscribed
                      ? intl.formatMessage({
                          defaultMessage:
                            'Stop getting notified about updates.',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Get notified about updates.',
                        })
                  }
                >
                  <Button
                    onClick={toggleSubscribe}
                    style={{
                      borderBottomRightRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        data?.investigation?.subscribed ? faBellSlash : faBell
                      }
                      size="1x"
                    />
                  </Button>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Download investigation as PDF',
                  })}
                >
                  <Button
                    loading={isPrinting}
                    onClick={handlePrint}
                    style={{
                      borderBottomRightRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faFileDownload} size="1x" />
                  </Button>
                </Tooltip>
              </Col>
              <Col>
                <Button
                  onClick={() => {
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
                  }}
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} size="1x" />
                </Button>
              </Col>
              {data?.investigation.status === InvestigationStatus.Open && (
                <Col>
                  <Button
                    onClick={() => {
                      confirm({
                        onOk() {
                          onCloseInvestigation();
                        },
                        title: intl.formatMessage({
                          defaultMessage:
                            'Do you want to close the investigation?',
                        }),
                      });
                    }}
                    style={{
                      borderBottomLeftRadius: 0,
                      borderTopLeftRadius: 0,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="1x"
                      style={{ marginRight: 8 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Close Investigation',
                    })}
                  </Button>
                </Col>
              )}
              {data?.investigation.status === InvestigationStatus.Closed && (
                <Col>
                  <Button
                    onClick={() => {
                      confirm({
                        onOk() {
                          onReopenInvestigation();
                        },
                        title: intl.formatMessage({
                          defaultMessage:
                            'Do you want to reopen the investigation?',
                        }),
                      });
                    }}
                    style={{
                      borderBottomLeftRadius: 0,
                      borderTopLeftRadius: 0,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="1x"
                      style={{ marginRight: 8 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Reopen',
                    })}
                  </Button>
                </Col>
              )}
            </Row>
          }
          tabBarStyle={{ marginBottom: 0 }}
        >
          <Tabs.TabPane
            key="Dashboard"
            tab={<FormattedMessage defaultMessage="Details" />}
          >
            <ViewDetails
              componentRef={componentRef}
              data={data}
              investigationId={data?.investigation?.id || ''}
              loading={loading}
              onDeleteCrimeGroup={onDeleteCrimeGroup}
              onDeleteIncident={onDeleteIncident}
              onDeleteOffender={onDeleteOffender}
              onDeleteVehicle={onDeleteVehicle}
              saving={saving}
              setCompleteTodoVisible={setCompleteTodoVisible}
              setEditCrimeGroupData={setEditCrimeGroupData}
              setEditOffenderData={setEditOffenderData}
              setEditVehicleData={setEditVehicleData}
              setViewTodoVisible={setViewTodoVisible}
              templatesLoading={templatesLoading}
              toggleAddCrimeGroup={toggleAddCrimeGroup}
              toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
              toggleAddExistingIncident={toggleAddExistingIncident}
              toggleAddExistingOffender={toggleAddExistingOffender}
              toggleAddExistingVehicle={toggleAddExistingVehicle}
              toggleAddOffender={toggleAddOffender}
              toggleAddTodo={toggleAddTodo}
              toggleAddVehicle={toggleAddVehicle}
              toggleEditInvestigation={toggleEditInvestigation}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Flow"
            tab={
              <Typography.Text>
                <FormattedMessage defaultMessage="Flow Map" />
              </Typography.Text>
            }
          >
            <Flow importData={data} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Documents"
            tab={
              <Badge
                count={data?.investigation?.documents?.length || 0}
                offset={[8, 0]}
                showZero
                size="small"
              >
                <Typography.Text>
                  <FormattedMessage defaultMessage="Evidence" />
                </Typography.Text>
              </Badge>
            }
          >
            <DocumentsContainer
              data={data?.investigation?.documents}
              demId={demId}
              onDeleteDocument={onDeleteDocument}
              toggleAddDemDocument={toggleAddDemDocument}
              toggleAddDocument={toggleAddDocument}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      {/* details */}
      <Drawer
        onClose={toggleEditInvestigation}
        open={editInvestigation}
        title={
          <FormattedMessage defaultMessage="Update Investigation Details" />
        }
        width="500"
      >
        {editInvestigation ? (
          <EditInvestigation
            investigationData={{
              description: data?.investigation?.description,
              groupIds:
                data?.investigation?.groups.map((group) => group.id) || [],
              id: data?.investigation?.id || '',
              name: data?.investigation?.name,
            }}
            onClose={toggleEditInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* offenders */}
      <Drawer
        onClose={toggleAddExistingOffender}
        open={addExistingOffender}
        title={<FormattedMessage defaultMessage="Add Existing Offenders" />}
        width="1000"
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
            takeAllSchemes={takeAllSchemes}
            type={'multiple'}
            update={onAddExistingOffender}
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
            images={[]}
            investigationId={data?.investigation.id}
            onClose={toggleAddOffender}
            onCompleted={onCompletedAddOffender}
            update={updateAddOffenderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
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
            onClose={() => setEditOffenderData(null)}
            onCompleted={onCompletedEditOffender}
            update={updateEditOffenderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* vehicles */}
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleAddExistingVehicle}
        open={addExistingVehicle}
        title={<FormattedMessage defaultMessage="Add Existing Vehicles" />}
        width="800"
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            onClose={toggleAddExistingVehicle}
            takeAllSchemes={takeAllSchemes}
            update={(submitData) => onAddExistingVehicle(submitData.id)}
            vehicleIds={vehicleIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddVehicle}
        open={addVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        width="700"
        zIndex={999}
      >
        {addVehicle ? (
          <AddVehicleSimple onClose={toggleAddVehicle} update={onAddVehicle} />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={() => setEditVehicleData(null)}
        open={!!editVehicleData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle',
        })}
        width="800"
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicleSimple
            editData={editVehicleData}
            onClose={() => setEditVehicleData(null)}
            update={onEditVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* crime Group  */}
      <Drawer
        onClose={toggleAddExistingCrimeGroup}
        open={addExistingCrimeGroup}
        title={<FormattedMessage defaultMessage="Add Existing Crime Groups" />}
        width="800"
        zIndex={1001}
      >
        {addExistingCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={crimeGroupIds}
            onClose={toggleAddExistingCrimeGroup}
            takeAllSchemes={takeAllSchemes}
            update={(submitData) => onAddExistingCrimeGroup(submitData.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={toggleAddCrimeGroup}
        open={addCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Add New Crime Group',
        })}
        width="700"
        zIndex={999}
      >
        {addCrimeGroup ? (
          <AddCrimeGroup
            onClose={toggleAddCrimeGroup}
            update={onAddCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={() => setEditCrimeGroupData(null)}
        open={!!editCrimeGroupData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Crime Group',
        })}
        width="700"
      >
        {editCrimeGroupData ? (
          <EditCrimeGroup
            editData={editCrimeGroupData}
            onClose={() => setEditCrimeGroupData(null)}
            update={onEditCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* incident */}
      <Drawer
        onClose={toggleAddExistingIncident}
        open={addExistingIncident}
        title={<FormattedMessage defaultMessage="Add Existing incident" />}
        width="1000"
        zIndex={1001}
      >
        {addExistingIncident ? (
          <SelectIncidents
            incidentIds={incidentIds}
            onClose={toggleAddExistingIncident}
            takeAllSchemes={takeAllSchemes}
            update={onAddExistingIncident}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/*  document */}
      <Drawer
        onClose={toggleAddDocument}
        open={addDocument}
        title={<FormattedMessage defaultMessage="Add Document" />}
        width="800"
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocuments
            investigationId={data?.investigation?.id || ''}
            onClose={toggleAddDocument}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddDemDocument}
        open={addDemDocument}
        title={<FormattedMessage defaultMessage="Add DEM Document" />}
        width="800"
        zIndex={1001}
      >
        {addDemDocument ? (
          <AddEvidence
            investigationId={data?.investigation?.id || ''}
            onClose={toggleAddDemDocument}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* todo */}
      <Drawer
        onClose={toggleAddTodo}
        open={addTodo}
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        width="600"
      >
        {addTodo ? (
          <AddTodo
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
            investigationId={data?.investigation?.id}
            onClose={toggleAddTodo}
            update={updateTodoList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setCompleteTodoVisible(null)}
        open={completeTodoVisible !== null}
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        width={800}
      >
        {completeTodoVisible ? (
          <ViewTodo
            id={completeTodoVisible}
            onClose={() => setCompleteTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setViewTodoVisible(null)}
        open={!!viewTodoVisible}
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        width={800}
      >
        {viewTodoVisible ? (
          <ViewTodo
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
            })}
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* suggestedData after creating incident  */}

      <Drawer
        onClose={toggleCloseSuggestedOffenders}
        open={showSuggestedOffenders}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Offenders',
        })}
        width="900"
      >
        <MultiSelectOffenders
          handleAddSuggestion={onAddExistingOffenders}
          offenders={suggestedOffenders}
          onClose={toggleCloseSuggestedOffenders}
        />
      </Drawer>
      <Drawer
        onClose={toggleCloseSuggestedVehicles}
        open={showSuggestedVehicles}
        title={intl.formatMessage({
          defaultMessage: 'Suggested Vehicles',
        })}
        width="900"
      >
        <MultiSelectVehicles
          handleAddSuggestion={onAddExistingVehicles}
          onClose={toggleCloseSuggestedVehicles}
          vehicles={suggestedVehicles}
        />
      </Drawer>
      <Modal
        bodyStyle={{ borderRadius: 10 }}
        // zIndex={1010}
        cancelText={intl.formatMessage({
          defaultMessage: 'Close',
        })}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        onCancel={() => {
          toggleCloseSuggestedVehicles();
          toggleCloseSuggestedOffenders();
        }}
        open={
          (suggestedOffenders && suggestedOffenders.length > 0) ||
          (suggestedVehicles && suggestedVehicles.length > 0)
        }
        title={intl.formatMessage({
          defaultMessage:
            'Add suggested offenders and vehicles to the investigation?',
        })}
      >
        <Row gutter={16}>
          <Col>
            <Button
              disabled={suggestedOffenders?.length === 0}
              loading={saving}
              onClick={toggleShowSuggestedOffenders}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Suggested Offenders',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={suggestedVehicles?.length === 0}
              loading={saving}
              onClick={toggleShowSuggestedVehicles}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Suggested Vehicles',
              })}
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ViewInvestigation;
