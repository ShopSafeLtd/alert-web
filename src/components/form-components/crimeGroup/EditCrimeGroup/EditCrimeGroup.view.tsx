import React from 'react';
import type { FormInstance } from 'antd';
import { Drawer, Divider, Button, Col, Form, Input, Row } from 'antd';
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
          <Col span={23}>
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
        <Row gutter={30}>
          <Col>
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
                type="primary"
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
                  defaultMessage: 'Link Offender',
                  id: 'IWqg0R',
                })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {offendersData && offendersData.length > 0 ? (
          <div style={{ marginBottom: 50 }}>
            <Divider>
              {intl.formatMessage({
                defaultMessage: 'Offenders',
                id: 'xb54TN',
              })}
            </Divider>
            <OffenderTable
              offenders={offendersData}
              deleteRights
              onDeleteOffender={removeOffender}
            />
          </div>
        ) : null}
        <Row gutter={30} style={{ marginTop: 10 }}>
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
                  defaultMessage: 'Link Vehicle',
                  id: 'y26r3B',
                })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {vehiclesData && vehiclesData.length > 0 ? (
          <div style={{ marginBottom: 50 }}>
            <Divider>
              {intl.formatMessage({
                defaultMessage: 'Vehicles',
                id: 'r6wuJ3',
              })}
            </Divider>
            <VehicleTable
              vehicles={vehiclesData}
              onDeleteVehicle={removeVehicle}
              saving={saving}
              deleteRights
            />
          </div>
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
          defaultMessage: 'Link Offenders',
          id: 'UhSUQG',
        })}
        visible={linkOffender}
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
          defaultMessage: 'Link Vehicles',
          id: 'rmI5oX',
        })}
        visible={linkVehicle}
        width="800"
        onClose={toggleLinkVehicle}
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
