import type { RefObject } from 'react';
import type RGL from 'react-grid-layout';

import type {
  IncidentsTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '../../../../components/reports/tableColumns';
import type { IReportTemplate, MetaData, SelectOptions } from '../../types';
import type { OffenderReportQuery } from 'graphql/reports/queries/offender-report.generated';

export interface Props {
  loading: boolean;
  data: OffenderReportQuery | undefined;
  groups: SelectOptions[];
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  groupsLoading: boolean;
  selectedGroups: string[];
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: SelectOptions[];
  selectedOffender: string;
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null | undefined;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  incidentsTableData: IncidentsTableData[] | [];
  editMode: boolean;
  setEditMode: (arg0: boolean) => void;

  // template
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
}
