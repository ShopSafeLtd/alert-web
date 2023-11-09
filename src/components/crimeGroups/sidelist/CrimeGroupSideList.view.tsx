import React from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import SideListItem from 'components/side-list/SideListItem.view';
import InfiniteSideScrollList from 'components/side-list/InfiniteSideList';
import useStyles from './CrimeGroupSideList.styles';

const { Paragraph } = Typography;

interface Props {
  data:
    | Exclude<ListCrimeGroupsQuery['listCrimeGroups'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const CrimeGroupSideList = ({
  data,
  loading,
  current,
  to,
  next,
}: Props): JSX.Element => {
  const classes = useStyles();
  const isLoading = loading && !data?.total;
  const items = data?.crimeGroups.map((group) => (
    <Link to={`${to || '/app/crime-groups/view/'}${group.id}`} key={group.id}>
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
  ));
  return (
    <InfiniteSideScrollList
      dataLength={data?.crimeGroups?.length}
      next={next}
      hasMore={(data?.crimeGroups?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={items}
    />
  );
};

export default CrimeGroupSideList;
