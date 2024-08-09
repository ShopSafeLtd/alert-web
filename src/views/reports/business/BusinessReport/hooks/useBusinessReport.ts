import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { DateRangeInput } from 'graphql/types';

import arrangeTemplates from '#/utils/reports/setTemplates';
import { useTargetedBusinessReportQuery } from 'graphql/reports/queries/__generated__/business-report.generated';
import { useSchemeReportDetailsQuery } from 'graphql/reports/queries/__generated__/scheme-details.generated';
import { useSchemeReportFiltersQuery } from 'graphql/reports/queries/__generated__/scheme-filter-query.generated';
import { ReportType } from 'graphql/types';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReportPrint from 'utils/reportPrint/usePrintReports';

import type { SelectOptions } from '../../../types';
import type { Return } from './types';

import useReportState from '../../../../../utils/reports/useReportState';
import BusinessReportLayout, { BusinessReportMetaData } from './initLayout';

const useBusinessReport = (): Return => {
  const { id: selectedBusiness, reportId } = useParams();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    addLogo,
    addLogoDrawer,
    changeSize,
    currentScheme,
    dateRange,
    editMode,
    filterCount,
    filtersOpen,
    groups,
    layout,
    logos,
    metadata,
    minDrawer,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate: saveTemplateState,
    selectTemplate,
    selectedGroups,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setEditMode,
    setGroups,
    setLayout,
    setLogos,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedGroups,
    setTemplates,
    templates,
    toggleFiltersOpen,
    userId,
  } = useReportState({
    InitLayout: BusinessReportLayout,
    InitMetaData: BusinessReportMetaData,
    ReportType: ReportType.Business,
  });

  const [crimeGroups, setCrimeGroups] = useState<SelectOptions[]>([]);
  const [selectedCrimeGroups, setSelectedCrimeGroups] = useState<string[]>([]);
  const [offenders, setOffenders] = useState<SelectOptions[]>([]);
  const [selectedOffenders, setSelectedOffenders] = useState<string[]>([]);

  useEffect(() => {
    if (templates.length > 0 && reportId) selectTemplate(reportId);
  }, [templates, reportId]);

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
      },
      variables: {
        reportTemplatesWhere: {
          type: {
            equals: ReportType.Business,
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

  const { data: filterData } = useSchemeReportFiltersQuery({
    variables: {
      where: {
        id: {
          in: [currentScheme],
        },
      },
    },
  });

  useEffect(() => {
    if (filterData) {
      // TODO change to multi
      const crimeGroupsFormatted = filterData.schemes[0].crimeGroups.map(
        (crimeGroup) => ({
          label: crimeGroup.alias || crimeGroup.ref || 'No Alias',
          value: crimeGroup.id,
        })
      );
      setCrimeGroups(crimeGroupsFormatted);
      // setSelectedCrimeGroups(crimeGroupsFormatted.map((item) => item.value));
      const offendersFormatted = filterData.schemes[0].offenders.map(
        (offender) => ({
          label: offender.name || offender?.reference?.toString() || 'No Alias',
          value: offender.id,
        })
      );
      setOffenders(offendersFormatted);
    }
  }, [filterData]);

  const { data, loading } = useTargetedBusinessReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme,
    variables: {
      businessWhere: {
        id: selectedBusiness || '',
      },
      where: {
        businessId: selectedBusiness || '',
        crimeGroupIds: selectedCrimeGroups || [],
        dateRange: dateRange ?? {
          endDate: new Date(new Date().setHours(23, 59, 59)),
          startDate: new Date(
            new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
              0,
              0,
              59
            )
          ),
        },
        groupIds:
          selectedGroups.length > 0
            ? selectedGroups
            : groups.map(({ value }) => value),
        offenderIds:
          selectedOffenders.length > 0 ? selectedOffenders : undefined,
        schemeIds: [currentScheme],
      },
    },
  });

  const targetedGoodsData =
    data?.businessReport?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)

      .map((good, i) => ({
        avgLost: good?.averageLossValue?.toFixed(2),
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        key: good.name + i.toString(),
        lostValue: good.totalLostValue.toFixed(2),
        offendersCreated: good.totalOffenders,
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
      })) || [];

  const incidentsTableData =
    data?.businessReport?.incidentsTable?.incidents?.map((incident) => ({
      alertId: incident.reference,
      crimeRef: incident.policeRef || '',
      crimeTypes: incident.crimeTypes?.map((t) => t.name).join(', ') || '',
      date: moment(incident.date).format('DD/MM/YYYY'),
      key: incident.id,
      location: incident.location?.alias || '',
      policeAttended: incident.policeReported ? 'Yes' : 'No',
      policeReported: incident.policeInvolved ? 'Yes' : 'No',
      totalOffenders: incident.totalOffenders || 0,
      value: incident.incidentItems
        ?.reduce((acc, item) => acc + (item.value || 0), 0)
        .toFixed(2),
      valueRec: incident.incidentItems
        ?.reduce((acc, item) => acc + (item.recoveredValue || 0), 0)
        .toFixed(2),
    })) || [];
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
    businessName: data?.business?.name || '',
    changeSize,
    componentRef,
    crimeGroups,
    data,
    dateRange,
    editMode,
    filterCount,
    filtersOpen,
    groups,
    groupsLoading,
    handlePrint,
    incidentsTableData,
    isPrinting,
    layout,
    loading,
    logos,
    metadata,
    minDrawer,
    offenders,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedCrimeGroups,
    selectedGroups,
    selectedOffenders,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange: onSetDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedCrimeGroups,
    setSelectedGroups,
    setSelectedOffenders,
    targetedGoodsData,
    templates,
    toggleFiltersOpen,
  };
};

export default useBusinessReport;
