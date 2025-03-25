import type { ListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Return {
  createTemplate: boolean;
  data: ListStatementTemplatesQuery | undefined;
  editTemplate: null | string;
  loading: boolean;
  toggleCreate: () => void;
  toggleEdit: (t: null | string) => void;
}

const useListStatements = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [createTemplate, setCreateTemplate] = useState(false);
  const [editTemplate, setEditTemplate] = useState<null | string>(null);

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

  const toggleEdit = (t: null | string) => {
    setEditTemplate(t);
  };

  return {
    createTemplate,
    data,
    editTemplate,
    loading,
    toggleCreate,
    toggleEdit,
  };
};

export default useListStatements;
