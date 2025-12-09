import React from 'react';
import { useParams } from 'react-router';

import OffenderEngagementDetailView from './OffenderEngagementDetail.view';
import useOffenderEngagementDetail from './useOffenderEngagementDetail';

const OffenderEngagementDetailContainer: React.FC = () => {
  const { offenderId } = useParams<{ offenderId: string }>();

  const props = useOffenderEngagementDetail({
    offenderId: offenderId || '',
  });

  return <OffenderEngagementDetailView {...props} />;
};

export default OffenderEngagementDetailContainer;
