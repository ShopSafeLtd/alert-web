import React from 'react';
import type { ListBusinessesQuery } from 'graphql/generated';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import useStyles from './BusinessSideList.styles';
import InfiniteSideScrollList from '../../side-list/InfiniteSideList';

const { Text, Paragraph } = Typography;

interface Props {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  current?: string;
  to?: string;
  next: () => void;
}

const BusinessSideList = ({
  data,
  loading,
  current,
  to,
  next,
}: Props): JSX.Element => {
  const { listBusinesses } = data || {};
  const { businesses, total } = listBusinesses || {};
  const classes = useStyles();
  const isLoading = loading && !data?.listBusinesses?.businesses.length;

  const businessItems = businesses?.map((business) => (
    <Link
      to={`${to || '/app/scheme-settings/businesses/view/'}${business.id}`}
      key={business.id}
    >
      <div
        key={business.id}
        className={`${classes.offenderItem} ${
          current === business.id ? 'current' : ''
        }`}
      >
        <div className={classes.content}>
          <Text
            className={classes.name}
            strong={current === business.id}
            ellipsis
          >
            {business.name}
          </Text>
          {business.locations[0] && (
            <Paragraph type="secondary" className={classes.text}>
              {business.locations[0].full}
            </Paragraph>
          )}
        </div>
      </div>
    </Link>
  ));

  return (
    <InfiniteSideScrollList
      dataLength={businesses?.length}
      next={next}
      hasMore={(businesses?.length || 0) < (total || 0)}
      isLoading={isLoading}
      items={businessItems}
    />
  );
};

export default BusinessSideList;
