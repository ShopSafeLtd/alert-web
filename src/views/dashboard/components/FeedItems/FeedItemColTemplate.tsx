import type { AvailableDashboardElements } from '#/state/dashboard-model';

import FeedItemSkeletonCard from '#/components/feedItems/FeedItemSection/FeedItemSkeletonCard';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

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
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('feedItemCol')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
        type="primary"
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
