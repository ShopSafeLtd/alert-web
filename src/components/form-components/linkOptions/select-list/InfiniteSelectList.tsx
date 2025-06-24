import { Col, Row } from 'antd';
import Loading from 'components/shared-components/AntD/Loading';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useStyles from './InfiniteSelectList.styles';

type InfiniteScrollListProps = {
  dataLength?: number;
  endMessage?: JSX.Element;
  hasMore?: boolean;
  isLoading: boolean;
  items?: JSX.Element[];
  loader?: JSX.Element;
  loadingItems?: JSX.Element;
  next: () => void;
};

const InfiniteSelectScrollList: React.FC<InfiniteScrollListProps> = ({
  dataLength = 0,
  endMessage = (
    <p style={{ textAlign: 'center' }}>
      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
      <b>-----------</b>
    </p>
  ),
  hasMore = false,
  isLoading,
  items = [],
  loader = <Loading />,
  loadingItems,
  next,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sideList}>
      <InfiniteScroll
        className={classes.infiniteScroll}
        dataLength={dataLength}
        endMessage={endMessage}
        hasMore={hasMore}
        height="calc(100vh - 140px)"
        loader={loader}
        next={next}
        style={{ overflowX: 'hidden' }}
      >
        <Row gutter={8}>
          {isLoading
            ? Array.from({ length: 24 })
                .fill(0)
                .map(() => (
                  <Col className="offender-item" span={6}>
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
