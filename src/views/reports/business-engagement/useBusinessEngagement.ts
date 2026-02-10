import type { BusinessEngagementQuery } from 'graphql/reports/queries/__generated__/business-engagement.generated';
import type { DateRangeInput } from 'graphql/types';
import type { RefObject } from 'react';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBusinessEngagementQuery } from 'graphql/reports/queries/__generated__/business-engagement.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface Return {
  componentRef: RefObject<HTMLDivElement>;
  currentPage: number;
  data: BusinessEngagementQuery | undefined;
  dateRange: { endDate: Date; startDate: Date };
  groups: SelectOptions[];
  groupsLoading: boolean;
  handlePageChange: (page: number, newPageSize?: number) => void;
  handlePrint: () => void;
  isPrinting: boolean;
  loading: boolean;
  pageSize: number;
  selectedGroups: string[];
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined
  ) => void;
  setSelectedGroups: (groups: string[]) => void;
}

export interface SelectOptions {
  label: string;
  value: string;
}

const useBusinessEngagement = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const skip = (currentPage - 1) * pageSize;
  const orderBy = { totalIncidents: SortOrder.Desc };

  const { groups: groupsData, groupsLoading } = useGroupsContext();

  useEffect(() => {
    if (groupsData) {
      const groupsFormatted = groupsData;
      setGroups(groupsFormatted);
    }
  }, [groupsData]);

  const { data, loading } = useBusinessEngagementQuery({
    fetchPolicy: 'cache-first',
    skip: !currentScheme,
    variables: {
      orderBy,
      skip,
      take: pageSize,
      where: {
        dateRange,
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value }) => value),
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGroups, dateRange]);

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  return {
    componentRef,
    currentPage,
    data,
    dateRange,
    groups,
    groupsLoading,
    handlePageChange,
    handlePrint,
    isPrinting,
    loading,
    pageSize,
    selectedGroups,
    setDateRange: onSetDateRange,
    setSelectedGroups,
  };
};

export default useBusinessEngagement;
