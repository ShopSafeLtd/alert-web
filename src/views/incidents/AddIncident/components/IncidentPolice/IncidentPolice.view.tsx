import { Card, Col, Form, Input, Radio, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import useStyles from '../../AddIncident.styles';

const { Title } = Typography;

interface Props {
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  saving: boolean;
}

const IncidentPolice = ({ formStages, saving }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card
      className={classes.card}
      style={{ opacity: formStages.police ? 1 : 0.7 }}
    >
      {!formStages.police && <div className={classes.cardOverlay} />}
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
        </Col>

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
      </Row>
    </Card>
  );
};

export default IncidentPolice;
