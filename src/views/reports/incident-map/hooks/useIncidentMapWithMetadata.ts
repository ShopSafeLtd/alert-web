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

// import useIncidentMapReport, {
//   type IncidentMapFilters,
// } from './useIncidentMapReport';

const handleSaveFilters = () => {
  console.log('Save disabled for debugging');
};

interface Return {
  // Original data
  allBrandsData: BrandsQuery | undefined;
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  cluster: boolean;
  data: IncidentSimpleMapQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | null;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  heatmapIntensity: number;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  loading: boolean;
  multiColour: 'multi' | 'single';
  onChangeBrands: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date } | null) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeIncidentTypes: (value: string | string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangePoliceAreas: (value: string | string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  // Save filters
  saveFilters: () => void;
  saving: boolean;
  schemes: { scheme: { id: string; name: string } }[];
  selectedBrands: string[];

  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedPoliceAreas: string[];
  selectedSchemes: string[];
  setCluster: (value: boolean) => void;
  setHeatmapIntensity: (value: number) => void;
  setMultiColour: (value: 'multi' | 'single') => void;
  setShowBCRP: (value: boolean) => void;
  setShowBusinesses: (value: boolean) => void;
  setShowCameras: (value: boolean) => void;
  setShowHeatmap: (value: boolean) => void;
  setShowLondonPolice: (value: boolean) => void;
  setShowMarkers: (value: boolean) => void;
  setShowPolice: (value: boolean) => void;
  setShowRetailParks: (value: boolean) => void;
  setShowUKDistricts: (value: boolean) => void;
  setUseBcu: (value: boolean) => void;
  setViewMode: (value: 'popup' | 'sidebar') => void;
  showBCRP: boolean;
  showBusinesses: boolean;
  showCameras: boolean;
  showHeatmap: boolean;
  showLondonPolice: boolean;
  // Display settings
  showMarkers: boolean;
  showPolice: boolean;
  showRetailParks: boolean;
  showUKDistricts: boolean;

  useBcu: boolean;
  viewMode: 'popup' | 'sidebar';
}

const useIncidentMapWithMetadata = (): Return => {
  const userId = useAtomValue(userIdAtom);
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const schemes = useAtomValue(userSchemesAtom);

  // Completely disable metadata system for debugging
  const saving = false;

  // Default date range (last 30 days)
  const defaultDateRange = (() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    return { endDate, startDate };
  })();

  // Initialize state with default values - NO getFilters() call to avoid loops
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
  } | null>(defaultDateRange);

  // Display settings state - initialize with defaults
  const [showMarkers, setShowMarkers] = useState(true);
  const [showBusinesses, setShowBusinesses] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showPolice, setShowPolice] = useState(false);
  const [showLondonPolice, setShowLondonPolice] = useState(false);
  const [showCameras, setShowCameras] = useState(false);
  const [showBCRP, setShowBCRP] = useState(false);
  const [showRetailParks, setShowRetailParks] = useState(false);
  const [showUKDistricts, setShowUKDistricts] = useState(false);
  const [cluster, setCluster] = useState(true);
  const [heatmapIntensity, setHeatmapIntensity] = useState(50);
  const [multiColour, setMultiColour] = useState<'multi' | 'single'>('single');
  const [useBcu, setUseBcu] = useState(false);
  const [viewMode, setViewMode] = useState<'popup' | 'sidebar'>('popup');

  // All metadata functionality disabled for debugging

  // Data queries (same as original)
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
      take: 1000,
      where: {
        scheme: {
          id: {
            in: selectedSchemes,
          },
        },
      },
    },
  });

  const { data: allBrandsData } = useBrandsQuery({
    variables: {
      take: 2000,
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
    allBrandsData,
    brandsData,
    brandsLoading,
    businessData,
    cluster,
    data,
    dateRange,
    groupsData,
    groupsLoading,
    heatmapIntensity,
    industriesData,
    industriesLoading,
    loading,
    multiColour,
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
    // Save filters
    saveFilters: handleSaveFilters,
    saving,
    schemes,
    selectedBrands,

    selectedGroups,
    selectedIncidentTypes,
    selectedIndustries,
    selectedPoliceAreas,
    selectedSchemes,
    setCluster,
    setHeatmapIntensity,
    setMultiColour,
    setShowBCRP,
    setShowBusinesses,
    setShowCameras,
    setShowHeatmap,
    setShowLondonPolice,
    setShowMarkers,
    setShowPolice,
    setShowRetailParks,
    setShowUKDistricts,
    setUseBcu,
    setViewMode,
    showBCRP,
    showBusinesses,
    showCameras,
    showHeatmap,
    showLondonPolice,
    // Display settings
    showMarkers,
    showPolice,
    showRetailParks,
    showUKDistricts,

    useBcu,
    viewMode,
  };
};

export default useIncidentMapWithMetadata;
