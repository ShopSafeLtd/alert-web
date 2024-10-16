import type {
  ReportsCentreQuery,
  ReportsCentreQueryVariables,
} from '#/views/reports/reports-centre/__generated__/reports-centre.generated';

import { useStoreState } from '#/state';
import {
  ReportsCentreDocument,
  useReportsCentreQuery,
} from '#/views/reports/reports-centre/__generated__/reports-centre.generated';
import { notification } from 'antd';
import { useDeleteReportGroupMutation } from 'graphql/report-groups/__generated__/delete-report-group.generated';
import { useDeleteReportTemplateMutation } from 'graphql/reports/mutations/__generated__/delete-report-template.generated';
import update from 'immutability-helper';
import { useState } from 'react';
import { useIntl } from 'react-intl';

interface Return {
  createGroupOpen: boolean;
  createOpen: boolean;
  data: ReportsCentreQuery | undefined;
  editGroupOpen: null | string;
  editOpen: null | string;
  loading: boolean;
  onDeleteReportGroup: (id: string) => void;
  onDeleteReportTemplate: (id: string) => void;
  search: string;
  setSearch: (value: string) => void;
  toggleCreateGroupOpen: () => void;
  toggleCreateOpen: () => void;
  toggleEditGroupOpen: (id: null | string) => void;
  toggleEditOpen: (id: null | string) => void;
}

const useReportsCentre = (): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [search, setSearch] = useState('');
  const [editOpen, toggleEditOpen] = useState<null | string>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editGroupOpen, toggleEditGroupOpen] = useState<null | string>(null);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const [deleteReportGroup] = useDeleteReportGroupMutation({
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
          defaultMessage: 'Could not delete report group',
        }),
        placement: 'bottomRight',
      });
    },
    // update: (cache, { data: d }) => {
    //   const existingTemplates = cache.readQuery<
    //     ReportsCentreQuery,
    //     ReportsCentreQueryVariables
    //   >({
    //     query: ReportsCentreDocument,
    //     variables: {
    //       where: {
    //         schemeId,
    //         search: '',
    //       },
    //     },
    //   });
    //
    //   if (existingTemplates && d?.deleteReportGroup) {
    //     cache.writeQuery<ReportsCentreQuery, ReportsCentreQueryVariables>({
    //       query: ReportsCentreDocument,
    //       data: {
    //         reportsCentre: existingTemplates.filter(
    //           (item) => item.id !== d.deleteReportGroup.id
    //         ),
    //       },
    //       variables: {
    //         where: {
    //           schemeId,
    //           search: '',
    //         },
    //       },
    //     });
    //   }
    // },
  });

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
            schemeId,
            search: '',
          },
        },
      });

      if (existingTemplates && d?.deleteReportTemplate) {
        cache.writeQuery<ReportsCentreQuery, ReportsCentreQueryVariables>({
          data: {
            reportsCentre: update(existingTemplates.reportsCentre, {
              [existingTemplates.reportsCentre.findIndex(
                (item) => item.id === d.deleteReportTemplate?.reportGroup.id
              )]: {
                reports: {
                  $set:
                    existingTemplates.reportsCentre
                      .find(
                        (item) =>
                          item.id === d.deleteReportTemplate?.reportGroup.id
                      )
                      ?.reports.filter(
                        (report) => report.id !== d.deleteReportTemplate?.id
                      ) ?? [],
                },
              },
            }),
          },
          query: ReportsCentreDocument,
          variables: {
            where: {
              schemeId,
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
        schemeId,
        search: search ?? undefined,
      },
    },
  });
  console.log('useReportsCentreQuery', data);

  const onDeleteReportTemplate = (id: string) => {
    void deleteReportTemplate({
      variables: {
        where: {
          id,
        },
      },
    });
  };
  const onDeleteReportGroup = (id: string) => {
    void deleteReportGroup({
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

  const toggleCreateGroupOpen = () => {
    setCreateGroupOpen(!createGroupOpen);
  };

  return {
    createGroupOpen,
    createOpen,
    data,
    editGroupOpen,
    editOpen,
    loading,
    onDeleteReportGroup,
    onDeleteReportTemplate,
    search,
    setSearch,
    toggleCreateGroupOpen,
    toggleCreateOpen,
    toggleEditGroupOpen,
    toggleEditOpen,
  };
};

export default useReportsCentre;
