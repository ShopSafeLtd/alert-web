import React from 'react';
import type { FeedItemsQuery, ListOffendersFeedQuery } from 'graphql/generated';
import { FeedItemType } from 'graphql/generated';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Row,
  Skeleton,
  Tooltip,
  Typography,
} from 'antd';
import Marquee from 'react-fast-marquee';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faFilter,
  faNewspaper,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import IncidentFeed from 'components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from 'components/feedItems/FeedItemSection/OffenderFeed';
import ArticleFeed from 'components/feedItems/FeedItemSection/ArticleFeed';
import InvestigationFeed from 'components/feedItems/FeedItemSection/investigationFeed';
import WatermarkImage from 'components/images/WatermarkImage.view';
import FeedItemFilter from 'components/feedItems/FeedItemFilter';
import VehicleFeed from 'components/feedItems/FeedItemSection/VehicleFeed';
import CrimeGroupFeed from 'components/feedItems/FeedItemSection/CrimeGroupFeed';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import FeedItemSkeletonCard from 'components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import AdminTodos from 'components/feedItems/AdminTodos';
import BanFeed from 'components/feedItems/FeedItemSection/BanFeed';
import ArticlesSection from 'components/feedItems/Articles/ArticlesSection';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import useStyles from './FeedItem.styles';
import Loading from '../../components/shared-components/AntD/Loading';
import DebouncedInput from '../../utils/debounced-input';

const { Title, Paragraph } = Typography;

interface Props {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  recentOffenderData: ListOffendersFeedQuery | undefined;
  recentOffenderLoading: boolean;
  groupsLoading: boolean;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  fetchMoreScroll: () => void;
}

const FeedItem = ({
  data,
  loading,
  fetchMoreScroll,
  recentOffenderData,
  recentOffenderLoading,
  groupsLoading,
  onDeleteFeedItem,
  saving,
}: Props): JSX.Element => {
  const {
    setOrder,
    setSearch,
    groups,
    variables,
    adminRights,
    setTypesFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setGallery,
    setCreatedAtFilter,
    lightboxElements,
    openLightbox,
    lightBoxOpen,
  } = useDashboardContext();

  const classes = useStyles();
  const intl = useIntl();
  const total = data?.listFeedItems?.total || 0;
  const feedItems = data?.listFeedItems?.feedItems.length || 0;
  const {
    search,
    gallery,
    groups: groupsFilter,
    createdAt: createdAtFilter,
  } = variables;

  console.log(groups);
  return (
    <div
      className="feed-container"
      style={{ height: '100vh', padding: 15, overflow: 'hidden' }}
    >
      <Marquee autoFill style={{ marginBottom: 10 }}>
        {intl.formatMessage({
          id: 'w7HJ2H',
          defaultMessage: ' Back to work 😠 time is money 😠',
        })}
        <div style={{ width: 200 }} />
      </Marquee>
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
        <Row align="middle" gutter={12}>
          <Col span={4} xxl={6}>
            <DebouncedInput
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for anything in alert...',
                id: 'FZ9gwb',
              })}
              allowClear
              // value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col flex={1}>
            <CheckTags
              mode="check"
              noGutter
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
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Sort & Filter',
                id: 'f2g3SM',
              })}
            >
              <Button
                onClick={toggleSortFilter}
                icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              />
            </Tooltip>
          </Col>
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
                      margin: 0,

                      overflow: 'hidden',
                      borderRadius: 10,
                      maxHeight: 130,
                    }}
                    loading={loading}
                  >
                    <>
                      {/* <Row><Col sapn={4}></Col></Row> */}
                      {/* <Row
                        style={{ margin: '8px 8px 4px' }}
                        // justify="end"
                        wrap={false}
                      >
                        <Title
                          style={{ margin: 0, fontSize: 14, maxWidth: '60%' }}
                          level={4}
                          ellipsis
                        >
                          {feedItem?.message}
                        </Title>
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
                                    content: intl.formatMessage({
                      defaultMessage: 'This action cannot be undone.',
                      id: 'JDJoIZ',
                    }),
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
                      <Divider style={{ margin: 0 }} /> */}

                      {/* create new incident/offender */}
                      {feedItem?.type === FeedItemType.NewIncident &&
                        feedItem.incident && (
                          <IncidentFeed
                            feedItem={feedItem}
                            adminRights={adminRights}
                            onDeleteFeedItem={onDeleteFeedItem}
                            saving={saving}
                            openLightbox={openLightbox}
                            isNewIncident
                          />
                        )}
                      {feedItem?.type === FeedItemType.NewOffender && (
                        <OffenderFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                          isNewOffender
                        />
                      )}
                      {feedItem?.type === FeedItemType.NewInvestigation && (
                        <InvestigationFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                          isNewInvestigation
                        />
                      )}
                      {feedItem?.type === FeedItemType.NewVehicle && (
                        <VehicleFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                          isNewVehicle
                        />
                      )}
                      {feedItem?.type === FeedItemType.NewCrimegroup && (
                        <CrimeGroupFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          openLightbox={openLightbox}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          isNewCrimeGroup
                        />
                      )}
                      {/* update details  */}
                      {feedItem?.type === FeedItemType.Incident &&
                        feedItem.incident && (
                          <IncidentFeed
                            adminRights={adminRights}
                            onDeleteFeedItem={onDeleteFeedItem}
                            saving={saving}
                            feedItem={feedItem}
                            openLightbox={openLightbox}
                          />
                        )}
                      {feedItem?.type === FeedItemType.Offender &&
                        feedItem.incident && (
                          <OffenderFeed
                            feedItem={feedItem}
                            adminRights={adminRights}
                            onDeleteFeedItem={onDeleteFeedItem}
                            saving={saving}
                            openLightbox={openLightbox}
                          />
                        )}
                      {feedItem?.type === FeedItemType.Investigation && (
                        <InvestigationFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}

                      {/* add new images */}
                      {feedItem?.type === FeedItemType.IncidentImage &&
                        feedItem.incident && (
                          <IncidentFeed
                            adminRights={adminRights}
                            onDeleteFeedItem={onDeleteFeedItem}
                            saving={saving}
                            feedItem={feedItem}
                            openLightbox={openLightbox}
                            isNewImage
                          />
                        )}
                      {feedItem?.type === FeedItemType.OffenderImage && (
                        <OffenderFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                          isNewImage
                        />
                      )}
                      {feedItem?.type === FeedItemType.InvestigationImage && (
                        <InvestigationFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                          isNewImage
                        />
                      )}
                      {feedItem?.type === FeedItemType.VehicleImage && (
                        <VehicleFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                          isNewImage
                        />
                      )}
                      {/* add new intel */}
                      {feedItem?.type === FeedItemType.IncidentIntel &&
                        feedItem.incident && (
                          <IncidentFeed
                            adminRights={adminRights}
                            onDeleteFeedItem={onDeleteFeedItem}
                            saving={saving}
                            feedItem={feedItem}
                            openLightbox={openLightbox}
                          />
                        )}
                      {feedItem?.type === FeedItemType.OffenderIntel && (
                        <OffenderFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}
                      {feedItem?.type === FeedItemType.InvestigationIntel && (
                        <InvestigationFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}
                      {feedItem?.type === FeedItemType.VehicleIntel && (
                        <VehicleFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}
                      {feedItem?.type === FeedItemType.CrimegroupIntel && (
                        <CrimeGroupFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}

                      {/* article */}
                      {feedItem?.type === FeedItemType.NewArticle && (
                        <ArticleFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}
                      {/* ban */}
                      {feedItem?.type === FeedItemType.NewBan && (
                        <BanFeed
                          feedItem={feedItem}
                          adminRights={adminRights}
                          onDeleteFeedItem={onDeleteFeedItem}
                          saving={saving}
                          openLightbox={openLightbox}
                        />
                      )}
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
                fullCreatedAtFilter={createdAtFilter}
                fullGroupFilter={groupsFilter}
                saving={saving}
                adminRights={adminRights}
                fullGallery={gallery}
              />
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
        title={intl.formatMessage({
          defaultMessage: 'Feed Item Filters',
          id: 'SYqxvY',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <FeedItemFilter
          variables={variables}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          setTypesFilter={setTypesFilter}
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

export default FeedItem;
