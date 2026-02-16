import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { InvestigationsTableData } from '#/components/reports/tableColumns';
import type { DateRangeInput } from 'graphql/types';

import arrangeTemplates from '#/utils/reports/setTemplates';
import { useUserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import { usePerformanceBusinessContributionQuery } from 'graphql/reports/queries/__generated__/performance-business-contribution.generated';
import { usePerformanceCoreSummariesQuery } from 'graphql/reports/queries/__generated__/performance-core-summaries.generated';
import { usePerformanceCrimeGroupsInvestigationsQuery } from 'graphql/reports/queries/__generated__/performance-crime-groups-investigations.generated';
import { usePerformanceHeatMapQuery } from 'graphql/reports/queries/__generated__/performance-heat-map.generated';
import { usePerformanceOffendersQuery } from 'graphql/reports/queries/__generated__/performance-offenders.generated';
import { usePerformanceTargetedGoodsQuery } from 'graphql/reports/queries/__generated__/performance-targeted-goods.generated';
import { useSchemeReportDetailsQuery } from 'graphql/reports/queries/__generated__/scheme-details.generated';
import { ReportType, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReportPrint from 'utils/reportPrint/usePrintReports';

import type { Props as Return } from './types';

import useReportState from '../../../../utils/reports/useReportState';
import { type MetaData, redactedText } from '../../types';

const usePerformanceReport = (): Return => {
  const { reportId } = useParams();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    addLogo,
    addLogoDrawer,
    changeSize,
    currentScheme,
    dateRange = {
      endDate: new Date(new Date().setHours(23, 59, 59)),
      startDate: new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
          0,
          0,
          0
        )
      ),
    },
    dateRangeMode,
    editMode,
    filterCount,
    filtersOpen,
    filtersSet,
    groups,
    layout,
    logos,
    metadata,
    minDrawer,
    redactOnPrint,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate: saveTemplateState,
    saving,
    selectTemplate,
    selectedBrands,
    selectedBusiness,
    selectedGroups,
    selectedIndustries,
    selectedRoles,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setEditMode,
    setFiltersSet,
    setGroups,
    setLayout,
    setLogos,
    setMetadata,
    setMinDrawer,
    setRedactOnPrint,
    setSaveAsDrawer,
    setSelectedBrands,
    setSelectedBusiness,
    setSelectedGroups,
    setSelectedIndustries,
    setSelectedRoles,
    setTemplates,
    templates,
    toggleFiltersOpen,
    userId,
  } = useReportState({
    InitLayout: [],
    InitMetaData: [],
    ReportType: ReportType.Performance,
  });
  const [incidentTypeIds, setIncidentTypeIds] = useState<string[]>([]);

  // User Contributions pagination and sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [sortField, setSortField] = useState<string>('totalIncidents');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Calculate skip offset for pagination
  const skip = (currentPage - 1) * pageSize;

  // Build orderBy object for sorting
  const orderBy = {
    [sortField]: sortDirection === 'asc' ? SortOrder.Asc : SortOrder.Desc,
  };

  // Business Contribution Table pagination/sorting state
  const [businessContributionCurrentPage, setBusinessContributionCurrentPage] =
    useState(1);
  const [businessContributionPageSize, setBusinessContributionPageSize] =
    useState(30);
  const [businessContributionSortField, setBusinessContributionSortField] =
    useState<string>('totalIncidents');
  const [
    businessContributionSortDirection,
    setBusinessContributionSortDirection,
  ] = useState<'asc' | 'desc'>('desc');

  // Targeted Business Table pagination/sorting state
  const [targetedBusinessCurrentPage, setTargetedBusinessCurrentPage] =
    useState(1);
  const [targetedBusinessPageSize, setTargetedBusinessPageSize] = useState(30);
  const [targetedBusinessSortField, setTargetedBusinessSortField] =
    useState<string>('totalIncidents');
  const [targetedBusinessSortDirection, setTargetedBusinessSortDirection] =
    useState<'asc' | 'desc'>('desc');

  // Calculate skip offset for business contributions
  const businessContributionSkip =
    (businessContributionCurrentPage - 1) * businessContributionPageSize;

  // Build orderBy object for business contributions
  const businessContributionOrderBy = {
    [businessContributionSortField]:
      businessContributionSortDirection === 'asc'
        ? SortOrder.Asc
        : SortOrder.Desc,
  };

  // Note: targetedBusinessSkip and targetedBusinessOrderBy are not needed because
  // the Targeted Business table uses client-side filtering from the same businessContribution query

  useEffect(() => {
    if (templates.length > 0 && reportId) selectTemplate(reportId);
  }, [templates, reportId]);

  useEffect(() => {
    const globalFilter = metadata.find((item) => item.key === 'globalFilter');
    if (!globalFilter || filtersSet) {
      setMetadata([
        ...metadata.filter((item) => item.key !== 'globalFilter'),
        {
          data: {
            dateRangeMode,
            incidentTypeIds,
            selectedBrands,
            selectedBusiness,
            selectedGroups,
            selectedIndustries,
            selectedRoles,
          },
          key: 'globalFilter',
          type: 'globalFilter',
        },
      ]);
    }
  }, [
    selectedGroups,
    selectedIndustries,
    selectedBrands,
    selectedBusiness,
    selectedRoles,
    dateRangeMode,
    incidentTypeIds,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedGroups,
    selectedIndustries,
    selectedBrands,
    selectedBusiness,
    selectedRoles,
    dateRange,
    incidentTypeIds,
  ]);

  // Reset Business Contribution and Targeted Business pagination when filters change
  useEffect(() => {
    setBusinessContributionCurrentPage(1);
    setTargetedBusinessCurrentPage(1);
  }, [
    selectedGroups,
    selectedIndustries,
    selectedBrands,
    selectedBusiness,
    selectedRoles,
    dateRange,
    incidentTypeIds,
  ]);

  const { data: reportData, loading: groupsLoading } =
    useSchemeReportDetailsQuery({
      onCompleted: (groupsData) => {
        const groupsFormatted = groupsData.groups.map((group) => ({
          label: group.name,
          value: group.id,
        }));
        setGroups(groupsFormatted);
        setLogos([
          ...logos,
          ...(groupsData.scheme?.reportIcons?.map(
            (icon) => icon.optimisedPersisted ?? ''
          ) || []),
        ]);

        arrangeTemplates(
          groupsData?.scheme?.reportTemplates || [],
          setTemplates
        );

        const globalFilter =
          groupsData.scheme.reportTemplates[0]?.metaData.find(
            (item) => item.key === 'globalFilter'
          ) as MetaData;
        if (globalFilter) {
          setFiltersSet(true);
          if (globalFilter.data?.selectedGroups) {
            setSelectedGroups(globalFilter.data.selectedGroups as string[]);
          } else {
            setSelectedGroups([]);
          }
          if (globalFilter.data?.selectedIndustries) {
            setSelectedIndustries(
              globalFilter.data.selectedIndustries as string[]
            );
          } else {
            setSelectedIndustries([]);
          }
          if (globalFilter.data?.selectedBrands) {
            setSelectedBrands(globalFilter.data.selectedBrands as string[]);
          } else {
            setSelectedBrands([]);
          }
          if (globalFilter.data?.selectedIndustries) {
            setSelectedIndustries(
              globalFilter.data.selectedIndustries as string[]
            );
          } else {
            setSelectedIndustries([]);
          }
          if (globalFilter.data?.incidentTypeIds) {
            setIncidentTypeIds(globalFilter.data.incidentTypeIds as string[]);
          } else {
            setIncidentTypeIds([]);
          }
        }
      },
      variables: {
        orderBy: {
          name: SortOrder.Asc,
        },
        reportTemplatesWhere: {
          id: {
            equals: reportId,
          },
        },
        schemeWhere: {
          id: currentScheme,
        },
        where: {
          scheme: {
            id: {
              equals: currentScheme,
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

  const saveTemplate = (name: string, method: 'create' | 'update') => {
    const idsToDelete =
      method === 'create'
        ? undefined
        : reportData?.scheme?.reportTemplates
            .find((item) => item.id === selectedTemplate)
            ?.layout.map((item) => item.id);
    saveTemplateState(name, method, idsToDelete);
  };

  // Common query configuration
  const queryConfig = {
    fetchPolicy: 'cache-and-network' as const,
    skip: !currentScheme || !groups || groupsLoading || !selectedGroups,
    variables: {
      where: {
        brandsIds: selectedBrands.length > 0 ? selectedBrands : undefined,
        businessesIds:
          selectedBusiness.length > 0 ? selectedBusiness : undefined,
        dateRange: {
          endDate: dateRange.endDate,
          startDate: dateRange.startDate,
        },
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value }) => value),
        incidentTypeIds:
          incidentTypeIds.length > 0 ? incidentTypeIds : undefined,
        industryIds:
          selectedIndustries.length > 0 ? selectedIndustries : undefined,
        rolesIds: selectedRoles.length > 0 ? selectedRoles : undefined,
        schemeIds: [currentScheme],
      },
    },
  };

  // Query 1: Core summaries (highest priority)
  const {
    data: coreSummariesData,
    error: coreSummariesError,
    loading: coreSummariesLoading,
  } = usePerformanceCoreSummariesQuery(queryConfig);

  // Query 2: Offenders table
  const {
    data: offendersData,
    error: offendersError,
    loading: offendersLoading,
  } = usePerformanceOffendersQuery(queryConfig);

  // Query 3: Crime groups and investigations
  const {
    data: crimeGroupsInvestigationsData,
    error: crimeGroupsInvestigationsError,
    loading: crimeGroupsInvestigationsLoading,
  } = usePerformanceCrimeGroupsInvestigationsQuery(queryConfig);

  // Query 4: Targeted goods
  const {
    data: targetedGoodsQueryData,
    error: targetedGoodsError,
    loading: targetedGoodsLoading,
  } = usePerformanceTargetedGoodsQuery(queryConfig);

  // Query 5: Heat map
  const {
    data: heatMapData,
    error: heatMapError,
    loading: heatMapLoading,
  } = usePerformanceHeatMapQuery(queryConfig);

  // Query 6: Business contribution (with pagination)
  const {
    data: businessContributionData,
    error: businessContributionError,
    loading: businessContributionLoading,
  } = usePerformanceBusinessContributionQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || !groups || groupsLoading || !selectedGroups,
    variables: {
      businessContributionOrderBy,
      businessContributionSkip,
      businessContributionTake: businessContributionPageSize,
      where: {
        brandsIds: selectedBrands.length > 0 ? selectedBrands : undefined,
        businessesIds:
          selectedBusiness.length > 0 ? selectedBusiness : undefined,
        dateRange: {
          endDate: dateRange.endDate,
          startDate: dateRange.startDate,
        },
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value }) => value),
        incidentTypeIds:
          incidentTypeIds.length > 0 ? incidentTypeIds : undefined,
        industryIds:
          selectedIndustries.length > 0 ? selectedIndustries : undefined,
        rolesIds: selectedRoles.length > 0 ? selectedRoles : undefined,
        schemeIds: [currentScheme],
      },
    },
  });

  // Combine loading states
  const loading =
    coreSummariesLoading ||
    offendersLoading ||
    crimeGroupsInvestigationsLoading ||
    targetedGoodsLoading ||
    heatMapLoading ||
    businessContributionLoading;

  // Combine data for backward compatibility
  const data = coreSummariesData
    ? {
        businessContribution:
          businessContributionData?.businessContribution ?? {
            businessContributions: [],
            total: 0,
          },
        crimeGroupPerformance:
          crimeGroupsInvestigationsData?.crimeGroupPerformance ?? {
            crimeGroupPerformance: [],
            total: 0,
          },
        incidentHeatPerformance: heatMapData?.incidentHeatPerformance ?? {
          incidents: [],
          total: 0,
        },
        investigationPerformance:
          crimeGroupsInvestigationsData?.investigationPerformance ?? {
            investigationPerformance: [],
            total: 0,
          },
        offendersPerformance: offendersData?.offendersPerformance ?? {
          offenderPerformance: [],
          total: 0,
        },
        performanceReport: coreSummariesData.performanceReport,
        targetedGoods: targetedGoodsQueryData?.targetedGoods ?? {
          targetedGoods: [],
          total: 0,
        },
      }
    : undefined;

  const { data: userEngagementData, loading: userEngagementLoading } =
    useUserEngagementQuery({
      fetchPolicy: 'cache-and-network',
      skip: !currentScheme || !groups || groupsLoading,
      variables: {
        orderBy,
        skip,
        take: pageSize,
        where: {
          brandsIds: selectedBrands.length > 0 ? selectedBrands : undefined,
          businessesIds:
            selectedBusiness.length > 0 ? selectedBusiness : undefined,
          dateRange: {
            endDate: dateRange.endDate,
            startDate: dateRange.startDate,
          },
          groupIds:
            selectedGroups.length > 0
              ? selectedGroups
              : groups.map(({ value }) => value),
          incidentTypeIds:
            incidentTypeIds.length > 0 ? incidentTypeIds : undefined,
          industryIds:
            selectedIndustries.length > 0 ? selectedIndustries : undefined,
          rolesIds: selectedRoles.length > 0 ? selectedRoles : undefined,
          schemeIds: [currentScheme],
        },
      },
    });

  const shouldRedact = isPrinting && redactOnPrint;
  const businessContributionTableData =
    data?.businessContribution?.businessContributions?.map((business, i) => ({
      fullName: business.name,
      incidentsCreated: business.totalIncidents,
      key: business.name + i.toString(),
      logins: business.totalLogins,
      messagesSent: business.totalMessages,
      offendersCreated: business.totalOffenders,
      updatesCreated: business.totalUpdates,
      users: business.totalUsers,
    })) || [];

  const userContributionTableData =
    userEngagementData?.userContributions?.userContributions?.map(
      (user, index) => ({
        fullName: shouldRedact ? redactedText : user.name,
        incidentsCreated: user.totalIncidents,
        key: user.name + index.toString(),
        logins: user.totalLogins,
        messagesSent: user.totalMessages,
        offendersCreated: user.totalOffenders,
        updatesCreated: user.totalUpdates,
      })
    ) || [];

  const offendersTableData =
    data?.offendersPerformance?.offenderPerformance?.map((offender, i) => ({
      alertId: offender.alertId,
      fullName: shouldRedact ? redactedText : offender.name,
      id: offender.id,
      image: offender.primaryPhoto,
      key: offender.name + i.toString(),
      lastIncident: offender.lastIncidentDate
        ? new Date(offender.lastIncidentDate).toLocaleDateString()
        : 'N/A',
      lostValue: offender.totalLostValue.toFixed(2),
      recoveredValue: offender.totalRecoveredValue.toFixed(2),
      successRate: ((offender.totalSuccessRate || 0) * 100).toFixed(2),
      totalBulletins: offender.totalBulletins,
      totalIncidents: offender.totalIncidents,
    })) || [];

  const crimeGroupPerformanceTableData =
    data?.crimeGroupPerformance?.crimeGroupPerformance?.map(
      (crimeGroup, i) => ({
        alertId: crimeGroup.alertId,
        fullName: crimeGroup.alias,
        key: `${crimeGroup.alias}${i}`,
        lastIncident: crimeGroup.lastIncident
          ? new Date(crimeGroup.lastIncident).toLocaleDateString()
          : '',
        lostValue: crimeGroup.totalLostValue.toFixed(2),
        recoveredValue: crimeGroup.totalRecoveredValue.toFixed(2),
        successRate: ((crimeGroup.totalSuccessRate || 0) * 100).toFixed(2),
        totalIncidents: crimeGroup.totalIncidents,
        totalOffenders: crimeGroup.totalOffenders,
      })
    ) || [];

  const targetedBusinessData =
    data?.businessContribution?.businessContributions
      ?.filter((business) => business.totalIncidents > 0)

      .map((business, i) => ({
        avgLost: business?.averageLossValue?.toFixed(2) || '',
        commonLost: business.mostCommonGoodLost || 'unknown',
        fullName: business.name,
        highestValueLost: business.highestTotalValueGoodLost || 0,
        incidentsCreated: business.totalIncidents,
        key: `${business.name}${i}`,
        lostValue: business.totalLostValue.toFixed(2),
        offendersCreated: business.totalOffenders,
        recoveredValue: business.totalRecoveredValue.toFixed(2),
        successRate: ((business.totalSuccessRate || 0) * 100 > 100
          ? 100
          : (business.totalSuccessRate || 0) * 100
        ).toFixed(2),
      })) || [];

  const targetedGoodsData =
    data?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)

      .map((good, i) => ({
        avgLost: good?.averageLossValue?.toFixed(2),
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        key: `${good.name}${i}`,
        lostValue: good.totalLostValue.toFixed(2),
        offendersCreated: good.totalOffenders,
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100 > 100
          ? 100
          : (good.totalSuccessRate || 0) * 100
        ).toFixed(2),
      })) || [];

  const investigationsData: InvestigationsTableData[] =
    data?.investigationPerformance?.investigationPerformance.map(
      (investigation) => ({
        alertId: investigation.alertId,
        closedAt: investigation.closedAt,
        createdAt: investigation.createdAt,
        key: investigation.id,
        name: investigation.name,
        status: investigation.status,
        totalIncidents: investigation.totalIncidents,
        totalOffenders: investigation.totalOffenders,
        totalValue: investigation.totalValue,
      })
    ) || [];
  const onSetDateRange = (
    rangeValue: DateRangeInput | undefined,
    modeValue: DateSelectModeType | undefined
  ) =>
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
      },
      modeValue ?? 'last30Days'
    );

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  };

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

  const getSortIndicator = (columnField: string) => {
    if (sortField === columnField) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  // Business Contribution Table handlers
  const handleBusinessContributionPageChange = (
    page: number,
    newPageSize?: number
  ) => {
    setBusinessContributionCurrentPage(page);
    if (newPageSize && newPageSize !== businessContributionPageSize) {
      setBusinessContributionPageSize(newPageSize);
      setBusinessContributionCurrentPage(1);
    }
  };

  const handleBusinessContributionSort = (field: string) => {
    if (businessContributionSortField === field) {
      setBusinessContributionSortDirection(
        businessContributionSortDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setBusinessContributionSortField(field);
      setBusinessContributionSortDirection('desc');
    }
    setBusinessContributionCurrentPage(1);
  };

  const getBusinessContributionSortIndicator = (columnField: string) => {
    if (businessContributionSortField === columnField) {
      return businessContributionSortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  // Targeted Business Table handlers
  const handleTargetedBusinessPageChange = (
    page: number,
    newPageSize?: number
  ) => {
    setTargetedBusinessCurrentPage(page);
    if (newPageSize && newPageSize !== targetedBusinessPageSize) {
      setTargetedBusinessPageSize(newPageSize);
      setTargetedBusinessCurrentPage(1);
    }
  };

  const handleTargetedBusinessSort = (field: string) => {
    if (targetedBusinessSortField === field) {
      setTargetedBusinessSortDirection(
        targetedBusinessSortDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setTargetedBusinessSortField(field);
      setTargetedBusinessSortDirection('desc');
    }
    setTargetedBusinessCurrentPage(1);
  };

  const getTargetedBusinessSortIndicator = (columnField: string) => {
    if (targetedBusinessSortField === columnField) {
      return targetedBusinessSortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return {
    addLogo,
    addLogoDrawer,
    businessContributionCurrentPage,
    businessContributionPageSize,
    businessContributionSortDirection,
    businessContributionSortField,
    businessContributionTableData,
    // Business Contribution Table pagination/sorting
    businessContributionTotal: data?.businessContribution?.total || 0,
    changeSize,
    componentRef,
    crimeGroupPerformanceTableData,
    currentPage,
    data,
    dateRange,
    editMode,
    errors: {
      businessContribution: businessContributionError,
      coreSummaries: coreSummariesError,
      crimeGroupsInvestigations: crimeGroupsInvestigationsError,
      heatMap: heatMapError,
      offenders: offendersError,
      targetedGoods: targetedGoodsError,
    },
    filterCount,
    filtersOpen,
    getBusinessContributionSortIndicator,
    getSortIndicator,
    getTargetedBusinessSortIndicator,
    groups,
    groupsLoading,
    handleBusinessContributionPageChange,
    handleBusinessContributionSort,
    handlePageChange,
    handlePrint,
    handleSort,
    handleTargetedBusinessPageChange,
    handleTargetedBusinessSort,
    incidentTypeIds,
    investigationsData,
    isPrinting,
    layout,
    loading,
    loadingStates: {
      businessContribution: businessContributionLoading,
      coreSummaries: coreSummariesLoading,
      crimeGroupsInvestigations: crimeGroupsInvestigationsLoading,
      heatMap: heatMapLoading,
      offenders: offendersLoading,
      targetedGoods: targetedGoodsLoading,
    },
    logos,
    metadata,
    minDrawer,
    offendersTableData,
    pageSize,
    redactOnPrint,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    saving,
    schemeId: currentScheme,
    selectTemplate,
    selectedBrands,
    selectedBusiness,
    selectedGroups,
    selectedIndustries,
    selectedRoles,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange: onSetDateRange,
    setEditMode,
    setIncidentTypeIds,
    setLayout,
    setMetadata,
    setMinDrawer,
    setRedactOnPrint,
    setSaveAsDrawer,
    setSelectedBrands,

    setSelectedBusiness,
    setSelectedGroups,
    setSelectedIndustries,
    setSelectedRoles,
    sortDirection,
    sortField,
    targetedBusinessCurrentPage,
    targetedBusinessData,

    targetedBusinessPageSize,
    targetedBusinessSortDirection,
    targetedBusinessSortField,
    // Targeted Business Table pagination/sorting
    targetedBusinessTotal: data?.businessContribution?.total || 0,
    targetedGoodsData,
    templates,
    toggleFiltersOpen,
    userContributionTableData,
    userContributionsTotal: userEngagementData?.userContributions?.total || 0,
    userEngagementLoading,
  };
};

export default usePerformanceReport;
