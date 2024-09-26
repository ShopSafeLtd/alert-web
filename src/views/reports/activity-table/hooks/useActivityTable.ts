import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';

import { selectedModeToDate } from '#/components/reports/DateSelect/DateSelect.view';
import { useActivityTableReportQuery } from '#/views/reports/activity-table/__generated__/activity-table-report-query.generated';
import { useTableReportQuery } from 'graphql/reports/queries/__generated__/table-report.generated';
import { ReportType } from 'graphql/types';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReportPrint from 'utils/reportPrint/usePrintReports';

import type { IReportTemplate, MetaData } from '../../types';
import type { ActivityStatusTypes, Props as Return } from './types';

import useReportState from '../../../../utils/reports/useReportState';
import { redactedText } from '../../types';

const useActivityTable = (): Return => {
  const { reportId } = useParams();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    addLogo,
    addLogoDrawer,
    changeSize,
    currentScheme,
    dateRange,
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
  } = useReportState({
    InitLayout: [],
    InitMetaData: [],
    ReportType: ReportType.Performance,
  });
  const [userIds, setUserIds] = useState<string[]>([]);
  const [businessesIds, setBusinessesIds] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ActivityStatusTypes>();

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
            businessesIds,
            dateRangeMode,
            selectedBrands,
            selectedGroups,
            selectedIndustries,
            status,
            userIds,
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
    userIds,
    businessesIds,
    dateRangeMode,
    status,
  ]);

  const { data: reportData, loading: tableReportLoading } = useTableReportQuery(
    {
      onCompleted: (data) => {
        setLogos([
          ...logos,
          ...(data.scheme?.reportIcons?.map(
            (icon) => icon.optimisedPersisted ?? ''
          ) || []),
        ]);
        setTemplates([data.tableReport] as unknown as IReportTemplate[]);
        const globalFilter = data.tableReport.metaData.find(
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
          if (globalFilter.data?.userIds) {
            setUserIds(globalFilter.data.userIds as string[]);
          } else {
            setUserIds([]);
          }
          if (globalFilter.data?.businessesIds) {
            setBusinessesIds(globalFilter.data.businessesIds as string[]);
          } else {
            setBusinessesIds([]);
          }
          if (globalFilter.data?.status) {
            setStatus(globalFilter.data.status as ActivityStatusTypes);
          } else {
            setStatus('ShowAll');
          }
          if (globalFilter.data?.dateRangeMode) {
            setDateRange(
              selectedModeToDate(
                globalFilter.data.dateRangeMode as DateSelectModeType
              ),
              globalFilter.data.dateRangeMode as DateSelectModeType
            );
          } else {
            setDateRange(undefined, 'none');
          }
        }
      },
      variables: {
        schemeWhere: {
          id: currentScheme,
        },
        where: {
          id: reportId as string,
        },
      },
    }
  );

  const saveTemplate = (name: string, method: 'create' | 'update') => {
    const idsToDelete =
      method === 'create'
        ? undefined
        : reportData?.tableReport?.layout.map((item) => item.id);
    saveTemplateState(name, method, idsToDelete);
  };
  const getStatus = () => {
    if (status === 'Completed') return true;
    if (status === 'Open') return false;
    if (status === 'ShowAll') return undefined;
    return undefined;
  };
  const { data, loading } = useActivityTableReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || !groups || tableReportLoading || !selectedGroups,
    variables: {
      where: {
        brandsIds: selectedBrands,
        businessesIds,
        completed: getStatus(),
        createdAt: dateRange,
        groupIds: selectedGroups,
        industryIds: selectedIndustries,
        schemeIds: [currentScheme],
        search,
        userIds,
      },
    },
  });

  const shouldRedact = isPrinting && redactOnPrint;
  const activitiesTableData =
    data?.activityTableReport?.activityPerformance?.map((activity, i) => ({
      completed: activity.completed,
      dueDate: activity.dueDate
        ? new Date(activity.dueDate).toLocaleDateString()
        : 'N/A',
      id: activity.id,
      key: activity.name + i.toString(),
      name: shouldRedact ? redactedText : activity.name,
      totalAnswers: activity.totalAnswers,
      totalAssignedUsers: activity.totalAssignedUsers,
      totalQuestions: activity.totalQuestions,
    })) || [];
  const logoMetaData = useMemo(
    () => metadata?.find((item) => item.key === 'logo'),
    [metadata]
  );

  return {
    activitiesTableData,
    addLogo,
    addLogoDrawer,
    businessesIds,
    changeSize,
    componentRef,
    data,
    dateRange,
    dateRangeMode,
    editMode,
    filterCount,
    filtersOpen,
    groups,
    handlePrint,
    isPrinting,
    layout,
    loading,
    logoMetaData,
    logos,
    metadata,
    minDrawer,
    redactOnPrint,
    removeItem,
    removeLogo,
    reportData,
    saveAsDrawer,
    saveTemplate,
    saving,
    schemeId: currentScheme,
    search,
    selectTemplate,
    selectedBrands,
    selectedGroups,
    selectedIndustries,
    selectedRoles,
    selectedTemplate,
    setAddLogoDrawer,
    setBusinessesIds,
    setDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setRedactOnPrint,
    setSaveAsDrawer,
    setSearch,
    setSelectedBrands,
    setSelectedGroups,
    setSelectedIndustries,
    setSelectedRoles,
    setStatus,
    setUserIds,
    status,
    tableReportLoading,
    templates,
    toggleFiltersOpen,
    userIds,
  };
};

export default useActivityTable;
