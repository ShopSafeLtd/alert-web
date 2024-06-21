import { useState } from 'react';

import { useStoreState } from '#/state';
import { notification } from 'antd';
import { useIntl } from 'react-intl';
import type {
  ReportsCentreQuery,
  ReportsCentreQueryVariables,
} from '#/views/reports/reports-centre/reports-centre.generated';
import {
  ReportsCentreDocument,
  useReportsCentreQuery,
} from '#/views/reports/reports-centre/reports-centre.generated';
import { useDeleteReportTemplateMutation } from 'graphql/reports/mutations/delete-report-template.generated';

interface Return {
  data: ReportsCentreQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onDeleteReportTemplate: (id: string) => void;
  toggleCreateOpen: () => void;
  toggleEditOpen: (id: string | null) => void;
  editOpen: string | null;
  createOpen: boolean;
}

const useReportsCentre = (): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [search, setSearch] = useState('');
  const [editOpen, toggleEditOpen] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const [deleteReportTemplate] = useDeleteReportTemplateMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Could not delete report',
        }),
        placement: 'bottomRight',
      });
    },
    update: (cache, { data: d }) => {
      const existingTemplates = cache.readQuery<
        ReportsCentreQuery,
        ReportsCentreQueryVariables
      >({
        query: ReportsCentreDocument,
        variables: {
          where: {
            scheme: {
              id: schemeId,
            },
            search: '',
          },
        },
      });

      if (existingTemplates && d?.deleteReportTemplate) {
        cache.writeQuery<ReportsCentreQuery, ReportsCentreQueryVariables>({
          query: ReportsCentreDocument,
          data: {
            reportsCentre: {
              businessReports:
                existingTemplates.reportsCentre.businessReports.filter(
                  (item) => item.id !== d?.deleteReportTemplate?.id
                ),
              summaryReports:
                existingTemplates.reportsCentre.summaryReports.filter(
                  (item) => item.id !== d?.deleteReportTemplate?.id
                ),
              offenderReports:
                existingTemplates.reportsCentre.offenderReports.filter(
                  (item) => item.id !== d?.deleteReportTemplate?.id
                ),
              crimeGroupReports:
                existingTemplates.reportsCentre.crimeGroupReports.filter(
                  (item) => item.id !== d?.deleteReportTemplate?.id
                ),
            },
          },
          variables: {
            where: {
              scheme: {
                id: schemeId,
              },
              search: '',
            },
          },
        });
      }
    },
  });

  const { data, loading } = useReportsCentreQuery({
    variables: {
      where: {
        scheme: {
          id: schemeId,
        },
        search: search ?? undefined,
      },
    },
  });

  const onDeleteReportTemplate = (id: string) => {
    void deleteReportTemplate({
      variables: {
        where: {
          id,
        },
      },
    });
  };

  const toggleCreateOpen = () => {
    setCreateOpen(!createOpen);
  };

  return {
    data,
    loading,
    search,
    setSearch,
    onDeleteReportTemplate,
    toggleEditOpen,
    toggleCreateOpen,
    editOpen,
    createOpen,
  };
};

export default useReportsCentre;
