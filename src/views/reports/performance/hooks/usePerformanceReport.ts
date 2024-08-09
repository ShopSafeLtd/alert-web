import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { InvestigationsTableData } from '#/components/reports/tableColumns';
import type { DateRangeInput } from 'graphql/types';

import arrangeTemplates from '#/utils/reports/setTemplates';
import { usePerformanceReportQuery } from 'graphql/reports/queries/__generated__/performance-report.generated';
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
          59
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
    selectedRoles,
    dateRangeMode,
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

  const { data, loading } = usePerformanceReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || !groups || groupsLoading || !selectedGroups,
    variables: {
      where: {
        brandsIds: selectedBrands.length > 0 ? selectedBrands : undefined,
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
    data?.userContributions?.userContributions?.map((user, index) => ({
      fullName: shouldRedact ? redactedText : user.name,
      incidentsCreated: user.totalIncidents,
      key: user.name + index.toString(),
      logins: user.totalLogins,
      messagesSent: user.totalMessages,
      offendersCreated: user.totalOffenders,
      updatesCreated: user.totalUpdates,
    })) || [];

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
            59
          )
        ),
      },
      modeValue ?? 'last30Days'
    );

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
    filterCount,
    filtersOpen,
    groups,
    groupsLoading,
    handlePrint,
    incidentTypeIds,
    investigationsData,
    isPrinting,
    layout,
    loading,
    logos,
    metadata,
    minDrawer,
    offendersTableData,
    redactOnPrint,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    saving,
    schemeId: currentScheme,
    selectTemplate,
    selectedBrands,
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
    setSelectedGroups,
    setSelectedIndustries,
    setSelectedRoles,
    targetedBusinessData,
    targetedGoodsData,
    templates,
    toggleFiltersOpen,
    userContributionTableData,
  };
};

export default usePerformanceReport;
