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
import type { PerformanceReportQuery } from '../../../../graphql/generated';
import type {
  ExtendedLayout,
  IReportTemplate,
  MetaData,
  SelectOptions,
} from '../../types';

export interface Props {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businessContributionTableData: BusinessTableData[] | [];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  crimeGroupPerformanceTableData: CrimeGroupPerformanceTableData[] | [];
  data: PerformanceReportQuery | undefined;
  dateRange: { startDate: Date; endDate: Date };
  editMode: boolean;
  groups: SelectOptions[];
  groupsLoading: boolean;
  handlePrint: () => void;
  isPrinting: boolean;
  layout: ExtendedLayout[];
  loading: boolean;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  offendersTableData: OffenderTableData[] | [];
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  selectTemplate: (arg0: string) => void;
  selectedGroups: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setEditMode: (editMode: boolean) => void;
  setLayout: (layout: ExtendedLayout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedGroups: (groups: string[]) => void;
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  investigationsData: InvestigationsTableData[] | [];
  templates: IReportTemplate[];
  userContributionTableData: ContributionTableData[] | [];
  setSelectedBrands: (brands: string[]) => void;
  selectedBrands: string[];
  selectedIndustries: string[];
  setSelectedIndustries: (brands: string[]) => void;
  redactOnPrint: boolean;
  setRedactOnPrint: (arg0: boolean) => void;
  filtersOpen: boolean;
  toggleFiltersOpen: () => void;
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
  filterCount: number;
  schemeId: string;
  saving: boolean;
}
