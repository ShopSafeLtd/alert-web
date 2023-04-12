import type { OffenderReportQuery } from 'graphql/generated';
import {
  useOffenderReportQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

interface Return {
  loading: boolean;
  data: OffenderReportQuery | undefined;
  groups: SelectOptions[];

  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  groupsLoading: boolean;
  selectedGroups: string[];
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: SelectOptions[];
  selectedOffender: string;
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
}

export interface SelectOptions {
  label: string;
  value: string;
}

const useOffenderReport = (): Return => {
  const { id: selectedOffender } = useParams();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const businesses = useStoreState((state) => state.user.businesses);
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>(
    businesses ? businesses.map((business) => business.id) : []
  );
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
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
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (groupsData) {
      const groupsFormatted = groupsData.groups.map((group) => ({
        label: group.name,
        value: group.id,
      }));
      setGroups(groupsFormatted);
      setSelectedGroups(groupsFormatted.map((item) => item.value));
    }
  }, [groupsData]);

  const { data, loading } = useOffenderReportQuery({
    fetchPolicy: 'cache-and-network',
    skip:
      !currentScheme ||
      !groups ||
      !selectedOffender ||
      groupsLoading ||
      !selectedGroups ||
      selectedGroups.filter(Boolean).length === 0,
    variables: {
      where: {
        offenderId: selectedOffender || '',
        businessIds: selectedBusiness,
        dateRange,
        schemeIds: [currentScheme],
        groupIds: selectedGroups,
      },
      targetedWhere: {
        offenderId: selectedOffender || '',
        dateRange,
        schemeIds: [currentScheme],
        groupIds: selectedGroups,
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

  return {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    businesses: businesses
      ? businesses.map((business) => ({
          label: business.name,
          value: business.id,
        }))
      : [],
    selectedBusiness,
    setSelectedBusiness,
    selectedOffender: selectedOffender || '',
    componentRef,
    handlePrint,
  };
};

export default useOffenderReport;
