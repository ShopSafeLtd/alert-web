import type { Scheme } from 'state';
import { useStoreState } from 'state';
import type {
  BusinessLocationsQuery,
  IncidentMapQuery,
  SchemeGroupsQuery,
} from 'graphql/generated';
import {
  useBusinessLocationsQuery,
  useIncidentMapQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useState } from 'react';

interface Return {
  data: IncidentMapQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  schemes: Scheme[];
  onChangeSchemes: (value: string[]) => void;
  onChangeGroups: (value: string[]) => void;
  selectedSchemes: string[];
  selectedGroups: string[];
  onChangeDateRange: (value: { startDate: Date; endDate: Date }) => void;
}

const useIncidentMap = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const schemes = useStoreState((state) => state.user.schemes);
  const [selectedSchemes, setSchemes] = useState<string[]>([currentScheme]);
  const [selectedGroups, setGroups] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            in: selectedSchemes,
          },
        },
      },
    },
  });

  const { data, loading } = useIncidentMapQuery({
    variables: {
      where: {
        recycled: {
          equals: false,
        },
        scheme: {
          id: {
            in: selectedSchemes,
          },
        },
        groups:
          selectedGroups.length > 0
            ? {
                some: {
                  id: {
                    in: selectedGroups,
                  },
                },
              }
            : undefined,
        date: dateRange
          ? {
              gte: dateRange.startDate,
              lte: dateRange.endDate,
            }
          : undefined,
      },
    },
  });

  const { data: businessData } = useBusinessLocationsQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: selectedSchemes,
            },
          },
        },
        users:
          selectedGroups.length > 0
            ? {
                some: {
                  groups: {
                    some: {
                      id: {
                        in: selectedGroups,
                      },
                    },
                  },
                },
              }
            : undefined,
      },
    },
  });

  const onChangeSchemes = (values: string[]) => {
    setSchemes(values);
  };

  const onChangeGroups = (values: string[]) => {
    setGroups(values);
  };

  return {
    data,
    loading,
    groupsData,
    groupsLoading,
    businessData,
    schemes,
    onChangeSchemes,
    selectedSchemes,
    onChangeGroups,
    selectedGroups,
    onChangeDateRange: setDateRange,
  };
};

export default useIncidentMap;
