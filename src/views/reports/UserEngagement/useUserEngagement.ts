import type { UserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import type { DateRangeInput } from 'graphql/types';
import type { RefObject } from 'react';

import { useGroupsContext } from '#/context/groups-context';
import { useUserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useStoreState } from 'state';

interface Return {
  componentRef: RefObject<HTMLDivElement>;
  data:
    | Exclude<UserEngagementQuery['listUserContribution'], null | undefined>
    | null
    | undefined;
  dateRange: { endDate: Date; startDate: Date };
  filtersOpen: boolean;
  handlePrint: () => void;
  loading: boolean;
  search: string;
  selectedBusinesses: string[];
  selectedGroups: string[];
  selectedRoles: string[];
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined
  ) => void;
  setSearch: (value: string) => void;
  setSelectedBusinesses: (value: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedRoles: (value: string[]) => void;
  toggleFiltersOpen: () => void;
}

export interface SelectOptions {
  label: string;
  value: string;
}

const useUserEngagement = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [dateRange, setDateRangeState] = useState<{
    endDate: Date;
    startDate: Date;
  }>({
    // today at 23:59:59
    endDate: new Date(new Date().setHours(23, 59, 59)),
    // new date 1 month ago at 00:00:00
    startDate: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
        0,
        0,
        59
      )
    ),
  });
  const { groups, groupsLoading } = useGroupsContext();

  const { data, loading } = useUserEngagementQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || groupsLoading || !selectedGroups,
    variables: {
      where: {
        businessesIds: selectedBusinesses ?? [],
        dateRange,
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value: id }) => id),
        rolesIds: selectedRoles ?? [],
        schemeIds: [currentScheme],
      },
    },
  });

  const setDateRange = (dateRangeInput: {
    endDate: Date;
    startDate: Date;
  }): void => {
    setDateRangeState({
      endDate: new Date(new Date(dateRangeInput.endDate).setHours(23, 59, 59)),
      startDate: new Date(
        new Date(dateRangeInput.startDate).setHours(0, 0, 59)
      ),
    });
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const [isPrinting, setIsPrinting] = useState(false);

  const promiseResolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    pageStyle:
      '@page { size: A4; margin: 10mm } @media print { body { -webkit-print-color-adjust: exact; page-break-inside: avoid;} }',
  });

  const toggleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };
  const onSetDateRange = (rangeValue: DateRangeInput | undefined) =>
    setDateRange(
      rangeValue ?? {
        endDate: new Date(new Date().setHours(23, 59, 59)),
        startDate: new Date(
          new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
            0,
            0,
            59
          )
        ),
      }
    );

  return {
    componentRef,
    data: data?.listUserContribution,
    dateRange,
    filtersOpen,
    handlePrint,
    loading,
    search,
    selectedBusinesses,
    selectedGroups,
    selectedRoles,
    setDateRange: onSetDateRange,
    setSearch,
    setSelectedBusinesses,
    setSelectedGroups,
    setSelectedRoles,
    toggleFiltersOpen,
  };
};

export default useUserEngagement;
