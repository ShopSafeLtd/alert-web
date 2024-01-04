import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from 'components/shared-components/AntD/Loading';
import { Col, Row } from 'antd';
import useStyles from './InfiniteSelectList.styles';

type InfiniteScrollListProps = {
  next: () => void;
  isLoading: boolean;
  dataLength?: number;
  hasMore?: boolean;
  loadingItems?: JSX.Element;
  items?: JSX.Element[];
  loader?: JSX.Element;
  endMessage?: JSX.Element;
};

const InfiniteSelectScrollList: React.FC<InfiniteScrollListProps> = ({
  next,
  dataLength = 0,
  hasMore = false,
  isLoading,
  loadingItems,
  items = [],
  loader = <Loading />,
  endMessage = (
    <p style={{ textAlign: 'center' }}>
      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
      <b>-----------</b>
    </p>
  ),
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sideList}>
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={loader}
        style={{ overflowX: 'hidden' }}
        height="calc(100vh - 140px)"
        endMessage={endMessage}
        className={classes.infiniteScroll}
      >
        <Row gutter={8}>
          {isLoading
            ? Array.from({ length: 24 })
                .fill(0)
                .map(() => (
                  <Col span={6} className="offender-item">
                    {loadingItems}
                  </Col>
                ))
            : items}
        </Row>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteSelectScrollList;
