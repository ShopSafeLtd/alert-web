import type { ListArticlesFeedQuery } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { ArticleFilters } from 'state/data-model';
import type { ArticleData, DateType } from 'types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
import {
  faClock,
  faExclamationCircle,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Descriptions,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd';
import CardSkeleton from 'components/Skeleton/CardSkeleton.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import dayjs from 'dayjs';
import { ArticlePriority, SortOrder } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import InfiniteSelectScrollList from '../select-list/InfiniteSelectList';
import ArticleTile from './ArticleTile';
import useStyles from './LinkArticle.styles';

const { Paragraph, Text, Title } = Typography;

interface Props {
  clearFilters: () => void;
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  filterVariables: ArticleFilters;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  selectedArticle: ArticleData | undefined;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setSearch: (value: string) => void;
  setSelectedArticle: (value: ArticleData | undefined) => void;
}

const LinkArticle = ({
  clearFilters,
  data,
  fetchMoreScroll,
  filterVariables,
  groups,
  groupsLoading,
  lightBoxOpen,
  loading,
  onSubmit,
  openLightbox,
  selectedArticle,
  setCreatedAtFilter,
  setGroupsFilter,
  setOrder,
  setPriorityFilter,
  setSearch,
  setSelectedArticle,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    priorities: priorityFilter,
    search,
  } = filterVariables;
  // const isLoading = loading && !data?.total;
  const articleItems = data?.edges.map((t) => (
    <Col
      key={t?.node?.id}
      span={t?.node?.images && t?.node.images.length > 0 ? 12 : 6}
    >
      <ArticleTile
        article={t.node}
        onClick={() => setSelectedArticle(t.node)}
      />
    </Col>
  ));

  return (
    <div style={{ overflow: 'hidden' }}>
      <Row wrap={false}>
        <Col className={classes.list} span={18}>
          <Input
            allowClear
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Articles...',
            })}
            value={search}
          />
          <InfiniteSelectScrollList
            dataLength={data?.edges?.length}
            hasMore={data?.pageInfo.hasNextPage}
            isLoading={loading}
            items={articleItems}
            loadingItems={<CardSkeleton />}
            next={fetchMoreScroll}
          />
        </Col>
        <Col className={classes.filters} span={6}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Sort Order',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              onChange={setOrder}
              size="small"
              value={order}
            >
              <Select.Option value={SortOrder.Desc}>
                {intl.formatMessage({
                  defaultMessage: 'Newest First',
                })}
              </Select.Option>
              <Select.Option value={SortOrder.Asc}>
                {intl.formatMessage({
                  defaultMessage: 'Oldest First',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={groupsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={setGroupsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              size="small"
              value={groupsFilter}
            >
              {groups.map((group) => (
                <Select.Option key={group.value} value={group.value}>
                  {group.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Priority',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={groupsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={setPriorityFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Priority',
              })}
              size="small"
              value={priorityFilter}
            >
              <Select.Option value={ArticlePriority.High}>
                {intl.formatMessage({ defaultMessage: 'High' })}
              </Select.Option>
              <Select.Option value={ArticlePriority.Medium}>
                {intl.formatMessage({ defaultMessage: 'Medium' })}
              </Select.Option>
              <Select.Option value={ArticlePriority.Normal}>
                {intl.formatMessage({ defaultMessage: 'Normal' })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'createdAt',
              })}
            </Text>
            <DatePicker.RangePicker
              className={classes.filterSelect}
              defaultValue={
                createdAtFilter
                  ? [
                      dayjs(createdAtFilter?.startDate).toDate(),
                      dayjs(createdAtFilter?.endDate).toDate(),
                    ]
                  : undefined
              }
              onChange={(value) => {
                // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
                if (value && value[0] && value[1])
                  setCreatedAtFilter({
                    // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                    endDate: new Date(value[1].valueOf()),
                    // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                    startDate: new Date(value[0].valueOf()),
                  });
              }}
            />
          </div>

          <Row className={classes.clearRow} justify="end">
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        bodyStyle={{ padding: 0 }}
        okText={intl.formatMessage({
          defaultMessage: 'Add Article',
        })}
        onCancel={() => setSelectedArticle(undefined)}
        onOk={onSubmit}
        open={!!selectedArticle}
        title={intl.formatMessage({
          defaultMessage: 'Add this article?',
        })}
        zIndex={1010}
      >
        <Row gutter={16} wrap={false}>
          {selectedArticle?.images && selectedArticle?.images.length > 0 && (
            <Col>
              <div
                style={{
                  height: 250,
                  width: 250,
                }}
              >
                <WatermarkImage
                  position={selectedArticle?.images[0]?.position}
                  rotation={selectedArticle?.images[0]?.rotation}
                  showWatermark={selectedArticle.watermarkImage}
                  url={selectedArticle?.images[0]?.optimised}
                />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 10px 15px' }}>
            <Title
              ellipsis={{
                rows: 2,
                tooltip: selectedArticle?.title?.replace(/^\S/, (s) =>
                  s.toUpperCase()
                ),
              }}
              level={4}
            >
              {selectedArticle?.priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faExclamationCircle}
                  size="sm"
                />
              )}
              {selectedArticle?.title?.replace(/^\S/, (s) => s.toUpperCase())}
            </Title>
            <Paragraph className={classes.desc} ellipsis={{ rows: 3 }}>
              {selectedArticle?.previewText}
            </Paragraph>
            <Descriptions column={1} size="small">
              <Descriptions.Item
                className={classes.descItem}
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faUser}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Created By',
                    })}
                  </span>
                }
              >
                {selectedArticle?.createdBy?.fullName}
              </Descriptions.Item>
              <Descriptions.Item
                className={classes.descItem}
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faClock}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Updated At',
                    })}
                  </span>
                }
              >
                {FormatCalendar(selectedArticle?.updatedAt || new Date(), intl)}
              </Descriptions.Item>
            </Descriptions>

            <Link to={`/app/article/view/${selectedArticle?.id || ''}`}>
              <Button
                danger
                size="small"
                style={{ marginTop: 10 }}
                type="ghost"
              >
                {intl.formatMessage({
                  defaultMessage: 'View Article',
                })}
              </Button>
            </Link>
          </Col>
        </Row>
      </Modal>

      <Lightbox
        close={() => openLightbox(0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={
          lightBoxOpen.watermarkImage
            ? {
                slide: (slide: WatermarkSlideType) => (
                  <WatermarkSlide slide={slide} />
                ),
              }
            : undefined
        }
        slides={
          selectedArticle?.images?.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
      />
    </div>
  );
};

export default LinkArticle;
