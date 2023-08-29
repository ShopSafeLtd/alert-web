import type { FormInstance } from 'antd';
import { Card, Col, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import useStyles from '../../AddIncident.styles';
import type { FormData } from '../../useAddIncident';
import { PoliceResponseTime } from '../../../../../graphql/generated';

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
              id: 'eMpXMz',
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
              id: 'hLeud7',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Was this incident reported to the police?',
              id: 'dVzhQl',
            })}
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
          {reported && (
            <Form.Item
              name="policeInvolved"
              tooltip={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident.',
                id: '367usW',
              })}
              label={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident?',
                id: 'GV2eOn',
              })}
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
        </Col>

        {reported && (
          <Col>
            <Form.Item
              name="policeRef"
              label={intl.formatMessage({
                defaultMessage: 'Crime Ref No.',
                id: 'lXj6/P',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The crime reference number provided by the police.',
                id: 'tMiPZU',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item
              name="policeNo"
              label={intl.formatMessage({
                defaultMessage: 'Officer Collar No.',
                id: '6gfZFu',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The collar number of the officers involved in this incident.',
                id: 'erIvhR',
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
                id: '295SEC',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The time taken for the police to respond to the incident.',
                id: 'Vl3fFa',
              })}
            >
              <Select
                disabled={saving}
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 1 Hour',
                      id: '8AuLcF',
                    }),
                    value: PoliceResponseTime.Within_1Hour,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 3 Hours',
                      id: 'PC4uKW',
                    }),
                    value: PoliceResponseTime.Within_3Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 12 Hours',
                      id: 'WRZ8qN',
                    }),
                    value: PoliceResponseTime.Within_12Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 24 Hours',
                      id: 'UQjcxS',
                    }),
                    value: PoliceResponseTime.Within_24Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Over 24 Hours',
                      id: 'X1GAcj',
                    }),
                    value: PoliceResponseTime.Over_24Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No Response',
                      id: 'cM1axi',
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
