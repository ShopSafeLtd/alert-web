import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import type { BusinessesSideListQuery } from './graphql/queries/__generated__/sidelist.generated';

import InfiniteSideScrollList from '../../side-list/InfiniteSideList';
import useStyles from './BusinessSideList.styles';

const { Paragraph, Text } = Typography;

interface Props {
  current?: string;
  data:
    | Exclude<BusinessesSideListQuery['businessRelay'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
  to?: string;
}

const BusinessSideList = ({
  current,
  data,
  loading,
  next,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const isLoading = loading && !data?.pageInfo.hasNextPage;

  const businessItems = data?.edges?.map(({ node: business }) => (
    <Link
      key={business.id}
      to={`${to || '/app/scheme-settings/businesses/view/'}${business.id}`}
    >
      <div
        className={`${classes.offenderItem} ${
          current === business.id ? 'current' : ''
        }`}
        key={business.id}
      >
        <div className={classes.content}>
          <Text
            className={classes.name}
            ellipsis
            strong={current === business.id}
          >
            {business.name}
          </Text>
          {business.locations[0] && (
            <Paragraph className={classes.text} type="secondary">
              {business.locations[0].full}
            </Paragraph>
          )}
        </div>
      </div>
    </Link>
  ));

  return (
    <InfiniteSideScrollList
      dataLength={data?.edges?.length}
      hasMore={data?.pageInfo.hasNextPage}
      isLoading={isLoading}
      items={businessItems}
      next={next}
    />
  );
};

export default BusinessSideList;
