import React from 'react';

import { Link } from 'react-router-dom';
import { Col, Divider, Row, Typography } from 'antd';
import InfiniteSideScrollList from '../../../components/side-list/InfiniteSideList';
import SideListItem from '../../../components/side-list/SideListItem.view';
import { useStoreState } from '../../../state';
import useStyles from './ViewRole.styles';
import { useRolesQuery } from '#/views/roles/graphql/queries/roles.generated';

const ViewRoleSidelist = ({ current }: { current?: string }): JSX.Element => {
  const { id: currentSchemeId } = useStoreState((state) => state.scheme);

  const { data, loading, fetchMore } = useRolesQuery({
    variables: {
      schemeId: currentSchemeId,
      first: 20,
    },
  });
  const next = () => {
    void fetchMore({
      variables: {
        after: data?.roles?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          roles: {
            ...fetchMoreResult.roles,
            edges: [
              ...(prev.roles?.edges || []),
              ...(fetchMoreResult.roles?.edges || []),
            ],
          },
        };
      },
    });
  };

  const classes = useStyles();

  const isLoading = loading && !data?.roles?.totalCount;
  const items = data?.roles.edges.map(({ node: role }) => (
    <Link to={`${'/app/scheme-settings/roles/'}${role.id}`} key={role.id}>
      <SideListItem key={role.id} current={current === role.id}>
        <Row wrap={false}>
          <Col className={classes.content} flex={1}>
            <Typography.Paragraph
              className={classes.name}
              strong={current === role.id}
              ellipsis
            >
              {role.name}
            </Typography.Paragraph>
          </Col>
        </Row>
        <Divider className={classes.divider} />
      </SideListItem>
    </Link>
  ));

  return (
    <InfiniteSideScrollList
      dataLength={data?.roles?.edges?.length || 0}
      next={next}
      hasMore={!!data?.roles?.pageInfo?.hasNextPage}
      isLoading={isLoading}
      items={items}
      endMessage={<div />}
    />
  );
};

export default ViewRoleSidelist;
