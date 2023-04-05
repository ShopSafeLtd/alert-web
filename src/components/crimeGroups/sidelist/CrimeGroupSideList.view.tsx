import React from 'react';
import { Col, Divider, Pagination, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import useStyles from './CrimeGroupSideList.styles';

const { Text } = Typography;

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to: string;
}

const CrimeGroupSideList = ({
  data,
  loading,
  current,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.offenderSideList}>
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
      {data?.listCrimeGroups?.crimeGroups.map((group) => (
        <Link to={`${to}`} key={group.id}>
          <div
            key={group.id}
            className={`${classes.offenderItem} ${
              current === group.id ? 'current' : ''
            }`}
          >
            <Row wrap={false}>
              <Col className={classes.content} flex={1}>
                <Text
                  className={classes.name}
                  strong={current === group.id}
                  ellipsis
                >
                  {group.alias ?? `CG-${group.reference}`}
                </Text>
              </Col>
            </Row>
            <Divider className={classes.divider} />
          </div>
        </Link>
      ))}
      {!loading && (
        <Pagination
          total={data?.listCrimeGroups?.total}
          size="small"
          showSizeChanger={false}
        />
      )}
    </div>
  );
};

export default CrimeGroupSideList;
