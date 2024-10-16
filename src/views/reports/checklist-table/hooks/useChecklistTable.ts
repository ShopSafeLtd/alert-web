import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';

import { selectedModeToDate } from '#/components/reports/DateSelect/DateSelect.view';
import { useChecklistTableReportQuery } from '#/views/reports/checklist-table/__generated__/checklist-table-report-query.generated';
import { useTableReportQuery } from 'graphql/reports/queries/__generated__/table-report.generated';
import { ReportType } from 'graphql/types';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReportPrint from 'utils/reportPrint/usePrintReports';

import type { IReportTemplate, MetaData } from '../../types';
import type { Props as Return, ScoreInput } from './types';

import useReportState from '../../../../utils/reports/useReportState';
import { redactedText } from '../../types';

const useChecklistTable = (): Return => {
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
  const initScore = {
    gteValue: 0,
    lteValue: 100,
  };
  const [businessesIds, setBusinessesIds] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [score, setScore] = useState<ScoreInput>(initScore);
  const [percentComplete, setPercentComplete] = useState<ScoreInput>(initScore);
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
            percentComplete,
            score,
            selectedBrands,
            selectedIndustries,
          },
          key: 'globalFilter',
          type: 'globalFilter',
        },
      ]);
    }
  }, [
    selectedIndustries,
    selectedBrands,
    businessesIds,
    dateRangeMode,
    score,
    percentComplete,
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

          if (globalFilter.data?.businessesIds) {
            setBusinessesIds(globalFilter.data.businessesIds as string[]);
          } else {
            setBusinessesIds([]);
          }
          if (globalFilter.data?.percentComplete) {
            setPercentComplete(globalFilter.data.percentComplete as ScoreInput);
          } else {
            setPercentComplete(initScore);
          }
          if (globalFilter.data?.score) {
            setScore(globalFilter.data.score as ScoreInput);
          } else {
            setScore(initScore);
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

  const { data, loading } = useChecklistTableReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || tableReportLoading,
    variables: {
      where: {
        brandsIds: selectedBrands,
        businessesIds,
        dateRange,
        industryIds: selectedIndustries,
        percentComplete,
        schemeIds: [currentScheme],
        score,
        search,
      },
    },
  });

  const shouldRedact = isPrinting && redactOnPrint;
  const checklistsTableData =
    data?.checklistTableReport?.checklistPerformance?.map((checklist, i) => ({
      completedAt: checklist.completedAt
        ? new Date(checklist.completedAt).toLocaleDateString()
        : 'N/A',
      id: checklist.id,
      key: checklist.name + i.toString(),
      name: shouldRedact ? redactedText : checklist.name,
      percentAnswer: checklist.percentAnswer,
      percentComplete: checklist.percentComplete,
      percentScore: checklist.percentScore,
      totalAnswers: checklist.totalAnswers,
      totalQuestions: checklist.totalQuestions,
      totalSections: checklist.totalSections,
    })) || [];
  const logoMetaData = useMemo(
    () => metadata?.find((item) => item.key === 'logo'),
    [metadata]
  );

  return {
    addLogo,
    addLogoDrawer,
    businessesIds,
    changeSize,
    checklistsTableData,
    componentRef,
    data,
    dateRange,
    dateRangeMode,
    editMode,
    filterCount,
    filtersOpen,
    handlePrint,
    isPrinting,
    layout,
    loading,
    logoMetaData,
    logos,
    metadata,
    minDrawer,
    percentComplete,
    redactOnPrint,
    removeItem,
    removeLogo,
    reportData,
    saveAsDrawer,
    saveTemplate,
    saving,
    schemeId: currentScheme,
    score,
    search,
    selectTemplate,
    selectedBrands,
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
    setPercentComplete,
    setRedactOnPrint,
    setSaveAsDrawer,
    setScore,
    setSearch,
    setSelectedBrands,
    setSelectedIndustries,
    setSelectedRoles,
    tableReportLoading,
    templates,
    toggleFiltersOpen,
  };
};

export default useChecklistTable;
