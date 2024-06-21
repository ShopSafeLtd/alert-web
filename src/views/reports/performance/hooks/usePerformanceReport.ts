import useReportPrint from 'utils/reportPrint/usePrintReports';
import type { InvestigationsTableData } from '#/components/reports/tableColumns';
import arrangeTemplates from '#/utils/reports/setTemplates';
import { redactedText } from '../../types';
import type { Props as Return } from './types';
import useReportState from '../../../../utils/reports/useReportState';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReportType, SortOrder } from 'graphql/types';
import { useSchemeReportDetailsQuery } from 'graphql/reports/queries/scheme-details.generated';
import { usePerformanceReportQuery } from 'graphql/reports/queries/performance-report.generated';

const usePerformanceReport = (): Return => {
  const { reportId } = useParams();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    currentScheme,
    editMode,
    setEditMode,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    groups,
    setGroups,
    selectedGroups,
    setSelectedGroups,
    dateRange,
    setDateRange,
    addLogoDrawer,
    setAddLogoDrawer,
    logos,
    setLogos,
    metadata,
    setMetadata,
    templates,
    setTemplates,
    selectedTemplate,
    saveAsDrawer,
    setSaveAsDrawer,
    removeLogo,
    removeItem,
    changeSize,
    addLogo,
    selectTemplate,
    saveTemplate: saveTemplateState,
    setSelectedBrands,
    selectedBrands,
    selectedIndustries,
    setSelectedIndustries,
    setRedactOnPrint,
    redactOnPrint,
    filtersOpen,
    toggleFiltersOpen,
    selectedRoles,
    setSelectedRoles,
    filterCount,
    userId,
    saving,
  } = useReportState({
    InitLayout: [],
    InitMetaData: [],
    ReportType: ReportType.Performance,
  });

  useEffect(() => {
    if (templates.length > 0 && reportId) selectTemplate(reportId);
  }, [templates, reportId]);

  const { data: reportData, loading: groupsLoading } =
    useSchemeReportDetailsQuery({
      variables: {
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
        orderBy: {
          name: SortOrder.Asc,
        },
        schemeWhere: {
          id: currentScheme,
        },
        reportTemplatesWhere: {
          type: {
            equals: ReportType.Performance,
          },
        },
      },
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

  const { data, loading } = usePerformanceReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || !groups || groupsLoading || !selectedGroups,
    variables: {
      where: {
        dateRange,
        schemeIds: [currentScheme],
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value }) => value),
        brandsIds: selectedBrands.length > 0 ? selectedBrands : undefined,
        industryIds:
          selectedIndustries.length > 0 ? selectedIndustries : undefined,
        rolesIds: selectedRoles.length > 0 ? selectedRoles : undefined,
      },
    },
  });

  const shouldRedact = isPrinting && redactOnPrint;
  const businessContributionTableData =
    data?.businessContribution?.businessContributions?.map((business, i) => ({
      key: business.name + i.toString(),
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
      key: user.name + index.toString(),
      fullName: shouldRedact ? redactedText : user.name,
      incidentsCreated: user.totalIncidents,
      offendersCreated: user.totalOffenders,
      updatesCreated: user.totalUpdates,
      messagesSent: user.totalMessages,
      logins: user.totalLogins,
    })) || [];

  const offendersTableData =
    data?.offendersPerformance?.offenderPerformance?.map((offender, i) => ({
      totalIncidents: offender.totalIncidents,
      key: offender.name + i.toString(),
      alertId: offender.alertId,
      fullName: shouldRedact ? redactedText : offender.name,
      image: offender.primaryPhoto,
      lastIncident: offender.lastIncidentDate
        ? new Date(offender.lastIncidentDate).toLocaleDateString()
        : 'N/A',
      lostValue: offender.totalLostValue.toFixed(2),
      recoveredValue: offender.totalRecoveredValue.toFixed(2),
      successRate: ((offender.totalSuccessRate || 0) * 100).toFixed(2),
      id: offender.id,
      totalBulletins: offender.totalBulletins,
    })) || [];

  const crimeGroupPerformanceTableData =
    data?.crimeGroupPerformance?.crimeGroupPerformance?.map(
      (crimeGroup, i) => ({
        totalIncidents: crimeGroup.totalIncidents,
        key: `${crimeGroup.alias}${i}`,
        alertId: crimeGroup.alertId,
        fullName: crimeGroup.alias,
        totalOffenders: crimeGroup.totalOffenders,
        lostValue: crimeGroup.totalLostValue.toFixed(2),
        lastIncident: crimeGroup.lastIncident
          ? new Date(crimeGroup.lastIncident).toLocaleDateString()
          : '',
        recoveredValue: crimeGroup.totalRecoveredValue.toFixed(2),
        successRate: ((crimeGroup.totalSuccessRate || 0) * 100).toFixed(2),
      })
    ) || [];

  const targetedBusinessData =
    data?.businessContribution?.businessContributions
      ?.filter((business) => business.totalIncidents > 0)

      .map((business, i) => ({
        key: `${business.name}${i}`,
        fullName: business.name,
        incidentsCreated: business.totalIncidents,
        offendersCreated: business.totalOffenders,
        lostValue: business.totalLostValue.toFixed(2),
        recoveredValue: business.totalRecoveredValue.toFixed(2),
        successRate: ((business.totalSuccessRate || 0) * 100 > 100
          ? 100
          : (business.totalSuccessRate || 0) * 100
        ).toFixed(2),
        commonLost: business.mostCommonGoodLost || 'unknown',
        highestValueLost: business.highestTotalValueGoodLost || 0,
        avgLost: business?.averageLossValue?.toFixed(2) || '',
      })) || [];

  const targetedGoodsData =
    data?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)

      .map((good, i) => ({
        key: `${good.name}${i}`,
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        offendersCreated: good.totalOffenders,
        lostValue: good.totalLostValue.toFixed(2),
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100 > 100
          ? 100
          : (good.totalSuccessRate || 0) * 100
        ).toFixed(2),
        avgLost: good?.averageLossValue?.toFixed(2),
      })) || [];

  const investigationsData: InvestigationsTableData[] =
    data?.investigationPerformance?.investigationPerformance.map(
      (investigation) => ({
        key: investigation.id,
        name: investigation.name,
        alertId: investigation.alertId,
        totalIncidents: investigation.totalIncidents,
        totalOffenders: investigation.totalOffenders,
        status: investigation.status,
        totalValue: investigation.totalValue,
        createdAt: investigation.createdAt,
        closedAt: investigation.closedAt,
      })
    ) || [];

  return {
    addLogo,
    addLogoDrawer,
    businessContributionTableData,
    changeSize,
    componentRef,
    crimeGroupPerformanceTableData,
    data,
    dateRange,
    editMode,
    groups,
    groupsLoading,
    handlePrint,
    isPrinting,
    layout,
    loading,
    logos,
    metadata,
    minDrawer,
    offendersTableData,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedGroups,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedGroups,
    targetedBusinessData,
    targetedGoodsData,
    templates,
    userContributionTableData,
    setSelectedBrands,
    selectedBrands,
    investigationsData,
    selectedIndustries,
    setSelectedIndustries,
    setRedactOnPrint,
    redactOnPrint,
    filtersOpen,
    toggleFiltersOpen,
    selectedRoles,
    setSelectedRoles,
    filterCount,
    schemeId: currentScheme,
    saving,
  };
};

export default usePerformanceReport;
