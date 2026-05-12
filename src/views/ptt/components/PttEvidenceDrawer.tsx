import type { Theme } from 'configs/ThemeConfig';

import { AlertOutlined, CheckOutlined, SendOutlined } from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Input,
  Modal,
  Row,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useUpsertIncidentMutation } from 'views/incidents/AddIncident/graphql/mutations/__generated__/upsert-incident.generated';
import { useAttachPttEvidenceMutation } from 'views/settings/businesses/ViewBusiness/graphql/mutations/__generated__/attach-ptt-evidence.generated';

dayjs.extend(relativeTime);

const useStyles = createUseStyles((theme: Theme) => ({
  chunkCard: {
    marginBottom: 12,
  },
  comment: {
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    gap: 12,
    paddingBottom: 16,
    paddingTop: 16,
  },
  commentBody: {
    flex: 1,
  },
  faceOverlay: {
    alignItems: 'center',
    background: `${theme.primary}99`,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  faceTile: {
    border: '2px solid transparent',
    borderRadius: 4,
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    transition: 'border-color 0.15s',
  },
  faceTileSelected: {
    borderColor: theme.primary,
  },
}));

export interface PttDetail {
  chunks: Array<{
    blobUrl: string;
    chunkNumber: number;
    durationMs?: null | number;
    id: string;
    status: string;
  }>;
  faceCrops: Array<{
    blobUrl: string;
    id: string;
    trackingId?: null | number | string;
  }>;
  session: {
    deviceName?: null | string;
    durationMs?: null | number;
    endedAt?: Date | null | string;
    sessionId: string;
    startedAt: Date | string;
    status: string;
    thumbnailUrl?: null | string;
  };
}

interface Props {
  detail: PttDetail | null;
  error?: Error;
  loading: boolean;
  onClose: () => void;
  open: boolean;
}

const formatDuration = (ms: null | number | undefined): string => {
  if (!ms) return '0:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const MOCK_COMMENTS = [
  {
    author: 'Sarah Mitchell',
    color: '#1677ff',
    content:
      'Suspect was seen entering from the north entrance. This matches the alert flagged earlier today.',
    id: '1',
    initials: 'SM',
    time: dayjs().subtract(2, 'hour'),
  },
  {
    author: 'James Cooper',
    color: '#52c41a',
    content:
      'Confirmed — same individual was flagged in store 4 last week. Forwarding to loss prevention team.',
    id: '2',
    initials: 'JC',
    time: dayjs().subtract(47, 'minute'),
  },
];

const PttEvidenceDrawer = ({
  detail,
  error,
  loading,
  onClose,
  open,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigate();
  const [upsertIncident, { loading: creatingIncident }] =
    useUpsertIncidentMutation();
  const [attachPttEvidence] = useAttachPttEvidenceMutation();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [faceModalOpen, setFaceModalOpen] = useState(false);
  const [selectedFaceIds, setSelectedFaceIds] = useState<Set<string>>(
    new Set()
  );

  const submitting = creatingIncident;

  const sortedChunks = detail
    ? [...detail.chunks].sort((a, b) => a.chunkNumber - b.chunkNumber)
    : [];

  const toggleFace = (id: string) =>
    setSelectedFaceIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleCreateIncidentClick = () => {
    if (detail && detail.faceCrops.length > 0) {
      setFaceModalOpen(true);
    } else {
      void handleCreateIncident([]);
    }
  };

  const handleModalCancel = () => {
    setFaceModalOpen(false);
    setSelectedFaceIds(new Set());
  };

  const handleModalSubmit = () => {
    void handleCreateIncident(
      detail?.faceCrops.filter((c) => selectedFaceIds.has(c.id)) ?? []
    );
  };

  const handleCreateIncident = async (
    selectedFaces: PttDetail['faceCrops']
  ) => {
    if (!detail) return;

    const offendersInput =
      selectedFaces.length > 0
        ? {
            new: selectedFaces.map((face) => ({
              images: {
                new: [
                  {
                    filename: `face-${face.id}.jpg`,
                    isFace: true,
                    mimetype: 'image/jpeg',
                    primary: true,
                    url: face.blobUrl,
                  },
                ],
              },
            })),
          }
        : undefined;

    const { data: draftData } = await upsertIncident({
      variables: {
        data: {
          crimeTypes: { connect: [], remove: [] },
          date: new Date(detail.session.startedAt),
          description: '',
          draft: true,
          groups: { connect: [], remove: [] },
          offenders: offendersInput,
        },
      },
    });

    const draftId = draftData?.upsertIncident.id;
    if (!draftId) return;

    if (sortedChunks.length > 0) {
      void attachPttEvidence({
        refetchQueries: ['IncidentDraftDetails'],
        variables: {
          chunks: sortedChunks.map((chunk) => ({
            chunkNumber: chunk.chunkNumber,
            deviceName: detail.session.deviceName ?? '',
            url: chunk.blobUrl,
          })),
          incidentId: draftId,
          sessionId: detail.session.sessionId,
        },
      });
    }

    setFaceModalOpen(false);
    onClose();
    navigate(`/app/incidents/add/draft/${draftId}`);
  };

  const handleAddComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    setComments((prev) => [
      ...prev,
      {
        author: 'You',
        color: '#722ed1',
        content: trimmed,
        id: String(Date.now()),
        initials: 'ME',
        time: dayjs(),
      },
    ]);
    setCommentText('');
  };

  return (
    <>
      <Drawer
        extra={
          <Button
            disabled={!detail}
            icon={<AlertOutlined />}
            loading={submitting}
            onClick={handleCreateIncidentClick}
            type="primary"
          >
            {intl.formatMessage({ defaultMessage: 'Create Incident' })}
          </Button>
        }
        onClose={onClose}
        open={open}
        title={intl.formatMessage({ defaultMessage: 'Evidence Detail' })}
        width={720}
      >
        {loading && <Skeleton active paragraph={{ rows: 6 }} />}

        {!loading && detail && (
          <>
            <Descriptions
              bordered
              column={2}
              size="small"
              style={{ marginBottom: 24 }}
            >
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Status' })}
              >
                <Tag
                  color={
                    detail.session.status === 'completed' ? 'green' : 'default'
                  }
                >
                  {detail.session.status === 'completed'
                    ? intl.formatMessage({ defaultMessage: 'Uploaded' })
                    : detail.session.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Duration' })}
              >
                {formatDuration(detail.session.durationMs)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Started' })}
              >
                {dayjs(detail.session.startedAt).format('HH:mm DD/MM/YY')}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Ended' })}
              >
                {detail.session.endedAt
                  ? dayjs(detail.session.endedAt).format('HH:mm DD/MM/YY')
                  : intl.formatMessage({ defaultMessage: '—' })}
              </Descriptions.Item>
            </Descriptions>

            <Typography.Title level={4} style={{ marginBottom: 12 }}>
              {intl.formatMessage({ defaultMessage: 'Video' })}
            </Typography.Title>

            {sortedChunks.length === 0 && detail.session.thumbnailUrl && (
              <img
                alt={intl.formatMessage({ defaultMessage: 'Thumbnail' })}
                src={detail.session.thumbnailUrl}
                style={{ borderRadius: 4, width: '100%' }}
              />
            )}

            {sortedChunks.map((chunk) => (
              <div className={classes.chunkCard} key={chunk.id}>
                <video
                  controls
                  src={chunk.blobUrl}
                  style={{ borderRadius: 4, width: '100%' }}
                />
                <Tag
                  color={
                    chunk.status === 'completed'
                      ? 'green'
                      : chunk.status === 'failed'
                        ? 'red'
                        : 'default'
                  }
                  style={{ marginTop: 4 }}
                >
                  {chunk.status}
                </Tag>
              </div>
            ))}

            {detail.faceCrops.length > 0 && (
              <>
                <Typography.Title
                  level={5}
                  style={{ marginBottom: 12, marginTop: 24 }}
                >
                  {intl.formatMessage({ defaultMessage: 'Face Crops' })}
                </Typography.Title>
                <Row gutter={[12, 12]}>
                  {detail.faceCrops.map((crop) => (
                    <Col key={crop.id} sm={6} xs={8}>
                      <div
                        style={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <img
                          alt={intl.formatMessage({
                            defaultMessage: 'Face crop',
                          })}
                          src={crop.blobUrl}
                          style={{ display: 'block', width: '100%' }}
                        />
                        {crop.trackingId !== null &&
                          crop.trackingId !== undefined && (
                            <Typography.Text
                              style={{
                                background: 'rgba(0,0,0,0.5)',
                                bottom: 0,
                                color: '#fff',
                                fontSize: 10,
                                left: 0,
                                padding: '2px 4px',
                                position: 'absolute',
                                right: 0,
                                textAlign: 'center',
                              }}
                            >
                              {intl.formatMessage(
                                { defaultMessage: '#{id}' },
                                { id: crop.trackingId }
                              )}
                            </Typography.Text>
                          )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            )}

            <Divider />

            <Typography.Title level={4} style={{ marginBottom: 16 }}>
              {intl.formatMessage({ defaultMessage: 'Comments' })}
              <Typography.Text
                style={{ fontSize: 13, fontWeight: 400, marginLeft: 8 }}
                type="secondary"
              >
                {comments.length}
              </Typography.Text>
            </Typography.Title>

            <div style={{ marginBottom: 16 }}>
              {comments.map((c) => (
                <div className={classes.comment} key={c.id}>
                  <Avatar
                    size={32}
                    style={{ backgroundColor: c.color, flexShrink: 0 }}
                  >
                    {c.initials}
                  </Avatar>
                  <div className={classes.commentBody}>
                    <Row align="middle" gutter={8} style={{ marginBottom: 4 }}>
                      <Col>
                        <Typography.Text strong style={{ fontSize: 13 }}>
                          {c.author}
                        </Typography.Text>
                      </Col>
                      <Col>
                        <Typography.Text
                          style={{ fontSize: 11 }}
                          type="secondary"
                        >
                          {c.time.fromNow()}
                        </Typography.Text>
                      </Col>
                    </Row>
                    <Typography.Text style={{ fontSize: 13 }}>
                      {c.content}
                    </Typography.Text>
                  </div>
                </div>
              ))}
            </div>

            <Row align="bottom" gutter={8}>
              <Col flex={1}>
                <Input.TextArea
                  autoSize={{ maxRows: 4, minRows: 2 }}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey))
                      handleAddComment();
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Add a comment…',
                  })}
                  value={commentText}
                />
              </Col>
              <Col>
                <Button
                  disabled={!commentText.trim()}
                  icon={<SendOutlined />}
                  onClick={handleAddComment}
                  type="primary"
                >
                  {intl.formatMessage({ defaultMessage: 'Post' })}
                </Button>
              </Col>
            </Row>
          </>
        )}

        {!loading && error && (
          <Alert
            description={error.message}
            message={intl.formatMessage({
              defaultMessage: 'Failed to load session details',
            })}
            showIcon
            type="error"
          />
        )}

        {!loading && !error && !detail && (
          <Typography.Text type="secondary">
            {intl.formatMessage({ defaultMessage: 'No detail available.' })}
          </Typography.Text>
        )}
      </Drawer>

      <Modal
        footer={[
          <Button
            disabled={submitting}
            key="cancel"
            onClick={handleModalCancel}
          >
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>,
          <Button
            icon={<AlertOutlined />}
            key="submit"
            loading={submitting}
            onClick={handleModalSubmit}
            type="primary"
          >
            {selectedFaceIds.size > 0
              ? intl.formatMessage(
                  {
                    defaultMessage:
                      'Create Incident with {count} {count, plural, one {offender} other {offenders}}',
                  },
                  { count: selectedFaceIds.size }
                )
              : intl.formatMessage({ defaultMessage: 'Create Incident' })}
          </Button>,
        ]}
        onCancel={handleModalCancel}
        open={faceModalOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add offenders from detected faces?',
        })}
        width={520}
      >
        <Typography.Text
          style={{ display: 'block', marginBottom: 16 }}
          type="secondary"
        >
          {intl.formatMessage({
            defaultMessage:
              'Select any faces to pre-populate as offenders on the incident. Leave all unselected to skip.',
          })}
        </Typography.Text>
        <Row gutter={[12, 12]}>
          {detail?.faceCrops.map((crop) => {
            const selected = selectedFaceIds.has(crop.id);
            return (
              <Col key={crop.id} sm={6} xs={8}>
                <div
                  className={`${classes.faceTile} ${selected ? classes.faceTileSelected : ''}`}
                  onClick={() => toggleFace(crop.id)}
                >
                  <img
                    alt={intl.formatMessage({ defaultMessage: 'Face crop' })}
                    src={crop.blobUrl}
                    style={{ display: 'block', width: '100%' }}
                  />
                  {selected && (
                    <div className={classes.faceOverlay}>
                      <CheckOutlined style={{ color: '#fff', fontSize: 20 }} />
                    </div>
                  )}
                  {crop.trackingId !== null &&
                    crop.trackingId !== undefined && (
                      <Typography.Text
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          bottom: 0,
                          color: '#fff',
                          fontSize: 10,
                          left: 0,
                          padding: '2px 4px',
                          position: 'absolute',
                          right: 0,
                          textAlign: 'center',
                        }}
                      >
                        {intl.formatMessage(
                          { defaultMessage: '#{id}' },
                          { id: crop.trackingId }
                        )}
                      </Typography.Text>
                    )}
                </div>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </>
  );
};

export default PttEvidenceDrawer;
