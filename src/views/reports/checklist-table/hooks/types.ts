import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { ChecklistTableData } from '#/components/reports/tableColumns';
import type { ChecklistTableReportQuery } from '#/views/reports/checklist-table/__generated__/checklist-table-report-query.generated';
import type { TableReportQuery } from 'graphql/reports/queries/__generated__/table-report.generated';
import type { RefObject } from 'react';

import type { ExtendedLayout, IReportTemplate, MetaData } from '../../types';

export interface Props {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businessesIds: string[];
  changeSize: (arg0: string, arg1: number) => void;
  checklistsTableData: [] | ChecklistTableData[];
  componentRef: RefObject<HTMLDivElement>;
  data: ChecklistTableReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | undefined;
  dateRangeMode: DateSelectModeType | undefined;
  editMode: boolean;
  filterCount: number;
  filtersOpen: boolean;
  handlePrint: () => void;
  isPrinting: boolean;
  layout: ExtendedLayout[];
  loading: boolean;
  logoMetaData: MetaData | undefined;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  percentComplete: ScoreInput;
  redactOnPrint: boolean;
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  reportData: TableReportQuery | undefined;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  saving: boolean;
  schemeId: string;
  score: ScoreInput;
  search: string | undefined;
  selectTemplate: (arg0: string) => void;
  selectedBrands: string[];
  selectedIndustries: string[];
  selectedRoles: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setBusinessesIds: (value: string[]) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    mode: DateSelectModeType | undefined
  ) => void;
  setEditMode: (editMode: boolean) => void;
  setLayout: (layout: ExtendedLayout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setPercentComplete: (value: ScoreInput) => void;
  setRedactOnPrint: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setScore: (value: ScoreInput) => void;
  setSearch: (value: string | undefined) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedIndustries: (brands: string[]) => void;
  setSelectedRoles: (roles: string[]) => void;
  tableReportLoading: boolean;
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
}
export interface ScoreInput {
  gteValue: number;
  lteValue: number;
}
