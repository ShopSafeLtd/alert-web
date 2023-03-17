import { CurrentSchemeTermsQuery } from '../../../../../graphql/generated';

export interface ReturnProps {
  data: CurrentSchemeTermsQuery | undefined;
  loading: boolean;
  isAdmin: boolean;
  editTerms: () => void;
}
