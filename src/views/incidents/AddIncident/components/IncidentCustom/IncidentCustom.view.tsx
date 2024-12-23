import type { CustomQuestion } from 'types/DataType';

import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';
import CustomQuestions from './CustomQuestion.view';

const { Paragraph, Title } = Typography;

interface Props {
  questions: CustomQuestion[];
  saving: boolean;
}

const IncidentCustom = ({ questions, saving }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Incident Data',
            })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            italic
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
          >
            {intl.formatMessage({
              defaultMessage: '- Complete all required fields.',
            })}
          </Paragraph>
        </Col>
      </Row>
      <CustomQuestions disabled={saving} questions={questions} />
    </Card>
  );
};

export default IncidentCustom;
