import Loading from '#/components/shared-components/AntD/Loading';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const DashboardInfiniteScroll = ({
  children,
  dataLength,
  hasMore,
  id,
  next,
}: {
  children: JSX.Element | JSX.Element[];
  dataLength: number;
  hasMore: boolean;
  id: string;
  next: () => void;
}) => (
  <div
    id={id}
    style={{
      height: '100%',
      overflow: 'auto',
    }}
  >
    <InfiniteScroll
      dataLength={dataLength}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <b>-----------</b>
        </p>
      }
      hasMore={hasMore}
      loader={<Loading />}
      next={() => next()}
      scrollableTarget={id}
      style={{
        overflow: 'hidden',
      }}
    >
      {children}
    </InfiniteScroll>
  </div>
);

export default DashboardInfiniteScroll;
