import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { CustomQuestion } from 'types/DataType';

import { Card, Col, type FormInstance, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';
import CustomQuestions from './CustomQuestion.view';

const { Paragraph, Title } = Typography;

interface Props {
  form: FormInstance<FormData>;
  questions: CustomQuestion[];
  saving: boolean;
}

const IncidentCustom = ({ form, questions, saving }: Props) => {
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
      <CustomQuestions disabled={saving} form={form} questions={questions} />
    </Card>
  );
};

export default IncidentCustom;
