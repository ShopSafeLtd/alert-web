import React from 'react';
import type { ListBusinessesQuery } from 'graphql/generated';
import { Col, Divider, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import SideListItem from 'components/side-list/SideListItem.view';
import useStyles from './BusinessSideList.styles';
import Loading from '../../shared-components/AntD/Loading';

const { Text, Paragraph } = Typography;

interface Props {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  current?: string;
  to?: string;
  next: () => void;
}

const BusinessSideList = ({
  data,
  loading,
  current,
  to,
  next,
}: Props): JSX.Element => {
  const classes = useStyles();
  const isLoading = loading && !data?.listBusinesses?.businesses.length;

  return (
    <div className={classes.sideList}>
      <InfiniteScroll
        dataLength={data?.listBusinesses?.businesses?.length || 0}
        next={next}
        hasMore={
          (data?.listBusinesses?.businesses?.length || 0) <
            (data?.listBusinesses?.total || 0) || false
        }
        loader={<Loading />}
        style={{ overflowX: 'hidden' }}
        height="100vh"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <b>-----------</b>
          </p>
        }
        className={classes.infiniteScroll}
      >
        {isLoading
          ? Array.from({ length: 24 }).map(() => (
              <SideListItem loading current={false}>
                <Row wrap={false}>
                  <Col className={classes.itemContent} flex={1}>
                    <div />
                  </Col>
                </Row>
              </SideListItem>
            ))
          : data?.listBusinesses?.businesses.map((business) => (
              <Link
                to={`${to || '/app/scheme-settings/businesses/view/'}${
                  business.id
                }`}
                key={business.id}
              >
                <div
                  key={business.id}
                  className={`${classes.offenderItem} ${
                    current === business.id ? 'current' : ''
                  }`}
                >
                  <div className={classes.content}>
                    <Text
                      className={classes.name}
                      strong={current === business.id}
                      ellipsis
                    >
                      {business.name}
                    </Text>
                    {business.locations[0] && (
                      <Paragraph type="secondary" className={classes.text}>
                        {business.locations[0].full}
                      </Paragraph>
                    )}
                  </div>
                  <Divider className={classes.divider} />
                </div>
              </Link>
            ))}
        {/* <Pagination
        total={data?.listBusinesses?.total}
        size="small"
        showSizeChanger={false}
        pageSize={pagination.pageSize}
        current={pagination.page}
        onChange={onPaginationChange}
        hideOnSinglePage
      /> */}
      </InfiniteScroll>
    </div>
  );
};

export default BusinessSideList;
