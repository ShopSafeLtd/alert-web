import React from 'react';
import View from './DocumentsView';
import { ViewInvestigationQuery } from '../../../../../graphql/generated';

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
}
const DocumentsContainer = ({
  data,
  demId,
  toggleAddDemDocument,
  toggleAddDocument,
}: Props) => (
  <View
    data={data}
    demId={demId}
    toggleAddDemDocument={toggleAddDemDocument}
    toggleAddDocument={toggleAddDocument}
  />
);

export default DocumentsContainer;
