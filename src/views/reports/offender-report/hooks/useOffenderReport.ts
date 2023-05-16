import {
  ReportType,
  useOffenderReportQuery,
  useSchemeReportDetailsQuery,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import type RGL from 'react-grid-layout';
import moment from 'moment';
import useReportPrint from '../../../../utils/reportPrint/usePrintReports';
import type { Props as Return } from './types';
import type { IReportTemplate } from '../../types';

import OffenderLayout, { OffenderMetaData } from './initLayout';
import useReportState from '../../../../utils/reports/useReportState';

const useOffenderReport = (): Return => {
  const { id: selectedOffender } = useParams();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    currentScheme,
    logo,
    businesses,
    editMode,
    setEditMode,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    selectedBusiness,
    setSelectedBusiness,
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
    InitLayout: OffenderLayout,
    InitMetaData: OffenderMetaData,
    ReportType: ReportType.Offender,
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
            equals: ReportType.Offender,
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

  const { data, loading } = useOffenderReportQuery({
    fetchPolicy: 'cache-and-network',
    skip:
      !currentScheme ||
      !groups ||
      !selectedOffender ||
      groupsLoading ||
      !selectedGroups ||
      selectedGroups.filter(Boolean).length === 0,
    variables: {
      where: {
        offenderId: selectedOffender || '',
        businessIds: selectedBusiness,
        dateRange,
        schemeIds: [currentScheme],
        groupIds: selectedGroups,
      },
      targetedWhere: {
        offenderId: selectedOffender || '',
        dateRange,
        schemeIds: [currentScheme],
        groupIds: selectedGroups,
      },
    },
  });

  const targetedGoodsData =
    data?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)
      .map((good, i) => ({
        key: good.name + i,
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        offendersCreated: good.totalOffenders,
        lostValue: good.totalLostValue.toFixed(2),
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
        avgLost: good?.averageLossValue?.toFixed(2),
      })) || [];

  const targetedBusinessData =
    data?.businessContribution?.businessContributions
      ?.filter((business) => business.totalIncidents > 0)

      .map((business, i) => ({
        key: business.name + i,
        fullName: business.name,
        incidentsCreated: business.totalIncidents,
        offendersCreated: business.totalOffenders,
        lostValue: business.totalLostValue.toFixed(2),
        recoveredValue: business.totalRecoveredValue.toFixed(2),
        successRate: ((business.totalSuccessRate || 0) * 100).toFixed(2),
        commonLost: business.mostCommonGoodLost || 'unknown',
        highestValueLost: business.highestTotalValueGoodLost || 0,
        avgLost: business?.averageLossValue?.toFixed(2) || '0',
      })) || [];

  const incidentsTableData =
    data?.offenderReport?.incidentsTable?.incidents?.map((incident) => ({
      key: incident.id,
      alertId: incident.reference,
      date: moment(incident.date).format('DD/MM/YYYY'),
      value: incident.incidentItems
        ?.reduce((acc, item) => acc + item.value, 0)
        .toFixed(2),
      valueRec: incident.incidentItems
        ?.reduce((acc, item) => acc + item.recoveredValue, 0)
        .toFixed(2),
      location: incident.location?.alias || '',
      totalOffenders: incident.totalOffenders || 0,
      crimeTypes: incident.crimeTypes?.map((t) => t.name).join(', ') || '',
      policeReported: incident.policeInvolved ? 'Yes' : 'No',
      policeAttended: incident.policeReported ? 'Yes' : 'No',
      crimeRef: incident.policeRef || '',
    })) || [];

  const saveTemplate = (name: string, method: 'create' | 'update') => {
    const idsToDelete =
      method === 'create'
        ? undefined
        : reportData?.scheme?.reportTemplates
            .find((item) => item.id === selectedTemplate)
            ?.layout.map((item) => item.id);
    saveTemplateState(name, method, idsToDelete);
  };

  return {
    businesses: businesses
      ? businesses.map((business) => ({
          label: business.name,
          value: business.id,
        }))
      : [],
    selectedOffender: selectedOffender || '',
    loading,
    data,
    groups,
    dateRange,
    setDateRange,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    selectedBusiness,
    setSelectedBusiness,
    componentRef,
    handlePrint,
    isPrinting,
    layout,
    setLayout,
    minDrawer,
    setMinDrawer,
    logo,
    removeItem,
    changeSize,
    targetedBusinessData,
    targetedGoodsData,
    incidentsTableData,
    editMode,
    setEditMode,
    addLogo,
    addLogoDrawer,
    logos,
    metadata,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedTemplate,
    setMetadata,
    setAddLogoDrawer,
    setSaveAsDrawer,
    templates,
  };
};

export default useOffenderReport;
