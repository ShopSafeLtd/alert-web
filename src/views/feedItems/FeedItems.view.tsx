import React from 'react';
import {
  FeedItemsQuery,
  FeedItemType,
  ListArticlesQuery,
  ListOffendersQuery,
  ListUnapprovedIncidentsQuery,
  Model,
} from 'graphql/generated';
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
import moment from 'moment';

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
import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import { PaginationModel } from 'types/DataType';
import InvestigationFeed from 'components/feedItems/FeedItemSection/investigationFeed';
import WatermarkImage from 'components/images/WatermarkImage.view';
import FeedItemFilter from 'components/feedItems/FeedItemFilter';
import { FeedItemSort } from 'state';
import VehicleFeed from 'components/feedItems/FeedItemSection/VehicleFeed';
import CrimeGroupFeed from 'components/feedItems/FeedItemSection/CrimeGroupFeed';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';

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
  // search: string;
  setSearch: (value: string) => void;
  unapprovedIncidents: ListUnapprovedIncidentsQuery | undefined;
  unapprovedIncidentsLoading: boolean;
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
  // search,
  setSearch,
  unapprovedIncidents,
  unapprovedIncidentsLoading,
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
}: // updateIncidentList,
// onNavigate,
Props): JSX.Element => (
  <div className="feed-container" style={{ height: '100vh', padding: 15 }}>
    <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
      <Row align="middle" gutter={16}>
        <Col span={10} xl={8}>
          <Row>
            <Col span={24} xxl={24} xl={24}>
              <Input
                size="small"
                style={{ width: '100%' }}
                placeholder="Search for anything in alert..."
                // value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="radio"
            value={gallery}
            onChange={setGallery}
            options={[
              {
                label: 'Subscribed',
                value: 'SUBSCRIBED',
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
        <div
          style={{
            height: 'calc(100vh - 100px)',
            overflow: 'auto',
            paddingBottom: 20,
          }}
        >
          {data?.listFeedItems?.feedItems &&
          data.listFeedItems?.feedItems.length
            ? data.listFeedItems?.feedItems.map((feedItem) => (
                <Card
                  style={{
                    width: '100%',
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
                                  title: 'Do you want to delete the feedItem?',
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
                    </div>
                  </>
                </Card>
              ))
            : null}
          <Row justify="center">
            <Col>
              <Pagination
                total={data?.listFeedItems?.total}
                pageSizeOptions={['20']}
                pageSize={pagination.pageSize}
                current={pagination.page}
                onChange={onPaginationChange}
                showTotal={(total) => `Total FeedItems: ${total}`}
                hideOnSinglePage
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={15} xxl={16} xl={15}>
        {/* <IncidentSkeletonCard /> */}
        <Card style={{ height: 190, marginBottom: 15 }}>
          <Title level={4} style={{ fontSize: 16, marginTop: -10 }}>
            Recently Active Offenders
          </Title>

          {recentOffenderLoading ? (
            <Row gutter={8} style={{ height: 145 }}>
              {[1, 2, 3, 4, 5].map((key) => (
                <Col key={key}>
                  <Skeleton.Avatar
                    active
                    shape="square"
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: '0.625rem',
                    }}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Row
              gutter={8}
              style={{
                overflow: 'auto',
                flexWrap: 'nowrap',
                height: 145,
                overflowY: 'hidden',
              }}
            >
              {recentOffenderData?.listOffenders?.offenders.map((offender) => (
                <Col key={offender.id}>
                  <Tooltip placement="bottom" title={`View ${offender.name} `}>
                    <Link to={`/app/offenders/view/${offender.id}`}>
                      <Card
                        // onClick={() => setAddRecentOffender(offender)}
                        className="offender-card"
                        bodyStyle={{
                          width: 120,
                          height: 120,
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
                          <WatermarkImage url={offender.images[0]?.optimised} />
                        )}
                        {offender.images.length === 0 && (
                          <FontAwesomeIcon
                            style={{ color: 'rgb(114, 132, 154)' }}
                            icon={faUser}
                            size="3x"
                          />
                        )}
                        <Paragraph
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            background: 'rgba(0,0,0,.5)',
                            color: '#FFF',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            margin: 0,
                            padding: '3px 10px 3px',
                          }}
                        >
                          {offender.name}
                        </Paragraph>
                      </Card>
                    </Link>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          )}
        </Card>

        <Row gutter={12} style={{ height: 'calc(60vh)' }}>
          <Col span={12} xxl={16} xl={12} style={{ height: '100%' }}>
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
              <Divider style={{ margin: '0 0 10px' }} />
              <Row gutter={[8, 8]}>
                {articleLoading
                  ? Array.from({ length: 24 }).map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Col key={index} xxl={8} span={24}>
                        <IncidentSkeletonCard />
                      </Col>
                    ))
                  : articleData?.listArticles?.articles.map((article) => (
                      <Col
                        span={24}
                        xxl={8}
                        style={{
                          alignItems: 'stretch',
                        }}
                      >
                        <ArticleCard article={article} />
                      </Col>
                    ))}
              </Row>
              <Row justify="center" style={{ marginTop: 15 }}>
                <Col>
                  <Pagination
                    total={articleData?.listArticles.total}
                    pageSizeOptions={['12']}
                    pageSize={articlePagination.pageSize}
                    current={articlePagination.page}
                    onChange={onArticlePaginationChange}
                    showTotal={(total) => `Total Bulletins: ${total}`}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          {adminRights && (
            <Col span={12} xxl={8} xl={12} style={{ height: '100%' }}>
              <Card
                bodyStyle={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  paddingTop: 15,
                  overflow: 'auto',
                  height: 'calc(100vh - 300px)',
                }}
              >
                <Title
                  style={{
                    marginRight: 20,
                    marginLeft: 20,
                    marginBottom: 10,
                    fontSize: 16,
                  }}
                  level={4}
                >
                  Awaiting Approval
                </Title>
                {unapprovedIncidentsLoading ? (
                  <div />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'column',
                      height: 'calc(100vh - 370px)',
                    }}
                  >
                    <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                    {unapprovedIncidents?.listIncidents?.incidents.map(
                      (incident) => (
                        <Link
                          to={`/app/incidents/review/${incident.id}`}
                          key={incident.id}
                        >
                          <div style={{ padding: '10px 20px' }}>
                            <div style={{ marginBottom: 10 }}>
                              <Text style={{ fontSize: 14 }} strong>
                                Incident submitted{' '}
                                {moment(incident.date).fromNow()} by{' '}
                                {incident.createdBy.fullName}.
                              </Text>
                            </div>
                            <Row wrap={false} style={{ marginTop: 10 }}>
                              {incident.images.length > 0 && (
                                <Col style={{ marginRight: 10 }}>
                                  <div
                                    style={{
                                      width: 80,
                                      height: 80,
                                      borderRadius: 5,
                                    }}
                                  >
                                    <WatermarkImage
                                      url={incident.images[0]?.optimised}
                                    />
                                  </div>
                                </Col>
                              )}
                              <Col>
                                <div>
                                  <Title
                                    level={4}
                                    style={{ fontSize: 16, marginBottom: 2 }}
                                    ellipsis
                                  >
                                    {incident.subject}
                                  </Title>
                                  <div>
                                    <Text style={{ fontSize: 14 }}>
                                      Created At: {incident.dayTime}
                                    </Text>
                                  </div>
                                  <div>
                                    <Text style={{ fontSize: 14 }}>
                                      Business: {incident.business?.name}
                                    </Text>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                        </Link>
                      )
                    )}
                    {unapprovedIncidents?.listIncidents?.incidents.length ===
                      0 && (
                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Empty description="Nothing to approve" />
                      </div>
                    )}
                  </div>
                )}
              </Card>
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
      />
    </Drawer>
  </div>
);

export default FeedItem;
