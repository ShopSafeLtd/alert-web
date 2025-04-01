import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useOffenderVisionQuery } from '#/views/profiles/offenders/ViewOffender/components/OffenderVision/__generated__/OffenderVision.tsx.generated';
import VisionMatchDrawer from '#/views/vision/vision-centre/components/VisionMatchDrawer/VisionMatchDrawer.view';
import { Button, Card, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import {
  AiVisionMatchConfidence,
  AiVisionMatchPriority,
  SortOrder,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export const formatMatchConfidence = (value?: AiVisionMatchConfidence) => {
  if (AiVisionMatchConfidence.High === value)
    return <FormattedMessage defaultMessage="High Confidence" />;
  if (AiVisionMatchConfidence.Medium === value)
    return <FormattedMessage defaultMessage="Medium Confidence" />;
  return <FormattedMessage defaultMessage="Low Confidence" />;
};

export const formatMatchPriority = (value?: AiVisionMatchPriority) => {
  if (AiVisionMatchPriority.High === value)
    return <FormattedMessage defaultMessage="High Priority" />;
  if (AiVisionMatchPriority.Critical === value)
    return <FormattedMessage defaultMessage="Critical Priority" />;
  if (AiVisionMatchPriority.Normal === value)
    return <FormattedMessage defaultMessage="Normal Priority" />;
  return <FormattedMessage defaultMessage="Low Priority" />;
};

interface Props {
  offenderId: string;
}

const OffenderVision = ({ offenderId }: Props) => {
  const intl = useIntl();
  const [matchId, setMatchId] = React.useState<null | string>(null);
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data } = useOffenderVisionQuery({
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      take: 40,
      where: {
        confidenceRating: [
          AiVisionMatchConfidence.Medium,
          AiVisionMatchConfidence.High,
        ],
        offenderIds: [offenderId],
        schemeIds: [schemeId],
      },
    },
  });

  return (
    <Card>
      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Vision Detections" />
      </Typography.Title>
      <Table
        columns={[
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string, item) => (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'View Detection',
                })}
              >
                <Button
                  onClick={() => setMatchId(item.key)}
                  size="small"
                  type="link"
                >
                  {dayjs(value).format('DD/MM/YY - HH:mm:ss')}
                </Button>
              </Tooltip>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Detection Time',
            }),
          },
          {
            dataIndex: 'business',
            key: 'business',
            title: intl.formatMessage({
              defaultMessage: 'Business',
            }),
          },
          {
            dataIndex: 'confidenceRating',
            key: 'confidenceRating',
            render: (value: AiVisionMatchConfidence) =>
              formatMatchConfidence(value),
            title: intl.formatMessage({
              defaultMessage: 'Confidence',
            }),
          },
          {
            dataIndex: 'priority',
            key: 'priority',
            render: (value: AiVisionMatchPriority) =>
              formatMatchPriority(value),
            title: intl.formatMessage({
              defaultMessage: 'Priority',
            }),
          },
        ]}
        dataSource={
          data?.aiVisionMatches.edges.map((edge) => ({
            business: edge.node.business.name,
            confidenceRating: edge.node.confidenceRating,
            createdAt: edge.node.createdAt,
            key: edge.node.id,
            priority: edge.node.priority,
          })) ?? []
        }
        pagination={{
          showTotal: () => data?.aiVisionMatches.totalCount,
          total: data?.aiVisionMatches.totalCount,
        }}
        size="small"
      />

      <VisionMatchDrawer
        matchId={matchId}
        onClose={() => setMatchId(null)}
        setMatchId={setMatchId}
      />
    </Card>
  );
};

export default OffenderVision;
