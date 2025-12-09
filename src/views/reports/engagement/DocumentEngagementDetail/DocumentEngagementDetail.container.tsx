import React from 'react';
import { useParams } from 'react-router';

import DocumentEngagementDetailView from './DocumentEngagementDetail.view';
import useDocumentEngagementDetail from './useDocumentEngagementDetail';

const DocumentEngagementDetailContainer: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();

  const props = useDocumentEngagementDetail({
    documentId: documentId || '',
  });

  return <DocumentEngagementDetailView {...props} />;
};

export default DocumentEngagementDetailContainer;
