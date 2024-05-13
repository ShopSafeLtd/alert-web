import { useGroupsContext } from '#/context/groups-context';

interface Return {
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
}

const useIncidentGroups = (): Return => {
  const { groups, groupsLoading } = useGroupsContext();

  return {
    groupsLoading,
    groups,
  };
};

export default useIncidentGroups;
