import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { TargetedBusinessReportQuery } from 'graphql/reports/queries/__generated__/business-report.generated';
import type { RefObject } from 'react';
import type RGL from 'react-grid-layout';

import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from '../../../../../components/reports/tableColumns';
import type { IReportTemplate, MetaData, SelectOptions } from '../../../types';

export interface Return {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businessName: string;
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  crimeGroups: SelectOptions[];
  data: TargetedBusinessReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | undefined;
  editMode: boolean;
  filterCount: number;
  filtersOpen: boolean;
  groups: SelectOptions[];
  groupsLoading: boolean;
  handlePrint: () => void;
  incidentsTableData: [] | IncidentsTableData[];
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  offenders: SelectOptions[];
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  selectTemplate: (arg0: string) => void;
  selectedCrimeGroups: string[];
  selectedGroups: string[];
  selectedOffenders: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    modeValue: DateSelectModeType | undefined
  ) => void;
  setEditMode: (editMode: boolean) => void;
  setLayout: (layout: RGL.Layout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedCrimeGroups: (crimeGroups: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedOffenders: (offenders: string[]) => void;
  targetedGoodsData: [] | TargetedGoodsTableData[];
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
}
