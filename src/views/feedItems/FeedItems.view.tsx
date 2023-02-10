import React from 'react';
import {
  FeedItemsQuery,
  FeedItemType,
  ListOffendersQuery,
  ListUnapprovedIncidentsQuery,
} from 'graphql/generated';
import {
  Affix,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Pagination,
  Row,
  Skeleton,
  Typography,
} from 'antd';
// import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import moment from 'moment';
import IncidentFeed from 'components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from 'components/feedItems/FeedItemSection/OffenderFeed';
import { formatDate } from 'utils';
import ArticleFeed from 'components/feedItems/FeedItemSection/ArticleFeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faNewspaper,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import ArticleCard from 'components/feedItems/ArticleSection/ArticleCard';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
// import Lightbox from 'yet-another-react-lightbox';
// import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface Props {
  data: FeedItemsQuery | undefined;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  search: string;
  setSearch: (value: string) => void;
  // updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  // onNavigate: () => void;
  unapprovedIncidents: ListUnapprovedIncidentsQuery | undefined;
  unapprovedIncidentsLoading: boolean;
}

const FeedItem = ({
  data,
  recentOffenderData,
  recentOffenderLoading,
  onPaginationChange,
  pagination,
  search,
  setSearch,
  unapprovedIncidents,
  unapprovedIncidentsLoading,
}: // updateIncidentList,
// onNavigate,
Props): JSX.Element => {
  const [affix, setAffix] = React.useState(false);

  return (
    <div className="feed-container">
      <Affix offsetTop={40} onChange={(affixed) => setAffix(!!affixed)}>
        <Row
          wrap={false}
          gutter={8}
          style={{
            paddingBottom: 10,
            backgroundColor: !affix ? 'rgb(250, 250, 251)' : 'white',
            paddingTop: affix ? 10 : 0,
            borderBottom: affix ? '1px solid #e8e8e8' : 'none',
          }}
        >
          <Col span={10}>
            <Row>
              <Col span={24} xxl={24} xl={24}>
                <Input
                  size="small"
                  style={{ width: '100%' }}
                  placeholder="Search for anything in alert..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              {/* <Col>
                <Select
                  placeholder="Groups"
                  mode="multiple"
                  size="small"
                  maxTagCount={2}
                  style={{ width: 250 }}
                  loading={groupsLoading}
                  onChange={onGroupsChange}
                  value={variables.groups}
                >
                  {groups.map((group) => (
                    <Select.Option value={group.value}>{group.label}</Select.Option>
                  ))}
                </Select>
              </Col> */}
            </Row>
          </Col>
          <Col flex={1} />
          <Col>
            <Link to="/app/incidents/add">
              <Button size="small" type="primary">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  style={{ marginRight: 10 }}
                />{' '}
                Add Incident
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/app/offenders/add">
              <Button size="small" type="primary">
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 10 }} />{' '}
                Add Offender
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/app/article ">
              <Button size="small" type="primary">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  style={{ marginRight: 10 }}
                />{' '}
                Add Bulletin
              </Button>
            </Link>
          </Col>
        </Row>
      </Affix>
      <Row gutter={15}>
        <Col span={11} xxl={9} xl={9} lg={12}>
          <div
            style={{
              height: 'calc(100vh - 126px)',
              overflow: 'auto',
              paddingBottom: 20,
            }}
          >
            {data?.listFeedItems?.feedItems &&
              data.listFeedItems?.feedItems.length &&
              data.listFeedItems?.feedItems.map((item) => (
                <Card
                  headStyle={{ borderBottom: '1px black' }}
                  style={{
                    width: '100%',
                    borderBottom: '1px black',
                    marginBottom: 10,
                  }}
                  key={item?.incidentId || item?.offenderId || ''}
                  bodyStyle={{ padding: 0 }}
                >
                  <>
                    <Row style={{ margin: '10px 15px 5px' }}>
                      <Col flex={1}>
                        <Title style={{ margin: 0 }} level={5}>
                          {item?.message}
                        </Title>
                      </Col>
                      <Col>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {formatDate(item?.updatedAt)}
                        </Text>
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }} />
                    <div style={{ borderTop: '1px', padding: 10 }}>
                      {/* create new incident/offender */}
                      {item?.type === FeedItemType.NewIncident && (
                        <IncidentFeed feedItem={item} isNewIncident />
                      )}
                      {item?.type === FeedItemType.NewOffender && (
                        <OffenderFeed feedItem={item} isNewOffender />
                      )}
                      {/* update details  */}
                      {item?.type === FeedItemType.Incident && (
                        <IncidentFeed feedItem={item} />
                      )}
                      {item?.type === FeedItemType.Offender && (
                        <OffenderFeed feedItem={item} />
                      )}
                      {/* add new images */}
                      {item?.type === FeedItemType.IncidentImage && (
                        <IncidentFeed feedItem={item} isNewImage />
                      )}
                      {item?.type === FeedItemType.OffenderImage && (
                        <OffenderFeed feedItem={item} isNewImage />
                      )}
                      {/* add new intel */}
                      {item?.type === FeedItemType.IncidentIntel && (
                        <IncidentFeed feedItem={item} />
                      )}
                      {item?.type === FeedItemType.OffenderIntel && (
                        <OffenderFeed feedItem={item} />
                      )}

                      {/* article */}
                      {item?.type === FeedItemType.NewArticle && (
                        <ArticleFeed feedItem={item} />
                      )}
                    </div>
                  </>
                </Card>
              ))}
            <Row justify="center">
              <Col>
                <Pagination
                  total={data?.listFeedItems?.total}
                  pageSizeOptions={pagination.sizeOptions}
                  pageSize={pagination.pageSize}
                  current={pagination.page}
                  onChange={onPaginationChange}
                  showTotal={(total) => `Total FeedItems: ${total}`}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={13} xxl={15} xl={15} lg={12}>
          {/* <IncidentSkeletonCard /> */}
          <Card bodyStyle={{ padding: 20 }}>
            <Title level={4} style={{ fontSize: 16 }}>
              Recently Active Offenders
            </Title>
            {recentOffenderLoading ? (
              <Row gutter={8}>
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
                  // marginBottom: 20,
                }}
              >
                {recentOffenderData?.listOffenders?.offenders.map(
                  (offender) => (
                    <Col key={offender.id}>
                      {/* <Tooltip
                placement="bottom"
                title={`Add ${offender.name} to incident`}
              > */}
                      <Card
                        // onClick={() => setAddRecentOffender(offender)}
                        className="offender-card"
                        bodyStyle={{
                          width: 120,
                          height: 120,
                          position: 'relative',
                          backgroundImage: `url(${offender.images[0]?.optimised})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          padding: 0,
                          borderRadius: '0.625rem',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
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
                      {/* </Tooltip> */}
                    </Col>
                  )
                )}
              </Row>
            )}
          </Card>
          <Row gutter={12}>
            <Col span={12}>
              <Card
                bodyStyle={{ paddingRight: 0, paddingLeft: 0, paddingTop: 15 }}
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
                  Recent Bulletins
                </Title>
                <Divider style={{ marginTop: 0, marginBottom: 10 }} />
                <div>
                  {data?.listFeedItems?.feedItems &&
                    data.listFeedItems?.feedItems.length &&
                    data.listFeedItems?.feedItems.map((item) => (
                      <div>
                        {item?.type === FeedItemType.NewArticle && (
                          <ArticleCard articleData={item} />
                        )}
                      </div>
                    ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bodyStyle={{ paddingRight: 0, paddingLeft: 0, paddingTop: 15 }}
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
                  <div>
                    <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                    {unapprovedIncidents?.listIncidents?.incidents.map(
                      (incident) => (
                        <Link
                          to={`/app/incidents/review/${incident.id}`}
                          key={incident.id}
                        >
                          <div style={{ padding: '10px 20px' }}>
                            <div style={{ marginBottom: 10 }}>
                              <Text style={{ fontSize: 12 }} strong>
                                Incident submitted{' '}
                                {moment(incident.date).fromNow()} by{' '}
                                {incident.createdBy.fullName}.
                              </Text>
                            </div>
                            <Row wrap={false} style={{ marginTop: 10 }}>
                              {incident.images && (
                                <Col style={{ marginRight: 10 }}>
                                  <div
                                    style={{
                                      width: 80,
                                      height: 80,
                                      backgroundImage: `url(${incident.images[0]?.optimised})`,
                                      backgroundPosition: 'center',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundSize: 'cover',
                                      borderRadius: 5,
                                    }}
                                  />
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
                                    <Text style={{ fontSize: 12 }}>
                                      Created At: {incident.dayTime}
                                    </Text>
                                  </div>
                                  <div>
                                    <Text style={{ fontSize: 12 }}>
                                      Created By:{' '}
                                      {incident.createdBy?.organisation}
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
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FeedItem;
