import { useState } from 'react';

import { useStoreState } from 'state';
import {
  ListStatementTemplatesQuery,
  useListStatementTemplatesQuery,
} from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';


interface Return {
  data: ListStatementTemplatesQuery | undefined;
  loading: boolean;
  toggleCreate: () => void;
  toggleEdit: (t: string | null) => void;
  createTemplate: boolean;
  editTemplate: string | null;
}

const useListStatements = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [createTemplate, setCreateTemplate] = useState(false);
  const [editTemplate, setEditTemplate] = useState<string | null>(null);

  const { data, loading } = useListStatementTemplatesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
    },
  });

  const toggleCreate = () => {
    setCreateTemplate(!createTemplate);
  };

  const toggleEdit = (t: string | null) => {
    setEditTemplate(t);
  };

  return {
    data,
    loading,
    toggleCreate,
    toggleEdit,
    createTemplate,
    editTemplate,
  };
};

export default useListStatements;
