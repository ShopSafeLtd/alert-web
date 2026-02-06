import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { ApolloError } from '@apollo/client';
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
  businessContributionCurrentPage: number;
  businessContributionPageSize: number;
  businessContributionSortDirection: 'asc' | 'desc';
  businessContributionSortField: string;
  businessContributionTableData: [] | BusinessTableData[];
  // Business Contribution Table pagination/sorting
  businessContributionTotal: number;
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  crimeGroupPerformanceTableData: [] | CrimeGroupPerformanceTableData[];
  currentPage: number;
  data: PerformanceReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date };
  editMode: boolean;
  errors: {
    businessContribution?: ApolloError;
    coreSummaries?: ApolloError;
    crimeGroupsInvestigations?: ApolloError;
    heatMap?: ApolloError;
    offenders?: ApolloError;
    targetedGoods?: ApolloError;
  };
  filterCount: number;
  filtersOpen: boolean;
  getBusinessContributionSortIndicator: (columnField: string) => string;
  getSortIndicator: (columnField: string) => string;
  getTargetedBusinessSortIndicator: (columnField: string) => string;
  groups: SelectOptions[];
  groupsLoading: boolean;
  handleBusinessContributionPageChange: (
    page: number,
    newPageSize?: number
  ) => void;
  handleBusinessContributionSort: (field: string) => void;
  handlePageChange: (page: number, newPageSize?: number) => void;
  handlePrint: () => void;
  handleSort: (field: string) => void;
  handleTargetedBusinessPageChange: (
    page: number,
    newPageSize?: number
  ) => void;
  handleTargetedBusinessSort: (field: string) => void;
  incidentTypeIds: string[];
  investigationsData: [] | InvestigationsTableData[];
  isPrinting: boolean;
  layout: ExtendedLayout[];
  loading: boolean;
  loadingStates: {
    businessContribution: boolean;
    coreSummaries: boolean;
    crimeGroupsInvestigations: boolean;
    heatMap: boolean;
    offenders: boolean;
    targetedGoods: boolean;
  };
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  offendersTableData: [] | OffenderTableData[];
  pageSize: number;
  redactOnPrint: boolean;
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  saving: boolean;
  schemeId: string;
  selectTemplate: (arg0: string) => void;
  selectedBrands: string[];
  selectedBusiness: string[];
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

  setSelectedBusiness: (businesses: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedIndustries: (brands: string[]) => void;
  setSelectedRoles: (roles: string[]) => void;
  sortDirection: 'asc' | 'desc';
  sortField: string;
  targetedBusinessCurrentPage: number;
  targetedBusinessData: [] | TargetedBusinessTableData[];

  targetedBusinessPageSize: number;
  targetedBusinessSortDirection: 'asc' | 'desc';
  targetedBusinessSortField: string;
  // Targeted Business Table pagination/sorting
  targetedBusinessTotal: number;
  targetedGoodsData: [] | TargetedGoodsTableData[];
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
  userContributionTableData: [] | ContributionTableData[];
  userContributionsTotal: number;
  userEngagementLoading: boolean;
}
