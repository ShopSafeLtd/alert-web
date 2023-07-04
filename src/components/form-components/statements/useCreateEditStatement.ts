import type { FormInstance } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import type { FormData } from './createEditStatement.view';
import { useStoreState } from '../../../state';
import {
  useCreateOneStatementTemplateMutation,
  useUpdateOneStatementTemplateMutation,
} from '../../../graphql/generated';

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
