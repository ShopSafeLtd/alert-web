import type { RoleQuery } from '#/views/roles/graphql/queries/__generated__/role.generated';
import type { RolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';
import type { FormInstance } from 'antd';
import type { Role } from 'graphql/types';

import { useFoldersSelectQuery } from '#/components/form-components/Folders/FolderSelect/graphql/__generated__/FolderSelectQuery.generated';
import {
  currentSchemeIdAtom,
  schemeTypeAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreState } from '#/state';
import { useSelectChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/select-checklists.generated';
import { useDeleteRoleMutation } from '#/views/roles/graphql/mutations/__generated__/deleteRole.generated';
import { useUpsertPermissionMutation } from '#/views/roles/graphql/mutations/__generated__/upsertPermissions.generated';
import { useRoleQuery } from '#/views/roles/graphql/queries/__generated__/role.generated';
import { RolesDocument } from '#/views/roles/graphql/queries/__generated__/roles.generated';
import {
  createPermissionEntries,
  processModelMethods,
} from '#/views/roles/role/processModelMethods';
import { Form, notification } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { FormData } from '../types';

import { roleItems, settings } from '../types';
import { filterRoleItemsBySchemeType } from '../utils/filterRoleItemsBySchemeType';

export interface DeleteFormValues {
  newRoleId: string;
}
export interface TreeData {
  key: string;
  title: string;
  value: string;
}
export interface FolderTreeData extends TreeData {
  children: TreeData[];
}

interface Props {
  changed: boolean;
  checklistsData: TreeData[];
  clearAll: () => void;
  data: RoleQuery | undefined;
  foldersData: FolderTreeData[];
  form: FormInstance<FormValues>;
  loading: boolean;
  onChecklistsToggle: (checked: boolean) => void;
  onDelete: (values: DeleteFormValues) => void;
  onFinish: (values: FormValues) => void;
  onFoldersToggle: (checked: boolean) => void;
  onSelectChecklist: (value: string[]) => void;
  onSelectFolder: (value: string[]) => void;
  onSettingsToggle: (value: boolean) => void;
  roleName: string | undefined;
  setAll: () => void;
  setChanged: (changed: boolean) => void;
  showDelete: boolean;
  submitting: boolean;
  toggleShowDelete: () => void;
}

export interface FormValues extends FormData {
  approvalAllowed: boolean;
  checklists: string[];
  folders: string[];
  name: string;
  parentId: string;
  selectAllChecklists: boolean;
  selectAllFolders: boolean;
  type: Role;
}

export function useRole(id: string | undefined, create: boolean): Props {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const schemeType = useAtomValue(schemeTypeAtom);
  const { checklistSort } = useStoreState((state) => state.filter);
  const [form] = Form.useForm<FormValues>();

  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

      // First, reset all form fields to clear previous role's permissions
      form.resetFields();

      // Then set the new role's values
      form.setFieldsValue({
        approvalAllowed: iData.role.approvalTier,
        checklists: iData.role.checklists.map(({ id }) => id) || [],
        folders: iData.role.folders.map(({ id }) => id) || [],
        name: iData.role.name,
        parentId: iData.role.parentId || '',
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
  const { data: foldersData, loading: foldersLoading } =
    useFoldersSelectQuery();
  const { data: checklistsData, loading: checklistLoading } =
    useSelectChecklistsQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        order: {
          [checklistSort.field]: checklistSort.order,
        },
        where: {
          deleted: { equals: false },
          schemes: {
            some: { id: { equals: schemeId } },
          },
        },
      },
    });
  const [deletePermission] = useDeleteRoleMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The role has been delete',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully deleted',
        }),
        placement: 'bottomRight',
      });
    },
    update: (store, { data: res }) => {
      if (res?.deleteRole === null || res?.deleteRole === undefined) return;
      const existingData = store.readQuery<RolesQuery>({
        query: RolesDocument,
        variables: {
          schemeId: schemeId || '',
          take: 20,
        },
      });

      if (!existingData?.roles) return;
      store.writeQuery<RolesQuery>({
        data: {
          __typename: 'Query',
          roles: {
            ...existingData.roles,
            edges: existingData.roles.edges.filter(
              ({ node }) => node.id !== id
            ),
          },
        },
        query: RolesDocument,
        variables: {
          schemeId: schemeId || '',
          take: 20,
        },
      });
    },
  });
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

    console.log(values);

    const result = processModelMethods(values);

    void updatePermissions({
      variables: {
        data: {
          canApprove: values.approvalAllowed,
          checklistIds: values.checklists,
          folderIds: values.folders,
          name: values.name,
          parentId: values.parentId,
          permissions: result,
          roleId: id,
          schemeId,
          type: values.type,
        },
      },
    });
  };

  const toggleShowDelete = () => setShowDelete(!showDelete);

  const roleName = data?.role.name;

  const onSelectFolder = (value: string[]) => {
    form.setFieldsValue({
      folders: value,
    });
  };
  const onSelectChecklist = (value: string[]) => {
    form.setFieldsValue({
      checklists: value,
    });
  };
  const onSelectAllFolders = () => {
    const allFolderIds =
      foldersData?.folders?.edges?.flatMap((edge) => {
        const parentId = edge.node?.id ? [edge.node.id] : [];
        const childIds =
          edge.node?.childFolders?.map((child) => child.id) || [];
        return [...parentId, ...childIds];
      }) || [];
    form.setFieldsValue({
      folders: allFolderIds,
    });
  };
  const onSelectAllChecklists = () => {
    form.setFieldsValue({
      checklists: checklistsData?.checklists.map((el) => el.id) || [],
    });
  };

  const clearAll = () => {
    // Filter by scheme type first, then disabled status
    const filteredRoleItems = filterRoleItemsBySchemeType(
      roleItems,
      schemeType
    );
    const enabledRoleItems = filteredRoleItems.filter((item) => !item.disabled);
    const enabledSettingsChildren = settings[0].children.filter(
      (item) => !item.disabled
    );
    const permissionEntries: [string, boolean][] = [
      [`${PermissionModel.Settings}:${PermissionMethod.Read}`, false],
      ...createPermissionEntries(enabledRoleItems, false),
      ...createPermissionEntries(enabledSettingsChildren, false),
    ];

    form.setFieldsValue(Object.fromEntries(permissionEntries));
    form.setFieldsValue({
      checklists: [],
      folders: [],
      selectAllChecklists: false,
      selectAllFolders: false,
    });
  };
  const setAll = () => {
    // Filter by scheme type first, then disabled status
    const filteredRoleItems = filterRoleItemsBySchemeType(
      roleItems,
      schemeType
    );
    const enabledRoleItems = filteredRoleItems.filter((item) => !item.disabled);
    const enabledSettingsChildren = settings[0].children.filter(
      (item) => !item.disabled
    );
    const permissionEntries: [string, boolean][] = [
      [`${PermissionModel.Settings}:${PermissionMethod.Read}`, true],
      ...createPermissionEntries(enabledRoleItems, true),
      ...createPermissionEntries(enabledSettingsChildren, true),
    ];

    form.setFieldsValue(Object.fromEntries(permissionEntries));
    onSelectAllFolders();
    onSelectAllChecklists();
    form.setFieldsValue({
      selectAllChecklists: true,
      selectAllFolders: true,
    });
  };

  const clearAllSettings = () => {
    // Filter out disabled items (Vision Settings)
    const enabledSettingsChildren = settings[0].children.filter(
      (item) => !item.disabled
    );
    form.setFieldsValue({
      ...Object.fromEntries(
        enabledSettingsChildren.flatMap((item) =>
          item.methods.map((method) => [`${item.key}:${method.key}`, false])
        )
      ),
    });
  };
  const setAllSettings = () => {
    // Filter out disabled items (Vision Settings)
    const enabledSettingsChildren = settings[0].children.filter(
      (item) => !item.disabled
    );
    form.setFieldsValue({
      ...Object.fromEntries(
        enabledSettingsChildren.flatMap((item) =>
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

  const onFoldersToggle = (checked: boolean) => {
    if (checked) {
      onSelectAllFolders();
    } else {
      form.setFieldsValue({
        folders: [],
      });
    }
  };
  const onChecklistsToggle = (checked: boolean) => {
    if (checked) {
      onSelectAllChecklists();
    } else {
      form.setFieldsValue({
        checklists: [],
      });
    }
  };

  const onDelete = (values: DeleteFormValues) => {
    if (id) {
      toggleShowDelete();
      void deletePermission({
        optimisticResponse: {
          deleteRole: {
            id,
          },
        },
        variables: {
          data: {
            id,
            newId: values.newRoleId,
          },
        },
      });
      navigate(`/app/scheme-settings/roles`);
    }
  };

  return {
    changed,
    checklistsData:
      checklistsData?.checklists.map((el) => ({
        key: el.id,
        title: el.titleLocaled,
        value: el.id,
      })) || [],
    clearAll,
    data,
    foldersData:
      foldersData?.folders.edges.map(({ node: folder }) => ({
        children:
          folder.childFolders && folder.childFolders.length > 0
            ? folder.childFolders.map((el) => ({
                key: el.id,
                title: el.name,
                value: el.id,
              }))
            : [],
        key: folder.id,
        title: folder.name,
        value: folder.id,
      })) || [],
    form,
    loading: loading || foldersLoading || checklistLoading,
    onChecklistsToggle,
    onDelete,
    onFinish,
    onFoldersToggle,
    onSelectChecklist,
    onSelectFolder,
    onSettingsToggle,
    roleName,
    setAll,
    setChanged,
    showDelete,
    submitting,
    toggleShowDelete,
  };
}
