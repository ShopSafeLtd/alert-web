import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { Col, Divider, Row, Typography } from 'antd';
import InfiniteSideScrollList from 'components/side-list/InfiniteSideList';
import SideListItem from 'components/side-list/SideListItem.view';
import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './CrimeGroupSideList.styles';

const { Paragraph } = Typography;

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  data:
    | Exclude<ListCrimeGroupsQuery['listCrimeGroups'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
  to?: string;
}

const CrimeGroupSideList = ({
  current,
  data,
  loading,
  next,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const isLoading = loading && !data?.total;
  const items = data?.crimeGroups.map((group) => (
    <Link key={group.id} to={`${to || '/app/crime-groups/view/'}${group.id}`}>
      <SideListItem current={current === group.id} key={group.id}>
        <Row wrap={false}>
          <Col className={classes.content} flex={1}>
            {group.reference && (
              <Paragraph
                className={classes.name}
                ellipsis
                strong={current === group.id}
              >
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                {`CG-${group.reference}`}
              </Paragraph>
            )}
            {group.alias && (
              <Paragraph
                className={classes.name}
                ellipsis
                strong={current === group.id}
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
      hasMore={(data?.crimeGroups?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={items}
      next={next}
    />
  );
};

export default CrimeGroupSideList;
