import React from 'react';
import type {
  ListCustomGalleriesQuery,
  ListOffendersRelayQuery,
  RecycleOffenderMutation,
} from 'graphql/generated';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Menu,
  Row,
  Tooltip,
  Table,
  Typography,
} from 'antd';
import OffenderCard from 'components/offenders/OffenderCard';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faFilter,
  faGrid,
  faGrid2,
  faPlus,
  faTable,
} from '@fortawesome/pro-light-svg-icons';
import type { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderFilter from 'components/offenders/OffenderFilter';
import { useIntl } from 'react-intl';
import type { OffenderFilters } from 'state/data-model';
import InfiniteScroll from 'react-infinite-scroll-component';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import DebouncedInput from 'utils/debounced-input';
import { useNavigate } from 'react-router';
import useStyles from './OffenderFeed.styles';
import Loading from '../../../../components/shared-components/AntD/Loading';

interface Props {
  data: ListOffendersRelayQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  setSearch: (value: string) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGallery: (values: string[]) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  onSelectCustomGalleries: (values: string) => void;
  variables: OffenderFilters;
  fetchMoreScroll: () => void;
  setCompactView: () => void;
  setTableView: () => void;
  tableView: boolean;
}

const OffenderFeed = ({
  data,
  loading,
  lightboxElements,
  openLightbox,
  setSearch,
  updateOffenderList,
  onNavigate,
  lightBoxOpen,
  sortFilter,
  toggleSortFilter,
  setGallery,
  customGalleriesData,
  onSelectCustomGalleries,
  variables,
  fetchMoreScroll,
  setCompactView,
  setTableView,
  tableView,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const { search, gallery, customGalleries, compactView } = variables;
  const navigate = useNavigate();

  const galleryOptions = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Not Approved',
        id: 'VwMCyX',
      }),
      value: 'NOT APPROVED',
      needAdminRight: true,
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Following', id: 'cPIKU2' }),
      value: 'FOLLOWING',
    },
    // {
    //   label: intl.formatMessage({ defaultMessage: 'My Data', id: 'dr0ueW' }),
    //   value: 'MYDATA',
    // },
    {
      label: intl.formatMessage({ defaultMessage: 'Banned', id: 'xerM7K' }),
      value: 'BANNED',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Seeking ID', id: '1zVxRE' }),
      value: 'ID',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Verified ID',
        id: '0lpcfx',
      }),
      value: 'VERIFIED_ID',
    },
  ];
  const menu = () => (
    <Menu>
      {customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: { id, name } }) => (
          <Menu.Item key={id}>
            <Checkbox
              key={id}
              checked={customGalleries.includes(id)}
              onChange={() => {
                onSelectCustomGalleries(id);
              }}
            >
              {name}
            </Checkbox>
          </Menu.Item>
        )
      )}
    </Menu>
  );
  // const galleryMenu = () => (
  //   <Menu>
  //     {galleryOptions.map(({ label, value, needAdminRight }) => (
  //       <Menu.Item key={value}>
  //         {(!needAdminRight || adminRights) && (
  //           <Checkbox
  //             key={value}
  //             checked={gallery.includes(value)}
  //             onChange={() => {
  //               onSelectGallery(value);
  //             }}
  //           >
  //             {label}
  //           </Checkbox>
  //         )}
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  return (
    <div
      className="feed-container"
      style={
        loading
          ? { padding: 10, paddingRight: 12 }
          : { padding: 10, paddingRight: 0, paddingBottom: 0 }
      }
    >
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row align="middle" gutter={8}>
          <Col span={4} xxl={4}>
            <DebouncedInput
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Offenders...',
                id: 'mCDjFM',
              })}
              allowClear
              defaultValue={search || ''}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          <Col>
            {/* {customGalleriesData?.listCustomGalleries.total ? (
              <Dropdown
                overlay={galleryMenu}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <Button className={classes.selectBox}>
                  {intl.formatMessage({
                    defaultMessage: 'Gallery',
                    id: 'WExVSr',
                  })}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: 10 }}
                  />
                </Button>
              </Dropdown>
            ) : ( */}
            <CheckTags
              mode="check"
              noGutter
              value={gallery}
              onChange={setGallery}
              options={galleryOptions}
            />
            {/* )} */}
          </Col>

          <Col flex={1}>
            {customGalleriesData?.customGalleriesRelay?.totalCount &&
            customGalleriesData?.customGalleriesRelay?.totalCount > 0 ? (
              <Dropdown
                // trigger={['click']}
                overlay={menu}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <Button className={classes.selectBox}>
                  {/* <FontAwesomeIcon
                    size="lg"
                    style={{ marginRight: 5 }}
                    icon={faUserTag}
                  /> */}
                  {intl.formatMessage({
                    defaultMessage: 'Custom Gallery',
                    id: '/b4BmP',
                  })}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: 10 }}
                  />
                </Button>
              </Dropdown>
            ) : null}
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip
              // placement="topLeft"
              title={
                compactView
                  ? intl.formatMessage({
                      defaultMessage: 'Present offenders card in normal card',
                      id: 'dcfc8W',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Present offenders in compact card',
                      id: 'wctZp9',
                    })
              }
            >
              <Button
                onClick={setCompactView}
                icon={
                  <FontAwesomeIcon
                    icon={compactView ? faGrid2 : faGrid}
                    size="lg"
                  />
                }
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: '0px solid #000',
                }}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Present offenders in a table view',
                id: 'Ydmrau',
              })}
            >
              <Button
                onClick={setTableView}
                icon={<FontAwesomeIcon icon={faTable} size="lg" />}
                style={{
                  borderRadius: 0,
                  borderRightWidth: 0,
                }}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Sort & Filter',
                id: 'f2g3SM',
              })}
            >
              <Button
                onClick={toggleSortFilter}
                icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
                style={{
                  borderRadius: 0,
                }}
              />
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Add new offender',
                id: 'GhCPy6',
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
                  defaultMessage: 'Offender',
                  id: 'AN7Aru',
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
                  style={{ marginBottom: compactView ? 0 : 20 }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  span={compactView ? 6 : 8}
                  xxl={compactView ? 4 : 6}
                >
                  {compactView ? (
                    <CompactSkeletonCard />
                  ) : (
                    <OffenderSkeletonCard />
                  )}
                </Col>
              ))}
            </Row>
          ) : data?.listOffendersRelay?.edges &&
            data?.listOffendersRelay?.edges.length > 0 ? (
            <InfiniteScroll
              dataLength={data?.listOffendersRelay?.edges.length}
              next={() => fetchMoreScroll()}
              hasMore={data.listOffendersRelay.pageInfo.hasNextPage}
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
                gutter={[8, 8]}
                align="stretch"
                style={{
                  alignItems: 'stretch',
                  padding: 10,
                  overflowX: 'hidden',
                }}
              >
                {data?.listOffendersRelay?.edges?.map((t) => {
                  if (!t?.node?.id) return null;
                  return (
                    <Col
                      span={compactView ? 6 : 8}
                      xxl={compactView ? 4 : 6}
                      key={t?.node?.id}
                    >
                      <OffenderCard
                        offender={t?.node}
                        openLightbox={openLightbox}
                        update={updateOffenderList}
                        compactView={compactView}
                      />
                    </Col>
                  );
                })}
              </Row>
            </InfiniteScroll>
          ) : (
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
        </div>
      )}

      {tableView && (
        <div>
          <InfiniteScroll
            dataLength={data?.listOffendersRelay?.edges.length || 0}
            next={() => fetchMoreScroll()}
            hasMore={data?.listOffendersRelay.pageInfo.hasNextPage || false}
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
              pagination={false}
              rowClassName={classes.row}
              onRow={(record) => ({
                onClick: () => navigate(`/app/offenders/view/${record.key}`),
              })}
              style={{ marginBottom: 20 }}
              columns={[
                {
                  key: 'alertId',
                  dataIndex: 'alertId',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Alert ID',
                        id: 'k8ZNgH',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'name',
                  dataIndex: 'name',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Name',
                        id: 'HAlOn1',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'totalIncidents',
                  dataIndex: 'totalIncidents',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Incident Count',
                        id: 'otC1Ao',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'totalValue',
                  dataIndex: 'totalValue',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Total Loss',
                        id: 'LPr3Nh',
                      })}
                    </Typography.Text>
                  ),
                  render: (value: number) => (
                    <Typography.Text ellipsis>
                      {intl.formatMessage(
                        {
                          defaultMessage: '£{value}',
                          id: 'pCmP/V',
                        },
                        {
                          value: value.toFixed(0),
                        }
                      )}
                    </Typography.Text>
                  ),
                },
                {
                  key: 'lastIncident',
                  dataIndex: 'lastIncident',
                  title: intl.formatMessage({
                    defaultMessage: 'Last Incident',
                    id: 'kJuP0b',
                  }),
                },
              ]}
              dataSource={data?.listOffendersRelay.edges.map(({ node }) => ({
                key: node.id,
                alertId: node.reference,
                name: node.name,
                totalIncidents: node.totalIncidents,
                totalValue: node.totalValue,
                lastIncident: node.latestIncident?.dayTime,
              }))}
            />
          </InfiniteScroll>
        </div>
      )}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Offender Filters',
          id: 'gxEHRQ',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <OffenderFilter />
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

export default OffenderFeed;
