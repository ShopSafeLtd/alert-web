import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { InvestigationStatus } from '#/graphql/types';
import type { TableReportQuery } from 'graphql/reports/queries/__generated__/table-report.generated';
import type { RefObject } from 'react';

import type { InvestigationTableData } from '../../../../components/reports/tableColumns';
import type {
  ExtendedLayout,
  IReportTemplate,
  MetaData,
  SelectOptions,
} from '../../types';
import type { InvestigationTableReportQuery } from '../__generated__/investigation-table-report-query.generated';

export interface Props {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businessesIds: string[];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  crimeGroupIds: string[];
  data: InvestigationTableReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | undefined;
  dateRangeMode: DateSelectModeType | undefined;
  editMode: boolean;
  filterCount: number;
  filtersOpen: boolean;
  groups: SelectOptions[];
  handlePrint: () => void;
  investigationsTableData: [] | InvestigationTableData[];
  isPrinting: boolean;
  layout: ExtendedLayout[];
  loading: boolean;
  logoMetaData: MetaData | undefined;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
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
  selectedIndustries: string[];
  selectedRoles: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setBusinessesIds: (value: string[]) => void;
  setCrimeGroupIds: (value: string[]) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    mode: DateSelectModeType | undefined
  ) => void;
  setEditMode: (editMode: boolean) => void;
  setLayout: (layout: ExtendedLayout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setRedactOnPrint: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSearch: (value: string | undefined) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedIndustries: (brands: string[]) => void;
  setSelectedRoles: (roles: string[]) => void;
  setStatus: (value: InvestigationStatus[]) => void;
  setTotalValue: (value: number | undefined) => void;
  status: InvestigationStatus[];
  tableReportLoading: boolean;
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
  totalValue: number | undefined;
}
