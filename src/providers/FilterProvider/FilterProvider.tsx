import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { IncidentsFeedQueryVariables } from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';
import type { IncidentPriority } from 'graphql/types';

import { currentUserSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { SortOrder } from 'graphql/types';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai/index';
import { useEffect } from 'react';

interface Props {
  children: JSX.Element;
}

interface DateRangeFilterType {
  range: DateSelectModeType | undefined;
  value: { endDate: Date; startDate: Date } | undefined;
}

interface ActivityFiltersType {
  order: {
    createdAt: SortOrder;
  };
  skip: number;
  take: number;
  where: {
    businessIds?: null | string[];
    completedData?: DateRangeFilterType | null;
    createdAt?: DateRangeFilterType | null;
    dueDate?: DateRangeFilterType | null;
    groupIds?: null | string[];
    userIds?: null | string[];
  };
}

const defaultActivityFiltersAtom = {
  order: {
    createdAt: SortOrder.Desc,
  },
  skip: 0,
  take: 20,
  where: {},
};

interface IncidentFiltersType {
  first: number;
  order: IncidentsFeedQueryVariables['order'];
  variables: {
    approved?: boolean;
    businessIds?: string[];
    createdAt?: {
      gte: Date;
      lte: Date;
    };
    createdByIds?: string;
    crimeGroupIds?: string[];
    date?: {
      gte: Date;
      lte: Date;
    };
    goodTypeIds?: string[];
    groupIds?: string[];
    incidentTypeIds?: string[];
    offenderIds?: string[];
    policeInvolved?: boolean;
    policeReported?: boolean;
    priorities?: IncidentPriority[];
    search?: string;
    stockItemIds?: string[];
    userDataOnly?: boolean;
    userIsFollowing?: boolean;
    vehicleIds?: string[];
  };
}

const defaultIncidentFiltersAtom = {
  first: 12,
  order: {
    createdAt: SortOrder.Desc,
  },
  variables: {},
};

export const incidentFiltersAtom = atom<IncidentFiltersType>(
  defaultIncidentFiltersAtom
);
export const activityFiltersAtom = atom<ActivityFiltersType>(
  defaultActivityFiltersAtom
);

export const useIncidentFilters = () => {
  const [incidentFilters, setIncidentFiltersAtom] =
    useAtom(incidentFiltersAtom);

  const resetIncidentFilters = () =>
    setIncidentFiltersAtom(defaultIncidentFiltersAtom);
  const setIncidentFilters = (value: IncidentFiltersType) =>
    setIncidentFiltersAtom({
      ...incidentFilters,
      ...value,
      variables: {
        ...incidentFilters.variables,
        ...value.variables,
      },
    });

  return {
    incidentFilters,
    resetIncidentFilters,
    setIncidentFilters,
  };
};

export const useActivityFilters = () => {
  const [activityFilters, setActivityFiltersAtom] =
    useAtom(activityFiltersAtom);

  const resetIncidentFilters = () =>
    setActivityFiltersAtom(defaultActivityFiltersAtom);
  const setActivityFilters = (value: ActivityFiltersType) =>
    setActivityFiltersAtom({
      ...activityFilters,
      ...value,
      where: {
        ...activityFilters.where,
        ...value.where,
      },
    });

  return {
    activityFilters,
    resetIncidentFilters,
    setActivityFilters,
  };
};

const FilterProvider = ({ children }: Props) => {
  const currentUserSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setIncidentFilters = useSetAtom(incidentFiltersAtom);

  useEffect(() => {
    setIncidentFilters(defaultIncidentFiltersAtom);
  }, [currentUserSchemeId]);

  return children;
};

export default FilterProvider;
