import type { IReportTemplate } from '#/views/reports/types';
import type RGL from 'react-grid-layout';
import type { ReportTemplatesFragment } from 'graphql/reports/mutations/create-report-template.generated';

// create a new type that is ReportTemplatesFragment with the layout inside it being of type RGL.Layout

interface NullableLayout
  extends Omit<RGL.Layout, 'minW' | 'maxW' | 'minH' | 'maxH'> {
  minW?: number | undefined | null;
  maxW?: number | undefined | null;
  minH?: number | undefined | null;
  maxH?: number | undefined | null;
}

type IExtendedTemplate = Omit<ReportTemplatesFragment, 'layout'> & {
  layout: NullableLayout[];
};

const arrangeTemplates = (
  data: IExtendedTemplate[],
  setTemplates: (templates: IReportTemplate[]) => void
) => {
  const importedTemplates: IReportTemplate[] = (
    (data.map((template) => ({
      id: template.id || '',
      name: template.name || '',
      metaData: template.metaData || [],
      default: template.default,
      layout:
        (template.layout.map((item) => ({
          ...item,
          maxH: item.maxH ?? undefined,
          maxW: item.maxW ?? undefined,
          minH: item.minH ?? undefined,
          minW: item.minW ?? undefined,
          static: false,
        })) as RGL.Layout[]) || [],
    })) as IReportTemplate[]) || []
  ).sort((a) => (a.default ? -1 : 1));

  setTemplates(importedTemplates);
};

export default arrangeTemplates;
