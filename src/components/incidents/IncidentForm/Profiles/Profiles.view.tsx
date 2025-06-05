/* eslint-disable react/jsx-props-no-spreading */
import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { StateOffenderData } from './Offenders/useOffenders';
import type { StateVehicleData } from './Vehicles/useVehicles';

import Offenders from './Offenders/Offenders.view';
import useStyles from './Profiles.styles';
import Vehicles from './Vehicles/Vehicles.view';

const { Paragraph, Title } = Typography;

interface Props {
  addExistingOffenderOpen: boolean;
  addExistingVehicleOpen: boolean;
  addNewOffenderOpen: boolean;
  addNewVehicleOpen: boolean;
  form: FormInstance<FormData>;
  hasVictims: boolean;
  // hasVehicles: boolean;
  hasWitnesses: boolean;
  saving: boolean;
  toggleAddExisingVehicleOpen: () => void;
  toggleAddExistingOffenderOpen: () => void;
  toggleAddNewOffenderOpen: () => void;
  toggleAddNewVehicleOpen: () => void;
}

const Profiles = ({
  addExistingOffenderOpen,
  addExistingVehicleOpen,
  addNewOffenderOpen,
  addNewVehicleOpen,
  form,
  // hasVehicles,
  hasVictims,
  hasWitnesses,
  saving,
  toggleAddExisingVehicleOpen,
  toggleAddExistingOffenderOpen,
  toggleAddNewOffenderOpen,
  toggleAddNewVehicleOpen,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const offenders = Form.useWatch<StateOffenderData[]>('offenders', form);
  const vehicles = Form.useWatch<StateVehicleData[]>('vehicles', form);
  const witnessesInvolved = Form.useWatch<boolean>('witnessesInvolved', form);
  const victimInvolved = Form.useWatch<boolean>('victimInvolved', form);

  return (
    <>
      <Row align="middle" gutter={10}>
        <Col>
          <Title level={4} style={{ marginBottom: 0 }}>
            {intl.formatMessage({
              defaultMessage: 'Profiles',
            })}
          </Title>
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Paragraph style={{ marginBottom: 1 }} type="secondary">
            {intl.formatMessage({
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
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      key: '1',
                      label: intl.formatMessage({
                        defaultMessage: 'Add Existing Offender',
                      }),
                      onClick: () => toggleAddExistingOffenderOpen(),
                    },
                    {
                      icon: (
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      key: '2',
                      label: intl.formatMessage({
                        defaultMessage: 'Create New Offender',
                      }),
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
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      key: '1',
                      label: intl.formatMessage({
                        defaultMessage: 'Add Existing Vehicle',
                      }),
                      onClick: () => toggleAddExisingVehicleOpen(),
                    },
                    {
                      icon: (
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      key: '2',
                      label: intl.formatMessage({
                        defaultMessage: 'Create New Vehicle',
                      }),
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
                      })
                    )
                  ),
          },
        ]}
      >
        <Offenders
          addExistingOpen={addExistingOffenderOpen}
          addNewOpen={addNewOffenderOpen}
          form={form}
          saving={saving}
          toggleAddExistingOpen={toggleAddExistingOffenderOpen}
          toggleAddNewOpen={toggleAddNewOffenderOpen}
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
                      })
                    )
                  ),
          },
        ]}
      >
        <Vehicles
          addExistingOpen={addExistingVehicleOpen}
          addNewOpen={addNewVehicleOpen}
          form={form}
          saving={saving}
          toggleAddExistingOpen={toggleAddExisingVehicleOpen}
          toggleAddNewOpen={toggleAddNewVehicleOpen}
        />
      </Form.Item>
      {hasWitnesses && (
        <Form.Item
          label={
            <Typography.Text>
              {intl.formatMessage({
                defaultMessage: 'Were any witnesses available?',
              })}
            </Typography.Text>
          }
          name="witnessesInvolved"
          required
          tooltip={intl.formatMessage({
            defaultMessage: 'Were there any witnesses of the incident?',
          })}
        >
          <Radio.Group
            disabled={saving}
            optionType="button"
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Yes',
                }),
                value: true,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'No',
                }),
                value: false,
              },
            ]}
          />
        </Form.Item>
      )}
      {witnessesInvolved && (
        <Form.List name="witnessDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row gutter={32} key={key}>
                  <Col md={8} sm={12} span={24} xl={8}>
                    <Form.Item
                      {...restField}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Full Name',
                        })
                      }
                      name={[name, 'name']}
                      rules={[{ message: 'Enter a name.', required: true }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={12} span={24} xl={3}>
                    <Form.Item
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Phone Number',
                        })
                      }
                      name={[name, 'phone']}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={12} span={24} xl={4}>
                    <Form.Item
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Email Address',
                        })
                      }
                      name={[name, 'email']}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col lg={14} span={20} xl={7}>
                    <Form.Item
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Additional Information',
                        })
                      }
                      name={[name, 'description']}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={4} xl={1}>
                    <Button
                      onClick={() => remove(name)}
                      style={{
                        marginTop: i === 0 ? 30 : 0,
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button block onClick={() => add()}>
                      <FormattedMessage defaultMessage="Add Witness" />
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
      {hasVictims && (
        <Form.Item
          label={
            <Typography.Text>
              {intl.formatMessage({
                defaultMessage: 'Where there any victims?',
              })}
            </Typography.Text>
          }
          name="victimInvolved"
          required
          tooltip={intl.formatMessage({
            defaultMessage: 'Were the any victims involved in the incident',
          })}
        >
          <Radio.Group
            disabled={saving}
            optionType="button"
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Yes',
                }),
                value: true,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'No',
                }),
                value: false,
              },
            ]}
          />
        </Form.Item>
      )}
      {victimInvolved && (
        <Form.List name="victimsDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row gutter={32}>
                  <Col key={key} md={8} sm={12} span={24} xl={8}>
                    <Form.Item
                      {...restField}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Full Name',
                        })
                      }
                      name={[name, 'name']}
                      rules={[{ message: 'Enter a name.', required: true }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={12} span={24} xl={3}>
                    <Form.Item
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Phone Number',
                        })
                      }
                      name={[name, 'phone']}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={12} span={24} xl={4}>
                    <Form.Item
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Email Address',
                        })
                      }
                      name={[name, 'email']}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col lg={14} span={20} xl={7}>
                    <Form.Item
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Additional Information',
                        })
                      }
                      name={[name, 'description']}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={4} xl={1}>
                    <Button
                      onClick={() => remove(name)}
                      style={{
                        marginTop: i === 0 ? 30 : 0,
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button block onClick={() => add()}>
                      <FormattedMessage defaultMessage="Add Victim" />
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
    </>
  );
};
export default Profiles;
