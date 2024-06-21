import type { RefObject } from 'react';
import type RGL from 'react-grid-layout';

import type { IReportTemplate, MetaData, SelectOptions } from '../../../types';
import type {
  IncidentsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '../../../../../components/reports/tableColumns';
import type { CrimeGroupReportQuery } from 'graphql/reports/queries/crime-group-report.generated';

export interface Return {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businesses: SelectOptions[];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  data: CrimeGroupReportQuery | undefined;
  dateRange: { startDate: Date; endDate: Date };
  editMode: boolean;
  groups: SelectOptions[];
  groupsLoading: boolean;
  handlePrint: () => void;
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  logo: string | null | undefined;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  selectTemplate: (arg0: string) => void;
  selectedBusiness: string[];
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  offendersTableData: OffenderTableData[] | [];
  incidentsTableData: IncidentsTableData[] | [];

  // template
  selectedCrimeGroup: string;
  selectedGroups: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setEditMode: (arg0: boolean) => void;
  setLayout: (layout: RGL.Layout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedBusiness: (businesses: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  templates: IReportTemplate[];
}
