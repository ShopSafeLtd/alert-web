import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import useStyles from '#/views/incidents/ViewIncident/ViewIncident.styles';
import { faBolt, faCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Descriptions, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Paragraph, Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  editAddress: boolean;
  editRights: boolean;
  loading: boolean;
}

const IncidentDetails = ({ data, loading }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card loading={loading}>
      <Row gutter={16}>
        <Col>
          <FontAwesomeIcon icon={faBolt} style={{ height: 24, width: 24 }} />
        </Col>
        <Col>
          <Title className={classes.headerTitle} level={4}>
            <FormattedMessage defaultMessage="AI Summary" />
          </Title>
        </Col>
      </Row>

      <Paragraph style={{ marginTop: 10 }}>
        {data?.incident.aiSummary}
      </Paragraph>

      {data?.incident.aiKeyObservations?.map((item) => (
        <Row
          align="middle"
          gutter={8}
          style={{ marginBottom: 12, paddingLeft: 10 }}
          wrap={false}
        >
          <Col>
            <FontAwesomeIcon icon={faCircle} size="2xs" />
          </Col>
          <Col flex={1}>
            <Paragraph style={{ marginBottom: 0 }}>{item}</Paragraph>
          </Col>
        </Row>
      ))}
      {data?.incident.aiMethod && (
        <Descriptions className={classes.desc} column={1}>
          <Descriptions.Item
            className={classes.detail}
            label={intl.formatMessage({
              defaultMessage: 'Incident MO',
            })}
          >
            {data?.incident.aiMO}
          </Descriptions.Item>

          <Descriptions.Item
            className={classes.detail}
            label={intl.formatMessage({
              defaultMessage: 'Theft Method',
            })}
          >
            {data?.incident.aiMethod}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};

export default IncidentDetails;
