import { useListDocumentsOnSchemeQuery } from 'graphql/documents/queries/__generated__/list-documents.generated';
import { Role } from 'graphql/types';
import { useState } from 'react';

import type { Props as Return } from '../types/Documents';

import { useStoreState } from '../../../../../state';

const useListDocuments = (): Return => {
  const [addDocument, setAddDocument] = useState(false);

  const toggleAddDocument = () => setAddDocument(!addDocument);
  const isAdmin = useStoreState((state) => state.user.role !== Role.User);
  const currentScheme = useStoreState((state) => state.scheme.id);
  const { data, loading } = useListDocumentsOnSchemeQuery({
    variables: {
      where: {
        id: currentScheme,
      },
    },
  });

  return {
    addDocument,
    data,
    isAdmin,
    loading,
    toggleAddDocument,
  };
};

export default useListDocuments;
