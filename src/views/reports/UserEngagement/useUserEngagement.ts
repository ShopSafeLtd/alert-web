import { useStoreState } from 'state';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useGroupsContext } from '#/context/groups-context';
import type { UserEngagementQuery } from 'graphql/reports/queries/list-user-engagement.generated';
import { useUserEngagementQuery } from 'graphql/reports/queries/list-user-engagement.generated';

interface Return {
  loading: boolean;
  data:
    | Exclude<UserEngagementQuery['listUserContribution'], undefined | null>
    | null
    | undefined;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  filtersOpen: boolean;
  toggleFiltersOpen: () => void;
  selectedRoles: string[];
  setSelectedRoles: (value: string[]) => void;
  selectedBusinesses: string[];
  setSelectedBusinesses: (value: string[]) => void;
  search: string;
  setSearch: (value: string) => void;
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
    startDate: Date;
    endDate: Date;
  }>({
    // new date 1 month ago at 00:00:00
    startDate: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
        0,
        0,
        59
      )
    ),
    // today at 23:59:59
    endDate: new Date(new Date().setHours(23, 59, 59)),
  });
  const { groups, groupsLoading } = useGroupsContext();

  const { data, loading } = useUserEngagementQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || groupsLoading || !selectedGroups,
    variables: {
      where: {
        dateRange,
        schemeIds: [currentScheme],
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value: id }) => id),
        businessesIds: selectedBusinesses ?? [],
        rolesIds: selectedRoles ?? [],
      },
    },
  });

  const setDateRange = (dateRangeInput: {
    startDate: Date;
    endDate: Date;
  }): void => {
    setDateRangeState({
      startDate: new Date(
        new Date(dateRangeInput.startDate).setHours(0, 0, 59)
      ),
      endDate: new Date(new Date(dateRangeInput.endDate).setHours(23, 59, 59)),
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
    pageStyle:
      '@page { size: A4; margin: 10mm } @media print { body { -webkit-print-color-adjust: exact; page-break-inside: avoid;} }',
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  const toggleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };

  return {
    data: data?.listUserContribution,
    loading,
    setDateRange,
    dateRange,
    setSelectedGroups,
    selectedGroups,
    handlePrint,
    componentRef,
    filtersOpen,
    toggleFiltersOpen,
    selectedRoles,
    setSelectedBusinesses,
    setSelectedRoles,
    selectedBusinesses,
    search,
    setSearch,
  };
};

export default useUserEngagement;
