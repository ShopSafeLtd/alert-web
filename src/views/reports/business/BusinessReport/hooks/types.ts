import type { RefObject } from 'react';
import type RGL from 'react-grid-layout';
import type {
  ReportType as IReportType,
  TargetedBusinessReportQuery,
} from '../../../../../graphql/generated';
import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from '../../../../../components/reports/tableColumns';
import type { IReportTemplate, MetaData, SelectOptions } from '../../../types';

export interface Return {
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
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
  businessName: string;
  selectedOffenders: string[];
  selectedCrimeGroups: string[];
  incidentsTableData: IncidentsTableData[] | [];
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  logos: string[];
  metadata: MetaData[];
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  selectTemplate: (arg0: string) => void;
  selectedTemplate: string;
  setMetadata: (arg0: MetaData[]) => void;
  setAddLogoDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  templates: IReportTemplate[];
  setAsDefault: (arg0: {
    templateId: string;
    type: IReportType;
    default: boolean;
  }) => void;
}
