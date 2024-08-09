import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { DateRangeInput } from 'graphql/types';

import { useStoreState } from '#/state';
import arrangeTemplates from '#/utils/reports/setTemplates';
import { useOffenderReportQuery } from 'graphql/reports/queries/__generated__/offender-report.generated';
import { useSchemeReportDetailsQuery } from 'graphql/reports/queries/__generated__/scheme-details.generated';
import { ReportType } from 'graphql/types';
import moment from 'moment';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { Props as Return } from './types';

import useReportPrint from '../../../../utils/reportPrint/usePrintReports';
import useReportState from '../../../../utils/reports/useReportState';
import OffenderLayout, { OffenderMetaData } from './initLayout';

const useOffenderReport = (): Return => {
  const { id: selectedOffender, reportId } = useParams();
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const {
    addLogo,
    addLogoDrawer,
    businesses,
    changeSize,
    currentScheme,
    dateRange,
    editMode,
    groups,
    layout,
    logo,
    logos,
    metadata,
    minDrawer,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate: saveTemplateState,
    selectTemplate,
    selectedBusiness,
    selectedGroups,
    selectedSchemes,
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
    setSelectedBusiness,
    setSelectedGroups,
    setSelectedSchemes,
    setTemplates,
    templates,
  } = useReportState({
    InitLayout: OffenderLayout,
    InitMetaData: OffenderMetaData,
    ReportType: ReportType.Offender,
  });
  const userId = useStoreState((state) => state.user.id);

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
            equals: ReportType.Offender,
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

  const { data, loading } = useOffenderReportQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme,
    variables: {
      targetedWhere: {
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
        offenderId: selectedOffender || '',
        schemeIds: [currentScheme],
      },
      where: {
        businessIds: selectedBusiness,
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
        offenderId: selectedOffender || '',
        schemeIds: selectedSchemes,
      },
    },
  });

  const targetedGoodsData =
    data?.targetedGoods?.targetedGoods
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

  const targetedBusinessData =
    data?.businessContribution?.businessContributions
      ?.filter((business) => business.totalIncidents > 0)

      .map((business, i) => ({
        avgLost: business?.averageLossValue?.toFixed(2) || '0',
        commonLost: business.mostCommonGoodLost || 'unknown',
        fullName: business.name,
        highestValueLost:
          Number.parseFloat(
            (business.highestTotalValueGoodLost || 0).toFixed(2)
          ) || 0,
        incidentsCreated: business.totalIncidents,
        key: business.name + i.toString(),
        lostValue: business.totalLostValue.toFixed(2),
        offendersCreated: business.totalOffenders,
        recoveredValue: business.totalRecoveredValue.toFixed(2),
        successRate: ((business.totalSuccessRate || 0) * 100).toFixed(2),
      })) || [];

  const incidentsTableData =
    data?.offenderReport?.incidentsTable?.incidents?.map((incident) => ({
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

  const saveTemplate = (name: string, method: 'create' | 'update') => {
    const idsToDelete =
      method === 'create'
        ? undefined
        : reportData?.scheme?.reportTemplates
            .find((item) => item.id === selectedTemplate)
            ?.layout.map((item) => item.id);
    saveTemplateState(name, method, idsToDelete);
  };
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
    businesses: businesses
      ? businesses.map((business) => ({
          label: business.name,
          value: business.id,
        }))
      : [],
    changeSize,
    componentRef,
    data,
    dateRange,
    editMode,
    groups,
    groupsLoading,
    handlePrint,
    incidentsTableData,
    isPrinting,
    layout,
    loading,
    logo,
    logos,
    metadata,
    minDrawer,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedBusiness,
    selectedGroups,
    selectedOffender: selectedOffender || '',
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange: onSetDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedBusiness,
    setSelectedGroups,
    setSelectedSchemes,
    targetedBusinessData,
    targetedGoodsData,
    templates,
  };
};

export default useOffenderReport;
