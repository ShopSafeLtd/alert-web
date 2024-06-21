import { useState } from 'react';
import type { Props as Return } from '../types/Documents';
import { useStoreState } from '../../../../../state';
import { useListDocumentsOnSchemeQuery } from 'graphql/documents/queries/list-documents.generated';
import { Role } from 'graphql/types';

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
    data,
    loading,
    toggleAddDocument,
    addDocument,
    isAdmin,
  };
};

export default useListDocuments;
