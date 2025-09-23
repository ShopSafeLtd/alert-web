import type { MetaData } from '#/views/reports/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import arrangeTemplates from '#/utils/reports/setTemplates';
import useReportState from '#/utils/reports/useReportState';
import { notification } from 'antd';
import { useUpdateReportTemplateMutation } from 'graphql/reports/mutations/__generated__/update-report-template.generated';
import { useSchemeReportDetailsQuery } from 'graphql/reports/queries/__generated__/scheme-details.generated';
import { ReportType } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import IncidentMapLayout, { IncidentMapMetaData } from './initLayout';

export interface IncidentMapFilters {
  cluster: boolean;
  dateRange: { endDate: Date; startDate: Date } | null;
  heatmapIntensity: number;
  mapViewState?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  multiColour: 'multi' | 'single';
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedPoliceAreas: string[];
  selectedSchemes: string[];
  showBCRP: boolean;
  showBusinesses: boolean;
  showCameras: boolean;
  showHeatmap: boolean;
  showLondonPolice: boolean;
  showMarkers: boolean;
  showPolice: boolean;
  showRetailParks: boolean;
  showUKDistricts: boolean;
  useBcu: boolean;
  viewMode: 'popup' | 'sidebar';
}

interface Return {
  // Helper to get/set filters from metadata
  getFilters: () => IncidentMapFilters;
  // Report state management
  metadata: MetaData[];
  saveFilters: () => Promise<void>;
  saving: boolean;

  setMetadata: (metadata: MetaData[]) => void;
  updateFilters: (filters: Partial<IncidentMapFilters>) => void;
}

const useIncidentMapReport = (): Return => {
  const { reportId } = useParams();
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const {
    metadata,
    selectTemplate,
    selectedTemplate,
    setMetadata,
    setTemplates,
    templates,
  } = useReportState({
    InitLayout: IncidentMapLayout,
    InitMetaData: IncidentMapMetaData,
    ReportType: ReportType.IncidentMap,
  });

  // Custom update mutation for metadata only
  const [updateReportMetadata, { loading: updateLoading }] =
    useUpdateReportTemplateMutation();

  // Fetch report templates from API
  const { data: _reportData } = useSchemeReportDetailsQuery({
    onCompleted: (data) => {
      // Set templates when data is loaded
      arrangeTemplates(data?.scheme?.reportTemplates || [], setTemplates);
    },
    variables: {
      reportTemplatesWhere: {
        type: {
          equals: ReportType.IncidentMap,
        },
      },
      schemeWhere: {
        id: currentScheme,
      },
    },
  });

  // Load saved filters if reportId is provided
  useEffect(() => {
    if (templates.length > 0 && reportId) {
      // Select the template first to set selectedTemplate
      selectTemplate(reportId);
      const template = templates.find((t) => t.id === reportId);
      if (template?.metaData) {
        setMetadata(template.metaData);
      }
    }
  }, [templates, reportId, selectTemplate, setMetadata]);

  // Save current filters to the report
  const saveFilters = async () => {
    // Use reportId directly instead of selectedTemplate since selectedTemplate might not be set
    const templateId = selectedTemplate || reportId;

    if (!templateId) {
      notification.warning({
        message: intl.formatMessage({
          defaultMessage: 'No report selected to save filters to',
        }),
      });
      return;
    }

    try {
      // Only update metadata, not layouts
      await updateReportMetadata({
        variables: {
          data: {
            metaData: metadata,
          },
          where: {
            id: templateId,
          },
        },
      });

      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Filters saved successfully',
        }),
      });
    } catch {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Failed to save filters',
        }),
      });
    }
  };

  // Helper to get filters from metadata
  const getFilters = (): IncidentMapFilters => {
    const globalFilter = metadata.find((m) => m.key === 'globalFilter');
    if (globalFilter?.filters) {
      return globalFilter.filters as unknown as IncidentMapFilters;
    }
    return IncidentMapMetaData[0].filters as unknown as IncidentMapFilters;
  };

  // Helper to update filters in metadata
  const updateFilters = (newFilters: Partial<IncidentMapFilters>) => {
    const updatedMetadata = metadata.map((item) => {
      if (item.key === 'globalFilter') {
        return {
          ...item,
          filters: {
            ...item.filters,
            ...newFilters,
          },
        };
      }
      return item;
    });
    setMetadata(updatedMetadata);
  };

  return {
    getFilters,
    metadata,
    saveFilters,
    saving: updateLoading,
    setMetadata,
    updateFilters,
  };
};

export default useIncidentMapReport;
