/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-floating-promises,@typescript-eslint/no-unsafe-assignment */
import type { SchemeSharingQuery } from 'graphql/generated';
import { useSchemeSharingQuery } from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data: SchemeSharingQuery | undefined;
  loading: boolean;
}

const useSchemeSharing = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useSchemeSharingQuery({
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  return {
    data,
    loading,
  };
};

export default useSchemeSharing;
