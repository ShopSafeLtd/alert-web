import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';

export interface ViewProps {
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
