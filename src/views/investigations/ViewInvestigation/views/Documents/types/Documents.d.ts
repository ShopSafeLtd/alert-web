import { ViewInvestigationQuery } from '../../../../../../graphql/generated';

export interface ViewProps {
  data:
    | Exclude<
        ViewInvestigationQuery['investigation'],
        undefined | null
      >['documents']
    | null
    | undefined;
}
