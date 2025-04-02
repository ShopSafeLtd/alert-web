import AiVisionMatchCard from '#/components/ai-vision/AiVisionMatchCard.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import VisionMatchDrawer from '#/views/vision/vision-centre/components/VisionMatchDrawer/VisionMatchDrawer.view';
import { useAiVisionMatchesQuery } from '#/views/vision/vision-centre/components/VisionMatches/__generated__/VisionMatches.generated';
import { faFilter, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Input, Row, Skeleton, Typography } from 'antd';
import { AiVisionMatchConfidence, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const VisionMatches = () => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [search, setSearch] = useState('');
  const [matchId, setMatchId] = React.useState<null | string>(null);

  const onDrawerClose = () => {
    setMatchId(null);
  };

  const intl = useIntl();

  const { data, loading, refetch } = useAiVisionMatchesQuery({
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      take: 50,
      where: {
        confidenceRating: [
          AiVisionMatchConfidence.Medium,
          AiVisionMatchConfidence.High,
        ],
        schemeIds: [currentScheme],
        search,
      },
    },
  });

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <div style={{ padding: 20 }}>
      <Row align="middle" gutter={8} style={{ marginBottom: 10, width: '40%' }}>
        <Col flex={1}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            <FormattedMessage defaultMessage="Matches Detected" />
          </Typography.Title>
        </Col>
        <Col>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button disabled={loading} onClick={handleRefresh} type="text">
            <FontAwesomeIcon icon={faRefresh} size="lg" />
          </Button>
        </Col>
        <Col>
          <Button type="text">
            <FontAwesomeIcon icon={faFilter} size="lg" />
          </Button>
        </Col>
        <Col>
          <Button type="text">
            <FormattedMessage defaultMessage="View All Matches" />
          </Button>
        </Col>
      </Row>

      <div style={{ width: '40%' }}>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search suggestions...',
          })}
          value={search}
        />
      </div>
      <Row gutter={16} style={{ marginTop: 20, width: '100%' }}>
        {loading &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Skeleton
              active
              avatar={{
                style: { borderRadius: 10, height: 100, width: '100%' },
              }}
              key={item}
              paragraph={false}
              style={{ height: 100, marginBottom: 20, width: '100%' }}
              title={false}
            />
          ))}
        {!loading &&
          data?.aiVisionMatches.edges.map((edge) => (
            <Col key={edge.node.id} span={12}>
              <AiVisionMatchCard
                data={edge.node}
                onDismissSuggestion={() => {}}
                onReview={() => {
                  setMatchId(edge.node.id);
                }}
              />
            </Col>
          ))}
      </Row>
      <VisionMatchDrawer
        matchId={matchId}
        onClose={onDrawerClose}
        setMatchId={setMatchId}
      />
    </div>
  );
};

export default VisionMatches;
