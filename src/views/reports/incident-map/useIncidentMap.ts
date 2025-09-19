import type { IncidentSimpleMapQuery } from '#/views/reports/incident-map/graphql/queries/__generated__/incident-map.generated';
import type { BrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { BusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { IndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import type { PoliceForce } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  userIdAtom,
  userSchemesAtom,
} from '#/providers/UserProvider/UserProvider';
import { useIncidentSimpleMapQuery } from '#/views/reports/incident-map/graphql/queries/__generated__/incident-map.generated';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { useBusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { useIndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Return {
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  data: IncidentSimpleMapQuery | undefined;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  loading: boolean;
  onChangeBrands: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date }) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeIncidentTypes: (value: string | string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangePoliceAreas: (value: string | string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  schemes: { scheme: { id: string; name: string } }[];
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedPoliceAreas: string[];
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
  const [selectedIncidentTypes, setSelectedIncidentTypes] = useState<string[]>(
    []
  );
  const [selectedPoliceAreas, setSelectedPoliceAreas] = useState<string[]>([]);
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

  const { data, loading } = useIncidentSimpleMapQuery({
    variables: {
      where: {
        business:
          selectedPoliceAreas.length > 0
            ? {
                policeArea: {
                  hasSome: selectedPoliceAreas as PoliceForce[],
                },
              }
            : undefined,
        crimeTypes:
          selectedIncidentTypes.length > 0
            ? {
                some: {
                  id: {
                    in: selectedIncidentTypes,
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
        policeArea:
          selectedPoliceAreas.length > 0
            ? {
                hasSome: selectedPoliceAreas as PoliceForce[],
              }
            : undefined,
        schemes: {
          some: {
            id: {
              in: selectedSchemes,
            },
          },
        },
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
    onChangeIncidentTypes: (value: string | string[]) => {
      setSelectedIncidentTypes(Array.isArray(value) ? value : [value]);
    },
    onChangeIndustries: setIndustries,
    onChangePoliceAreas: (value: string | string[]) => {
      setSelectedPoliceAreas(Array.isArray(value) ? value : [value]);
    },
    onChangeSchemes,
    schemes,
    selectedBrands,
    selectedGroups,
    selectedIncidentTypes,
    selectedIndustries,
    selectedPoliceAreas,
    selectedSchemes,
  };
};

export default useIncidentMap;
