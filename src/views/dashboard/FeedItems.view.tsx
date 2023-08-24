import React from 'react';
import type {
  FeedItemsQuery,
  ListOffendersFeedQuery,
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

import { Link } from 'react-router-dom';
import IncidentFeed from 'components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from 'components/feedItems/FeedItemSection/OffenderFeed';
import ArticleFeed from 'components/feedItems/FeedItemSection/ArticleFeed';
import type { DateType } from 'types/DataType';
import InvestigationFeed from 'components/feedItems/FeedItemSection/investigationFeed';
import WatermarkImage from 'components/images/WatermarkImage.view';
import FeedItemFilter from 'components/feedItems/FeedItemFilter';
import type { FeedItemSort } from 'state';
import VehicleFeed from 'components/feedItems/FeedItemSection/VehicleFeed';
import CrimeGroupFeed from 'components/feedItems/FeedItemSection/CrimeGroupFeed';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import FeedItemSkeletonCard from 'components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import AdminTodos from 'components/feedItems/AdminTodos';
import BanFeed from 'components/feedItems/FeedItemSection/BanFeed';
import ArticlesSection from 'components/feedItems/Articles/ArticlesSection';
import FormatCalendar from 'utils/format-calendar-24h';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './FeedItem.styles';
import Loading from '../../components/shared-components/AntD/Loading';

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;

interface Props {
  data: FeedItemsQuery | undefined;
  loading: boolean;

  recentOffenderData: ListOffendersFeedQuery | undefined;
  recentOffenderLoading: boolean;
  // onPaginationChange: (page: number, pageSize: number) => void;
  // pagination: { page: number; pageSize: number; sizeOptions: string[] };

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
  createdAtFilter: DateType | undefined;
  fetchMoreScroll: () => void;
  restrictIncidentAccess: boolean;
}

const FeedItem = ({
  data,
  loading,
  recentOffenderData,
  recentOffenderLoading,
  // onPaginationChange,
  // pagination,
  search,
  setSearch,
  onDeleteFeedItem,
  saving,
  adminRights,
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
  createdAtFilter,
  fetchMoreScroll,
  restrictIncidentAccess,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const total = data?.listFeedItems?.total || 0;
  const feedItems = data?.listFeedItems?.feedItems.length || 0;
  return (
    <div
      className="feed-container"
      style={{ height: '100vh', padding: 15, overflow: 'hidden' }}
    >
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={6}>
            <Input
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for anything in alert...',
                id: 'FZ9gwb',
              })}
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
                  label: intl.formatMessage({
                    id: 'VwMCyX',
                    defaultMessage: 'Not Approved',
                  }),
                  value: 'NOT APPROVED',
                  needAdminRight: true,
                },
                {
                  label: intl.formatMessage({
                    id: 'cPIKU2',
                    defaultMessage: 'Following',
                  }),
                  value: 'FOLLOWING',
                },
                {
                  label: intl.formatMessage({
                    id: 'dr0ueW',
                    defaultMessage: 'My Data',
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
                id: 'f2g3SM',
                defaultMessage: 'Sort & Filter',
              })}
            </Button>
          </Col>
          {!restrictIncidentAccess && (
            <Col>
              <Link to="/app/incidents/add">
                <Button size="small" type="primary">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    style={{ marginRight: 10 }}
                  />
                  {intl.formatMessage({
                    id: 'kG1p3q',
                    defaultMessage: 'Add Incident',
                  })}
                </Button>
              </Link>
            </Col>
          )}
          <Col>
            <Link to="/app/offenders/add">
              <Button size="small" type="primary">
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 10 }} />
                {intl.formatMessage({
                  id: 'm3ChN4',
                  defaultMessage: 'Add Offender',
                })}
              </Button>
            </Link>
          </Col>

          {adminRights && (
            <Col>
              <Link to="/app/article/add">
                <Button size="small" type="primary">
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    style={{ marginRight: 10 }}
                  />
                  {intl.formatMessage({
                    id: 'x52+I1',
                    defaultMessage: 'Add Bulletin',
                  })}
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
              <InfiniteScroll
                dataLength={feedItems}
                next={() => fetchMoreScroll()}
                hasMore={feedItems < total}
                loader={<Loading />}
                height="calc(100vh - 100px)"
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <b>-----------</b>
                  </p>
                }
              >
                {data.listFeedItems?.feedItems.map((feedItem) => (
                  <Card
                    style={{
                      width: '99%',
                      marginBottom: 20,
                    }}
                    key={feedItem?.id}
                    bodyStyle={{
                      padding: 0,
                      overflow: 'hidden',
                      borderRadius: 10,
                    }}
                    loading={loading}
                  >
                    <>
                      <Row
                        style={{ margin: '8px 8px 4px' }}
                        // justify="end"
                        wrap={false}
                      >
                        {/* <Col> */}
                        <Title
                          style={{ margin: 0, fontSize: 14, maxWidth: '60%' }}
                          level={4}
                          ellipsis
                        >
                          {feedItem?.message}
                        </Title>
                        {/* </Col> */}
                        <Col flex={1} />
                        <Col>
                          <Text type="secondary" style={{ fontSize: 14 }}>
                            {FormatCalendar(feedItem?.updatedAt)}
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
                                  // marginLeft: 5,
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
                                    title:
                                      'Do you want to delete the feed item?',
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
                      <div style={{ padding: 0 }}>
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
              </InfiniteScroll>
              {/* <Row justify="center"> */}
              {/*   <Col> */}
              {/*     <Pagination */}
              {/*       total={data?.listFeedItems?.total} */}
              {/*       // pageSizeOptions={['20']} */}
              {/*       showSizeChanger={false} */}
              {/*       pageSize={pagination.pageSize} */}
              {/*       current={pagination.page} */}
              {/*       onChange={onPaginationChange} */}
              {/*       showTotal={(total) => `Total FeedItems: ${total}`} */}
              {/*       hideOnSinglePage */}
              {/*     /> */}
              {/*   </Col> */}
              {/* </Row> */}
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
                    ? intl.formatMessage({
                        defaultMessage: 'No Feed Items',
                        id: 'mOem22',
                      })
                    : intl.formatMessage({
                        defaultMessage:
                          'No feed items match your search criteria',
                        id: 'pQjC2k',
                      })
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
              {intl.formatMessage({
                defaultMessage: 'Recently Active Offenders',
                id: '3CqKJ0',
              })}
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
                          title={intl.formatMessage(
                            {
                              defaultMessage: 'View {offenderName} ',
                              id: 'PnleGP',
                            },
                            { offenderName: offender.name }
                          )}
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
                              {offender.feedImage && (
                                <WatermarkImage
                                  url={offender.feedImage?.low}
                                  position={offender.feedImage?.position}
                                />
                              )}
                              {!offender.feedImage && (
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
                                {intl.formatMessage(
                                  {
                                    defaultMessage:
                                      'Alert ID: {offenderReference}',
                                    id: 'Rdz6pw',
                                  },
                                  { offenderReference: offender.reference }
                                )}
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
                          ? intl.formatMessage({
                              defaultMessage: 'No Offenders',
                              id: 'hO5g1p',
                            })
                          : intl.formatMessage({
                              defaultMessage:
                                'No offenders match your search criteria',
                              id: 'i7eap9',
                            })
                      }
                    />
                  </div>
                )}
              </Row>
            )}
          </Card>

          <Row gutter={12} style={{ height: 'calc(60vh)' }}>
            <Col span={adminRights ? 12 : 24} style={{ height: '100%' }}>
              <ArticlesSection
                fullSearch={search}
                searchMydata={gallery.includes('MYDATA')}
                fullCreatedAtFilter={createdAtFilter}
                fullGroupFilter={groupsFilter}
                saving={saving}
                groups={groups}
                groupsLoading={groupsLoading}
                adminRights={adminRights}
              />
            </Col>
            {adminRights && (
              <Col span={12} style={{ height: '100%' }}>
                <AdminTodos fullSearch={search} groupsFilter={groupsFilter} />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Feed Item Filters',
          id: 'SYqxvY',
        })}
        open={sortFilter}
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
