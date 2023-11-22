import {
  ReportType,
  usePerformanceReportQuery,
  useSchemeReportDetailsQuery,
} from 'graphql/generated';
import type RGL from 'react-grid-layout';
import useReportPrint from 'utils/reportPrint/usePrintReports';
import PerformanceLayout, { PerformanceMetaData } from './initLayout';
import type { IReportTemplate } from '../../types';
import type { Props as Return } from './types';
import useReportState from '../../../../utils/reports/useReportState';

const usePerformanceReport = (): Return => {
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    currentScheme,
    editMode,
    setEditMode,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    defaultTemplate,
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
  } = useReportState({
    InitLayout: PerformanceLayout,
    InitMetaData: PerformanceMetaData,
    ReportType: ReportType.Performance,
  });

  const { data: reportData, loading: groupsLoading } =
    useSchemeReportDetailsQuery({
      variables: {
        where: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
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
        setSelectedGroups(groupsFormatted.map((item) => item.value));
        setLogos([
          ...logos,
          ...(groupsData.scheme?.reportIcons?.map(
            (icon) => icon.optimisedPersisted ?? ''
          ) || []),
        ]);
        const importedTemplates: IReportTemplate[] =
          (groupsData.scheme?.reportTemplates.map((template) => ({
            id: template.id || '',
            name: template.name || '',
            metaData: template.metaData || [],
            layout:
              (template.layout.map((item) => ({
                ...item,
                maxH: item.maxH ?? undefined,
                maxW: item.maxW ?? undefined,
                minH: item.minH ?? undefined,
                minW: item.minW ?? undefined,
              })) as RGL.Layout[]) || [],
          })) as IReportTemplate[]) || [];

        setTemplates([defaultTemplate, ...importedTemplates]);
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
      key: offender.name + i.toString(),
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
        successRate: ((business.totalSuccessRate || 0) * 100).toFixed(2),
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
        successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
        avgLost: good?.averageLossValue?.toFixed(2),
      })) || [];

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
  };
};

export default usePerformanceReport;
