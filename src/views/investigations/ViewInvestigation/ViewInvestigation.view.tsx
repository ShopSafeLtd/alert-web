import React from 'react';
import { Badge, Drawer, Tabs, Typography } from 'antd';
import AddExistingOffender from 'components/form-components/Investigation/AddExistingOffender';
import AddExistingVehicle from 'components/form-components/Investigation/AddExistingVehicle';
import LinkIncident from 'components/form-components/Investigation/AddIncident/LinkIncident.container';
import AddExistingCrimeGroup from 'components/form-components/Investigation/AddExistingCrimeGroup';
import { createUseStyles } from 'react-jss';
import { ViewInvestigationQuery } from '../../../graphql/generated';
import Flow from './views/Flow/Flow.container';
import ViewDetails from './views/Details';
import DocumentsContainer from './views/Documents/Documents.container';
import AddDocument from '../../../components/form-components/documents/AddDocument';
import AddEvidence from '../../../components/form-components/documents/AddEvidence';

interface Props {
  data: ViewInvestigationQuery | undefined;
  offenderIds: string[];
  vehicleIds: string[];
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addExistingVehicle: boolean;
  toggleAddExistingVehicle: () => void;
  addExistingCrimeGroup: boolean;
  toggleAddExistingCrimeGroup: () => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  toggleAddDemDocument: () => void;
  addDemDocument: boolean;
  crimeGroupIds: string[];
  incidentIds: string[];
  demId: string | undefined | null;
}

const useStyles = createUseStyles({
  sideListContent: {
    height: '100vh',
    paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 0,
    paddingRight: 0,

    '& .no-padding': {
      padding: 0,
    },
  },
});

const ViewInvestigation = ({
  data,
  demId,
  offenderIds,
  vehicleIds,
  incidentIds,
  crimeGroupIds,
  addExistingOffender,
  toggleAddExistingOffender,
  addExistingVehicle,
  toggleAddExistingVehicle,
  addExistingCrimeGroup,
  toggleAddExistingCrimeGroup,
  addExistingIncident,
  toggleAddExistingIncident,
  addDemDocument,
  toggleAddDocument,
  addDocument,
  toggleAddDemDocument,
}: Props) => {
  const classes = useStyles();

  return (
    <div style={{ height: 'calc((100vh - 98px)' }}>
      <div style={{ overflow: 'hidden' }} className={classes.sideListContent}>
        <Tabs>
          <Tabs.TabPane key="Dashboard" tab="Details">
            <ViewDetails
              toggleAddExistingOffender={toggleAddExistingOffender}
              toggleAddExistingIncident={toggleAddExistingIncident}
              toggleAddExistingVehicle={toggleAddExistingVehicle}
              investigationId={data?.investigation?.id || ''}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Flow"
            tab={<Typography.Text>Flow Map</Typography.Text>}
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
                <Typography.Text>Evidence</Typography.Text>
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
      <Drawer
        title="Add Existing Offenders"
        visible={addExistingOffender}
        width="800"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Add Existing Vehicles"
        visible={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <AddExistingVehicle
            vehicleIds={vehicleIds}
            onClose={toggleAddExistingVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Add Existing Crime Groups"
        visible={addExistingCrimeGroup}
        width="800"
        onClose={toggleAddExistingCrimeGroup}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <AddExistingCrimeGroup
            crimeGroupIds={crimeGroupIds}
            onClose={toggleAddExistingCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Add Existing incident"
        visible={addExistingIncident}
        width="800"
        onClose={toggleAddExistingIncident}
        zIndex={1001}
      >
        {addExistingIncident ? (
          <LinkIncident
            incidentIds={incidentIds}
            onClose={toggleAddExistingIncident}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Add Evidence"
        visible={addDocument}
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
        title="Import DEM Evidence"
        visible={addDemDocument}
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
    </div>
  );
};

export default ViewInvestigation;
