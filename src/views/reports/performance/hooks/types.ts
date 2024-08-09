import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { PerformanceReportQuery } from 'graphql/reports/queries/__generated__/performance-report.generated';
import type { RefObject } from 'react';

import type {
  BusinessTableData,
  ContributionTableData,
  CrimeGroupPerformanceTableData,
  InvestigationsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '../../../../components/reports/tableColumns';
import type {
  ExtendedLayout,
  IReportTemplate,
  MetaData,
  SelectOptions,
} from '../../types';

export interface Props {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businessContributionTableData: [] | BusinessTableData[];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  crimeGroupPerformanceTableData: [] | CrimeGroupPerformanceTableData[];
  data: PerformanceReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date };
  editMode: boolean;
  filterCount: number;
  filtersOpen: boolean;
  groups: SelectOptions[];
  groupsLoading: boolean;
  handlePrint: () => void;
  incidentTypeIds: string[];
  investigationsData: [] | InvestigationsTableData[];
  isPrinting: boolean;
  layout: ExtendedLayout[];
  loading: boolean;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  offendersTableData: [] | OffenderTableData[];
  redactOnPrint: boolean;
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  saving: boolean;
  schemeId: string;
  selectTemplate: (arg0: string) => void;
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIndustries: string[];
  selectedRoles: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    mode: DateSelectModeType | undefined
  ) => void;
  setEditMode: (editMode: boolean) => void;
  setIncidentTypeIds: (values: string[]) => void;
  setLayout: (layout: ExtendedLayout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setRedactOnPrint: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedIndustries: (brands: string[]) => void;
  setSelectedRoles: (roles: string[]) => void;
  targetedBusinessData: [] | TargetedBusinessTableData[];
  targetedGoodsData: [] | TargetedGoodsTableData[];
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
  userContributionTableData: [] | ContributionTableData[];
}
