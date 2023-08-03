import {
  ReportType,
  useSchemeReportDetailsQuery,
  useSchemeReportFiltersQuery,
  useTargetedBusinessReportQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import type RGL from 'react-grid-layout';
import useReportPrint from 'utils/reportPrint/usePrintReports';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import BusinessReportLayout, { BusinessReportMetaData } from './initLayout';
import type { Return } from './types';
import type { IReportTemplate, SelectOptions } from '../../../types';
import useReportState from '../../../../../utils/reports/useReportState';

const useBusinessReport = (): Return => {
  const { id: selectedBusiness } = useParams();
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
    InitLayout: BusinessReportLayout,
    InitMetaData: BusinessReportMetaData,
    ReportType: ReportType.Business,
  });

  const [crimeGroups, setCrimeGroups] = useState<SelectOptions[]>([]);
  const [selectedCrimeGroups, setSelectedCrimeGroups] = useState<string[]>([]);
  const [offenders, setOffenders] = useState<SelectOptions[]>([]);
  const [selectedOffenders, setSelectedOffenders] = useState<string[]>([]);

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
            equals: ReportType.Business,
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
          groupsData.scheme?.reportTemplates.map((template) => ({
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
          })) || [];

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

  const { data: filterData, loading: filterLoading } =
    useSchemeReportFiltersQuery({
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
    skip:
      !currentScheme ||
      !groups ||
      groupsLoading ||
      filterLoading ||
      !selectedGroups ||
      selectedGroups.filter(Boolean).length === 0,
    variables: {
      where: {
        dateRange,
        schemeIds: [currentScheme],
        groupIds: selectedGroups,
        businessId: selectedBusiness || '',
        crimeGroupIds: selectedCrimeGroups || [],
        offenderIds:
          selectedOffenders.length > 0 ? selectedOffenders : undefined,
      },
      businessWhere: {
        id: selectedBusiness || '',
      },
    },
  });

  const targetedGoodsData =
    data?.businessReport?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)

      .map((good, i) => ({
        key: good.name + i.toString(),
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        offendersCreated: good.totalOffenders,
        lostValue: good.totalLostValue.toFixed(2),
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
        avgLost: good?.averageLossValue?.toFixed(2),
      })) || [];

  const incidentsTableData =
    data?.businessReport?.incidentsTable?.incidents?.map((incident) => ({
      key: incident.id,
      alertId: incident.reference,
      date: moment(incident.date).format('DD/MM/YYYY'),
      value: incident.incidentItems
        ?.reduce((acc, item) => acc + (item.value || 0), 0)
        .toFixed(2),
      valueRec: incident.incidentItems
        ?.reduce((acc, item) => acc + (item.recoveredValue || 0), 0)
        .toFixed(2),
      location: incident.location?.alias || '',
      totalOffenders: incident.totalOffenders || 0,
      crimeTypes: incident.crimeTypes?.map((t) => t.name).join(', ') || '',
      policeReported: incident.policeInvolved ? 'Yes' : 'No',
      policeAttended: incident.policeReported ? 'Yes' : 'No',
      crimeRef: incident.policeRef || '',
    })) || [];

  return {
    removeItem,
    changeSize,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
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
    incidentsTableData,
    targetedGoodsData,
    crimeGroups,
    setSelectedCrimeGroups,
    selectedCrimeGroups,
    offenders,
    setSelectedOffenders,
    selectedOffenders,
    businessName: data?.business?.name || '',
    addLogo,
    logos,
    metadata,
    setMetadata,
    saveTemplate,
    templates,
    selectedTemplate,
    addLogoDrawer,
    removeLogo,
    saveAsDrawer,
    selectTemplate,
    setAddLogoDrawer,
    setSaveAsDrawer,
  };
};

export default useBusinessReport;
