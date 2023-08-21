import React from 'react';
import type { ListIncidentsQuery } from 'graphql/generated';
import { Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import SideListItem from 'components/side-list/SideListItem.view';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './IncidentSideList.styles';
import Loading from '../../shared-components/AntD/Loading';

interface Props {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  // onPaginationChange: (page: number, pageSize: number) => void;
  // pagination: {
  //   page: number;
  //   pageSize: number;
  // };
  next: () => void;
}

const IncidentSideList = ({
  data,
  loading,
  current,
  // onPaginationChange,
  // pagination,
  next,
}: Props): JSX.Element => {
  const classes = useStyles();

  const isLoading = loading && !data?.listIncidents?.incidents.length;

  return (
    <div className={classes.sideList}>
      {/* {loading && ( */}
      {/*   <div */}
      {/*     style={{ */}
      {/*       display: 'flex', */}
      {/*       justifyContent: 'center', */}
      {/*       alignItems: 'center', */}
      {/*       flex: 1, */}
      {/*       height: '100vh', */}
      {/*     }} */}
      {/*   > */}
      {/*     <Spin /> */}
      {/*   </div> */}
      {/* )} */}
      <InfiniteScroll
        dataLength={data?.listIncidents?.incidents.length || 0}
        next={next}
        hasMore={
          (data?.listIncidents?.incidents?.length || 0) <
            (data?.listIncidents?.total || 0) || false
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
          ? Array.from({ length: 10 }).map(() => (
              <SideListItem loading current={false}>
                <Row wrap={false}>
                  <Col className={classes.itemContent} flex={1}>
                    <div />
                  </Col>
                </Row>
              </SideListItem>
            ))
          : data?.listIncidents?.incidents.map((incident) => (
              <Link to={`/app/incidents/view/${incident.id}`} key={incident.id}>
                <SideListItem current={current === incident.id}>
                  <Row wrap={false}>
                    <Col className={classes.itemContent} flex={1}>
                      <Typography.Text
                        strong={current === incident.id}
                        ellipsis
                      >
                        {incident.subject}
                      </Typography.Text>
                      <Typography.Paragraph
                        className={classes.itemDesc}
                        type="secondary"
                        ellipsis
                      >
                        {incident.description}
                      </Typography.Paragraph>
                      <Row>
                        <Col flex={1}>
                          <Typography.Paragraph
                            className={classes.itemDetail}
                            style={{ marginRight: 10 }}
                            type="secondary"
                            ellipsis
                          >
                            {incident.business?.name || incident.location?.full}
                          </Typography.Paragraph>
                        </Col>
                        <Col>
                          <Typography.Paragraph
                            className={classes.itemDetail}
                            type="secondary"
                            ellipsis
                          >
                            {incident.dayTime}
                          </Typography.Paragraph>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </SideListItem>
              </Link>
            ))}
      </InfiniteScroll>
      {/* {!loading && ( */}
      {/*   <Pagination */}
      {/*     total={data?.listIncidents?.total} */}
      {/*     size="small" */}
      {/*     showSizeChanger={false} */}
      {/*     onChange={onPaginationChange} */}
      {/*     pageSize={pagination.pageSize} */}
      {/*     current={pagination.page} */}
      {/*   /> */}
      {/* )} */}
    </div>
  );
};

export default IncidentSideList;
