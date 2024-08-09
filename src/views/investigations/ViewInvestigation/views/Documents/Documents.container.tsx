import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';

import React from 'react';

import View from './DocumentsView';

interface Props {
  data:
    | Exclude<
        ViewInvestigationQuery['investigation'],
        null | undefined
      >['documents']
    | null
    | undefined;
  demId: null | string | undefined;
  onDeleteDocument: (id: string) => void;
  toggleAddDemDocument: () => void;
  toggleAddDocument: () => void;
}

const DocumentsContainer = ({
  data,
  demId,
  onDeleteDocument,
  toggleAddDemDocument,
  toggleAddDocument,
}: Props) => (
  <View
    data={data}
    demId={demId}
    onDeleteDocument={onDeleteDocument}
    toggleAddDemDocument={toggleAddDemDocument}
    toggleAddDocument={toggleAddDocument}
  />
);

export default DocumentsContainer;
