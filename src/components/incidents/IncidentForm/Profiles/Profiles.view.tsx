/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Dropdown,
  Menu,
  Row,
  Typography,
  Form,
  Radio,
  Input,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
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
  hasVehicles: boolean;
  hasWitnesses: boolean;
  hasVictims: boolean;
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
  hasWitnesses,
  hasVehicles,
  hasVictims,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const offenders = Form.useWatch<StateOffenderData[]>('offenders', form);
  const vehicles = Form.useWatch<StateVehicleData[]>('vehicles', form);
  const witnessesInvolved = Form.useWatch<boolean>('witnessesInvolved', form);
  const victimInvolved = Form.useWatch<boolean>('victimInvolved', form);

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
      {hasVehicles && (
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
      )}
      {hasWitnesses && (
        <Form.Item
          name="witnessesInvolved"
          tooltip={intl.formatMessage({
            defaultMessage: 'Were there any witnesses of the incident?',
            id: 'U2hv4S',
          })}
          label={
            <Typography.Text>
              {intl.formatMessage({
                defaultMessage: 'Were any witnesses available?',
                id: 'skNn/T',
              })}
            </Typography.Text>
          }
          required
        >
          <Radio.Group
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Yes',
                  id: 'a5msuh',
                }),
                value: true,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'No',
                  id: 'oUWADl',
                }),
                value: false,
              },
            ]}
            optionType="button"
            disabled={saving}
          />
        </Form.Item>
      )}
      {witnessesInvolved && (
        <Form.List name="witnessDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row gutter={32}>
                  <Col key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Enter a name.' }]}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Full Name',
                          id: 'TemVby',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      name={[name, 'phone']}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Phone Number',
                          id: 'mXiD5u',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name={[name, 'email']}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Email Address',
                          id: 'xxQxLE',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col flex={1}>
                    <Form.Item
                      name={[name, 'description']}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Additional Information',
                          id: 'laUK3e',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        marginTop: i === 0 ? 30 : 0,
                      }}
                      onClick={() => remove(name)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button onClick={() => add()} block>
                      <FormattedMessage
                        id="cvzCJ9"
                        defaultMessage="Add Witness"
                      />
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
          name="victimInvolved"
          tooltip={intl.formatMessage({
            defaultMessage: 'Were the any victims involved in the incident',
            id: 'FfmoZL',
          })}
          label={
            <Typography.Text>
              {intl.formatMessage({
                defaultMessage: 'Where there any victims?',
                id: '17YFkp',
              })}
            </Typography.Text>
          }
          required
        >
          <Radio.Group
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Yes',
                  id: 'a5msuh',
                }),
                value: true,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'No',
                  id: 'oUWADl',
                }),
                value: false,
              },
            ]}
            optionType="button"
            disabled={saving}
          />
        </Form.Item>
      )}
      {victimInvolved && (
        <Form.List name="victimsDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row gutter={32}>
                  <Col key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Enter a name.' }]}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Full Name',
                          id: 'TemVby',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      name={[name, 'phone']}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Phone Number',
                          id: 'mXiD5u',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name={[name, 'email']}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Email Address',
                          id: 'xxQxLE',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col flex={1}>
                    <Form.Item
                      name={[name, 'description']}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Additional Information',
                          id: 'laUK3e',
                        })
                      }
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        marginTop: i === 0 ? 30 : 0,
                      }}
                      onClick={() => remove(name)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button onClick={() => add()} block>
                      <FormattedMessage
                        id="7oOoJb"
                        defaultMessage="Add Victim"
                      />
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
