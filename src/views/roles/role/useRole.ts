import type { RoleQuery } from '#/views/roles/graphql/queries/role.generated';
import type { FormInstance } from 'antd';
import type { PermissionModel, Role } from 'graphql/types';

import { useUpsertPermissionMutation } from '#/views/roles/graphql/mutations/upsertPermissions.generated';
import { useRoleQuery } from '#/views/roles/graphql/queries/role.generated';
import { Form } from 'antd';
import { PermissionMethod } from 'graphql/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import type { FormData } from '../types';

import { useStoreState } from '../../../state';

interface Props {
  changed: boolean;
  data: RoleQuery | undefined;
  form: FormInstance<FormValues>;
  loading: boolean;
  onFinish: (values: FormValues) => void;
  roleName: string | undefined;
  setChanged: (changed: boolean) => void;
  submitting: boolean;
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
      onCompleted: (res) => {
        if (create)
          navigate(`/app/scheme-settings/roles/${res.upsertPermission.id}`);
      },
      variables: {
        data: {
          name: values.name,
          permissions: Object.keys(values)
            .filter((key) => key !== 'name' && key !== 'type')
            .map((key) => {
              if (key === 'SETTINGS') {
                if (values[key]?.includes(PermissionMethod.Edit)) {
                  return {
                    allowedMethods: [
                      PermissionMethod.Read,
                      PermissionMethod.Edit,
                    ],
                    model: key as PermissionModel,
                  };
                }
                return {
                  allowedMethods: [],
                  model: key as PermissionModel,
                };
              }
              return {
                allowedMethods: (values[key] as PermissionMethod[]) || [],
                model: key as PermissionModel,
              };
            }),
          roleId: id,
          schemeId,
          type: values.type,
        },
      },
    });
  };

  const { data, loading } = useRoleQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (iData) => {
      const permissions = iData?.role?.permissions.map((item) => ({
        methods: item?.allowedMethods,
        model: item?.model,
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
    variables: {
      where: {
        id,
      },
    },
  });
  const roleName = data?.role.name;

  return {
    changed,
    data,
    form,
    loading,
    onFinish,
    roleName,
    setChanged,
    submitting,
  };
}
