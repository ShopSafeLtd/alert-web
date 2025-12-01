import React from 'react';

import ViewTrainingVideoAuditView from './ViewTrainingVideoAudit.view';
import useViewTrainingVideoAudit from './useViewTrainingVideoAudit';

const ViewTrainingVideoAuditContainer: React.FC = () => {
  const props = useViewTrainingVideoAudit();

  return <ViewTrainingVideoAuditView {...props} />;
};

export default ViewTrainingVideoAuditContainer;
