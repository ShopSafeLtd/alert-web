import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  PageHeader,
  Row,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { CrimeGroupQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import AddExistingOffender from 'components/form-components/crimeGroup/offender/AddExistingOffender';
import AddNewOffender from 'components/form-components/crimeGroup/offender/AddNewOffender';
import AddVehicle from 'components/form-components/crimeGroup/vehicle/AddVehicle';
import AddExistingVehicle from 'components/form-components/crimeGroup/vehicle/AddExistingVehicle';
import AddAlias from 'components/form-components/crimeGroup/Alias';
import useStyles from './ViewCrimeGroup.styles';

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
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <PageHeader
        onBack={() => window.history.back()}
        title={`Reference: ${
          data?.crimeGroup?.reference ? data?.crimeGroup?.reference : ''
        }`}
        subTitle={`-- ${data?.crimeGroup?.alias}`}
        extra={[
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: 'Add Existing Offenders',
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
                  {
                    label: 'Create New Offender',
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
                    label: 'Add Existing Vehicles',
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
                  {
                    label: 'Create New Vehicle',
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
              key="2"
              type="primary"
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
            >
              Vehicles
            </Button>
          </Dropdown>,
          <Button
            key="4"
            type="primary"
            onClick={() => toggleAddAlias()}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            Alias
          </Button>,
          <Button
            key="1"
            type="primary"
            disabled={saving}
            // style={{ color: 'red' }}
            onClick={() => {
              confirm({
                title: 'Do you want to delete the crime group?',
                content: 'This action cannot be undone.',
                onOk() {
                  onDeleteCrimeGroup();
                },
              });
            }}
            icon={<FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />}
          >
            Delete Crime Group
          </Button>,
        ]}
      />

      <Card loading={loading}>
        <Row gutter={64}>
          <Col>
            <Statistic
              title="Total Incidents"
              value={data?.crimeGroup?.totalIncidents || 0}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Offenders"
              value={data?.crimeGroup?.totalOffenders || 0}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Lost value"
              value={`£${data?.crimeGroup?.totalValue || 0}`}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Recovered value"
              value={`£${data?.crimeGroup?.totalRecoveredValue || 0}`}
            />
          </Col>
          <Col>
            <Statistic
              title="Theft Success Rate"
              value={`${data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0}%`}
            />
          </Col>
        </Row>
      </Card>

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
            data?.crimeGroup?.offenders.map((offender) => ({
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
            data?.crimeGroup?.incidents?.map((incident) => ({
              key: incident?.id,
              reference: incident?.reference,
              policeRef: incident?.policeRef,
              subject: incident?.subject,
              date: incident?.dayTime,
              location: incident?.createdBy.businesses[0]?.name,
              value: incident?.value,
              recoveredValue: incident?.recoveredValue,
            })) || []
          }
        />
      </Card>
      {/* offeder */}
      <Drawer
        title="Add New Offender"
        visible={addOffender}
        width="600"
        onClose={toggleAddOffender}
        zIndex={1001}
      >
        {addOffender ? <AddNewOffender onClose={toggleAddOffender} /> : <div />}
      </Drawer>
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
      {/* vehicle */}
      <Drawer
        title="Add New Vehicle"
        visible={addNewVehicle}
        width="600"
        onClose={toggleAddNewVehicle}
      >
        {addNewVehicle ? <AddVehicle onClose={toggleAddNewVehicle} /> : <div />}
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
        title="Add New Alias"
        visible={addAlias}
        width="600"
        onClose={toggleAddAlias}
      >
        {addAlias ? <AddAlias onClose={toggleAddAlias} /> : <div />}
      </Drawer>
    </div>
  );
};

export default ViewCrimeGroup;
