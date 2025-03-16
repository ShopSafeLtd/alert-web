import type { RoleQuery } from '#/views/roles/graphql/queries/__generated__/role.generated';
import type { FormInstance } from 'antd';
import type { Role } from 'graphql/types';

import { useUpsertPermissionMutation } from '#/views/roles/graphql/mutations/__generated__/upsertPermissions.generated';
import { useRoleQuery } from '#/views/roles/graphql/queries/__generated__/role.generated';
import {
  createPermissionEntries,
  processModelMethods,
} from '#/views/roles/role/processModelMethods';
import { Form } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import type { FormData } from '../types';

import { useStoreState } from '../../../state';
import { roleItems, settings } from '../types';

interface Props {
  changed: boolean;
  clearAll: () => void;
  data: RoleQuery | undefined;
  form: FormInstance<FormValues>;
  loading: boolean;
  onFinish: (values: FormValues) => void;
  onSettingsToggle: (value: boolean) => void;
  roleName: string | undefined;
  setAll: () => void;
  setChanged: (changed: boolean) => void;
  submitting: boolean;
}

export interface FormValues extends FormData {
  approvalAllowed: boolean;
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
    onCompleted: (res) => {
      setSubmitting(false);
      setChanged(false);
      if (create)
        navigate(`/app/scheme-settings/roles/${res.upsertPermission.id}`);
    },
    onError: () => {
      setSubmitting(false);
    },
  });
  const onFinish = (values: FormValues) => {
    setSubmitting(true);

    const result = processModelMethods(values);

    void updatePermissions({
      variables: {
        data: {
          canApprove: values.approvalAllowed,
          name: values.name,
          permissions: result,
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

      console.log({
        ...Object.fromEntries(
          permissions?.flatMap((item) =>
            item?.methods?.map((method) => [`${item.model}:${method}`, true])
          ) || []
        ),
      });

      form.setFieldsValue({
        name: iData.role.name,
        type: iData.role.type,
        ...Object.fromEntries(
          permissions?.flatMap((item) =>
            item?.methods?.map((method) => [`${item.model}:${method}`, true])
          ) || []
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

  const clearAll = () => {
    const permissionEntries: [string, boolean][] = [
      [`${PermissionModel.Settings}:${PermissionMethod.Read}`, false],
      ...createPermissionEntries(roleItems, false),
      ...createPermissionEntries(settings[0].children, false),
    ];

    form.setFieldsValue(Object.fromEntries(permissionEntries));
  };
  const setAll = () => {
    const permissionEntries: [string, boolean][] = [
      [`${PermissionModel.Settings}:${PermissionMethod.Read}`, true],
      ...createPermissionEntries(roleItems, true),
      ...createPermissionEntries(settings[0].children, true),
    ];

    form.setFieldsValue(Object.fromEntries(permissionEntries));
  };

  const clearAllSettings = () => {
    form.setFieldsValue({
      ...Object.fromEntries(
        settings[0].children.flatMap((item) =>
          item.methods.map((method) => [`${item.key}:${method.key}`, false])
        )
      ),
    });
  };
  const setAllSettings = () => {
    form.setFieldsValue({
      ...Object.fromEntries(
        settings[0].children.flatMap((item) =>
          item.methods.map((method) => [`${item.key}:${method.key}`, true])
        )
      ),
    });
  };

  const settingsEnabled = Form.useWatch(
    `${PermissionModel.Settings}:${PermissionMethod.Read}`,
    form
  ) as boolean;

  useEffect(() => {}, [settingsEnabled]);

  const onSettingsToggle = (oldValue: boolean) => {
    if (oldValue) {
      clearAllSettings();
    } else {
      setAllSettings();
    }
  };

  return {
    changed,
    clearAll,
    data,
    form,
    loading,
    onFinish,
    onSettingsToggle,
    roleName,
    setAll,
    setChanged,
    submitting,
  };
}
