import React from 'react';
import { Col, Divider, Pagination, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import SideList from 'components/side-list/SideList.view';
import SideListItem from 'components/side-list/SideListItem.view';
import useStyles from './CrimeGroupSideList.styles';

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
      {!loading && (
        <Pagination
          total={data?.listCrimeGroups?.total}
          size="small"
          showSizeChanger={false}
        />
      )}
    </SideList>
  );
};

export default CrimeGroupSideList;
