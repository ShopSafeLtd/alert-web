import type { TargetedBusinessReportQuery } from 'graphql/generated';
import {
  useSchemeGroupsQuery,
  useSchemeReportFiltersQuery,
  useTargetedBusinessReportQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import type RGL from 'react-grid-layout';
import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import useReportPrint from 'utils/reportPrint/usePrintReports';
import { tableLengthToHeight } from 'components/reports/utils/utils';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import BusinessReportLayout from './utils';

interface Return {
  loading: boolean;
  data: TargetedBusinessReportQuery | undefined;
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  groups: SelectOptions[];
  setSelectedGroups: (groups: string[]) => void;
  crimeGroups: SelectOptions[];
  setSelectedCrimeGroups: (crimeGroups: string[]) => void;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  offenders: SelectOptions[];
  setSelectedOffenders: (offenders: string[]) => void;
  targetedGoodsData: TargetedGoodsTableData[] | [];
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null | undefined;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
  businessName: string;
  selectedOffenders: string[];
  selectedCrimeGroups: string[];
  incidentsTableData: IncidentsTableData[] | [];
}

export interface SelectOptions {
  label: string;
  value: string;
}

const useBusinessReport = (): Return => {
  const [editMode, setEditMode] = useState(false);
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const [minDrawer, setMinDrawer] = useState(false);
  const [layout, setLayout] = useState<RGL.Layout[]>(BusinessReportLayout);
  const { id: currentScheme, logo } = useStoreState((state) => state.scheme);
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [crimeGroups, setCrimeGroups] = useState<SelectOptions[]>([]);
  const [selectedCrimeGroups, setSelectedCrimeGroups] = useState<string[]>([]);
  const [offenders, setOffenders] = useState<SelectOptions[]>([]);
  const [selectedOffenders, setSelectedOffenders] = useState<string[]>([]);
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
  const { id: selectedBusiness } = useParams();

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
    if (groupsData) {
      const groupsFormatted = groupsData.groups.map((group) => ({
        label: group.name,
        value: group.id,
      }));
      setGroups(groupsFormatted);
      setSelectedGroups(groupsFormatted.map((item) => item.value));
    }
  }, [groupsData]);

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
      setSelectedCrimeGroups(crimeGroupsFormatted.map((item) => item.value));
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
        crimeGroupIds: selectedCrimeGroups,
        offenderIds:
          selectedOffenders.length > 0 ? selectedOffenders : undefined,
      },
      businessWhere: {
        id: selectedBusiness || '',
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

  const targetedGoodsData =
    data?.businessReport?.targetedGoods?.targetedGoods
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

  const incidentsTableData =
    data?.businessReport?.incidentsTable?.incidents?.map((incident) => ({
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

  return {
    removeItem,
    changeSize,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    logo,
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
  };
};

export default useBusinessReport;
