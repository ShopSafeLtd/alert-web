import type { Theme } from '#/configs/ThemeConfig';
import type { AiSuggestionsQuery } from '#/views/ai/ai-centre/components/AiSuggestions/__generated__/AiSuggestions.generated';

import WatermarkImage from '#/components/images/WatermarkImage.view';
import { faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Popconfirm, Row, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { AiSuggestionType } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
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
    height: 150,
    overflow: 'hidden',
    width: 150,
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
  title: string;
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
        <Typography.Text type="secondary">
          {dayjs(createdAt).format('HH:mm DD/MM/YY')}
        </Typography.Text>
      </Col>
      <Col>
        <Row>
          <Col>
            <Tooltip
              placement="top"
              title={<FormattedMessage defaultMessage="Dismiss suggestion" />}
            >
              <Popconfirm
                onConfirm={onDismissSuggestion}
                overlayInnerStyle={{ padding: 15 }}
                title={
                  <FormattedMessage defaultMessage="Are you sure? This suggestion will be rejected." />
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
              <FormattedMessage defaultMessage="Review" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

interface Props {
  data: AiSuggestionsQuery['aiSuggestions']['edges'][number]['node'];
  onDismissSuggestion: () => void;
  onReview: () => void;
}

const AiSuggestionCard = ({ data, onDismissSuggestion, onReview }: Props) => {
  const styles = useStyles();

  if (data.type === AiSuggestionType.FaceMatch)
    return (
      <Card bodyStyle={{ padding: 15 }}>
        <CardHeader
          createdAt={data.createdAt}
          onDismissSuggestion={onDismissSuggestion}
          onReview={onReview}
          title={data.title}
        />
        <div className={styles.matchText}>
          <Typography.Text>
            <FormattedMessage
              defaultMessage="Match Confidence: {var1}%"
              values={{ var1: data.rekMatch?.avgSimilarity.toFixed(2) }}
            />
          </Typography.Text>
        </div>

        <Row>
          <Col span={12}>
            <Row>
              <Col>
                <div className={styles.image}>
                  <WatermarkImage url={data.rekMatch?.searchedFace.image.url} />
                </div>
              </Col>
              <Col className={styles.imageDetails} flex={1}>
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                  {data.rekMatch?.searchedOffender?.name}
                </Typography.Title>
                <Typography.Text type="secondary">
                  <FormattedMessage
                    defaultMessage="Alert ID: {var1}"
                    values={{
                      var1: data.rekMatch?.searchedOffender?.reference,
                    }}
                  />
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col>
                <div className={styles.image}>
                  <WatermarkImage
                    url={data.rekMatch?.matchedFaces.at(0)?.rekFace.image.url}
                  />
                </div>
              </Col>
              <Col className={styles.imageDetails} flex={1}>
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                  {data.rekMatch?.matchedOffender.name}
                </Typography.Title>
                <Typography.Text type="secondary">
                  <FormattedMessage
                    defaultMessage="Alert ID: {var1}"
                    values={{
                      var1: data.rekMatch?.matchedOffender.reference,
                    }}
                  />
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );

  return (
    <Card bodyStyle={{ padding: 15 }}>
      <CardHeader
        createdAt={data.createdAt}
        onDismissSuggestion={onDismissSuggestion}
        onReview={onReview}
        title={data.title}
      />
      <Typography.Text type="secondary">{data.description}</Typography.Text>
    </Card>
  );
};

export default AiSuggestionCard;
