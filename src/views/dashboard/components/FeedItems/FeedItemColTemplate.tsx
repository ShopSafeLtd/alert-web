import FeedItemSkeletonCard from '#/components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import React from 'react';
import { Button, Col, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const FeedItemCol = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  return (
    <Col
      style={{
        height: 'inherit',
      }}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('feedItemCol')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <Typography.Title>
        {intl.formatMessage({
          defaultMessage: 'Feed Items',
        })}
      </Typography.Title>

      <div
        style={{
          height: 'calc(100% - 40px)',
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 24 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <FeedItemSkeletonCard key={index} />
        ))}
      </div>
    </Col>
  );
};

export default FeedItemCol;
