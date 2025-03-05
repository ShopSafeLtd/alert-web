import { useStoreState } from '#/state';
import {
  type AiSuggestionsQueryVariables,
  useAiSuggestionsQuery,
} from '#/views/ai/ai-centre/components/AiSuggestions/__generated__/AiSuggestions.generated';
import { Button, Card, Col, Row, Typography } from 'antd';
import { AiSuggestionStatus, AiSuggestionType, SortOrder } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AiTrends = () => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const variables: AiSuggestionsQueryVariables = {
    orderBy: [
      {
        createdAt: SortOrder.Desc,
      },
    ],
    take: 4,
    where: {
      schemeIds: [currentScheme],
      status: [AiSuggestionStatus.Open],
      type: [AiSuggestionType.TrendGlobal],
    },
  };

  const { data } = useAiSuggestionsQuery({
    variables,
  });

  return (
    <>
      <Row
        align="middle"
        style={{
          marginBottom: 20,
        }}
      >
        <Col flex={1}>
          <Typography.Title
            level={3}
            style={{
              marginBottom: 0,
            }}
          >
            <FormattedMessage defaultMessage="Identfied Trends" />
          </Typography.Title>
        </Col>
        <Col>
          <Button type="text">
            <FormattedMessage defaultMessage="View All Trends" />
          </Button>
        </Col>
      </Row>

      {data?.aiSuggestions.edges.map((item) => (
        <Card
          bodyStyle={{
            cursor: 'pointer',
            paddingLeft: 20,
            paddingRight: 20,
          }}
          key={item.node.id}
        >
          <Typography.Title level={4} style={{ marginBottom: 6 }}>
            {item.node.title}
          </Typography.Title>
          <Typography.Text style={{ marginBottom: 0 }} type="secondary">
            {item.node.description}
          </Typography.Text>
        </Card>
      ))}
    </>
  );
};

export default AiTrends;
