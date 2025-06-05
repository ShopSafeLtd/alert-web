/* eslint-disable react/jsx-props-no-spreading */
import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  TimePicker,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Title } = Typography;

interface Props {
  form: FormInstance<FormData>;
  policeReporting: boolean;
  saving: boolean;
}
interface CCTVRecord {
  aheadBehind?: string;
  cameraNumber: string;
  correctTime: boolean;
  description: string;
  endTime: Date;
  incorrectBy?: number;
  showFace: boolean;
  showIncident: boolean;
  startTime: Date;
}

interface FormValues {
  cctv?: CCTVRecord[];
}
const IncidentCCTV = ({ form, policeReporting, saving }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const cctvAvailable = Form.useWatch('cctvAvailable', form);

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'CCTV Evidence',
            })}
          </Title>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Is CCTV of the incident available?',
            })}
            name="cctvAvailable"
            required
            tooltip={intl.formatMessage({
              defaultMessage:
                'Is there any cctv footage of the incident available',
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
        </Col>
        {cctvAvailable && policeReporting && (
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Email address police can use to obtain CCTV',
              })}
              name="policeCCTVEmail"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please answer this question.',
                  }),
                  required: policeReporting,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The email address that the police can use to obtain CCTV evidence from the business, this will normally be you store address or the address for your SOC.',
              })}
            >
              <Input style={{ width: 350 }} />
            </Form.Item>
          </Col>
        )}
      </Row>
      {cctvAvailable && (
        <Form.List name="cctv">
          {(fields, { add, remove }) => (
            <>
              <Row gutter={[16, 16]} style={{ marginBottom: 20 }} wrap>
                {fields.map(({ key, name, ...restField }) => (
                  <Col xs={24} xxl={12}>
                    <div className={classes.cctvCard}>
                      <Row
                        style={{ marginBottom: 10, padding: '15px 15px' }}
                        wrap={false}
                      >
                        <Col flex={1}>
                          <Typography.Title
                            level={4}
                            style={{ marginBottom: 5 }}
                          >
                            <FormattedMessage
                              defaultMessage="CCTV Record {var1}"
                              values={{ var1: key + 1 }}
                            />
                          </Typography.Title>
                          <Typography.Text strong>
                            <FormattedMessage defaultMessage="Please use the date and time of the CCTV system for start and end times." />
                          </Typography.Text>
                        </Col>
                        <Col>
                          <Button onClick={() => remove(name)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Col>
                      </Row>
                      <Row gutter={16} style={{ padding: '0 15px' }}>
                        <Col key={key} sm={10} span={24} xxl={10}>
                          <Form.Item
                            {...restField}
                            label={intl.formatMessage({
                              defaultMessage: 'Camera Number',
                            })}
                            name={[name, 'cameraNumber']}
                            rules={[
                              { message: 'Camera Number', required: true },
                            ]}
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col md={6} span={24} xxl={6}>
                          <Form.Item
                            {...restField}
                            label={intl.formatMessage({
                              defaultMessage: 'Start Time',
                            })}
                            name={[name, 'startTime']}
                            rules={[{ message: 'Start Time', required: true }]}
                          >
                            <TimePicker style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col md={6} span={24} xxl={6}>
                          <Form.Item
                            {...restField}
                            label={intl.formatMessage({
                              defaultMessage: 'End Time',
                            })}
                            name={[name, 'endTime']}
                            rules={[{ message: 'End Time', required: true }]}
                          >
                            <TimePicker style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col md={4} span={12} xxl={6}>
                          <Form.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Shows Incident',
                            })}
                            name={[name, 'showIncident']}
                            tooltip={intl.formatMessage({
                              defaultMessage:
                                'Does the footage show the incident occur?',
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
                        </Col>
                        <Col md={5} span={12} xxl={6}>
                          <Form.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Shows suspects face',
                            })}
                            name={[name, 'showFace']}
                            tooltip={intl.formatMessage({
                              defaultMessage:
                                'Does the footage show the suspects face?',
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
                        </Col>
                        <Col md={4} span={24} xxl={6}>
                          <Form.Item
                            label={intl.formatMessage({
                              defaultMessage: 'Correct Time',
                            })}
                            name={[name, 'correctTime']}
                            tooltip={intl.formatMessage({
                              defaultMessage: 'Is the cctv time accurate?',
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
                        </Col>
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) => {
                            const prevCctv =
                              ((prevValues as FormValues).cctv || [])[name] ||
                              {};
                            const currCctv =
                              ((currentValues as FormValues).cctv || [])[
                                name
                              ] || {};
                            return (
                              prevCctv.correctTime !== currCctv.correctTime
                            );
                          }}
                        >
                          {({ getFieldValue }) => {
                            // Type-cast getFieldValue to ensure correctTime is boolean | undefined
                            const correctTime = getFieldValue([
                              'cctv',
                              name,
                              'correctTime',
                            ]) as boolean | undefined;
                            // If correctTime is true or not yet set, do not render the extra fields.
                            if (correctTime || correctTime === undefined) {
                              return null;
                            }
                            return (
                              <Col sm={10} span={24} xxl={24}>
                                <Row gutter={16} style={{ padding: '0 15px' }}>
                                  <Col xxl={8}>
                                    <Form.Item
                                      label={intl.formatMessage({
                                        defaultMessage: 'Ahead/Behind',
                                      })}
                                      name={[name, 'aheadBehind']}
                                      rules={[
                                        {
                                          message: intl.formatMessage({
                                            defaultMessage:
                                              'Please select Ahead or Behind',
                                          }),
                                          required: true,
                                        },
                                      ]}
                                    >
                                      <Select>
                                        <Select.Option value="ahead">
                                          {intl.formatMessage({
                                            defaultMessage: 'Ahead',
                                          })}
                                        </Select.Option>
                                        <Select.Option value="behind">
                                          {intl.formatMessage({
                                            defaultMessage: 'Behind',
                                          })}
                                        </Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col xxl={8}>
                                    <Form.Item
                                      label={intl.formatMessage({
                                        defaultMessage:
                                          'Incorrect By (minutes)',
                                      })}
                                      name={[name, 'incorrectBy']}
                                      rules={[
                                        {
                                          message: intl.formatMessage({
                                            defaultMessage:
                                              'Please input the number of minutes',
                                          }),
                                          required: true,
                                        },
                                        {
                                          validator: (_, value) => {
                                            if (
                                              value === undefined ||
                                              value === null
                                            ) {
                                              return Promise.resolve();
                                            }
                                            return Number.isInteger(value)
                                              ? Promise.resolve()
                                              : Promise.reject(
                                                  new Error(
                                                    intl.formatMessage({
                                                      defaultMessage:
                                                        'Please enter a whole number',
                                                    })
                                                  )
                                                );
                                          },
                                        },
                                      ]}
                                    >
                                      <InputNumber
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
                            );
                          }}
                        </Form.Item>
                        <Col span={24} xxl={24}>
                          <Form.Item
                            {...restField}
                            label={intl.formatMessage({
                              defaultMessage:
                                'Please describe the recordings content',
                            })}
                            name={[name, 'description']}
                          >
                            <Input.TextArea />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}
              </Row>
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button block onClick={() => add()}>
                      <FormattedMessage defaultMessage="Add CCTV Evidence" />
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
    </Card>
  );
};

export default IncidentCCTV;
