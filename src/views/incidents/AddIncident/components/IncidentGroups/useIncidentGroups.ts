import { useGroupsContext } from '#/context/groups-context';

interface Return {
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
}

const useIncidentGroups = (): Return => {
  const { groups, groupsLoading } = useGroupsContext();

  return {
    groups,
    groupsLoading,
  };
};

export default useIncidentGroups;
