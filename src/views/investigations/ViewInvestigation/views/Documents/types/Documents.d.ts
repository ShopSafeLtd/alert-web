import type { ViewInvestigationQuery } from 'graphql/investigations/queries/view-investigation.generated';

export interface ViewProps {
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
