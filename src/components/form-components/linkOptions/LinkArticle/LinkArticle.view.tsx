import React from 'react';
import type { ListArticlesFeedQuery } from 'graphql/generated';
import { SortOrder, ArticlePriority } from 'graphql/generated';
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { useIntl } from 'react-intl';
import type { DateType, ArticleData } from 'types/DataType';
import type { ArticleFilters } from 'state/data-model';
import moment from 'moment';
import CardSkeleton from 'components/Skeleton/CardSkeleton.view';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faExclamationCircle,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import FormatCalendar from 'utils/format-calendar-24h';
import useStyles from './LinkArticle.styles';
import ArticleTile from './ArticleTile';
import InfiniteSelectScrollList from '../select-list/InfiniteSelectList';

const { Paragraph, Text, Title } = Typography;

interface Props {
  onSubmit: () => void;
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  selectedArticle: ArticleData | undefined;
  setSelectedArticle: (value: ArticleData | undefined) => void;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  filterVariables: ArticleFilters;
  setOrder: (value: SortOrder) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  fetchMoreScroll: () => void;
}

const LinkArticle = ({
  onSubmit,
  data,
  loading,
  setSearch,
  selectedArticle,
  setSelectedArticle,
  openLightbox,
  lightBoxOpen,
  filterVariables,
  setOrder,
  setGroupsFilter,
  setCreatedAtFilter,
  setPriorityFilter,
  groups,
  groupsLoading,
  clearFilters,
  fetchMoreScroll,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const {
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
    priorities: priorityFilter,
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
        <Col span={18} className={classes.list}>
          <Input
            value={search}
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Articles...',
              id: 'GyFKaQ',
            })}
            allowClear
          />
          <InfiniteSelectScrollList
            dataLength={data?.edges?.length}
            next={fetchMoreScroll}
            hasMore={data?.pageInfo.hasNextPage}
            isLoading={loading}
            items={articleItems}
            loadingItems={<CardSkeleton />}
          />
        </Col>
        <Col className={classes.filters} span={6}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters', id: 'zSOvI0' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Sort Order',
                id: 'Hw6crD',
              })}
            </Text>
            <Select
              className={classes.filterSelect}
              size="small"
              allowClear
              value={order}
              onChange={setOrder}
            >
              <Select.Option value={SortOrder.Desc}>
                {intl.formatMessage({
                  defaultMessage: 'Newest First',
                  id: 'dZYazP',
                })}
              </Select.Option>
              <Select.Option value={SortOrder.Asc}>
                {intl.formatMessage({
                  defaultMessage: 'Oldest First',
                  id: 'FqI37D',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
            </Text>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
              mode="multiple"
              className={classes.filterSelect}
              size="small"
              maxTagCount={2}
              allowClear
              loading={groupsLoading}
              onChange={setGroupsFilter}
              value={groupsFilter}
            >
              {groups.map((group) => (
                <Select.Option value={group.value}>{group.label}</Select.Option>
              ))}
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Priority',
                id: '8lCjAM',
              })}
            </Text>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Priority',
                id: 'DdVIRN',
              })}
              mode="multiple"
              className={classes.filterSelect}
              size="small"
              maxTagCount={2}
              allowClear
              loading={groupsLoading}
              onChange={setPriorityFilter}
              value={priorityFilter}
            >
              <Select.Option value={ArticlePriority.High}>
                {intl.formatMessage({ defaultMessage: 'High', id: 'AxMhQr' })}
              </Select.Option>
              <Select.Option value={ArticlePriority.Medium}>
                {intl.formatMessage({ defaultMessage: 'Medium', id: 'ovJ26C' })}
              </Select.Option>
              <Select.Option value={ArticlePriority.Normal}>
                {intl.formatMessage({ defaultMessage: 'Normal', id: 'myq2ZL' })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'createdAt',
                id: 'F4RJ8y',
              })}
            </Text>
            <DatePicker.RangePicker
              className={classes.filterSelect}
              defaultValue={
                createdAtFilter
                  ? [
                      moment(createdAtFilter?.startDate),
                      moment(createdAtFilter?.endDate),
                    ]
                  : undefined
              }
              onChange={(value) => {
                if (value && value[0] && value[1])
                  setCreatedAtFilter({
                    startDate: new Date(value[0].valueOf()),
                    endDate: new Date(value[1].valueOf()),
                  });
              }}
            />
          </div>

          <Row justify="end" className={classes.clearRow}>
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                  id: 'MsGXc3',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        open={!!selectedArticle}
        zIndex={1010}
        okText={intl.formatMessage({
          defaultMessage: 'Add Article',
          id: '0orLBH',
        })}
        onOk={onSubmit}
        onCancel={() => setSelectedArticle(undefined)}
        bodyStyle={{ padding: 0 }}
        title={intl.formatMessage({
          defaultMessage: 'Add this article?',
          id: '9j1vol',
        })}
      >
        <Row gutter={16} wrap={false}>
          {selectedArticle?.images && selectedArticle?.images.length > 0 && (
            <Col>
              <div
                style={{
                  width: 250,
                  height: 250,
                }}
              >
                <WatermarkImage
                  url={selectedArticle?.images[0]?.optimised}
                  position={selectedArticle?.images[0]?.position}
                  rotation={selectedArticle?.images[0]?.rotation}
                />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 10px 15px' }}>
            <Title
              level={4}
              ellipsis={{
                rows: 2,
                tooltip: selectedArticle?.title?.replace(/^\S/, (s) =>
                  s.toUpperCase()
                ),
              }}
            >
              {selectedArticle?.priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  size="sm"
                  icon={faExclamationCircle}
                  className={classes.descIcon}
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
                      id: 'uAfuJA',
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
                      id: 'ECx6bx',
                    })}
                  </span>
                }
              >
                {FormatCalendar(selectedArticle?.updatedAt || new Date())}
              </Descriptions.Item>
            </Descriptions>

            <Link to={`/app/article/view/${selectedArticle?.id || ''}`}>
              <Button
                type="ghost"
                danger
                size="small"
                style={{ marginTop: 10 }}
              >
                {intl.formatMessage({
                  defaultMessage: 'View Article',
                  id: 'szxDFV',
                })}
              </Button>
            </Link>
          </Col>
        </Row>
      </Modal>

      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        controller={{
          closeOnBackdropClick: true,
        }}
        slides={
          selectedArticle?.images?.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default LinkArticle;
