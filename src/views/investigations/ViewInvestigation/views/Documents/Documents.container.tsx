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
}
const DocumentsContainer = ({ data }: Props) => <View data={data} />;

export default DocumentsContainer;
