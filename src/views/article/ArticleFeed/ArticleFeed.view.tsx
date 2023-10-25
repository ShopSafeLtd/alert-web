import React from 'react';
import type {
  ArticlePriority,
  DeleteArticleMutation,
  ListArticlesQuery,
  SortOrder,
} from 'graphql/generated';
import { Button, Card, Col, Drawer, Empty, Input, Row } from 'antd';

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
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../../components/shared-components/AntD/Loading';

interface Props {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
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
  fetchMoreScroll: () => void;
}

const Article = ({
  data,
  loading,
  order,
  setOrder,
  search,
  setSearch,
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
  fetchMoreScroll,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div
      className="feed-container"
      style={loading ? {} : { padding: 10, paddingRight: 0 }}
    >
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={6}>
            <Input
              size="small"
              // style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Bulletins...',
                id: 'bIrv01',
              })}
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
                  label: intl.formatMessage({
                    defaultMessage: 'My Data',
                    id: 'dr0ueW',
                  }),
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
              {intl.formatMessage({
                defaultMessage: 'Sort & Filter',
                id: 'f2g3SM',
              })}
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
              {intl.formatMessage({
                defaultMessage: 'Add Bulletin',
                id: 'x52+I1',
              })}
            </Button>
          </Col>
        </Row>
      </Card>

      <div style={{ paddingBottom: 10 }}>
        {loading ? (
          <Row
            gutter={[8, 16]}
            align="stretch"
            style={{
              alignItems: 'stretch',
              padding: 10,
              overflowX: 'hidden',
            }}
          >
            {Array.from({ length: 24 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={index} sm={24} md={12} lg={8} xl={8} xxl={6}>
                <ArticleSkeletonCard inFeedList />
              </Col>
            ))}
          </Row>
        ) : data?.total ? (
          <InfiniteScroll
            dataLength={data?.articles.length}
            next={() => fetchMoreScroll()}
            hasMore={data?.articles.length < data?.total}
            loader={<Loading />}
            height="calc(100vh - 87px)"
            style={{ overflowX: 'hidden' }}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
          >
            <Row
              gutter={[8, 16]}
              align="stretch"
              style={{
                alignItems: 'stretch',
                padding: 10,
                overflowX: 'hidden',
              }}
            >
              {data?.articles.map((article) => (
                <Col sm={24} md={12} lg={8} xl={8} xxl={6} key={article?.id}>
                  <ArticleCard
                    article={article}
                    openLightbox={openLightbox}
                    update={updateArticleList}
                  />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
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
                  ? intl.formatMessage({
                      defaultMessage: 'No Bulletins',
                      id: '7Pv3BL',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'No bulletins match your search criteria',
                      id: 'pZaTHe',
                    })
              }
            />
          </div>
        )}
        {/* <Row justify="center"> */}
        {/*   <Col> */}
        {/*     <Pagination */}
        {/*       total={data?.total} */}
        {/*       // pageSizeOptions={['12']} */}
        {/*       showSizeChanger={false} */}
        {/*       pageSize={currentPageSize} */}
        {/*       current={currentPage} */}
        {/*       onChange={onPaginationChange} */}
        {/*       showTotal={(total) => */}
        {/*         intl.formatMessage( */}
        {/*           { defaultMessage: `Total Bulletins: {total}`, id: '8LkFAr' }, */}
        {/*           { total } */}
        {/*         ) */}
        {/*       } */}
        {/*       hideOnSinglePage */}
        {/*     /> */}
        {/*   </Col> */}
        {/* </Row> */}
      </div>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Bulletin Filters',
          id: 'o9w9ud',
        })}
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
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default Article;
