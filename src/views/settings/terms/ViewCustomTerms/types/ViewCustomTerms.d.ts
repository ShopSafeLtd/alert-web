import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';

export interface ReturnProps {
  data: CurrentSchemeTermsQuery | undefined;
  loading: boolean;
  isAdmin: boolean;
  editTerms: () => void;
}
