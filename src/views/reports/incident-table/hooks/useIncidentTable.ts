import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { IncidentPriority } from 'graphql/types';

import { selectedModeToDate } from '#/components/reports/DateSelect/DateSelect.view';
import { useTableReportQuery } from '#/graphql/reports/queries/__generated__/table-report.generated';
import { ReportType } from 'graphql/types';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReportPrint from 'utils/reportPrint/usePrintReports';

import type { IReportTemplate, MetaData } from '../../types';
import type { Props as Return } from './types';

import useReportState from '../../../../utils/reports/useReportState';
import { redactedText } from '../../types';
import { useIncidentTableReportQuery } from '../__generated__/incident-table-report-query.generated';

const useIncidentTable = (): Return => {
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
    selectedIncidentTypes,
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
    setSelectedIncidentTypes,
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
  const [userIds, setUserIds] = useState<string[]>([]);
  const [goodsIds, setGoodsIds] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<IncidentPriority[]>([]);
  const [offenderCount, setOffenderCount] = useState<number | undefined>(
    undefined
  );
  const [totalValue, setTotalValue] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const isDemo =
    currentScheme === 'ckdhbosuv01028oiblmjgeuii' ||
    currentScheme === 'ck6zhwkwv00019ourjkgk5bdt';
  // new date 2 years ago at 00:00:00
  const startDateDemo = new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2)).setHours(
      0,
      0,
      0
    )
  );

  const initDate = isDemo
    ? startDateDemo
    : new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
          0,
          0,
          0
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
          new Date(createdAtInput.startDate).setHours(0, 0, 0)
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
            goodsIds,
            offenderCount,
            priorities,
            selectedBrands,
            selectedGroups,
            selectedIncidentTypes,
            selectedIndustries,
            totalValue,
            userIds,
          },
          key: 'globalFilter',
          type: 'globalFilter',
        },
      ]);
    }
  }, [
    selectedGroups,
    selectedIncidentTypes,
    selectedIndustries,
    selectedBrands,
    crimeGroupIds,
    businessesIds,
    offenderCount,
    totalValue,
    dateRangeMode,
    createdAtMode,
    goodsIds,
    createdAtMode,
    priorities,
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
          if (globalFilter.data?.selectedIncidentTypes) {
            setSelectedIncidentTypes(
              globalFilter.data.selectedIncidentTypes as string[]
            );
          } else {
            setSelectedIncidentTypes([]);
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
          if (globalFilter.data?.userIds) {
            setUserIds(globalFilter.data.userIds as string[]);
          } else {
            setUserIds([]);
          }
          if (globalFilter.data?.goodsIds) {
            setGoodsIds(globalFilter.data.goodsIds as string[]);
          } else {
            setGoodsIds([]);
          }
          if (globalFilter.data?.priorities) {
            setPriorities(globalFilter.data.priorities as IncidentPriority[]);
          } else {
            setPriorities([]);
          }
          if (globalFilter.data?.offenderCount) {
            setOffenderCount(globalFilter.data.offenderCount as number);
          } else {
            setOffenderCount(undefined);
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

  const { data, loading } = useIncidentTableReportQuery({
    fetchPolicy: 'cache-and-network',
    skip:
      !currentScheme ||
      !groups ||
      tableReportLoading ||
      !selectedGroups ||
      !selectedIncidentTypes,
    variables: {
      where: {
        brandsIds: selectedBrands,
        businessesIds,
        createdAt,
        crimeGroupId: crimeGroupIds[0],
        dateRange,
        groupIds: selectedGroups,
        incidentItemIds: goodsIds,
        incidentTypeIds: selectedIncidentTypes,
        industryIds: selectedIndustries,
        offenderCount,
        priorities,
        schemeIds: [currentScheme],
        search,
        totalValue,
        userIds,
      },
    },
  });

  const shouldRedact = isPrinting && redactOnPrint;
  const incidentsTableData =
    data?.incidentTableReport?.incidentPerformance?.map((incident, i) => ({
      alertId: incident.alertId,
      date: incident.date
        ? new Date(incident.date).toLocaleDateString()
        : 'N/A',
      id: incident.id,
      image: incident.primaryPhoto,
      key: incident.subject + i.toString(),
      lostValue: incident.totalLostValue.toFixed(2),
      recoveredValue: incident.totalRecoveredValue.toFixed(2),
      subject: shouldRedact ? redactedText : incident.subject,
      successRate: ((incident.totalSuccessRate || 0) * 100).toFixed(2),
      totalBulletins: incident.totalBulletins,
      totalOffenders: incident.totalOffenders,
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
    // createdAt,
    createdAtMode,
    crimeGroupIds,
    data,
    dateRange,
    dateRangeMode,
    editMode,
    filterCount,
    filtersOpen,
    goodsIds,
    groups,
    handlePrint,
    incidentsTableData,
    isPrinting,
    layout,
    loading,
    logoMetaData,
    logos,
    metadata,
    minDrawer,
    offenderCount,
    priorities,
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
    selectedIncidentTypes,
    selectedIndustries,
    selectedRoles,
    selectedTemplate,
    setAddLogoDrawer,
    setBusinessesIds,
    setCreatedAt,
    setCrimeGroupIds,
    setDateRange,
    setEditMode,
    setGoodsIds,
    setLayout,
    setMetadata,
    setMinDrawer,
    setOffenderCount,
    setPriorities,
    setRedactOnPrint,
    setSaveAsDrawer,
    setSearch,
    setSelectedBrands,
    setSelectedGroups,
    setSelectedIncidentTypes,
    setSelectedIndustries,
    setSelectedRoles,
    setTotalValue,
    setUserIds,
    tableReportLoading,
    templates,
    toggleFiltersOpen,
    totalValue,
    userIds,
  };
};

export default useIncidentTable;
