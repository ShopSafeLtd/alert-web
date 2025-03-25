import type { BrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { BusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { IndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import type { IncidentMapQuery } from 'graphql/reports/queries/__generated__/incident-map.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  userIdAtom,
  userSchemesAtom,
} from '#/providers/UserProvider/UserProvider';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { useBusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { useIndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import { useIncidentMapQuery } from 'graphql/reports/queries/__generated__/incident-map.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Return {
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  data: IncidentMapQuery | undefined;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  loading: boolean;
  onChangeBrands: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date }) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  schemes: { scheme: { id: string; name: string } }[];
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIndustries: string[];
  selectedSchemes: string[];
}

const useIncidentMap = (): Return => {
  const userId = useAtomValue(userIdAtom);
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const schemes = useAtomValue(userSchemesAtom);
  const [selectedSchemes, setSchemes] = useState<string[]>([currentScheme]);
  const [selectedGroups, setGroups] = useState<string[]>([]);
  const [selectedBrands, setBrands] = useState<string[]>([]);
  const [selectedIndustries, setIndustries] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    endDate: Date;
    startDate: Date;
  } | null>(null);

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            in: selectedSchemes,
          },
        },
        users: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
    },
  });

  const { data, loading } = useIncidentMapQuery({
    variables: {
      where: {
        date: dateRange
          ? {
              gte: dateRange.startDate,
              lte: dateRange.endDate,
            }
          : undefined,
        groups: {
          some: {
            id: {
              in:
                selectedGroups.length > 0
                  ? selectedGroups
                  : groupsData?.groups.map(({ id }) => id),
            },
          },
        },
        location: {
          geoLat: {
            not: null,
          },
        },
        scheme: {
          id: {
            in: selectedSchemes,
          },
        },
      },
    },
  });

  const { data: businessData } = useBusinessLocationsQuery({
    variables: {
      where: {
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
    brandsData,
    brandsLoading,
    businessData,
    data,
    groupsData,
    groupsLoading,
    industriesData,
    industriesLoading,
    loading,
    onChangeBrands: setBrands,
    onChangeDateRange: setDateRange,
    onChangeGroups,
    onChangeIndustries: setIndustries,
    onChangeSchemes,
    schemes,
    selectedBrands,
    selectedGroups,
    selectedIndustries,
    selectedSchemes,
  };
};

export default useIncidentMap;
