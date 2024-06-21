import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Col, Row, Typography } from 'antd';
import type { CustomQuestion } from 'types/DataType';
import useStyles from '../../AddIncident.styles';
import CustomQuestions from './CustomQuestion.view';

const { Title, Paragraph } = Typography;

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
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'Incident Data',
            })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            {intl.formatMessage({
              defaultMessage: '- Complete all required fields.',
            })}
          </Paragraph>
        </Col>
      </Row>
      <CustomQuestions questions={questions} disabled={saving} />
    </Card>
  );
};

export default IncidentCustom;
