import type { IncidentsFeedQuery } from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { RecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import type { IncidentFilters } from 'state/data-model';

import { PrioButtonFilter } from '#/components/incidents/IncidentFilter/PrioFilter';
import {
  faFilter,
  faGrid,
  faGrid2,
  faPlus,
  faTable,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import IncidentCard from 'components/incidents/IncidentCard';
import IncidentFilter from 'components/incidents/IncidentFilter';
import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Loading from '../../../components/shared-components/AntD/Loading';
import DebouncedInput from '../../../utils/debounced-input';

const useStyles = createUseStyles({
  row: {
    cursor: 'pointer',
  },
});

interface Props {
  clearFilters: () => void;
  data: IncidentsFeedQuery | undefined;
  fetchMoreScroll: () => void;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;
  onNavigate: () => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setCompactView: () => void;
  setGallery: (values: string[]) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
  sortFilter: boolean;
  tableView: boolean;
  toggleSortFilter: () => void;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  variables: IncidentFilters;
}

const IncidentFeed = ({
  clearFilters,
  data,
  fetchMoreScroll,
  // onPaginationChange,
  lightBoxOpen,
  lightboxElements,
  loading,
  onNavigate,
  openLightbox,
  setCompactView,
  setGallery,
  setPeculiarities,
  // pagination,
  setSearch,
  setTableView,
  sortFilter,
  tableView,
  toggleSortFilter,
  updateIncidentList,
  variables,
}: Props): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { compactView, gallery, priority, search } = variables;
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
              allowClear
              defaultValue={search || ''}
              onChange={(e) => setSearch(e.target.value)}
              // style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Incidents...',
              })}
              size="small"
            />
          </Col>
          <Col>
            <CheckTags
              mode="check"
              noGutter
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
                  permissions: [
                    {
                      method: PermissionMethod.Approve,
                      model: PermissionModel.Incidents,
                    },
                  ],
                  value: 'NOT APPROVED',
                },
              ]}
              value={gallery}
            />
          </Col>
          <Col flex={1}>
            <PrioButtonFilter intl={intl} selected={priority} />
          </Col>
          <Col style={{ alignItems: 'center', display: 'flex' }}>
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
                icon={
                  <FontAwesomeIcon
                    icon={compactView ? faGrid2 : faGrid}
                    size="lg"
                  />
                }
                onClick={setCompactView}
                style={{
                  borderBottomRightRadius: 0,
                  borderRight: '0px solid #000',
                  borderTopRightRadius: 0,
                }}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Switch to table view',
              })}
            >
              <Button
                icon={<FontAwesomeIcon icon={faTable} size="lg" />}
                onClick={setTableView}
                style={{
                  borderRadius: 0,
                  borderRightWidth: 0,
                }}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Sort & Filter',
              })}
            >
              <Button
                icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
                onClick={toggleSortFilter}
                style={{
                  borderRadius: 0,
                }}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Add new incident',
              })}
            >
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
                onClick={onNavigate}
                style={{
                  borderBottomLeftRadius: 0,
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                }}
                type="primary"
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
              align="stretch"
              gutter={24}
              style={{
                alignItems: 'stretch',
                overflowX: 'hidden',
                padding: 10,
              }}
            >
              {Array.from({ length: compactView ? 48 : 24 }).map((_, index) => (
                <Col
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  span={compactView ? 6 : 8}
                  style={{ marginBottom: compactView ? 0 : 20 }}
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
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <b>-----------</b>
                </p>
              }
              hasMore={data?.incidentsRelay.pageInfo.hasNextPage}
              height="calc(100vh - 78px)"
              loader={<Loading />}
              next={() => fetchMoreScroll()}
              style={{ overflowX: 'hidden' }}
            >
              <Row
                align="stretch"
                gutter={compactView ? [10, 10] : [8, 16]}
                style={{
                  alignItems: 'stretch',
                  overflowX: 'hidden',
                  padding: 10,
                }}
              >
                {data.incidentsRelay.edges.map(({ node }) => (
                  <Col
                    key={node?.id}
                    span={compactView ? 6 : 8}
                    xxl={compactView ? 4 : 6}
                  >
                    <IncidentCard
                      compactView={compactView}
                      incident={node}
                      key={node?.id}
                      openLightbox={openLightbox}
                      update={updateIncidentList}
                    />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          ) : (
            <Row gutter={8}>
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
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
            hasMore={data?.incidentsRelay.pageInfo.hasNextPage || false}
            height="calc(100vh - 78px)"
            loader={<Loading />}
            next={() => fetchMoreScroll()}
            style={{ overflowX: 'hidden' }}
          >
            <Table
              columns={[
                {
                  dataIndex: 'alertId',
                  key: 'alertId',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Alert ID',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'type',
                  key: 'type',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Type',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'dayTime',
                  key: 'dayTime',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Time & Date',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'siteName',
                  key: 'siteName',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Business Name',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'offenders',
                  key: 'offenders',
                  render: (value: { id: string; name: string }[]) =>
                    value.map((offender) => (
                      <Tag key={offender.id} style={{ marginBottom: 5 }}>
                        {offender.name}
                      </Tag>
                    )),
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Offenders',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'description',
                  key: 'description',
                  render: (value: string) => (
                    <Tooltip title={value}>
                      <Typography.Paragraph
                        ellipsis={{ rows: 3 }}
                        style={{ marginBottom: 0 }}
                      >
                        {value}
                      </Typography.Paragraph>
                    </Tooltip>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Description',
                  }),
                },
              ]}
              dataSource={data?.incidentsRelay.edges.map((item) => ({
                alertId: item.node.reference,
                dayTime: item.node.dayTime,
                description: item.node.description,
                key: item.node.id,
                offenders: item.node.offenders,
                siteName: item.node.business?.name ?? '',
                type: item.node.crimeTypes.map((type) => type.name).toString(),
              }))}
              onRow={(record) => ({
                onClick: () => navigate(`/app/incidents/view/${record.key}`),
              })}
              pagination={false}
              rowClassName={classes.row}
              style={{ marginBottom: 20 }}
            />
          </InfiniteScroll>
        </div>
      )}

      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Incident Filters',
        })}
        width={500}
      >
        <IncidentFilter
          clearFilters={clearFilters}
          setPeculiarities={setPeculiarities}
        />
      </Drawer>
      <Lightbox
        close={() => openLightbox([], 0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={lightboxElements}
      />
    </div>
  );
};

export default IncidentFeed;
