import type { CreateDashboardMutationVariables } from '#/views/dashboard-management/graphql/mutations/__generated__/dashboard.generated';
import type { AvailRolesQuery } from '#/views/dashboard-management/graphql/queries/__generated__/available-roles.generated';
import type { DashboardTemplatesQuery } from '#/views/dashboard-management/graphql/queries/__generated__/dashboard-templates.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  useCreateDashboardMutation,
  useDeleteDashboardMutation,
  useUpdateDashboardTemplateMutation,
} from '#/views/dashboard-management/graphql/mutations/__generated__/dashboard.generated';
import { useAvailRolesQuery } from '#/views/dashboard-management/graphql/queries/__generated__/available-roles.generated';
import {
  DashboardTemplatesDocument,
  useDashboardTemplatesQuery,
} from '#/views/dashboard-management/graphql/queries/__generated__/dashboard-templates.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Return {
  addDashboard: boolean;
  createDashboard: (data: CreateDashboardMutationVariables) => void;
  data: DashboardTemplatesQuery | undefined;
  deleteDashboard: (id: string) => void;
  editDashboard: string | undefined;
  loading: boolean;
  rolesData: AvailRolesQuery | undefined;
  schemeId: string;
  toggleCreateDashboard: () => void;
  toggleEditDashboard: (arg: string | undefined) => void;
  updateDashboard: ({
    defaultAdmin,
    defaultUser,
    id,
    name,
    roles,
  }: {
    defaultAdmin?: boolean;
    defaultUser?: boolean;
    id: string;
    name?: string;
    roles?: string[];
  }) => void;
}

const useDashboards = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [addDashboard, setAddDashboard] = useState(false);
  const [editDashboard, setEditDashboard] = useState<string | undefined>(
    undefined
  );

  const { data, loading } = useDashboardTemplatesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: schemeId,
      },
    },
  });
  const navigate = useNavigate();
  const [createDashboardMutation] = useCreateDashboardMutation();
  const [editDashbaordMutation] = useUpdateDashboardTemplateMutation();
  const [deleteDashboardMutation] = useDeleteDashboardMutation();
  const createDashboard = (d: CreateDashboardMutationVariables) => {
    void createDashboardMutation({
      onCompleted: ({ createDashboard: Res }) => {
        if (Res) {
          navigate(`/app/manage-dashboard/edit/${Res.id}`);
        }
      },
      variables: d,
    });
  };

  const deleteDashboard = (dashId: string) => {
    void deleteDashboardMutation({
      update: (store, { data: res }) => {
        if (
          res?.deleteDashboardTemplate === null ||
          res?.deleteDashboardTemplate === undefined
        )
          return;
        const existingData = store.readQuery<DashboardTemplatesQuery>({
          query: DashboardTemplatesDocument,
          variables: {
            scheme: {
              id: schemeId,
            },
          },
        });

        if (!existingData?.dashboards) return;
        store.writeQuery<DashboardTemplatesQuery>({
          data: {
            __typename: 'Query',
            dashboards: {
              ...existingData.dashboards,
              edges: existingData.dashboards.edges.filter(
                ({ node }) => node.id !== dashId
              ),
            },
          },
          query: DashboardTemplatesDocument,
          variables: {
            scheme: {
              id: schemeId,
            },
          },
        });
      },
      variables: {
        where: {
          id: dashId,
        },
      },
    });
  };
  const toggleCreateDashboard = () => {
    setAddDashboard((prev) => !prev);
  };
  const toggleEditDashboard = (arg: string | undefined) => {
    setEditDashboard(arg);
  };
  const updateDashboard = ({
    defaultAdmin,
    defaultUser,
    id,
    name,
    roles,
  }: {
    defaultAdmin?: boolean;
    defaultUser?: boolean;
    id: string;
    name?: string;
    roles?: string[];
  }) => {
    let rolesFormatted:
      | { connect: { id: string }[]; disconnect: { id: string }[] }
      | undefined;

    if (roles && roles.length > 0 && data?.dashboards.edges) {
      const oldRoles = data.dashboards.edges.find(({ node }) => node.id === id);
      if (oldRoles) {
        const oldRolesFormatted = oldRoles.node.roles.map(
          ({ id: oldId }) => oldId
        );
        const rolesToRemove = oldRolesFormatted.filter((i) =>
          roles.includes(i)
        );
        rolesFormatted = {
          connect: roles.map((i) => ({ id: i })),
          disconnect: rolesToRemove.map((i) => ({ id: i })),
        };
      }
    }

    void editDashbaordMutation({
      update: (store, { data: res }) => {
        if (
          res?.updateDashboardTemplate === null ||
          res?.updateDashboardTemplate === undefined
        )
          return;
        const existingData = store.readQuery<DashboardTemplatesQuery>({
          query: DashboardTemplatesDocument,
          variables: {
            scheme: {
              id: schemeId,
            },
          },
        });

        if (!existingData?.dashboards) return;
        store.writeQuery<DashboardTemplatesQuery>({
          data: {
            __typename: 'Query',
            dashboards: {
              ...existingData.dashboards,
              edges: existingData.dashboards.edges.map(({ node }) => {
                if (node.id === res.updateDashboardTemplate.id) {
                  const { name: newName, roles: newRoles } =
                    res.updateDashboardTemplate;
                  return {
                    node: {
                      ...node,
                      name: newName,
                      roles: newRoles,
                    },
                  };
                }
                return { node };
              }),
            },
          },
          query: DashboardTemplatesDocument,
          variables: {
            scheme: {
              id: schemeId,
            },
          },
        });
      },
      variables: {
        data: {
          defaultAdmin: defaultAdmin ?? undefined,
          defaultUser: defaultUser ?? undefined,
          name: name ? { set: name } : undefined,
          roles: rolesFormatted ?? undefined,
        },
        where: {
          id,
        },
      },
    });
    toggleEditDashboard(undefined);
  };

  const { data: rolesData } = useAvailRolesQuery({
    skip: !schemeId,
    variables: {
      schemeId,
    },
  });
  return {
    addDashboard,
    createDashboard,
    data,
    deleteDashboard,
    editDashboard,
    loading,
    rolesData,
    schemeId,
    toggleCreateDashboard,
    toggleEditDashboard,
    updateDashboard,
  };
};

export default useDashboards;
