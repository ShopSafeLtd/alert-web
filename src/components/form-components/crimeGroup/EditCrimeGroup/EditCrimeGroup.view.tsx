import React from 'react';
import type { FormInstance } from 'antd';
import { Card, Drawer, Button, Col, Form, Input, Row } from 'antd';
import { useIntl } from 'react-intl';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import VehicleTable from 'components/tables/VehicleTable';
import OffenderTable from 'components/tables/OffenderTable';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import type { FormData } from './useEditCrimeGroup';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving?: boolean;
  form: FormInstance<FormData>;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  offendersData: OffenderData[];
  vehiclesData: VehicleData[];
  updateOffendersList: (value: OffenderData) => void;
  removeOffender: (value: string | undefined) => void;
  linkVehicle: boolean;
  toggleLinkVehicle: () => void;
  updateVehiclesList: (value: VehicleData) => void;
  removeVehicle: (value: string | undefined) => void;
  editData: CrimeGroupCardData | undefined | null;
}

const EditCrimeGroup = ({
  onClose,
  onSubmit,
  saving,
  form,
  offendersData,
  vehiclesData,
  linkVehicle,
  linkOffender,
  toggleLinkVehicle,
  toggleLinkOffender,
  updateVehiclesList,
  updateOffendersList,
  removeOffender,
  removeVehicle,
  editData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div>
      <Form<FormData>
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        initialValues={{
          alias: editData?.alias || '',
          offenders: editData?.offenders,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="alias"
              label={intl.formatMessage({
                defaultMessage: 'Alias',
                id: 'Ri9jA7',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="offenders"
              label={intl.formatMessage({
                defaultMessage: 'Select Offenders',
                id: 'nNFHrE',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select offenders for the crime group.',
                id: '39isw9',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Select at least one offender for the crime group.',
                    id: '1rVQVU',
                  }),
                },
              ]}
            >
              <Button
                danger
                type="ghost"
                onClick={toggleLinkOffender}
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
              >
                {intl.formatMessage({
                  defaultMessage: 'Select Offender',
                  id: '8e5n4o',
                })}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="offenders"
              label={intl.formatMessage({
                defaultMessage: 'Select Vehicles',
                id: '4Cza+w',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select vehicle for the crime group.',
                id: 'VQYGSJ',
              })}
            >
              <Button
                danger
                type="ghost"
                onClick={toggleLinkVehicle}
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
              >
                {intl.formatMessage({
                  defaultMessage: 'Select Vehicle',
                  id: 'tnv+4a',
                })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {offendersData && offendersData.length > 0 ? (
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Offenders',
              id: 'xb54TN',
            })}
            bodyStyle={{ padding: 0 }}
            style={{ marginTop: 10 }}
          >
            <OffenderTable
              offenders={offendersData}
              deleteRights
              onDeleteOffender={removeOffender}
            />
          </Card>
        ) : null}

        {vehiclesData && vehiclesData.length > 0 ? (
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Vehicles',
              id: 'r6wuJ3',
            })}
            headStyle={{ marginBottom: 5 }}
            bodyStyle={{ padding: 0, paddingLeft: 5 }}
            style={{ marginTop: 20 }}
          >
            <VehicleTable
              vehicles={vehiclesData}
              onDeleteVehicle={removeVehicle}
              saving={saving}
              deleteRights
            />
          </Card>
        ) : null}
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                {intl.formatMessage({
                  defaultMessage: 'Save',
                  id: 'jvo0vs',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Select Offenders',
          id: 'nNFHrE',
        })}
        open={linkOffender}
        width="800"
        onClose={toggleLinkOffender}
      >
        {linkOffender ? (
          <LinkOffender
            update={updateOffendersList}
            onClose={toggleLinkOffender}
            offenderIds={offendersData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Select Vehicles',
          id: '4Cza+w',
        })}
        open={linkVehicle}
        width="800"
        onClose={toggleLinkVehicle}
        bodyStyle={{ overflow: 'hidden' }}
      >
        {linkVehicle ? (
          <LinkVehicle
            update={updateVehiclesList}
            onClose={toggleLinkVehicle}
            vehicleIds={vehiclesData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default EditCrimeGroup;
