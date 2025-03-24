import type { FormInstance } from 'antd';

import { userSchemesAtom } from '#/providers/UserProvider/UserProvider';
import { Form } from 'antd';
import { useCreateOneStatementTemplateMutation } from 'graphql/statementTemplates/mutations/__generated__/create-one-statement.generated';
import { useUpdateOneStatementTemplateMutation } from 'graphql/statementTemplates/mutations/__generated__/update-one-statement.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

import type { FormData } from './createEditStatement.view';

interface Return {
  data: FormData;
  form: FormInstance<FormData>;
  onSubmit: (data: FormData) => void;
  saving: boolean;
  schemes: {
    label: string;
    value: string;
  }[];
}
const { useForm } = Form;

const useCreateEditStatement = ({
  id,
  initData,
  onClose,
}: {
  id?: string;
  initData: FormData | undefined;
  onClose: () => void;
}): Return => {
  const userSchemes = useAtomValue(userSchemesAtom);
  const schemes = userSchemes.map((scheme) => ({
    label: scheme.scheme.name,
    value: scheme.scheme.id,
  }));

  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const [data] = useState<FormData>(
    initData || {
      content: '',
      name: '',
      schemes: [],
    }
  );

  const [createTemplate] = useCreateOneStatementTemplateMutation();
  const [updateTemplate] = useUpdateOneStatementTemplateMutation();

  const onSubmit = (submitData: FormData) => {
    setSaving(true);
    if (id) {
      void updateTemplate({
        variables: {
          data: {
            content: { set: submitData.content },
            name: { set: submitData.name },
            schemes: {
              set: submitData.schemes.map((scheme) => ({
                id: scheme,
              })),
            },
          },
          where: {
            id,
          },
        },
      });
    } else {
      void createTemplate({
        variables: {
          data: {
            content: submitData.content,
            name: submitData.name,
            schemes: {
              connect: submitData.schemes.map((scheme) => ({
                id: scheme,
              })),
            },
          },
        },
      });
    }
    setSaving(false);
    onClose();
  };

  return {
    data,
    form,
    onSubmit,
    saving,
    schemes,
  };
};

export default useCreateEditStatement;
