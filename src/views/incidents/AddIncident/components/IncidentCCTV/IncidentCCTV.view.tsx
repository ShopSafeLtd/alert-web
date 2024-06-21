/* eslint-disable react/jsx-props-no-spreading */
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Typography,
  TimePicker,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import useStyles from '../../AddIncident.styles';
import type { FormData } from '../../useAddIncident';

const { Title } = Typography;

interface Props {
  saving: boolean;
  form: FormInstance<FormData>;
}

const IncidentCCTV = ({ saving, form }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const cctvAvailable = Form.useWatch('cctvAvailable', form);

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'CCTV Evidence',
            })}
          </Title>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            name="cctvAvailable"
            tooltip={intl.formatMessage({
              defaultMessage:
                'Is there any cctv footage of the incident available',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Is CCTV available?',
            })}
            required
          >
            <Radio.Group
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
              optionType="button"
              disabled={saving}
            />
          </Form.Item>
        </Col>
      </Row>
      {cctvAvailable && (
        <Form.List name="cctv">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row gutter={32}>
                  <Col key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'cameraNumber']}
                      rules={[{ required: true, message: 'Camera Number' }]}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Camera Number',
                        })
                      }
                    >
                      <Input style={{ width: 200 }} />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      name={[name, 'showIncident']}
                      tooltip={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage:
                            'Does the footage show the incident occur?',
                        })
                      }
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Shows Incident',
                        })
                      }
                    >
                      <Radio.Group
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
                        optionType="button"
                        disabled={saving}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name={[name, 'showFace']}
                      tooltip={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage:
                            'Does the footage show the suspects face?',
                        })
                      }
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Shows suspects face',
                        })
                      }
                    >
                      <Radio.Group
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
                        optionType="button"
                        disabled={saving}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...restField}
                      name={[name, 'startTime']}
                      rules={[{ required: true, message: 'Start Time' }]}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'Start Time',
                        })
                      }
                    >
                      <TimePicker style={{ width: 150 }} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...restField}
                      name={[name, 'endTime']}
                      rules={[{ required: true, message: 'End Time' }]}
                      label={
                        i === 0 &&
                        intl.formatMessage({
                          defaultMessage: 'End Time',
                        })
                      }
                    >
                      <TimePicker style={{ width: 150 }} />
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
