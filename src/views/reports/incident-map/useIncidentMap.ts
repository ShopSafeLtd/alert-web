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
  selectedSchemes: string[];
}

const useIncidentMap = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const schemes = useStoreState((state) => state.user.schemes);
  const [selectedSchemes, setSchemes] = useState([currentScheme]);

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
      },
    },
  });

  const onChangeSchemes = (values: string[]) => {
    setSchemes(values);
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
  };
};

export default useIncidentMap;
