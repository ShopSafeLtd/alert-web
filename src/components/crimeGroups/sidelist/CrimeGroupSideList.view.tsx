import React from 'react';
import { Col, Divider, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import SideList from 'components/side-list/SideList.view';
import SideListItem from 'components/side-list/SideListItem.view';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './CrimeGroupSideList.styles';
import Loading from '../../shared-components/AntD/Loading';

const { Paragraph } = Typography;

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const CrimeGroupSideList = ({
  data,
  loading,
  current,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <SideList>
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100vh',
          }}
        >
          <Spin />
        </div>
      )}
      <InfiniteScroll
        hasMore={false}
        next={() => {}}
        dataLength={data?.listCrimeGroups?.crimeGroups.length || 0}
        loader={<Loading />}
        style={{ overflowX: 'hidden' }}
        height="98vh"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <br />
          </p>
        }
        // className={classes.infiniteScroll}
      >
        {data?.listCrimeGroups?.crimeGroups.map((group) => (
          <Link
            to={`${to || '/app/crime-groups/view/'}${group.id}`}
            key={group.id}
          >
            <SideListItem key={group.id} current={current === group.id}>
              <Row wrap={false}>
                <Col className={classes.content} flex={1}>
                  {group.reference && (
                    <Paragraph
                      className={classes.name}
                      strong={current === group.id}
                      ellipsis
                    >
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {`CG-${group.reference}`}
                    </Paragraph>
                  )}
                  {group.alias && (
                    <Paragraph
                      className={classes.name}
                      strong={current === group.id}
                      ellipsis
                    >
                      {group.alias}
                    </Paragraph>
                  )}
                </Col>
              </Row>
              <Divider className={classes.divider} />
            </SideListItem>
          </Link>
        ))}
      </InfiniteScroll>
    </SideList>
  );
};

export default CrimeGroupSideList;
