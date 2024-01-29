import { useNavigate } from 'react-router';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useState } from 'react';
import { useStoreState } from '../../../state';
import type {
  PermissionModel,
  Role,
  RoleQuery,
} from '../../../graphql/generated';
import {
  PermissionMethod,
  useRoleQuery,
  useUpsertPermissionMutation,
} from '../../../graphql/generated';
import type { FormData } from '../types';

interface Props {
  form: FormInstance<FormValues>;
  changed: boolean;
  setChanged: (changed: boolean) => void;
  submitting: boolean;
  onFinish: (values: FormValues) => void;
  data: RoleQuery | undefined;
  roleName: string | undefined;
  loading: boolean;
}

export interface FormValues extends FormData {
  name: string;
  type: Role;
}

export function useRole(id: string | undefined, create: boolean): Props {
  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { id: schemeId } = useStoreState((state) => state.scheme || { id: '' });
  const [updatePermissions] = useUpsertPermissionMutation({
    onCompleted: () => {
      setSubmitting(false);
      setChanged(false);
    },
    onError: () => {
      setSubmitting(false);
    },
  });
  const onFinish = (values: FormValues) => {
    setSubmitting(true);
    void updatePermissions({
      variables: {
        data: {
          schemeId,
          roleId: id,
          name: values.name,
          type: values.type,
          permissions: Object.keys(values)
            .filter((key) => key !== 'name' && key !== 'type')
            .map((key) => {
              if (key === 'SETTINGS') {
                if (values[key]?.includes(PermissionMethod.Edit)) {
                  return {
                    model: key as PermissionModel,
                    allowedMethods: [
                      PermissionMethod.Read,
                      PermissionMethod.Edit,
                    ],
                  };
                }
                return {
                  model: key as PermissionModel,
                  allowedMethods: [],
                };
              }
              return {
                model: key as PermissionModel,
                allowedMethods: (values[key] as PermissionMethod[]) || [],
              };
            }),
        },
      },
      onCompleted: (res) => {
        if (create)
          navigate(`/app/scheme-settings/roles/${res.upsertPermission.id}`);
      },
    });
  };

  const { data, loading } = useRoleQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id,
      },
    },
    onCompleted: (iData) => {
      const permissions = iData?.role?.permissions.map((item) => ({
        model: item?.model,
        methods: item?.allowedMethods,
      }));

      form.setFieldsValue({
        ...Object.fromEntries(
          permissions?.map((item) => [
            item?.model,
            item?.methods?.map((method) => method),
          ]) || []
        ),
      });
    },
    skip: !id,
  });
  const roleName = data?.role.name;

  return {
    form,
    changed,
    setChanged,
    submitting,
    onFinish,
    data,
    roleName,
    loading,
  };
}
