import type { ViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';

import useStyles from '#/views/incidents/ViewIncident/ViewIncident.styles';
import { faBolt, faCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Descriptions, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Paragraph, Title } = Typography;

interface Props {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  toggleAiDrawer: () => void;
}

const IncidentDetails = ({ data, loading, toggleAiDrawer }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card loading={loading} style={{ marginBottom: 0 }}>
      <Row gutter={16}>
        <Col>
          <FontAwesomeIcon icon={faBolt} style={{ height: 24, width: 24 }} />
        </Col>
        <Col>
          <Title className={classes.headerTitle} level={4}>
            <FormattedMessage defaultMessage="AI Analysis" />
          </Title>
        </Col>
      </Row>

      <Paragraph style={{ marginTop: 10 }}>
        {data?.offender.aiSummary}
      </Paragraph>

      {data?.offender.aiKeyObservations?.map((item) => (
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
      {data?.offender.aiMethods && (
        <Descriptions className={classes.desc} column={1}>
          <Descriptions.Item
            className={classes.detail}
            label={intl.formatMessage({
              defaultMessage: 'Theft Methods Used',
            })}
          >
            {data?.offender.aiMethods.toString()}
          </Descriptions.Item>
        </Descriptions>
      )}
      <Row justify="center" style={{ marginTop: 10 }}>
        <Col>
          <Button onClick={toggleAiDrawer}>
            <FormattedMessage defaultMessage="View AI Report" />
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default IncidentDetails;
