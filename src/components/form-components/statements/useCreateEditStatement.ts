import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useState } from 'react';
import type { FormData } from './createEditStatement.view';
import { useStoreState } from '../../../state';
import {
  useCreateOneStatementTemplateMutation
} from 'graphql/statementTemplates/mutations/__generated__/create-one-statement.generated';
import {
  useUpdateOneStatementTemplateMutation
} from 'graphql/statementTemplates/mutations/__generated__/update-one-statement.generated';

interface Return {
  data: FormData;
  saving: boolean;
  form: FormInstance<FormData>;
  onSubmit: (data: FormData) => void;
  schemes: {
    label: string;
    value: string;
  }[];
}
const { useForm } = Form;

const useCreateEditStatement = ({
  initData,
  onClose,
  id,
}: {
  initData: FormData | undefined;
  onClose: () => void;
  id?: string;
}): Return => {
  const userSchemes = useStoreState((state) => state.user.schemes);
  const schemes = userSchemes.map((scheme) => ({
    label: scheme.scheme.name,
    value: scheme.scheme.id,
  }));

  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const [data] = useState<FormData>(
    initData || {
      name: '',
      content: '',
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
          where: {
            id,
          },
          data: {
            name: { set: submitData.name },
            content: { set: submitData.content },
            schemes: {
              set: submitData.schemes.map((scheme) => ({
                id: scheme,
              })),
            },
          },
        },
      });
    } else {
      void createTemplate({
        variables: {
          data: {
            name: submitData.name,
            content: submitData.content,
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
    saving,
    form,
    onSubmit,
    schemes,
  };
};

export default useCreateEditStatement;
