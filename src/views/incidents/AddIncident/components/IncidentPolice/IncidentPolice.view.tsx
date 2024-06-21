import type { FormInstance } from 'antd';
import { Card, Col, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import useStyles from '../../AddIncident.styles';
import type { FormData } from '../../useAddIncident';
import { PoliceResponseTime } from 'graphql/types';

const { Title } = Typography;

interface Props {
  saving: boolean;
  form: FormInstance<FormData>;
}

const IncidentPolice = ({ saving, form }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const reported = Form.useWatch('policeReported', form);

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'Police involvement',
            })}
          </Title>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            name="policeReported"
            tooltip={intl.formatMessage({
              defaultMessage: 'The incident has been reported to the police',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Was this incident reported to the police?',
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
          {reported && (
            <Form.Item
              name="policeInvolved"
              tooltip={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident.',
              })}
              label={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident?',
              })}
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
          )}
        </Col>

        {reported && (
          <Col>
            <Form.Item
              name="policeRef"
              label={intl.formatMessage({
                defaultMessage: 'Crime Ref No.',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The crime reference number provided by the police.',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item
              name="policeNo"
              label={intl.formatMessage({
                defaultMessage: 'Officer Collar No.',
              })}
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
              name="policeResponse"
              label={intl.formatMessage({
                defaultMessage: 'Police Response Time',
              })}
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
