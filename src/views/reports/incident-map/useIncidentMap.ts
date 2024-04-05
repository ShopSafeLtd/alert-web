import type { Scheme } from 'state';
import { useStoreState } from 'state';
import type {
  BrandsQuery,
  BusinessLocationsQuery,
  IncidentMapQuery,
  IndustriesQuery,
  SchemeGroupsQuery,
} from 'graphql/generated';
import {
  useBrandsQuery,
  useBusinessLocationsQuery,
  useIncidentMapQuery,
  useIndustriesQuery,
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
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  selectedBrands: string[];
  selectedIndustries: string[];
  onChangeBrands: (value: string[]) => void;
  onChangeIndustries: (value: string[]) => void;
}

const useIncidentMap = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const schemes = useStoreState((state) => state.user.schemes);
  const [selectedSchemes, setSchemes] = useState<string[]>([currentScheme]);
  const [selectedGroups, setGroups] = useState<string[]>([]);
  const [selectedBrands, setBrands] = useState<string[]>([]);
  const [selectedIndustries, setIndustries] = useState<string[]>([]);
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
        brands:
          selectedBrands.length > 0 || selectedIndustries.length > 0
            ? {
                some: {
                  id:
                    selectedBrands.length > 0
                      ? {
                          in: selectedBrands,
                        }
                      : undefined,
                  industry:
                    selectedIndustries.length > 0
                      ? {
                          id: {
                            in: selectedIndustries,
                          },
                        }
                      : undefined,
                },
              }
            : undefined,
      },
    },
  });

  const { data: brandsData, loading: brandsLoading } = useBrandsQuery({
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

  const { data: industriesData, loading: industriesLoading } =
    useIndustriesQuery();

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
    brandsData,
    brandsLoading,
    industriesData,
    industriesLoading,
    selectedIndustries,
    onChangeBrands: setBrands,
    onChangeIndustries: setIndustries,
    selectedBrands,
  };
};

export default useIncidentMap;
