import { Button, Drawer, Dropdown, Menu, Tabs, Typography } from 'antd';
import TabbedView from 'components/TabbedView';
import React from 'react';
import { PageHeader } from 'components/layout-components/AntD';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';
import AddExistingOffender from 'components/form-components/Investigation/AddExistingOffender';
import AddExistingVehicle from 'components/form-components/Investigation/AddExistingVehicle';
import LinkIncident from 'components/form-components/Investigation/AddIncident/LinkIncident.container';
import AddExistingCrimeGroup from 'components/form-components/Investigation/AddExistingCrimeGroup';
import { createUseStyles } from 'react-jss';
import { ViewInvestigationQuery } from '../../../graphql/generated';
import Flow from './views/Flow/Flow.container';
import ViewDetails from './views/Details';

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
  crimeGroupIds: string[];
  incidentIds: string[];
}

const useStyles = createUseStyles({
  sideListContent: {
    padding: 15,
    height: '100vh',
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
}: Props) => {
  const classes = useStyles();

  return (
    <TabbedView style={{ height: 'calc((100vh - 98px)' }}>
      <div style={{ overflow: 'hidden' }} className={classes.sideListContent}>
        <PageHeader
          title={data?.investigation?.name}
          display
          noTranslate
          actions={[
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: 'Add Offenders',
                      key: '1',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      // disabled: !listOffendersData?.listOffenders?.total,
                      onClick: () => toggleAddExistingOffender(),
                    },
                  ]}
                />
              }
            >
              <Button
                key="3"
                type="primary"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Offenders
              </Button>
            </Dropdown>,
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: 'Add Vehicles',
                      key: '1',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      // disabled: !listVehiclesData?.listVehicles.total,
                      onClick: () => toggleAddExistingVehicle(),
                    },
                  ]}
                />
              }
            >
              <Button
                key="2"
                type="primary"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Vehicles
              </Button>
            </Dropdown>,
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: 'Add Crime Group',
                      key: '1',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      // disabled: !listVehiclesData?.listVehicles.total,
                      onClick: () => toggleAddExistingCrimeGroup(),
                    },
                  ]}
                />
              }
            >
              <Button
                key="2"
                type="primary"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Crime groups
              </Button>
            </Dropdown>,
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: 'Add Incident',
                      key: '1',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      // disabled: !listVehiclesData?.listVehicles.total,
                      onClick: () => toggleAddExistingIncident(),
                    },
                  ]}
                />
              }
            >
              <Button
                key="2"
                type="primary"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Incidents
              </Button>
            </Dropdown>,
          ]}
        />
        <Tabs>
          <Tabs.TabPane key="Dashboard" tab="Details">
            <ViewDetails investigationId={data?.investigation?.id || ''} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Flow"
            tab={<Typography.Text>Flow Map</Typography.Text>}
          >
            <Flow importData={data} />
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
    </TabbedView>
  );
};

export default ViewInvestigation;
