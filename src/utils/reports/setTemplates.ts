import type { IReportTemplate } from '#/views/reports/types';
import type { ReportTemplatesFragment } from 'graphql/reports/mutations/__generated__/create-report-template.generated';
import type RGL from 'react-grid-layout';
// create a new type that is ReportTemplatesFragment with the layout inside it being of type RGL.Layout

interface NullableLayout
  extends Omit<RGL.Layout, 'maxH' | 'maxW' | 'minH' | 'minW'> {
  maxH?: null | number | undefined;
  maxW?: null | number | undefined;
  minH?: null | number | undefined;
  minW?: null | number | undefined;
}

type IExtendedTemplate = {
  layout: NullableLayout[];
} & Omit<ReportTemplatesFragment, 'layout'>;

const arrangeTemplates = (
  data: IExtendedTemplate[],
  setTemplates: (templates: IReportTemplate[]) => void
) => {
  const importedTemplates: IReportTemplate[] = (
    (data.map((template) => ({
      default: template.default,
      id: template.id || '',
      layout:
        (template.layout.map((item) => ({
          ...item,
          maxH: item.maxH ?? undefined,
          maxW: item.maxW ?? undefined,
          minH: item.minH ?? undefined,
          minW: item.minW ?? undefined,
          static: false,
        })) as RGL.Layout[]) || [],
      metaData: template.metaData || [],
      name: template.name || '',
    })) as IReportTemplate[]) || []
  ).sort((a) => (a.default ? -1 : 1));

  setTemplates(importedTemplates);
};

export default arrangeTemplates;
