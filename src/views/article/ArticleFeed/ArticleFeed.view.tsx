import React from 'react';
import type {
  ArticlePriority,
  DeleteArticleMutation,
  ListArticlesQuery,
  SortOrder,
} from 'graphql/generated';
import {
  Affix,
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Input,
  Pagination,
  Row,
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import type { DateType } from 'types/DataType';
import ArticleFilter from 'components/Articles/ArticleFilter';
import ArticleCard from 'components/Articles/ArticleCard';
import ArticleSkeletonCard from 'components/Articles/ArticleSkeletonCard';
import type { MutationUpdaterFn } from '@apollo/client';

interface Props {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  priorityFilter: ArticlePriority[];
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  openLightbox: (elements: { src: string }[], index: number) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onNavigate: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  updateArticleList: MutationUpdaterFn<DeleteArticleMutation>;
}

const Article = ({
  data,
  loading,
  onPaginationChange,
  order,
  setOrder,
  search,
  setSearch,
  currentPage,
  currentPageSize,
  priorityFilter,
  setPriorityFilter,
  groups,
  groupsLoading,
  onNavigate,
  lightboxElements,
  lightBoxOpen,
  openLightbox,
  sortFilter,
  toggleSortFilter,
  clearFilters,
  gallery,
  setGallery,
  groupsFilter,
  setGroupsFilter,
  setCreatedAtFilter,
  updateArticleList,
}: Props): JSX.Element => (
  <div className="feed-container" style={{ padding: 10 }}>
    <Affix offsetTop={5}>
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 5 }}>
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={6}>
            <Input
              size="small"
              // style={{ width: 350 }}
              placeholder="Search Bulletins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col flex={1}>
            <CheckTags
              mode="radio"
              value={gallery}
              onChange={setGallery}
              options={[
                {
                  label: 'My Data',
                  value: 'MYDATA',
                },
              ]}
            />
          </Col>
          <Col>
            <Button
              onClick={toggleSortFilter}
              icon={
                <FontAwesomeIcon
                  icon={faFilter}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              Sort &amp; Filter
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={onNavigate}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              Add Bulletin
            </Button>
          </Col>
        </Row>
      </Card>
    </Affix>

    <div style={{ paddingBottom: 10 }}>
      <Row gutter={8}>
        {loading ? (
          Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} sm={24} md={12} lg={8} xl={8} xxl={6}>
              <ArticleSkeletonCard inFeedList />
            </Col>
          ))
        ) : data?.total ? (
          data?.articles.map((article) => (
            <Col sm={24} md={12} lg={8} xl={8} xxl={6} key={article?.id}>
              <ArticleCard
                article={article}
                openLightbox={openLightbox}
                update={updateArticleList}
              />
            </Col>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              flex: 1,
              height: 'calc(100vh - 100px)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Empty
              description={
                search === ''
                  ? 'No Bulletins'
                  : 'No bulletins match your search criteria'
              }
            />
          </div>
        )}
      </Row>
      <Row justify="center">
        <Col>
          <Pagination
            total={data?.total}
            // pageSizeOptions={['12']}
            showSizeChanger={false}
            pageSize={currentPageSize}
            current={currentPage}
            onChange={onPaginationChange}
            showTotal={(total) => `Total Bulletins: ${total}`}
            hideOnSinglePage
          />
        </Col>
      </Row>
    </div>
    <Drawer
      title="Bulletin Filters"
      visible={sortFilter}
      onClose={toggleSortFilter}
      width={500}
    >
      <ArticleFilter
        order={order}
        setOrder={setOrder}
        groups={groups}
        groupsLoading={groupsLoading}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        groupsFilter={groupsFilter}
        setGroupsFilter={setGroupsFilter}
        clearFilters={clearFilters}
        setCreatedAtFilter={setCreatedAtFilter}
      />
    </Drawer>
    <Lightbox
      open={lightBoxOpen.open}
      close={() => openLightbox([], 0)}
      plugins={[Zoom]}
      index={lightBoxOpen.index}
      slides={lightboxElements}
      controller={{
        closeOnBackdropClick: true,
      }}
      render={{
        slide: (slide: WatermarkSlideType) => <WatermarkSlide slide={slide} />,
      }}
    />
  </div>
);

export default Article;
