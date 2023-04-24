import type { OffenderReportQuery } from 'graphql/generated';
import {
  useOffenderReportQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type RGL from 'react-grid-layout';
import moment from 'moment';
import { tableLengthToHeight } from 'components/reports/utils/utils';
import useReportPrint from '../../../../utils/reportPrint/usePrintReports';
import type {
  IncidentsTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '../../../../components/reports/tableColumns';
import OffenderLayout from './utils';

interface Return {
  loading: boolean;
  data: OffenderReportQuery | undefined;
  groups: SelectOptions[];
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  groupsLoading: boolean;
  selectedGroups: string[];
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: SelectOptions[];
  selectedOffender: string;
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null | undefined;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  incidentsTableData: IncidentsTableData[] | [];
  editMode: boolean;
  setEditMode: (arg0: boolean) => void;
}

export interface SelectOptions {
  label: string;
  value: string;
}

const useOffenderReport = (): Return => {
  const [editMode, setEditMode] = useState(false);

  const { id: selectedOffender } = useParams();
  const [minDrawer, setMinDrawer] = useState(false);
  const [layout, setLayout] = useState<RGL.Layout[]>(OffenderLayout);
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const { id: currentScheme, logo } = useStoreState((state) => state.scheme);
  const businesses = useStoreState((state) => state.user.businesses);

  const [selectedBusiness, setSelectedBusiness] = useState<string[]>(
    businesses ? businesses.map((business) => business.id) : []
  );
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [dateRange, setDateRangeState] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    // new date 1 month ago at 00:00:00
    startDate: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
        0,
        0,
        59
      )
    ),
    // today at 23:59:59
    endDate: new Date(new Date().setHours(23, 59, 59)),
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (groupsData) {
      const groupsFormatted = groupsData.groups.map((group) => ({
        label: group.name,
        value: group.id,
      }));
      setGroups(groupsFormatted);
      setSelectedGroups(groupsFormatted.map((item) => item.value));
    }
  }, [groupsData]);

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

  const setDateRange = (dateRangeInput: {
    startDate: Date;
    endDate: Date;
  }): void => {
    setDateRangeState({
      startDate: new Date(
        new Date(dateRangeInput.startDate).setHours(0, 0, 59)
      ),
      endDate: new Date(new Date(dateRangeInput.endDate).setHours(23, 59, 59)),
    });
  };

  const removeItem = (item: string) => {
    setLayout(layout.filter((i) => i.i !== item));
  };

  const changeSize = (item: string, size: number) => {
    setLayout(
      layout.map((i) => {
        if (i.i === item) {
          return { ...i, h: tableLengthToHeight(size) };
        }
        return i;
      })
    );
  };

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

  return {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    businesses: businesses
      ? businesses.map((business) => ({
          label: business.name,
          value: business.id,
        }))
      : [],
    selectedBusiness,
    setSelectedBusiness,
    selectedOffender: selectedOffender || '',
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
    targetedGoodsData,
    incidentsTableData,
    targetedBusinessData,
    editMode,
    setEditMode,
  };
};

export default useOffenderReport;
