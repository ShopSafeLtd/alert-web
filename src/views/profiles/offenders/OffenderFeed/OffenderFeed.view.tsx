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
  Input,
  Menu,
  Row,
  Tooltip,
} from 'antd';
import OffenderCard from 'components/offenders/OffenderCard';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faFilter,
  faPlus,
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
import CheckTag from 'components/form-components/check-tag/CheckTag.view';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
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
  adminRights: boolean;
  onSelectCustomGalleries: (values: string) => void;
  onSelectGallery: (value: string) => void;
  variables: OffenderFilters;
  fetchMoreScroll: () => void;
  setCompactView: () => void;
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
  onSelectGallery,
  adminRights,
  onSelectCustomGalleries,
  variables,
  fetchMoreScroll,
  setCompactView,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const { search, gallery, customGalleries, compactView } = variables;

  const galleryOptions = [
    {
      label: intl.formatMessage({ defaultMessage: 'Active', id: '3a5wL8' }),
      value: 'ACTIVE',
    },
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
    {
      label: intl.formatMessage({ defaultMessage: 'My Data', id: 'dr0ueW' }),
      value: 'MYDATA',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Banned', id: 'xerM7K' }),
      value: 'BANNED',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Seeking ID', id: '1zVxRE' }),
      value: 'ID',
    },
  ];
  const menu = () => (
    <Menu>
      {customGalleriesData?.listCustomGalleries.customGalleries.map(
        ({ id, name }) => (
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
  const galleryMenu = () => (
    <Menu>
      {galleryOptions.map(({ label, value, needAdminRight }) => (
        <Menu.Item key={value}>
          {(!needAdminRight || adminRights) && (
            <Checkbox
              key={value}
              checked={gallery.includes(value)}
              onChange={() => {
                onSelectGallery(value);
              }}
            >
              {label}
            </Checkbox>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

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
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={4}>
            <Input
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Offenders...',
                id: 'mCDjFM',
              })}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col>
            {customGalleriesData?.listCustomGalleries.total ? (
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
            ) : (
              <CheckTags
                mode="check"
                value={gallery}
                onChange={setGallery}
                options={galleryOptions}
              />
            )}
          </Col>

          <Col flex={1}>
            {customGalleriesData?.listCustomGalleries.total ? (
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
          <Col>
            <CheckTag
              option={{
                label: intl.formatMessage({
                  defaultMessage: 'Compact View',
                  id: '9P0/Y7',
                }),
                value: 'Compact',
                tooltip: intl.formatMessage({
                  defaultMessage: 'Present offenders in compact card',
                  id: 'wctZp9',
                }),
              }}
              active={compactView}
              onClick={setCompactView}
            />
            {/* <CheckTags
              mode="radio"
              value={compactView ? ['Compact'] : ['Default']}
              onChange={setCompactView}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Default Card',
                    id: '1K+0py',
                  }),
                  value: 'Default',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Compact Card',
                    id: 'O3k0C9',
                  }),
                  value: 'Compact',
                },
              ]}
            /> */}
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
                icon={
                  <FontAwesomeIcon
                    icon={faFilter}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
              />
            </Tooltip>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={onNavigate}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              {intl.formatMessage({
                defaultMessage: 'Add Offender',
                id: 'm3ChN4',
              })}
            </Button>
          </Col>
        </Row>
      </Card>

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
              gutter={compactView ? 12 : [8, 16]}
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
                    style={{ marginBottom: 10 }}
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
                      defaultMessage: 'No offenders match your search criteria',
                      id: 'i7eap9',
                    })
              }
            />
          </div>
        )}
      </div>

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
