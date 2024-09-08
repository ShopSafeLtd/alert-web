import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import formatAnswer from '#/utils/format-answer';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
}

const Answers = ({ data, loading }: Props) => {
  const intl = useIntl();

  const [pageSize, setPageSize] = useState(10);

  const togglePageSize = () => {
    setPageSize(pageSize === 10 ? 10_000 : 10);
  };

  const dataSource = useMemo(
    () =>
      data?.incident.answers
        .map((answer) => ({
          ...answer,
          dependentQuestions: answer.tagQuestion?.dependentQuestions,
        }))
        .filter((answer) => {
          if (
            answer.dependentQuestions &&
            answer.dependentQuestions.length > 0
          ) {
            const parent = data.incident.answers.find(
              (item) =>
                answer.dependentQuestions &&
                item.tagQuestion?.id ===
                  answer.dependentQuestions[0]?.tagQuestionId
            );

            return parent?.answer.toLowerCase() === answer.answer.toLowerCase();
          }

          return true;
        })
        .map((answer) => ({
          answer: formatAnswer(answer.answer, answer.type),
          key: answer.id,
          question: answer.tagQuestion?.question.question,
        })),
    [data]
  );

  return data?.incident && data.incident.answers.length > 0 ? (
    <Card loading={loading}>
      <Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Incident Details',
        })}
      </Title>
      <Table
        columns={[
          {
            dataIndex: 'question',
            filterSearch: (input, item) =>
              item.value.toString().includes(input),
            filters: dataSource?.map((answer) => ({
              text: answer.question ?? '',
              value: answer.question ?? '',
            })),
            key: 'question',
            onFilter: (value, record) => record.question === value,
            title: intl.formatMessage({ defaultMessage: 'Question' }),
          },
          {
            dataIndex: 'answer',
            key: 'answer',
            title: intl.formatMessage({ defaultMessage: 'Answer' }),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize,
          style: {
            display: 'none',
          },
        }}
        size="small"
      />
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col>
          <Button onClick={togglePageSize} size="small">
            <FormattedMessage
              defaultMessage="Show All {value1} Answers"
              values={{ value1: dataSource?.length }}
            />
          </Button>
        </Col>
      </Row>
    </Card>
  ) : (
    <div />
  );
};

export default Answers;
