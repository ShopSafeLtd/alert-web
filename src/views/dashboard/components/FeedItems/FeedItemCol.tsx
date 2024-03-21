import { FeedItemType } from 'graphql/generated';
import FeedItemSkeletonCard from '#/components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import IncidentFeed from '#/components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from '#/components/feedItems/FeedItemSection/OffenderFeed';
import InvestigationFeed from '#/components/feedItems/FeedItemSection/investigationFeed';
import VehicleFeed from '#/components/feedItems/FeedItemSection/VehicleFeed';
import CrimeGroupFeed from '#/components/feedItems/FeedItemSection/CrimeGroupFeed';
import ArticleFeed from '#/components/feedItems/FeedItemSection/ArticleFeed';
import BanFeed from '#/components/feedItems/FeedItemSection/BanFeed';
import React from 'react';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { Card, Col, Empty } from 'antd';
import useFeedItems from '#/views/dashboard/components/FeedItems/useFeedItems';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';

const FeedItemCol = () => {
  const {
    variables: { search },
    adminRights,
    openLightbox,
    intl,
    saving,
  } = useDashboardContext();
  const { loading, data, fetchMoreScroll, onDeleteFeedItem } = useFeedItems();
  const total = data?.listFeedItems?.total || 0;
  const feedItems = data?.listFeedItems?.feedItems.length || 0;
  return (
    <Col
      style={{
        height: 'inherit',
      }}
    >
      {loading ? (
        <div
          style={{
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <FeedItemSkeletonCard key={index} />
          ))}
        </div>
      ) : data?.listFeedItems?.total ? (
        <DashboardInfiniteScroll
          dataLength={feedItems}
          next={() => fetchMoreScroll()}
          hasMore={feedItems < total}
          id="feed-scroll"
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
        </DashboardInfiniteScroll>
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
                    defaultMessage: 'No feed items match your search criteria',
                    id: 'pQjC2k',
                  })
            }
          />
        </Card>
      )}
    </Col>
  );
};

export default FeedItemCol;
