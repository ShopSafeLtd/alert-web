import React from 'react';
import { useParams } from 'react-router';

import BulletinEngagementDetailView from './BulletinEngagementDetail.view';
import useBulletinEngagementDetail from './useBulletinEngagementDetail';

const BulletinEngagementDetailContainer: React.FC = () => {
  const { bulletinId } = useParams<{ bulletinId: string }>();

  const props = useBulletinEngagementDetail({
    bulletinId: bulletinId || '',
  });

  return <BulletinEngagementDetailView {...props} />;
};

export default BulletinEngagementDetailContainer;
