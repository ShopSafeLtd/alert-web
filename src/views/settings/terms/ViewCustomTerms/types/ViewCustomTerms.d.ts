import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';

export interface ReturnProps {
  data: CurrentSchemeTermsQuery | undefined;
  editTerms: () => void;
  isAdmin: boolean;
  loading: boolean;
}
