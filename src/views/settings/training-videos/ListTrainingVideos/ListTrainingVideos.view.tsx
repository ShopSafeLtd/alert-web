import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
  faVideo,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Empty, Row, Spin, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TrainingVideo } from '../types';

import EditVideoModal from '../components/EditVideoModal';
import UploadVideoModal from '../components/UploadVideoModal';
import VideoPreviewModal from '../components/VideoPreviewModal';
import useStyles from './ListTrainingVideos.styles';

const { Title } = Typography;

interface ListTrainingVideosViewProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  handleClosePreviewModal: () => void;
  handleCloseUploadModal: () => void;
  handleDelete: (video: TrainingVideo) => void;
  handleOpenEditModal: (video: TrainingVideo) => void;
  handleOpenPreviewModal: (video: TrainingVideo) => void;
  handleOpenUploadModal: () => void;
  loading: boolean;
  previewModalOpen: boolean;
  refetch: () => void;
  selectedVideo: TrainingVideo | null;
  uploadModalOpen: boolean;
  videos: TrainingVideo[];
}

const ListTrainingVideosView: React.FC<ListTrainingVideosViewProps> = ({
  editModalOpen,
  handleCloseEditModal,
  handleClosePreviewModal,
  handleCloseUploadModal,
  handleDelete,
  handleOpenEditModal,
  handleOpenPreviewModal,
  handleOpenUploadModal,
  loading,
  previewModalOpen,
  refetch,
  selectedVideo,
  uploadModalOpen,
  videos,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(intl.locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Title className={classes.title}>
          <FormattedMessage defaultMessage="Training Videos" />
        </Title>
        <Button
          className={classes.uploadButton}
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleOpenUploadModal}
          type="primary"
        >
          <FormattedMessage defaultMessage="Upload Video" />
        </Button>
      </div>

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : videos.length === 0 ? (
        <Empty
          className={classes.emptyState}
          description={
            <span>
              <FormattedMessage defaultMessage="No training videos yet. Upload your first video to get started." />
            </span>
          }
          image={
            <FontAwesomeIcon className={classes.emptyIcon} icon={faVideo} />
          }
        >
          <Button
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleOpenUploadModal}
            type="primary"
          >
            <FormattedMessage defaultMessage="Upload Video" />
          </Button>
        </Empty>
      ) : (
        <Row className={classes.grid} gutter={[16, 16]}>
          {videos.map((video) => (
            <Col key={video.id} lg={8} md={12} sm={12} xs={24}>
              <Card
                className={classes.card}
                onClick={() => handleOpenPreviewModal(video)}
              >
                <div className={classes.thumbnailContainer}>
                  {video.thumbnailUrl && video.thumbnailStatus !== 'pending' ? (
                    <img
                      alt={video.title}
                      className={classes.thumbnail}
                      src={video.thumbnailUrl}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className={classes.placeholderIcon}
                      icon={faVideo}
                    />
                  )}
                </div>
                <div className={classes.cardContent}>
                  <h3 className={classes.cardTitle}>{video.title}</h3>
                  {video.description && (
                    <p className={classes.cardDescription}>
                      {video.description}
                    </p>
                  )}
                  <div className={classes.cardMeta}>
                    <span>
                      <FormattedMessage
                        defaultMessage="{count} views"
                        values={{ count: video.viewCount }}
                      />
                    </span>
                    <span>{formatDate(video.createdAt)}</span>
                  </div>
                  <div className={classes.cardActions}>
                    <Button
                      icon={<FontAwesomeIcon icon={faEye} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPreviewModal(video);
                      }}
                      size="small"
                    >
                      <FormattedMessage defaultMessage="Preview" />
                    </Button>
                    <Button
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(video);
                      }}
                      size="small"
                    >
                      <FormattedMessage defaultMessage="Edit" />
                    </Button>
                    <Button
                      danger
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(video);
                      }}
                      size="small"
                    >
                      <FormattedMessage defaultMessage="Delete" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <UploadVideoModal
        onClose={handleCloseUploadModal}
        onSuccess={refetch}
        visible={uploadModalOpen}
      />

      {selectedVideo && (
        <>
          <EditVideoModal
            onClose={handleCloseEditModal}
            onSuccess={refetch}
            video={selectedVideo}
            visible={editModalOpen}
          />
          <VideoPreviewModal
            onClose={handleClosePreviewModal}
            video={selectedVideo}
            visible={previewModalOpen}
          />
        </>
      )}
    </div>
  );
};

export default ListTrainingVideosView;
