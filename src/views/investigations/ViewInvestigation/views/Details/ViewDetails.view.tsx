import React from 'react';
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Menu,
  PageHeader,
  Table,
  Typography,
} from 'antd';
import { ViewInvestigationQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';
import AddExistingOffender from 'components/form-components/Investigation/AddExistingOffender';
import AddExistingVehicle from 'components/form-components/Investigation/AddExistingVehicle';
import LinkIncident from 'components/form-components/Investigation/AddIncident/LinkIncident.container';

import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import useStyles from './ViewDetails.styles';
import AddExistingCrimeGroup from '../../../../../components/form-components/Investigation/AddExistingCrimeGroup';

const { Title } = Typography;
interface Props {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;
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

const ViewInvestigation = ({
  data,
  loading,
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
    <div className={classes.page}>
      <PageHeader
        extra={[
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
      <Card loading={loading}>
        <Title level={4}>Offenders</Title>
        <Table
          columns={[
            {
              key: 'reference',
              dataIndex: 'reference',
              title: 'Reference',
            },
            {
              key: 'name',
              dataIndex: 'name',
              title: 'Name',
            },
            {
              key: 'totalIncidents',
              dataIndex: 'totalIncidents',
              title: 'Total Incidents',
            },
          ]}
          size="small"
          dataSource={
            data?.investigation?.offenders.map((offender) => ({
              key: offender.id,
              reference: offender.reference,
              name: offender.name,
              totalIncidents: offender.totalIncidents,
            })) || []
          }
        />
      </Card>

      <Card loading={loading}>
        <Title level={4}>Incidents</Title>
        <Table
          columns={[
            {
              key: 'reference',
              dataIndex: 'reference',
              title: 'Reference',
            },
            {
              key: 'policeRef',
              dataIndex: 'policeRef',
              title: 'Crime No.',
            },
            {
              key: 'subject',
              dataIndex: 'subject',
              title: 'Subject',
            },
            {
              key: 'date',
              dataIndex: 'date',
              title: 'Date',
            },
            {
              key: 'location',
              dataIndex: 'location',
              title: 'Location',
            },
            {
              key: 'value',
              dataIndex: 'value',
              title: 'Value',
            },
            {
              key: 'recoveredValue',
              dataIndex: 'recoveredValue',
              title: 'Recovered Value',
            },
          ]}
          size="small"
          dataSource={
            data?.investigation?.incidents?.map((incident) => ({
              key: incident?.id,
              reference: incident?.reference,
              policeRef: incident?.policeRef,
              subject: incident?.subject,
              date: incident?.dayTime,
              location: incident?.createdBy.organisation,
              value: incident?.value,
              recoveredValue: incident?.recoveredValue,
            })) || []
          }
        />
      </Card>
      <Card loading={loading}>
        <Table
          dataSource={data?.investigation?.vehicles.map((vehicle) => ({
            key: vehicle.id,
            make: vehicle.make,
            colour: vehicle.colour,
            model: vehicle.model,
            registration: vehicle.registration,
            updatedAt: vehicle.updatedAt,
            totalCrimeGroup: vehicle.totalCrimeGroups,
            totalOffenders: vehicle.totalOffenders,
            totalIncidents: vehicle.totalIncidents,
          }))}
          loading={loading}
          size="small"
          onRow={(record) => ({
            onClick: () => <Link to={`view/${record.key}`} />,
          })}
          columns={[
            {
              key: 'make',
              dataIndex: 'make',
              title: 'Make',
            },
            {
              key: 'updatedAt',
              dataIndex: 'updatedAt',
              title: 'UpdatedAt',
              render: (value) =>
                moment(value || moment()).format(`ddd MMM DD YYYY - HH:mm`),
            },
            {
              key: 'colour',
              dataIndex: 'colour',
              title: 'Colour',
              // render: (value) => `£${value || 0}`,
            },
            {
              key: 'model',
              dataIndex: 'model',
              title: 'Model',
              // render: (value) => `£${value || 0}`,
            },
            {
              key: 'totalOffenders',
              dataIndex: 'totalOffenders',
              title: 'Members',
            },
            {
              key: 'totalIncidents',
              dataIndex: 'totalIncidents',
              title: 'Incidents',
            },
            {
              key: 'totalCrimeGroups',
              dataIndex: 'totalCrimeGroups',
              title: 'Crime Groups',
            },
            {
              key: 'registration',
              dataIndex: 'registration',
              title: 'Registration',
              // render: (value) => `${value?.toFixed(0) || 0}%`,
            },
            // {
            //   key: 'crimeGroup',
            //   dataIndex: 'crimeGroup',
            //   title: 'crimeGroup',
            //   render: (value,item) => `${item.crimeGroup.}%`,
            // },
          ]}
        />
      </Card>
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
    </div>
  );
};

export default ViewInvestigation;
