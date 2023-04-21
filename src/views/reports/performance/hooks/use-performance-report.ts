import type { PerformanceReportQuery } from 'graphql/generated';
import {
  usePerformanceReportQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import type RGL from 'react-grid-layout';
import type {
  BusinessTableData,
  ContributionTableData,
  CrimeGroupPerformanceTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import { PerformanceLayout, tableLengthToHeight } from './utils';

interface Return {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
  groups: SelectOptions[];

  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  groupsLoading: boolean;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
  editMode: boolean;
  setEditMode: (arg0: boolean) => void;
  businessContributionTableData: BusinessTableData[] | [];
  userContributionTableData: ContributionTableData[] | [];
  offendersTableData: OffenderTableData[] | [];
  crimeGroupPerformanceTableData: CrimeGroupPerformanceTableData[] | [];
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
}

export interface SelectOptions {
  label: string;
  value: string;
}

const usePerformanceReport = (): Return => {
  const [editMode, setEditMode] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  const currentScheme = useStoreState((state) => state.scheme.id);
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

  const { data, loading } = usePerformanceReportQuery({
    fetchPolicy: 'cache-and-network',
    skip:
      !currentScheme ||
      !groups ||
      groupsLoading ||
      !selectedGroups ||
      selectedGroups.filter(Boolean).length === 0,
    variables: {
      where: {
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

  const businessContributionTableData =
    data?.businessContribution?.businessContributions?.map((business, i) => ({
      key: business.name + i,
      fullName: business.name,
      incidentsCreated: business.totalIncidents,
      offendersCreated: business.totalOffenders,
      updatesCreated: business.totalUpdates,
      messagesSent: business.totalMessages,
      logins: business.totalLogins,
      users: business.totalUsers,
    })) || [];

  const userContributionTableData =
    data?.userContributions?.userContributions?.map((user, index) => ({
      key: user.name + index,
      fullName: user.name,
      incidentsCreated: user.totalIncidents,
      offendersCreated: user.totalOffenders,
      updatesCreated: user.totalUpdates,
      messagesSent: user.totalMessages,
      logins: user.totalLogins,
    })) || [];

  const offendersTableData =
    data?.offendersPerformance?.offenderPerformance?.map((offender, i) => ({
      totalIncidents: offender.totalIncidents,
      key: offender.name + i,
      alertId: offender.alertId,
      fullName: offender.name,
      image: offender.primaryPhoto,
      lastIncident: offender.lastIncidentDate
        ? new Date(offender.lastIncidentDate).toLocaleDateString()
        : 'N/A',
      lostValue: offender.totalLostValue.toFixed(2),
      recoveredValue: offender.totalRecoveredValue.toFixed(2),
      successRate: ((offender.totalSuccessRate || 0) * 100).toFixed(2),
    })) || [];

  const crimeGroupPerformanceTableData =
    data?.crimeGroupPerformance?.crimeGroupPerformance?.map(
      (crimeGroup, i) => ({
        totalIncidents: crimeGroup.totalIncidents,
        key: crimeGroup.alias + i,
        alertId: crimeGroup.alertId,
        fullName: crimeGroup.alias,
        totalOffenders: crimeGroup.totalOffenders,
        lostValue: crimeGroup.totalLostValue.toFixed(2),
        // TODO: add last incident date
        lastIncident: '',
        recoveredValue: crimeGroup.totalRecoveredValue.toFixed(2),
        successRate: ((crimeGroup.totalSuccessRate || 0) * 100).toFixed(2),
      })
    ) || [];

  const targetedBusinessData =
    data?.businessContribution?.businessContributions
      ?.filter((business) => business.totalIncidents > 0)

      .map((business, i) => ({
        key: business.name + i,
        fullName: business.name,
        incidentsCreated: business.totalIncidents,
        offendersCreated: business.totalOffenders,
        lostValue: business.totalLostValue.toFixed(2),
        recoveredValue: business.totalRecoveredValue.toFixed(2),
        successRate: ((business.totalSuccessRate || 0) * 100).toFixed(2),
        commonLost: business.mostCommonGoodLost || 'unknown',
        highestValueLost: business.highestTotalValueGoodLost || 0,
        avgLost: business?.averageLossValue?.toFixed(2) || '',
      })) || [];

  const targetedGoodsData =
    data?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)

      .map((good, i) => ({
        key: good.name + i,
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        offendersCreated: good.totalOffenders,
        lostValue: good.totalLostValue.toFixed(2),
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
        avgLost: good?.averageLossValue?.toFixed(2),
      })) || [];

  const [minDrawer, setMinDrawer] = useState(false);
  const [layout, setLayout] = useState<RGL.Layout[]>(PerformanceLayout);
  const logo = localStorage.getItem('logo');
  const removeItem = (item: string) => {
    setLayout(layout.filter((i) => i.i !== item));
  };

  const changeSize = (item: string, size: number) => {
    setLayout(
      layout.map((i) => {
        if (i.i === item) {
          return { ...i, h: tableLengthToHeight(size) };
        }
        return i;
      })
    );
  };

  return {
    removeItem,
    changeSize,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    logo,
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    componentRef,
    handlePrint,
    isPrinting,
    editMode,
    setEditMode,
    businessContributionTableData,
    userContributionTableData,
    offendersTableData,
    crimeGroupPerformanceTableData,
    targetedBusinessData,
    targetedGoodsData,
  };
};

export default usePerformanceReport;
