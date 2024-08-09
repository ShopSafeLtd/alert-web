import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type {
  IncidentsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '#/components/reports/tableColumns';
import type { CrimeGroupReportQuery } from 'graphql/reports/queries/__generated__/crime-group-report.generated';
import type { RefObject } from 'react';
import type RGL from 'react-grid-layout';

import type { IReportTemplate, MetaData, SelectOptions } from '../../../types';

export interface Return {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businesses: SelectOptions[];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  data: CrimeGroupReportQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | undefined;
  editMode: boolean;
  groups: SelectOptions[];
  groupsLoading: boolean;
  handlePrint: () => void;
  incidentsTableData: [] | IncidentsTableData[];
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  logo: null | string | undefined;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  offendersTableData: [] | OffenderTableData[];
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  selectTemplate: (arg0: string) => void;
  selectedBusiness: string[];
  // template
  selectedCrimeGroup: string;
  selectedGroups: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    modeValue: DateSelectModeType | undefined
  ) => void;
  setEditMode: (arg0: boolean) => void;
  setLayout: (layout: RGL.Layout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedBusiness: (businesses: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  targetedBusinessData: [] | TargetedBusinessTableData[];
  targetedGoodsData: [] | TargetedGoodsTableData[];
  templates: IReportTemplate[];
}
