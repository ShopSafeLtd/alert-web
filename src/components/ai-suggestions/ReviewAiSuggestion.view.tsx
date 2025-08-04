import type { Theme } from '#/configs/ThemeConfig';

import { useReviewAiSuggestionQuery } from '#/components/ai-suggestions/ReviewAiSuggestion/__generated__/ReviewAiSuggestion.generated';
import WatermarkImage from '#/components/images/WatermarkImage.view';
import { Button, Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

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
    height: 300,
    overflow: 'hidden',
    width: '100%',
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

interface Props {
  onApproveSuggestion: () => void;
  onDismissSuggestion: () => void;
  suggestionId: null | string;
}

const ReviewAiSuggestion = ({
  onApproveSuggestion,
  onDismissSuggestion,
  suggestionId,
}: Props) => {
  const styles = useStyles();

  const { data } = useReviewAiSuggestionQuery({
    variables: {
      where: {
        id: suggestionId ?? '',
      },
    },
  });

  return (
    <div>
      <Typography.Title level={3}>{data?.aiSuggestion.title}</Typography.Title>
      <Row gutter={16}>
        <Col>
          <Typography.Paragraph>
            <FormattedMessage
              defaultMessage="Alert ID: {var1}"
              values={{
                var1: data?.aiSuggestion.reference,
              }}
            />
          </Typography.Paragraph>
        </Col>
        <Col>
          <Typography.Paragraph>
            <FormattedMessage
              defaultMessage="Match Found: {var1}"
              values={{
                var1: dayjs(data?.aiSuggestion.createdAt).format(
                  'HH:mm DD/MM/YY'
                ),
              }}
            />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Paragraph>
        <FormattedMessage
          defaultMessage="Match Confidence: {var1}%"
          values={{
            var1: data?.aiSuggestion.rekMatch?.avgSimilarity.toFixed(2),
          }}
        />
      </Typography.Paragraph>
      <Typography.Paragraph>
        <FormattedMessage
          defaultMessage="Status: {var1}"
          values={{
            var1: data?.aiSuggestion.status,
          }}
        />
      </Typography.Paragraph>

      <Row gutter={16} style={{ marginTop: 30 }}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <div className={styles.image}>
                <WatermarkImage
                  url={data?.aiSuggestion.rekMatch?.searchedFace.image.url}
                />
              </div>
            </Col>
            <Col className={styles.imageDetails} span={24}>
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                {data?.aiSuggestion.rekMatch?.searchedOffender?.name}
              </Typography.Title>
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Alert ID: {var1}"
                  values={{
                    var1: data?.aiSuggestion.rekMatch?.searchedOffender
                      ?.reference,
                  }}
                />
              </Typography.Text>
              <Row justify="center" style={{ marginTop: 20 }}>
                <Col>
                  <Link
                    to={`/app/offenders/view/${data?.aiSuggestion.rekMatch?.searchedOffender?.id}`}
                  >
                    <Button type="text">
                      <FormattedMessage defaultMessage="View Full Profile" />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <div className={styles.image}>
                <WatermarkImage
                  url={
                    data?.aiSuggestion.rekMatch?.matchedFaces.at(0)?.rekFace
                      .image.url
                  }
                />
              </div>
            </Col>
            <Col className={styles.imageDetails} span={24}>
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                {data?.aiSuggestion.rekMatch?.matchedOffender?.name || ''}
              </Typography.Title>
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Alert ID: {var1}"
                  values={{
                    var1:
                      data?.aiSuggestion.rekMatch?.matchedOffender?.reference ||
                      '',
                  }}
                />
              </Typography.Text>
              <Row justify="center" style={{ marginTop: 20 }}>
                <Col>
                  <Link
                    to={`/app/offenders/view/${data?.aiSuggestion.rekMatch?.matchedOffender?.id}`}
                  >
                    <Button type="text">
                      <FormattedMessage defaultMessage="View Full Profile" />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={8} justify="end" style={{ marginTop: 50 }}>
        <Col>
          <Button onClick={onDismissSuggestion} type="text">
            <FormattedMessage defaultMessage="Dismiss" />
          </Button>
        </Col>
        <Col>
          <Link
            to={`http://localhost:3004/app/offenders/compare/${data?.aiSuggestion.rekMatch?.matchedOffender?.id}?offenders=${data?.aiSuggestion.rekMatch?.searchedOffender?.id}`}
          >
            <Button danger onClick={onApproveSuggestion}>
              <FormattedMessage defaultMessage="Approve Suggestion" />
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewAiSuggestion;
