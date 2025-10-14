import { Col, Row } from 'antd';
import Loading from 'components/shared-components/AntD/Loading';
import React, { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useStyles from './InfiniteSideList.styles';
import SideListItem from './SideListItem.view';

type InfiniteScrollListProps = {
  dataLength?: number;
  endMessage?: JSX.Element;
  filters?: JSX.Element;
  hasMore?: boolean;
  isLoading: boolean;
  items?: JSX.Element[];
  loader?: JSX.Element;
  loadingItems?: JSX.Element[];
  next: () => void;
};

interface ItemsLoadingProps {
  classes: ReturnType<typeof useStyles>;
}

const ItemsLoading: React.FC<ItemsLoadingProps> = memo(
  // eslint-disable-next-line react/prop-types
  ({ classes: { itemContent } }) => (
    <>
      {Array.from({ length: 24 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SideListItem current={false} key={index} loading>
          <Row wrap={false}>
            <Col className={itemContent} flex={1}>
              <div />
            </Col>
          </Row>
        </SideListItem>
      ))}
    </>
  )
);
const InfiniteSideScrollList: React.FC<InfiniteScrollListProps> = ({
  dataLength = 0,
  endMessage = (
    <p style={{ textAlign: 'center' }}>
      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
      <b>-----------</b>
    </p>
  ),
  filters,
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
      {filters || null}
      <InfiniteScroll
        className={classes.infiniteScroll}
        dataLength={dataLength}
        endMessage={endMessage}
        hasMore={hasMore}
        height="100vh"
        loader={loader}
        next={next}
        style={{ overflowX: 'hidden' }}
      >
        {isLoading ? loadingItems || <ItemsLoading classes={classes} /> : items}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteSideScrollList;
