import React from 'react';
import type { ListBusinessesQuery } from 'graphql/generated';
import { Divider, Pagination, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useStyles from './BusinessSideList.styles';

const { Text, Paragraph } = Typography;

interface Props {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
  to?: string;
  pagination: { page: number; pageSize: number };
}

const BusinessSideList = ({
  data,
  loading,
  current,
  onPaginationChange,
  to,
  pagination,
}: Props): JSX.Element => {
  const classes = useStyles();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <div className={classes.offenderSideList}>
      {data?.listBusinesses?.businesses.map((business) => (
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
            <Divider className={classes.divider} />
          </div>
        </Link>
      ))}
      <Pagination
        total={data?.listBusinesses?.total}
        size="small"
        showSizeChanger={false}
        pageSize={pagination.pageSize}
        current={pagination.page}
        onChange={onPaginationChange}
        hideOnSinglePage
      />
    </div>
  );
};

export default BusinessSideList;
