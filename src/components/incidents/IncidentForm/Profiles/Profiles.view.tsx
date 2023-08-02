import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Dropdown, Menu, Row, Typography, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';
import useStyles from './Profiles.styles';
import Offenders from './Offenders/Offenders.view';
import Vehicles from './Vehicles/Vehicles.view';
import type { StateOffenderData } from './Offenders/useOffenders';
import type { StateVehicleData } from './Vehicles/useVehicles';

const { Title, Paragraph } = Typography;

interface Props {
  addNewOffenderOpen: boolean;
  addExistingOffenderOpen: boolean;
  addNewVehicleOpen: boolean;
  addExistingVehicleOpen: boolean;
  toggleAddNewOffenderOpen: () => void;
  toggleAddExistingOffenderOpen: () => void;
  toggleAddNewVehicleOpen: () => void;
  toggleAddExisingVehicleOpen: () => void;
  saving: boolean;
  form: FormInstance<FormData>;
}

const Profiles = ({
  addExistingVehicleOpen,
  saving,
  toggleAddExisingVehicleOpen,
  toggleAddNewVehicleOpen,
  addNewVehicleOpen,
  toggleAddExistingOffenderOpen,
  toggleAddNewOffenderOpen,
  addNewOffenderOpen,
  addExistingOffenderOpen,
  form,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const offenders = Form.useWatch<StateOffenderData[]>('offenders', form);
  const vehicles = Form.useWatch<StateVehicleData[]>('vehicles', form);

  return (
    <>
      <Row gutter={10} align="middle">
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {intl.formatMessage({
              id: '2zJXeA',
              defaultMessage: 'Profiles',
            })}
          </Title>
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Paragraph style={{ marginBottom: 1 }} type="secondary">
            {intl.formatMessage({
              id: 'nrfzug',
              defaultMessage:
                '- Add any offenders or vehicles that were involved in the incident.',
            })}
          </Paragraph>
        </Col>
        {offenders && offenders.length > 0 && (
          <Col>
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: intl.formatMessage({
                        id: 'w4XD3a',
                        defaultMessage: 'Add Existing Offender',
                      }),
                      key: '1',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      onClick: () => toggleAddExistingOffenderOpen(),
                    },
                    {
                      label: intl.formatMessage({
                        id: '58ir77',
                        defaultMessage: 'Create New Offender',
                      }),
                      key: '2',
                      icon: (
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      onClick: () => toggleAddNewOffenderOpen(),
                    },
                  ]}
                />
              }
            >
              <Button
                className={classes.redButton}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                {intl.formatMessage({
                  id: 'aWGZ8c',
                  defaultMessage: 'Add More Offenders',
                })}
              </Button>
            </Dropdown>
          </Col>
        )}

        {vehicles && vehicles.length > 0 && (
          <Col>
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: intl.formatMessage({
                        id: '0Q9dlW',
                        defaultMessage: 'Add Existing Vehicle',
                      }),
                      key: '1',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      onClick: () => toggleAddExisingVehicleOpen(),
                    },
                    {
                      label: intl.formatMessage({
                        id: 'xiAZxN',
                        defaultMessage: 'Create New Vehicle',
                      }),
                      key: '2',
                      icon: (
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      onClick: () => toggleAddNewVehicleOpen(),
                    },
                  ]}
                />
              }
            >
              <Button
                className={classes.redButton}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                {intl.formatMessage({
                  id: 'b6R/zF',
                  defaultMessage: 'Add More Vehicles',
                })}
              </Button>
            </Dropdown>
          </Col>
        )}
      </Row>

      <Form.Item
        name="offenders"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      intl.formatMessage({
                        defaultMessage:
                          'Select how many offenders were involved',
                        id: 'FIjsE1',
                      })
                    )
                  ),
          },
        ]}
      >
        <Offenders
          addExistingOpen={addExistingOffenderOpen}
          addNewOpen={addNewOffenderOpen}
          toggleAddNewOpen={toggleAddNewOffenderOpen}
          toggleAddExistingOpen={toggleAddExistingOffenderOpen}
          saving={saving}
          form={form}
        />
      </Form.Item>
      <Form.Item
        name="vehicles"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      intl.formatMessage({
                        defaultMessage:
                          'Select how many vehicles were involved',
                        id: 'KEkfC4',
                      })
                    )
                  ),
          },
        ]}
      >
        <Vehicles
          addExistingOpen={addExistingVehicleOpen}
          addNewOpen={addNewVehicleOpen}
          toggleAddNewOpen={toggleAddNewVehicleOpen}
          toggleAddExistingOpen={toggleAddExisingVehicleOpen}
          saving={saving}
          form={form}
        />
      </Form.Item>
    </>
  );
};
export default Profiles;
