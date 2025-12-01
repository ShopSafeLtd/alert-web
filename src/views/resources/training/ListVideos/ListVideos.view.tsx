import { faSearch, faVideo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { SortOption, TrainingVideo } from './useListVideos';

import VideoPlayerModal from '../components/VideoPlayerModal';
import useStyles from './ListVideos.styles';

const { Text, Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface ListVideosViewProps {
  availableTags: Array<{ id: string; name: string }>;
  handleClosePlayer: () => void;
  handleOpenPlayer: (video: TrainingVideo) => void;
  handleSearch: (value: string) => void;
  handleSort: (option: SortOption) => void;
  handleTagFilter: (tags: string[]) => void;
  loading: boolean;
  playerModalOpen: boolean;
  searchTerm: string;
  selectedTags: string[];
  selectedVideo: TrainingVideo | null;
  sortBy: SortOption;
  videos: TrainingVideo[];
}

const ListVideosView: React.FC<ListVideosViewProps> = ({
  availableTags = [],
  handleClosePlayer,
  handleOpenPlayer,
  handleSearch,
  handleSort,
  handleTagFilter,
  loading = false,
  playerModalOpen = false,
  searchTerm = '',
  selectedTags = [],
  selectedVideo = null,
  sortBy = 'newest',
  videos = [],
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [loomModalOpen, setLoomModalOpen] = useState<null | string>(null);

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
      {/* Training Videos Section */}
      <div className={classes.sectionHeader}>
        <Title className={classes.sectionTitle} level={2}>
          <FormattedMessage defaultMessage="Training Videos" />
        </Title>
        <Text className={classes.sectionDescription}>
          <FormattedMessage defaultMessage="Browse our collection of training videos" />
        </Text>
      </div>

      {/* Filter Bar */}
      <div className={classes.filterBar}>
        <div className={classes.filterRow}>
          <Search
            allowClear
            className={classes.searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search training videos...',
            })}
            prefix={<FontAwesomeIcon icon={faSearch} />}
            value={searchTerm}
          />

          <Select
            allowClear
            className={classes.filterSelect}
            maxTagCount={2}
            mode="multiple"
            onChange={handleTagFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Filter by tags',
            })}
            value={selectedTags}
          >
            {availableTags?.map((tag) => (
              <Option key={tag.id} value={tag.id}>
                {tag.name}
              </Option>
            )) || []}
          </Select>

          <Select
            className={classes.sortSelect}
            onChange={handleSort}
            placeholder={intl.formatMessage({
              defaultMessage: 'Sort by',
            })}
            value={sortBy}
          >
            <Option value="newest">
              <FormattedMessage defaultMessage="Newest First" />
            </Option>
            <Option value="mostViewed">
              <FormattedMessage defaultMessage="Most Viewed" />
            </Option>
            <Option value="az">
              <FormattedMessage defaultMessage="A-Z" />
            </Option>
            <Option value="za">
              <FormattedMessage defaultMessage="Z-A" />
            </Option>
          </Select>
        </div>
      </div>

      {/* Videos Grid - Backend Videos + Static Videos */}
      {loading ? (
        <div className={classes.loadingContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <Row className={classes.grid} gutter={[16, 16]}>
          {/* Backend Videos */}
          {videos.map((video) => (
            <Col key={video.id} lg={6} md={8} sm={12} xs={24}>
              <Card
                className={classes.card}
                onClick={() => handleOpenPlayer(video)}
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
                  {video.tags && video.tags.length > 0 && (
                    <div className={classes.tagRow}>
                      {video.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                      ))}
                      {video.tags.length > 3 && (
                        <Tag>
                          <FormattedMessage
                            defaultMessage="+{count}"
                            values={{ count: video.tags.length - 3 }}
                          />
                        </Tag>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          ))}

          {/* Static Loom Videos - Always at the end */}
          <Col key="loom-alert-overview" lg={6} md={8} sm={12} xs={24}>
            <Card
              className={classes.card}
              onClick={() =>
                setLoomModalOpen(
                  'https://www.loom.com/embed/5f30c94d68a5464c9fa2a1f51edc418a'
                )
              }
            >
              <div className={classes.thumbnailContainer}>
                <img
                  alt={intl.formatMessage({ defaultMessage: 'thumbnail' })}
                  className={classes.thumbnail}
                  src="https://cdn.loom.com/sessions/thumbnails/5f30c94d68a5464c9fa2a1f51edc418a-with-play.gif"
                />
              </div>
              <div className={classes.cardContent}>
                <h3 className={classes.cardTitle}>
                  <FormattedMessage defaultMessage="Alert Overview" />
                </h3>
                <p className={classes.cardDescription}>
                  <FormattedMessage defaultMessage="This short video explains the core functionality of alert and how to get around the app." />
                </p>
                <div className={classes.tagRow}>
                  <Tag>
                    <FormattedMessage defaultMessage="Getting Started" />
                  </Tag>
                </div>
              </div>
            </Card>
          </Col>

          <Col key="loom-add-incident" lg={6} md={8} sm={12} xs={24}>
            <Card
              className={classes.card}
              onClick={() =>
                setLoomModalOpen(
                  'https://www.loom.com/embed/4112c7ef431b4d19814164fc15754408'
                )
              }
            >
              <div className={classes.thumbnailContainer}>
                <img
                  alt={intl.formatMessage({ defaultMessage: 'thumbnail' })}
                  className={classes.thumbnail}
                  src="https://cdn.loom.com/sessions/thumbnails/4112c7ef431b4d19814164fc15754408-with-play.gif"
                />
              </div>
              <div className={classes.cardContent}>
                <h3 className={classes.cardTitle}>
                  <FormattedMessage defaultMessage="How to add an incident" />
                </h3>
                <p className={classes.cardDescription}>
                  <FormattedMessage defaultMessage="An overview of the incident form and how to add a new incident to alert." />
                </p>
                <div className={classes.tagRow}>
                  <Tag>
                    <FormattedMessage defaultMessage="Getting Started" />
                  </Tag>
                  <Tag>
                    <FormattedMessage defaultMessage="Incidents" />
                  </Tag>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}

      {/* Loom Video Modal for Static Videos */}
      <Modal
        footer={null}
        onCancel={() => setLoomModalOpen(null)}
        open={loomModalOpen !== null}
        width="70%"
      >
        <div
          style={{
            height: 0,
            paddingBottom: '64.98194945848375%',
            position: 'relative',
          }}
        >
          <iframe
            allowFullScreen
            src={loomModalOpen || ''}
            style={{
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
            title={intl.formatMessage({ defaultMessage: 'video' })}
          />
        </div>
      </Modal>

      {/* Backend Video Player Modal */}
      <VideoPlayerModal
        onClose={handleClosePlayer}
        video={selectedVideo}
        visible={playerModalOpen}
      />
    </div>
  );
};

export default ListVideosView;
