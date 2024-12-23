import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';

import { selectedModeToDate } from '#/components/reports/DateSelect/DateSelect.view';
import { useOffenderTableReportQuery } from '#/views/reports/offender-table/__generated__/offender-table-report-query.generated';
import { useTableReportQuery } from 'graphql/reports/queries/__generated__/table-report.generated';
import { ReportType } from 'graphql/types';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReportPrint from 'utils/reportPrint/usePrintReports';

import type { IReportTemplate, MetaData } from '../../types';
import type { Props as Return } from './types';

import useReportState from '../../../../utils/reports/useReportState';
import { redactedText } from '../../types';

const useOffenderTable = (): Return => {
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
  const [crimeGroupIds, setCrimeGroupIds] = useState<string[]>([]);
  const [businessesIds, setBusinessesIds] = useState<string[]>([]);
  const [incidentCount, setIncidentCount] = useState<number | undefined>(
    undefined
  );
  const [totalValue, setTotalValue] = useState<number | undefined>(undefined);
  const [idVerified, setIdVerified] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const isDemo =
    currentScheme === 'ckdhbosuv01028oiblmjgeuii' ||
    currentScheme === 'ck6zhwkwv00019ourjkgk5bdt';
  // new date 2 years ago at 00:00:00
  const startDateDemo = new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2)).setHours(
      0,
      0,
      59
    )
  );

  const initDate = isDemo
    ? startDateDemo
    : new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
          0,
          0,
          59
        )
      );
  const [createdAtMode, setCreatedAtMode] = useState<
    DateSelectModeType | undefined
  >(undefined);

  const [createdAt, setCreatedAtState] = useState<
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined
  >({
    // today at 23:59:59
    endDate: new Date(new Date().setHours(23, 59, 59)),
    startDate: initDate,
  });
  const setCreatedAt = (
    createdAtInput:
      | {
          endDate: Date;
          startDate: Date;
        }
      | undefined,
    range: DateSelectModeType | undefined
  ): void => {
    if (createdAtInput) {
      setCreatedAtMode(range);
      setCreatedAtState({
        endDate: new Date(
          new Date(createdAtInput.endDate).setHours(23, 59, 59)
        ),
        startDate: new Date(
          new Date(createdAtInput.startDate).setHours(0, 0, 59)
        ),
      });
    } else {
      setCreatedAtMode(undefined);
      setCreatedAtState(undefined);
    }
  };
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
            createdAtMode,
            crimeGroupIds,
            dateRangeMode,
            idVerified,
            incidentCount,
            selectedBrands,
            selectedGroups,
            selectedIndustries,
            totalValue,
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
    crimeGroupIds,
    businessesIds,
    incidentCount,
    totalValue,
    dateRangeMode,
    idVerified,
    createdAtMode,
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
          if (globalFilter.data?.crimeGroupIds) {
            setCrimeGroupIds(globalFilter.data.crimeGroupIds as string[]);
          } else {
            setCrimeGroupIds([]);
          }
          if (globalFilter.data?.businessesIds) {
            setBusinessesIds(globalFilter.data.businessesIds as string[]);
          } else {
            setBusinessesIds([]);
          }
          if (globalFilter.data?.incidentCount) {
            setIncidentCount(globalFilter.data.incidentCount as number);
          } else {
            setIncidentCount(undefined);
          }
          if (globalFilter.data?.idVerified) {
            setIdVerified(globalFilter.data.idVerified as boolean);
          } else {
            setIdVerified(undefined);
          }
          if (globalFilter.data?.totalValue) {
            setTotalValue(globalFilter.data.totalValue as number);
          } else {
            setTotalValue(undefined);
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
          if (globalFilter.data?.createdAtMode) {
            setCreatedAt(
              selectedModeToDate(
                globalFilter.data.createdAtMode as DateSelectModeType
              ),
              globalFilter.data.createdAtMode as DateSelectModeType
            );
          } else {
            setCreatedAt(undefined, 'none');
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

  const { data, loading } = useOffenderTableReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme || !groups || tableReportLoading || !selectedGroups,
    variables: {
      where: {
        brandsIds: selectedBrands,
        businessesIds,
        createdAt,
        crimeGroupId: crimeGroupIds[0],
        groupIds: selectedGroups,
        idVerified,
        incidentCount,
        incidentDateRange: dateRange,
        industryIds: selectedIndustries,
        schemeIds: [currentScheme],
        search,
        totalValue,
      },
    },
  });

  const shouldRedact = isPrinting && redactOnPrint;
  const offendersTableData =
    data?.offenderTableReport?.offenderPerformance?.map((offender, i) => ({
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
  const logoMetaData = useMemo(
    () => metadata?.find((item) => item.key === 'logo'),
    [metadata]
  );

  return {
    addLogo,
    addLogoDrawer,
    businessesIds,
    changeSize,
    componentRef,
    createdAtMode,
    crimeGroupIds,
    data,
    dateRange,
    dateRangeMode,
    editMode,
    filterCount,
    filtersOpen,
    groups,
    handlePrint,
    idVerified,
    incidentCount,
    isPrinting,
    layout,
    loading,
    logoMetaData,
    logos,
    metadata,
    minDrawer,
    offendersTableData,
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
    setCreatedAt,
    setCrimeGroupIds,
    setDateRange,
    setEditMode,
    setIdVerified,
    setIncidentCount,
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
    setTotalValue,
    tableReportLoading,
    templates,
    toggleFiltersOpen,
    totalValue,
  };
};

export default useOffenderTable;
