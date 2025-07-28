import type { Theme } from 'configs/ThemeConfig';

import ArticleFeed from '#/components/feedItems/FeedItemSection/ArticleFeed';
import BanFeed from '#/components/feedItems/FeedItemSection/BanFeed';
import CrimeGroupFeed from '#/components/feedItems/FeedItemSection/CrimeGroupFeed';
import FeedItemSkeletonCard from '#/components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import IncidentFeed from '#/components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from '#/components/feedItems/FeedItemSection/OffenderFeed';
import VehicleFeed from '#/components/feedItems/FeedItemSection/VehicleFeed';
import InvestigationFeed from '#/components/feedItems/FeedItemSection/investigationFeed';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import useFeedItems from '#/views/dashboard/components/FeedItems/useFeedItems';
import { Card, Col, Empty } from 'antd';
import { FeedItemType } from 'graphql/types';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  feedCard: {
    '& .ant-card-body': {
      borderRadius: 10,
      margin: 0,
      maxHeight: 130,
      overflow: 'hidden',
      padding: 0,
    },
    backgroundColor: theme.componentBackground,
    marginBottom: 20,
    width: '99%',
  },
}));

const FeedItemCol = () => {
  const classes = useStyles();
  const {
    adminRights,
    intl,
    openLightbox,
    saving,
    variables: { search },
  } = useDashboardContext();
  const { data, fetchMoreScroll, loading, onDeleteFeedItem } = useFeedItems();
  const total = data?.feedRelay?.pageInfo.hasNextPage;
  const feedItems = data?.feedRelay?.edges;
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
      ) : feedItems?.length ? (
        <DashboardInfiniteScroll
          dataLength={feedItems?.length || 0}
          hasMore={!!total}
          id="feed-scroll"
          next={() => fetchMoreScroll()}
        >
          {feedItems.map(({ node: feedItem }) => (
            <Card
              className={classes.feedCard}
              key={feedItem?.id}
              loading={loading}
            >
              <>
                {/* create new incident/offender */}
                {feedItem?.type === FeedItemType.NewIncident &&
                  feedItem.incident && (
                    <IncidentFeed
                      adminRights={adminRights}
                      feedItem={feedItem}
                      isNewIncident
                      onDeleteFeedItem={onDeleteFeedItem}
                      openLightbox={openLightbox}
                      saving={saving}
                    />
                  )}
                {feedItem?.type === FeedItemType.NewOffender && (
                  <OffenderFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewOffender
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.NewInvestigation && (
                  <InvestigationFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewInvestigation
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.NewVehicle && (
                  <VehicleFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewVehicle
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.NewCrimegroup && (
                  <CrimeGroupFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewCrimeGroup
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {/* update details  */}
                {feedItem?.type === FeedItemType.Incident &&
                  feedItem.incident && (
                    <IncidentFeed
                      adminRights={adminRights}
                      feedItem={feedItem}
                      onDeleteFeedItem={onDeleteFeedItem}
                      openLightbox={openLightbox}
                      saving={saving}
                    />
                  )}
                {feedItem?.type === FeedItemType.Offender &&
                  feedItem.incident && (
                    <OffenderFeed
                      adminRights={adminRights}
                      feedItem={feedItem}
                      onDeleteFeedItem={onDeleteFeedItem}
                      openLightbox={openLightbox}
                      saving={saving}
                    />
                  )}
                {feedItem?.type === FeedItemType.Investigation && (
                  <InvestigationFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}

                {/* add new images */}
                {feedItem?.type === FeedItemType.IncidentImage &&
                  feedItem.incident && (
                    <IncidentFeed
                      adminRights={adminRights}
                      feedItem={feedItem}
                      isNewImage
                      onDeleteFeedItem={onDeleteFeedItem}
                      openLightbox={openLightbox}
                      saving={saving}
                    />
                  )}
                {feedItem?.type === FeedItemType.OffenderImage && (
                  <OffenderFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewImage
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.InvestigationImage && (
                  <InvestigationFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewImage
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.VehicleImage && (
                  <VehicleFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    isNewImage
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {/* add new intel */}
                {feedItem?.type === FeedItemType.IncidentIntel &&
                  feedItem.incident && (
                    <IncidentFeed
                      adminRights={adminRights}
                      feedItem={feedItem}
                      onDeleteFeedItem={onDeleteFeedItem}
                      openLightbox={openLightbox}
                      saving={saving}
                    />
                  )}
                {feedItem?.type === FeedItemType.OffenderIntel && (
                  <OffenderFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.InvestigationIntel && (
                  <InvestigationFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.VehicleIntel && (
                  <VehicleFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {feedItem?.type === FeedItemType.CrimegroupIntel && (
                  <CrimeGroupFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}

                {/* article */}
                {feedItem?.type === FeedItemType.NewArticle && (
                  <ArticleFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
                {/* ban */}
                {feedItem?.type === FeedItemType.NewBan && (
                  <BanFeed
                    adminRights={adminRights}
                    feedItem={feedItem}
                    onDeleteFeedItem={onDeleteFeedItem}
                    openLightbox={openLightbox}
                    saving={saving}
                  />
                )}
              </>
            </Card>
          ))}
        </DashboardInfiniteScroll>
      ) : (
        <Card
          style={{
            alignItems: 'center',
            display: 'flex',
            height: 'calc(100vh - 95px)',
            justifyContent: 'center',
          }}
        >
          <Empty
            description={
              search === ''
                ? intl.formatMessage({
                    defaultMessage: 'No Feed Items',
                  })
                : intl.formatMessage({
                    defaultMessage: 'No feed items match your search criteria',
                  })
            }
          />
        </Card>
      )}
    </Col>
  );
};

export default FeedItemCol;
