import React, { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from 'components/shared-components/AntD/Loading';
import { Col, Row } from 'antd';
import useStyles from './InfiniteSideList.styles';
import SideListItem from './SideListItem.view';

type InfiniteScrollListProps = {
  next: () => void;
  isLoading: boolean;
  dataLength?: number;
  hasMore?: boolean;
  loadingItems?: JSX.Element[];
  items?: JSX.Element[];
  loader?: JSX.Element;
  endMessage?: JSX.Element;
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
        <SideListItem key={index} loading current={false}>
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
        height="100vh"
        endMessage={endMessage}
        className={classes.infiniteScroll}
      >
        {isLoading ? loadingItems || <ItemsLoading classes={classes} /> : items}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteSideScrollList;
