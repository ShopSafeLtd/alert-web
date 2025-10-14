import type { Theme } from '#/configs/ThemeConfig';

import WatermarkImage from '#/components/images/WatermarkImage.view';
import VisionMap from '#/views/vision/vision-centre/components/VisionMap';
import { useAiVisionMatchDrawerQuery } from '#/views/vision/vision-centre/components/VisionMatchDrawer/__generated__/VisionMatchDrawer.generated';
import { faArrowsLeftRight, faCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Modal,
  Row,
  Skeleton,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { AiVisionMatchConfidence, AiVisionMatchPriority } from 'graphql/types';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

export const formatMatchPriority = (value?: AiVisionMatchPriority) => {
  if (AiVisionMatchPriority.High === value)
    return <FormattedMessage defaultMessage="High Priority" />;
  if (AiVisionMatchPriority.Critical === value)
    return <FormattedMessage defaultMessage="Critical Priority" />;
  if (AiVisionMatchPriority.Normal === value)
    return <FormattedMessage defaultMessage="Normal Priority" />;
  return <FormattedMessage defaultMessage="Low Priority" />;
};

export const formatMatchConfidence = (value?: AiVisionMatchConfidence) => {
  if (AiVisionMatchConfidence.High === value)
    return <FormattedMessage defaultMessage="High Confidence" />;
  if (AiVisionMatchConfidence.Medium === value)
    return <FormattedMessage defaultMessage="Medium Confidence" />;
  return <FormattedMessage defaultMessage="Low Confidence" />;
};

const useStyles = createUseStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.bodyBackground,
  },
  card: {
    backgroundColor: theme.cardSubsectionBackground,
    borderRadius: 20,
    padding: 20,
  },
  image: {
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 10,
    height: 280,
    overflow: 'hidden',
    width: 280,
  },
  imagesRow: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  offenderImage: {
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 10,
    height: 180,
    overflow: 'hidden',
    width: 180,
  },
}));

interface Props {
  matchId: null | string;
  onClose: () => void;
  setMatchId: (value: string) => void;
}

const VisionMatchDrawer = ({ matchId, onClose, setMatchId }: Props) => {
  if (!matchId) return null;
  const intl = useIntl();
  const classes = useStyles();

  const visible = useMemo(() => matchId !== null, [matchId]);
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);

  const { data, loading } = useAiVisionMatchDrawerQuery({
    variables: {
      take: 10,
      where: {
        id: matchId ?? '',
      },
    },
  });

  return (
    <Drawer
      onClose={onClose}
      open={visible}
      title={intl.formatMessage({
        defaultMessage: 'Face Match Details',
      })}
      width={850}
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div>
            <Row
              align="middle"
              className={classes.imagesRow}
              gutter={32}
              justify="center"
            >
              <Col>
                <div className={classes.image} onClick={toggleOpen}>
                  <WatermarkImage url={data?.aiVisionMatch.faceImage.url} />
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <FontAwesomeIcon icon={faArrowsLeftRight} size="3x" />
                <Typography.Title level={3}>
                  <FormattedMessage
                    defaultMessage="{var1}%"
                    values={{
                      var1: data?.aiVisionMatch.confidence.toFixed(2) ?? 0,
                    }}
                  />
                </Typography.Title>
              </Col>
              <Col>
                <div className={classes.image}>
                  <WatermarkImage
                    url={data?.aiVisionMatch.matchedOffender.images.at(0)?.url}
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={16} wrap={false}>
              <Col span={12}>
                <div className={classes.card}>
                  <Typography.Title level={4} style={{ marginBottom: 20 }}>
                    <FormattedMessage defaultMessage="Vision Match Details" />
                  </Typography.Title>
                  <Descriptions column={1}>
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Detection Time',
                      })}
                    >
                      {dayjs(data?.aiVisionMatch.createdAt).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Match Confidence',
                      })}
                    >
                      <Typography.Text
                        type={
                          data?.aiVisionMatch.confidenceRating ===
                          AiVisionMatchConfidence.High
                            ? 'success'
                            : 'warning'
                        }
                      >
                        <FormattedMessage
                          defaultMessage="{var1} ({var2}%)"
                          values={{
                            var1: formatMatchConfidence(
                              data?.aiVisionMatch.confidenceRating
                            ),
                            var2: data?.aiVisionMatch.confidence.toFixed(2),
                          }}
                        />
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({ defaultMessage: 'Priority' })}
                    >
                      <Typography.Text
                        type={
                          data?.aiVisionMatch.priority ===
                          AiVisionMatchPriority.High
                            ? 'danger'
                            : undefined
                        }
                      >
                        {formatMatchPriority(data?.aiVisionMatch.priority)}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({ defaultMessage: 'Business' })}
                    >
                      <Typography.Text
                        type={
                          data?.aiVisionMatch.priority ===
                          AiVisionMatchPriority.High
                            ? 'danger'
                            : undefined
                        }
                      >
                        <Link
                          to={`/app/businesses/view/${data?.aiVisionMatch.business.id}`}
                        >
                          {data?.aiVisionMatch.business.name}
                        </Link>
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({ defaultMessage: 'Camera' })}
                      style={{ marginBottom: 0, paddingBottom: 0 }}
                    >
                      <Tooltip
                        title={
                          <FormattedMessage
                            defaultMessage="Serial Number: {var1} ({var2} {var3})"
                            values={{
                              var1: data?.aiVisionMatch.camera.serialNumber,
                              var2: data?.aiVisionMatch.camera.make,
                              var3: data?.aiVisionMatch.camera.model,
                            }}
                          />
                        }
                      >
                        {data?.aiVisionMatch.camera.serialNumber}
                      </Tooltip>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Col>
              <Col span={12}>
                <VisionMap
                  height={258}
                  markers={[{ geoLat: 51.581_64, geoLng: -0.032_79 }]}
                  width="100%"
                />
              </Col>
            </Row>
          </div>
          <div className={classes.card}>
            <Row gutter={16} wrap={false}>
              <Col flex={1}>
                <Typography.Title level={4} style={{ marginBottom: 6 }}>
                  <FormattedMessage defaultMessage="Detected Offender" />
                </Typography.Title>
              </Col>
              <Col>
                <Link
                  to={`/app/offenders/view/${data?.aiVisionMatch.matchedOffender.id}`}
                >
                  <Button>
                    <FormattedMessage defaultMessage="View Full Profile" />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: 20 }}>
              {data?.aiVisionMatch.matchedOffender.images.map((image) => (
                <Col key={image.id}>
                  <div className={classes.offenderImage}>
                    <WatermarkImage url={image.url} />
                  </div>
                </Col>
              ))}
            </Row>
            <Row wrap={false}>
              <Col span={12}>
                <Descriptions column={1}>
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Name' })}
                  >
                    <FormattedMessage
                      defaultMessage="{var1} (Alert ID: {var2})"
                      values={{
                        var1: data?.aiVisionMatch.matchedOffender.name,
                        var2: data?.aiVisionMatch.matchedOffender.reference,
                      }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Risk Level' })}
                  >
                    {
                      data?.aiVisionMatch.matchedOffender.aiRiskAssessment
                        ?.threatLevel
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Warnings' })}
                  >
                    <Row>
                      {data?.aiVisionMatch.matchedOffender.tags.map((tag) => (
                        <Col key={tag.id}>
                          <Tag color="red">{tag.name}</Tag>
                        </Col>
                      ))}
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Known For' })}
                  >
                    <Row gutter={8}>
                      {data?.aiVisionMatch.matchedOffender.knownFor.map(
                        (tag) => (
                          <Col key={tag}>
                            <Typography.Text>{tag}</Typography.Text>
                          </Col>
                        )
                      )}
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Targets' })}
                  >
                    {data &&
                    data.aiVisionMatch.matchedOffender.targetedGoods.length >
                      0 ? (
                      <Row gutter={8}>
                        {data?.aiVisionMatch.matchedOffender.targetedGoods.map(
                          (tag) => (
                            <Col key={tag}>
                              <Typography.Text>{tag}</Typography.Text>
                            </Col>
                          )
                        )}
                      </Row>
                    ) : (
                      <FormattedMessage defaultMessage="Unknown" />
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12}>
                <Descriptions column={1} layout={'vertical'}>
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Offender Summary',
                    })}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography.Text>
                        {data?.aiVisionMatch.matchedOffender.aiSummary}
                      </Typography.Text>
                      {data?.aiVisionMatch.matchedOffender.aiKeyObservations?.map(
                        (tag) => (
                          <Row
                            align="middle"
                            gutter={16}
                            key={tag}
                            style={{ marginTop: 10 }}
                            wrap={false}
                          >
                            <Col>
                              <FontAwesomeIcon icon={faCircle} size="2xs" />
                            </Col>
                            <Col>
                              <Typography.Text>{tag}</Typography.Text>
                            </Col>
                          </Row>
                        )
                      )}
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
          <div
            className={classes.card}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            <Typography.Title level={4} style={{ marginBottom: 14 }}>
              <FormattedMessage defaultMessage="Previous Dections (10 most recent)" />
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
              ]}
              dataSource={
                data?.aiVisionMatch.matchedOffender.aiVisionDetections.map(
                  (detection) => ({
                    business: detection.business.name,
                    confidenceRating: detection.confidenceRating,
                    createdAt: detection.createdAt,
                    key: detection.id,
                  })
                ) ?? []
              }
              pagination={{
                hideOnSinglePage: true,
                pageSize: 10,
                showSizeChanger: false,
              }}
              size="small"
            />
          </div>
          <div className={classes.card} style={{ marginBottom: 20 }}>
            <Typography.Title level={4} style={{ marginBottom: 6 }}>
              <FormattedMessage defaultMessage="Previous Incidents (10 most recent)" />
            </Typography.Title>
            <Table
              columns={[
                {
                  dataIndex: 'reference',
                  key: 'reference',
                  render: (value: string, item) => (
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'View Incident',
                      })}
                    >
                      <Link to={`/app/incidents/view/${item.key}`}>
                        <Button size="small" type="link">
                          {value}
                        </Button>
                      </Link>
                    </Tooltip>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Detection Time',
                  }),
                },
                {
                  dataIndex: 'subject',
                  key: 'subject',
                  title: intl.formatMessage({
                    defaultMessage: 'Incident Type',
                  }),
                },
                {
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (value: string) =>
                    dayjs(value).format('DD/MM/YY - HH:mm:ss'),
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
                  dataIndex: 'aiSummary',
                  key: 'aiSummary',
                  title: intl.formatMessage({
                    defaultMessage: 'Summary',
                  }),
                },
              ]}
              dataSource={
                data?.aiVisionMatch.matchedOffender.incidents.map(
                  (incident) => ({
                    aiSummary: incident.aiSummary,
                    business: incident.business?.name,
                    createdAt: incident.createdAt,
                    key: incident.id,
                    reference: incident.reference,
                    subject: incident.subject,
                  })
                ) ?? []
              }
              pagination={{
                hideOnSinglePage: true,
                pageSize: 10,
                showSizeChanger: false,
              }}
              size="small"
            />
          </div>
        </>
      )}
      <Modal onCancel={toggleOpen} open={open} width={1000}>
        <div style={{ height: '70vh', width: '100%' }}>
          <WatermarkImage url={data?.aiVisionMatch.stillImage.url} />
        </div>
      </Modal>
    </Drawer>
  );
};

export default VisionMatchDrawer;
