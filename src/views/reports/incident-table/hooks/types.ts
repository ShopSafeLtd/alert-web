import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { IncidentPriority } from '#/graphql/types';
import type { TableReportQuery } from 'graphql/reports/queries/__generated__/table-report.generated';
import type { RefObject } from 'react';

import type { IncidentTableData } from '../../../../components/reports/tableColumns';
import type {
  ExtendedLayout,
  IReportTemplate,
  MetaData,
  SelectOptions,
} from '../../types';
import type { IncidentTableReportQuery } from '../__generated__/incident-table-report-query.generated';

export interface Props {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businessesIds: string[];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  // createdAt: { endDate: Date; startDate: Date } | undefined;
  createdAtMode: DateSelectModeType | undefined;
  crimeGroupIds: string[];
  data: IncidentTableReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | undefined;
  dateRangeMode: DateSelectModeType | undefined;
  editMode: boolean;
  filterCount: number;
  filtersOpen: boolean;
  goodsIds: string[];
  groups: SelectOptions[];
  handlePrint: () => void;
  incidentsTableData: [] | IncidentTableData[];
  isPrinting: boolean;
  layout: ExtendedLayout[];
  loading: boolean;
  logoMetaData: MetaData | undefined;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  offenderCount: number | undefined;
  priorities: IncidentPriority[];
  redactOnPrint: boolean;
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  reportData: TableReportQuery | undefined;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  saving: boolean;
  schemeId: string;
  search: string | undefined;
  selectTemplate: (arg0: string) => void;
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedRoles: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setBusinessesIds: (value: string[]) => void;
  setCreatedAt: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    mode: DateSelectModeType | undefined
  ) => void;
  setCrimeGroupIds: (value: string[]) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    mode: DateSelectModeType | undefined
  ) => void;
  setEditMode: (editMode: boolean) => void;
  setGoodsIds: (value: string[]) => void;
  setLayout: (layout: ExtendedLayout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setOffenderCount: (count: number | undefined) => void;
  setPriorities: (value: IncidentPriority[]) => void;
  setRedactOnPrint: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSearch: (value: string | undefined) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedIncidentTypes: (types: string[]) => void;
  setSelectedIndustries: (brands: string[]) => void;
  setSelectedRoles: (roles: string[]) => void;
  setTotalValue: (value: number | undefined) => void;
  setUserIds: (value: string[]) => void;
  tableReportLoading: boolean;
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
  totalValue: number | undefined;
  userIds: string[];
}
