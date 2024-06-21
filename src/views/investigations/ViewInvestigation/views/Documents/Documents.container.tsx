import React from 'react';
import View from './DocumentsView';
import type { ViewInvestigationQuery } from 'graphql/investigations/queries/view-investigation.generated';

interface Props {
  data:
    | Exclude<
        ViewInvestigationQuery['investigation'],
        undefined | null
      >['documents']
    | null
    | undefined;
  toggleAddDemDocument: () => void;
  toggleAddDocument: () => void;
  demId: string | undefined | null;
  onDeleteDocument: (id: string) => void;
}

const DocumentsContainer = ({
  data,
  demId,
  toggleAddDemDocument,
  toggleAddDocument,
  onDeleteDocument,
}: Props) => (
  <View
    data={data}
    demId={demId}
    toggleAddDemDocument={toggleAddDemDocument}
    toggleAddDocument={toggleAddDocument}
    onDeleteDocument={onDeleteDocument}
  />
);

export default DocumentsContainer;
