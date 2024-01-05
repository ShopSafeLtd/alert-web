import React from 'react';
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
import { createUseStyles } from 'react-jss';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import { faBell, faBellSlash, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';
import ViewTodo from 'components/form-components/Todos/ViewTodo/Todo.container';
import AddTodo from 'components/form-components/Todos/AddTodo';
import type { MutationUpdaterFn } from '@apollo/client';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import AddVehicleSimple from 'components/form-components/Vehicle/AddVehicleSimple';
import AddNewOffenderSimple from 'components/form-components/offender/offender/AddNewOffenderSimple';
import SimpleEditOffender from 'components/form-components/offender/offender/SimpleEditOffender';
import EditVehicleSimple from 'components/form-components/Vehicle/EditVehicleSimple';
import AddCrimeGroup from 'components/form-components/crimeGroup/AddCrimeGroup';
import EditCrimeGroup from 'components/form-components/crimeGroup/EditCrimeGroup';
import MultiSelectOffenders from 'components/investigations/MultiSelectOffenders';
import MultiSelectVehicles from 'components/investigations/MultiSelectVehicles';
import EditInvestigation from 'components/form-components/Investigation/EditInvestigation';
import SelectIncidents from 'components/form-components/linkOptions/SelectIncidents';
import SelectedOffenders from 'components/form-components/linkOptions/SelectOffenders';
import type {
  CreateTodoMutation,
  QuestionGroupOnSchemeQuery,
  UpdateTaskMutation,
  ViewInvestigationQuery,
} from '../../../graphql/generated';
import Flow from './views/Flow/Flow.container';
import ViewDetails from './views/Details';
import DocumentsContainer from './views/Documents/Documents.container';
import AddDocument from '../../../components/form-components/documents/AddDocument';
import AddEvidence from '../../../components/form-components/documents/AddEvidence';

const { confirm } = Modal;

interface Props {
  data: ViewInvestigationQuery | undefined;
  offenderIds: string[];
  vehicleIds: string[];
  toggleAddDocument: () => void;
  addDocument: boolean;
  toggleAddDemDocument: () => void;
  addDemDocument: boolean;
  crimeGroupIds: string[];
  incidentIds: string[];
  demId: string | undefined | null;
  toggleSubscribe: () => void;
  takeAllSchemes: boolean;
  addTodo: boolean;
  toggleAddTodo: () => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  viewTodoVisible: string | null;
  setViewTodoVisible: (value: string | null) => void;
  completeTodoVisible: string | null;
  setCompleteTodoVisible: (value: string | null) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  addOffender: boolean;
  addExistingOffender: boolean;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  editOffenderData: OffenderData | null;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  addVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleData: VehicleData | null;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  addCrimeGroup: boolean;
  addExistingCrimeGroup: boolean;
  toggleAddCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  editCrimeGroupData: CrimeGroupCardData | null;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  onDeleteCrimeGroup: (id: string) => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  onAddExistingOffender: (value: string[]) => void;
  onAddExistingVehicle: (value: string) => void;
  onAddExistingCrimeGroup: (value: string) => void;
  onAddExistingIncident: (value: string[]) => void;
  onAddOffender: (value: OffenderData) => void;
  onEditOffender: (value: OffenderData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onEditVehicle: (value: VehicleData) => void;
  onAddCrimeGroup: (value: CrimeGroupCardData) => void;
  onEditCrimeGroup: (value: CrimeGroupCardData) => void;
  onDeleteIncident: (id: string) => void;
  saving: boolean;
  loading: boolean;
  onDeleteInvestigation: () => void;
  suggestedOffenders: OffenderData[] | undefined;
  suggestedVehicles: VehicleData[] | undefined;
  toggleCloseSuggestedOffenders: () => void;
  toggleCloseSuggestedVehicles: () => void;
  onAddExistingOffenders: (value: string[]) => void;
  onAddExistingVehicles: (value: string[]) => void;
  showSuggestedVehicles: boolean;
  showSuggestedOffenders: boolean;
  toggleShowSuggestedVehicles: () => void;
  toggleShowSuggestedOffenders: () => void;
  editInvestigation: boolean;
  toggleEditInvestigation: () => void;
}

const useStyles = createUseStyles({
  sideListContent: {
    height: '100vh',
    // paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 0,
    paddingRight: 0,
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
  },
});

const ViewInvestigation = ({
  loading,
  data,
  demId,
  offenderIds,
  vehicleIds,
  incidentIds,
  crimeGroupIds,
  addDemDocument,
  toggleAddDocument,
  addDocument,
  toggleAddDemDocument,
  toggleSubscribe,
  takeAllSchemes,
  addTodo,
  toggleAddTodo,
  templatesData,
  templatesLoading,
  setViewTodoVisible,
  setCompleteTodoVisible,
  completeTodoVisible,
  viewTodoVisible,
  updateTodo,
  updateTodoList,
  addOffender,
  addExistingOffender,
  toggleAddOffender,
  toggleAddExistingOffender,
  editOffenderData,
  setEditOffenderData,
  onDeleteOffender,
  addVehicle,
  addExistingVehicle,
  toggleAddVehicle,
  toggleAddExistingVehicle,
  editVehicleData,
  setEditVehicleData,
  onDeleteVehicle,
  addCrimeGroup,
  addExistingCrimeGroup,
  toggleAddCrimeGroup,
  toggleAddExistingCrimeGroup,
  editCrimeGroupData,
  setEditCrimeGroupData,
  addExistingIncident,
  toggleAddExistingIncident,
  onAddExistingOffender,
  onAddExistingVehicle,
  onAddExistingCrimeGroup,
  onAddExistingIncident,
  onAddOffender,
  onEditOffender,
  onAddVehicle,
  onEditVehicle,
  onAddCrimeGroup,
  onEditCrimeGroup,
  onDeleteCrimeGroup,
  onDeleteIncident,
  onDeleteInvestigation,
  saving,
  suggestedOffenders,
  suggestedVehicles,
  onAddExistingOffenders,
  onAddExistingVehicles,
  toggleCloseSuggestedOffenders,
  toggleCloseSuggestedVehicles,
  showSuggestedVehicles,
  showSuggestedOffenders,
  toggleShowSuggestedVehicles,
  toggleShowSuggestedOffenders,
  editInvestigation,
  toggleEditInvestigation,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div style={{ height: '100vh' }}>
      <div className={classes.sideListContent}>
        <Tabs
          tabBarExtraContent={
            <Row gutter={8} style={{ margin: 3 }}>
              <Col>
                <Tooltip
                  title={
                    data?.investigation?.subscribed
                      ? intl.formatMessage({
                          defaultMessage:
                            'Stop getting notified about updates.',
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
                    type="ghost"
                    // type="text"
                    color={
                      data?.investigation?.subscribed ? undefined : 'danger'
                    }
                  >
                    <FontAwesomeIcon
                      size="1x"
                      style={{ marginRight: 8 }}
                      icon={
                        data?.investigation?.subscribed ? faBellSlash : faBell
                      }
                    />
                    {data?.investigation?.subscribed
                      ? intl.formatMessage({
                          defaultMessage: 'Un-follow Updates',
                          id: '45gIlS',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Follow Updates',
                          id: 'gBN+ok',
                        })}
                  </Button>
                </Tooltip>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    confirm({
                      title: intl.formatMessage({
                        defaultMessage:
                          'Do you want to delete the investigation?',
                        id: '6U5FpD',
                      }),
                      content: intl.formatMessage({
                        defaultMessage: 'This action cannot be undone.',
                        id: 'JDJoIZ',
                      }),
                      onOk() {
                        onDeleteInvestigation();
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
                    defaultMessage: 'Delete Investigation',
                    id: 'ONMazI',
                  })}
                </Button>
              </Col>
            </Row>
          }
        >
          <Tabs.TabPane
            key="Dashboard"
            tab={<FormattedMessage defaultMessage="Details" id="Lv0zJu" />}
          >
            <ViewDetails
              data={data}
              loading={loading}
              toggleAddOffender={toggleAddOffender}
              toggleAddExistingOffender={toggleAddExistingOffender}
              setEditOffenderData={setEditOffenderData}
              onDeleteOffender={onDeleteOffender}
              toggleAddVehicle={toggleAddVehicle}
              toggleAddExistingVehicle={toggleAddExistingVehicle}
              setEditVehicleData={setEditVehicleData}
              onDeleteVehicle={onDeleteVehicle}
              toggleAddCrimeGroup={toggleAddCrimeGroup}
              toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
              setEditCrimeGroupData={setEditCrimeGroupData}
              onDeleteCrimeGroup={onDeleteCrimeGroup}
              toggleAddExistingIncident={toggleAddExistingIncident}
              onDeleteIncident={onDeleteIncident}
              saving={saving}
              toggleAddTodo={toggleAddTodo}
              investigationId={data?.investigation?.id || ''}
              templatesLoading={templatesLoading}
              setViewTodoVisible={setViewTodoVisible}
              setCompleteTodoVisible={setCompleteTodoVisible}
              toggleEditInvestigation={toggleEditInvestigation}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Flow"
            tab={
              <Typography.Text>
                <FormattedMessage defaultMessage="Flow Map" id="Xq/6U0" />
              </Typography.Text>
            }
          >
            <Flow importData={data} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Documents"
            tab={
              <Badge
                offset={[8, 0]}
                size="small"
                count={data?.investigation?.documents?.length || 0}
                showZero
              >
                <Typography.Text>
                  <FormattedMessage defaultMessage="Evidence" id="6g7+6N" />
                </Typography.Text>
              </Badge>
            }
          >
            <DocumentsContainer
              demId={demId}
              data={data?.investigation?.documents}
              toggleAddDemDocument={toggleAddDemDocument}
              toggleAddDocument={toggleAddDocument}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      {/* details */}
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Update Investigation Details"
            id="6lYiJV"
          />
        }
        open={editInvestigation}
        width="500"
        onClose={toggleEditInvestigation}
      >
        {editInvestigation ? (
          <EditInvestigation
            onClose={toggleEditInvestigation}
            investigationData={{
              id: data?.investigation?.id || '',
              name: data?.investigation?.name,
              description: data?.investigation?.description,
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* offenders */}
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing Offenders"
            id="1FbM4r"
          />
        }
        open={addExistingOffender}
        width="1000"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <SelectedOffenders
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
            update={onAddExistingOffender}
            takeAllSchemes={takeAllSchemes}
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
            images={[]}
          />
        ) : (
          <div />
        )}
      </Drawer>
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
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* vehicles */}
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing Vehicles"
            id="goP1s6"
          />
        }
        open={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
        bodyStyle={{ overflow: 'hidden' }}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            update={(submitData) => onAddExistingVehicle(submitData.id)}
            onClose={toggleAddExistingVehicle}
            vehicleIds={vehicleIds}
            takeAllSchemes={takeAllSchemes}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
          id: 'cHbTr7',
        })}
        open={addVehicle}
        width="700"
        zIndex={999}
        onClose={toggleAddVehicle}
      >
        {addVehicle ? (
          <AddVehicleSimple update={onAddVehicle} onClose={toggleAddVehicle} />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle',
          id: 'X/6z9r',
        })}
        open={!!editVehicleData}
        width="800"
        onClose={() => setEditVehicleData(null)}
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicleSimple
            editData={editVehicleData}
            update={onEditVehicle}
            onClose={() => setEditVehicleData(null)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* crime Group  */}
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing Crime Groups"
            id="3HDZC+"
          />
        }
        open={addExistingCrimeGroup}
        width="800"
        onClose={toggleAddExistingCrimeGroup}
        zIndex={1001}
      >
        {addExistingCrimeGroup ? (
          <LinkCrimeGroup
            update={(submitData) => onAddExistingCrimeGroup(submitData.id)}
            crimeGroupIds={crimeGroupIds}
            onClose={toggleAddExistingCrimeGroup}
            takeAllSchemes={takeAllSchemes}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Crime Group',
          id: 'Ya+GhB',
        })}
        open={addCrimeGroup}
        width="700"
        zIndex={999}
        onClose={toggleAddCrimeGroup}
      >
        {addCrimeGroup ? (
          <AddCrimeGroup
            update={onAddCrimeGroup}
            onClose={toggleAddCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Crime Group',
          id: 'uK1ewV',
        })}
        open={!!editCrimeGroupData}
        width="700"
        onClose={() => setEditCrimeGroupData(null)}
      >
        {editCrimeGroupData ? (
          <EditCrimeGroup
            editData={editCrimeGroupData}
            update={onEditCrimeGroup}
            onClose={() => setEditCrimeGroupData(null)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* incident */}
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing incident"
            id="1GC81u"
          />
        }
        open={addExistingIncident}
        width="1000"
        onClose={toggleAddExistingIncident}
        zIndex={1001}
      >
        {addExistingIncident ? (
          <SelectIncidents
            incidentIds={incidentIds}
            onClose={toggleAddExistingIncident}
            update={onAddExistingIncident}
            takeAllSchemes={takeAllSchemes}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/*  document */}
      <Drawer
        title={<FormattedMessage defaultMessage="Add Document" id="r9vGqd" />}
        open={addDocument}
        width="800"
        onClose={toggleAddDocument}
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocument
            investigationId={data?.investigation?.id || ''}
            onClose={toggleAddDocument}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={
          <FormattedMessage defaultMessage="Add DEM Document" id="gDnUVp" />
        }
        open={addDemDocument}
        width="800"
        onClose={toggleAddDemDocument}
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
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
          id: 'VOiupa',
        })}
        open={addTodo}
        width="600"
        onClose={toggleAddTodo}
      >
        {addTodo ? (
          <AddTodo
            update={updateTodoList}
            onClose={toggleAddTodo}
            investigationId={data?.investigation?.id}
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
          id: '8fwjt4',
        })}
        open={completeTodoVisible !== null}
        width={800}
        onClose={() => setCompleteTodoVisible(null)}
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
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
          id: 'swvNLe',
        })}
        open={!!viewTodoVisible}
        width={800}
        onClose={() => setViewTodoVisible(null)}
      >
        {viewTodoVisible ? (
          <ViewTodo
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
              id: 'Z6L1UV',
            })}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* suggestedData after creating incident  */}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Offenders',
          id: '5UuihT',
        })}
        open={showSuggestedOffenders}
        onClose={toggleCloseSuggestedOffenders}
        width="900"
      >
        <MultiSelectOffenders
          offenders={suggestedOffenders}
          onClose={toggleCloseSuggestedOffenders}
          handleAddSuggestion={onAddExistingOffenders}
        />
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Vehicles',
          id: 'fzU5Bx',
        })}
        open={showSuggestedVehicles}
        onClose={toggleCloseSuggestedVehicles}
        width="900"
      >
        <MultiSelectVehicles
          vehicles={suggestedVehicles}
          onClose={toggleCloseSuggestedVehicles}
          handleAddSuggestion={onAddExistingVehicles}
        />
      </Drawer>
      <Modal
        bodyStyle={{ borderRadius: 10 }}
        open={
          (suggestedOffenders && suggestedOffenders.length > 0) ||
          (suggestedVehicles && suggestedVehicles.length > 0)
        }
        // zIndex={1010}
        cancelText={intl.formatMessage({
          defaultMessage: 'Close',
          id: 'rbrahO',
        })}
        onCancel={() => {
          toggleCloseSuggestedVehicles();
          toggleCloseSuggestedOffenders();
        }}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        title={intl.formatMessage({
          defaultMessage:
            'Add suggested offenders and vehicles to the investigation?',
          id: 'zYlYqu',
        })}
      >
        <Row gutter={16}>
          <Col>
            <Button
              loading={saving}
              disabled={suggestedOffenders?.length === 0}
              onClick={toggleShowSuggestedOffenders}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Suggested Offedners',
                id: 'IuW3g5',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              disabled={suggestedVehicles?.length === 0}
              onClick={toggleShowSuggestedVehicles}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Suggested Vehicles',
                id: 'Tl5uyE',
              })}
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ViewInvestigation;
