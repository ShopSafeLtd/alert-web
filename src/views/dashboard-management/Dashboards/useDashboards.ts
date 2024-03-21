import type {
  AvailRolesQuery,
  CreateDashboardMutationVariables,
  DashboardTemplatesQuery,
} from 'graphql/generated';
import {
  DashboardTemplatesDocument,
  useAvailRolesQuery,
  useCreateDashboardMutation,
  useDashboardTemplatesQuery,
  useDeleteDashboardMutation,
  useUpdateDashboardTemplateMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';

interface Return {
  data: DashboardTemplatesQuery | undefined;
  loading: boolean;
  addDashboard: boolean;
  toggleCreateDashboard: () => void;
  createDashboard: (data: CreateDashboardMutationVariables) => void;
  deleteDashboard: (id: string) => void;
  updateDashboard: ({
    defaultAdmin,
    defaultUser,
    name,
    roles,
    id,
  }: {
    defaultAdmin?: boolean;
    defaultUser?: boolean;
    name?: string;
    roles?: string[];
    id: string;
  }) => void;
  editDashboard: string | undefined;
  toggleEditDashboard: (arg: string | undefined) => void;
  rolesData: AvailRolesQuery | undefined;
  schemeId: string;
}

const useDashboards = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [addDashboard, setAddDashboard] = useState(false);
  const [editDashboard, setEditDashboard] = useState<undefined | string>(
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
      variables: d,
      onCompleted: ({ createDashboard: Res }) => {
        if (Res) {
          navigate(`/app/manage-dashboard/edit/${Res.id}`);
        }
      },
    });
  };

  const deleteDashboard = (dashId: string) => {
    void deleteDashboardMutation({
      variables: {
        where: {
          id: dashId,
        },
      },
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
          query: DashboardTemplatesDocument,
          data: {
            dashboards: {
              ...existingData.dashboards,
              edges: existingData.dashboards.edges.filter(
                ({ node }) => node.id !== dashId
              ),
            },
            __typename: 'Query',
          },
          variables: {
            scheme: {
              id: schemeId,
            },
          },
        });
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
    name,
    roles,
    id,
  }: {
    defaultAdmin?: boolean;
    defaultUser?: boolean;
    name?: string;
    roles?: string[];
    id: string;
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
      variables: {
        where: {
          id,
        },
        data: {
          defaultAdmin: defaultAdmin ?? undefined,
          defaultUser: defaultUser ?? undefined,
          name: name ? { set: name } : undefined,
          roles: rolesFormatted ?? undefined,
        },
      },
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
          query: DashboardTemplatesDocument,
          data: {
            dashboards: {
              ...existingData.dashboards,
              edges: existingData.dashboards.edges.map(({ node }) => {
                if (node.id === res.updateDashboardTemplate.id) {
                  const { roles: newRoles, name: newName } =
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
            __typename: 'Query',
          },
          variables: {
            scheme: {
              id: schemeId,
            },
          },
        });
      },
    });
    toggleEditDashboard(undefined);
  };

  const { data: rolesData } = useAvailRolesQuery({
    variables: {
      schemeId,
    },
    skip: !schemeId,
  });
  return {
    data,
    loading,
    addDashboard,
    toggleCreateDashboard,
    createDashboard,
    deleteDashboard,
    updateDashboard,
    toggleEditDashboard,
    editDashboard,
    rolesData,
    schemeId,
  };
};

export default useDashboards;
