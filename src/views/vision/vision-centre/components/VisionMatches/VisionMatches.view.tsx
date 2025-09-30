import AiVisionMatchCard from '#/components/ai-vision/AiVisionMatchCard.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import VisionMatchDrawer from '#/views/vision/vision-centre/components/VisionMatchDrawer/VisionMatchDrawer.view';
import { useAiVisionMatchesQuery } from '#/views/vision/vision-centre/components/VisionMatches/__generated__/VisionMatches.generated';
import { faFilter, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import { AiVisionMatchConfidence, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import DebouncedInput from '#/utils/debounced-input';
import { useDismissAiMatchMutation } from '#/views/vision/vision-centre/components/VisionMatches/graphql/mutations/__generated__/DismissMatch.generated';

const VisionMatched = () => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [search, setSearch] = useState('');
  const [matchId, setMatchId] = React.useState<null | string>(null);

  const onDrawerClose = () => {
    setMatchId(null);
  };

  const intl = useIntl();

  const [dismissMatchMutation] = useDismissAiMatchMutation();

  const { data, loading, refetch } = useAiVisionMatchesQuery({
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      take: 10,
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

  const dismissMatch = async (id: string) => {
    await dismissMatchMutation({
      variables: {
        id,
      },
      onCompleted: () => {
        void refetch();
      },
    });
  };

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <>
      <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
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
          <Link to="/app/vision/all-matches">
            <Button type="text">
              <FormattedMessage defaultMessage="View All Matches" />
            </Button>
          </Link>
        </Col>
      </Row>

      <div>
        <DebouncedInput
          allowClear
          placeholder={intl.formatMessage({
            defaultMessage: 'Search suggestions...',
          })}
          onChange={(event) => setSearch(event.target.value)}
          size="small"
          // value={search}
        />
      </div>
      <div style={{ marginTop: 20, width: '100%' }}>
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
            <AiVisionMatchCard
              data={edge.node}
              key={edge.node.id}
              onDismissSuggestion={() => {
                void dismissMatch(edge.node.id);
              }}
              onReview={() => {
                setMatchId(edge.node.id);
              }}
            />
          ))}
      </div>
      <VisionMatchDrawer
        matchId={matchId}
        onClose={onDrawerClose}
        setMatchId={setMatchId}
      />
    </>
  );
};

export default VisionMatched;
