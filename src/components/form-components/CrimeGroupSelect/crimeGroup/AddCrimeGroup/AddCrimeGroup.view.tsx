import type { FormInstance } from 'antd';
import type { OffenderData, VehicleData } from 'types/DataType';

import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Form, Input, Row } from 'antd';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import LinkOffender from 'components/form-components/offender/AddExistingOffender';
import OffenderTable from 'components/tables/OffenderTable';
import VehicleTable from 'components/tables/VehicleTable';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddCrimeGroup';

interface Props {
  form: FormInstance<FormData>;
  linkOffender: boolean;
  linkVehicle: boolean;
  offendersData: OffenderData[];
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  removeOffender: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  saving?: boolean;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehiclesList: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
}

const AddCrimeGroup = ({
  form,
  linkOffender,
  linkVehicle,
  offendersData,
  onClose,
  onSubmit,
  removeOffender,
  removeVehicle,
  saving,
  toggleLinkOffender,
  toggleLinkVehicle,
  updateOffendersList,
  updateVehiclesList,
  vehiclesData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div>
      <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Alias',
              })}
              name="alias"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Select Offenders',
              })}
              name="offenders"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Select at least one offender for the crime group.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select offenders for the crime group.',
              })}
            >
              <Button
                danger
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
                onClick={toggleLinkOffender}
                type="ghost"
              >
                {intl.formatMessage({
                  defaultMessage: 'Select Offender',
                })}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Select Vehicles',
              })}
              name="offenders"
              tooltip={intl.formatMessage({
                defaultMessage: 'Select vehicle for the crime group.',
              })}
            >
              <Button
                danger
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
                onClick={toggleLinkVehicle}
                type="ghost"
              >
                {intl.formatMessage({
                  defaultMessage: 'Select Vehicle',
                })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {offendersData && offendersData.length > 0 ? (
          <Card
            bodyStyle={{ padding: 0 }}
            style={{ marginTop: 10 }}
            title={intl.formatMessage({
              defaultMessage: 'Offenders',
            })}
          >
            <OffenderTable
              deleteRights
              offenders={offendersData}
              onDeleteOffender={removeOffender}
            />
          </Card>
        ) : null}

        {vehiclesData && vehiclesData.length > 0 ? (
          <Card
            bodyStyle={{ padding: 0, paddingLeft: 5 }}
            headStyle={{ marginBottom: 5 }}
            style={{ marginTop: 20 }}
            title={intl.formatMessage({
              defaultMessage: 'Vehicles',
            })}
          >
            <VehicleTable
              deleteRights
              onDeleteVehicle={removeVehicle}
              saving={saving}
              vehicles={vehiclesData}
            />
          </Card>
        ) : null}
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Select Offenders',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={offendersData.map(({ id }) => id)}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleLinkVehicle}
        open={linkVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Select Vehicles',
        })}
        width="800"
      >
        {linkVehicle ? (
          <LinkVehicle
            onClose={toggleLinkVehicle}
            update={updateVehiclesList}
            vehicleIds={vehiclesData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default AddCrimeGroup;
