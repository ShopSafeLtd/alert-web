import type { Theme } from '#/configs/ThemeConfig';
import type { AiVisionMatchesQuery } from '#/views/vision/vision-centre/components/VisionMatches/__generated__/VisionMatches.generated';

import WatermarkImage from '#/components/images/WatermarkImage.view';
import { faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { AiVisionMatchPriority } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    border: `2px solid ${theme.primary}`,
    borderOpacity: '0 !important',
  },
  dateText: {
    marginBottom: -8,
    marginTop: 10,
  },
  headerRow: {
    marginBottom: 4,
  },
  image: {
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 10,
    height: 220,
    overflow: 'hidden',
    width: 180,
  },
  imageDetails: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  matchText: {
    marginBottom: 10,
  },
}));

interface CardHeaderProps {
  createdAt: Date;
  onDismissSuggestion: () => void;
  onReview: () => void;
  title: JSX.Element;
}

const CardHeader = ({
  createdAt,
  onDismissSuggestion,
  onReview,
  title,
}: CardHeaderProps) => {
  const styles = useStyles();

  return (
    <Row className={styles.headerRow} gutter={8} justify="end">
      <Col flex={1}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>
          {title}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>
          {dayjs(createdAt).format('HH:mm DD/MM/YY')}
        </Typography.Text>
      </Col>
      <Col>
        <Row>
          <Col>
            <Tooltip
              placement="top"
              title={<FormattedMessage defaultMessage="Dismiss match" />}
            >
              <Popconfirm
                onConfirm={onDismissSuggestion}
                overlayInnerStyle={{ padding: 15 }}
                title={
                  <FormattedMessage defaultMessage="Are you sure? This match will be rejected." />
                }
              >
                <Button
                  style={{
                    borderBottomRightRadius: 0,
                    borderRightWidth: 0,
                    borderTopRightRadius: 0,
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                  type="default"
                >
                  <FontAwesomeIcon icon={faClose} size="lg" />
                </Button>
              </Popconfirm>
            </Tooltip>
          </Col>
          <Col>
            <Button
              onClick={onReview}
              style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              type="default"
            >
              <FormattedMessage defaultMessage="View Details" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

interface Props {
  data: AiVisionMatchesQuery['aiVisionMatches']['edges'][number]['node'];
  onDismissSuggestion: () => void;
  onReview: () => void;
}

const AiVisionMatchCard = ({ data, onDismissSuggestion, onReview }: Props) => {
  const styles = useStyles();

  return (
    <Card
      bodyStyle={{ padding: 15 }}
      className={
        data.priority === AiVisionMatchPriority.High ? styles.card : undefined
      }
    >
      <CardHeader
        createdAt={data.createdAt}
        onDismissSuggestion={onDismissSuggestion}
        onReview={onReview}
        title={
          <FormattedMessage
            defaultMessage="{var3}Match found for {var1} at {var2}"
            values={{
              var1: data.matchedOffender.name,
              var2: data.business.name,
              var3:
                data.priority === AiVisionMatchPriority.High
                  ? 'High Priority '
                  : '',
            }}
          />
        }
      />
      <div className={styles.matchText}>
        <Typography.Text type="secondary">
          <FormattedMessage
            defaultMessage="Match Confidence: {var1}%"
            values={{ var1: data.confidence.toFixed(2) }}
          />
        </Typography.Text>
      </div>

      <Row gutter={16} wrap={false}>
        <Col>
          <Row>
            <Col>
              <div className={styles.image}>
                <WatermarkImage url={data.faceImage.url} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col flex={1}>
          <Row wrap={false}>
            <Col>
              <div className={styles.image}>
                <WatermarkImage url={data.matchedOffender.images.at(0)?.url} />
              </div>
            </Col>
            <Col className={styles.imageDetails} flex={1}>
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                {data.matchedOffender.name}
              </Typography.Title>
              <Typography.Text style={{ fontSize: 13 }}>
                <FormattedMessage
                  defaultMessage="Alert ID: {var1}"
                  values={{
                    var1: data.matchedOffender.reference,
                  }}
                />
              </Typography.Text>
              <Row style={{ marginTop: 6 }}>
                {data.matchedOffender.tags.map((tag) => (
                  <Col key={tag.id}>
                    <Tag color="red">{tag.name}</Tag>
                  </Col>
                ))}
              </Row>
              <Typography.Paragraph
                style={{ fontSize: 13, marginBottom: 0, marginTop: 10 }}
                type="secondary"
              >
                {data.matchedOffender.aiSummary}
              </Typography.Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default AiVisionMatchCard;
