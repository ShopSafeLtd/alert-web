import type { ListOffendersRelayQuery } from '#/views/profiles/offenders/OffenderFeed/graphql/queries/__generated__/offender-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { ListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import type { RecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import type { OffenderFilters } from 'state/data-model';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faChevronDown,
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
  Checkbox,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Menu,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderCard from 'components/offenders/OffenderCard';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import OffenderFilter from 'components/offenders/OffenderFilter';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { OffenderSort } from 'state/data-model';
import DebouncedInput from 'utils/debounced-input';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Loading from '../../../../components/shared-components/AntD/Loading';
import useStyles from './OffenderFeed.styles';

interface Props {
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  data: ListOffendersRelayQuery | undefined;
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
  onSelectCustomGalleries: (values: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  order: OffenderSort;
  setCompactView: () => void;
  setGallery: (values: string[]) => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
  sortFilter: boolean;
  tableView: boolean;
  toggleSortFilter: () => void;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  variables: OffenderFilters;
}

const OffenderFeed = ({
  customGalleriesData,
  data,
  fetchMoreScroll,
  lightBoxOpen,
  lightboxElements,
  loading,
  onNavigate,
  onSelectCustomGalleries,
  openLightbox,
  order,
  setCompactView,
  setGallery,
  setSearch,
  setTableView,
  sortFilter,
  tableView,
  toggleSortFilter,
  updateOffenderList,
  variables,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const { compactView, customGalleries, gallery, search } = variables;
  const navigate = useNavigate();
  const currency = useAtomValue(currencyAtom);

  const galleryOptions = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Not Approved',
      }),
      permissions: [
        { method: PermissionMethod.Approve, model: PermissionModel.Offenders },
      ],
      value: 'NOT APPROVED',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Following' }),
      value: 'FOLLOWING',
    },
    // {
    //   label: intl.formatMessage({ defaultMessage: 'My Data', id: 'dr0ueW' }),
    //   value: 'MYDATA',
    // },
    {
      label: intl.formatMessage({ defaultMessage: 'Banned' }),
      value: 'BANNED',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Seeking ID' }),
      value: 'ID',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Verified ID',
      }),
      value: 'VERIFIED_ID',
    },
  ];
  const menu = () => (
    <Menu style={{ overflowY: 'auto' }}>
      {customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: { id, name } }) => (
          <Menu.Item key={id}>
            <Checkbox
              checked={customGalleries.includes(id)}
              key={id}
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

  const offenders = [...(data?.listOffendersRelay?.edges || [])];
  return (
    <div
      className="feed-container"
      style={
        loading
          ? { padding: 10, paddingRight: 12 }
          : { padding: 10, paddingBottom: 0, paddingRight: 0 }
      }
    >
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row align="middle" gutter={8}>
          <Col span={4} xxl={4}>
            <DebouncedInput
              allowClear
              defaultValue={search || ''}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Offenders...',
              })}
              size="small"
            />
          </Col>

          <Col style={{ alignItems: 'center', display: 'flex' }}>
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
              onChange={setGallery}
              options={galleryOptions}
              value={gallery}
            />
            {/* )} */}
          </Col>

          <Col flex={1}>
            {customGalleriesData?.customGalleriesRelay?.totalCount &&
            customGalleriesData?.customGalleriesRelay?.totalCount > 0 ? (
              <Dropdown
                arrow={{ pointAtCenter: true }}
                // trigger={['click']}
                overlay={menu}
                placement="bottom"
              >
                <Button className={classes.selectBox}>
                  {/* <FontAwesomeIcon
                    size="lg"
                    style={{ marginRight: 5 }}
                    icon={faUserTag}
                  /> */}
                  {intl.formatMessage({
                    defaultMessage: 'Custom Gallery',
                  })}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: 10 }}
                  />
                </Button>
              </Dropdown>
            ) : null}
          </Col>
          <Col style={{ alignItems: 'center', display: 'flex' }}>
            <Tooltip
              // placement="topLeft"
              title={
                compactView
                  ? intl.formatMessage({
                      defaultMessage: 'Present offenders card in normal card',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Present offenders in compact card',
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
                defaultMessage: 'Present offenders in a table view',
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
                defaultMessage: 'Add new offender',
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
                  defaultMessage: 'Offender',
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
                    <OffenderSkeletonCard />
                  )}
                </Col>
              ))}
            </Row>
          ) : data?.listOffendersRelay?.edges &&
            data?.listOffendersRelay?.edges.length > 0 ? (
            <InfiniteScroll
              dataLength={data?.listOffendersRelay?.edges.length}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <b>-----------</b>
                </p>
              }
              hasMore={data.listOffendersRelay.pageInfo.hasNextPage}
              height="calc(100vh - 78px)"
              loader={<Loading />}
              next={() => fetchMoreScroll()}
              style={{ overflowX: 'hidden' }}
            >
              <Row
                align="stretch"
                gutter={[8, 8]}
                style={{
                  alignItems: 'stretch',
                  overflowX: 'hidden',
                  padding: 10,
                }}
              >
                {offenders
                  .sort((a, b) => {
                    if (
                      order === OffenderSort.incidentValueAsc ||
                      order === OffenderSort.incidentValueDesc
                    ) {
                      const aValue = a?.node?.totalValue ?? 0;
                      const bValue = b?.node?.totalValue ?? 0;

                      return order === OffenderSort.incidentValueAsc
                        ? aValue - bValue
                        : bValue - aValue;
                    }

                    return 0;
                  })
                  .map((t) => {
                    if (!t?.node?.id) return null;
                    return (
                      <Col
                        key={t?.node?.id}
                        span={compactView ? 6 : 8}
                        xxl={compactView ? 4 : 6}
                      >
                        <OffenderCard
                          compactView={compactView}
                          offender={t?.node}
                          openLightbox={openLightbox}
                          update={updateOffenderList}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </InfiniteScroll>
          ) : (
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
                        defaultMessage: 'No Offenders',
                      })
                    : intl.formatMessage({
                        defaultMessage:
                          'No offenders match your search criteria',
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
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
            hasMore={data?.listOffendersRelay.pageInfo.hasNextPage || false}
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
                  dataIndex: 'name',
                  key: 'name',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Name',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'totalIncidents',
                  key: 'totalIncidents',
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Incident Count',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'totalValue',
                  key: 'totalValue',
                  render: (value: number) => (
                    <Typography.Text ellipsis>
                      {intl.formatNumber(value || 0, {
                        currency,
                        style: 'currency',
                      })}
                    </Typography.Text>
                  ),
                  title: (
                    <Typography.Text ellipsis>
                      {intl.formatMessage({
                        defaultMessage: 'Total Loss',
                      })}
                    </Typography.Text>
                  ),
                },
                {
                  dataIndex: 'lastIncident',
                  key: 'lastIncident',
                  title: intl.formatMessage({
                    defaultMessage: 'Last Incident',
                  }),
                },
              ]}
              dataSource={data?.listOffendersRelay.edges.map(({ node }) => ({
                alertId: node.reference,
                key: node.id,
                lastIncident: node.latestIncident?.dayTime,
                name: node.name,
                totalIncidents: node.totalIncidents,
                totalValue: node.totalValue,
              }))}
              onRow={(record) => ({
                onClick: () => navigate(`/app/offenders/view/${record.key}`),
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
          defaultMessage: 'Offender Filters',
        })}
        width={500}
      >
        <OffenderFilter />
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

export default OffenderFeed;
