import type { ListArticlesFeedQuery } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { DeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import type { ArticleFilters } from 'state/data-model';

import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Empty, Input, Row, Tooltip } from 'antd';
import ArticleCard from 'components/Articles/ArticleCard';
import ArticleFilter from 'components/Articles/ArticleFilter';
import ArticleSkeletonCard from 'components/Articles/ArticleSkeletonCard';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Loading from '../../../components/shared-components/AntD/Loading';

interface Props {
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  filterVariables: ArticleFilters;
  hasCreateRights: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
    watermarkImage?: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;
  // groupsLoading: boolean;
  onNavigate: () => void;
  // groups: { value: string; label: string }[];
  openLightbox: (
    elements: { src: string }[],
    index: number,
    watermarkImage?: boolean
  ) => void;
  setGallery: (values: string[]) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  updateArticleList: MutationUpdaterFn<DeleteArticleMutation>;
}

const Article = ({
  data,
  fetchMoreScroll,
  filterVariables,
  hasCreateRights,
  lightBoxOpen,
  lightboxElements,
  loading,
  // groupsLoading,
  onNavigate,
  // groups,
  openLightbox,
  setGallery,
  setSearch,
  sortFilter,
  toggleSortFilter,
  updateArticleList,
}: Props): JSX.Element => {
  const intl = useIntl();
  const {
    // groups: groupsFilter,
    // // createdAt: createdAtFilter,
    // order,
    gallery,
    // priorities: priorityFilter,
    search,
  } = filterVariables;
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
              onChange={(e) => setSearch(e.target.value)}
              // style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Bulletins...',
              })}
              size="small"
              value={search}
            />
          </Col>
          <Col flex={1}>
            <CheckTags
              mode="check"
              noGutter
              onChange={setGallery}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'My Data',
                  }),
                  value: 'MYDATA',
                },
              ]}
              value={gallery}
            />
          </Col>
          <Col>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Sort & Filter',
              })}
            >
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faFilter}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
                onClick={toggleSortFilter}
              />
            </Tooltip>
          </Col>
          {hasCreateRights && (
            <Col>
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
                onClick={onNavigate}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Bulletin',
                })}
              </Button>
            </Col>
          )}
        </Row>
      </Card>

      <div style={{ paddingBottom: 10 }}>
        {loading ? (
          <Row
            align="stretch"
            gutter={[8, 16]}
            style={{
              alignItems: 'stretch',
              overflowX: 'hidden',
              padding: 10,
            }}
          >
            {Array.from({ length: 24 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={index} lg={8} md={12} sm={24} xl={8} xxl={6}>
                <ArticleSkeletonCard inFeedList />
              </Col>
            ))}
          </Row>
        ) : data?.edges && data?.edges.length > 0 ? (
          <InfiniteScroll
            dataLength={data?.edges.length}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
            hasMore={data?.pageInfo.hasNextPage}
            height="calc(100vh - 87px)"
            loader={<Loading />}
            next={() => fetchMoreScroll()}
            style={{ overflowX: 'hidden' }}
          >
            <Row
              align="stretch"
              gutter={[8, 8]}
              style={{
                alignItems: 'stretch',
                overflowX: 'hidden',
                padding: 10,
              }}
            >
              {data?.edges.map((t) => (
                <Col key={t?.node?.id} lg={8} md={12} sm={24} xl={8} xxl={6}>
                  <ArticleCard
                    article={t?.node}
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
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              height: 'calc(100vh - 100px)',
              justifyContent: 'center',
            }}
          >
            <Empty
              description={
                search === ''
                  ? intl.formatMessage({
                      defaultMessage: 'No Bulletins',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'No bulletins match your search criteria',
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
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Bulletin Filters',
        })}
        width={500}
      >
        <ArticleFilter />
      </Drawer>
      <Lightbox
        close={() => openLightbox([], 0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightBoxOpen.index}
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
        slides={lightboxElements}
      />
    </div>
  );
};

export default Article;
