import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import { Card, Col, Form, Input, Radio, Row, Select, Typography } from 'antd';
import { PoliceResponseTime } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Title } = Typography;

interface Props {
  form: FormInstance<FormData>;
  saving: boolean;
}

const IncidentPolice = ({ form, saving }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const reported = Form.useWatch('policeReported', form);

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Police involvement',
            })}
          </Title>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Was this incident reported to the police?',
            })}
            name="policeReported"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'The incident has been reported to the police',
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
          {reported && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident?',
              })}
              name="policeInvolved"
              tooltip={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident.',
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
        </Col>

        {reported && (
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Crime Ref No.',
              })}
              name="policeRef"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The crime reference number provided by the police.',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Officer Collar No.',
              })}
              name="policeNo"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The collar number of the officers involved in this incident.',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {reported && (
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Police Response Time',
              })}
              name="policeResponse"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The time taken for the police to respond to the incident.',
              })}
            >
              <Select
                disabled={saving}
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 1 Hour',
                    }),
                    value: PoliceResponseTime.Within_1Hour,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 3 Hours',
                    }),
                    value: PoliceResponseTime.Within_3Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 12 Hours',
                    }),
                    value: PoliceResponseTime.Within_12Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 24 Hours',
                    }),
                    value: PoliceResponseTime.Within_24Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Over 24 Hours',
                    }),
                    value: PoliceResponseTime.Over_24Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No Response',
                    }),
                    value: PoliceResponseTime.NoResponse,
                  },
                ]}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default IncidentPolice;
