import React from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Modal,
  PageHeader,
  Row,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { VehicleQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import EditVehicle from 'components/form-components/Vehicle/EditVehicle';
import moment from 'moment';
import useStyles from './ViewVehicle.styles';

const { Title } = Typography;
const { confirm } = Modal;

interface Props {
  data: VehicleQuery | undefined;
  loading: boolean;
  editVehicle: boolean;
  toggleEditVehicle: () => void;
  saving: boolean;
  onDeleteVehicle: () => void;
}

const ViewVehicle = ({
  data,
  loading,
  saving,
  editVehicle,
  toggleEditVehicle,
  onDeleteVehicle,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <PageHeader
        onBack={() => window.history.back()}
        title={data?.vehicle?.make}
        subTitle={`--${data?.vehicle?.registration}`}
        extra={[
          <Button
            key="2"
            disabled={saving}
            onClick={toggleEditVehicle}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faPenToSquare}
                style={{ marginRight: 5 }}
              />
            }
          >
            Edit Vehicle
          </Button>,
          <Button
            key="1"
            disabled={saving}
            onClick={() => {
              confirm({
                title: 'Do you want to delete the vehicle?',
                content: 'This action cannot be undone.',
                onOk() {
                  onDeleteVehicle();
                },
              });
            }}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faTrash}
                style={{ marginRight: 5 }}
              />
            }
          >
            Delete Vehicle
          </Button>,
        ]}
      />
      <Row gutter={20}>
        {(data?.vehicle?.colour ||
          data?.vehicle?.model ||
          data?.vehicle?.updatedAt) && (
          <Col span={12}>
            <Card loading={loading}>
              <Descriptions contentStyle={{ fontSize: 16 }} column={2}>
                {/* <Descriptions.Item label="Make">
                {data?.vehicle?.make}
              </Descriptions.Item> */}

                {data?.vehicle?.colour && (
                  <Descriptions.Item label="Colour">
                    {data?.vehicle?.colour}
                  </Descriptions.Item>
                )}
                {data?.vehicle?.model && (
                  <Descriptions.Item label="Model">
                    {data?.vehicle?.model}
                  </Descriptions.Item>
                )}

                {data?.vehicle?.updatedAt && (
                  <Descriptions.Item label="UpdatedAt">
                    {moment(data.vehicle.updatedAt || moment()).format(
                      `ddd MMM DD YYYY - HH:mm`
                    )}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
        )}
        <Col flex={1}>
          <Card loading={loading}>
            <Row gutter={64}>
              {/* {data?.vehicle?.colour && (
                <Col>
                  <Statistic title="Colour" value={data?.vehicle?.colour} />
                </Col>
              )}
              {data?.vehicle?.model && (
                <Col>
                  <Statistic title="Model" value={data?.vehicle?.model} />
                </Col>
              )} */}
              <Col>
                <Statistic
                  title="Total Incidents"
                  value={data?.vehicle?.totalIncidents || 0}
                />
              </Col>
              <Col>
                <Statistic
                  title="Total Offenders"
                  value={data?.vehicle?.totalOffenders || 0}
                />
              </Col>
              <Col>
                <Statistic
                  title="Total Crime Groups"
                  value={data?.vehicle?.totalCrimeGroups || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

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
            data?.vehicle?.offenders.map((offender) => ({
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
            data?.vehicle?.incidents?.map((incident) => ({
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
      <Drawer
        title="Edit Vehicle Details"
        visible={editVehicle}
        width="600"
        onClose={toggleEditVehicle}
      >
        {editVehicle ? <EditVehicle onClose={toggleEditVehicle} /> : <div />}
      </Drawer>
    </div>
  );
};

export default ViewVehicle;
