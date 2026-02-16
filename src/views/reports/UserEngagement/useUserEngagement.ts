import type { UserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import type { DateRangeInput } from 'graphql/types';
import type { RefObject } from 'react';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useUserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface Return {
  componentRef: RefObject<HTMLDivElement>;
  currentPage: number;
  data:
    | Exclude<UserEngagementQuery['userContributions'], null | undefined>
    | null
    | undefined;
  dateRange: { endDate: Date; startDate: Date };
  filtersOpen: boolean;
  handlePageChange: (page: number, newPageSize?: number) => void;
  handlePrint: () => void;
  handleSort: (field: string) => void;
  isPrinting: boolean;
  loading: boolean;
  pageSize: number;
  search: string;
  selectedBusinessGroups: string[];
  selectedBusinesses: string[];
  selectedDataBrands: string[];
  selectedGroups: string[];
  selectedRoles: string[];
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined
  ) => void;
  setSearch: (value: string) => void;
  setSelectedBusinessGroups: (groups: string[]) => void;
  setSelectedBusinesses: (value: string[]) => void;
  setSelectedDataBrands: (groups: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedRoles: (value: string[]) => void;
  sortDirection: 'asc' | 'desc';
  sortField: string;
  toggleFiltersOpen: () => void;
}

export interface SelectOptions {
  label: string;
  value: string;
}

const useUserEngagement = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedBusinessGroups, setSelectedBusinessGroups] = useState<
    string[]
  >([]);
  const [selectedDataBrands, setSelectedDataBrands] = useState<string[]>([]);
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
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0)
    ),
  });
  const { groups, groupsLoading } = useGroupsContext();

  // Auto-select groups if user has less than 3
  useEffect(() => {
    if (
      !groupsLoading &&
      groups.length > 0 &&
      groups.length < 3 &&
      selectedGroups.length === 0
    ) {
      setSelectedGroups(groups.map(({ value }) => value));
    }
  }, [groups, groupsLoading, selectedGroups.length]);

  // Pagination and sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [sortField, setSortField] = useState<string>('totalIncidents');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Calculate skip offset for pagination
  const skip = (currentPage - 1) * pageSize;

  // Build orderBy object for sorting
  const orderBy = {
    [sortField]: sortDirection,
  };

  const { data, loading } = useUserEngagementQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || groupsLoading || selectedGroups.length === 0,
    variables: {
      orderBy,
      skip,
      take: pageSize,
      where: {
        businessesIds:
          selectedBusinesses.length > 0 ? selectedBusinesses : undefined,
        dataBusinessBrandsIds:
          selectedDataBrands.length > 0 ? selectedDataBrands : undefined,
        dataBusinessGroupIds:
          selectedBusinessGroups.length > 0
            ? selectedBusinessGroups
            : undefined,
        dateRange,
        groupIds: selectedGroups,
        rolesIds: selectedRoles.length > 0 ? selectedRoles : undefined,
        schemeIds: [currentScheme],
        search: search.length > 0 ? search : undefined,
      },
    },
  });

  const setDateRange = (dateRangeInput: {
    endDate: Date;
    startDate: Date;
  }): void => {
    setDateRangeState({
      endDate: new Date(new Date(dateRangeInput.endDate).setHours(23, 59, 59)),
      startDate: new Date(new Date(dateRangeInput.startDate).setHours(0, 0, 0)),
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

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedGroups,
    selectedBusinesses,
    selectedRoles,
    selectedBusinessGroups,
    selectedDataBrands,
    dateRange,
    search,
  ]);

  // Pagination handler
  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  };

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to desc
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

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
    pageStyle: `
  @page {
    size: A4;
    margin: 10mm;
  }
  @media print {
    body { 
      -webkit-print-color-adjust: exact;
      page-break-inside: avoid;
    }
  }
`,
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
            0
          )
        ),
      }
    );

  return {
    componentRef,
    currentPage,
    data: data?.userContributions,
    dateRange,
    filtersOpen,
    handlePageChange,
    handlePrint,
    handleSort,
    isPrinting,
    loading,
    pageSize,
    search,
    selectedBusinessGroups,
    selectedBusinesses,
    selectedDataBrands,
    selectedGroups,
    selectedRoles,
    setDateRange: onSetDateRange,
    setSearch,
    setSelectedBusinessGroups,
    setSelectedBusinesses,
    setSelectedDataBrands,
    setSelectedGroups,
    setSelectedRoles,
    sortDirection,
    sortField,
    toggleFiltersOpen,
  };
};

export default useUserEngagement;
