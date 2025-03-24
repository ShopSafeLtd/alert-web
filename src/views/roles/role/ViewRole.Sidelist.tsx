import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useRolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';
import { Col, Row, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Link } from 'react-router-dom';

import InfiniteSideScrollList from '../../../components/side-list/InfiniteSideList';
import SideListItem from '../../../components/side-list/SideListItem.view';
import useStyles from './ViewRole.styles';

const ViewRoleSidelist = ({ current }: { current?: string }): JSX.Element => {
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const { data, fetchMore, loading } = useRolesQuery({
    variables: {
      first: 20,
      schemeId: currentSchemeId,
    },
  });
  const next = () => {
    void fetchMore({
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
      variables: {
        after: data?.roles?.pageInfo?.endCursor,
      },
    });
  };

  const classes = useStyles();

  const isLoading = loading && !data?.roles?.totalCount;
  const items = data?.roles.edges.map(({ node: role }) => (
    <Link key={role.id} to={`${'/app/scheme-settings/roles/'}${role.id}`}>
      <SideListItem current={current === role.id} key={role.id}>
        <Row wrap={false}>
          <Col className={classes.content} flex={1}>
            <Typography.Paragraph
              className={classes.name}
              ellipsis
              strong={current === role.id}
            >
              {role.name}
            </Typography.Paragraph>
          </Col>
        </Row>
      </SideListItem>
    </Link>
  ));

  return (
    <InfiniteSideScrollList
      dataLength={data?.roles?.edges?.length || 0}
      endMessage={<div />}
      hasMore={!!data?.roles?.pageInfo?.hasNextPage}
      isLoading={isLoading}
      items={items}
      next={next}
    />
  );
};

export default ViewRoleSidelist;
