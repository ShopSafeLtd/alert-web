import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type { OffenderReportQuery } from 'graphql/reports/queries/__generated__/offender-report.generated';
import type { DateRangeInput } from 'graphql/types';
import type { RefObject } from 'react';
import type RGL from 'react-grid-layout';

import type {
  IncidentsTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '../../../../components/reports/tableColumns';
import type { IReportTemplate, MetaData, SelectOptions } from '../../types';

export interface Props {
  // template
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businesses: SelectOptions[];
  changeSize: (arg0: string, arg1: number) => void;
  componentRef: RefObject<HTMLDivElement>;
  data: OffenderReportQuery | undefined;
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
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  selectTemplate: (arg0: string) => void;
  selectedBusiness: string[];
  selectedGroups: string[];
  selectedOffender: string;

  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (
    rangeValue: DateRangeInput | undefined,
    modeValue: DateSelectModeType | undefined
  ) => void;
  setEditMode: (arg0: boolean) => void;
  setLayout: (layout: RGL.Layout[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedBusiness: (businesses: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedSchemes: (value: string[]) => void;
  targetedBusinessData: [] | TargetedBusinessTableData[];
  targetedGoodsData: [] | TargetedGoodsTableData[];
  templates: IReportTemplate[];
}
