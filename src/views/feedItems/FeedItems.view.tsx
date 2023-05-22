import React from 'react';
import type {
  FeedItemsQuery,
  ListArticlesQuery,
  ListOffendersQuery,
  Model,
} from 'graphql/generated';
import { FeedItemType } from 'graphql/generated';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Empty,
  Input,
  Modal,
  Pagination,
  Row,
  Skeleton,
  Tooltip,
  Typography,
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faFilter,
  faNewspaper,
  faTrash,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import ArticleCard from 'components/feedItems/ArticleSection/ArticleCard';
import { Link } from 'react-router-dom';

import { formatDate } from 'utils';
import IncidentFeed from 'components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from 'components/feedItems/FeedItemSection/OffenderFeed';
import ArticleFeed from 'components/feedItems/FeedItemSection/ArticleFeed';
import type { DateType, PaginationModel } from 'types/DataType';
import InvestigationFeed from 'components/feedItems/FeedItemSection/investigationFeed';
import WatermarkImage from 'components/images/WatermarkImage.view';
import FeedItemFilter from 'components/feedItems/FeedItemFilter';
import type { FeedItemSort } from 'state';
import VehicleFeed from 'components/feedItems/FeedItemSection/VehicleFeed';
import CrimeGroupFeed from 'components/feedItems/FeedItemSection/CrimeGroupFeed';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import ArticleSkeletonCard from 'components/feedItems/ArticleSection/ArticleSkeletonCard';
import FeedItemSkeletonCard from 'components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import AdminTodos from 'components/feedItems/AdminTodos';
import BanFeed from 'components/feedItems/FeedItemSection/BanFeed';
import useStyles from './FeedItem.styles';

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;

interface Props {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  articleData: ListArticlesQuery | undefined;
  articleLoading: boolean;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  articlePagination: PaginationModel;
  onArticlePaginationChange: (page: number, pageSize: number) => void;
  search: string;
  setSearch: (value: string) => void;

  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  typesFilter: Model[];
  setTypesFilter: (value: Model[]) => void;
  clearFilters: () => void;
  order: FeedItemSort;
  setOrder: (value: FeedItemSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  gallery: string[];
  setGallery: (values: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
}

const FeedItem = ({
  data,
  loading,
  articleData,
  articleLoading,
  recentOffenderData,
  recentOffenderLoading,
  onPaginationChange,
  pagination,
  search,
  setSearch,

  onDeleteFeedItem,
  saving,
  adminRights,
  articlePagination,
  onArticlePaginationChange,
  typesFilter,
  setTypesFilter,
  groupsFilter,
  setGroupsFilter,
  sortFilter,
  toggleSortFilter,
  clearFilters,
  order,
  setOrder,
  groups,
  groupsLoading,
  gallery,
  setGallery,
  setCreatedAtFilter,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="feed-container" style={{ height: '100vh', padding: 15 }}>
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={6}>
            <Input
              size="small"
              placeholder="Search for anything in alert..."
              // value={search}
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
                  label: 'Not Approved',
                  value: 'NOT APPROVED',
                  needAdminRight: true,
                },
                {
                  label: 'Following',
                  value: 'FOLLOWING',
                },
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
            <Link to="/app/incidents/add">
              <Button size="small" type="primary">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  style={{ marginRight: 10 }}
                />
                Add Incident
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/app/offenders/add">
              <Button size="small" type="primary">
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 10 }} />
                Add Offender
              </Button>
            </Link>
          </Col>
          {adminRights && (
            <Col>
              <Link to="/app/article ">
                <Button size="small" type="primary">
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    style={{ marginRight: 10 }}
                  />
                  Add Bulletin
                </Button>
              </Link>
            </Col>
          )}
        </Row>
      </Card>
      <Row gutter={10}>
        <Col span={9} xxl={8} xl={9}>
          {loading ? (
            Array.from({ length: 24 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <FeedItemSkeletonCard key={index} />
            ))
          ) : data?.listFeedItems?.total ? (
            <div
              style={{
                height: 'calc(100vh - 100px)',
                overflow: 'auto',
              }}
            >
              {data.listFeedItems?.feedItems.map((feedItem) => (
                <Card
                  style={{
                    width: '99%',
                    marginBottom: 10,
                  }}
                  key={feedItem?.id}
                  bodyStyle={{ padding: 0, marginLeft: 5 }}
                  loading={loading}
                >
                  <>
                    <Row style={{ margin: '8px 8px 4px' }}>
                      <Col flex={1}>
                        <Title style={{ margin: 0, fontSize: 14 }} level={4}>
                          {feedItem?.message}
                        </Title>
                      </Col>
                      <Col>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                          {formatDate(feedItem?.updatedAt)}
                        </Text>
                      </Col>
                      {adminRights ? (
                        <Col>
                          {adminRights ? (
                            <Button
                              type="text"
                              style={{
                                height: 25,
                                width: 30,
                                marginTop: -15,
                                marginLeft: 5,
                              }}
                              disabled={saving}
                              icon={
                                <FontAwesomeIcon
                                  style={{ marginBottom: 2 }}
                                  icon={faTrash}
                                  size="sm"
                                />
                              }
                              onClick={() => {
                                confirm({
                                  title: 'Do you want to delete the feed item?',
                                  content: 'This action cannot be undone.',
                                  onOk() {
                                    onDeleteFeedItem(feedItem.id);
                                  },
                                });
                              }}
                              size="small"
                            />
                          ) : null}
                        </Col>
                      ) : null}
                    </Row>
                    <Divider style={{ margin: 0 }} />
                    <div style={{ padding: 10 }}>
                      {/* create new incident/offender */}
                      {feedItem?.type === FeedItemType.NewIncident && (
                        <IncidentFeed feedItem={feedItem} isNewIncident />
                      )}
                      {feedItem?.type === FeedItemType.NewOffender && (
                        <OffenderFeed feedItem={feedItem} isNewOffender />
                      )}
                      {feedItem?.type === FeedItemType.NewInvestigation && (
                        <InvestigationFeed
                          feedItem={feedItem}
                          isNewInvestigation
                        />
                      )}
                      {feedItem?.type === FeedItemType.NewVehicle && (
                        <VehicleFeed feedItem={feedItem} isNewVehicle />
                      )}
                      {feedItem?.type === FeedItemType.NewCrimegroup && (
                        <CrimeGroupFeed feedItem={feedItem} isNewCrimeGroup />
                      )}
                      {/* update details  */}
                      {feedItem?.type === FeedItemType.Incident && (
                        <IncidentFeed feedItem={feedItem} />
                      )}
                      {feedItem?.type === FeedItemType.Offender && (
                        <OffenderFeed feedItem={feedItem} />
                      )}
                      {feedItem?.type === FeedItemType.Investigation && (
                        <InvestigationFeed feedItem={feedItem} />
                      )}

                      {/* add new images */}
                      {feedItem?.type === FeedItemType.IncidentImage && (
                        <IncidentFeed feedItem={feedItem} isNewImage />
                      )}
                      {feedItem?.type === FeedItemType.OffenderImage && (
                        <OffenderFeed feedItem={feedItem} isNewImage />
                      )}
                      {feedItem?.type === FeedItemType.InvestigationImage && (
                        <InvestigationFeed feedItem={feedItem} isNewImage />
                      )}
                      {feedItem?.type === FeedItemType.VehicleImage && (
                        <VehicleFeed feedItem={feedItem} isNewImage />
                      )}
                      {/* add new intel */}
                      {feedItem?.type === FeedItemType.IncidentIntel && (
                        <IncidentFeed feedItem={feedItem} />
                      )}
                      {feedItem?.type === FeedItemType.OffenderIntel && (
                        <OffenderFeed feedItem={feedItem} />
                      )}
                      {feedItem?.type === FeedItemType.InvestigationIntel && (
                        <InvestigationFeed feedItem={feedItem} />
                      )}
                      {feedItem?.type === FeedItemType.VehicleIntel && (
                        <VehicleFeed feedItem={feedItem} />
                      )}
                      {feedItem?.type === FeedItemType.CrimegroupIntel && (
                        <CrimeGroupFeed feedItem={feedItem} />
                      )}

                      {/* article */}
                      {feedItem?.type === FeedItemType.NewArticle && (
                        <ArticleFeed feedItem={feedItem} />
                      )}
                      {/* ban */}
                      {feedItem?.type === FeedItemType.NewBan && (
                        <BanFeed feedItem={feedItem} />
                      )}
                    </div>
                  </>
                </Card>
              ))}
              <Row justify="center">
                <Col>
                  <Pagination
                    total={data?.listFeedItems?.total}
                    // pageSizeOptions={['20']}
                    showSizeChanger={false}
                    pageSize={pagination.pageSize}
                    current={pagination.page}
                    onChange={onPaginationChange}
                    showTotal={(total) => `Total FeedItems: ${total}`}
                    hideOnSinglePage
                  />
                </Col>
              </Row>
            </div>
          ) : (
            <Card
              style={{
                display: 'flex',
                height: 'calc(100vh - 95px)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty
                description={
                  search === ''
                    ? 'No Feed Items'
                    : 'No feed items match your search criteria'
                }
              />
            </Card>
          )}
        </Col>
        <Col span={15} xxl={16} xl={15}>
          <Card style={{ height: 190, marginBottom: 15 }}>
            <Title
              level={4}
              style={{
                fontSize: 16,
                marginTop: -10,
                marginBottom: 0,
              }}
            >
              Recently Active Offenders
            </Title>

            {recentOffenderLoading ? (
              <Row gutter={8} className={classes.offenderRow}>
                {Array.from({ length: 8 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Col key={index}>
                    <Skeleton.Avatar
                      active
                      shape="square"
                      style={{
                        height: 120,
                        width: 130,
                        borderRadius: '0.625rem',
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Row gutter={8} className={classes.offenderRow}>
                {recentOffenderData?.listOffenders?.total ? (
                  recentOffenderData?.listOffenders?.offenders.map(
                    (offender) => (
                      <Col key={offender.id}>
                        <Tooltip
                          placement="bottom"
                          title={`View ${offender.name} `}
                        >
                          <Link to={`/app/offenders/view/${offender.id}`}>
                            <Card
                              // onClick={() => setAddRecentOffender(offender)}
                              style={{ border: 0 }}
                              bodyStyle={{
                                width: 120,
                                height: 130,
                                position: 'relative',
                                padding: 0,
                                borderRadius: '0.625rem',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              {offender.images.length > 0 && (
                                <WatermarkImage
                                  url={offender.images[0]?.optimised}
                                  position={offender.images[0]?.position}
                                />
                              )}
                              {offender.images.length === 0 && (
                                <FontAwesomeIcon
                                  style={{ color: 'rgb(114, 132, 154)' }}
                                  icon={faUser}
                                  size="3x"
                                />
                              )}
                              <Paragraph
                                className={classes.offenderParagraph}
                                style={{
                                  top: 0,
                                }}
                              >
                                Alert ID: {offender.reference}
                              </Paragraph>
                              <Paragraph
                                className={classes.offenderParagraph}
                                style={{
                                  bottom: -15,
                                }}
                              >
                                {offender.name}
                              </Paragraph>
                            </Card>
                          </Link>
                        </Tooltip>
                      </Col>
                    )
                  )
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Empty
                      description={
                        search === ''
                          ? 'No Offenders'
                          : 'No offenders match your search criteria'
                      }
                    />
                  </div>
                )}
              </Row>
            )}
          </Card>

          <Row gutter={12} style={{ height: 'calc(60vh)' }}>
            <Col span={adminRights ? 12 : 24} style={{ height: '100%' }}>
              <Card
                bodyStyle={{
                  padding: 0,
                  paddingBottom: 20,
                }}
                style={{
                  margin: 0,
                  padding: 0,
                  overflow: 'auto',
                  overflowX: 'hidden',
                  height: 'calc(100vh - 300px)',
                }}
              >
                <Title
                  style={{
                    margin: '15px 20px 10px',
                    fontSize: 16,
                  }}
                  level={4}
                >
                  Recent Bulletins
                </Title>
                <Divider style={{ margin: '0 0' }} />

                <Row gutter={[8, 8]} style={{ padding: 10 }}>
                  {articleLoading ? (
                    Array.from({ length: 24 }).map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Col key={index} xxl={8} span={24}>
                        <ArticleSkeletonCard />
                      </Col>
                    ))
                  ) : articleData?.listArticles?.total ? (
                    articleData?.listArticles?.articles.map((article) => (
                      <Col span={24} xxl={12}>
                        <ArticleCard article={article} />
                      </Col>
                    ))
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 400px)',
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
                <Row justify="center" style={{ marginTop: 15 }}>
                  <Col>
                    <Pagination
                      total={articleData?.listArticles.total}
                      // pageSizeOptions={['12']}
                      showSizeChanger={false}
                      pageSize={articlePagination.pageSize}
                      current={articlePagination.page}
                      onChange={onArticlePaginationChange}
                      showTotal={(total) => `Total Bulletins: ${total}`}
                      hideOnSinglePage
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            {adminRights && (
              <Col span={12} style={{ height: '100%' }}>
                <AdminTodos fullSearch={search} />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Drawer
        title="Feed Item Filters"
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <FeedItemFilter
          order={order}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          typesFilter={typesFilter}
          setTypesFilter={setTypesFilter}
          groupsFilter={groupsFilter}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
        />
      </Drawer>
    </div>
  );
};

export default FeedItem;
