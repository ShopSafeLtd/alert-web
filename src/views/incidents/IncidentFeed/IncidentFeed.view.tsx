import React from 'react';

import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import IncidentCard from 'components/incidents/IncidentCard';
import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faGrid,
  faGrid2,
  faPlus,
  faTable,
} from '@fortawesome/pro-light-svg-icons';
import type { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import IncidentFilter from 'components/incidents/IncidentFilter';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { IncidentFilters } from 'state/data-model';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import { PrioButtonFilter } from '#/components/incidents/IncidentFilter/PrioFilter';
import Loading from '../../../components/shared-components/AntD/Loading';
import DebouncedInput from '../../../utils/debounced-input';
import type { RecycleIncidentMutation } from 'graphql/incidents/mutations/recycle-incident.generated';
import type { IncidentsFeedQuery } from '#/views/incidents/IncidentFeed/graphql/queries/incident-feed.generated';

const useStyles = createUseStyles({
  row: {
    cursor: 'pointer',
  },
});

interface Props {
  data: IncidentsFeedQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  setSearch: (value: string) => void;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGallery: (values: string[]) => void;
  goods: { value: string; label: string }[];

  goodsLoading: boolean;

  fetchMoreScroll: () => void;
  variables: IncidentFilters;
  setCompactView: () => void;
  setTableView: () => void;
  tableView: boolean;
}

const IncidentFeed = ({
  data,
  loading,
  lightboxElements,
  openLightbox,
  // onPaginationChange,
  // pagination,
  setSearch,
  crimeTypes,
  tagsLoading,
  updateIncidentList,
  lightBoxOpen,
  onNavigate,
  sortFilter,
  toggleSortFilter,
  clearFilters,
  setGallery,
  setPeculiarities,

  goods,
  goodsLoading,

  fetchMoreScroll,
  variables,
  setCompactView,
  setTableView,
  tableView,
}: Props): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { search, gallery, compactView, priority } = variables;
  const classes = useStyles();

  return (
    <div
      className="feed-container"
      style={loading ? { padding: 10, paddingRight: 12 } : { paddingRight: 0 }}
    >
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row align="middle" gutter={[12, 12]}>
          <Col span={8} xxl={6}>
            <DebouncedInput
              size="small"
              // style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Incidents...',
              })}
              allowClear
              defaultValue={search || ''}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col>
            <CheckTags
              mode="check"
              noGutter
              value={gallery}
              onChange={setGallery}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Following',
                  }),
                  value: 'FOLLOWING',
                },
                // {
                //   label: intl.formatMessage({
                //     defaultMessage: 'My Data',
                //     id: 'dr0ueW',
                //   }),
                //   value: 'MYDATA',
                // },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Not Approved',
                  }),
                  value: 'NOT APPROVED',
                  needAdminRight: true,
                },
              ]}
            />
          </Col>
          <Col flex={1}>
            <PrioButtonFilter intl={intl} selected={priority} />
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip
              // placement="topLeft"
              title={
                compactView
                  ? intl.formatMessage({
                      defaultMessage: 'Present incidents in normal normal',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Present incidents in compact card',
                    })
              }
            >
              <Button
                onClick={setCompactView}
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: '0px solid #000',
                }}
                icon={
                  <FontAwesomeIcon
                    icon={compactView ? faGrid2 : faGrid}
                    size="lg"
                  />
                }
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Switch to table view',
              })}
            >
              <Button
                onClick={setTableView}
                style={{
                  borderRadius: 0,
                  borderRightWidth: 0,
                }}
                icon={<FontAwesomeIcon icon={faTable} size="lg" />}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Sort & Filter',
              })}
            >
              <Button
                onClick={toggleSortFilter}
                style={{
                  borderRadius: 0,
                }}
                icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Add new incident',
              })}
            >
              <Button
                type="primary"
                onClick={onNavigate}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeftWidth: 0,
                }}
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
              >
                {intl.formatMessage({
                  defaultMessage: 'Incident',
                })}
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </Card>

      {!tableView && (
        <div>
          {loading ? (
            <Row
              gutter={24}
              align="stretch"
              style={{
                alignItems: 'stretch',
                padding: 10,
                overflowX: 'hidden',
              }}
            >
              {Array.from({ length: compactView ? 48 : 24 }).map((_, index) => (
                <Col
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{ marginBottom: compactView ? 0 : 20 }}
                  span={compactView ? 6 : 8}
                  xxl={compactView ? 4 : 6}
                >
                  {compactView ? (
                    <CompactSkeletonCard />
                  ) : (
                    <IncidentSkeletonCard />
                  )}
                </Col>
              ))}
            </Row>
          ) : data?.incidentsRelay && data.incidentsRelay.edges.length > 0 ? (
            <InfiniteScroll
              dataLength={data?.incidentsRelay.edges.length}
              next={() => fetchMoreScroll()}
              hasMore={data?.incidentsRelay.pageInfo.hasNextPage}
              loader={<Loading />}
              height="calc(100vh - 78px)"
              style={{ overflowX: 'hidden' }}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <b>-----------</b>
                </p>
              }
            >
              <Row
                gutter={compactView ? [10, 10] : [8, 16]}
                align="stretch"
                style={{
                  alignItems: 'stretch',
                  padding: 10,
                  overflowX: 'hidden',
                }}
              >
                {data.incidentsRelay.edges.map(({ node }) => (
                  <Col
                    span={compactView ? 6 : 8}
                    xxl={compactView ? 4 : 6}
                    key={node?.id}
                  >
                    <IncidentCard
                      key={node?.id}
                      incident={node}
                      openLightbox={openLightbox}
                      update={updateIncidentList}
                      compactView={compactView}
                    />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          ) : (
            <Row gutter={8}>
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
                          defaultMessage: 'No Incidents',
                        })
                      : intl.formatMessage({
                          defaultMessage:
                            'No incidents match your search criteria',
                        })
                  }
                />
              </div>
            </Row>
          )}
        </div>
      )}
      {tableView && (
        <div style={{ marginRight: 10 }}>
          <InfiniteScroll
            dataLength={data?.incidentsRelay.edges.length || 0}
            next={() => fetchMoreScroll()}
            hasMore={data?.incidentsRelay.pageInfo.hasNextPage || false}
            loader={<Loading />}
            height="calc(100vh - 78px)"
            style={{ overflowX: 'hidden' }}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
          >
            <Table
              style={{ marginBottom: 20 }}
              columns={[
                {
                  key: 'alertId',
                  dataIndex: 'alertId',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Alert ID',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'type',
                  dataIndex: 'type',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Type',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'dayTime',
                  dataIndex: 'dayTime',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Time & Date',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'offenders',
                  dataIndex: 'offenders',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Offenders',
                      })}
                    </Typography.Text>
                  ),
                  render: (value: { id: string; name: string }[]) =>
                    value.map((offender) => (
                      <Tag style={{ marginBottom: 5 }} key={offender.id}>
                        {offender.name}
                      </Tag>
                    )),
                },
                {
                  key: 'description',
                  dataIndex: 'description',
                  title: intl.formatMessage({
                    defaultMessage: 'Description',
                  }),
                  render: (value: string) => (
                    <Tooltip title={value}>
                      <Typography.Paragraph
                        style={{ marginBottom: 0 }}
                        ellipsis={{ rows: 3 }}
                      >
                        {value}
                      </Typography.Paragraph>
                    </Tooltip>
                  ),
                },
              ]}
              dataSource={data?.incidentsRelay.edges.map((item) => ({
                key: item.node.id,
                alertId: item.node.reference,
                type: item.node.crimeTypes.map((type) => type.name).toString(),
                dayTime: item.node.dayTime,
                description: item.node.description,
                offenders: item.node.offenders,
              }))}
              pagination={false}
              rowClassName={classes.row}
              onRow={(record) => ({
                onClick: () => navigate(`/app/incidents/view/${record.key}`),
              })}
            />
          </InfiniteScroll>
        </div>
      )}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Incident Filters',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <IncidentFilter
          crimeTypes={crimeTypes}
          tagsLoading={tagsLoading}
          clearFilters={clearFilters}
          setPeculiarities={setPeculiarities}
          goods={goods}
          goodsLoading={goodsLoading}
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

export default IncidentFeed;
