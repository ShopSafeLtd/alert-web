import React from 'react';
import Loading from '#/components/shared-components/AntD/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const DashboardInfiniteScroll = ({
  children,
  dataLength,
  next,
  hasMore,
  id,
}: {
  children: JSX.Element[] | JSX.Element;
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  id: string;
}) => (
  <div
    style={{
      height: '100%',
      overflow: 'auto',
    }}
    id={id}
  >
    <InfiniteScroll
      dataLength={dataLength}
      next={() => next()}
      hasMore={hasMore}
      loader={<Loading />}
      scrollableTarget={id}
      style={{
        overflow: 'hidden',
      }}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <b>-----------</b>
        </p>
      }
    >
      {children}
    </InfiniteScroll>
  </div>
);

export default DashboardInfiniteScroll;
