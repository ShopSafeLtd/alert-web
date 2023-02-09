import React from 'react';
import {
  FeedItemsQuery,
  FeedItemType,
  ListOffendersQuery,
} from 'graphql/generated';
import {
  Affix,
  Card,
  Col,
  Input,
  Pagination,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
// import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import { FeedItemSort } from 'state';
import IncidentFeed from 'components/feedItems/FeedItemSection/IncidentFeed';
import OffenderFeed from 'components/feedItems/FeedItemSection/OffenderFeed';
import { formatDate } from 'utils';
import ArticleFeed from 'components/feedItems/FeedItemSection/ArticleFeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import ArticleCard from 'components/feedItems/ArticleSection/ArticleCard';

const { Title, Text, Paragraph } = Typography;
// import Lightbox from 'yet-another-react-lightbox';
// import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface Props {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: FeedItemSort;
  setOrder: (value: FeedItemSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
  };
  // updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  // onNavigate: () => void;
}

const FeedItem = ({
  data,
  loading,
  recentOffenderData,
  recentOffenderLoading,
  onPaginationChange,
  pagination,
  order,
  setOrder,
  search,
  setSearch,
  groups,
  groupsLoading,
  onGroupsChange,
  variables,
}: // updateIncidentList,
// onNavigate,
Props): JSX.Element => {
  const [affix, setAffix] = React.useState(false);
  console.log('pagination', pagination);

  return (
    <div className="feed-container">
      <Row gutter={15}>
        <Col span={11} xxl={9} xl={10} lg={12}>
          <Affix offsetTop={40} onChange={(affixed) => setAffix(!!affixed)}>
            <Row
              wrap={false}
              style={{
                paddingBottom: 10,
                backgroundColor: !affix ? 'rgb(250, 250, 251)' : 'white',
                paddingTop: affix ? 10 : 0,
                borderBottom: affix ? '1px solid #e8e8e8' : 'none',
              }}
            >
              <Col span={6} xxl={8} xl={7}>
                <Input
                  size="small"
                  style={{ width: '100%' }}
                  placeholder="Search feedItems..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col flex={1}>
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
                    <Select.Option value={group.value}>
                      {group.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Select
                  value={order}
                  onChange={setOrder}
                  size="small"
                  // style={{ minWidth: 80 }}
                >
                  <Select.Option value={FeedItemSort.updatedAtDesc}>
                    Newest First
                  </Select.Option>
                  <Select.Option value={FeedItemSort.updatedAtAsc}>
                    Oldest First
                  </Select.Option>
                </Select>
              </Col>
            </Row>
          </Affix>

          {data?.listFeedItems?.feedItems &&
            data.listFeedItems?.feedItems.length &&
            data.listFeedItems?.feedItems.map((item) => (
              <Card
                title={item?.message}
                headStyle={{ borderBottom: '1px black' }}
                extra={formatDate(item?.updatedAt)}
                style={{ width: '100%', borderBottom: '1px black' }}
                key={item?.incidentId || item?.offenderId || ''}
              >
                <div
                  style={{ borderTop: '1px', marginLeft: -10, marginRight: 10 }}
                >
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
        </Col>
        <Col span={13} xxl={15} xl={14} lg={12}>
          {/* <IncidentSkeletonCard /> */}
          <Card>
            <Title level={3}>Recently Active Offenders</Title>
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
          <Card>
            <Row>
              {data?.listFeedItems?.feedItems &&
                data.listFeedItems?.feedItems.length &&
                data.listFeedItems?.feedItems.map((item) => (
                  <Col span={4}>
                    {item?.type === FeedItemType.NewArticle && (
                      <ArticleCard articleData={item} />
                    )}
                  </Col>
                ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FeedItem;
